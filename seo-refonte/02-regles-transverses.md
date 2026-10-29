# Règles transverses (valables pour toutes les pages)

## 1. Vocabulaire

| Contexte | Mot à employer | À éviter |
|---|---|---|
| Pages générales (accueil, plateforme, tarifs, à propos, clients, FAQ, comparatifs génériques) | « entreprises », « TPE et PME », « commerces et entreprises locales », ou l'énumération des secteurs | « artisan » comme cible unique |
| Pages artisans (métiers du bâtiment, suivi de chantier, comparatif Obat, guides chantiers) | « artisan » : c'est le mot que tapent les gens | Le remplacer par un terme abstrait |
| Pages secteur non artisan | Le mot du secteur : « restaurateur », « opérateur funéraire », « agence immobilière », « mairie »… | « artisan » |
| Le produit | « le back-office noddl », « l'appli », « la plateforme » | Alterner sans logique entre « logiciel », « outil » et « appli » dans une même page |

**Les mots-clés « plateforme » à faire exister** (hypothèses, volumes à valider) :
- logiciel de gestion de site internet ;
- outil marketing digital pour TPE ;
- gestion des réseaux sociaux d'entreprise ;
- back-office de site internet ;
- site internet + nom d'outil (Apimo, Zenchef…).

## 2. Marque (« noddl » est en position 6,8 sur sa propre requête)

- **Données structurées `Organization`** sur toutes les pages, avec :
  - `name`, `url`, `logo`, `telephone`, `address` (Montauban) ;
  - **`sameAs`**, absent aujourd'hui : LinkedIn, fiche Google de noddl, Instagram, Facebook, page Societe.com ou Pappers.
- **Fiche Google de noddl elle-même** : la créer ou la compléter (catégorie « Concepteur de sites Web » ou équivalent).
- **Mentionner « noddl » dans le H1 ou le premier paragraphe** de l'accueil, de `/a-propos/` et de `/solutions/back-office/`.
- **Liens externes avec le nom « noddl »** : profils d'annuaires professionnels, pages partenaires (Zenchef, Apimo, si un annuaire de partenaires existe [À CONFIRMER]), crédit « Site réalisé par noddl » dans le pied de page des sites clients.

## 3. Données structurées par type de page

| Type de page | Schema |
|---|---|
| Accueil | `Organization` + `WebSite` |
| `/solutions/back-office/` | `SoftwareApplication` (`applicationCategory: BusinessApplication`, `operatingSystem: Web, iOS, Android` [À CONFIRMER], `offers`) |
| `/solutions/site-internet/` et pages modules | `Service` + `Offer` (le schéma existe déjà, à garder) |
| Pages secteurs | `Service` avec `audience` (existe déjà) + `FAQPage` |
| Intégrations | `Service`, avec `isRelatedTo` pointant vers l'outil tiers (nom et URL) |
| Comparatifs, guides | `Article` + `BreadcrumbList` |
| FAQ | `FAQPage` |

## 4. Maillage interne

Chaque fiche page précise ses liens. Les règles générales :
- **Chaque module** est lié aux secteurs qui l'utilisent, avec un bloc « Utilisé par ».
- **Chaque secteur** est lié à ses modules et à ses intégrations, avec un bloc « Vos modules ».
- **Chaque intégration** est liée à son secteur, et le secteur est lié à l'intégration.
- **Les deux piliers** (`/solutions/site-internet/` et `/solutions/back-office/`) reçoivent un lien depuis toutes les pages modules, secteurs et intégrations.
- **Ancres descriptives** : « logiciel de suivi de chantier », pas « en savoir plus ».
- **Guides et glossaire** : chacun pointe vers **un seul** module ou secteur, celui qui convertit.

## 5. Ton des pages sensibles

- **Pompes funèbres** : sobriété totale. Pas de jeu de mots, pas de « boosté », pas d'emoji, pas de promesse de « plus de clients ». On parle de familles, de clarté et de conformité.
- **Collectivités** : vocabulaire administratif simple (secrétariat, arrêtés, habitants).

## 6. Suivi dans la Search Console

À regarder 4 à 6 semaines après publication, puis tous les mois :

| Indicateur | Filtre GSC | Ce qu'on veut voir |
|---|---|---|
| Part des impressions hors artisan | Requêtes ne contenant **pas** « artisan », « maçon », « chantier » | En hausse |
| Requêtes « plateforme » | Requête contient « logiciel », « back office », « gestion » | Positions inférieures à 30 |
| Nouveaux secteurs | Page contient `/pompes-funebres/`, `/agence-immobiliere/`, `/integrations/` | Premières impressions |
| Marque | Requête = « noddl » | Position 1 |
| Requêtes annuaire hors cible | « artisan + ville », « entreprise + ville » | En baisse |
| Indexation | Rapport « Pages » | Les 17 URL sans impression, plus les 8 nouvelles, sont indexées |
