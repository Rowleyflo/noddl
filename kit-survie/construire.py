#!/usr/bin/env python3
"""Compile le contenu du kit (fiches + checklists).

Génère :
  - app/data/donnees.js   : window.KIT_DATA = {...}, chargé par l'interface
  - dist/kit-survie.html  : tout le kit dans un seul fichier, à copier sur un téléphone

Utilise uniquement la bibliothèque standard de Python 3.
"""

import json
import re
import sys
import unicodedata
from pathlib import Path

RACINE = Path(__file__).resolve().parent
CONTENU = RACINE / "contenu"
APP = RACINE / "app"
DIST = RACINE / "dist"

CATEGORIES = [
    {"id": "secours", "titre": "Premiers secours", "icone": "✚"},
    {"id": "eau", "titre": "Eau", "icone": "💧"},
    {"id": "alimentation", "titre": "Se nourrir", "icone": "🌿"},
    {"id": "culture", "titre": "Cultiver", "icone": "🌱"},
    {"id": "feu", "titre": "Feu, chaleur & énergie", "icone": "🔥"},
    {"id": "abri", "titre": "Abri & protection", "icone": "🛡"},
    {"id": "communication", "titre": "Communiquer", "icone": "📻"},
    {"id": "hygiene", "titre": "Hygiène", "icone": "🧼"},
    {"id": "orientation", "titre": "S'orienter", "icone": "🧭"},
    {"id": "organisation", "titre": "S'organiser", "icone": "👥"},
]

# Scripts de l'interface, dans l'ordre de chargement.
SCRIPTS = ["js/markdown.js", "js/outils.js", "js/app.js"]


def slug(texte):
    texte = unicodedata.normalize("NFKD", texte).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", texte.lower()).strip("-")


def lire_entete(texte, chemin):
    """Sépare l'en-tête (sous-ensemble de YAML : `cle: valeur` et `[a, b]`) du corps."""
    if not texte.startswith("---\n"):
        raise ValueError(f"{chemin} : en-tête '---' manquant")
    fin = texte.index("\n---", 4)
    entete = {}
    for ligne in texte[4:fin].splitlines():
        ligne = ligne.split(" #", 1)[0].rstrip()
        if not ligne.strip():
            continue
        cle, _, valeur = ligne.partition(":")
        valeur = valeur.strip()
        if valeur.startswith("[") and valeur.endswith("]"):
            valeur = [v.strip() for v in valeur[1:-1].split(",") if v.strip()]
        entete[cle.strip()] = valeur
    return entete, texte[fin + 4 :].lstrip("\n")


def charger_fiches():
    ids_categories = {c["id"] for c in CATEGORIES}
    fiches = []
    for chemin in sorted((CONTENU / "fiches").glob("*.md")):
        entete, corps = lire_entete(chemin.read_text(encoding="utf-8"), chemin)
        for champ in ("titre", "categorie", "resume"):
            if champ not in entete:
                raise ValueError(f"{chemin} : champ '{champ}' manquant")
        if entete["categorie"] not in ids_categories:
            raise ValueError(f"{chemin} : catégorie inconnue '{entete['categorie']}'")
        fiches.append(
            {
                "id": chemin.stem,
                "titre": entete["titre"],
                "categorie": entete["categorie"],
                "resume": entete["resume"],
                "mots_cles": entete.get("mots_cles", []),
                "risque": entete.get("risque", "faible"),
                "urgence": entete.get("urgence") == "oui",
                "ordre": int(entete.get("ordre", 50)),
                "contenu": corps,
            }
        )
    ids = {f["id"] for f in fiches}
    for fiche in fiches:
        for cible in re.findall(r"\]\(#/fiche/([a-z0-9-]+)\)", fiche["contenu"]):
            if cible not in ids:
                raise ValueError(f"{fiche['id']} : lien vers une fiche inexistante '{cible}'")
    fiches.sort(key=lambda f: (f["categorie"], f["ordre"], f["titre"]))
    return fiches


def charger_checklists():
    checklists = []
    for chemin in sorted((CONTENU / "checklists").glob("*.md")):
        entete, corps = lire_entete(chemin.read_text(encoding="utf-8"), chemin)
        sections, section = [], None
        for ligne in corps.splitlines():
            if ligne.startswith("## "):
                section = {"titre": ligne[3:].strip(), "elements": []}
                sections.append(section)
            elif ligne.startswith("- "):
                if section is None:
                    section = {"titre": "", "elements": []}
                    sections.append(section)
                texte = ligne[2:].strip()
                section["elements"].append({"id": slug(section["titre"] + "-" + texte), "texte": texte})
        checklists.append(
            {
                "id": chemin.stem,
                "titre": entete["titre"],
                "resume": entete.get("resume", ""),
                "ordre": int(entete.get("ordre", 50)),
                "sections": sections,
            }
        )
    checklists.sort(key=lambda c: (c["ordre"], c["titre"]))
    return checklists


def charger_donnees():
    return {
        "categories": CATEGORIES,
        "fiches": charger_fiches(),
        "checklists": charger_checklists(),
    }


def js_donnees(donnees):
    # `</` est échappé pour pouvoir inliner le JSON dans une balise <script>.
    texte = json.dumps(donnees, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    return "window.KIT_DATA = " + texte + ";\n"


def fichier_unique(donnees):
    """Construit dist/kit-survie.html : HTML + CSS + JS + données dans un seul fichier."""
    html = (APP / "index.html").read_text(encoding="utf-8")
    css = (APP / "css/style.css").read_text(encoding="utf-8")
    scripts = "\n".join(
        (APP / s).read_text(encoding="utf-8").replace("</script", "<\\/script") for s in SCRIPTS
    )
    html = html.replace('<link rel="stylesheet" href="css/style.css">', f"<style>\n{css}\n</style>")
    html = re.sub(r'\s*<link rel="(manifest|icon)"[^>]*>', "", html)
    html = re.sub(r'\s*<script src="[^"]+"></script>', "", html)
    bloc = f"<script>\n{js_donnees(donnees)}window.KIT_FICHIER_UNIQUE = true;\n{scripts}\n</script>\n"
    return html.replace("</body>", bloc + "</body>")


def construire(verbeux=True):
    donnees = charger_donnees()
    (APP / "data").mkdir(exist_ok=True)
    (APP / "data/donnees.js").write_text(js_donnees(donnees), encoding="utf-8")
    DIST.mkdir(exist_ok=True)
    (DIST / "kit-survie.html").write_text(fichier_unique(donnees), encoding="utf-8")
    if verbeux:
        print(
            f"✔ {len(donnees['fiches'])} fiches, {len(donnees['checklists'])} checklists\n"
            f"  → {(APP / 'data/donnees.js').relative_to(RACINE)}\n"
            f"  → {(DIST / 'kit-survie.html').relative_to(RACINE)} (à copier sur un téléphone)"
        )
    return donnees


if __name__ == "__main__":
    try:
        construire()
    except ValueError as erreur:
        sys.exit(f"Erreur : {erreur}")
