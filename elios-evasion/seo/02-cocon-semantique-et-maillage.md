# Elios Evasion : cocon sémantique, maillage interne et externe

Préparé le 30/10/2026, à partir de `01-strategie-mots-cles.md` et des décisions validées le même jour :
- toutes les offres restent actives, aux mêmes prix ;
- `/seminaire-a-la-journee/` devient `/seminaire-avignon/` ;
- `/nos-destinations/` est fusionnée dans `/sejours/` ;
- deux pages Montagne sont créées (hiver et été) ;
- aucune nouvelle offre ;
- pas de Search Console pour l'instant.

## 1. Arborescence cible et menu

```
Accueil  /                                         ← « agence team building »
│
├── Nos séminaires  /sejours/                      ← HUB « idée séminaire entreprise »
│   │
│   ├── PILIER Montpellier  /seminaire-montpellier/            ← « team building Montpellier »
│   │   ├── escape game     …/journee-escape-game-nature-montpellier/
│   │   ├── murder party    …/journee-murder-party-montpellier/
│   │   ├── canoë Hérault   …/journee-descente-canoe-montpellier/
│   │   ├── grotte          …/journee-grotte-montpellier/
│   │   ├── trottinette     …/journee-trotinette-tout-terrain-electrique-montpellier/
│   │   ├── olympiades      …/journee-challenge-sportif-plage-montpellier/
│   │   └── kayak étang     …/journee-balade-kayak-etang-montpellier/
│   │
│   ├── PILIER Avignon  /seminaire-avignon/  (🔀 ex-/seminaire-a-la-journee/)  ← « team building Avignon »
│   │   ├── œnologie        …/journee-decouverte-du-vin/
│   │   ├── escape game     …/journee-escape-game-nature/
│   │   ├── murder party    …/journee-murder-party/
│   │   └── quiz            …/journee-quizz-room-avignon/
│   │
│   ├── PILIER Pyrénées  /sejours/sejour-team-building-pyrenees/   ← « séminaire Pyrénées » + « séminaire montagne »
│   │   ├── 🆕 hiver        /sejours/seminaire-ski-hiver/
│   │   ├── 🆕 été          /sejours/seminaire-montagne-ete/
│   │   ├── 🆕 Pyrénées catalanes /sejours/seminaire-pyrenees-catalanes/  ← « séminaire Font-Romeu »
│   │   └── (option) pages massifs : Pyrénées catalanes, Hautes-Pyrénées, Ariège, Pays basque/Béarn — voir 01 § 3.3
│   │
│   └── Sur-mesure  /journee-sur-mesure/           ← « team building sur mesure »
│
├── Blog  /blog/                                   ← cocon informationnel (10 articles)
├── FAQ  /faq/  🆕                                 ← « prix team building »
├── À propos  /a-propos/
├── Contact  /contact/
└── (footer) Mentions légales 🆕 · Politique de confidentialité · CGV 🆕
```

> Dans WordPress, les deux nouvelles pages Montagne ont `/sejours/` pour page parente, afin de garder des URL courtes. Le lien avec le pilier Montagne se fait par le maillage, pas par l'URL.

**Menu principal (Flatsome)**

```
Nos séminaires ▾                 À propos   Blog   Contact   [Bouton : Demander un devis]
  ├ Team building Montpellier
  ├ Team building Avignon
  ├ Séminaire dans les Pyrénées
  │   ├ Hiver : ski et neige
  │   ├ Été : rando, VTT, canyoning
  │   └ Font-Romeu et Pyrénées catalanes
  └ Journée sur mesure
```

Le méga-menu Flatsome peut afficher les fiches de chaque pilier en colonnes. **Elles restent cliquables** (liens HTML réels, pas de JavaScript).

**Footer (3 colonnes + bas de page)**
1. **Elios Evasion** : 2 lignes de présentation, l'adresse à Font-Romeu, le téléphone (`tel:+33679029332`) et les réseaux sociaux.
2. **Nos destinations** : Montpellier · Avignon · Montagne hiver · Montagne été · Sur mesure.
3. **Ressources** : FAQ · Blog · les 3 articles les plus importants.
4. **Bas de page** : Mentions légales · Confidentialité · CGV · © Elios Evasion.

Le footer actuel n'a plus aucun lien vers une page morte ni vers un ID de page (`?page_id=…`).

## 2. Règles du cocon

