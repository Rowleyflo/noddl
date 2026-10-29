"""Tests du kit : compilation du contenu, recherche, filtre <think>, serveur + faux LLM."""

import json
import sys
import threading
import unittest
import urllib.request
from functools import partial
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import construire  # noqa: E402
import serveur  # noqa: E402


class TestContenu(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.donnees = construire.charger_donnees()

    def test_fiches_valides(self):
        fiches = self.donnees["fiches"]
        self.assertGreater(len(fiches), 20)
        ids = [f["id"] for f in fiches]
        self.assertEqual(len(ids), len(set(ids)))
        for f in fiches:
            self.assertIn(f["risque"], ("faible", "moyen", "eleve"), f["id"])
            self.assertTrue(f["contenu"].strip(), f["id"])

    def test_urgences_presentes(self):
        urgences = {f["id"] for f in self.donnees["fiches"] if f["urgence"]}
        for attendu in ("secours-hemorragie", "secours-arret-cardiaque", "eau-purifier", "abri-nucleaire", "securite-conflit"):
            self.assertIn(attendu, urgences)

    def test_liens_internes(self):
        """Tous les liens #/checklist/ et #/outil/ pointent vers quelque chose d'existant."""
        checklists = {c["id"] for c in self.donnees["checklists"]}
        outils = {"javel", "stocks", "autonomie", "solaire", "morse", "soleil"}
        for f in self.donnees["fiches"]:
            for cible in serveur.re.findall(r"\]\(#/checklist/([a-z0-9-]+)\)", f["contenu"]):
                self.assertIn(cible, checklists, f["id"])
            for cible in serveur.re.findall(r"\]\(#/outil/([a-z0-9-]+)\)", f["contenu"]):
                self.assertIn(cible, outils, f["id"])

    def test_checklists(self):
        for c in self.donnees["checklists"]:
            elements = [e["id"] for s in c["sections"] for e in s["elements"]]
            self.assertTrue(elements, c["id"])
            self.assertEqual(len(elements), len(set(elements)), c["id"])

    def test_entete_invalide(self):
        with self.assertRaises(ValueError):
            construire.lire_entete("pas d'en-tête", "x.md")
        entete, corps = construire.lire_entete("---\ntitre: A\nmots_cles: [a, b]  # commentaire\n---\nCorps", "x.md")
        self.assertEqual(entete, {"titre": "A", "mots_cles": ["a", "b"]})
        self.assertEqual(corps, "Corps")

    def test_fichier_unique_autonome(self):
        html = construire.fichier_unique(self.donnees)
        self.assertNotIn('<script src="', html)
        self.assertNotIn('href="css/style.css"', html)
        self.assertIn("window.KIT_DATA", html)
        self.assertIn("window.KIT_FICHIER_UNIQUE = true", html)


class TestRecherche(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.index = serveur.Index(construire.charger_fiches())

    def premiere_fiche(self, question):
        resultats = self.index.chercher(question)
        self.assertTrue(resultats, question)
        return resultats[0]["fiche"]

    def test_questions_typiques(self):
        cas = {
            "combien de gouttes de javel pour purifier l'eau": "eau-purifier",
            "comment poser un garrot": "secours-hemorragie",
            "dose de comprimés d'iode pour un enfant": "abri-nucleaire",
            "est-ce que je peux manger les châtaignes": "plantes-comestibles",
            "mon enfant s'étouffe": "secours-etouffement",
            "quand planter les pommes de terre": "potager-survie",
            "j'ai trouvé un obus non explosé": "securite-conflit",
            "quelle dose de paracétamol pour un enfant de 12 kg": "secours-enfant-malade",
            "comment faire une attelle pour une jambe cassée": "secours-fractures",
            "quelle batterie pour un panneau solaire": "energie-solaire",
            "comment faire du pain sans four": "cuisiner-reserves",
        }
        for question, attendu in cas.items():
            self.assertEqual(self.premiere_fiche(question), attendu, question)

    def test_jetons_sans_accents_ni_pluriels(self):
        self.assertEqual(serveur.jetons("Les Plantes Comestibles"), ["plante", "comest"])
        self.assertEqual(serveur.jetons("s'étouffe"), serveur.jetons("étouffement"))

    def test_question_vide(self):
        self.assertEqual(self.index.chercher("le la les"), [])


class TestFiltrePensee(unittest.TestCase):
    def filtrer(self, morceaux):
        f = serveur.FiltrePensee()
        return "".join(f.filtrer(m) for m in morceaux) + f.vider()

    def test_bloc_coupe_en_morceaux(self):
        self.assertEqual(self.filtrer(["<thi", "nk>je réfléchis</th", "ink>Réponse"]), "Réponse")

    def test_sans_bloc(self):
        self.assertEqual(self.filtrer(["Bon", "jour <b>"]), "Bonjour <b>")

    def test_chevron_final_conserve(self):
        self.assertEqual(self.filtrer(["a <", "t"]), "a <t")


class TestAdaptation(unittest.TestCase):
    def test_qwen3_sans_reflexion(self):
        messages = [{"role": "system", "content": "s"}, {"role": "user", "content": "q"}]
        self.assertTrue(serveur.adapter_au_modele(list(messages), "qwen3:4b")[-1]["content"].endswith("/no_think"))
        self.assertEqual(serveur.adapter_au_modele(list(messages), "gemma3:4b")[-1]["content"], "q")
        self.assertEqual(messages[-1]["content"], "q")  # l'original n'est pas modifié


class FauxLLM(BaseHTTPRequestHandler):
    """Imite l'API compatible OpenAI d'Ollama, et garde la dernière requête reçue."""

    derniere = None

    def log_message(self, *args):
        pass

    def do_GET(self):
        corps = json.dumps({"data": [{"id": "faux-modele"}]}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(corps)

    def do_POST(self):
        FauxLLM.derniere = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream")
        self.end_headers()
        for texte in ["<think>hmm</think>", "Faites ", "bouillir [1]."]:
            ligne = json.dumps({"choices": [{"delta": {"content": texte}}]})
            self.wfile.write(f"data: {ligne}\n\n".encode())
        self.wfile.write(b"data: [DONE]\n\n")


class TestServeur(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.llm = ThreadingHTTPServer(("127.0.0.1", 0), FauxLLM)
        threading.Thread(target=cls.llm.serve_forever, daemon=True).start()

        donnees = construire.construire(verbeux=False)
        serveur.Gestionnaire.index = serveur.Index(donnees["fiches"])
        serveur.Gestionnaire.llm = serveur.LLM(f"http://127.0.0.1:{cls.llm.server_port}/v1")
        cls.kit = ThreadingHTTPServer(
            ("127.0.0.1", 0), partial(serveur.Gestionnaire, directory=str(construire.APP))
        )
        threading.Thread(target=cls.kit.serve_forever, daemon=True).start()
        cls.url = f"http://127.0.0.1:{cls.kit.server_port}"

    @classmethod
    def tearDownClass(cls):
        cls.kit.shutdown()
        cls.llm.shutdown()

    def test_page_et_donnees(self):
        with urllib.request.urlopen(self.url + "/") as r:
            self.assertIn(b"Kit de survie", r.read())
        with urllib.request.urlopen(self.url + "/data/donnees.js") as r:
            self.assertTrue(r.read().startswith(b"window.KIT_DATA"))

    def test_etat(self):
        with urllib.request.urlopen(self.url + "/api/etat") as r:
            self.assertEqual(json.load(r), {"llm": True, "modeles": ["faux-modele"], "modele": "faux-modele"})

    def test_telecharger(self):
        with urllib.request.urlopen(self.url + "/telecharger") as r:
            self.assertIn("attachment", r.headers["Content-Disposition"])
            self.assertIn(b"KIT_FICHIER_UNIQUE", r.read())

    def test_assistant_flux(self):
        requete = urllib.request.Request(
            self.url + "/api/assistant",
            data=json.dumps({"question": "Comment purifier l'eau ?", "historique": []}).encode(),
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(requete) as r:
            evenements = [json.loads(l[5:]) for l in r.read().decode().split("\n\n") if l.startswith("data:")]
        types = [e["type"] for e in evenements]
        self.assertEqual(types[0], "sources")
        self.assertEqual(types[-1], "fin")
        self.assertIn("eau-purifier", [s["fiche"] for s in evenements[0]["sources"]])
        texte = "".join(e["texte"] for e in evenements if e["type"] == "texte")
        self.assertEqual(texte, "Faites bouillir [1].")
        # Les extraits des fiches sont bien envoyés au LLM, après l'invite système.
        messages = FauxLLM.derniere["messages"]
        self.assertEqual(messages[0]["role"], "system")
        self.assertIn("Purifier l'eau", messages[-1]["content"])

    def test_assistant_requete_invalide(self):
        requete = urllib.request.Request(self.url + "/api/assistant", data=b"pas du json")
        with self.assertRaises(urllib.error.HTTPError) as erreur:
            urllib.request.urlopen(requete)
        self.assertEqual(erreur.exception.code, 400)


if __name__ == "__main__":
    unittest.main()
