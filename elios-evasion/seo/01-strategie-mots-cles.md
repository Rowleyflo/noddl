# Elios Evasion : stratégie de mots-clés

Préparé le 30/10/2026. C'est la **première étape** de la refonte SEO. Le cocon sémantique, le maillage, les métadonnées, les alt, le GEO (llms.txt…) et la rédaction des pages en découleront. **Rien n'est rédigé avant validation de ce document.**

## Sources et limites

- **Suggestions Google** (saisie semi-automatique, France, en français) : 306 requêtes de départ, environ 1 200 suggestions collectées, 515 retenues après filtrage. Elles sont dans `donnees/suggestions-google.csv`.
- **Analyse des premiers résultats Google** sur les requêtes principales : Montpellier, Avignon, Font-Romeu/montagne.
- **Contenu du site actuel** : voir `../contenu/`.

> ⚠️ **Aucun volume de recherche n'a été mesuré.** Je n'ai pas accès à un outil de volumes (Keyword Planner, Semrush…).
> La colonne **Signal** indique seulement si Google propose la requête en suggestion. C'est un indice de demande réelle, pas un chiffre :
> - ●●● la requête est suggérée avec de nombreuses variantes ;
> - ●● la requête est suggérée ;
> - ● la requête n'est pas suggérée (longue traîne, faible volume probable, mais très qualifiée).
>
> **À faire avant d'arbitrer définitivement :** passer la liste « Requête principale » dans Google Keyword Planner (gratuit avec un compte Google Ads), et récupérer l'export Search Console du site actuel s'il existe.

## 1. Ce que l'analyse révèle

### 1.1 Le marché
- **Les requêtes « team building + ville » sont les plus demandées** dans la zone : Montpellier ressort avec beaucoup de variantes (activité, idée, sport, cuisine, agence, entreprise, autour de Montpellier, Koh Lanta). Avignon et le Vaucluse ressortent moins.
- **« Séminaire + ville » est ambigu.** Pour Avignon, Hérault, Vaucluse ou Occitanie, Google pense d'abord « formation » ou « événement ». Les variantes qui expriment vraiment notre intention sont « séminaire **entreprise** + ville », « lieu séminaire », « séminaire au vert » et « séminaire insolite ».
- **La montagne est une niche à bonne intention** : « séminaire montagne », « séminaire entreprise montagne », « séminaire à la montagne », « séminaire ski entreprise », « team building Pyrénées-Orientales ». Google suggère peu de variantes pour « séminaire Font-Romeu » ou « Pyrénées », mais la concurrence y est presque nulle.
- **Les activités** les plus demandées : escape game team building, murder party entreprise, olympiades/challenge sportif, team building Koh Lanta, team building vin/œnologie, team building plage, team building trottinette électrique, team building canoë/kayak.
- **Questions d'organisation** (pour le blog et le GEO) : comment organiser un séminaire d'entreprise ou un team building, prix et tarif d'un team building, idées de séminaire sur 2 jours, sortie CSE, définition du séminaire résidentiel, team building et avantage en nature.

### 1.2 La concurrence
- Sur « team building Montpellier » et « team building Avignon », la 1re page est **occupée par des plateformes** : Funbooker, Naboo, Aleou, Privateaser, Autreman, myCityHunt, Mobilboard. Il y a très peu d'agences locales.
  - **Conséquence :** viser la 1re page sur la requête « ville » seule est ambitieux. En revanche, **activité + ville** et **séminaire insolite / au vert + ville** sont accessibles.
  - **Opportunité :** ces plateformes sont aussi des **sources de liens et de citations par les IA**. On les traitera dans la stratégie externe.
- Sur Font-Romeu / Pyrénées-Orientales, Elios Evasion **est déjà cité** par l'office de tourisme des Pyrénées-Orientales, aux côtés du Grand Hôtel l'Ermitage et de PMD. C'est la zone où le site peut dominer le plus vite.

### 1.3 Ce que le site actuel rate
- Les titres de page reprennent le nom de l'offre (« Journée Grotte Montpellier ») et pas les requêtes (« team building grotte près de Montpellier »).
- Les mots **« team building »** et **« séminaire entreprise »** apparaissent peu dans les H1 et les titres.
- **Géographie floue** :
  - la page Avignon s'appelle `/seminaire-a-la-journee/` ;
  - les activités « Montpellier » se passent en réalité dans la **vallée de l'Hérault** (Domaine de Capion, Grotte de Clamouse, Domaine de la Grande Sieste) et à **Palavas-les-Flots**. Ce sont des mots-clés locaux à exploiter, pas à cacher ;
  - les activités « Avignon » se passent à **Châteauneuf-du-Pape** (Château des Fines Roches), au Château de Beauregard et au Domaine du Moulin des Gaffins.
