# Consignes de développement : site Elios Evasion (WordPress + Flatsome)

> **Mémoire du projet.** À relire au début de chaque session de développement, avant toute action sur le site. À mettre à jour à chaque décision.

## 1. Directives du client (non négociables)

1. **Pas de CSS personnalisé.**
   - Rien dans « CSS personnalisé » (Flatsome > Avancé ou Customizer > CSS additionnel), rien dans un `style.css` de thème enfant, aucun attribut `style=""` écrit à la main dans les contenus, aucune classe inventée.
   - Seuls sont permis les **options Flatsome** (Customizer / theme mods) et les **attributs natifs des éléments UX Builder** (shortcodes).
   - Les classes utilitaires **fournies par Flatsome** (ex. `form-flat`, `flex-row`, `button primary` dans les modèles Contact Form 7 du thème) sont permises, car elles font partie du thème.
2. **Zéro hallucination.**
   - On n'utilise que ce qui est **vérifié dans le code source de Flatsome 3.20.12** (voir `reference-flatsome/`) ou dans la documentation officielle.
   - Une clé d'option, un attribut de shortcode ou une valeur absents de la référence ne sont pas utilisés tant qu'ils ne sont pas vérifiés dans le source.
   - Côté contenu : uniquement les textes de `../redaction/`. Les repères `[À CONFIRMER]`, `[À FOURNIR]` et `[PROVISOIRE]` ne sont **jamais publiés** (page en brouillon, ou bloc masqué).
3. **Cohérence de design entre les pages.**
   - Une seule palette, une seule typographie, une seule échelle d'espacements, un seul style de bouton, définis **une fois** dans les options globales.
   - Les sections récurrentes sont construites **une fois** sous forme de **Blocs UX** (type de contenu `blocks`, shortcode `[block id="…"]`), puis réutilisées.
   - Chaque type de page suit un **gabarit unique** (§ 5).

## 2. Environnement

- **Thème** : Flatsome **3.20.12** (`Requires at least` WP 6.4, PHP 7.4) avec un **thème enfant**, créé par l'assistant d'installation de Flatsome. Le thème enfant ne contient **aucun CSS** ajouté.
- **Paquet ThemeForest** : il ne contient que le dossier `flatsome/`, pas de thème enfant fourni.
  - Il est extrait **hors du dépôt**, dans le scratchpad de session, et **n'est jamais commité** (licence ThemeForest).
- **Extensions prévues** :
  - Contact Form 7 (demandée) ;
  - Yoast SEO (déjà utilisé sur le site actuel ; Flatsome a une intégration native, voir § 3) ;
  - Redirection (pour les 301 de `../seo/donnees/redirections.csv`).
  - Toute autre extension doit être validée par le client avant installation.
- **Préprod** : https://core-flatsome.otakudesign.fr (serveur Apache). Accès par l'**API REST WordPress** avec un **mot de passe d'application**, rangé dans les variables d'environnement de la session (`WP_URL`, `WP_USER`, `WP_APP_PASSWORD`) et **jamais écrit** dans le dépôt ni dans le chat. Le domaine de la préprod doit être autorisé dans la politique réseau de l'environnement cloud.
- **Pas de SSH ni de WP-CLI** depuis le conteneur cloud : le port 22 sortant est bloqué (testé le 30/10/2026).

## 3. Mécanismes Flatsome vérifiés dans le code source