1. **Liens montants obligatoires** : chaque fiche renvoie vers son pilier, chaque pilier vers le hub `/sejours/` et l'accueil, chaque article vers la page commerciale qu'il sert.
2. **Liens descendants** : le pilier lie toutes ses fiches. Le hub lie les 3 piliers et le sur-mesure. L'accueil lie les 3 piliers, et au plus 3 fiches « coup de cœur ».
3. **Liens latéraux, uniquement à l'intérieur d'un silo** : une fiche lie 2 ou 3 fiches sœurs du même pilier (bloc « Autres journées autour de Montpellier »).
   - **Seule exception autorisée entre silos** : les fiches jumelles. Escape game Montpellier ↔ escape game Avignon, et murder party Montpellier ↔ murder party Avignon, avec l'ancre « … près d'Avignon / … près de Montpellier ». Ce lien aide Google à distinguer les deux pages au lieu de les mettre en concurrence.
4. **Les articles de blog** pointent vers 1 page commerciale principale, avec une ancre exacte ou proche, et 1 ou 2 pages secondaires. Les pages commerciales renvoient vers 1 ou 2 articles maximum, dans un bloc « Pour aller plus loin ».
5. **Les ancres sont variées et descriptives.** Jamais « cliquez ici » ni « voir les séjours ». Pour chaque page, l'ancre exacte (= mot-clé principal) sert au plus dans 1 lien sur 3 ; le reste en ancres proches.
6. **Profondeur maximale de 3 clics** depuis l'accueil pour toute page.
7. **Fil d'Ariane** (Yoast ou Rank Math) sur toutes les pages sauf l'accueil, balisé en `BreadcrumbList`.
8. **Les liens se trouvent dans le contenu** (paragraphes, cartes, boutons texte). Le menu et le footer ne comptent pas comme maillage du cocon.

## 3. Plan de maillage interne page par page

Ancres proposées en *italique*. Abréviations des fiches : **Mtp** = Montpellier, **Avi** = Avignon, **Mtg** = Montagne.

### Accueil `/`
| Vers | Ancre(s) |
|---|---|
| Pilier Mtp | *team building à Montpellier* |
| Pilier Avi | *séminaires et team building autour d'Avignon* |
| Pilier Mtg | *séminaire à la montagne dans les Pyrénées* |
| `/sejours/` | *toutes nos idées de séminaire d'entreprise* |
| `/journee-sur-mesure/` | *journée de cohésion sur mesure* |
| 3 fiches coup de cœur : grotte, œnologie, ski hiver | *team building dans une grotte*, *dégustation à Châteauneuf-du-Pape*, *séminaire ski à Font-Romeu* |
| FAQ + 2 articles (organiser un séminaire, prix) | *combien coûte un team building ?*, *comment organiser un séminaire d'entreprise* |

### Hub `/sejours/`
- **Vers les 3 piliers et le sur-mesure** : chacun présenté en carte (image, H3, 2 lignes, lien texte).
- **Vers les 12 fiches** : tableau comparatif « Activité · Lieu · Saison · Prix dès » avec un lien par ligne.
- **Vers les articles** : *idées de team building originales* et *séminaire de 2 jours : programme type*.

### Pilier Montpellier `/seminaire-montpellier/`
| Vers | Ancre(s) |
|---|---|
| Les 7 fiches (cartes) | *escape game en pleine nature*, *murder party dans un château*, *descente de l'Hérault en canoë*, *team building dans une grotte*, *trottinette électrique au Salagou*, *olympiades sur la plage de Palavas*, *kayak au coucher du soleil* |
| `/sejours/` (montant) | *nos autres destinations de séminaire* |
| `/journee-sur-mesure/` | *composer une journée sur mesure* |
| Pilier Mtg | *prolonger sur plusieurs jours à la montagne* |
| Articles | *idées de team building à Montpellier* (article idées), *organiser des olympiades d'entreprise* |