- **Cannibalisation :**
  - l'accueil et `/sejours/` présentent les trois mêmes offres avec le même texte ;
  - « escape game nature » et « murder party » existent en deux versions, Montpellier et Avignon, avec des textes quasi identiques ;
  - `/nos-destinations/` est vide.
- Le positionnement du footer, « Pyrénées-Orientales » uniquement, est en décalage avec l'offre réelle.

## 2. Positionnement sémantique proposé

> **Elios Evasion, agence de séminaires et de team building insolites en pleine nature dans le Sud de la France : Montpellier et la vallée de l'Hérault, Avignon et la Provence, la montagne catalane (Font-Romeu, Pyrénées-Orientales).**

- **Entité de marque** : « Elios Evasion », agence réceptive basée à Font-Romeu.
- **Thèmes-piliers** : *team building*, *séminaire d'entreprise*, *nature / au vert / insolite*, *clé en main / sur-mesure*.
- **Mots à placer partout** (champ lexical commun) : cohésion d'équipe, collaborateurs, temps de travail (salle équipée), activité, journée clé en main, devis, HT par personne, effectif, RSE / nature.
- **À éviter comme cible principale :** les **marques de partenaires** (« Quiz Room », « Grotte de Clamouse », « Koh-Lanta »). On peut les citer, mais ce ne sont pas nos pages officielles : on ne gagnera pas sur ces requêtes et ce n'est pas l'intention recherchée. « Koh-Lanta » est en plus une marque déposée de TF1. On parlera d'« épreuves façon aventuriers ».

## 3. Architecture cible : un mot-clé principal par page

Légende : **P1** = priorité haute (piliers), **P2** = pages offres, **P3** = blog / longue traîne. **Statut** : ✏️ existe, à optimiser ; 🆕 à créer ; 🔀 fusion/redirection.

### 3.0 Pages transverses

| Page (URL) | Statut | Requête principale | Requêtes secondaires | Signal | Prio |
|---|---|---|---|---|---|
| Accueil `/` | ✏️ | **agence team building** (+ « séminaire entreprise sud de la France ») | agence séminaire entreprise, séminaire insolite, team building nature, team building outdoor, séminaire clé en main, team building original, séminaire au vert | ●●● | P1 |
| Hub offres `/sejours/` (libellé menu : « Nos séminaires ») | ✏️ | **idée séminaire entreprise** | idée team building entreprise, journée team building, séminaire d'entreprise clé en main, activité séminaire entreprise | ●●● | P1 |
| `/journee-sur-mesure/` | ✏️ | **team building sur mesure** | séminaire sur mesure, journée cohésion d'équipe, idée journée cohésion d'équipe | ●● | P2 |
| `/nos-destinations/` | 🔀 → `/sejours/` | — (page vide, redondante avec le hub) | — | — | — |
| `/a-propos/` | ✏️ | **Elios Evasion** (marque) | agence réceptive Font-Romeu, agence événementielle Pyrénées-Orientales | — | P2 |
| `/contact/` | ✏️ | **devis séminaire / team building** | contact Elios Evasion | — | P2 |
| 🆕 `/faq/` (ou FAQ intégrée aux piliers) | 🆕 | **prix team building** | tarif team building, prix moyen team building, budget séminaire par personne, combien de participants | ●● | P2 (fort intérêt GEO) |

### 3.1 Silo Montpellier / Hérault

