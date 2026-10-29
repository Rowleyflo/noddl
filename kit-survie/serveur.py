#!/usr/bin/env python3
"""Serveur local du kit de survie.

- Sert l'interface (dossier app/) au PC et aux téléphones du réseau local.
- /api/etat       : le LLM local est-il joignable ? quels modèles ?
- /api/assistant  : question → recherche dans les fiches (BM25) → LLM local → réponse
                    en flux continu (SSE), avec les sources citées.
- /telecharger    : le kit en fichier unique, à enregistrer sur un téléphone.

Le LLM est appelé via l'API compatible OpenAI : Ollama (par défaut), llama.cpp,
LM Studio… Uniquement la bibliothèque standard de Python 3.

    python3 serveur.py                         # Ollama sur localhost:11434
    python3 serveur.py --modele qwen3:8b
    python3 serveur.py --llm http://localhost:8080/v1   # llama.cpp server
"""

import argparse
import functools
import json
import math
import re
import socket
import sys
import unicodedata
import urllib.error
import urllib.request
from collections import Counter
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

import construire

MOTS_VIDES = set(
    """a au aux avec ce ces dans de des du elle en et eux il ils je la le les leur lui ma
    mais me meme mes moi mon ne nos notre nous on ou par pas pour qu que qui sa se ses son
    sur ta te tes toi ton tu un une vos votre vous c d j l m n s t y est sont ete etre avoir
    faire fait comment quoi quel quelle quels quelles peut peux faut cela ca si plus tres
    tout tous toute toutes bien aussi entre sans sous""".split()
)

INVITE_SYSTEME = """Tu es l'assistant d'un kit de survie hors ligne. Tu aides une famille et ses amis coupés du monde (conflit, catastrophe, coupure prolongée) en Europe.

Règles :
1. Réponds UNIQUEMENT à partir des extraits de la bibliothèque fournis. Cite-les avec leur numéro entre crochets, par exemple [2].
2. Si les extraits ne permettent pas de répondre, dis-le clairement et propose les fiches à consulter. N'invente jamais un fait, une dose ou une durée.
3. Va droit au but : étapes numérotées, gestes concrets, le plus urgent en premier.
4. Ne confirme JAMAIS qu'une plante ou un champignon est comestible à partir d'une description ou d'une photo décrite : rappelle les confusions mortelles possibles.
5. Pour les médicaments, ne donne que les doses écrites dans les extraits.
6. En cas d'urgence vitale, commence par les gestes immédiats et rappelle d'appeler le 112 si un réseau est disponible.
Réponds en français, sauf si on te parle dans une autre langue."""


# --- Recherche (BM25) -------------------------------------------------------


def jetons(texte):
    texte = unicodedata.normalize("NFKD", texte.lower()).encode("ascii", "ignore").decode()
    resultat = []
    for mot in re.findall(r"[a-z0-9]+", texte):
        if mot in MOTS_VIDES or len(mot) < 2:
            continue
        if len(mot) > 4 and mot[-1] in "sx":  # pluriels : « plantes » → « plante »
            mot = mot[:-1]
        # Racinisation par troncature : « étouffe », « étouffement » → « etouff ».
        resultat.append(mot[:6])
    return resultat


class Index:
    """Index BM25 des fiches, découpées par section (titres « ## »)."""

    def __init__(self, fiches, k1=1.5, b=0.75):
        self.k1, self.b = k1, b
        self.morceaux = []
        for fiche in fiches:
            for section, texte in self._sections(fiche["contenu"]):
                entete = f"{fiche['titre']} {section} {' '.join(fiche['mots_cles'])}"
                self.morceaux.append(
                    {
                        "fiche": fiche["id"],
                        "titre": fiche["titre"],
                        "section": section,
                        "texte": texte.strip(),
                        # L'en-tête compte double : un titre qui correspond pèse plus.
                        "freq": Counter(jetons(entete) * 2 + jetons(texte)),
                    }
                )
        self.longueur_moy = sum(sum(m["freq"].values()) for m in self.morceaux) / max(len(self.morceaux), 1)
        df = Counter(mot for m in self.morceaux for mot in m["freq"])
        n = len(self.morceaux)
        self.idf = {mot: math.log(1 + (n - d + 0.5) / (d + 0.5)) for mot, d in df.items()}

    @staticmethod
    def _sections(contenu):
        """Découpe aux titres « ## » et « ### » : des morceaux courts, donc précis."""
        section, parent, lignes = "Introduction", "Introduction", []
        for ligne in contenu.splitlines():
            if ligne.startswith(("## ", "### ")):
                if "".join(lignes).strip():
                    yield section, "\n".join(lignes)
                titre = ligne.split(" ", 1)[1].strip()
                if ligne.startswith("## "):
                    section = parent = titre
                else:
                    section = f"{parent} › {titre}"
                lignes = []
            else:
                lignes.append(ligne)
        if "".join(lignes).strip():
            yield section, "\n".join(lignes)

    def chercher(self, question, n=5):
        termes = set(jetons(question))
        scores = []
        for morceau in self.morceaux:
            longueur = sum(morceau["freq"].values())
            score = 0.0
            for terme in termes:
                tf = morceau["freq"].get(terme, 0)
                if tf:
                    norme = self.k1 * (1 - self.b + self.b * longueur / self.longueur_moy)
                    score += self.idf[terme] * tf * (self.k1 + 1) / (tf + norme)
            if score > 0:
                scores.append((score, morceau))
        scores.sort(key=lambda s: -s[0])
        return [m for _, m in scores[:n]]


