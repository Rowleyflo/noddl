# Elios Evasion : métadonnées, images (alt) et données structurées

Préparé le 30/10/2026. Les sources de données sont :
- `donnees/metadonnees.json` pour les titles, metas et H1. Ce fichier servira aussi à l'import automatique dans WordPress.
- `donnees/images-alt.csv` pour les 97 photos.

## 1. Règles

- **Title** : 60 caractères maximum. Le mot-clé principal est placé en tête, la marque « | Elios Evasion » (ou « | Elios ») en fin quand elle tient.
- **Meta description** : 120 à 155 caractères. Elle contient le mot-clé, un élément concret (lieu, durée, prix « dès … € HT »), et une incitation implicite.
- **Vérification** : toutes les longueurs ci-dessous ont été contrôlées par script.
- **H1** : un seul par page, différent du title (formulé pour l'humain), et le mot-clé y figure.
- **Hiérarchie des titres** : H2 pour les sections, H3 pour les sous-sections ou les cartes. Les accroches ne sont plus des titres : ce sont des paragraphes stylés (classe Flatsome `lead`).
- **Open Graph** : l'image de partage est la photo principale de la page (1200 × 630). Le titre et la description OG sont ceux de Yoast, ce qui met fin au code WPBakery affiché aujourd'hui lors des partages.
- **Robots** :
  - `index, follow` sur toutes les pages listées ci-dessous ;
  - `noindex, follow` sur les mentions légales, la politique de confidentialité, les CGV, la page de remerciement des formulaires, les résultats de recherche interne, les archives de date et de tag, et les pages de pièces jointes (option Yoast « rediriger les URL des médias »).
- **Prix** : on affiche le prix « dès » le plus bas de chaque fiche. L'escape game de Montpellier affiche aujourd'hui 130 € et 140 € sur la même page : j'ai retenu **130 €**. **[À CONFIRMER]**

## 2. Métadonnées page par page

### Transverse

#### `/` ✏️
- **Mot-clé principal** : agence team building
- **Title** (57 car.) : Agence team building et séminaires nature | Elios Evasion
- **Meta description** (140 car.) : Séminaires et team building insolites en pleine nature : Montpellier, Avignon et montagne catalane. Journées clés en main dès 100 € HT/pers.
- **H1** : Agence de team building et de séminaires en pleine nature dans le Sud

#### `/sejours/` ✏️
- **Mot-clé principal** : idée séminaire entreprise
- **Title** (59 car.) : Idées de séminaire entreprise et team building clés en main
- **Meta description** (151 car.) : Journées team building à Montpellier et Avignon, séminaires de plusieurs jours à la montagne : comparez nos formules clés en main et demandez un devis.
- **H1** : Nos séminaires et team buildings clés en main

#### `/journee-sur-mesure/` ✏️
- **Mot-clé principal** : team building sur mesure
- **Title** (59 car.) : Team building sur mesure : votre journée à la carte | Elios
- **Meta description** (153 car.) : Activités, lieu, traiteur, temps de travail : composez une journée de cohésion d'équipe 100 % sur mesure avec nos partenaires. Dès 110 € HT par personne.
- **H1** : Team building sur mesure : une journée de cohésion à votre image


### Montpellier

#### `/seminaire-montpellier/` ✏️
- **Mot-clé principal** : team building Montpellier
- **Title** (58 car.) : Team building Montpellier : séminaires nature et insolites
- **Meta description** (145 car.) : Escape game, canoë, grotte, olympiades à la plage… 7 journées team building clés en main autour de Montpellier, salle de travail et repas inclus.
- **H1** : Team building et séminaire d'entreprise à Montpellier

#### `/seminaire-montpellier/journee-escape-game-nature-montpellier/` ✏️
- **Mot-clé principal** : escape game team building Montpellier
- **Title** (53 car.) : Escape game team building près de Montpellier | Elios
- **Meta description** (153 car.) : Escape game en plein air au Domaine de Capion, dans la vallée de l'Hérault : énigmes en équipe, matinée de travail et déjeuner inclus. Dès 130 € HT/pers.
- **H1** : Escape game team building en pleine nature près de Montpellier

#### `/seminaire-montpellier/journee-murder-party-montpellier/` ✏️
- **Mot-clé principal** : murder party entreprise Montpellier
- **Title** (59 car.) : Murder party entreprise près de Montpellier | Elios Evasion
- **Meta description** (151 car.) : Une enquête animée par un pro dans un château de la vallée de l'Hérault : murder party, matinée de travail et déjeuner dans le parc. Dès 140 € HT/pers.
- **H1** : Murder party d'entreprise dans un château près de Montpellier

#### `/seminaire-montpellier/journee-descente-canoe-montpellier/` ✏️
- **Mot-clé principal** : team building canoë Hérault
- **Title** (59 car.) : Team building canoë : descente de l'Hérault | Elios Evasion
- **Meta description** (153 car.) : 12 km de descente en canoë sur l'Hérault, accessible à tous, après une matinée de travail au domaine : une journée nature pour vos équipes, dès 120 € HT.
- **H1** : Team building canoë : descente de l'Hérault en équipe

#### `/seminaire-montpellier/journee-grotte-montpellier/` ✏️
- **Mot-clé principal** : team building grotte Hérault
- **Title** (59 car.) : Team building insolite dans une grotte de l'Hérault | Elios
- **Meta description** (151 car.) : Escape game et parcours aventure dans la grotte de Clamouse, salle équipée et repas sur place : un séminaire insolite près de Montpellier dès 100 € HT.
- **H1** : Team building insolite dans une grotte de l'Hérault

#### `/seminaire-montpellier/journee-trotinette-tout-terrain-electrique-montpellier/` ✏️
- **Mot-clé principal** : team building trottinette électrique Montpellier
- **Title** (54 car.) : Team building trottinette électrique au lac du Salagou
- **Meta description** (154 car.) : 3 h de trottinette électrique tout terrain en équipe sur les sentiers du lac du Salagou, matinée de travail et déjeuner inclus. Dès 140 € HT par personne.
- **H1** : Team building en trottinette électrique tout terrain au lac du Salagou

#### `/seminaire-montpellier/journee-challenge-sportif-plage-montpellier/` ✏️
- **Mot-clé principal** : olympiades entreprise Montpellier
- **Title** (56 car.) : Olympiades d'entreprise sur la plage près de Montpellier
- **Meta description** (152 car.) : Pirogue tahitienne, paddle géant, épreuves sur le sable : des olympiades d'entreprise à Palavas-les-Flots, repas sur la plage inclus. Dès 130 € HT/pers.
- **H1** : Olympiades d'entreprise et challenge sportif sur la plage de Palavas

#### `/seminaire-montpellier/journee-balade-kayak-etang-montpellier/` ✏️
- **Mot-clé principal** : team building kayak Montpellier
- **Title** (58 car.) : Team building kayak sur l'étang de Palavas | Elios Evasion
- **Meta description** (147 car.) : Après-midi de travail, balade en kayak au coucher du soleil et dégustation chez un pêcheur à Palavas-les-Flots. Jusqu'à 35 personnes, dès 130 € HT.
- **H1** : Team building kayak au coucher du soleil sur l'étang de Palavas


### Avignon

#### `/seminaire-avignon/` ✏️🔀
- **Mot-clé principal** : team building Avignon
- **Title** (57 car.) : Team building Avignon : séminaires en château et vignoble
- **Meta description** (146 car.) : Œnologie à Châteauneuf-du-Pape, murder party, escape game, quiz : nos journées team building clés en main autour d'Avignon, salle et repas inclus.
- **H1** : Team building et séminaire d'entreprise à Avignon

#### `/seminaire-avignon/journee-decouverte-du-vin/` ✏️🔀
- **Mot-clé principal** : team building œnologie
- **Title** (52 car.) : Team building œnologie à Châteauneuf-du-Pape | Elios
- **Meta description** (148 car.) : Initiation à la dégustation avec un sommelier au château des Fines Roches, AOC Châteauneuf-du-Pape, après une matinée de travail. Dès 180 € HT/pers.
- **H1** : Team building œnologie au cœur du vignoble de Châteauneuf-du-Pape

#### `/seminaire-avignon/journee-escape-game-nature/` ✏️🔀
- **Mot-clé principal** : escape game team building Avignon
- **Title** (56 car.) : Escape game team building près d'Avignon | Elios Evasion
- **Meta description** (148 car.) : Escape game sur mesure dans le parc du Moulin des Gaffins ou les vignes de Châteauneuf-du-Pape, matinée de travail et déjeuner inclus. Dès 140 € HT.
- **H1** : Escape game team building en plein air près d'Avignon

#### `/seminaire-avignon/journee-murder-party/` ✏️🔀
- **Mot-clé principal** : murder party entreprise Avignon
- **Title** (54 car.) : Murder party entreprise près d'Avignon | Elios Evasion
- **Meta description** (153 car.) : Enquête en costume animée par un professionnel au château de Beauregard, matinée de travail et déjeuner dans le parc : la murder party dès 150 € HT/pers.
- **H1** : Murder party d'entreprise dans un château près d'Avignon

#### `/seminaire-avignon/journee-quizz-room-avignon/` ✏️🔀
- **Mot-clé principal** : team building quiz Avignon
- **Title** (59 car.) : Team building quiz à Avignon : la Quiz Room | Elios Evasion
- **Meta description** (148 car.) : Matinée de travail au château de Beauregard puis quiz géant en équipes de deux, questions personnalisées pour vos collaborateurs. Dès 130 € HT/pers.
- **H1** : Team building quiz à Avignon : matinée au château, après-midi en Quiz Room


### Montagne

#### `/sejours/sejour-team-building-pyrenees/` ✏️
- **Mot-clé principal** : séminaire montagne
- **Title** (57 car.) : Séminaire à la montagne dans les Pyrénées | Elios Evasion
- **Meta description** (149 car.) : Séminaire de 2 jours ou plus à Font-Romeu : hébergement, repas, salle et activités été comme hiver dans les Pyrénées catalanes, organisés sur mesure.
- **H1** : Séminaire d'entreprise à la montagne dans les Pyrénées catalanes

#### `/sejours/seminaire-ski-hiver/` 🆕
- **Mot-clé principal** : séminaire ski entreprise
- **Title** (57 car.) : Séminaire ski et team building neige à Font-Romeu | Elios
- **Meta description** (154 car.) : Ski, raquettes, chiens de traîneau, biathlon, dîner d'altitude : un séminaire d'hiver clé en main à Font-Romeu, dans les Pyrénées-Orientales ensoleillées.
- **H1** : Séminaire ski et team building neige à Font-Romeu

#### `/sejours/seminaire-montagne-ete/` 🆕
- **Mot-clé principal** : team building montagne été
- **Title** (53 car.) : Team building montagne en été : rando, VTT, canyoning
- **Meta description** (146 car.) : Randonnée au Carlit, VTT, canyoning, escalade : un séminaire d'été en pleine nature dans les Pyrénées catalanes, hébergement et activités compris.
- **H1** : Team building à la montagne en été dans les Pyrénées catalanes


### Transverse

#### `/faq/` 🆕
- **Mot-clé principal** : prix team building
- **Title** (55 car.) : Prix d'un team building et questions fréquentes | Elios
- **Meta description** (144 car.) : Combien coûte un team building ou un séminaire ? Effectifs, délais, ce qui est inclus, transport, météo : toutes les réponses avant votre devis.
- **H1** : Questions fréquentes : prix, organisation et réservation

#### `/a-propos/` ✏️
- **Mot-clé principal** : Elios Evasion
- **Title** (55 car.) : À propos d'Elios Evasion, agence réceptive à Font-Romeu
- **Meta description** (148 car.) : Elios Evasion organise séminaires et team buildings en pleine nature depuis Font-Romeu : notre histoire, nos partenaires, notre façon de travailler.
- **H1** : Elios Evasion, agence de séminaires nature née à Font-Romeu

#### `/contact/` ✏️
- **Mot-clé principal** : devis séminaire
- **Title** (59 car.) : Contact et devis séminaire ou team building | Elios Evasion
- **Meta description** (152 car.) : Un projet de séminaire ou de team building ? Décrivez-nous vos dates, votre effectif et vos envies : nous revenons vers vous rapidement. 06 79 02 93 32.
- **H1** : Demandez votre devis de séminaire ou de team building


### Blog

#### `/blog/` ✏️
- **Mot-clé principal** : blog séminaire team building
- **Title** (59 car.) : Blog : conseils pour organiser séminaires et team buildings
- **Meta description** (139 car.) : Méthodes, budgets, idées d'activités et destinations : nos conseils pour réussir vos séminaires et team buildings dans le Sud de la France.
- **H1** : Le blog des séminaires et team buildings en pleine nature

#### `/blog/lieux-a-decouvrir-cerdagne-capcir/` ✏️🔀
- **Mot-clé principal** : activités Cerdagne Capcir
- **Title** (53 car.) : Cerdagne et Capcir : 6 lieux à découvrir en séminaire
- **Meta description** (147 car.) : Lac des Bouillouses, pic Carlit, citadelle de Mont-Louis, Train jaune… les incontournables de Cerdagne et du Capcir à glisser dans votre séminaire.
- **H1** : Lieux à découvrir en Cerdagne et dans le Capcir


### Articles de blog à créer (titre et slug, la meta sera rédigée avec l'article)

| Slug | Titre proposé (H1) | Mot-clé |
|---|---|---|
| `/blog/organiser-seminaire-entreprise/` | Comment organiser un séminaire d'entreprise : méthode et checklist | organiser un séminaire d'entreprise |
| `/blog/organiser-team-building/` | Organiser un team building réussi en 7 étapes | organiser un team building |
| `/blog/prix-team-building/` | Prix d'un team building : quel budget par personne ? | prix team building |
| `/blog/idees-team-building-originales/` | 15 idées de team building originales dans le Sud de la France | idée team building |
| `/blog/seminaire-2-jours-programme/` | Séminaire de 2 jours à la montagne : programme type | idée séminaire 2 jours |
| `/blog/olympiades-entreprise/` | Olympiades d'entreprise : idées d'épreuves et organisation | olympiades entreprise |
| `/blog/murder-party-entreprise/` | Murder party en entreprise : comment ça marche ? | murder party entreprise |
| `/blog/escape-game-team-building/` | Escape game en team building : pourquoi ça fonctionne | escape game team building |
| `/blog/idees-sortie-cse/` | Sortie CSE : idées et règles à connaître | idée sortie CSE |

## 3. Images : noms de fichiers et attributs alt

Le détail est dans `donnees/images-alt.csv`. Pour chacune des 97 photos, on y trouve : le nouveau nom de fichier, l'alt, les pages qui l'utilisent et une remarque. Je les ai toutes regardées une par une. **Les alt décrivent ce que montre la photo**, pas ce que la légende du site prétend.

### Règles
1. **Nom de fichier** en minuscules, mots séparés par des tirets, sans accents, descriptif : `grotte-clamouse-parcours-aventure-tyrolienne.webp`. Jamais `IMG_1234` ni `Sans-titre-1`.
2. **Format WebP**, 1920 px de large maximum pour les bandeaux et 1200 px pour le reste, 300 Ko au plus (idéalement 150 à 250 Ko). Aujourd'hui, 21 images dépassent 1 Mo, et les PNG font jusqu'à 9,5 Mo.
3. **Alt** : une phrase courte (moins de 125 caractères) qui décrit l'image, avec le lieu réel quand on le connaît. Le mot-clé de la page n'apparaît que si la photo le montre vraiment. Pas de « image de » ni de « photo de ».
4. **Images décoratives** (pictogrammes d'activités accompagnés de leur titre, formes, textures) : `alt=""`. Le lecteur d'écran les ignore, et c'est voulu.
5. **Pas de texte incrusté dans les images**, sauf le logo.
6. **Bandeaux** : le site actuel utilise des images où la courbe blanche est « cuite » dans le fichier (`Header-…`, `…-elipse-ok.png`). Avec Flatsome, on reprend la photo d'origine et la courbe est faite par un **séparateur de section** (shape divider).
7. **Légende et crédit** pour les photos issues de Wikimedia Commons (citadelle de Mont-Louis, vue du Carlit), comme l'exige leur licence.

### Problèmes relevés sur les photos actuelles
- ⚠️ **L'image du slider d'accueil n'est pas dans les Pyrénées catalanes.** Elle montre le lac de Gaube et le pic du Midi d'Ossau, dans les Pyrénées-Atlantiques. À remplacer en priorité : c'est la première image vue par les visiteurs, et une erreur visible pour qui connaît la région.
- **Page À propos, section « À découvrir »** : les photos ne correspondent pas aux lieux annoncés.
  - « Vallée d'Eyne » est illustrée par une église d'Andorre ;
  - « Lac des Bouillouses », par une bogue de châtaigne ;
  - « Pic Carlit », par un coureur en forêt.
- **Beaucoup de photos de banque d'images** : VTT, escalade, trail, massage, plat mijoté, kayak en mer. Elles sont acceptables en complément, mais les **vraies photos de groupes clients** (groupe dans la neige, olympiades sur la plage, pirogues) convainquent plus, pour les visiteurs comme pour Google Images. Il faut en récupérer davantage auprès d'Elios.
- **Doublons** : 8 photos sont en double ou en version recadrée (voir la colonne remarque). On ne reprend qu'une seule version.
- **Fichiers mal nommés** : certaines photos « Capion » semblent montrer le château des Fines Roches. À confirmer avant de les ranger dans la bonne fiche.

## 4. Données structurées (JSON-LD)

Yoast SEO (gratuit) génère déjà `WebSite`, `WebPage`, `BreadcrumbList`, `Organization` et `Article`. On le complète par des blocs JSON-LD ajoutés au thème enfant (un petit snippet PHP par type de page) :

| Page | Types | Remarques |
|---|---|---|
| Toutes | `Organization` (via Yoast) enrichi en **`TravelAgency`** | nom, logo, téléphone, adresse à Font-Romeu, `areaServed` (Hérault, Vaucluse, Pyrénées-Orientales), `sameAs` (réseaux sociaux, fiche Tourisme 66, Google Business) |
| Accueil | `TravelAgency` complet + `aggregateRating` **seulement si** les avis sont collectés sur le site | Google ignore les avis « auto-déclarés » pour les étoiles, mais les IA les lisent |
| Piliers, hub | `ItemList` des offres + `FAQPage` | la FAQ reprend 4 à 6 questions de la page |
| Fiches (×12) et pages Montagne | **`Service`** (`serviceType` « Team building », `provider` = Elios Evasion, `areaServed`) + **`Offer`** (`price`, `priceCurrency` EUR, `priceSpecification` avec `valueAddedTaxIncluded: false`), et `TouristTrip` / `itinerary` pour le programme | le programme horaire (matin / après-midi) est balisé en `itinerary` ; le lieu en `Place` avec ville et code postal |
| `/faq/` | `FAQPage` | Google n'affiche plus les FAQ enrichies pour ce type de site depuis 2023, mais ce balisage reste très exploité par les moteurs IA |
| Articles | `Article` (Yoast) + `author` avec une vraie page auteur, ou bien l'organisation | date de mise à jour visible |
| Contact | `ContactPage` | |

Les gabarits JSON-LD prêts à l'emploi sont dans `04-geo-ia.md` (section 4).
