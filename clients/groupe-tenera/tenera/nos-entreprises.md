# Tenera : nos entreprises (hub + une page par filiale)

## Hub

- **URL** : `/nos-entreprises/`
- **Statut** : 🆕
- **Title** : `Nos entreprises : Stena et LC Concept | Groupe Tenera`
- **Meta** : `Stena, sous-traitance en électricité industrielle depuis 2005, et LC Concept, éclairage architectural depuis 2007 : les entreprises du groupe Tenera.`
- **H1** : `Les entreprises du groupe Tenera`
- **Contenu** : une introduction de 2 phrases, puis une carte par filiale : logo, métier, année, siège, 3 chiffres, 3 références, deux liens (fiche interne, site de la filiale). La page est conçue pour accueillir de nouvelles cartes.

## Modèle de page filiale : Stena

- **URL** : `/nos-entreprises/stena/`
- **Statut** : 🆕
- **Requêtes visées** : « stena tenera », « stena groupe » (marque). **Pas** de requêtes métier : elles appartiennent à stena.fr.
- **Title** : `Stena, électricité industrielle et navale | Groupe Tenera`
- **Meta** : `Depuis 2005, Stena sous-traite chemins de câbles, tirage et raccordement pour les grands installateurs. Une entreprise du groupe Tenera.`
- **H1** : `Stena, la sous-traitance en électricité industrielle du groupe Tenera`

### Plan (300 à 400 mots, rédigés pour cette page, sans reprendre stena.fr)
1. **En bref** : tableau (création 2005, siège, effectif, qualifications, zone, site web).
2. **Ce que fait Stena** : 3 métiers en une ligne chacun, avec un lien vers la page métier de stena.fr (ancre descriptive : « tirage de câbles toutes sections »).
3. **Pourquoi Stena dans le groupe** : complémentarité avec LC Concept (déjà partenaires sur les navires Marion Dufresne et Yersin et au Fouquet's) ; capacité renforcée pour les donneurs d'ordre.
4. **Trois références** : résumé de 2 lignes, lien vers la fiche chantier de stena.fr.
5. **CTA** : « Visiter stena.fr » (lien externe) et « Demander un devis à Stena » (`stena.fr/contact-et-devis/`).

### Données structurées
`WebPage` avec `about` → `{ "@id": "https://www.stena.fr/#org" }`. On ne redéfinit pas l'organisation : on la référence.

## Page filiale : LC Concept

- **URL** : `/nos-entreprises/lc-concept/`
- **Title** : `LC Concept, éclairage architectural naval | Groupe Tenera`
- **Meta** : `Depuis 2007, LC Concept conçoit et installe l'éclairage architectural de navires et de lieux de prestige. Une entreprise du groupe Tenera.`
- **H1** : `LC Concept, l'éclairage architectural du groupe Tenera`
- Même plan que Stena. Références MSC Croisières, Naval Group et Brittany Ferries [À CONFIRMER : navires, années, autorisation].

## Nouvelle filiale (modèle)

- Title : `<Nom>, <métier en 3 mots> | Groupe Tenera` (≤ 60 caractères)
- Meta : `Depuis <année>, <Nom> <ce qu'elle fait, pour qui>. Une entreprise du groupe Tenera.`
- À chaque ajout : carte sur l'accueil et le hub, ligne `subOrganization`, références dans `/references/`, article d'annonce dans `/actualites/`, communiqué de presse (voir `03`, §6.3).
