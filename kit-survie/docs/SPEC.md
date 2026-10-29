# Kit de survie hors ligne — Spécification

> Une application qui fonctionne **100 % sans Internet**, pour soi, sa famille et ses
> amis, en cas de conflit, de coupure longue ou d'isolement. Couverture : **Europe**.
> Cibles : **PC** (portable ou fixe) et **téléphone**.

## 1. Principes non négociables

1. **Hors ligne d'abord.** Aucune fonction ne dépend d'Internet une fois le kit installé.
2. **La bibliothèque est la source de vérité, pas l'IA.** Tout le contenu vital est
   lisible sans IA. L'assistant ne répond qu'à partir des fiches et cite ses sources.
3. **Garde-fous sur les sujets mortels.** Champignons, plantes sauvages, dosages de
   médicaments, actes médicaux : l'assistant renvoie vers la fiche et ne donne jamais
   de verdict du type « oui, ça se mange ».
4. **Zéro dépendance à installer.** Le serveur utilise uniquement Python 3 (bibliothèque
   standard). L'interface est en HTML/CSS/JS pur, sans compilation ni `npm`.
5. **Sobre en énergie.** L'IA est optionnelle et peut être coupée ; tout le reste tourne
   sur une machine modeste.
6. **Plusieurs copies.** Le kit doit pouvoir être dupliqué facilement (clé USB, téléphone,
   PC d'un ami).

## 2. Modes d'utilisation

| Mode | Matériel | Ce qui marche |
|---|---|---|
| **A. Serveur PC** | PC avec Python 3 (+ Ollama pour l'IA) | Tout : fiches, checklists, outils, assistant IA, (V1) carte |
| **A'. Téléphone via le PC** | Téléphone sur le même Wi-Fi que le PC (ou le partage de connexion du téléphone) | Tout, tant que le PC est allumé |
| **B. Fichier unique** | N'importe quel appareil avec un navigateur | Fiches, checklists, outils — **sans PC, sans installation** (`dist/kit-survie.html`) |
| **C. Téléphone autonome complet** | Android + Termux ([guide](ANDROID.md)) | Tout, y compris l'IA (petit modèle) ; installable comme application, qui s'ouvre ensuite hors ligne ; sert aussi le kit aux autres téléphones via le partage de connexion |

Compléments recommandés sur téléphone, en attendant les modules équivalents :

- **Cartes** : [Organic Maps](https://organicmaps.app) (open source, OpenStreetMap, cartes
  hors ligne de toute l'Europe, itinéraires à pied/vélo/voiture). À télécharger **maintenant**.
- **IA sur téléphone** : *PocketPal AI* (open source) avec un petit modèle (1–4 milliards de
  paramètres).
- **Bibliothèque** : l'application *Kiwix* avec les fichiers ZIM listés au §5.

## 3. Architecture

```
kit-survie/
├── serveur.py            # Serveur local (stdlib) : fichiers + API assistant (RAG)
├── construire.py         # Compile le contenu → app/data/donnees.js + dist/kit-survie.html
├── contenu/
│   ├── fiches/*.md       # Fiches pratiques (Markdown + en-tête)
│   └── checklists/*.md   # Checklists cochables
├── app/                  # Interface web (fonctionne aussi en file://)
│   ├── index.html
│   ├── css/style.css
│   ├── js/*.js           # Scripts classiques (pas de modules → inlinables)
│   ├── sw.js             # Service worker (mise en cache hors ligne)
│   └── data/donnees.js   # Généré : window.KIT_DATA = {...}
└── docs/SPEC.md
```

- **Données** : `construire.py` lit les fiches et checklists et génère un seul fichier JS
  (`window.KIT_DATA`). Chargé par une balise `<script>`, il fonctionne même en ouvrant
  `index.html` directement depuis le disque (pas de `fetch`, interdit en `file://`).
- **Routage** par ancre (`#/fiche/eau-purifier`) → compatible `file://`.
- **Recherche** côté navigateur, insensible aux accents.
- **Assistant** : `serveur.py` découpe les fiches par section, fait une recherche BM25,
  envoie les meilleurs extraits au LLM local via l'API compatible OpenAI
  (Ollama, llama.cpp, LM Studio…), et renvoie la réponse en flux continu avec les sources.
- **Accès téléphone** : le serveur écoute sur le réseau local et affiche l'adresse à taper.

### Format d'une fiche

```markdown
---
titre: Purifier l'eau
categorie: eau
resume: Rendre une eau douteuse buvable : ébullition, javel, filtration.
mots_cles: [javel, ébullition, filtre, potable]
risque: eleve        # faible | moyen | eleve → bandeau d'avertissement
urgence: oui         # optionnel : affichée dans les boutons d'urgence de l'accueil
---

Contenu Markdown. Encadrés : `> [!DANGER]`, `> [!ATTENTION]`, `> [!ASTUCE]`, `> [!INFO]`.
```

## 4. Modules et feuille de route

| Version | Contenu |
|---|---|
| **V0** (cette version) | Bibliothèque de fiches, recherche, boutons d'urgence, checklists cochables, outils (javel, autonomie eau/nourriture, Morse, soleil), assistant IA avec citations, fichier unique pour téléphone |
| **V0.2** | Android : installation Termux en une commande, application installable (PWA hors ligne), IA sur téléphone |
| **V1** | Carte hors ligne Europe (MapLibre + PMTiles, un seul fichier), points utiles (eau potable, sources, pharmacies, hôpitaux, abris), position GPS |
| **V2** | Intégration des fichiers ZIM Kiwix dans la recherche et l'assistant, recherche sémantique (embeddings) |
| **V3** | Stocks (inventaire, péremptions, jours d'autonomie), calendrier potager par zone climatique, scripts d'installation (clé USB, PC) |
| **V4** | Itinéraires hors ligne, synchronisation entre appareils du groupe (Wi-Fi local), journal de bord |

## 5. Contenu

### Fiches maison (vital, vérifié, adapté à l'Europe)

| Catégorie | Fiches |
|---|---|
| Premiers secours | Bases (protéger/alerter/secourir), hémorragie, arrêt cardiaque, étouffement, PLS, brûlures, froid et chaleur, fractures, plaies et infections |
| Eau | Trouver, purifier, besoins et stockage |
| Se nourrir | Plantes comestibles sûres, confusions mortelles, champignons, pêche, piégeage, conservation sans frigo, stocks de base |
| Cultiver | Potager de survie, semences, élevage simple (poules, lapins) |
| Feu & énergie | Allumer un feu, chauffer l'eau avec peu de combustible, solaire 12 V |
| Abri & protection | Priorités de survie, alerte nucléaire/NRBC, abri contre le froid, évacuation |
| Communiquer | Radios (PMR446, CB, radioamateur, Meshtastic), signaux, Morse |
| Hygiène | Assainissement, latrines, savon, gestion des déchets |
| S'orienter | Trouver le nord sans boussole, lire une carte |
| S'organiser | Vie en groupe, répartition des tâches, moral |

### Sources externes (V2) — à vérifier licence par licence

- **Kiwix (ZIM)** : Wikipédia FR, WikiMed, Wikivoyage, Wikibooks, iFixit, Stack Exchange
  (Outdoors, Gardening, DIY), Appropedia.
- **Documents** : FM 21-76 (manuel de survie US Army, domaine public), *Là où il n'y a pas de
  docteur* (Hesperian, reproduction non commerciale autorisée).
- **Cartes** : OpenStreetMap (ODbL) via Protomaps/PMTiles ; relief IGN / Copernicus DEM.

## 6. IA locale

- Moteur : **Ollama** (le plus simple) ou **llama.cpp** / **LM Studio** (API compatible OpenAI).
- Modèles conseillés pour le français (versions quantifiées Q4) :

| Machine | Modèle |
|---|---|
| PC modeste (8 Go RAM) | `qwen3:4b`, `gemma3:4b` |
| PC correct (16 Go RAM) | `qwen3:8b`, `mistral-nemo`, `gemma3:12b` |
| PC puissant / GPU | `mistral-small3.2`, `qwen3:14b` |

- Le serveur prend le premier modèle disponible, ou celui passé avec `--modele`.

## 7. Sécurité du contenu

- Chaque fiche à risque affiche un bandeau rappelant ses limites.
- Les affirmations chiffrées (doses, durées) suivent les recommandations publiées
  (OMS, CDC, Croix-Rouge, ANSM, ERC 2021 pour la réanimation).
- Avertissement global : ce kit ne remplace ni une formation aux premiers secours
  (PSC1 en France), ni les consignes des autorités quand elles sont joignables.
