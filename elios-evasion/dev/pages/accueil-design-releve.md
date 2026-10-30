# Accueil : relevé du design de la maquette et correspondance Flatsome

> Étapes 3 et 4 du brief `../01-brief-accueil-depuis-maquette.md`. **Document à valider par le client avant toute modification de la préprod.**
> Rien n'a été modifié sur la préprod pour produire ce relevé.

## 0. La maquette reçue

- Fichier : `Adventure_Tour.pdf` (export Figma du 30/10/2026, 5 pages de 1280 px de large). **Fichier du client, non commité.**
- Il s'agit d'un **modèle de site de voyage, « Trekova »**, avec des textes anglais factices et des images remplacées par des damiers gris :
  - page 1 : **Accueil** (1280 × 7545 px) → c'est la seule page utilisée ici ;
  - pages 2 à 5 : About, Adventures, fiche Expédition, Destinations. Elles serviront pour les autres gabarits plus tard.
- **Méthode de mesure** : rendu à 72 dpi (1 pt = 1 px) et échantillonnage des pixels.
  - Les couleurs sont **exactes**.
  - Les tailles de police sont **déduites** de la hauteur des capitales et de l'interligne (environ ±2 px).
  - Les polices sont **vectorisées** dans le PDF (glyphes Type 3 « FigmaGlyphs ») : **leur nom n'est pas récupérable** (voir la question Q2).
- Aucune version mobile dans la maquette, aucune animation indiquée (fichier statique), en dehors des flèches du carrousel de témoignages.

## 1. Système de design relevé

### 1.1 Palette (valeurs exactes, échantillonnées)

| Rôle dans la maquette | Couleur |
|---|---|
| Titres, gros textes, boutons pleins, liens soulignés | `#000000` |
| Texte courant, sur-titres, légendes | `#444748` |
| Texte secondaire (copyright, sous-titre du hero) | `#656565` / `#646464` |
| Fond de section grise, fond de la pilule de navigation | `#EEEEEE` |
| Fond du footer | `#F9F9F9` |
| Filets (séparateurs) | `#E2E2E2` |
| Fond de page, texte sur photo, bouton du hero | `#FFFFFF` |

⚠️ **La maquette est entièrement monochrome.** On n'y trouve ni le vert `#a9c810` ni le rouge `#e54b4b` du site actuel (voir Q1).

### 1.2 Typographie

- **Une seule famille**, une grotesque (sans empattement, de type néo-grotesque) pour tout le site. Le nom est à demander au designer (Q2).
- **Graisses observées** : fine (light) pour le H1 et le logo ; normale (regular) pour les titres et les textes ; moyenne (medium) pour les petites capitales espacées.

| Élément de la maquette | Taille ≈ | Interligne ≈ | Remarque |
|---|---|---|---|
| H1 du hero (3 lignes) | **80 px** | 88 px (1,1) | blanc, light |
| Grand paragraphe d'accroche (section « About ») | **48 px** | 57 px (1,2) | noir |
| Grande citation centrée (bande grise) | ≈ 72 px | 88 px | noir |
| Titre des offres (« The Arctic Silence ») et du CTA | **48 px** | 57 px | noir / blanc |
| H2 de section (« Wild places… »), titres de cartes, chiffres clés, témoignage | **32 px** | 41-42 px (1,3) | |
| Logo texte du footer | ≈ 48 px | — | light |
| Sous-titre du hero | 18 px | 28 px | |
| Texte courant | **16 px** | 26 px (1,6) | `#444748` |
| Sur-titres « [ABOUT TREKOVA] », méta « 12 DAYS \| CHALLENGING », légendes, boutons, menu | **12 px** | — | **capitales, lettres espacées**, medium |

### 1.3 Mise en page

