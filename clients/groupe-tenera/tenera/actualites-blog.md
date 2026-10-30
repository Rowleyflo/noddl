# Tenera : actualités et blog

- **URL** : `/actualites/` et `/actualites/<slug>/`
- **Statut** : 🆕 (option « Blog + génération IA » de la formule Signature)
- **Rôle** : le seul canal éditorial régulier du groupe. Trois usages : **annonces** (rachats, grands chantiers, recrutements), **preuve d'activité** (des dates récentes rassurent humains et IA) et **sujets transverses** qui n'appartiennent à aucune filiale.

## Balises du hub

- **Title** : `Actualités du groupe Tenera : chantiers, rachats, emploi`
- **Meta** : `Nouveaux chantiers, entreprises qui rejoignent le groupe, recrutements, regards sur nos métiers : toute l'actualité du groupe Tenera et de ses filiales.`
- **H1** : `Actualités du groupe Tenera`

## Règles éditoriales

1. **Pas de guide technique métier** (« comment tirer un câble de 240 mm² ») sur Tenera : ce sujet appartient à Stena et ferait concurrence à sa page `/tirage-de-cables/`. Si le client veut ce type de contenu, prévoir l'option blog sur stena.fr.
2. **Chaque article est signé** par une personne réelle (dirigeant, conducteur de travaux), avec une page auteur ou un lien LinkedIn.
3. **L'IA rédige des brouillons, un humain du groupe relit et ajoute des faits** : chiffres, noms, photos. Un article sans fait propre au groupe n'apporte rien, ni en SEO ni en GEO.
4. **Rythme réaliste** : 1 article par mois, plus une annonce à chaque événement (rachat, grand chantier, salon).
5. Chaque article pointe vers **une seule** page de conversion : une filiale, `/rejoindre-le-groupe/` ou `/carrieres/`.

## Premiers sujets proposés

| # | Sujet | Type | Requête visée (hypothèse) | Lien de conversion |
|---|---|---|---|---|
| 1 | Tenera est créé : Stena et LC Concept réunies dans un groupe | Annonce | groupe tenera | `/le-groupe/` |
| 2 | Stena et LC Concept, quinze ans de chantiers navals en commun | Histoire, preuve | électricité éclairage navire | `/savoir-faire/` |
| 3 | Transmettre son entreprise d'électricité : les 7 questions à se poser avant de céder | Cédants | transmission entreprise électricité | `/rejoindre-le-groupe/` |
| 4 | Céder à un groupe ou à un concurrent : ce qui change pour vos salariés et vos clients | Cédants | vendre son entreprise d'électricité | `/rejoindre-le-groupe/` |
| 5 | Sous-traitance électrique : pourquoi nous ne recourons jamais au travail détaché | Position, preuve | sous-traitance électricité travail détaché | stena.fr |
| 6 | Travailler en zone amiantée sous-section 4 : comment nos équipes s'organisent | Preuve, emploi | électricien amiante sous-section 4 | stena.fr, secteur sites sensibles |
| 7 | Électricien en chantier naval : un métier, des contraintes à part | Emploi | électricien naval emploi | stena.fr `/recrutement/` |
| 8 | Bilan de l'année : chantiers, recrutements, nouvelles entreprises | Annonce | — | `/le-groupe/` |

Les sujets 6 et 7 se recoupent avec Stena. Ils restent sur Tenera parce qu'ils parlent **d'organisation et d'emploi**, pas de technique. Leur angle doit rester celui-là.

## Données structurées

`Blog` sur le hub. `BlogPosting` (ou `NewsArticle` pour les annonces) avec `author` (`Person`), `publisher` → `#org`, `datePublished` et `dateModified`.
