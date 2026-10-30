# Guide de rédaction : contenus du nouveau site Elios Evasion

Ce guide s'impose à toutes les pages du dossier `redaction/`. Il applique la stratégie de `../seo/`.

## Sources obligatoires (à lire avant d'écrire)
- `../seo/01-strategie-mots-cles.md` : le mot-clé principal et les mots-clés secondaires de chaque page.
- `../seo/02-cocon-semantique-et-maillage.md` : les liens internes à poser et leurs ancres (section 3) et les liens externes (section 5.1).
- `../seo/donnees/metadonnees.json` : title, meta et H1 **à reprendre tels quels**.
- `../seo/donnees/images-alt.csv` : les images à utiliser (colonne `nouveau_nom`) et leur alt.
- `../seo/donnees/infos-pratiques.md` : lieux, communes, trajets, capacités.
- `../seo/donnees/elements-provisoires.md` : chiffres et témoignages provisoires.
- `../seo/04-geo-ia.md` § 2 : le format « citable » par les IA.
- `../contenu/pages/*.md` : le contenu actuel du site, qui est **la source des faits** (programme, prix, saison, inclus).

## Faits validés
- **Prix « dès » par personne, HT** :
  - Montpellier : grotte 100 €, canoë 120 €, olympiades 130 €, kayak 130 €, escape game **140 €**, murder party 140 €, trottinette 140 € ;
  - Avignon : quiz 130 €, escape game 140 €, murder party 150 €, œnologie 180 € ;
  - sur-mesure : 110 € ;
  - Pyrénées : sur devis.