| Page (URL actuelle conservée) | Statut | Requête principale | Requêtes secondaires | Signal | Prio |
|---|---|---|---|---|---|
| **Pilier** `/seminaire-montpellier/` | ✏️ | **team building Montpellier** | séminaire entreprise Montpellier, activité team building Montpellier, idée team building Montpellier, séminaire insolite Montpellier, team building autour de Montpellier, team building Hérault, sortie entreprise Montpellier, événement entreprise Montpellier, séminaire au vert Montpellier | ●●● | **P1** |
| `…/journee-escape-game-nature-montpellier/` | ✏️ | **escape game team building Montpellier** | escape game extérieur Montpellier, escape game nature Hérault, séminaire escape game | ●● | P2 |
| `…/journee-murder-party-montpellier/` | ✏️ | **murder party entreprise Montpellier** | murder party Montpellier, organisation murder party entreprise | ●● | P2 |
| `…/journee-descente-canoe-montpellier/` | ✏️ | **team building canoë Hérault** | descente canoë Hérault groupe, canoë Pont du Diable, canoë Montpellier groupe, séminaire gorges de l'Hérault | ●● | P2 |
| `…/journee-grotte-montpellier/` | ✏️ | **team building grotte Hérault** | séminaire insolite grotte, escape game grotte, séminaire Saint-Guilhem-le-Désert (citer la grotte de Clamouse dans le texte) | ● | P2 |
| `…/journee-trotinette-tout-terrain-electrique-montpellier/` | ✏️ | **team building trottinette électrique Montpellier** | trottinette électrique tout terrain Hérault, balade trottinette électrique groupe | ●● | P2 |
| `…/journee-challenge-sportif-plage-montpellier/` | ✏️ | **olympiades entreprise Montpellier** | team building plage Montpellier, challenge sportif entreprise, team building sportif, team building façon aventuriers Palavas | ●●● | P2 |
| `…/journee-balade-kayak-etang-montpellier/` | ✏️ | **team building kayak Montpellier** | kayak Palavas groupe, séminaire Palavas-les-Flots, afterwork entreprise Montpellier (format 14h-20h) | ● | P2 |

### 3.2 Silo Avignon / Provence

| Page | Statut | Requête principale | Requêtes secondaires | Signal | Prio |
|---|---|---|---|---|---|
| **Pilier** `/seminaire-a-la-journee/` → **recommandé : `/seminaire-avignon/`** + redirection 301 | ✏️🔀 | **team building Avignon** | séminaire entreprise Avignon, activité team building Avignon, team building Vaucluse, activité entreprise Avignon, team building Provence, sortie entreprise Avignon | ●●● | **P1** |
| `…/journee-decouverte-du-vin/` | ✏️ | **team building œnologie** (+ Avignon / Châteauneuf-du-Pape) | team building vin, team building vignoble, dégustation vin entreprise, atelier œnologie Avignon, séminaire Châteauneuf-du-Pape | ●●● | P2 |
| `…/journee-escape-game-nature/` | ✏️ | **escape game team building Avignon** | escape game extérieur Vaucluse, escape game nature Provence | ● | P2 |
| `…/journee-murder-party/` | ✏️ | **murder party entreprise Avignon** | murder party château Provence | ● | P2 |
| `…/journee-quizz-room-avignon/` | ✏️ | **team building quiz Avignon** | jeu de quiz entreprise, quiz game Avignon (citer Quiz Room sans en faire la cible) | ● | P2 |

> **Pourquoi renommer** `/seminaire-a-la-journee/` : l'URL ne dit ni « Avignon » ni « team building », et « séminaire à la journée » correspond aussi à l'offre de Montpellier. Le renommage implique 5 redirections 301 (le pilier et ses 4 fiches). Le risque est faible si le trafic actuel est modeste. **À confirmer** avec la Search Console si elle existe.

### 3.3 Silo Montagne / Pyrénées catalanes (le cœur historique, et le moins concurrencé)

| Page | Statut | Requête principale | Requêtes secondaires | Signal | Prio |
|---|---|---|---|---|---|
| **Pilier** `/sejours/sejour-team-building-pyrenees/` | ✏️ | **séminaire montagne** | séminaire entreprise montagne, séminaire à la montagne, team building Pyrénées-Orientales, séminaire Pyrénées-Orientales, séminaire Font-Romeu, séminaire Pyrénées, team building montagne, séminaire résidentiel, séminaire 2 jours, séminaire au vert | ●●● | **P1** |
| 🆕 `/sejours/seminaire-ski-hiver/` | 🆕 | **séminaire ski entreprise** | séminaire ski, team building neige, team building hiver, chiens de traîneau entreprise, raquettes, biathlon, séminaire station de ski Pyrénées | ●● | P2 |
| 🆕 `/sejours/seminaire-montagne-ete/` | 🆕 | **team building montagne été** | team building randonnée, team building VTT, team building canyoning, team building escalade, séminaire nature | ● | P2 |

Contenu « destination » de ce silo, pour le blog et le GEO : Font-Romeu, Cerdagne, Capcir, lac des Bouillouses, pic Carlit, citadelle de Mont-Louis (Vauban, UNESCO), vallée d'Eyne, Train jaune. Ces requêtes touristiques (« Font-Romeu activités été/hiver », « activités Cerdagne Capcir ») amènent surtout du grand public. Elles ne sont utiles que pour **asseoir l'expertise locale**, pas comme pages commerciales.

### 3.4 Blog : cocon informationnel (alimente les piliers et le GEO)

