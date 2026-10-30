# Stena : l'entreprise (présentation + moyens et qualifications)

## Présentation

- **URL** : `/presentation/` (conservée)
- **Statut** : ✏️ (absorbe `/les-chiffres/`)
- **Rôle** : la page « à propos ». C'est elle que les IA résument quand on leur demande « Qui est Stena ? ».
- **Requêtes visées** : « stena missillac », « stena électricité », « stena sous-traitance ».
- **Title** : `Stena, sous-traitant électricité depuis 2005 (44) | Stena`
- **Meta** : `Fondée en 2005 en Loire-Atlantique, Stena est dédiée à la sous-traitance électrique des grands installateurs. Sans travail détaché. Groupe Tenera.`
- **H1** : `Stena, sous-traitant en installation électrique depuis 2005`

> Le title commence par « Stena, sous-traitant… » et pas par « Présentation » : la requête de marque doit tomber sur cette page ou sur l'accueil, et « (44) » lève l'ambiguïté avec Stena Line.

### Plan (H2)
1. **Stena en bref** (encadré, données datées) : raison sociale, SIREN, création 2005, siège [À CONFIRMER], dirigeant, effectif, qualification Qualifelec (n°, validité), zone d'intervention, groupe Tenera.
2. **Notre métier : la sous-traitance, et elle seule** : texte actuel, réécrit. « Une excellente alternative à la réalisation en interne de vos chantiers. »
3. **Nos engagements** : sécurité et qualité ; formation permanente ; **aucun recours à la main-d'œuvre détachée**, ce qui réduit le risque pour le client et le maître d'ouvrage (obligation de vigilance).
4. **Nos chiffres** : km tirés et posés par an, chantiers par an, effectif [À CONFIRMER].
5. **Notre histoire** : 2005, création ; 2015, Qualifelec ; premiers chantiers avec LC Concept ; 2026, entrée dans le groupe Tenera [À CONFIRMER].
6. **Notre groupe** : 2 phrases, liens vers Tenera `/le-groupe/` et vers LC Concept.

### Données structurées
`AboutPage` + référence à `#org`.

## Moyens et qualifications

- **URL** : `/moyens-et-qualifications/` (nouvelle, 301 depuis `/ressources-humaines-et-materielles/`)
- **Statut** : ♻️
- **Rôle** : la page que l'acheteur imprime pour son dossier de référencement fournisseur.
- **Requêtes visées** : « électricien habilité amiante sous-section 4 », « sous-traitant électricité CACES nacelle », « électricien SEI Seveso ».
- **Title** : `Moyens et qualifications : habilitations, matériel | Stena`
- **Meta** : `Habilitations électriques, CACES, amiante SS4, SEI Seveso, sertisseuses jusqu'à 630 mm², cabestans, nacelles : les équipes et le matériel de Stena.`
- **H1** : `Nos moyens humains et matériels`

### Plan (H2)
1. **Nos équipes** : effectif, encadrement, ancienneté moyenne [À CONFIRMER].
2. **Qualifications** : tableau (`02`, §4), **mis à jour et daté** (« au 1er janvier 2027 »).
3. **Formation** : plan de formation, dont la formation au raccordement HT de 2015 (contenu de l'ancienne actualité).
4. **Matériel de tirage** : treuil, cabestans, porte-touret, aiguilles jusqu'à 320 m, vérins, dérouleuses.
5. **Matériel de raccordement** : sertisseuses de 12 t et 20 t, matrices, clés dynamométriques, étalonnage annuel.
6. **Travail en hauteur et levage** : nacelles, échafaudages, chariots.
7. **Atelier et logistique** : atelier de 300 m², 18 véhicules [À CONFIRMER].
8. **Certifications et attestations** : Qualifelec, attestation de vigilance, My Procurement ; liens vers `/documentation/`.

### Données structurées
`WebPage` ; `hasCredential` porté par `#org`.
