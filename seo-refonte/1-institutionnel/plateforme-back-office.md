# La plateforme : back-office noddl (pilier 2)

- **URL** : `https://noddl.io/solutions/back-office/` (URL conservée)
- **Statut** : ✏️ À modifier. **C'est la page la plus importante de la refonte** : elle porte le positionnement « plateforme ».
- **Rôle** : expliquer que noddl n'est pas seulement un site, mais **l'outil qui gère le site et tout le marketing digital** de l'entreprise, avec des modules par métier et des intégrations.
- **Cible** : dirigeants de TPE et PME, tous secteurs
- **Requêtes visées** (hypothèses) :
  - principale : « logiciel de gestion de site internet » ;
  - secondaires : « outil marketing digital TPE », « back-office site internet », « gérer son site et ses réseaux sociaux », « logiciel tout-en-un TPE », « application gestion site web ».
- **Search Console** : 9 impressions, position 7,6, **1 clic**. Le groupe de requêtes « backoffice », « back office », « back-office » (15 impressions) est le plus proche du produit.

## Balises

| | Actuel |
|---|---|
| Title | Logiciel pour artisan : site, fiche Google, avis et devis |
| Meta | Une seule appli sur votre téléphone pour votre site, votre fiche Google, vos réseaux, vos avis et vos devis. Un assistant IA écrit, vous validez. |
| H1 | Un logiciel pour artisan qui réunit le site, la fiche Google, les réseaux et les devis |

- **Title proposé** : `Logiciel de gestion de site internet et marketing digital`
- **Meta proposée** : `Une seule appli pour gérer votre site, vos réseaux, votre fiche Google, vos avis et vos devis, avec des modules par métier. L’IA écrit, vous validez.`
- **H1 proposé** : `Le back-office noddl : votre site et votre marketing digital, gérés depuis une seule appli`

## Plan de la page (H2)

1. **Ce qu'on y trouve, écran par écran.** *Existe.* Ajouter les écrans des modules métier.
2. **Des modules communs à tous.** Site, fiche Google, réseaux sociaux, avis, assistant IA, référencement local, avec un lien vers chaque page.
3. **Des modules pour votre métier.** Nouveau bloc, en tableau :

   | Module | Pour qui | Lien |
   |---|---|---|
   | Gestion de devis | Artisans, prestataires [À CONFIRMER : pompes funèbres ?] | `/solutions/relance-devis/` |
   | Suivi de chantier | Artisans du bâtiment | `/solutions/suivi-chantier/` |
   | Cartes et menus | Restaurants, boulangeries, traiteurs | `/solutions/cartes-menus/` |
   | Mentions obligatoires | Pompes funèbres [À CONFIRMER : immobilier ?] | `/solutions/mentions-obligatoires/` |

4. **Connecté à vos outils.** Zenchef, Apimo… avec un lien vers `/integrations/`.
5. **Sur le téléphone, d'abord.** *Existe.*
6. **Ce qui est mesuré, et comment.** *Existe* : statistiques, appels, demandes.
7. **Quatre étapes, et vous n'y pensez plus.** *Existe.*
8. **Avant, vous faisiez ça comment ?** *Existe.* Généraliser : « cinq outils, trois mots de passe, et un post Instagram tous les deux mois ».
9. **La même appli, adaptée à chaque secteur.** *Existe, à étendre.*
10. **FAQ** :
    - Puis-je utiliser le back-office sur un site qui n'est pas fait par noddl ? [À CONFIRMER]
    - Combien d'utilisateurs ? [À CONFIRMER]
    - Où sont hébergées mes données ?

## Contenu à faire apparaître

- Le mot **« noddl »** et l'expression **« back-office »** dans le premier paragraphe : la page se positionne déjà sur « backoffice ».
- La formule **« tout-en-un »** et la liste des canaux gérés : site, Google, Facebook, Instagram [À CONFIRMER : autres réseaux ?].

## Maillage interne

- **Sortants** : tous les modules, `/integrations/`, `/tarifs/`, `/metiers/`, `/glossaire/back-office/`.
- **Entrants** : accueil (bloc piliers), toutes les pages modules (« fait partie du back-office noddl »), `/glossaire/back-office/` (lien principal de cette page).

## Données structurées

`SoftwareApplication` :
- `name: "noddl"` ;
- `applicationCategory: "BusinessApplication"` ;
- `operatingSystem` [À CONFIRMER : Web, iOS, Android] ;
- `offers` à 69, 99 et 299 € HT ;
- `aggregateRating` uniquement si de vrais avis vérifiables existent.