- **Inclus dans les journées** : petit-déjeuner, déjeuner, salle et matériel de travail, activité. Non inclus : le transport. L'apéritif de fin de journée figure dans les programmes.
- **Saisons** : de mai à septembre pour le canoë, la trottinette, les olympiades et le kayak ; toute l'année pour les autres offres.
- **Kayak** : de 14 h à 20 h, 35 personnes maximum, dégustation chez un pêcheur. **Canoë** : 12 km de descente de l'Hérault, peu de rapides, savoir nager obligatoire. **Trottinette** : environ 3 h d'activité sur les sentiers du lac du Salagou. **Grotte** : grotte de Clamouse, deux parcours aventure et un escape game. **Œnologie** : château des Fines Roches, sommelier, AOC Châteauneuf-du-Pape, initiation au café et aux digestifs possible.
- **Intervenant possible** pendant la matinée de travail (« d'un magicien à un sportif de haut niveau »). Soirée possible sur demande. Public adulte (18 ans et plus).
- **Pyrénées** : base à Font-Romeu. Elios intervient dans tout le massif. Thèmes : sport, culture, bien-être, gastronomie et terroir.
  - activités d'hiver : ski alpin, ski de fond, ski de randonnée, raquettes, chiens de traîneau, biathlon, dîner d'altitude en dameuse ;
  - activités d'été : randonnée (massif du Carlit), VTT, canyoning, escalade, spéléologie, trottinette tout terrain, pêche ;
  - culture et détente : fortifications Vauban (UNESCO), patrimoine catalan, Espagne et Andorre toutes proches, sources d'eau chaude naturelles.
- **Téléphone** : 06 79 02 93 32 (lien `tel:+33679029332`).

**Ne rien inventer d'autre.** Toute information inconnue est signalée par un repère :
- `[À CONFIRMER : …]` pour un fait plausible mais non vérifié ;
- `[PROVISOIRE]` pour un chiffre ou un témoignage imaginé ;
- `[À FOURNIR : …]` pour une donnée que seul Elios a (adresse, SIRET…).

## Ton et style
- **Vouvoiement.** Le lecteur est un RH, un office manager, un dirigeant ou un élu de CSE : ton professionnel, chaleureux, concret. Pas de superlatifs creux (« inoubliable », « unique » au plus une fois par page).
- **Phrases courtes**, paragraphes de 2 à 4 lignes. On parle de bénéfices concrets : cohésion, matinée productive, logistique prise en charge, un seul interlocuteur.
- **Orthographe** : « team building » (sans tiret), « séminaire », « Elios Evasion » (jamais en majuscules), « € HT par personne ». Ne pas reprendre les fautes du site actuel (« trotinette » ne reste que dans l'URL).
- **Mot-clé principal** : dans le H1, le paragraphe d'introduction (dans les 100 premiers mots), au moins un H2, l'alt de l'image principale, et 3 à 6 fois en tout selon la longueur, sans bourrage. Les mots-clés secondaires servent de H2/H3 ou apparaissent naturellement dans le texte.
- **Pas de contenu dupliqué entre pages.** Les fiches jumelles (escape game et murder party, à Montpellier et à Avignon) sont rédigées entièrement différemment : lieu, ambiance, ancrage local.

## Format de chaque fichier

```markdown
---
url: /chemin/
statut: ✏️ | 🆕
mot_cle: …
title: … (repris de metadonnees.json)
meta: …
h1: …
schema: [Service, Offer, FAQPage, BreadcrumbList]
image_principale: nom-du-fichier.webp
mots: (nombre approximatif de mots du contenu)
---

<!-- [HERO] image : nom.webp | bouton : « Demander un devis » → #devis -->
# H1

Paragraphe-réponse de 40 à 60 mots : qui, quoi, où, pour qui, combien.

<!-- [ESSENTIEL] encadré, liste à puces -->
- **Lieu** : …
- …

<!-- [SECTION] … -->
## H2 …
```

- Les commentaires `<!-- [BLOC] … -->` indiquent à l'intégrateur le bloc Flatsome à utiliser : `HERO`, `ESSENTIEL`, `SECTION`, `CARTES`, `PROGRAMME`, `GALERIE`, `TEMOIGNAGES`, `FAQ`, `CTA`, `FORMULAIRE`, `TABLEAU`. On y précise les images, en reprenant les noms de `images-alt.csv` (ou `[PHOTO À FOURNIR : description]` s'il en manque une).
- **Liens internes** en Markdown, avec les ancres exactes de `02-cocon-semantique-et-maillage.md` : `[team building dans une grotte](/seminaire-montpellier/journee-grotte-montpellier/)`. Les liens externes portent l'URL complète.
- **FAQ** : en fin de page, avec des questions en H3 et des réponses autonomes de 2 à 4 phrases. Ce texte est repris tel quel dans le JSON-LD `FAQPage`.
- **CTA final** : renvoi vers le formulaire de pré-réservation (`<!-- [FORMULAIRE] pre-reservation -->`) ou vers `/contact/`.

## Gabarits par type de page

| Type | Longueur | Structure |
|---|---|---|
| **Fiche offre** | 700 à 1 000 mots | HERO → intro-réponse → ESSENTIEL (lieu + commune, accès et trajet, durée, saison, effectif, prix dès, inclus, non inclus, niveau) → H2 « L'activité » → H2 « Votre matinée de travail au … » → PROGRAMME (horaires) → GALERIE → H2 « Pourquoi choisir cette journée » (3 ou 4 puces bénéfices) → bloc « Autres journées autour de … » (cartes sœurs) → FAQ (4 à 6 questions) → FORMULAIRE |
| **Pilier** | 1 200 à 1 600 mots | HERO → intro-réponse → H2 « Pourquoi un team building à … » → CARTES ou TABLEAU des offres (activité, lieu, saison, prix) → H2 par grand type d'activité, avec texte et liens → H2 « Comment se déroule une journée type » → H2 « Les lieux » → TEMOIGNAGES → H2 « Organiser votre séminaire avec Elios Evasion » (étapes) → FAQ (5 à 8 questions) → CTA |
| **Hub, accueil** | 900 à 1 300 mots | voir le fichier de la page |
| **Article de blog** | 1 200 à 1 800 mots | H1 → chapeau (réponse directe) → sommaire → H2 et H3 → encadrés « À retenir » → liens vers les pages commerciales (ancres du fichier 02) → FAQ courte → CTA doux |

## Après chaque page
Lister dans `_infos/<nom-du-lot>.md` (un fichier par lot, pour éviter les conflits) chaque repère `[À CONFIRMER]`, `[À FOURNIR]` ou `[PROVISOIRE]` posé, et chaque photo manquante. Ce fichier servira à rédiger le mail final à Elios.