| Besoin | Mécanisme vérifié | Source |
|---|---|---|
| Réglages globaux (couleurs, typo, header, footer, boutons, mise en page) | **theme mods** (Customizer, via Kirki). Liste complète des clés : `reference-flatsome/options-customizer.md` | `inc/admin/options/**` |
| Appliquer tous les réglages globaux d'un coup | **Flatsome > Avancé > Backup and Import** : zone « transfer » = `base64_encode(serialize(theme_mods))` ; « Import Options » appelle `set_theme_mod()` clé par clé. On génère le texte d'import (clés vérifiées seulement), le client le colle. **Toujours sauvegarder l'export existant avant.** | `inc/admin/advanced/functions/functions.interface.php` (l. 232-238), `functions.admin.php` (`of_save_options`) |
| Contenu des pages | **Shortcodes UX Builder** dans `post_content`, éditables ensuite dans UX Builder. Attributs et valeurs par défaut : `reference-flatsome/shortcodes-attributs.md` | `inc/shortcodes/**` |
| Sections réutilisables (CTA, réassurance, témoignages…) | Type de contenu **`blocks`** (`show_in_rest => true`), shortcode **`[block id=""]`** | `inc/post-types/post-type-ux-blocks.php` |
| Footer | Option **`footer_block`** : choisit un Bloc UX comme footer | `inc/admin/options/footer/options-footer.php` |
| Pleine largeur sans titre automatique | Modèle de page **`page-blank.php`** (« Page - Full Width ») | en-tête du fichier |
| Séparateurs de section (vagues, courbes) | Attributs de `[section]` : `divider_top`, `divider_top_height`, `divider_top_fill`, `divider_top_flip`, `divider`, `divider_height`, `divider_fill`, `divider_flip`, `divider_to_front`. Les formes disponibles sont dans `inc/builder/shortcodes/values/dividers.php` | `inc/shortcodes/sections.php` |
| Fil d'Ariane | Option **`wpseo_breadcrumb`** : remplace le fil d'Ariane Flatsome par celui de Yoast | `inc/integrations/wp-seo/class-wp-seo.php` |
| Formulaires | Contact Form 7, avec les **préréglages Flatsome** (onglet « Presets » dans l'éditeur de CF7 : classes `form-flat`, `flex-row`, `button primary`) | `inc/integrations/contact-form-7/contact-form-7.php` |
| Médias | `POST /wp/v2/media` puis mise à jour de `alt_text`, `title`, `caption`. Les images sont converties en **WebP** localement (Pillow, support WebP vérifié) avant envoi | API REST WP |
| Menus | `wp/v2/menus` et `wp/v2/menu-items` (WP ≥ 5.9) | API REST WP |

**À vérifier sur la préprod avant usage** (non vérifiable dans le zip) :
- l'API REST de Contact Form 7 (création de formulaires) ;
- l'API de Redirection ;
- l'écriture des méta Yoast par REST (non exposée par défaut, voir § 7).

## 4. Système de design (rempli à l'étape 2, validé par le client)

Tous les réglages passent par les options Flatsome. Chaque valeur est notée ici avec sa clé de theme mod vérifiée.

| Élément | Clé Flatsome | Valeur |
|---|---|---|
| Couleur principale | `color_primary` | [À DÉCIDER] (vert actuel du site : `#a9c810`) |
| Couleur secondaire | `color_secondary` | [À DÉCIDER] (rouge actuel du site : `#e54b4b`) |
| Succès / alerte | `color_success` / `color_alert` | [À DÉCIDER] |
| Texte, liens | `color_texts`, `color_links` | [À DÉCIDER] |
| Typo des titres | `type_headings` | [À DÉCIDER] (police actuelle : Montserrat) |
| Typo du texte | `type_texts` | [À DÉCIDER] |
| Typo de navigation, typo alternative | `type_nav`, `type_alt` | [À DÉCIDER] |
| Taille de base | `type_size` | [À DÉCIDER] |
| Largeur du contenu | `site_width` | [À DÉCIDER] |
| Arrondi des boutons | `button_radius` | [À DÉCIDER] |
| Logo | `site_logo` | logo actuel `LOGO_Elios-Evasion_wht.png`, en attendant le SVG |

**Règles d'usage dans les pages** (conséquences de la directive 3) :
- **Couleurs** : seulement `primary`, `secondary`, `success`, `alert`, ainsi que le blanc et le noir. Dans les attributs (`color`, `bg_color`…), on utilise les **mots-clés de couleur Flatsome** (`primary`, `secondary`, `white`…) quand l'attribut les accepte, sinon le code hexadécimal **exact** de la palette.
- **Espacements de section** : une seule échelle (ex. `padding="60px"` pour une section standard, `padding="30px"` pour une section serrée), notée ici une fois choisie.
- **Titres de section** : toujours le même élément `[title]`, avec le même `style`.
- **Boutons** : principal en `color="primary"`, secondaire en `color="primary" style="outline"`. Aucune autre variante.
- **Bandeau de haut de page** : le même `[ux_banner]` (hauteur, superposition, alignement) sur toutes les pages d'un même type.

## 5. Gabarits de page (correspondance avec les commentaires `<!-- [BLOC] -->` de la rédaction)

| Bloc de la rédaction | Construction Flatsome |
|---|---|
| `[HERO]` | `[ux_banner]` + `[text_box]` (H1, sur-titre, bouton) ; image principale de la page |
| `[ESSENTIEL]` | `[section]` > `[row]` > 2 `[col]` avec des listes, ou des `[featured_box]` avec icônes du thème |
| `[SECTION]` | `[section]` > `[row]` > `[col]` texte + `[col]` `[ux_image]` (alternance gauche/droite) |
| `[CARTES]` | `[row]` de `[col]` contenant chacun un `[ux_image_box]` ou un `[ux_banner]` avec lien |
| `[TABLEAU]` | tableau HTML simple dans un `[ux_text]` ou un bloc texte ; mise en forme laissée au thème |
| `[PROGRAMME]` | `[row]` 2 colonnes (Matin / Après-midi), ou `[tabgroup]` |
| `[GALERIE]` | `[ux_gallery]` (ids des médias) |
| `[TEMOIGNAGES]` | Bloc UX réutilisable : `[testimonial]` × n |
| `[FAQ]` | `[accordion]` > `[accordion-item]` ; même texte que le JSON-LD `FAQPage` |
| `[CTA]` | Bloc UX réutilisable « Demander un devis » |
| `[FORMULAIRE]` | Bloc UX contenant le shortcode CF7 du formulaire de pré-réservation |

**Blocs UX à créer une seule fois** :
- CTA devis ;
- réassurance (4 arguments) ;
- témoignages ;
- formulaire de pré-réservation ;
- footer ;
- bandeau « Autres journées » par silo, si c'est pertinent.

## 6. Ordre de construction (résumé, détail dans le plan)

1. Fondations : réglages WordPress, extensions, thème enfant, permaliens `/blog/%postname%/`.
2. Système de design : options globales, header, menu, footer, puis validation du client sur une page témoin.
3. Médias : WebP, noms de fichiers et alt issus de `../seo/donnees/images-alt.csv`.
4. Blocs UX réutilisables et formulaires CF7.
5. Pages : d'abord 1 page modèle par type, validée par le client, puis la série complète.
6. SEO : Yoast (title, meta, robots), fil d'Ariane, redirections, `llms.txt`, `robots.txt`, données structurées.
7. Recette : crawl, liens, performances, mobile, repères `[…]` restants, accessibilité.

## 6 bis. État de la préprod (analyse publique, mise à jour le 30/10/2026)

- **WordPress 7.1.4**. Thème actif : **flatsome-child** (classes `wp-theme-flatsome wp-child-theme-flatsome-child`), parent Flatsome 3.20.12.
- **On travaille uniquement dans le thème enfant.** On ne modifie jamais le thème parent, et rien n'est ajouté au thème enfant sans validation.
- Le front répond (64 Ko de HTML), après correction côté client.
- **Extensions visibles depuis le front** (balises `generator`) :
  - Contact Form 7 ;
  - **Performance Lab 4.2.0** et ses modules : auto-sizes, dominant-color-images, embed-optimizer, image-prioritizer, performant-translations, nocache-bfcache, speculation-rules, view-transitions, **webp-uploads** ;
  - **Optimization Detective 1.0.0-beta7**.
- **Conséquence pour les médias** : le module **webp-uploads** (Modern Image Formats) convertit déjà les envois en WebP. Avant d'envoyer des images, il faut vérifier son réglage (sortie WebP ou AVIF, conservation ou non de l'original), pour ne pas convertir deux fois.
- Yoast SEO et Redirection ne sont **pas installés**.
- Contenu : page et article d'exemple de WordPress, aucun média.
- ✅ **API authentifiée opérationnelle** (vérifié le 30/10/2026) : `GET /wp/v2/users/me` renvoie l'utilisateur `noddl` (id 2), rôle **administrator**. Sans identifiants : 401, comme attendu. Remarque : `WP_URL` contient le domaine **sans** `https://`, il faut ajouter le schéma dans les scripts.

