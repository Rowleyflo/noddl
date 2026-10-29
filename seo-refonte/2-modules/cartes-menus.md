# Module : cartes et menus

- **URL** : `https://noddl.io/solutions/cartes-menus/`
- **Statut** : 🆕 Nouvelle page
- **Type** : module métier, restauration et commerces de bouche
- **Cible** : restaurants, brasseries, traiteurs, boulangeries-pâtisseries, boucheries-traiteurs, épiceries fines et caves
- **Requêtes visées** (hypothèses, volumes à valider) :
  - principale : « menu restaurant en ligne » ;
  - secondaires : « mettre son menu sur Google », « carte restaurant site internet », « menu du jour en ligne », « logiciel carte restaurant », « menu QR code » [À CONFIRMER : le module génère-t-il un QR code ?].
- **Search Console** : rien aujourd'hui. `/metiers/restaurant/` : 1 impression, position 5.

## Balises

- **Title proposé** : `Menu et carte de restaurant en ligne, à jour partout`
- **Meta proposée** : `Changez le menu du jour ou la carte une fois : votre site, votre fiche Google et Instagram sont à jour. Prix, plats, formules, sans rien ressaisir.`
- **H1 proposé** : `Votre carte et votre menu du jour, à jour sur votre site, Google et Instagram en un geste`

## Plan de la page (H2)

1. **Le menu du jour change, tout le reste suit.** Le problème : l'ardoise à jour, mais la carte en PDF sur le site date de l'an dernier.
2. **Une carte, trois vitrines.** Le site, la fiche Google (menu), Instagram. Liens vers `/solutions/fiche-google/` et `/solutions/reseaux-sociaux/`.
3. **Ce qu'on y gère.** Plats, prix, formules, catégories, plats du jour, indisponibilités [À CONFIRMER : allergènes, origine des viandes, mentions « fait maison » ?].
4. **Avec la réservation en ligne.** Lien vers `/integrations/zenchef/`.
5. **Pas seulement pour les restaurants.** Plateaux de fêtes (boucherie-traiteur), gâteaux (boulangerie), paniers (épicerie fine) : liens vers les 3 pages métiers.
6. **L'assistant écrit vos descriptions.** Lien vers `/solutions/assistant-ia/`.
7. **FAQ** : QR code [À CONFIRMER], plusieurs cartes (midi, soir) [À CONFIRMER], traduction [À CONFIRMER].

## Contenu à faire apparaître

- Mentionner les **informations obligatoires sur une carte de restaurant** (allergènes, origine de la viande bovine, etc.) uniquement si le module les gère. Sinon, ne pas promettre de conformité. [À CONFIRMER, et à valider sur le plan réglementaire]
- Une capture : édition du menu du jour sur mobile.

## Maillage interne

- **Sortants** : `/metiers/restaurant/`, `/metiers/boulangerie-patisserie/`, `/metiers/boucherie-traiteur/`, `/metiers/epicerie-fine-cave/`, `/integrations/zenchef/`, `/solutions/back-office/`.
- **Entrants** : ces 4 pages métiers, `/integrations/zenchef/`, `/solutions/`, `/solutions/back-office/`.

## Données structurées

`Service` + `FAQPage`. Pour les **sites clients** (pas cette page) : `Restaurant` + `Menu`, `MenuSection`, `MenuItem`. C'est un argument SEO fort à mettre en avant : « votre carte est lisible par Google ». [À CONFIRMER : les sites clients ont-ils ce balisage ?]
