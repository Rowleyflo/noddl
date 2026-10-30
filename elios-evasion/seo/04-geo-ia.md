# Elios Evasion : GEO, être cité par les moteurs IA

Préparé le 30/10/2026.

Le GEO (*Generative Engine Optimization*) vise à ce que ChatGPT, Perplexity, Claude, Gemini et les « AI Overviews » de Google **citent Elios Evasion** quand quelqu'un demande par exemple : « une idée de team building insolite près de Montpellier ? » ou « où organiser un séminaire à la montagne dans les Pyrénées ? ».

Ces moteurs s'appuient sur trois choses :
1. **les pages qu'ils peuvent lire facilement** (texte clair, faits précis, structure) ;
2. **les sources tierces qui confirment l'entité** (annuaires, offices de tourisme, plateformes, avis) ;
3. **les index de recherche classiques** : Bing pour ChatGPT et Copilot, Google pour Gemini et les AI Overviews.

Le SEO classique (fichiers 01 à 03) en est donc la base. Ce fichier ajoute ce qui est propre aux IA.

## 1. Accès technique

| Action | Livrable / réglage |
|---|---|
| Autoriser les robots IA (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended…) | `livrables/robots.txt` |
| Publier un **`/llms.txt`** à la racine : un résumé de l'entreprise et la liste des pages clés avec un fait par lien | `livrables/llms.txt` (à mettre à jour si une offre change) |
| Contenu lisible **sans JavaScript** : les onglets « Présentation / Programme / Galerie » de Flatsome doivent avoir leur texte présent dans le HTML (c'est le cas avec les onglets natifs, pas avec un chargement Ajax) | vérification à l'intégration |
| **Bing Webmaster Tools** + **IndexNow** (Yoast ou plugin IndexNow) : ChatGPT Search s'appuie sur l'index de Bing | à créer au lancement |
| **Google Search Console** + sitemap Yoast | à créer au lancement, même si elle n'existe pas aujourd'hui |
| Pages rapides (moins de 2,5 s) : images WebP, pas de Slider Revolution, cache | voir le fichier 03 |

## 2. Contenu « citable »

Les IA reprennent des **phrases autonomes, factuelles et chiffrées**. Sur chaque page commerciale :

1. **Un paragraphe-réponse en tête** (40 à 60 mots) qui dit qui, quoi, où, pour qui et combien. Exemple pour la grotte :
   > « Elios Evasion organise des journées de team building dans la grotte de Clamouse, dans la vallée de l'Hérault, à environ 40 minutes de Montpellier. Au programme : matinée de travail en salle équipée, déjeuner, puis escape game et parcours aventure sous terre. Accessible à tous, toute l'année, à partir de 100 € HT par personne. »
2. **Un encadré « L'essentiel »** en liste : lieu, durée, saison, effectif min/max, prix dès, inclus / non inclus, accessibilité. La page actuelle a cette structure, mais avec des champs vides (« Lieu de rdv », « Durée ») : **ils seront tous remplis**.
3. **Le programme horaire** (déjà présent), conservé en liste HTML.
4. **Une FAQ de 4 à 6 questions** en fin de page. Les questions reprennent la façon dont les gens interrogent les IA : « Combien de personnes minimum ? », « Que se passe-t-il s'il pleut ? », « Faut-il savoir nager ? », « Peut-on venir en train depuis Paris ? », « Le transport est-il organisé ? ».
5. **Des noms propres et des chiffres** : lieux réels, distances, durée, nombre de participants, années. Les IA privilégient ce qui est vérifiable.
6. **Une date de mise à jour visible** sur les pages offres (« Tarifs 2026 ») et sur les articles.

### Page À propos = la fiche d'identité de l'entité
Les IA s'en servent pour décrire l'entreprise. Elle doit contenir, en texte :
- le nom exact, **Elios Evasion**, toujours écrit de la même façon (pas « ELIOS ÉVASION » ici et « Elios-Evasion » ailleurs) ;
- le statut d'agence réceptive, l'adresse : 5 rue du Soleil, 66120 Font-Romeu-Odeillo-Via (source : politique de confidentialité de 2021, **à vérifier sur Kbis**), l'année de création **[À CONFIRMER]**, le fondateur **[À CONFIRMER]** et le SIRET (dans les mentions légales) ;
- les zones d'intervention, les types de clients et de partenaires ;
- des **chiffres clés** : nombre de séminaires organisés, de participants accueillis, d'entreprises clientes **[À FOURNIR]** ;
- des logos et témoignages de clients **[À FOURNIR, avec leur accord]**.

## 3. Confirmation par des sources tierces

Un moteur IA recommande plus volontiers une entreprise que **plusieurs sources indépendantes décrivent de la même façon**. On reprend ici la liste « netlinking » du fichier 02 (section 5.2), avec une exigence supplémentaire :

- **Nom, adresse, téléphone et description identiques partout** : Google Business Profile, Tourisme Pyrénées-Orientales, Aleou, Funbooker, Naboo, PagesJaunes, LinkedIn.
- **Description type à réutiliser telle quelle** (environ 300 caractères) :
  > « Elios Evasion est une agence basée à Font-Romeu qui organise des séminaires d'entreprise et des team buildings clés en main en pleine nature : journées près de Montpellier et d'Avignon, séjours à la montagne dans les Pyrénées. »
- **Avis Google** : viser 20 avis en 6 mois. Envoyer le lien de la fiche à chaque client après l'événement, et répondre à tous les avis. Les IA citent souvent les notes et les extraits d'avis.
- **Réseaux sociaux** : remplacer les liens génériques du footer par les vraies pages **[URL À FOURNIR]**. Elles iront dans le `sameAs` du balisage.
- **Contenus tiers** : un article invité ou une interview dans la presse locale ou sur un média RH. Ce sont des sources que les IA citent.

## 4. Gabarits JSON-LD

À injecter via le thème enfant : un hook `wp_head` avec des conditions par gabarit de page. Les champs `[…]` sont à remplir.

### 4.1 Organisation (toutes les pages, à fusionner avec Yoast)
```json
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://www.elios-evasion.fr/#organization",
  "name": "Elios Evasion",
  "url": "https://www.elios-evasion.fr/",
  "logo": "https://www.elios-evasion.fr/wp-content/uploads/[logo].png",
  "image": "https://www.elios-evasion.fr/wp-content/uploads/[photo-groupe].webp",
  "description": "Agence de séminaires d'entreprise et de team building en pleine nature : Montpellier, Avignon et Pyrénées catalanes.",
  "telephone": "+33 6 79 02 93 32",
  "email": "[À CONFIRMER]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5 rue du Soleil, Résidence Les Temples du Soleil, bât. E [À VÉRIFIER sur Kbis]",
    "postalCode": "66120",
    "addressLocality": "Font-Romeu-Odeillo-Via",
    "addressRegion": "Occitanie",
    "addressCountry": "FR"
  },
  "areaServed": [
    {"@type": "AdministrativeArea", "name": "Hérault"},
    {"@type": "AdministrativeArea", "name": "Vaucluse"},
    {"@type": "AdministrativeArea", "name": "Pyrénées-Orientales"},
    {"@type": "Place", "name": "Pyrénées"}
  ],
  "knowsAbout": ["team building", "séminaire d'entreprise", "incentive", "séminaire à la montagne", "séminaire Pyrénées"],
  "sameAs": [
    "https://www.tourisme-pyreneesorientales.com/sorganiser/elios-evasion-font-romeu-odeillo-via-fr-5744365/",
    "[Google Business Profile]",
    "[LinkedIn]",
    "[Facebook]",
    "[Instagram]"
  ]
}
```

### 4.2 Fiche offre (×12, plus les pages Montagne hiver et été) : exemple de la grotte
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Team building dans une grotte de l'Hérault",
  "serviceType": "Team building",
  "provider": {"@id": "https://www.elios-evasion.fr/#organization"},
  "areaServed": {"@type": "City", "name": "Montpellier"},
  "description": "Journée de séminaire : matinée de travail en salle équipée, déjeuner, puis escape game et parcours aventure dans la grotte de Clamouse.",
  "audience": {"@type": "BusinessAudience", "audienceType": "Entreprises, CSE"},
  "offers": {
    "@type": "Offer",
    "url": "https://www.elios-evasion.fr/seminaire-montpellier/journee-grotte-montpellier/",
    "priceCurrency": "EUR",
    "price": "100",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "100",
      "priceCurrency": "EUR",
      "referenceQuantity": {"@type": "QuantitativeValue", "value": 1, "unitText": "personne"},
      "valueAddedTaxIncluded": false
    },
    "availability": "https://schema.org/InStock"
  },
  "location": {
    "@type": "Place",
    "name": "Grotte de Clamouse",
    "address": {"@type": "PostalAddress", "addressLocality": "Saint-Jean-de-Fos", "postalCode": "34150", "addressCountry": "FR"}
  }
}
```

### 4.3 FAQ (piliers, fiches, `/faq/`)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Combien coûte un team building près de Montpellier ?",
     "acceptedAnswer": {"@type": "Answer", "text": "Nos journées clés en main coûtent de 100 à 140 € HT par personne, avec petit-déjeuner, déjeuner, salle de travail et activité. Le transport n'est pas inclus."}}
  ]
}
```
Le texte des questions et réponses doit être **identique au texte visible** sur la page.

## 5. Mesurer

Il n'y a pas d'outil officiel pour suivre les citations par les IA. Le protocole simple est le suivant :
- **Panel de 15 questions** : une fois par mois, poser les mêmes 15 questions à ChatGPT (avec recherche), Perplexity et Gemini. Exemples : « idée team building insolite Montpellier », « séminaire Pyrénées », « team building œnologie Avignon », « agence séminaire Font-Romeu ». Noter si Elios est cité, et avec quelle source.
- **Analytics** : suivre le trafic référent venant de `chatgpt.com`, `perplexity.ai`, `gemini.google.com` et `copilot.microsoft.com` (rapport « Acquisition » de GA4 ou de Matomo).
- **Search Console et Bing Webmaster Tools** : suivre les impressions sur les requêtes du fichier 01. Bing affiche aussi les données de Copilot.
