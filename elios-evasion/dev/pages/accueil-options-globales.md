# Accueil : import des options globales Flatsome (étape 5 du brief)

## Sauvegarde

L'export du client, fait le 30/10/2026 avant tout import, est dans `../sauvegardes/flatsome-export-2026-10-30-avant-import.txt` (71 clés, réglages d'origine du thème).

**Pour revenir en arrière** : coller ce texte dans *Flatsome > Avancé > Backup and Import > Import Options*.

⚠️ Cette restauration ne remet que les clés présentes dans l'export. Les clés ajoutées par l'import (couleurs, header…) n'y figurent pas toutes : il faudrait les remettre à leur valeur par défaut dans le Customizer.

Ce qu'on retient de l'export :
- `html_custom_css`, `html_custom_css_tablet` et `html_custom_css_mobile` sont **vides** : aucun CSS perso, conforme aux directives.
- Format des typographies confirmé : `array('font-family' => 'Lato', 'variant' => '700')`.
- Format des éléments du header confirmé : liste d'identifiants, par exemple `header_elements_left = ['search', 'nav']`.

## Fonctionnement de l'import (vérifié dans le code)

- `inc/admin/advanced/functions/functions.interface.php`, l. 233-238 : `import_options` fait `unserialize(base64_decode(...))`, puis appelle `of_save_options()`.
- `of_save_options()` (`functions.admin.php`, l. 96 et suivantes) appelle `set_theme_mod()` **pour chaque clé du texte**, et seulement pour celles-là. Toutes les autres options restent inchangées.

## Import n° 1 : design global

Fichier : `../imports/flatsome-import-1-design-global.txt`.
- 33 clés, toutes contrôlées automatiquement contre `reference-flatsome/options-customizer.md`.
- Identifiants des éléments du header contrôlés contre `flatsome_customizer_nav_elements()` (`inc/admin/options/helpers/options-helpers.php`).

| Groupe | Clés et valeurs |
|---|---|
| Couleurs (monochrome provisoire) | `color_primary` `#000000` · `color_secondary` `#444748` · `color_texts` `#444748` · `type_headings_color` `#000000` · `color_links` `#000000` · `color_links_hover` `#444748` · `color_divider` `#E2E2E2` · `body_bg` `#FFFFFF` |
| Typographie | `type_headings` Geist regular · `type_texts` Geist regular · `type_nav` Geist 500 · `type_alt` Geist 300 |
| Mise en page | `site_width` 1152 · `button_radius` `99px` |
| Header | `topbar_show` 0 · `header_height` 120 · `header_height_transparent` 120 · `header_bg` `#FFFFFF` · `header_divider` 0 · **`header_sticky` 0** · `nav_style` `line-bottom` · `nav_size` `small` · `nav_uppercase` 1 |
| Éléments du header (ordinateur) | `header_elements_left` vide (on retire la recherche) · `header_elements_right` = menu + bouton 1 (on retire compte, séparateur et panier) |
| Éléments du header (mobile) | `header_mobile_elements_left` = icône ☰ · `header_mobile_elements_right` = bouton 1 (on retire le panier) · `header_mobile_elements_top` vide · `mobile_sidebar` = menu seul (on retire recherche, compte, newsletter, réseaux sociaux, HTML) |
| Bouton du header | `header_button_1` « Demander un devis » · `header_button_1_link` `/contact/` · `header_button_1_radius` `99px` · `header_button_1_color` `primary` |

**Volontairement absentes** (on garde la valeur actuelle ou celle par défaut) :
- `type_size` : 100 par défaut ;
- `text_transform_*` : capitales par défaut ;
- `header_color` : texte foncé par défaut, et le modèle de page de l'accueil force le texte clair ;
- `header_bg_transparent` : vide par défaut ;
- `site_logo` : sera réglé une fois le logo envoyé dans la médiathèque ;
- `footer_block`, `footer_1` et `footer_2` : import n° 2, après la création du Bloc UX « Footer ».

### Choix imposés par le logo (blanc uniquement) : remplacés par l'import n° 2

Le site actuel a une version couleur du logo, avec le texte foncé (`LOGO_Elios-Evasion.png`). L'import n° 2 réactive donc le header collant et règle les deux logos. La note ci-dessous ne vaut que pour l'import n° 1.

- **Header collant désactivé** (`header_sticky` 0). Une fois collant, le header aurait un fond blanc et le logo blanc y deviendrait invisible. On le réactivera dès qu'une version foncée du logo sera fournie (`header_sticky` 1, `header_height_sticky` 70, `site_logo` foncé et `site_logo_dark` blanc).
- **Footer** : le fond est clair (`#F9F9F9`), donc le logo est remplacé par le nom « ELIOS EVASION » en texte Geist light, comme le logo texte de la maquette.
- ⚠️ **Hors périmètre, à noter** : les autres pages, qui n'ont pas de header transparent, auront un header blanc avec un logo blanc invisible tant qu'il n'y a pas de logo foncé.

