# Accueil : état du brouillon et écarts avec la maquette (30/10/2026)

## Ce qui est en place sur la préprod

| Élément | ID | Source dans le dépôt |
|---|---|---|
| Page « accueil » (brouillon), modèle `page-transparent-header-light.php` | 8 | `accueil.ux.txt` |
| Bloc UX « Accueil - Témoignages » | 21 | `blocs/bloc-temoignages.ux.txt` |
| Bloc UX « CTA - Demander un devis » | 22 | `blocs/bloc-cta.ux.txt` |
| Bloc UX « Footer » (slug `footer`) | 23 | `blocs/bloc-footer.ux.txt` |
| Menu « Menu principal », emplacements `primary` et `primary_mobile` | 3 | `../../redaction/transverse/footer-et-menu.md` § 1 |
| Médias | 12-20, 38, 39 | `accueil-medias.md` |
| Options globales : import n° 1 (appliqué par le client) | — | `../imports/flatsome-import-1-design-global.txt` |
| Options globales : import n° 2 (appliqué par le client) | — | `../imports/flatsome-import-2-logo-header-footer.txt` |

**Contrôle automatique** : `python3 ../outils/verifier-shortcodes.py accueil.ux.txt blocs/*.ux.txt` → OK. Tous les shortcodes et attributs sont dans la référence. Aucun `class` ni `style`, aucun repère `[À CONFIRMER]`, `[PROVISOIRE]` ou `[À FOURNIR]`.

## Captures

`captures/accueil-ordinateur-1440.jpg` et `captures/accueil-mobile-390.jpg` (réduites à 720 px de large pour le dépôt).

