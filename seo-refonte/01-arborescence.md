# Arborescence cible

## Principe : deux piliers, puis des modules, des intégrations et des secteurs

```
/                                   Accueil : agence + plateforme, multi-secteurs
│
├── /solutions/site-internet/       PILIER 1 : création de site (l'agence)
├── /solutions/back-office/         PILIER 2 : la plateforme (gestion du site et du marketing digital)
│
├── /solutions/                     Hub des modules
│   ├── reseaux-sociaux/            Module commun
│   ├── fiche-google/               Module commun
│   ├── seo-local/                  Module commun
│   ├── assistant-ia/               Module commun
│   ├── relance-devis/              Module métier : devis (URL conservée, libellé « Gestion de devis »)
│   ├── suivi-chantier/             🆕 Module métier : artisans du bâtiment
│   ├── cartes-menus/               🆕 Module métier : restaurants et commerces de bouche
│   └── mentions-obligatoires/      🆕 Module métier : pompes funèbres (et autres professions réglementées [À CONFIRMER])
│
├── /integrations/                  🆕 Hub des intégrations
│   ├── apimo/                      🆕 Immobilier
│   ├── zenchef/                    🆕 Restaurants
│   └── …                           [À CONFIRMER : autres outils connectés]
│
├── /metiers/                       Hub des secteurs (libellé « Secteurs » dans le menu, URL conservée)
│   ├── Artisans du bâtiment : macon-renovation, couvreur, electricien, plombier-chauffagiste,
│   │                          climatisation-pompe-a-chaleur, paysagiste
│   ├── Restauration et bouche : restaurant, boulangerie-patisserie, boucherie-traiteur, epicerie-fine-cave
│   ├── Professions réglementées : 🆕 pompes-funebres, 🆕 agence-immobiliere
│   └── Collectivités et associations : mairie, ecole, association-club
│
├── /comparatifs/                   agence-web, wix, simplebo, solocal, obat, + nouveaux
├── /guides/                        Guides, à étendre aux autres secteurs
├── /glossaire/                     Glossaire, à garder léger
├── /villes/                        Pages locales, indexation sélective
│
└── /tarifs/  /clients/  /methode/  /a-propos/  /faq/  /contact/
```

## Menu principal proposé

| Ordre | Libellé | Contenu du menu déroulant |
|---|---|---|
| 1 | **Création de site** | `/solutions/site-internet/`, `/methode/`, réalisations |
| 2 | **La plateforme** | `/solutions/back-office/` en tête, puis les modules regroupés en « Communs » et « Par métier » |
| 3 | **Intégrations** | `/integrations/`, puis un lien par outil |
| 4 | **Secteurs** | Les quatre groupes ci-dessus. Remplace le libellé « Métiers » ; l'URL `/metiers/` ne change pas |
| 5 | **Tarifs** | `/tarifs/` |
| 6 | **Clients** | `/clients/` |
| 7 | **Guides** | `/guides/` |
| CTA | **Contact** | `/contact/` |

## Nouvelles URL à créer

| URL | Fiche |
|---|---|
| `/solutions/suivi-chantier/` | `2-modules/suivi-chantier.md` |
| `/solutions/cartes-menus/` | `2-modules/cartes-menus.md` |
| `/solutions/mentions-obligatoires/` | `2-modules/mentions-obligatoires.md` |
| `/integrations/` | `3-integrations/hub-integrations.md` |
| `/integrations/apimo/` | `3-integrations/apimo.md` |
| `/integrations/zenchef/` | `3-integrations/zenchef.md` |
| `/metiers/pompes-funebres/` | `4-secteurs/pompes-funebres.md` |
| `/metiers/agence-immobiliere/` | `4-secteurs/agence-immobiliere.md` |

## Sitemaps

- Ajouter `sitemap-integrations.xml` dans `sitemap-index.xml`.
- Ajouter les nouvelles URL de modules à `sitemap-solutions.xml`, et celles des secteurs à `sitemap-metiers.xml`.
- Mettre à jour `<lastmod>` uniquement quand le contenu change réellement.
- Après publication, soumettre `sitemap-index.xml` à nouveau dans la Search Console, puis demander l'indexation des 8 nouvelles URL et des pages piliers modifiées.

## Redirections

- Aucune nouvelle redirection n'est nécessaire, puisqu'aucune URL existante ne change.
- La 301 existante `/guides/devis/devis-sans-reponse-que-faire/` → `/guides/devis/relance-devis/` est correcte, à garder.
