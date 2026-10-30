# Elios Evasion — audit du site actuel avant refonte (Flatsome + Contact Form 7)

Extraction réalisée le 30/10/2026 sur https://www.elios-evasion.fr/ (via sitemaps Yoast, API REST WordPress publique et HTML rendu).

## Contenu de ce dossier

| Fichier | Contenu |
|---|---|
| `contenu/pages/*.md` | Une fiche par page : URL, SEO (title, meta, robots, canonical), textes dans l'ordre (avec niveau Hn réel), images + alt, boutons, liens, formulaires. Les `---` séparent les rangées WPBakery (≈ futures `[section]` Flatsome). |
| `contenu/navigation.md` | Menu principal, footer, logo |
| `contenu/inventory.json` | Inventaire des 31 URLs (title SEO, nb de mots, H1, nb d'images) |
| `contenu/medias.csv` | Médiathèque complète (376 fichiers) : dimensions, poids, alt, pages qui l'utilisent |
| `contenu/images_by_page.json` | Images réellement utilisées → pages |
| `telecharger-images.sh` | Retélécharge les 115 images originales utilisées (~130 Mo, non versionnées) |
| `outils-extract.py` | Script d'extraction (pour relancer si le site bouge) |

## Le site actuel en bref

- **WordPress 6.3.1** (pas à jour), thème **Bridge** (Qode) + enfant, **WPBakery**, **Slider Revolution**, **Yoast SEO**, **Contact Form 7**, Qode Membership, Weather Atlas.
- 30 pages + 1 article. Le contenu métier = **séminaires / team-building** (B2B) : Montpellier (7 journées), Avignon (4 journées), off-site Pyrénées (Font-Romeu), journée sur-mesure.
- Les fiches « journée » suivent toutes le même gabarit → idéal pour un **bloc réutilisable Flatsome** (header image + H1, intro, onglets Présentation/Programme/Galerie, prix « à partir de », infos pratiques, inclus/non inclus, formulaire de pré-réservation).

## Arborescence actuelle → proposition

| URL actuelle | Mots | Décision proposée |
|---|---|---|
| `/` Accueil | 433 | **Garder** (à refaire en Flatsome) |
| `/sejours/` | 208 | **Garder** (hub des offres) |
| `/seminaire-montpellier/` | 521 | **Garder** |
| `/seminaire-montpellier/journee-*` ×7 | ~300-350 | **Garder** les 7 fiches |
| `/seminaire-a-la-journee/` (= « Séminaire Avignon ») | 352 | **Garder** — option : renommer en `/seminaire-avignon/` + 301 |
| `/seminaire-a-la-journee/journee-*` ×4 | ~340 | **Garder** (suivre le parent si renommé) |
| `/sejours/sejour-team-building-pyrenees/` | 530 | **Garder** |
| `/journee-sur-mesure/` | 284 | **Garder** (absente du menu, à y ajouter) |
| `/a-propos/` | 98 | **Garder** (contenu à étoffer) |
| `/contact/` | 41 | **Garder** |
| `/blog/` + 1 article (2021) | — | **Garder** si le client compte bloguer ; sinon fusionner l'article dans « Destinations » |
| `/nos-destinations/` | 14 | **Garder mais à réécrire** : page quasi vide alors qu'elle est 1re du menu |
| `/politique-de-confidentialite/` | 1228 | **Garder** + créer de vraies **Mentions légales** séparées |
| `/remboursements_retours/` | 586 | Remplacer par `/conditions-generales-de-vente/` (texte e-commerce générique, à faire valider) |
| `/boutique/`, `/panier/`, `/commander/`, `/mon-compte/`, `/recapitulatif-sejour-et-paiement/` | 0-5 | **Supprimer** (restes de WooCommerce, vides) |
| `/user-dashboard/`, `/maintenance/` | — | **Supprimer** (plugin membre Qode / page technique, indexées par erreur) |

## Problèmes relevés (à corriger dans la refonte)

### SEO
1. **Aucune meta description** sur les 31 pages. Yoast se rabat sur le contenu → Facebook/LinkedIn (og:description) affichent du **code WPBakery brut** (`[vc_row css_animation=…`).
2. **Titles génériques** : « Nom de page - Elios Evasion », sans mots-clés (team building, séminaire, Montpellier…).
3. **Hiérarchie Hn incohérente** : pas de H1 sur l'accueil, titres de sections en H4/H5/H6, accroches en H5.
4. **Alt vides** sur 274 médias sur 376.
5. **Pages vides indexées** (boutique, panier, user-dashboard, maintenance…).
6. Page « Destinations » quasi vide alors qu'elle est en tête de menu.

### Liens cassés / internes
- **`/conditions-generales-de-vente/` → 404**, lien présent sur 12 fiches (sous le formulaire).
- Footer : « Les séjours sur-mesure » (`?page_id=708`) et « Brame du Cerf » (`?page_id=733`) → **404**.
- 13 liens internes pointent vers des URLs raccourcies (ex. `/journee-grotte-montpellier/`) qui passent par une redirection ; idem bouton slider `/sejours/seminaire-a-la-journee//`.
- Réseaux sociaux du footer → pointent vers `facebook.com`, `instagram.com`, `linkedin.com` génériques (pas les vrais comptes).

### Contenu / conversion
- **Téléphone incohérent** sur `/contact/` : affiché **06 79 02 93 32** mais le lien appelle **06 76 02 93 32**. À faire confirmer.
- Formulaire newsletter de l'accueil : un seul champ texte, pas d'outil d'emailing visible → à rebrancher (Brevo/Mailchimp) ou supprimer.
- La fiche « Quizz room Avignon » utilise un ancien formulaire (adultes/enfants/problème) différent des autres fiches.
- Champs « Lieu de rdv » et « Durée » vides dans les encadrés d'infos des fiches.
- Footer : texte « Pyrénées Orientales » uniquement, alors que l'offre couvre Montpellier et Avignon.
- Témoignages datés, prénoms seuls, orientés séjours loisirs (pas B2B).

### Performance
- Photos en **PNG de 6 à 10 Mo** (21 images > 1 Mo, 130 Mo pour 115 images). À convertir en WebP/JPG ~200-400 Ko dans la refonte.
- Bridge + WPBakery + Slider Revolution = page d'accueil lourde ; Flatsome natif réglera une bonne partie.

## Formulaires à recréer dans Contact Form 7

| Formulaire | Où | Champs |
|---|---|---|
| Pré-réservation séminaire | 12 fiches journée/séjour | entreprise, email, téléphone, adresse, effectif, date arrivée, date départ, disponibilité pour un RDV, souhaits, acceptation RGPD |
| Contact | `/contact/` | nom, email, téléphone, message, acceptation RGPD |
| (Newsletter) | accueil | email — à décider |

Conseil : un seul formulaire « pré-réservation » qui ajoute automatiquement le nom de l'offre (champ caché `[hidden offre default:post_title]`) → un seul formulaire à maintenir pour toutes les fiches.

## Plan de redirections 301 (à mettre dans le plugin Redirection ou .htaccess)

Principe : **on garde les mêmes URLs** pour toutes les pages conservées. Pas de redirection nécessaire, c'est le plus sûr pour le référencement.

| Ancienne URL | → Nouvelle URL |
|---|---|
| `/boutique/` | `/sejours/` |
| `/panier/` | `/sejours/` |
| `/commander/` | `/contact/` |
| `/mon-compte/` | `/` |
| `/recapitulatif-sejour-et-paiement/` | `/contact/` |
| `/user-dashboard/` | `/` |
| `/maintenance/` | `/` |
| `/remboursements_retours/` | `/conditions-generales-de-vente/` |
| `/2021/09/13/lieux-a-decouvrir-en-cerdagne-capcir/` | inchangée si on garde les permaliens « date », sinon `/blog/lieux-a-decouvrir-en-cerdagne-capcir/` |
| *Si renommage Avignon :* `/seminaire-a-la-journee/(.*)` | `/seminaire-avignon/$1` |

À vérifier avant la mise en ligne : la Google Search Console du site, pour repérer d'autres anciennes URLs encore indexées (datant de 2018-2021).

## Prochaines étapes

1. Faire valider les décisions du tableau d'arborescence par le client, ainsi que le numéro de téléphone.
2. Préparer le gabarit Flatsome « fiche séminaire » et les pages hub.
3. Une fois la préprod prête (mot de passe d'application + domaine autorisé) : import des images optimisées, création des pages en shortcodes Flatsome, création des formulaires CF7, puis mise en place des redirections.
