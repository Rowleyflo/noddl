# Kit de survie hors ligne

Une application qui fonctionne **sans Internet** pour traverser une crise longue (conflit,
coupure générale, isolement) : premiers secours, eau, nourriture, potager, feu, abri,
alerte nucléaire, radio, hygiène, orientation. Sur **PC** et **téléphone**.

- **Fiches pratiques** vérifiées, avec boutons d'urgence en page d'accueil
- **Recherche** instantanée, insensible aux accents
- **Checklists** cochables (sac d'évacuation, autonomie 72 h, alerte nucléaire…)
- **Outils** : dose de Javel, autonomie eau/nourriture, Morse (son et lumière), soleil et lune
- **Assistant IA local** (optionnel) qui répond **uniquement à partir des fiches** et cite ses sources

Spécification et feuille de route : [docs/SPEC.md](docs/SPEC.md).

## Démarrer sur un PC

Seul **Python 3** est nécessaire (aucun paquet à installer).

```bash
cd kit-survie
python3 serveur.py
```

Ouvrez ensuite l'adresse affichée (`http://localhost:8080`). Le serveur affiche aussi l'adresse à
taper sur un **téléphone connecté au même Wi-Fi**. Sans box Internet : activez le partage de
connexion du téléphone et connectez-y le PC, cela crée un réseau local même sans données mobiles.

## Ajouter l'assistant IA (optionnel)

1. Installez [Ollama](https://ollama.com).
2. Téléchargez un modèle adapté à votre machine :

| PC | Commande |
|---|---|
| 8 Go de RAM | `ollama pull qwen3:4b` |
| 16 Go de RAM | `ollama pull qwen3:8b` |
| GPU ou 32 Go de RAM | `ollama pull mistral-small3.2` |

3. Relancez `python3 serveur.py` : il détecte Ollama et prend le premier modèle disponible.
   Pour en choisir un : `python3 serveur.py --modele qwen3:8b`.

Autres moteurs compatibles OpenAI (llama.cpp, LM Studio) : `--llm http://localhost:8080/v1`.

## Sur un téléphone, sans PC

```bash
python3 construire.py
```

Cela produit **`dist/kit-survie.html`** : un fichier unique contenant tout le kit (sauf
l'assistant IA). Copiez-le sur le téléphone (câble, clé USB, e-mail à soi-même tant que c'est
possible) et ouvrez-le avec le navigateur. Depuis le serveur, on peut aussi le télécharger
directement : page **Installer & partager**.

À installer aussi sur le téléphone, **dès maintenant** :

- **Organic Maps** + les cartes hors ligne de votre pays et des pays voisins ;
- **Kiwix** + Wikipédia et WikiMed en français (bibliothèques hors ligne) ;
- éventuellement **PocketPal AI** avec un petit modèle, pour une IA de poche.

## Ajouter ou corriger une fiche

Les fiches sont de simples fichiers Markdown dans `contenu/fiches/`, les checklists dans
`contenu/checklists/`. Le format est décrit dans [docs/SPEC.md](docs/SPEC.md#format-dune-fiche).
Après modification, relancez `python3 construire.py` (ou le serveur, qui le fait au démarrage).
Le script vérifie les en-têtes et les liens entre fiches.

## Tests

```bash
python3 -m unittest discover -s tests
```

## Avertissement

Ce kit suit les recommandations publiées (OMS, CDC, Croix-Rouge, Conseil européen de
réanimation, ANSM) mais **ne remplace pas une formation aux premiers secours** (PSC1 en France)
ni les consignes des autorités. Formez-vous, entraînez-vous, et gardez aussi une version
imprimée des fiches d'urgence.
