# Contexte : positionnement et constats de la Search Console

## Ce que noddl est réellement

noddl, c'est deux choses :
1. **Une agence qui crée des sites**, conçus par des humains et accélérés par l'IA. Livraison rapide, sans frais de création, à partir de 69 € HT par mois, et le site appartient au client au bout de 36 mois.
2. **Une plateforme (le back-office)** qui gère le site **et** le marketing digital de l'entreprise depuis une seule appli, avec :
   - **des modules communs** : site, fiche Google, réseaux sociaux, avis, assistant IA, référencement local ;
   - **des modules métier** : gestion de devis, suivi de chantier (artisans), cartes et menus (restaurants), mentions obligatoires (pompes funèbres), et d'autres ;
   - **des intégrations** avec les outils métier existants : Apimo (immobilier), Zenchef (restaurants), et d'autres.

**La cible :** les TPE et PME locales de plusieurs secteurs. Les artisans sont **une** cible parmi d'autres : restauration et commerces de bouche, pompes funèbres, agences immobilières, collectivités, écoles, associations…

## Ce que le site dit aujourd'hui (relevé du 29/10/2026)

Le site raconte « l'outil des artisans » :

| Page | Title actuel |
|---|---|
| Accueil | « le site internet **des artisans** » |
| `/solutions/` | « **Logiciel pour artisan** » |
| `/solutions/back-office/` | « **Logiciel pour artisan** » |
| `/clients/` | « **des artisans** » |
| `/a-propos/` | « **pour les artisans** » |
| Pages villes (environ 220) | « pour les artisans et commerçants » |

Le même biais se retrouve dans le reste du contenu :
- **Guides** : les 13 parlent d'artisans (devis, chantiers, fiche Google d'artisan).
- **Glossaire** : chaque H1 se termine par « pour un artisan ».
- **Absent du site** :
  - les pompes funèbres et les mentions obligatoires ;
  - l'immobilier et Apimo ;
  - le suivi de chantier en tant que module ;
  - la gestion des cartes et menus en tant que module ;
  - les intégrations en tant que telles.
- **Zenchef** n'est cité que sur `/metiers/restaurant/`.

## Ce que montre la Search Console (4 au 27 octobre 2026)

> Site jeune : 3 semaines utiles, 6 clics, 393 impressions. Ce sont des tendances, pas des certitudes.

| Intention de recherche | Impr. | Position moy. | Lecture |
|---|---|---|---|
| Marque (« noddl », « no dl ») | 22 | 6,8 | Pas encore n°1 sur son propre nom |
| Site pour artisan ou pour un métier | 42 | 65 | Bon sujet, invisible |
| Création de site + ville | 31 | 72 | Bon sujet, invisible |
| Concurrents (« simplebo avis », « obat avis ») | 9 | 43 | Très qualifié, à pousser |
| Fonctions (relance de devis, avis, chantiers) | 13 | 94 | Quasi absent |
| Glossaire (« back office définition »…) | 15 | 62 | Proche du produit, mais recherches de définitions |
| Hors cible : annuaires (« artisan toulouse », « entreprise douai »…) | 53 | 47 | Le plus gros groupe, et le mauvais public |

**À retenir :**
- **Environ 70 % des requêtes rattachables à une cible sont du vocabulaire artisan ou BTP.** C'est le reflet direct du contenu : Google positionne le site sur ce qu'il dit, pas sur ce que vous visez.
- **Aucune requête** sur : logiciel de gestion de site, plateforme marketing digital, gestion des réseaux sociaux d'entreprise, site de pompes funèbres, site d'agence immobilière, Apimo, menu de restaurant en ligne, Zenchef.
- **Les pages villes attirent des particuliers qui cherchent un artisan**, pas des entreprises qui cherchent un site.
- **64 pages villes sont déjà en `noindex`** et sorties du sitemap. Bonne décision, mais 2 des 6 clics venaient de ces pages (Landes, Saintes).
- **17 URL du sitemap n'ont aucune impression** : 5 pages métiers, 3 guides devis, les comparatifs Wix et Solocal, `/clients/`, etc. Il faut vérifier leur indexation dans le rapport « Pages » de la Search Console.
- **La position moyenne s'améliore** : environ 40 avant, puis 11 à 15 sur les 26 et 27 octobre. Une partie de ce gain est mécanique, liée aux pages retirées de l'index.

## Ce qui doit changer, en une phrase

**Dire partout « une agence + une plateforme pour les TPE et PME locales », garder « artisan » pour les pages artisans, et ajouter les pages qui manquent : modules métier, intégrations, nouveaux secteurs.**

## Ce qu'il ne faut pas faire

- Remplacer « artisan » par un terme abstrait partout. « Artisan » reste une requête qui rapporte sur les pages artisans.
- Multiplier les pages villes par secteur (villes × secteurs = des milliers de pages faibles).
- Renommer les URL existantes.
