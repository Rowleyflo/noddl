# Refonte SEO noddl : passer de « l'outil des artisans » à « l'agence + la plateforme multi-secteurs »

Préparé le 29/10/2026 à partir :
- de l'export Google Search Console du 4 au 27 octobre 2026 (6 clics, 393 impressions) ;
- d'un relevé en ligne des balises de toutes les pages de noddl.io (hors pages villes, traitées par modèle).

## Comment utiliser ces fichiers

1. Donnez d'abord à la discussion ces trois fichiers : `00-contexte-analyse.md`, `01-arborescence.md` et `02-regles-transverses.md`. Ils contiennent le positionnement, la cible et les règles communes.
2. Travaillez ensuite **une fiche page à la fois**. Chaque fiche se suffit à elle-même : URL, statut, requêtes visées, balises actuelles et proposées, plan des H2, maillage, données structurées, points à confirmer.
3. Avant de publier, remplacez chaque **`[À CONFIRMER]`**. Ce sont des hypothèses sur le produit (fonctionnement d'un module, inclusion dans les formules, liste des intégrations, clients réels) que je n'ai pas pu vérifier.

## Conventions

- **Title** : 60 caractères maximum. **Meta description** : 120 à 155 caractères. Toutes les propositions ont été vérifiées sur ces longueurs.
- **Statut** :
  - 🆕 Nouvelle : la page est à créer.
  - ✏️ À modifier : la page existe, ses balises ou son contenu changent.
  - ✅ Inchangée : les balises restent, seul le maillage ou un ajout mineur est prévu.
- **Requêtes visées** : ce sont des hypothèses de travail. **Aucun volume de recherche n'a été mesuré.** À valider avec un outil de mots-clés (Google Keyword Planner, Semrush, Ahrefs…) avant d'arbitrer les priorités.
- **Les URL existantes ne changent pas.** Le site est jeune, mais casser des URL déjà vues par Google n'apporte rien. Seuls les libellés (menu, titres) évoluent.

## Index

### Cadrage
| Fichier | Contenu |
|---|---|
| `00-contexte-analyse.md` | Positionnement, constats de la Search Console, ce qui doit changer |
| `01-arborescence.md` | Arborescence cible, menu, nouvelles URL, sitemaps |
| `02-regles-transverses.md` | Vocabulaire, marque, données structurées, maillage, suivi des résultats |

### 1. Pages institutionnelles
| Fichier | URL | Statut |
|---|---|---|
| `1-institutionnel/accueil.md` | `/` | ✏️ |
| `1-institutionnel/creation-site-internet.md` | `/solutions/site-internet/` | ✏️ |
| `1-institutionnel/plateforme-back-office.md` | `/solutions/back-office/` | ✏️ (devient la page pilier « plateforme ») |
| `1-institutionnel/tarifs.md` | `/tarifs/` | ✏️ |
| `1-institutionnel/a-propos.md` | `/a-propos/` | ✏️ |
| `1-institutionnel/clients.md` | `/clients/` | ✏️ |
| `1-institutionnel/methode.md` | `/methode/` | ✏️ (léger) |
| `1-institutionnel/faq.md` | `/faq/` | ✏️ (questions à ajouter) |
| `1-institutionnel/contact.md` | `/contact/` | ✅ |

### 2. Modules (fonctions du back-office)
| Fichier | URL | Statut |
|---|---|---|
| `2-modules/hub-modules.md` | `/solutions/` | ✏️ |
| `2-modules/reseaux-sociaux.md` | `/solutions/reseaux-sociaux/` | ✏️ |
| `2-modules/devis.md` | `/solutions/relance-devis/` | ✏️ |
| `2-modules/fiche-google.md` | `/solutions/fiche-google/` | ✏️ |
| `2-modules/seo-local.md` | `/solutions/seo-local/` | ✏️ |
| `2-modules/assistant-ia.md` | `/solutions/assistant-ia/` | ✏️ |
| `2-modules/suivi-chantier.md` | `/solutions/suivi-chantier/` | 🆕 |
| `2-modules/cartes-menus.md` | `/solutions/cartes-menus/` | 🆕 |
| `2-modules/mentions-obligatoires.md` | `/solutions/mentions-obligatoires/` | 🆕 |

### 3. Intégrations
| Fichier | URL | Statut |
|---|---|---|
| `3-integrations/hub-integrations.md` | `/integrations/` | 🆕 |
| `3-integrations/apimo.md` | `/integrations/apimo/` | 🆕 |
| `3-integrations/zenchef.md` | `/integrations/zenchef/` | 🆕 |

### 4. Secteurs (URL `/metiers/` conservée)
| Fichier | URL | Statut |
|---|---|---|
| `4-secteurs/hub-secteurs.md` | `/metiers/` | ✏️ |
| `4-secteurs/pompes-funebres.md` | `/metiers/pompes-funebres/` | 🆕 |
| `4-secteurs/agence-immobiliere.md` | `/metiers/agence-immobiliere/` | 🆕 |
| `4-secteurs/restaurant.md` | `/metiers/restaurant/` | ✏️ |
| `4-secteurs/boulangerie-patisserie.md` | `/metiers/boulangerie-patisserie/` | ✏️ (léger) |
| `4-secteurs/boucherie-traiteur.md` | `/metiers/boucherie-traiteur/` | ✏️ (léger) |
| `4-secteurs/epicerie-fine-cave.md` | `/metiers/epicerie-fine-cave/` | ✏️ (léger) |
| `4-secteurs/macon-renovation.md` | `/metiers/macon-renovation/` | ✏️ |
| `4-secteurs/couvreur.md` | `/metiers/couvreur/` | ✏️ (léger) |
| `4-secteurs/electricien.md` | `/metiers/electricien/` | ✏️ (léger) |
| `4-secteurs/plombier-chauffagiste.md` | `/metiers/plombier-chauffagiste/` | ✏️ (léger) |
| `4-secteurs/climatisation-pompe-a-chaleur.md` | `/metiers/climatisation-pompe-a-chaleur/` | ✏️ (léger) |
| `4-secteurs/paysagiste.md` | `/metiers/paysagiste/` | ✏️ (léger) |
| `4-secteurs/mairie.md` | `/metiers/mairie/` | ✅ |
| `4-secteurs/ecole.md` | `/metiers/ecole/` | ✅ |
| `4-secteurs/association-club.md` | `/metiers/association-club/` | ✅ |

### 5. Comparatifs
| Fichier | URL | Statut |
|---|---|---|
| `5-comparatifs/agence-web.md` | `/comparatifs/noddl-ou-agence-web/` | ✏️ |
| `5-comparatifs/wix.md` | `/comparatifs/noddl-ou-wix/` | ✏️ |
| `5-comparatifs/simplebo.md` | `/comparatifs/noddl-ou-simplebo/` | ✏️ (H1 seulement) |
| `5-comparatifs/solocal.md` | `/comparatifs/noddl-ou-solocal/` | ✏️ (H1 seulement) |
| `5-comparatifs/obat.md` | `/comparatifs/noddl-ou-obat/` | ✅ |
| `5-comparatifs/nouveaux-comparatifs.md` | à créer | 🆕 (propositions) |

### 6. Contenus de masse (une fiche par famille, chaque page y a sa ligne)
| Fichier | Pages concernées |
|---|---|
| `6-contenus/guides.md` | `/guides/` et ses 13 pages, plus les nouveaux guides proposés |
| `6-contenus/glossaire.md` | `/glossaire/` et ses 6 pages, plus les nouvelles entrées |
| `6-contenus/villes.md` | `/villes/` et les environ 220 pages villes et départements (modèle commun) |
| `6-contenus/auteur.md` | `/auteurs/romain/` |

### Modèles pour les pages à venir
| Fichier | Usage |
|---|---|
| `modeles/modele-secteur.md` | Chaque nouveau secteur |
| `modeles/modele-module.md` | Chaque nouveau module |
| `modeles/modele-integration.md` | Chaque nouvel outil connecté |