### Fiches Montpellier (×7), un modèle commun
- **Lien montant** vers le pilier, en haut (fil d'Ariane) et en bas : *toutes nos journées team building à Montpellier*.
- **Bloc « Autres journées autour de Montpellier »** : 3 fiches sœurs, en tournant pour que chaque fiche reçoive au moins 3 liens.

| Fiche | Sœurs liées | Article lié |
|---|---|---|
| Escape game | grotte, murder party, trottinette (+ jumelle escape game Avignon) | escape game en team building |
| Murder party | escape game, grotte, kayak (+ jumelle murder party Avignon) | murder party en entreprise |
| Canoë | trottinette, kayak, olympiades | idées de team building |
| Grotte | escape game, canoë, murder party | idées de team building |
| Trottinette | canoë, olympiades, escape game | idées de team building |
| Olympiades | kayak, canoë, trottinette | olympiades d'entreprise |
| Kayak | olympiades, canoë, murder party | sortie CSE |

### Pilier Avignon `/seminaire-avignon/`
- **Vers les 4 fiches** : *team building œnologie à Châteauneuf-du-Pape*, *escape game dans les vignes*, *murder party au château de Beauregard*, *quiz géant en équipe*.
- **Liens montants et transverses** : `/sejours/`, `/journee-sur-mesure/`, et l'article *idées de team building*.

### Fiches Avignon (×4)
- **Liens** : montant vers le pilier, 2 ou 3 sœurs, la jumelle Montpellier quand elle existe, 1 article.

| Fiche | Sœurs liées | Article lié |
|---|---|---|
| Œnologie | murder party, escape game | sortie CSE |
| Escape game | œnologie, quiz (+ jumelle escape game Mtp) | escape game en team building |
| Murder party | quiz, œnologie (+ jumelle murder party Mtp) | murder party en entreprise |
| Quiz | murder party, escape game | idées de team building |

### Pilier Montagne `/sejours/sejour-team-building-pyrenees/`
| Vers | Ancre(s) |
|---|---|
| 🆕 Hiver | *séminaire ski et neige à Font-Romeu* |
| 🆕 Été | *team building montagne en été : rando, VTT, canyoning* |
| `/sejours/` | *nos séminaires à la journée près de Montpellier et Avignon* |
| Articles | *programme type d'un séminaire de 2 jours*, *lieux à découvrir en Cerdagne et Capcir* |

### Pages Hiver et Été
- **Liens** : montant vers le pilier Montagne (*séminaire à la montagne dans les Pyrénées*), la page sœur (hiver ↔ été), et l'article Cerdagne/Capcir.

### `/journee-sur-mesure/`
- **Liens** : vers les 3 piliers (*à Montpellier*, *près d'Avignon*, *à la montagne*), vers la FAQ et vers `/contact/`.

### `/faq/`
- **Liens** : chaque réponse renvoie vers la page concernée. Par exemple, la question sur les prix renvoie vers `/sejours/` (comparatif), et la question sur la météo vers les fiches d'été.

### Blog : liens sortants de chaque article
| Article | Page commerciale principale (ancre) | Secondaires |
|---|---|---|
| Organiser un séminaire d'entreprise | `/sejours/` (*séminaire d'entreprise clé en main*) | pilier Mtg, FAQ |
| Organiser un team building | `/` (*agence team building*) | sur-mesure, article prix |
| Prix d'un team building | `/faq/` (*tarifs détaillés*) | `/sejours/` |
| Idées de team building originales | pilier Mtp (*team building Montpellier*) | pilier Avi, pilier Mtg, 3 fiches |
| Séminaire de 2 jours | pilier Mtg (*séminaire à la montagne*) | hiver, été |
| Olympiades d'entreprise | fiche olympiades (*olympiades d'entreprise sur la plage*) | pilier Mtp |
| Murder party en entreprise | fiche murder party Mtp | fiche murder party Avi |
| Escape game en team building | fiche escape game Mtp | fiche escape game Avi, grotte |
| Sortie CSE | `/sejours/` | œnologie, kayak |
| Cerdagne / Capcir | pilier Mtg (*séminaire en Cerdagne*) | hiver, été |