## 6 ter. Inventaire authentifié (lecture seule, 30/10/2026)

- **Extensions** : 13, **toutes actives**, aucune inactive.
  - Classic Editor 1.7.0 (*non visible depuis le front, découverte par l'API*) ;
  - Contact Form 7 6.2.4.1 (demande WP 7.1, PHP 8.3) ;
  - Performance Lab 4.2.0 et ses modules : Embed Optimizer 1.0.0-beta6, Enhanced Responsive Images (auto-sizes) 1.8.0, Image Placeholders (dominant-color-images) 1.3.0, Image Prioritizer 1.0.0-beta4, Instant Back/Forward (nocache-bfcache) 1.3.3, **Modern Image Formats (webp-uploads) 2.7.1**, Performant Translations 1.2.0, Speculative Loading 1.7.0, View Transitions 1.2.1 ;
  - Optimization Detective 1.0.0-beta7.
  - Yoast SEO et Redirection : toujours absents.
- **Thèmes** : `flatsome-child` 3.0, actif (parent `flatsome`) ; `flatsome` 3.20.12, inactif en tant que thème.
- **Réglages (`/wp/v2/settings`)** :
  - titre « core-flatsome », slogan vide ;
  - langue `fr_FR`, fuseau `Europe/Paris`, format de date `j F Y`, format d'heure `G\hi`, semaine commençant le lundi ;
  - page d'accueil = **derniers articles** (`show_on_front: posts`, aucune page d'accueil ni page des articles définie) ;
  - 10 articles par page ; commentaires et pings ouverts par défaut ;
  - pas de logo ni d'icône de site ;
  - e-mail d'administration : `contact@otkudesign.fr` (⚠️ « otkudesign » : faute de frappe probable pour « otakudesign », à signaler au client) ;
  - Speculative Loading : `prerender`, `moderate`, visiteurs non connectés ; View Transitions : réglage vide (défauts).