| Élément | Valeur relevée |
|---|---|
| Largeur de la maquette | 1280 px |
| Marges latérales | 64 px → **largeur de contenu 1152 px** |
| Grille | 3 colonnes égales (gouttière d'environ 32 px) ; la section « About » est en 1/3 (sur-titre) + 2/3 (texte) |
| Espacement vertical entre sections | ≈ **128 px** (le même partout) ; bande grise : environ 128 px de marge interne en haut et en bas |
| Arrondi des cartes, des images et du bandeau CTA | ≈ **16 px** (à confirmer : la mesure est difficile sur les damiers) |
| Arrondi des boutons | **pilule** (complètement arrondi) |
| Hauteur des boutons | 40 à 44 px |

### 1.4 Boutons et liens (3 variantes dans la maquette)

1. **Plein noir**, texte blanc en capitales espacées : « INQUIRE » dans le menu, « START YOUR JOURNEY » dans le CTA.
2. **Plein blanc**, texte noir, avec une flèche → : « BOOK AN ADVENTURE », sur la photo du hero.
3. **Lien texte souligné** en capitales, avec une flèche → : « VIEW JOURNEY ».

### 1.5 Header

- **Transparent**, posé sur la photo du hero.
- Logo texte blanc à gauche (light, environ 32 px).
- À droite, le menu est dans une **pilule blanche translucide** (fond `#EEEEEE` légèrement transparent, avec une ombre) :
  - liens en capitales de 12 px, lettres espacées ;
  - l'élément actif est **souligné** ;
  - le dernier élément est un **bouton noir** (« INQUIRE »).
- Hauteur du header : environ 120 px (pilule de 60 px, à 30 px du haut).
- Collant ou non au défilement : **non indiqué** (Q6).

### 1.6 Footer

- Fond `#F9F9F9`, marge interne d'environ 120 px.
- **À gauche** : logo texte (environ 48 px), présentation en 2 lignes, puis copyright en capitales espacées `#646464`.
- **À droite** : 3 colonnes (« Visit », « Social », « Legal »), avec un titre en petites capitales gras et des liens noirs de 14-15 px.

## 2. Les sections de la maquette, dans l'ordre, et le texte qui va dedans

| # | Maquette (rendu) | Texte de `accueil.md` proposé | Écart à signaler |
|---|---|---|---|
| 1 | **Hero** plein écran (≈ 800 px) : photo, H1 de 80 px sur 3 lignes à gauche, sous-titre, bouton blanc en pilule. À droite : 3 icônes rondes (partager, aimer, enregistrer) et « EXPLORE MORE ↓ » | `[HERO]` : H1, sur-titre, bouton « Demander un devis » → `/contact/`, lien « Voir nos séminaires » → `/sejours/`. Photo : `pirogue-tahitienne-team-building-palavas.webp` | Notre hero a **2 boutons** et un sur-titre, la maquette 1 bouton et pas de sur-titre. Les **3 icônes sociales** n'ont pas de contenu chez nous : retirées (Q4). Pour « EXPLORE MORE ↓ » : élément `[scroll_to]` ou rien (Q4) |
| 2 | **About** : sur-titre « [ABOUT …] » à gauche, gros paragraphe de 48 px à droite (2/3), filet, puis **3 chiffres clés** (32 px) avec leur légende | Sur-titre (à fournir, voir Q3) + paragraphe d'intro « Elios Evasion est une agence de team building… ». À la place des chiffres : les **3 puces** (« Un seul interlocuteur », « Travail et cohésion le même jour », « Des lieux qui changent du bureau ») | Nos chiffres sont `[PROVISOIRE]`, sauf « 7 lieux partenaires » : on ne peut **pas publier 3 chiffres** (Q5). Le paragraphe d'intro est long (≈ 60 mots) pour une taille de 48 px |
| 3 | **Destinations** : sur-titre, H2 de 32 px et chapô sur 3 colonnes ; **1 grande carte** sur toute la largeur, puis **2 demi-cartes** (photo arrondie, dégradé sombre en bas, titre blanc et lieu en capitales) | `[CARTES]` « Trois destinations… » : H2 + chapô ; grande carte Montpellier (`team-building-paddle-geant-equipe.webp`), demi-cartes Avignon (`chateau-fines-roches-vignes-crepuscule.webp`) et Pyrénées (`seminaire-ski-groupe-entreprise-neige.webp`). Paragraphe « Vous hésitez… » sous les cartes | Les cartes de la maquette n'ont qu'un titre et un lieu ; les nôtres ont 2 lignes et un **lien SEO dans le texte**. Proposition : carte = H3 + lieu, la carte entière est un lien vers la page du silo, et les 2 lignes sont gardées sous la carte, avec leur lien (Q7) |
| 4 | **Featured journeys** : sur-titre, puis 3 rangées **en alternance** (image arrondie de 671 px / texte) : méta en capitales, titre de 48 px, texte, lien « VIEW JOURNEY → » | `[CARTES]` « Nos offres coup de cœur » : la méta reçoit le badge prix (« DÈS 100 € HT/PERS. »…), puis H3, texte et lien. Photos : `grotte-clamouse-parcours-aventure-tyrolienne.webp`, `vigne-galets-roules-chateauneuf-du-pape.webp`, `ski-de-randonnee-sommet-enneige.webp` | Correspondance très bonne. Photo 3 : `[PHOTO À FOURNIR]` dans la rédaction, donc on prend la photo de repli prévue |
| 5 | **Bande grise** `#EEEEEE` : grande citation centrée (72 px), puis **3 colonnes** (sur-titre, filet, texte de 16 px) | « Comment se passe l'organisation… » : le H2 à la place de la citation, puis les **4 étapes** dans les colonnes | La maquette a **3 colonnes**, nous avons **4 étapes** : 4 colonnes de 1/4 (Q8). L'étape 2 est publiée **sans** le délai `[À CONFIRMER]` |
| 6 | **Témoignage** centré : icône guillemets, citation de 32 px, nom et voyage en capitales, flèches ← → (carrousel) | **Les 3 vrais témoignages** de l'ancien site (Céline A., Samantha C., Mathieu M., repris dans `../redaction/pyrenees/sejour-team-building-pyrenees.md`). H2 « Ce qu'en disent nos clients » | Les 3 témoignages de `accueil.md` sont `[PROVISOIRE]` : interdits en ligne. Le H2 n'existe pas dans la maquette : on le garde (SEO) ou on le masque (Q9) |
| 7 | **CTA** : bandeau photo arrondi dans le conteneur, titre blanc de 48 px centré, bouton noir en pilule | `[CTA]` « Parlons de votre prochain séminaire » + texte + 2 boutons (« Demander un devis », « Appeler le 06 79 02 93 32 »). Photo : `kayak-paddle-etang-palavas-coucher-soleil.webp` | La maquette n'a **ni texte ni second bouton** (Q10). À construire comme Bloc UX réutilisable |
| 8 | **Footer** (voir § 1.6) | Textes de `footer-et-menu.md` § 3 | Maquette : 3 colonnes (Visit / Social / Legal) ; notre rédaction en a 3 autres (Présentation-coordonnées / Destinations / Ressources). Adresse, e-mail et URL des réseaux sont `[À FOURNIR]` (Q11) |

**Sections de `accueil.md` absentes de la maquette** (le client tranche entre les ajouter dans le style de la maquette ou les retirer, Q12) :
- « **Pourquoi confier votre séminaire à une agence locale** » (texte + photo `olympiades-entreprise-plage-groupe.webp`). Proposition : une 4ᵉ rangée dans le style « Featured journeys » (image arrondie / texte), ou le style « About » (sur-titre + texte).
- « **Questions fréquentes** » (3 questions publiables sur 5). Proposition : un accordéon sobre, après le témoignage, dans le style typographique de la page.
- « **Elios Evasion en quelques chiffres** » : un seul chiffre réel, donc **non publiée** (Q5).

## 3. Correspondance avec les options Flatsome

Légende : ✅ = option ou attribut **vérifié** dans `../reference-flatsome/` · 🔶 = vérifié, mais le rendu exact est **à contrôler sur un brouillon** · ❌ = **impossible sans CSS perso** (on propose alors l'option native la plus proche ; aucun contournement).

### 3.1 Options globales (theme mods, Customizer)

| Élément de la maquette | Clé Flatsome | Valeur proposée | Statut |
|---|---|---|---|
| Couleur principale (boutons pleins) | `color_primary` | `#000000` (si Q1 = monochrome) | ✅ |
| Couleur secondaire | `color_secondary` | `#444748`, ou une couleur de marque selon Q1 | ✅ |
| Succès / alerte | `color_success` / `color_alert` | inchangés (pas utilisés dans la maquette) | ✅ |
| Texte courant | `color_texts` | `#444748` | ✅ |
| Titres | `type_headings_color` | `#000000` | ✅ |
| Liens / survol | `color_links` / `color_links_hover` | `#000000` / `#444748` | ✅ |
| Filets | `color_divider` | `#E2E2E2` | ✅ |
| Fond de page | `body_bg` | `#FFFFFF` | ✅ |
| Police des titres | `type_headings` (typographie Kirki : famille et graisse) | police du designer (Q2), en regular | 🔶 (le format du tableau de valeurs est à relever dans un export Backup existant) |
| Police du texte | `type_texts` | même famille, regular | 🔶 |
| Police du menu | `type_nav` | même famille, medium | 🔶 |
| Police alternative (`.alt-font`) | `type_alt` | même famille, light (pour le H1 ?) | 🔶 |
| Taille de base | `type_size` / `type_size_mobile` | **100** (= 16 px) | ✅ |
| Largeur du contenu | `site_width` | **1152** | ✅ |
| Arrondi des boutons | `button_radius` | `99px` (pilule) | ✅ |
| Capitales sur les boutons, le menu et les titres de section | `text_transform_buttons`, `text_transform_navigation`, `text_transform_section_titles`, `nav_uppercase` | capitales | 🔶 (les valeurs acceptées par ces options sont à lire dans le source) |
| Header : hauteur | `header_height`, `header_height_transparent` | 120 | ✅ |
| Header transparent : fond | `header_bg_transparent` | vide (transparent) | ✅ |
| Header : texte clair sur la photo | `header_color` | `light` | 🔶 (valeur à vérifier) |
| Header : pas de filet ni d'ombre | `header_divider` = 0, `box_shadow_header` = 0 | | ✅ |
| Header : largeur | `header_width` | `container` (défaut) | ✅ |
| Barre du haut | `topbar_show` | 0 (absente de la maquette) | ✅ |
| Style de navigation (soulignement de l'élément actif) | `nav_style` | style « ligne » le plus proche | 🔶 (les choix ne sont pas listés dans la référence) |
| Couleur du menu | `type_nav_color` / `type_nav_color_hover` | blanc sur la photo ; noir une fois collant | ✅ |
| Logo | `site_logo` (+ `site_logo_dark`, `logo_width`) | logo Elios en blanc (le logo texte « Trekova » est une simple illustration) | ✅ |
| Header collant | `header_sticky`, `header_height_sticky`, `sticky_style` | selon Q6 | ✅ |
| Footer | `footer_block` | Bloc UX « Footer » | ✅ |

### 3.2 Construction des sections (shortcodes UX Builder)

| # | Section | Éléments et attributs | Statut |
|---|---|---|---|
| 1 | Hero | `[ux_banner height="800px" bg="…" bg_overlay="rgba(0,0,0,0.35)"]` > `[text_box width="50" position_x="5" text_align="left" text_color="light" scale="…"]` (H1 agrandi via `scale`) > `[button color="white" radius="99"]` | ✅ / 🔶 (la taille de 80 px s'obtient par `scale`, à régler sur le brouillon) |
| 2 | About | `[section padding="128px"]` > `[row]` > `[col span="4"]` sur-titre + `[col span="8"]` `[ux_text font_size="…" line_height="…"]` ; `[divider]` ; `[row]` de 3 `[col span="4"]` | ✅ / 🔶 (l'unité de `font_size` de `[ux_text]` est à vérifier sur le brouillon) |
| 3 | Destinations | `[ux_banner height="…" bg="…" link="…" border_radius="…" text_pos="bottom" text_align="left"]` × 3 (1 en `span="12"`, 2 en `span="6"`) | 🔶 (on ne sait pas si `border_radius` arrondit la photo elle-même ou seulement la bordure décorative : test sur brouillon) |
| 4 | Offres coup de cœur | `[row v_align="middle"]` > `[col span="7"]` image + `[col span="5"]` texte, colonnes inversées une rangée sur deux ; image arrondie par `[ux_image_box image_radius="…"]` ou par le `bg_radius` d'une colonne | ✅ / 🔶 (`[ux_image]` n'a **pas** d'attribut d'arrondi) |
| 5 | Bande grise | `[section bg_color="#EEEEEE" padding="128px"]` > `[title]` centré, puis `[row]` de 4 `[col span="3"]` (sur-titre, `[divider]`, texte) | ✅ |
| 6 | Témoignages (Bloc UX) | `[ux_slider nav_style="circle" bullets="false"]` > 3 × `[testimonial text_align="center" stars="0"]` | 🔶 (masquage des étoiles avec `stars="0"` : à vérifier) |
| 7 | CTA (Bloc UX) | `[ux_banner height="500px" bg="…" bg_overlay="…" border_radius="…"]` dans le conteneur > `[text_box]` > `[button color="primary" radius="99"]` | 🔶 (même réserve sur `border_radius`) |
| 8 | Footer (Bloc UX) | `[section bg_color="#F9F9F9" padding="120px"]` > `[row]` > `[col span="5"]` + 3 `[col]` | ✅ |
| — | FAQ (si elle est gardée) | `[accordion faq_schema="true"]` > `[accordion-item title="…"]` | ✅ |
| — | Page | modèle **« Page - Full Width » (`page-blank.php`)**, **page brouillon existante id 8** (« accueil ») | ✅ (le modèle de page « transparent header » est à vérifier : voir § 3.3) |

### 3.3 Ce qui est impossible sans CSS perso (❌) et l'option native proposée

| Rendu de la maquette | Pourquoi c'est bloqué | Option native la plus proche |
|---|---|---|
| **Menu dans une pilule blanche translucide** (effet verre dépoli, ombre) | Aucune option de fond ni d'arrondi propre au menu | Header transparent, menu en texte blanc, sans pilule ; ou un header blanc plein (`header_bg`), sans arrondi |
| **Lettres espacées** des sur-titres, menus et boutons | Aucune option ni attribut de `letter-spacing` dans la référence | Capitales sans espacement supplémentaire (`letter_case` de `[title]`, options `text_transform_*`) |
| **Tailles exactes des titres** (H1 80 px, 48 px, 32 px) **définies une fois pour toutes** | Flatsome n'a pas de réglage de taille par niveau de titre ; seule la taille de base (`type_size`) est globale | Taille réglée **élément par élément** (`[title size]`, `[ux_text font_size]`, `[text_box scale]`), en appliquant toujours **les mêmes valeurs**, notées au § 4 des consignes |
| **Dégradé sombre** en bas des cartes destinations | `bg_overlay` n'accepte qu'une couleur unie (rgba) | Voile sombre uni et léger sur toute la carte |
| **Bouton lien souligné avec flèche** (« VIEW JOURNEY → ») | Le style souligné n'est pas vérifié dans la référence ; la directive 3 (§ 4 des consignes) n'autorise que plein et contour | `[button style="outline" icon="…" icon_pos="right"]`, ou le style `link` s'il est vérifié dans le source |
| **Icônes rondes partager / aimer / enregistrer** du hero | Pas de contenu ni de fonction derrière | Retirées (Q4) |
| **Guillemets « 99 » en gris** au-dessus du témoignage | Pas d'icône guillemet vérifiée dans la référence | Rien, ou les guillemets typographiques dans le texte |

**Également à vérifier dans le source du thème** (il faut redonner le zip Flatsome dans la session) :
- les valeurs possibles de `nav_style`, `header_color` et `text_transform_*` ;
- l'existence d'un modèle de page « header transparent » (l'API REST n'expose pas la liste des modèles de page) ;
- la structure de la valeur `type_headings` ;
- l'effet de `border_radius` sur `[ux_banner]`.

## 4. Questions au client (à valider avant toute modification de la préprod)

1. **Q1, couleurs.** La maquette est **noir, blanc et gris**. Est-ce la direction voulue (le site devient monochrome), ou une maquette de structure où il faut réinjecter le vert `#a9c810` (et le rouge `#e54b4b`) d'Elios, par exemple sur les boutons ?
2. **Q2, police.** Quel est le **nom exact de la police** utilisée par le designer (et ses graisses) ? Elle est vectorisée dans le PDF. Si elle n'est pas dans Google Fonts, Flatsome ne permet pas d'envoyer une police par ses options : on choisira alors la police Google la plus proche, avec votre accord.
3. **Q3, sur-titres.** La maquette met un sur-titre entre crochets au-dessus de chaque section (« [ABOUT TREKOVA] »…). Nos textes n'en ont pas, à part celui du hero. On les ajoute (il faut alors les rédiger) ou on les supprime ?
4. **Q4, hero.** On retire les 3 icônes partager / aimer / enregistrer ? On garde « Défiler ↓ » ? On garde le second lien « Voir nos séminaires » ?
5. **Q5, chiffres clés.** Seul « 7 lieux partenaires » est réel. On remplace la rangée de chiffres par les 3 puces (« Un seul interlocuteur »…), ou vous fournissez 2 autres chiffres vérifiés ?
6. **Q6, header.** Collant au défilement ou non ? Le menu dans une pilule translucide est impossible sans CSS : on part sur un menu blanc posé sur la photo, sans pilule ?
7. **Q7, cartes destinations.** On accepte la carte avec titre + lieu, et le texte de 2 lignes (avec son lien) **sous** la carte ?
8. **Q8, étapes.** 4 colonnes pour nos 4 étapes, au lieu des 3 de la maquette ?
9. **Q9, témoignages.** On utilise les 3 vrais avis de l'ancien site (Céline A., Samantha C., Mathieu M.) ?
10. **Q10, CTA.** On garde notre texte et le second bouton « Appeler », même si la maquette n'en montre pas ?
11. **Q11, footer.** Quelles colonnes : celles de la maquette (Adresse / Réseaux / Légal) ou celles de la rédaction (Présentation et coordonnées / Destinations / Ressources) ? Adresse, e-mail et URL des réseaux sont à fournir.
12. **Q12, sections hors maquette.** « Pourquoi une agence locale » et la FAQ : on les ajoute (dans quel style ?) ou on les retire de l'accueil ?
13. **Q13, mobile.** La maquette n'a pas de version mobile : on laisse Flatsome empiler les colonnes (comportement natif) ?
14. **Q14, médias.** Pouvez-vous nous transmettre le réglage de *Réglages > Médias > Modern Image Formats* (WebP ou AVIF, original conservé ou non) ?

## 5. Suite (après validation)

On réutilise la **page brouillon « accueil » (id 8)** existante. On ne crée pas de nouvelle page.

Étapes 5 à 11 du brief :
- texte d'import des options globales, après sauvegarde de l'export actuel par le client ;
- envoi des 8 photos en WebP ;
- Blocs UX (témoignages, CTA, footer) ;
- contenu de la page id 8 ;
- captures à 1440 px et à 390 px, puis comparaison avec la maquette.
