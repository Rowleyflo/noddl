# Modèle : nouvelle page intégration

- **URL** : `https://noddl.io/integrations/{outil}/`
- **Statut** : 🆕
- **Outil** : {Nom exact de l'outil, graphie officielle}. {Ce qu'il fait, en une phrase.}
- **Secteur principal** : {secteur}, avec un lien vers `/metiers/{secteur}/`
- **Requêtes visées** (à valider) :
  - principale : « site internet {outil} » ;
  - secondaires : « intégrer {outil} site », « {outil} site web », « {outil} widget ».

## Balises

- **Title** : `Site de {secteur} connecté à {outil}` ou `Site de {secteur} avec {fonction} {outil} intégrée`. 60 caractères maximum.
- **Meta** : {ce qui se synchronise} + « sans double saisie » + {bénéfice}. 120 à 155 caractères.
- **H1** : `Votre site de {secteur} connecté à {outil} : {bénéfice}`

## Plan (H2)

1. Vous continuez dans {outil}, votre site suit.
2. Ce qui remonte sur le site (liste précise des données).
3. Ce que ça change pour vos clients.
4. Avec les autres modules noddl (cartes, réseaux, fiche Google…).
5. Comment se passe le branchement (qui, délai, prérequis).
6. FAQ : coût, sécurité, changement d'outil.

## Précautions

- [ ] Partenariat officiel ou simple connexion technique ? Ne pas utiliser le logo ni de formulation de type « partenaire » sans accord.
- [ ] Données réellement synchronisées, sens et fréquence validés par l'équipe technique.

## Maillage

- **Sortants** : `/metiers/{secteur}/` (lien principal), `/integrations/`, modules liés.
- **Entrants** : `/integrations/`, `/metiers/{secteur}/`, modules liés.

## Données structurées

`Service` (`isRelatedTo` → `SoftwareApplication` {outil}), `FAQPage`, `BreadcrumbList`.

## Avant publication

- [ ] Ajoutée au hub `/integrations/` et à `sitemap-integrations.xml`.
- [ ] Indexation demandée dans la Search Console.
