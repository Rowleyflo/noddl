# Tenera : références

- **URL** : `/references/`
- **Statut** : 🆕
- **Rôle** : preuve sociale consolidée du groupe. **Une sélection**, pas un doublon des portfolios : la fiche complète vit sur le site de la filiale.
- **Requêtes visées** : marque + « références », et recherches sur les noms de grands chantiers (« électricité Marion Dufresne »), qui se travaillent surtout sur les sites des filiales.

## Balises

- **Title** : `Références : chantiers navals, industriels et tertiaires`
- **Meta** : `CHU, centrales EDF, navires, raffinerie, lieux de prestige : une sélection des chantiers réalisés par les entreprises du groupe Tenera depuis 2005.`
- **H1** : `Nos références`

## Contenu

- **Bandeau des donneurs d'ordre** : logos **et** liste texte (autorisations [À CONFIRMER]).
- **Grille filtrable** par secteur (naval, industrie et énergie, tertiaire, santé) et par entreprise (Stena, LC Concept).
- **Chaque carte** : photo, nom du chantier, ville (département), entreprise du groupe, 1 ligne de prestation, lien **vers la fiche chantier du site de la filiale**.
- **Mettre en avant les chantiers communs** Stena + LC Concept (Marion Dufresne, Yersin, Fouquet's, Super U Saint-Michel-Chef-Chef) avec un badge « Réalisé à plusieurs entreprises du groupe ».

## Sélection de départ (issue de stena.fr et de la plaquette)

| Chantier | Secteur | Entreprise(s) |
|---|---|---|
| Navire océanographique Marion Dufresne, Dunkerque | Naval | Stena + LC Concept |
| Navire Yersin, Concarneau | Naval | Stena + LC Concept |
| Centrale EDF de Cordemais | Énergie | Stena |
| Raffinerie de Donges (Seveso, ATEX) | Industrie | Stena |
| CHU de Nantes | Santé | Stena |
| CHU de Caen (zone amiantée) | Santé | Stena |
| Roland-Garros, bâtiment TV | Tertiaire | Stena |
| Hôtel Fouquet's, Paris | Prestige | Stena + LC Concept |
| + références de LC Concept : MSC Croisières, Naval Group, Brittany Ferries | Naval | LC Concept [À CONFIRMER] |

⚠️ Ces chantiers datent de 2015-2017. Ajouter au moins 4 chantiers récents avant la mise en ligne (`04-collecte-client.md`, question 17).

## Données structurées

`CollectionPage` + `ItemList` dont chaque élément a pour `url` la fiche chez la filiale.