- **Non exposé par l'API REST**, donc à vérifier dans l'admin :
  - réglages de Modern Image Formats (WebP ou AVIF, conservation de l'original) : *Réglages > Médias* ;
  - **permaliens** : actuellement datés (`/2026/10/30/bonjour-tout-le-monde/`), à passer en `/blog/%postname%/` (*Réglages > Permaliens*) ;
  - theme mods Flatsome (passer par l'export *Flatsome > Avancé > Backup and Import*).
- **Contenu** :
  - 3 pages : « accueil » (id 8, brouillon, vide, aucun modèle), « Politique de confidentialité » (id 3, brouillon), « Page d'exemple » (id 2, publiée) ;
  - 1 article (« Bonjour tout le monde ») ; 1 catégorie ; 0 média ; 0 menu ; 0 Bloc UX ; 0 bloc réutilisable WP ;
  - 1 formulaire CF7 (id 5, « Formulaire de contact 1 ») ;
  - 2 utilisateurs, tous deux administrateurs : `agenceotaku` (id 1) et `noddl` (id 2).
- **Espaces de noms REST** : `wp/v2`, `contact-form-7/v1`, `performance-lab/v1`, `optimization-detective/v1`, `wp-site-health/v1`, `wp-block-editor/v1`, `wp-abilities/v1`, `oembed/1.0`. L'API **CF7 est disponible**.
- **Base REST des Blocs UX** : le type `blocks` est servi sous **`/wp/v2/ux-blocks`** (pas `/wp/v2/blocks`, qui correspond aux blocs réutilisables de WordPress).
- **Emplacements de menu** du thème : `primary`, `primary_mobile`, `secondary`, `footer`, `top_bar_nav`, `my_account`, `vertical`.

## 7. Points ouverts

- **Méta Yoast** : on les saisit à la main (34 pages), ou bien on ajoute temporairement un petit code PHP (pas de CSS) dans le thème enfant pour les rendre modifiables par l'API REST ? → à décider avec le client.
- **Données structurées JSON-LD** (cf. `../seo/04-geo-ia.md`) : elles demandent du PHP dans le thème enfant ou une extension → à décider.
- **Identité visuelle** : garder le vert `#a9c810`, le rouge `#e54b4b` et Montserrat du site actuel, ou les faire évoluer ?

## 8. Journal des décisions

| Date | Décision |
|---|---|
| 30/10/2026 | Pas de CSS perso ; uniquement des choses vérifiées ; cohérence de design entre les pages (directives du client). |
| 30/10/2026 | Flatsome 3.20.12 analysé ; référence extraite dans `reference-flatsome/`. |
| 30/10/2026 | **Périmètre : uniquement la page d'accueil pour l'instant.** Le design est fourni par le designer du client ; on s'y adapte exactement, avec les options Flatsome uniquement. Le § 4 (système de design) sera rempli à partir de sa maquette. |
| 30/10/2026 | Title, meta et données structurées : reportés après l'intégration et le design. |
| 30/10/2026 | Extensions : analyser l'existant sur la préprod **avant toute installation ou modification**. |
| 30/10/2026 | Photos : celles récupérées de l'ancien site (`../contenu/images/`, à retélécharger avec `../telecharger-images.sh`), renommées et converties en WebP selon `../seo/donnees/images-alt.csv`. |
