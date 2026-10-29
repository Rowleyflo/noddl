# Hub des intégrations

- **URL** : `https://noddl.io/integrations/`
- **Statut** : 🆕 Nouvelle page (nouvelle section du site, avec son propre `sitemap-integrations.xml`)
- **Rôle** : montrer que noddl **se branche aux outils métier existants** au lieu de les remplacer. C'est un argument fort pour les secteurs déjà équipés (restaurants, agences immobilières).
- **Requêtes visées** (hypothèses) :
  - « site internet connecté à [outil] » ;
  - « intégration [outil] site web » ;
  - « [outil] site internet ».
- **Pourquoi c'est prioritaire** : les requêtes de type « nom d'outil + site » ont généralement peu de concurrence et une intention d'achat forte. C'est le levier le plus rapide pour un site jeune.

## Balises

- **Title proposé** : `Intégrations noddl : Zenchef, Apimo et vos outils métier`
- **Meta proposée** : `Votre site noddl se connecte aux outils que vous utilisez déjà : réservations Zenchef, annonces Apimo… Vos données restent à jour, sans double saisie.`
- **H1 proposé** : `Les outils que votre site noddl sait connecter`

## Plan de la page (H2)

1. **Gardez vos outils, on les branche.** Principe : pas de migration, pas de double saisie.
2. **Par secteur.** Une carte par intégration (logo, une phrase, lien) :
   - Restauration : Zenchef (lien vers `/integrations/zenchef/`).
   - Immobilier : Apimo (lien vers `/integrations/apimo/`).
   - [À CONFIRMER : autres outils, par exemple prise de rendez-vous, paiement, caisse, e-mailing, avis…]
3. **Votre outil n'est pas dans la liste ?** Formulaire ou CTA vers `/contact/`. Bonne source d'idées pour les prochaines intégrations.
4. **Comment se passe le branchement.** Qui le fait, en combien de temps, ce qu'il faut fournir (clé API, identifiants) [À CONFIRMER].
5. **FAQ** : sécurité, coût, que se passe-t-il si je change d'outil.

## Maillage interne

- **Sortants** : chaque page d'intégration, `/solutions/back-office/`, `/metiers/`.
- **Entrants** : menu principal, accueil, `/solutions/`, `/solutions/back-office/`, `/methode/`, `/tarifs/`.

## Données structurées

`CollectionPage` + `ItemList` + `BreadcrumbList`.

## Pour chaque nouvelle intégration

Utiliser `modeles/modele-integration.md`.
