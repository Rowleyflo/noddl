# Hub des modules

- **URL** : `https://noddl.io/solutions/`
- **Statut** : ✏️ À modifier
- **Rôle** : catalogue de tous les modules du back-office, communs et métier, et matrice « quel module pour quel secteur ».
- **Requêtes visées** (hypothèses) : « fonctionnalités noddl », « outils marketing digital TPE », « modules site internet ».
- **Search Console** : 20 impressions, position 9,7, 0 clic.

## Balises

| | Actuel |
|---|---|
| Title | Logiciel pour artisan : toutes les fonctions de noddl |
| Meta | Site, fiche Google, réseaux, avis, suivi des devis, référencement local et assistant IA : tout noddl, réuni dans une seule appli sur votre téléphone. |
| H1 | Les fonctions du back-office noddl : le site, la fiche Google, les réseaux et les devis au même endroit |

- **Title proposé** : `Les modules noddl : site, réseaux, devis, menus, chantiers`
- **Meta proposée** : `Site, réseaux sociaux, fiche Google, devis, suivi de chantier, cartes et menus, mentions obligatoires : les modules noddl, à activer selon votre métier.`
- **H1 proposé** : `Les modules du back-office noddl : activez ceux dont votre métier a besoin`

## Plan de la page (H2)

1. **Les modules communs à tous.** Cartes vers : site internet, fiche Google, réseaux sociaux, assistant IA, référencement local.
   [À CONFIRMER : la gestion des avis est-elle un module distinct ? Aucune page `/solutions/avis/` n'existe aujourd'hui. Si oui, prévoir une fiche avec `modeles/modele-module.md`.]
2. **Les modules métier.** Cartes vers : gestion de devis, suivi de chantier, cartes et menus, mentions obligatoires.
3. **Les intégrations.** Logos et lien vers `/integrations/`.
4. **Quel module pour quel secteur.** Matrice :

   | | Bâtiment | Restauration et bouche | Pompes funèbres | Immobilier | Collectivités |
   |---|---|---|---|---|---|
   | Site, fiche Google, réseaux, IA | ✔ | ✔ | ✔ | ✔ | ✔ |
   | Gestion de devis | ✔ | | [?] | | |
   | Suivi de chantier | ✔ | | | | |
   | Cartes et menus | | ✔ | | | |
   | Mentions obligatoires | | | ✔ | [?] | |
   | Intégrations | | Zenchef | | Apimo | |

   *Les cases [?] sont à confirmer.*
5. **Tout part du même back-office.** Lien vers `/solutions/back-office/`.

## Maillage interne

Lien vers chaque module, vers `/solutions/back-office/` (lien principal) et vers `/metiers/`.

## Données structurées

`CollectionPage` + `ItemList` des modules.
