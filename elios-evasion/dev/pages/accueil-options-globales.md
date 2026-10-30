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

### Choix imposés par le logo (blanc uniquement pour l'instant)

- **Header collant désactivé** (`header_sticky` 0). Une fois collant, le header aurait un fond blanc et le logo blanc y deviendrait invisible. On le réactivera dès qu'une version foncée du logo sera fournie (`header_sticky` 1, `header_height_sticky` 70, `site_logo` foncé et `site_logo_dark` blanc).
- **Footer** : le fond est clair (`#F9F9F9`), donc le logo est remplacé par le nom « ELIOS EVASION » en texte Geist light, comme le logo texte de la maquette.
- ⚠️ **Hors périmètre, à noter** : les autres pages, qui n'ont pas de header transparent, auront un header blanc avec un logo blanc invisible tant qu'il n'y a pas de logo foncé.

## Médias : Modern Image Formats réglé sur AVIF

- Le client indique que la sortie est **AVIF**. On garde notre procédure : conversion locale en WebP avec les noms de `images-alt.csv`, puis envoi.
- On ne sait pas encore ce que l'extension fait d'un fichier **WebP** envoyé avec ce réglage (elle peut ajouter des versions AVIF). On le vérifie sur **la première photo envoyée**, en lisant `media_details` dans la réponse de l'API, avant d'envoyer les 8 autres. S'il y a une double conversion, on le signale.

## Procédure pour le client

1. *Flatsome > Avancé > Backup and Import*.
2. Coller le contenu de `flatsome-import-1-design-global.txt` dans la zone **Transfer Theme Options Data**.
3. Cliquer sur **Import Options**.
4. Si les polices ne changent pas sur le site : cliquer sur le bouton de vidage du cache des typographies, dans la section *Typography* du Customizer (option `clear_typography_cache`).

Il n'y a pas d'API REST pour cet import : c'est le client qui le fait dans l'admin.
