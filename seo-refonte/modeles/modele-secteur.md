# Modèle : nouvelle page secteur

- **URL** : `https://noddl.io/metiers/{slug}/`
- **Statut** : 🆕
- **Groupe** : {Artisans du bâtiment | Restauration et bouche | Professions réglementées | Collectivités et associations | nouveau groupe}
- **Cible** : {qui précisément, taille d'entreprise}
- **Requêtes visées** (à valider avec un outil de mots-clés) :
  - principale : « site internet {métier} » ;
  - secondaires : « création site {métier} », « site {métier} + {outil métier} », « {problème métier} en ligne ».

## Balises

- **Title** : `Site internet de {métier} : {bénéfice principal}`. 60 caractères maximum.
- **Meta** : {situation concrète} + {ce que noddl fait} + « Dès 69 € HT par mois. » 120 à 155 caractères.
- **H1** : `Site internet, {fonction 1} et {fonction 2} pour {métier}`

## Plan (H2), identique aux pages métiers existantes

1. Trois situations que vous connaissez.
2. Trois moments, trois gestes, depuis le téléphone.
3. Les fonctions utiles à votre métier, et qui les utilise déjà. **Chaque fonction est liée à sa page module.**
4. {Bloc spécifique : réglementation, intégration, saisonnalité…}
5. Ce qui change, point par point.
6. Les questions qu'un {métier} nous pose (FAQ).

## Maillage

- **Sortants** : module(s) phare(s) (lien principal), intégration(s), `/solutions/site-internet/`, `/tarifs/`.
- **Entrants** : `/metiers/` (bon groupe), module(s) phare(s) (bloc « Utilisé par »), intégration(s).

## Données structurées

`Service` avec `audience`, `Offer`, `FAQPage`, `BreadcrumbList`.

## Avant publication

- [ ] Au moins un élément réel propre au secteur (client, capture, chiffre).
- [ ] Aucun bloc artisan générique hérité (« chantiers », « devis ») si le secteur n'est pas concerné.
- [ ] Page ajoutée à `sitemap-metiers.xml` et au hub `/metiers/`.
- [ ] Indexation demandée dans la Search Console.
