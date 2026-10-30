# Page d'accueil (version de test) : vérification des éléments utilisés

Code à coller : `accueil-test.ux.txt`, à placer dans l'éditeur **Texte/Code** de la page, ou dans UX Builder via « Edit as HTML / shortcode ».

- **Modèle de page** : « Page - Full Width » (`page-blank.php`).
- **Statut** : version de **test** de la structure, avant la maquette du designer. Aucune couleur, police ni espacement personnalisés : tout reste aux réglages par défaut de Flatsome.
- **Aucun CSS** : pas de `class`, pas de `style`.

## Chaque attribut utilisé, et où il est vérifié dans Flatsome 3.20.12

| Élément | Attributs utilisés | Vérification (fichier du thème) |
|---|---|---|
| `[ux_banner]` | `height`, `height__sm`, `bg`, `bg_overlay`, `bg_pos` | `inc/shortcodes/ux_banner.php` (shortcode_atts). `bg` accepte une URL : `inc/shortcodes/commons/background-image.php` (branche `! is_numeric`). Format `rgba(0, 0, 0, 0.4)` repris des préréglages du thème (`inc/builder/shortcodes/ux_banner.php`, l. 46-51) |
| `[text_box]` | `width`, `width__sm`, `position_x`, `position_y`, `text_align`, `text_color` | `inc/shortcodes/text_box.php` |
| `[button]` | `text`, `color` (`primary`, `white`), `style` (`outline`), `link` | `inc/shortcodes/buttons.php` ; valeurs de `color` et `style` dans `inc/builder/shortcodes/button.php` (l. 88-111) |
| `[section]` | `padding` | `inc/shortcodes/sections.php` |
| `[row]` | `v_align` (`middle`) | `inc/shortcodes/row.php` ; valeurs dans `inc/builder/shortcodes/row.php` (l. 165-176) |
| `[col]` | `span`, `span__md`, `span__sm` | `inc/shortcodes/row.php` |
| `[title]` | `text`, `tag_name`, `style` (`center`) | `inc/shortcodes/titles_dividers.php` ; valeurs de `style` dans `inc/builder/shortcodes/title.php` (l. 23-31) |
| `[ux_image_box]` | `img` (URL acceptée par `flatsome_get_image`), `image_height` (rendu en `padding-top`), `link` | `inc/shortcodes/ux_image_box.php` (l. 3-29, 64, 84-94) ; `inc/helpers/helpers-shortcode.php` (l. 259-275) |
| `[ux_image]` | `id` (URL acceptée : branche non numérique, l. 60-70) | `inc/shortcodes/ux_image.php` |
| `[accordion]`, `[accordion-item]` | `title` | `inc/shortcodes/accordion.php` |

Les images sont **toutes vérifiées** : réponse HTTP 200 sur le site actuel le 30/10/2026.

## Ce qui a été volontairement retiré du texte rédigé (`../../redaction/transverse/accueil.md`)

- **Le bandeau « chiffres clés »** : 3 chiffres sur 4 sont `[PROVISOIRE]`.
- **Les 3 témoignages**, tous `[PROVISOIRE]`.
- **Deux questions de la FAQ** (transport, délai de réservation), qui reposent sur des réponses `[À CONFIRMER]`.
- **La mention du délai d'envoi du devis** `[À CONFIRMER]` dans l'étape 2.

## Limites de cette version de test (à corriger dans la version définitive)

- **Images servies depuis l'ancien site** (URL externes) : pas de WebP, et pour les `[ux_image_box]` / `[ux_image]` avec URL, Flatsome met un alt générique (`bg_image`). La version définitive utilisera les **ID des médias** importés dans la médiathèque, avec leurs alt de `../../seo/donnees/images-alt.csv`.
- **Liens internes** : ils pointent vers des pages qui n'existent pas encore sur la préprod, donc 404 pour l'instant.
- **Design** : à reprendre entièrement d'après la maquette du designer, via les options Flatsome uniquement.
- **FAQ** : l'attribut `faq_schema` de `[accordion]` (vérifié dans `inc/shortcodes/accordion.php`, l. 34-42 et 161+) générerait le balisage FAQ. Il est laissé désactivé, puisque les données structurées sont reportées.