# --- LLM local --------------------------------------------------------------


class FiltrePensee:
    """Retire les blocs <think>…</think> des modèles « raisonneurs » (Qwen3…), même coupés en morceaux."""

    OUVRE, FERME = "<think>", "</think>"

    def __init__(self):
        self.tampon, self.dedans = "", False

    @staticmethod
    def _debut_partiel(texte, balise):
        for k in range(len(balise) - 1, 0, -1):
            if texte.endswith(balise[:k]):
                return k
        return 0

    def filtrer(self, texte):
        self.tampon += texte
        sortie = ""
        while True:
            balise = self.FERME if self.dedans else self.OUVRE
            i = self.tampon.find(balise)
            if i < 0:
                garde = self._debut_partiel(self.tampon, balise)
                if not self.dedans:
                    sortie += self.tampon[: len(self.tampon) - garde]
                self.tampon = self.tampon[len(self.tampon) - garde :]
                return sortie
            if not self.dedans:
                sortie += self.tampon[:i]
            self.tampon = self.tampon[i + len(balise) :]
            self.dedans = not self.dedans

    def vider(self):
        reste = "" if self.dedans else self.tampon
        self.tampon = ""
        return reste


class LLM:
    def __init__(self, url, modele=None):
        self.url = url.rstrip("/")
        self.modele_force = modele

    def modeles(self):
        try:
            with urllib.request.urlopen(self.url + "/models", timeout=3) as reponse:
                return [m["id"] for m in json.load(reponse).get("data", [])]
        except (OSError, ValueError):
            return None

    def modele(self):
        if self.modele_force:
            return self.modele_force
        disponibles = self.modeles()
        return disponibles[0] if disponibles else None

    def discuter(self, messages, modele):
        """Générateur des morceaux de texte de la réponse."""
        corps = json.dumps({"model": modele, "messages": messages, "stream": True, "temperature": 0.2}).encode()
        requete = urllib.request.Request(
            self.url + "/chat/completions", data=corps, headers={"Content-Type": "application/json"}
        )
        filtre = FiltrePensee()
        with urllib.request.urlopen(requete, timeout=600) as reponse:
            for ligne in reponse:
                ligne = ligne.decode("utf-8").strip()
                if not ligne.startswith("data:"):
                    continue
                donnee = ligne[5:].strip()
                if donnee == "[DONE]":
                    break
                choix = json.loads(donnee).get("choices") or [{}]
                morceau = (choix[0].get("delta") or {}).get("content") or ""
                texte = filtre.filtrer(morceau)
                if texte:
                    yield texte
        reste = filtre.vider()
        if reste:
            yield reste


def construire_messages(question, historique, extraits):
    blocs = []
    for i, m in enumerate(extraits, 1):
        texte = m["texte"] if len(m["texte"]) < 1800 else m["texte"][:1800] + " […]"
        blocs.append(f"[{i}] Fiche « {m['titre']} » — section « {m['section']} »\n{texte}")
    contexte = "\n\n".join(blocs) if blocs else "(aucun extrait pertinent trouvé)"
    messages = [{"role": "system", "content": INVITE_SYSTEME}]
    for tour in historique[-6:]:
        if tour.get("role") in ("user", "assistant") and isinstance(tour.get("content"), str):
            messages.append({"role": tour["role"], "content": tour["content"][:4000]})
    messages.append({"role": "user", "content": f"Extraits de la bibliothèque :\n\n{contexte}\n\nQuestion : {question}"})
    return messages


def adapter_au_modele(messages, modele):
    """Qwen3 « réfléchit » longuement avant de répondre : interminable sur un téléphone.
    Le mot-clé /no_think de Qwen3 désactive cette phase."""
    if modele.lower().startswith("qwen3"):
        messages[-1] = {**messages[-1], "content": messages[-1]["content"] + " /no_think"}
    return messages


# --- HTTP -------------------------------------------------------------------