### Mesure à la mise en ligne
Faire un crawl (Screaming Frog gratuit jusqu'à 500 URL) et vérifier :
- **Liens :** 0 lien cassé, 0 lien interne vers une URL redirigée ;
- **Profondeur :** aucune page à plus de 3 clics, aucune page orpheline ;
- **Liens reçus :** chaque fiche reçoit au moins 4 liens internes dans le contenu.

## 4. Redirections 301

Liste complète : `donnees/redirections.csv`. À importer dans le plugin **Redirection**, ou directement dans Rank Math / Yoast Premium.

En résumé :
- **5 URL Avignon** → `/seminaire-avignon/…` ;
- **`/nos-destinations/`** → `/sejours/` ;
- **7 pages techniques vides** → la page la plus proche ;
- **`/remboursements_retours/`** → `/conditions-generales-de-vente/` ;
- **l'article daté** → `/blog/lieux-a-decouvrir-cerdagne-capcir/` ;
- **les archives catégorie et auteur.**

Les réglages qui vont avec :
- **Permaliens des articles** : `/blog/%postname%/`, au lieu du format daté actuel ;
- **Archives auteur** : désactivées, car il n'y a qu'un seul auteur ;
- **Catégorie « Non classé »** : renommée « Conseils ».

## 5. Maillage externe

### 5.1 Liens sortants, depuis nos pages

Les liens sortants vers des sources officielles renforcent la crédibilité aux yeux de Google comme des IA. Ils sont en *dofollow* (sans `rel="nofollow"`) et s'ouvrent dans le même onglet.

| Page | Lien sortant | Pourquoi |
|---|---|---|
| Pilier Mtg, Cerdagne | Office de tourisme de Font-Romeu ; Tourisme Pyrénées-Orientales (notre fiche) | Ancrage local, et la fiche confirme notre entité |
| Pilier Mtg, Cerdagne | Fortifications de Vauban sur le site de l'UNESCO (Mont-Louis) | Source d'autorité |
| Pilier Mtg, Cerdagne | Parc naturel régional des Pyrénées catalanes | Source d'autorité |
| Grotte | Site officiel de la grotte de Clamouse | Partenaire, et pour les infos pratiques |
| Canoë, grotte | Grand site de France Saint-Guilhem-le-Désert / gorges de l'Hérault | Contexte géographique |
| Trottinette | Grand site Salagou – cirque de Mourèze | Contexte géographique |
| Œnologie | Château des Fines Roches ; syndicat de l'AOC Châteauneuf-du-Pape | Partenaire, source d'autorité |
| Quiz | Quiz Room Avignon | Partenaire |
| Article sortie CSE | URSSAF, page sur les activités sociales et culturelles du CSE | Source officielle pour la partie réglementaire |

**Règles :**
- 1 à 3 liens sortants par page au maximum.
- Jamais de lien vers un concurrent ou une plateforme de réservation.
- Les liens vers les sites des partenaires sont **demandés en échange** (voir 5.2).

### 5.2 Liens entrants et citations (netlinking local)

Classés par priorité. Pour chaque cible : action, page à faire pointer, ancre souhaitée.

| Prio | Source | Action | Page cible |
|---|---|---|---|
| ⭐⭐⭐ | **Google Business Profile** (Font-Romeu) | Créer ou optimiser la fiche : catégorie « Organisateur d'événements d'entreprise » ou « Agence de team building », zone desservie Hérault / Vaucluse / Pyrénées-Orientales, photos, demandes d'avis | `/` |
| ⭐⭐⭐ | **Tourisme Pyrénées-Orientales** (fiche existante) | Mettre à jour la description (Montpellier, Avignon, montagne) et l'URL | `/sejours/sejour-team-building-pyrenees/` |
| ⭐⭐⭐ | **Partenaires** : grotte de Clamouse, Domaine de Capion, Domaine de la Grande Sieste, Château des Fines Roches, Château de Beauregard, Moulin des Gaffins, Quiz Room Avignon, prestataires d'activités | Demander une page ou une mention « organisé avec Elios Evasion » et un lien | la fiche correspondante |
| ⭐⭐ | **Offices de tourisme et espaces pros** : Font-Romeu, Hérault Tourisme / Montpellier Méditerranée (rubrique affaires, MICE), Avignon Tourisme (rubrique congrès et séminaires), Vaucluse Provence, Tourisme Occitanie (espace pro) | Référencement comme prestataire de séminaires ou d'incentives | piliers |
| ⭐⭐ | **Plateformes de séminaires** : Aleou (fiche existante), Funbooker, Naboo, Privateaser, Native Spaces, seminaire.com | Créer ou compléter les fiches avec lien. Elles sortent sur toutes nos requêtes et sont abondamment citées par les IA | piliers / fiches |
| ⭐⭐ | **Annuaires généraux cohérents** : PagesJaunes, Bing Places, Apple Business Connect, Infobel, Hoodspot, page LinkedIn de l'entreprise | Nom, adresse et téléphone **strictement identiques** partout | `/` |
| ⭐ | **Réseaux d'entreprises** : CPME 34/84/66, CCI Hérault / Vaucluse / Pyrénées-Orientales, clubs d'entreprises, réseaux RH (ANDRH Montpellier / Avignon) | Adhésion, partenariat, article invité | `/` ou blog |
| ⭐ | **Presse locale** : Midi Libre, L'Indépendant, La Provence, Objectif Gard / Hérault, presse MICE (Meet & Travel, Tendance Nomade) | Communiqué sur une offre insolite (grotte, ski + dameuse), avec photos | page de l'offre |
| ⭐ | **Clients** | Étude de cas publiée sur le blog du client, ou avis LinkedIn | `/` |

**À éviter** : l'achat de liens, les annuaires génériques de mauvaise qualité, les échanges de liens en masse.

**Indicateur** : obtenir 15 domaines référents de qualité dans les 6 mois qui suivent le lancement. Les partenaires et les offices de tourisme suffisent à atteindre ce chiffre.