| Article | Statut | Requête principale | Requêtes secondaires | Signal | Lien vers |
|---|---|---|---|---|---|
| Comment organiser un séminaire d'entreprise (méthode + checklist) | 🆕 | **organiser un séminaire d'entreprise** | comment organiser un séminaire, préparer un séminaire d'entreprise | ●●● | hub `/sejours/` |
| Comment organiser un team building réussi | 🆕 | **organiser un team building** | pourquoi organiser un team building, journée team building c'est quoi | ●●● | accueil |
| Prix d'un team building / d'un séminaire : quel budget par personne ? | 🆕 | **prix team building** | tarif team building, prix moyen team building, budget séminaire | ●● | FAQ + piliers |
| Idées de team building originales dans le Sud (Montpellier, Avignon, montagne) | 🆕 | **idée team building** | team building original, team building insolite, idée team building Montpellier | ●●● | les 3 piliers |
| Séminaire de 2 jours : programme type à la montagne | 🆕 | **idée séminaire 2 jours** | séminaire entreprise 2 jours, séminaire résidentiel | ●● | pilier Montagne |
| Olympiades d'entreprise : idées d'épreuves et organisation | 🆕 | **olympiades entreprise** | olympiade entreprise idée, challenge sportif entreprise, défi sportif entreprise | ●●● | fiche challenge plage |
| Murder party en entreprise : comment ça marche ? | 🆕 | **murder party entreprise** | murder party team building | ●● | 2 fiches murder |
| Escape game en team building : pourquoi ça fonctionne | 🆕 | **escape game team building** | — | ●●● | 2 fiches escape |
| Sortie CSE : idées et règles (URSSAF, avantage en nature) | 🆕 | **idée sortie CSE** | sortie CSE, team building avantage en nature, idée sortie comité d'entreprise | ●●● | hub |
| Lieux à découvrir en Cerdagne / Capcir (existant, à actualiser) | ✏️ | **activités Cerdagne Capcir** | Font-Romeu activités, lac des Bouillouses, pic Carlit | ●● | pilier Montagne |

Rythme conseillé : 1 article par mois. Commencer par les 4 premiers, qui ont la plus forte intention et sont les plus cités par les IA.

### 3.5 Marque
- Requêtes : « Elios Evasion », « Elios Evasion avis », « Elios Evasion Font-Romeu ».
- À travailler par la fiche Google Business Profile (Font-Romeu), les avis, les fiches sur les plateformes (Aleou, Funbooker, office de tourisme) et le balisage `Organization` / `LocalBusiness`.

## 4. Règles de rédaction qui découlent des mots-clés

1. **Un mot-clé principal = une seule page.** Les fiches jumelles (escape game, murder party) sont différenciées par la ville *et* par le lieu : domaine, château, vallée de l'Hérault ou Châteauneuf-du-Pape. Le texte est réécrit entièrement, pas dupliqué.
2. Le mot-clé principal figure dans : le **title** (en début), le **H1**, l'**URL** (déjà le cas, sauf Avignon), le premier paragraphe, au moins un H2, l'alt de l'image principale et la meta description.
3. Les requêtes secondaires servent de **H2/H3** et de **questions de FAQ** sur la page.
4. **Les toponymes réels sont des mots-clés** : Palavas-les-Flots, vallée de l'Hérault, Saint-Guilhem-le-Désert, Pont du Diable, Châteauneuf-du-Pape, Font-Romeu, Cerdagne, Capcir. On les cite dès qu'ils sont vrais.
5. On garde les prix « à partir de … € HT/pers ». C'est un signal fort pour l'utilisateur comme pour les IA. **Il faut vérifier qu'ils sont à jour** : ils datent de 2023, et l'escape game Montpellier affiche 130 € et 140 € sur la même page.

## 5. Décisions validées (30/10/2026)

1. ✅ Toutes les offres sont actives, aux prix affichés.
2. ✅ `/seminaire-a-la-journee/` devient `/seminaire-avignon/` (redirections 301).
3. ✅ `/nos-destinations/` est fusionnée dans `/sejours/`.
4. ✅ Les pages Montagne hiver et été sont créées.
5. ❌ Pas de nouvelle offre : l'opportunité « team building cuisine Montpellier » et la page CODIR sont abandonnées (le séminaire de direction sera traité comme une section du pilier Montagne).
6. ⏳ Pas de Search Console ni d'Analytics pour l'instant : à créer au lancement du nouveau site.

Suite : `02-cocon-semantique-et-maillage.md`, `03-metadonnees-alt-donnees-structurees.md`, `04-geo-ia.md`.
