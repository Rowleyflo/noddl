# Stena : arborescence cible

**Principe** : on garde les URL métier existantes. On ajoute ce qui manque (secteurs, moyens, recrutement) et on range les chantiers sous `/nos-realisations/`.

```
/                                        Accueil                               ✏️
/tirage-de-cables/                       Métier                                ✏️ URL conservée
/pose-de-chemin-de-cables/               Métier                                ✏️ URL conservée
/pose-et-raccordement/                   Métier                                ✏️ URL conservée
/secteurs/                               Hub secteurs                          🆕
  /secteurs/naval/                                                             🆕
  /secteurs/industrie-energie/           Industrie, énergie, eau, agroalimentaire 🆕
  /secteurs/sante/                       CHU, cliniques, EHPAD                 🆕
  /secteurs/tertiaire/                   Tertiaire, ERP, sport, prestige       🆕
  /secteurs/sites-sensibles/             Amiante SS4, Seveso, ATEX, postes HT  🆕
/nos-realisations/                       Portfolio (option Portfolio)          ✏️ URL conservée
  /nos-realisations/<slug>/              Fiche chantier                        ♻️ (anciennes URL à la racine)
/presentation/                           L'entreprise, en bref, groupe Tenera  ✏️ URL conservée
/moyens-et-qualifications/               Effectifs, habilitations, matériel    ♻️ (ex-/ressources-humaines-et-materielles/)
/recrutement/                            Offres d'emploi (JobPosting)          🆕
/contact-et-devis/                       Contact                               ✏️ URL conservée
/documentation/                          Attestations, plaquette, CG           ✏️ URL conservée
/conditions-generales-dentreprise-stena/                                       ✅ noindex
/conditions-generales-dachat/                                                  ✅ noindex
/mentions-legales/                                                             ✏️
```

**Menu principal** : Nos métiers (3 sous-entrées) · Secteurs · Réalisations · L'entreprise (Présentation, Moyens et qualifications) · Recrutement · **Contact et devis** (bouton)
**Pied de page** : coordonnées complètes (NAP), qualifications, liens légaux, **« Une entreprise du groupe Tenera »** avec logo et lien.

## Pourquoi 5 pages secteur, pas 8

Le site actuel cite huit milieux (tertiaire, industriel, naval, hospitalier, agroalimentaire, commercial, amianté, Seveso). Avec 22 chantiers connus, huit pages seraient minces. On regroupe en **5 pages, avec au moins 3 chantiers chacune** :

| Page | Chantiers disponibles |
|---|---|
| Naval | Marion Dufresne, Yersin (+ chantiers récents ?) |
| Industrie et énergie | EDF Cordemais (×2), éoliennes de Buire-le-Sec, photovoltaïque de Crucey, Synutra, STEP Carré de Réunion, Climespace |
| Santé | CHU de Nantes, CHU de Caen, EHPAD de Mauron |
| Tertiaire | Roland-Garros, Fouquet's, zoo de Paris, Pavillon 1924, gymnase Fogel, caserne Oudinot, Super U, École d'architecture, Nef Dubigeon |
| Sites sensibles | Raffinerie de Donges, CHU de Caen (amiante), EDF Cordemais |

⚠️ **Naval** n'a que 2 chantiers, datés. Vu l'enjeu (Saint-Nazaire, LC Concept), c'est la priorité de la collecte de références récentes. Sans nouvelles références, publier la page plus tard.

L'agroalimentaire (1 chantier) est intégré à « Industrie et énergie ». Une page dédiée sera à envisager s'il y a d'autres références.