class Gestionnaire(SimpleHTTPRequestHandler):
    index = None
    llm = None

    def end_headers(self):
        # Pas de cache navigateur : le service worker gère le hors-ligne.
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, format, *args):
        if not args or not str(args[1]).startswith(("2", "3")):
            super().log_message(format, *args)

    def envoyer_json(self, objet, statut=200):
        corps = json.dumps(objet, ensure_ascii=False).encode()
        self.send_response(statut)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corps)))
        self.end_headers()
        self.wfile.write(corps)

    def do_GET(self):
        if self.path == "/api/etat":
            modeles = self.llm.modeles()
            modele = self.llm.modele_force or (modeles[0] if modeles else None)
            self.envoyer_json({"llm": modeles is not None, "modeles": modeles or [], "modele": modele})
        elif self.path == "/telecharger":
            corps = (construire.DIST / "kit-survie.html").read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Disposition", 'attachment; filename="kit-survie.html"')
            self.send_header("Content-Length", str(len(corps)))
            self.end_headers()
            self.wfile.write(corps)
        else:
            super().do_GET()

    def do_POST(self):
        if self.path != "/api/assistant":
            self.send_error(404)
            return
        try:
            longueur = int(self.headers.get("Content-Length", 0))
            demande = json.loads(self.rfile.read(longueur))
            question = str(demande["question"]).strip()[:2000]
            historique = demande.get("historique") or []
        except (ValueError, KeyError, TypeError):
            self.envoyer_json({"erreur": "Requête invalide"}, 400)
            return

        modele = self.llm.modele()
        if not modele:
            self.envoyer_json({"erreur": "Aucun LLM local joignable. Lancez Ollama (voir README)."}, 503)
            return

        # La question précédente aide pour les relances (« et pour un enfant ? »).
        precedente = next((t["content"] for t in reversed(historique) if t.get("role") == "user"), "")
        extraits = self.index.chercher(question + " " + str(precedente)[:300])

        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream; charset=utf-8")
        self.end_headers()

        def evenement(objet):
            self.wfile.write(f"data: {json.dumps(objet, ensure_ascii=False)}\n\n".encode())
            self.wfile.flush()

        try:
            evenement(
                {
                    "type": "sources",
                    "sources": [{"fiche": m["fiche"], "titre": m["titre"], "section": m["section"]} for m in extraits],
                    "modele": modele,
                }
            )
            messages = adapter_au_modele(construire_messages(question, historique, extraits), modele)
            for texte in self.llm.discuter(messages, modele):
                evenement({"type": "texte", "texte": texte})
            evenement({"type": "fin"})
        except (urllib.error.URLError, OSError, ValueError) as erreur:
            try:
                evenement({"type": "erreur", "message": f"Erreur du LLM local : {erreur}"})
            except OSError:
                pass  # le navigateur a fermé la connexion


def adresses_locales():
    adresses = set()
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("10.255.255.255", 1))  # aucun paquet n'est envoyé
            adresses.add(s.getsockname()[0])
    except OSError:
        pass
    try:
        adresses.update(socket.gethostbyname_ex(socket.gethostname())[2])
    except OSError:
        pass
    # Interfaces réseau une à une (Linux, Android) : trouve l'adresse du partage de connexion
    # même sans accès à Internet, quand la méthode ci-dessus n'a pas de route.
    try:
        import fcntl
        import struct

        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            for _, nom in socket.if_nameindex():
                try:
                    brut = fcntl.ioctl(s.fileno(), 0x8915, struct.pack("256s", nom[:15].encode()))  # SIOCGIFADDR
                    adresses.add(socket.inet_ntoa(brut[20:24]))
                except OSError:
                    pass
    except (ImportError, OSError, AttributeError):
        pass
    return sorted(a for a in adresses if not a.startswith("127."))


def main():
    parser = argparse.ArgumentParser(description="Serveur local du kit de survie")
    parser.add_argument("--port", type=int, default=8080)
    parser.add_argument("--hote", default="0.0.0.0", help="0.0.0.0 = accessible depuis le réseau local")
    parser.add_argument("--llm", default="http://localhost:11434/v1", help="URL de l'API compatible OpenAI")
    parser.add_argument("--modele", help="Modèle à utiliser (par défaut : le premier disponible)")
    args = parser.parse_args()

    try:
        donnees = construire.construire(verbeux=False)
    except ValueError as erreur:
        sys.exit(f"Erreur dans le contenu : {erreur}")

    Gestionnaire.index = Index(donnees["fiches"])
    Gestionnaire.llm = LLM(args.llm, args.modele)
    gestionnaire = functools.partial(Gestionnaire, directory=str(construire.APP))
    serveur = ThreadingHTTPServer((args.hote, args.port), gestionnaire)

    modele = Gestionnaire.llm.modele()
    print(f"\n  Kit de survie — {len(donnees['fiches'])} fiches, {len(donnees['checklists'])} checklists")
    print(f"  Sur ce PC        : http://localhost:{args.port}")
    if args.hote == "0.0.0.0":
        for adresse in adresses_locales():
            print(f"  Depuis un tél.   : http://{adresse}:{args.port}   (même Wi-Fi)")
    print(f"  Assistant IA     : {'modèle ' + modele if modele else 'désactivé (aucun LLM joignable sur ' + args.llm + ')'}")
    print("  Ctrl+C pour arrêter.\n")
    try:
        serveur.serve_forever()
    except KeyboardInterrupt:
        print("\nArrêt.")


if __name__ == "__main__":
    main()
