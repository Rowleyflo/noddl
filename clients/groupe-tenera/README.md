# Groupe Tenera : contenus et stratégie SEO / GEO (holding + Stena)

Préparé le 30/10/2026 à partir :
- de la proposition commerciale noddl « Groupe Tenera » (juillet 2026) ;
- d'un relevé complet de **stena.fr** : les 31 URL du sitemap, la plaquette PDF 2015 et l'attestation Qualifelec 2015 ;
- de recherches publiques sur les noms « Tenera », « Stena » et « LC Concept ». Les registres officiels n'ont pas pu être consultés depuis cet environnement : les points juridiques restent **[À CONFIRMER]**.

Périmètre : le **site mère Tenera**, à créer, et le **site de la filiale Stena**, à refondre. LC Concept n'apparaît ici que pour son rôle dans l'architecture du groupe. Sa fiche détaillée se fera dans une seconde passe, sur le même modèle que Stena.

## Comment utiliser ces fichiers

1. Commencez par lire `00-contexte.md` et `03-strategie-seo-geo-groupe.md`. Le premier décrit qui est qui, le second qui cible quoi et comment les sites se répondent.
2. `01-audit-stena-actuel.md` dresse l'état des lieux technique et éditorial du site actuel. `02-contenus-recuperes-stena.md` contient **tout le contenu réutilisable**, nettoyé et classé, prêt à être réécrit.
3. `04-collecte-client.md` est le questionnaire à envoyer au client. Sans ses réponses, les pages resteront creuses.
4. Les fiches page des dossiers `tenera/` et `stena/` suivent le format de `seo-refonte/` : URL, requêtes visées, balises, plan des H2, maillage, données structurées et points à confirmer.
5. Avant toute bascule de Stena, appliquez `stena/plan-redirections.md`.

## Conventions

- **Title** : 60 caractères maximum. **Meta description** : 120 à 155 caractères. Toutes les propositions ont été vérifiées sur ces longueurs.
- **Statut** : 🆕 page à créer, ✏️ page existante refondue, ♻️ page fusionnée ou redirigée.
- **Requêtes visées** : ce sont des hypothèses de travail. **Aucun volume n'a été mesuré.** Ce sont des requêtes B2B de niche, aux volumes faibles : il faut les valider avec Keyword Planner, Semrush ou Ahrefs, et surtout avec la Search Console de stena.fr si le client y donne accès.
- **[À CONFIRMER]** : une hypothèse ou une donnée à faire valider par le client. Rien n'est publié tant qu'elle reste dans le texte.
- **Orthographe de la marque** : la proposition écrit « Tenera », le brief oral « Ténerra ». Ces fichiers utilisent **Tenera** en attendant l'arbitrage (voir `00-contexte.md`, §3). C'est la première chose à trancher.

## Index

### Cadrage
| Fichier | Contenu |
|---|---|
| `00-contexte.md` | Le groupe, les entités, les cibles, ce que noddl a vendu |
| `01-audit-stena-actuel.md` | Audit technique, éditorial, SEO et GEO de stena.fr |
| `02-contenus-recuperes-stena.md` | Inventaire du contenu existant : métiers, références, chiffres, moyens, clients |
| `03-strategie-seo-geo-groupe.md` | Architecture multi-sites, répartition des mots-clés, GEO, données structurées, suivi |
| `04-collecte-client.md` | Questionnaire et liste des pièces à demander au client |

### Site Tenera (holding, à créer)
| Fichier | URL | Statut |
|---|---|---|
| `tenera/arborescence.md` | Arborescence, menu et sitemap | 🆕 |
| `tenera/accueil.md` | `/` | 🆕 |
| `tenera/le-groupe.md` | `/le-groupe/` | 🆕 |
| `tenera/nos-entreprises.md` | `/nos-entreprises/` + une page par filiale | 🆕 |
| `tenera/savoir-faire.md` | `/savoir-faire/` | 🆕 |
| `tenera/references.md` | `/references/` | 🆕 |
| `tenera/rejoindre-le-groupe.md` | `/rejoindre-le-groupe/` (dirigeants qui veulent céder) | 🆕 |
| `tenera/carrieres.md` | `/carrieres/` | 🆕 |
| `tenera/actualites-blog.md` | `/actualites/` + premiers sujets | 🆕 |
| `tenera/contact-et-legal.md` | `/contact/`, `/mentions-legales/` | 🆕 |

### Site Stena (filiale, refonte)
| Fichier | URL | Statut |
|---|---|---|
| `stena/arborescence.md` | Arborescence cible, menu | ✏️ |
| `stena/plan-redirections.md` | Les 31 URL actuelles et leur destination | ♻️ |
| `stena/accueil.md` | `/` | ✏️ |
| `stena/tirage-de-cables.md` | `/tirage-de-cables/` | ✏️ |
| `stena/pose-de-chemin-de-cables.md` | `/pose-de-chemin-de-cables/` | ✏️ |
| `stena/pose-et-raccordement.md` | `/pose-et-raccordement/` | ✏️ |
| `stena/secteurs.md` | `/secteurs/` + 6 pages secteur | 🆕 |
| `stena/realisations.md` | `/nos-realisations/` + modèle de fiche chantier | ✏️ |
| `stena/entreprise.md` | `/presentation/`, `/moyens-et-qualifications/` | ✏️ |
| `stena/recrutement.md` | `/recrutement/` | 🆕 |
| `stena/contact-documentation.md` | `/contact-et-devis/`, `/documentation/`, pages légales | ✏️ |

### Sources brutes
| Fichier | Contenu |
|---|---|
| `sources/stena-extraction-2026-10-30.txt` | Pour chacune des 31 URL de stena.fr : title, meta, canonical, titres, images sans alt, nombre de mots, texte |
| `sources/stena-plaquette-2015.txt` | Texte extrait de la plaquette PDF 2015 |
