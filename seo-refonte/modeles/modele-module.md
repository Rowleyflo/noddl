# Modèle : nouvelle page module

- **URL** : `https://noddl.io/solutions/{slug}/`
- **Statut** : 🆕
- **Type** : {module commun | module métier}
- **Secteurs qui l'utilisent** : {liste}
- **Requêtes visées** (à valider) :
  - principale : « logiciel {fonction} » ou « {fonction} en ligne » ;
  - secondaires : « {fonction} {secteur} », « application {fonction} ».

## Balises

- **Title** : `{Fonction} : {bénéfice concret}` ou `Logiciel de {fonction} pour {secteur}`. 60 caractères maximum.
- **Meta** : {ce que ça fait, en une phrase} + {le geste depuis le téléphone} + {le résultat}. 120 à 155 caractères.
- **H1** : `{Fonction} : {promesse en trois temps}`

## Plan (H2), identique aux pages solutions existantes

1. Ce que ça change dans une semaine de travail.
2. Comment ça marche (avec une capture mobile).
3. Ce que le module ne fait pas.
4. Pour qui c'est fait, et pour qui ça ne l'est pas. **Avec un lien vers chaque page secteur concernée.**
5. Quatre étapes, et vous n'y pensez plus.
6. Avant, vous faisiez ça comment ?
7. FAQ.

## Maillage

- **Sortants** : `/solutions/back-office/` (« fait partie du back-office noddl »), les secteurs concernés, les modules complémentaires.
- **Entrants** : `/solutions/`, `/solutions/back-office/` (tableau des modules), pages secteurs, guides et glossaire liés.

## Données structurées

`Service`, `Offer`, `FAQPage`, `BreadcrumbList`.

## Avant publication

- [ ] Fonctionnement décrit validé par l'équipe produit.
- [ ] Inclusion dans les formules indiquée (et cohérente avec `/tarifs/`).
- [ ] Ajouté à la matrice « quel module pour quel secteur » de `/solutions/`.
- [ ] Page ajoutée à `sitemap-solutions.xml`, indexation demandée.
