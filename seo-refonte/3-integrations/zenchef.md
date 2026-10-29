# Intégration : Zenchef

- **URL** : `https://noddl.io/integrations/zenchef/`
- **Statut** : 🆕 Nouvelle page. Zenchef n'est cité aujourd'hui que sur `/metiers/restaurant/`.
- **Secteur** : restaurants (lien principal vers `/metiers/restaurant/`)
- **Rappel** : Zenchef est une solution de réservation en ligne et de gestion pour restaurants.
- **Requêtes visées** (hypothèses, volumes à valider) :
  - principale : « site restaurant Zenchef » ;
  - secondaires : « intégrer Zenchef site internet », « module réservation Zenchef site », « widget Zenchef », « réservation en ligne restaurant site internet ».

## Balises

- **Title proposé** : `Site de restaurant avec réservation Zenchef intégrée`
- **Meta proposée** : `La réservation Zenchef directement sur votre site noddl, avec votre carte et votre menu du jour à jour partout. Le site de restaurant dès 69 € HT par mois.`
- **H1 proposé** : `Votre site de restaurant avec la réservation Zenchef intégrée`

## Plan de la page (H2)

1. **Le client réserve sans quitter votre site.** Le principe [À CONFIRMER : widget intégré, bouton, ou connexion API plus poussée ?].
2. **Réservation + carte + menu du jour, au même endroit.** Lien vers `/solutions/cartes-menus/`.
3. **Le bouton « Réserver » partout.** Site, fiche Google, Instagram [À CONFIRMER]. Liens vers `/solutions/fiche-google/` et `/solutions/reseaux-sociaux/`.
4. **Vous n'avez pas encore Zenchef ?** [À CONFIRMER : noddl l'installe-t-il ? Y a-t-il des alternatives gérées ?]
5. **Comment se passe le branchement.**
6. **FAQ.**

## Précautions

- Ne pas suggérer de partenariat officiel s'il n'existe pas. [À CONFIRMER]

## Maillage interne

- **Sortants** : `/metiers/restaurant/` (lien principal), `/solutions/cartes-menus/`, `/integrations/`.
- **Entrants** : `/metiers/restaurant/`, `/solutions/cartes-menus/`, `/integrations/`.

## Données structurées

`Service` (avec `isRelatedTo` → « Zenchef »), `FAQPage`, `BreadcrumbList`. Pour les **sites clients** : `Restaurant` avec `potentialAction` → `ReserveAction` [À CONFIRMER].
