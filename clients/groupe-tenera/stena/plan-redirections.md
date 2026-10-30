# Stena : plan de redirections

Les 31 URL du sitemap actuel (relevé du 30/10/2026). **À compléter** par un crawl complet et par l'export Search Console avant la bascule : archives WordPress, pièces jointes, `?p=`, flux, PDF.

Règles :
- **301** vers la page la plus proche en contenu, jamais vers l'accueil par défaut.
- Les PDF de `/wp-content/uploads/` qui ont des liens entrants : 301 vers `/documentation/`.
- Vérifier après bascule que chaque ancienne URL renvoie bien **un seul saut** (pas de chaîne http → https → nouvelle URL).

## Pages conservées (même URL, contenu refondu)

| URL actuelle | Action |
|---|---|
| `/` | Conservée |
| `/tirage-de-cables/` | Conservée |
| `/pose-de-chemin-de-cables/` | Conservée |
| `/pose-et-raccordement/` | Conservée |
| `/nos-realisations/` | Conservée |
| `/presentation/` | Conservée |
| `/contact-et-devis/` | Conservée |
| `/documentation/` | Conservée |
| `/mentions-legales/` | Conservée |
| `/conditions-generales-dentreprise-stena/` | Conservée (noindex) |
| `/conditions-generales-dachat/` | Conservée (noindex) |

## Pages redirigées

| URL actuelle | → Nouvelle URL | Note |
|---|---|---|
| `/ressources-humaines-et-materielles/` | `/moyens-et-qualifications/` | Contenu repris et mis à jour |
| `/les-chiffres/` | `/presentation/` | Page vide, les chiffres vont dans l'encadré « en bref » |
| `/caroussel/` | `/nos-realisations/` | Bloc technique (logos) |
| `/texte-accueil/` | `/` | Doublon de l'accueil |
| `/actualites-sur-la-page-daccueil/` | `/tirage-de-cables/` | Son texte parle de tirage |
| `/formation-au-raccordement-ht-du-personnel-stena/` | `/moyens-et-qualifications/` | Formation reprise dans la page |
| `/bateau-marion-dufrene-dunkerque-59/` | `/nos-realisations/navire-marion-dufresne-dunkerque/` | Slug corrigé |
| `/yersin-concarneau-29/` | `/nos-realisations/navire-yersin-concarneau/` | |
| `/ieg-a-edf-cordemais-44/` | `/nos-realisations/centrale-edf-cordemais/` | |
| `/juret-dun-ephad-mauron-56/` | `/nos-realisations/ehpad-mauron/` | « EPHAD » corrigé |
| `/gymnase-fogel-st-nazaire-44/` | `/nos-realisations/gymnase-fogel-saint-nazaire/` | |
| `/fouquets-paris-75/` | `/nos-realisations/hotel-fouquets-paris/` | |
| `/pavillon-1924-au-circuit-de-lina-montlheri-94/` | `/nos-realisations/pavillon-1924-linas-montlhery/` | Département 91, pas 94 |
| `/site-de-synutra-carhaix-29/` | `/nos-realisations/usine-synutra-carhaix/` | |
| `/zone-process-la-step-carre-de-reunion-78/` | `/nos-realisations/step-carre-de-reunion-saint-cyr-lecole/` | |
| `/zoo-de-vincennes-vincennes-75/` | `/nos-realisations/serre-tropicale-zoo-de-paris/` | Parc zoologique de Paris, 12e |
| `/travaux-sur-eoliennes-62000-buire-le-sec/` | `/nos-realisations/eoliennes-buire-le-sec/` | Actualité devenue fiche chantier |
| `/caserne-oudinot-commercy/` | `/nos-realisations/caserne-oudinot-commercy/` | Idem |
| `/demarrage-du-chantier-climespace-galeries-lafayette/` | `/nos-realisations/climespace-galeries-lafayette-paris/` | Idem |
| `/demarrage-travaux-roland-garros/` | `/nos-realisations/roland-garros-batiment-tv-paris/` | Idem |

## URL probables hors sitemap (à confirmer au crawl)

| URL | → |
|---|---|
| `/author/admin/` | `/presentation/` |
| `/category/non-classe/` | `/nos-realisations/` |
| `/2015/…`, `/2016/…`, `/2017/…` (archives) | `/nos-realisations/` |
| `/feed/`, `/comments/feed/`, `/sitemap.rss` | 410 |
| `/wp-content/uploads/2016/02/plaquette_stena_2015_B-2.pdf` | `/documentation/` (ou nouvelle plaquette) |
| `/wp-content/uploads/2016/02/QUALIFELEC-STENA.pdf` | `/documentation/` |
| `/?p=<id>` et `/?page_id=<id>` | Destination de l'article ou de la page correspondante |

## Nouvelles fiches à créer depuis la plaquette (sans ancienne URL)

`/nos-realisations/chu-nantes/`, `/nos-realisations/chu-caen-zone-amiantee/`, `/nos-realisations/raffinerie-donges/`, `/nos-realisations/centrale-photovoltaique-crucey/`, `/nos-realisations/super-u-saint-michel-chef-chef/`, `/nos-realisations/ecole-architecture-nantes/`, `/nos-realisations/nef-dubigeon-nantes/`.

## Contrôles après la bascule

1. Tester les 31 URL et celles du crawl : code 301 et destination attendue (script ou Screaming Frog en mode liste).
2. Soumettre le nouveau sitemap à Google et à Bing, et pousser via IndexNow.
3. Search Console : rapport « Pages » et erreurs 404 chaque semaine pendant 6 semaines, puis chaque mois.
4. Garder les redirections **au moins un an**, idéalement sans limite.
