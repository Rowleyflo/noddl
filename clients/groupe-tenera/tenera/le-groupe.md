# Tenera : le groupe

- **URL** : `/le-groupe/`
- **Statut** : 🆕
- **Rôle** : la page que liront les banques, les acheteurs de grands comptes et les cédants. Elle répond à « qui, pourquoi, avec quels moyens ». C'est aussi la page « à propos » que résumeront les IA.
- **Requêtes visées** : « tenera groupe dirigeant », « tenera holding », « qui est tenera ».

## Balises

- **Title** : `Le groupe Tenera : vision, dirigeants et chiffres clés`
- **Meta** : `Pourquoi Tenera fédère des PME de l'électricité et de la lumière, qui le dirige, et ce que le groupe représente aujourd'hui en équipes et en chantiers.`
- **H1** : `Le groupe Tenera`

## Plan de la page (H2)

1. **Tenera en bref** : encadré factuel en tableau. Raison sociale, SIREN, création, siège, dirigeant(s), filiales, effectif consolidé, zone d'intervention, secteurs. *C'est le bloc le plus cité par les IA : il doit rester factuel et daté.*
2. **Pourquoi un groupe** : le constat (des PME aux savoir-faire rares, trop petites pour les grands chantiers ou fragiles à la transmission) et la réponse (fédérer sans effacer les marques).
3. **Notre façon de faire** : chaque entreprise garde son nom, ses équipes et ses clients ; le groupe apporte la structure (finance, achats, recrutement, outils, image).
4. **Les dirigeants** : photo, nom, fonction, parcours en 3 lignes, LinkedIn [À CONFIRMER]. Des personnes réelles et identifiables : c'est un signal de confiance pour les humains comme pour les moteurs.
5. **Notre histoire** : frise. 2005, création de Stena ; 2007, création de LC Concept ; [année], premiers chantiers communs ; 2026, création de Tenera et rachats [À CONFIRMER].
6. **Nos engagements** : sécurité, formation, emploi local, aucun recours au travail détaché, qualité (qualifications des filiales).
7. **CTA** : vers `/nos-entreprises/` et `/contact/`.

## Maillage

- Vers `/nos-entreprises/stena/`, `/nos-entreprises/lc-concept/`, `/rejoindre-le-groupe/`, `/carrieres/`.
- Reçoit : le lien « Notre groupe » de `stena.fr/presentation/`.

## Données structurées

`AboutPage` + référence à `#org`. `Person` pour chaque dirigeant, avec `worksFor` → `#org` et `sameAs` → LinkedIn.