**Méthode** : le brouillon n'est visible qu'avec une session ouverte dans l'admin, et le mot de passe d'application n'en ouvre pas dans le navigateur. Le rendu a donc été **reconstitué** ainsi :
- page publiée de la préprod (même header, CSS et options) ;
- contenu du brouillon rendu par WordPress (`content.rendered` de l'API) ;
- classes du modèle transparent ajoutées comme le fait le thème (`structure-pages.php` l. 66-67 et `structure-header.php` l. 1130-1137) ;
- footer remplacé par le bloc 23.

Captures du 30/10 (2ᵉ version) : faites **après** l'import n° 2 (logo blanc dans le header, footer en bloc, barre du bas Elios).

## Écarts restants avec la maquette, et leur cause

| Écart | Cause | Solution possible |
|---|---|---|
| **Photos un peu floues** (hero, CTA, cartes) | Originaux de 600 × 600 px seulement | Originaux HD à fournir par le client |
| **Hero refait le 30/10** d'après la maquette : bloc calé sur le bord gauche du conteneur (`position_x="0"`), bas du bloc à 85 % de la hauteur (`position_y="85"` ; au-delà de 50, Flatsome compte depuis le bas), H1, puis sous-titre de 18 px, puis **un seul bouton** blanc `size="small"`. Le sur-titre est devenu le sous-titre, et le lien « Voir nos séminaires » est retiré (déjà présent dans « Vous hésitez… »). Photo 47 | Retour du client | — |
| **H1 du hero à environ 64 px** au lieu de 80 px, sur 4 lignes | Notre H1 SEO fait 70 caractères, contre 35 dans la maquette : à 80 px, il passait sur 5 lignes et sortait du bandeau | Garder 64 px, ou raccourcir le H1 (décision SEO) |
| **H1 en graisse normale**, pas fine (light) | La graisse fine passe par la classe `alt-font` ; on ne met pas de classe à la main | Accepter, ou autoriser explicitement la classe `alt-font` fournie par Flatsome |
| ~~Coins droits~~ **Corrigé (2ᵉ version, règle du client)** : photos en `[ux_image]`, ou en `[ux_banner]` avec texte ; arrondi de **16 px** par CSS global (`css/encarts-arrondis.css`, autorisé) | Ancienne solution `[ux_image_box image_radius]` abandonnée : arrondi en %, irrégulier, surtout sur le CTA | `.box-image` a `overflow:hidden`, donc la photo est découpée. `image_radius` est **en %** (unité forcée dans `ux_image_box.php` l. 80) : 2 à 3 % selon le format, soit environ 17 px en largeur. Sur les formats très allongés, les coins sont à peine elliptiques | — |
| **Pas de dégradé** en bas des cartes destinations | `[ux_banner]` n'a qu'un voile uni (`bg_overlay`) ; le dégradé natif n'existait qu'avec `[ux_image_box]`, exclu par le client | Voile uni à 30 %, ou dégradé en CSS (à autoriser) |
| **Espacements** (retour du client : « plus aéré ») **corrigés** | Sections à 160 px (80 px sur mobile), 48 px entre le titre d'une section et son contenu, 96 px entre les offres, marge de 48 px entre photo et texte (`padding` de colonne), `[gap]` entre les éléments | — |
| **Pas d'espacement des lettres** sur les capitales | Pas d'option `letter-spacing` | Accepter |
| ~~Menu sans pilule~~ **Corrigé** : menu pilule en CSS (autorisé), dans l'import n° 3 | — | — |
| **Intro « L'agence » à 32 px** au lieu de 48 px | 60 mots, contre 45 dans la maquette : à 48 px, le bloc devenait très long | Garder, ou monter à 40 px |
| **Puces à la place des chiffres clés** | Chiffres `[PROVISOIRE]` | Chiffres vérifiés à fournir |
| **Bouton « Demander un devis » sur 2 lignes** dans le header mobile | Bouton du header en taille normale | Réglage `header_button_1_size` (à décider) |
| **Liens vers des pages qui n'existent pas encore** (404) | Seul l'accueil est dans le périmètre | Création des autres pages |

## Petites adaptations de texte (à valider)

- **Puces** : « Un seul interlocuteur, du premier appel… » est affiché en 2 lignes, un titre (« Un seul interlocuteur ») puis « Du premier appel à l'apéritif de fin de journée. ». Même chose pour les 2 autres puces, dont la 1ʳᵉ lettre de la 2ᵉ ligne passe en majuscule.
- **FAQ** : `faq_schema` n'est pas activé, puisque les données structurées sont reportées.
- **Hero** : le sur-titre est en capitales, et il n'y a pas de paragraphe sous le H1, comme dans la maquette. L'intro est affichée en grand dans la section « L'agence ».

## Pour valider

1. Coller l'import n° 2 (logos, header collant, footer, barre du bas), voir `accueil-options-globales.md`.
2. Ouvrir l'aperçu du brouillon dans l'admin (Pages > accueil > Prévisualiser).
3. Une fois l'accueil validé : le publier et le définir comme page d'accueil (`show_on_front=page`, `page_on_front=8`). C'est nous qui le faisons, par l'API, avec votre accord.

## Animations (30/10/2026)

- `fadeInUp` sur toutes les colonnes de la page (29), ainsi que sur la colonne des blocs Témoignages et CTA. Aucune animation sur le hero, le header ni le footer.
- Zoom lent au survol (`zoom-long`) des 3 cartes destinations et des 3 photos d'offres.
- Parallaxe `2` (sur 10) sur le fond du hero : environ 44 px de décalage pour 400 px de défilement, et rien sur mobile.
- Vérifié dans le navigateur : 31 éléments masqués au chargement, tous visibles après le défilement. Vidéo : `captures/accueil-animations.mp4`.
- **Non faisable nativement** : faire arriver les cartes l'une après l'autre (`animate_delay` n'est pas utilisé par le thème) ; couper les animations pour les visiteurs qui ont demandé « moins de mouvements » (il faudrait du CSS).
- **Hero** (ajout) : `fadeInUp` sur le texte (H1, sous-titre, bouton), la photo n'est pas animée. Mesure : le LCP reste l'image de fond, et le texte apparaît juste après. Vidéo : `captures/accueil-hero-apparition.mp4`.
- **Hero plein écran** (`height="100%"` = 100vh, minimum 550 px). Mesures : 2560×1440 → hero de 1440 px, texte entre 810 et 1224 px ; 1366×768 → hero de 768 px, texte à partir de 238 px (le header se termine à 120 px) ; mobile 390×844 → hero de 844 px.
- **Hero, en bas à droite** (maquette) : 3 icônes Facebook, Instagram et LinkedIn, en cercles à contour (`[follow style="outline"]`), empilées et alignées à droite, puis « Voir plus ↓ » qui mène à `#agence`. Mesures : cercles de 43 px (maquette : 40 px), même bord droit que « Voir plus ». Écarts : contour à l'épaisseur native (maquette : 1 px, impossible sans CSS), pas d'espacement des lettres sur « Voir plus ». Les mêmes icônes figurent dans la colonne Contact du footer.
- **Test vidéo** : YouTube `9OvjQ7sXhjI` en fond du hero (ordinateur uniquement, photo en secours dessous). Dans mon navigateur automatisé (serveur), YouTube répond « Video unavailable », un blocage courant des robots : **à vérifier dans un vrai navigateur**. Coût : environ 1,1 Mo et 27 requêtes ; cookies YouTube déposés dès l'affichage.