## Import n° 2 : logos, header collant, footer

Fichier : `../imports/flatsome-import-2-logo-header-footer.txt`, 9 clés vérifiées dans la référence. Les formats sont vérifiés dans le code :
- `site_logo` et `site_logo_dark` sont enregistrés en **ID** (`'save_as' => 'id'`, `options-header-logo.php`) ;
- `footer_block` attend le **slug** du bloc (`flatsome_customizer_blocks()`, `options-helpers.php` l. 14-25) ;
- quand un footer en bloc est actif, la barre du bas (`footer-absolute.php`) reste affichée (`structure-footer.php` l. 51-70).

| Clé | Valeur | Pourquoi |
|---|---|---|
| `site_logo` | 38 (logo couleur, texte foncé) | Header collant à fond blanc |
| `site_logo_dark` | 39 (logo blanc) | Header transparent de l'accueil |
| `header_sticky` / `header_height_sticky` | 1 / 70 | Header collant (possible grâce au logo couleur trouvé sur l'ancien site) |
| `bottombar_sticky` | 0 | Par défaut à 1, il gardait le header collant même avec `header_sticky` à 0 (`structure-header.php` l. 1006-1009) |
| `footer_block` | `footer` | Bloc UX 23 |
| `footer_bottom_color` / `footer_bottom_text` | `#F9F9F9` / `light` (`light` = texte foncé) | Barre du bas dans le prolongement du footer |
| `footer_left_text` | © année automatique, ELIOS EVASION, liens légaux | Remplace « Copyright © Flatsome Theme » |

## Médias : Modern Image Formats réglé sur AVIF

- Le client indique que la sortie est **AVIF**.
- Test fait le 30/10/2026 : un WebP envoyé est reconverti en AVIF (double compression, fichier plus lourd). On envoie donc les JPEG d'origine renommés. Détails dans `accueil-medias.md`.

## Procédure pour le client

1. *Flatsome > Avancé > Backup and Import*.
2. Coller le contenu de `flatsome-import-1-design-global.txt` dans la zone **Transfer Theme Options Data**.
3. Cliquer sur **Import Options**.
4. Si les polices ne changent pas sur le site : cliquer sur le bouton de vidage du cache des typographies, dans la section *Typography* du Customizer (option `clear_typography_cache`).

Il n'y a pas d'API REST pour cet import : c'est le client qui le fait dans l'admin.

## Import n° 3 : CSS perso autorisé, bouton et espacement du menu

Fichier : `../imports/flatsome-import-3-css-perso.txt`.

| Clé | Valeur |
|---|---|
| `html_custom_css` | contenu de `../css/flatsome-custom-css.css` = `menu-pilule.css` (header, à partir de 850 px de large) + `encarts-arrondis.css` (16 px sur `.col-inner .img-inner` et `.col-inner .banner`) |
| `header_button_1_size` | `small` (corrige aussi le bouton sur 2 lignes en mobile) |
| `nav_spacing` | `xlarge` (choix vérifiés : `xsmall`, `small`, `''`, `medium`, `large`, `xlarge`) |

⚠️ L'import **remplace** tout le champ *Custom CSS* : pour modifier ce CSS plus tard, on édite les fichiers de `../css/` et on régénère l'import. On n'écrit pas directement dans l'admin.

## Import n° 4 : ajustements du 30/10 (retours du client)

Fichier : `../imports/flatsome-import-4-ajustements.txt`. Il **remplace** le n° 3 : il reprend ses clés et en ajoute une.

| Clé | Valeur | Retour du client |
|---|---|---|
| `html_custom_css` | `../css/flatsome-custom-css.css` : liens plus espacés dans la pilule (18 px), bouton décollé du bord droit (marge de 14 px, fond de pilule de 10 px à droite), bouton du header plus haut (`padding: 4px 24px`), **plus d'ombre sur le header collé** (`.header-wrapper.stuck{box-shadow:none}`), encarts à 16 px inchangés | « Plus d'espace entre les liens », « bouton trop collé à droite », « bandeau blanc au scroll » |
| `header_bg` | `rgba(255,255,255,0)` | Le fond du header collé vient de cette option (`.header-bg-color`) : transparent, il n'y a plus de bandeau. La pilule garde son propre fond |
| `header_button_1_size`, `nav_spacing` | `small`, `xlarge` | inchangés |

Note : avec un header transparent, sur les autres pages (header non transparent), le logo couleur et la pilule flottent au-dessus du contenu. C'est le comportement voulu par la maquette.
