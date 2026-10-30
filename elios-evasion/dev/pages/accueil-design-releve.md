# Accueil : relevé du design de la maquette et correspondance Flatsome

> Étapes 3 et 4 du brief `../01-brief-accueil-depuis-maquette.md`.
> **Version 2 (30/10/2026)** : elle intègre les réponses du client et la vérification dans le code source de Flatsome 3.20.12 (zip fourni par le client, extrait hors du dépôt, non commité).
> Rien n'a encore été modifié sur la préprod.

## 0. Sources reçues

- **`Adventure_Tour.pdf`** : export Figma de 5 pages, 1280 px de large, avec des damiers à la place des images. Il a servi aux mesures.
- **`Adventure_Tour.zip`** : les mêmes 5 pages en PNG (695 px de large), **avec les photos**. Il confirme les voiles sombres sur les photos et le rendu général.
- Le modèle s'appelle « Trekova » : un site de voyage avec des textes anglais factices. Seule la page **Homepage** est utilisée ici ; About, Adventures, Expeditions et Destinations serviront aux autres gabarits.
- **Mesures** :
  - couleurs exactes (échantillonnage des pixels) ;
  - tailles déduites de la hauteur des capitales et de l'interligne (environ ±2 px) ;
  - polices vectorisées dans le PDF.
- Fichiers du client : **non commités**.

## 1. Décisions du client (30/10/2026)

| Sujet | Décision |
|---|---|
| Couleurs | **Monochrome de la maquette pour l'instant.** La charte Elios (vert `#a9c810`…) sera appliquée plus tard : il suffira de changer `color_primary` et les couleurs associées, sans toucher aux pages. |
| Police | **Geist** (celle du modèle). ✅ Elle est présente dans la liste Google Fonts de Flatsome (`inc/admin/kirki/modules/webfonts/webfonts.json`), graisses 100 à 900. |
| Sections de `accueil.md` absentes de la maquette | **Ajoutées dans le style de la maquette** (§ 3, sections 7 et 8). |
| Sur-titres | **Rédigés**, puis ajoutés en commentaires dans `../../redaction/transverse/accueil.md`, qui reste la seule source des textes (§ 4). |
| Footer | **Un mélange** de la maquette et de la rédaction (§ 5). |

**Choix retenus par défaut** pour les questions restées sans réponse, modifiables à la validation du brouillon :
- **Hero** : on retire les 3 icônes partager / aimer / enregistrer, ainsi que « Explore more ». On garde le bouton « Demander un devis » et le second lien « Voir nos séminaires » (en lien souligné).
- **Chiffres clés** : seul « 7 lieux partenaires » est réel, donc les 3 puces (« Un seul interlocuteur »…) prennent la place des chiffres, dans le même style.
- **Étapes** : 4 colonnes au lieu de 3.
- **Témoignages** : les 3 vrais avis de l'ancien site.
- **CTA** : notre texte et nos 2 boutons.
- **Header** : collant au défilement. Il devient blanc avec le texte noir une fois collant.
- **Mobile** : Flatsome empile les colonnes (comportement natif).

## 2. Système de design

### 2.1 Palette (provisoire, monochrome)

| Rôle | Couleur | Clé Flatsome |
|---|---|---|
| Titres, gros textes, boutons pleins, liens | `#000000` | `color_primary`, `type_headings_color`, `color_links` |
| Texte courant, sur-titres | `#444748` | `color_texts`, `color_secondary`, `color_links_hover` |
| Texte secondaire (copyright, sous-titres) | `#656565` | — (pas de clé : le texte prend `color_texts`) |
| Fond de la bande grise | `#EEEEEE` | attribut `bg_color` de `[section]` |
| Fond du footer | `#F9F9F9` | attribut `bg_color` de la section du Bloc UX « Footer » |
| Filets | `#E2E2E2` | `color_divider`, attribut `color` de `[divider]` |
| Fond de page | `#FFFFFF` | `body_bg` |

### 2.2 Typographie : Geist

| Usage | Clé | Valeur (format vérifié : `array('font-family' => …, 'variant' => …)`) |
|---|---|---|
| Titres H1 à H6 | `type_headings` | Geist, `regular` |
| Texte courant | `type_texts` | Geist, `regular` |
| Menu | `type_nav` | Geist, `500` |
| Police alternative (`.alt-font`, pour le H1 fin du hero) | `type_alt` | Geist, `300` |
| Taille de base | `type_size` / `type_size_mobile` | 100 (16 px) |

**Échelle des tailles**, appliquée élément par élément, toujours avec ces valeurs. ✅ Vérifié : `font_size` de `[ux_text]` est en **rem**.

| Rôle | Maquette | Réglage |
|---|---|---|
| H1 du hero | 80 px, light | `[ux_text font_size="5" line_height="1.1"]` |
| Grand texte (intro, citation de la bande grise) | 48 px | `font_size="3" line_height="1.2"` |
| Titres des offres et de la section « Pourquoi », titre du CTA | 48 px | `font_size="3" line_height="1.2"` |
| H2 de section, titres des cartes, puces, témoignage | 32 px | `font_size="2" line_height="1.3"` |
| Texte courant | 16 px / 1,6 | valeur par défaut du thème |
| Sur-titres, méta des offres, légendes | 12 px, capitales | `font_size="0.75"` et texte en capitales |

### 2.3 Mise en page et composants

| Élément | Maquette | Réglage Flatsome | Statut |
|---|---|---|---|
| Largeur du contenu | 1152 px (marges de 64 px) | `site_width` = 1152 | ✅ |
| Espacement entre sections | ≈ 128 px | `[section padding="128px"]`, 64 px sur mobile (`padding__sm`) | ✅ |
| Boutons | pilule | `button_radius` = `99px` | ✅ |
| Capitales des boutons et du menu | oui | `text_transform_buttons` = `''` (UPPERCASE), `text_transform_navigation` = `''`, `nav_uppercase` = 1 | ✅ |
| Bouton plein noir | « INQUIRE », « START YOUR JOURNEY » | `[button color="primary"]` | ✅ |
| Bouton blanc sur photo | « BOOK AN ADVENTURE → » | `[button color="white" icon="icon-angle-right" icon_pos="right"]` | ✅ (`white` fait partie des couleurs du bouton) |
| Lien souligné avec flèche | « VIEW JOURNEY → » | `[button style="underline" color="primary" icon="icon-angle-right" icon_pos="right"]` | ✅ (le style `underline` existe : `inc/builder/shortcodes/button.php`) |

⚠️ **Conséquence sur les consignes** : le § 4 n'autorisait que « plein » et « contour ». La maquette, qui fait foi pour le design, impose 3 variantes : plein, blanc sur photo, lien souligné. Le contour n'est pas utilisé. Le § 4 des consignes est mis à jour en ce sens.

### 2.4 Header

| Élément | Réglage | Statut |
|---|---|---|
| Header transparent sur la photo, texte clair | modèle de page **« Page - Full Width - Transparent Header - Light Text »** (`page-transparent-header-light.php`), à la place de `page-blank.php` | ✅ (fichier du thème) |
| Hauteur | `header_height` = 120, `header_height_transparent` = 120, `header_height_sticky` = 70 | ✅ |
| Fond une fois collant | `header_bg` = `#FFFFFF`, texte foncé : `header_color` = `light` (⚠️ dans Flatsome, `light` = **texte foncé** et `dark` = texte clair) | ✅ |
| Fond transparent | `header_bg_transparent` vide, `header_bg_transparent_shade` = 0 | ✅ |
| Pas de filet ni d'ombre | `header_divider` = 0, `box_shadow_header` = 0 | ✅ |
| Élément actif souligné | `nav_style` = `line-bottom` (choix vérifiés : `''`, `divided`, `line`, `line-grow`, `line-bottom`, `box`, `outline`, `pills`, `tabs`) | ✅ |
| Taille du menu | `nav_size` = `small` (choix : `xsmall`, `small`, `''`, `medium`, `large`, `xlarge`) | ✅ |
| Bouton « Demander un devis » à droite | `header_button_1` = « Demander un devis », `header_button_1_link` = `/contact/`, `header_button_1_radius` = `99px`, `header_button_1_color` = `primary` ; élément placé dans `header_elements_right` | ✅ (le format de `header_elements_right` est à reprendre de l'export Backup existant) |
| Barre du haut | `topbar_show` = 0 | ✅ |
| Collant | `header_sticky` = 1, `sticky_style` = `jump` (défaut) | ✅ |

### 2.5 Ce qui reste impossible sans CSS perso

| Rendu de la maquette | Option native retenue |
|---|---|
| Menu dans une **pilule blanche translucide** | Menu en texte blanc directement sur la photo, sans pilule |
| **Lettres espacées** des capitales (aucun `letter-spacing` dans les options ni dans les shortcodes) | Capitales sans espacement supplémentaire |
| **Dégradé** sombre en bas des cartes (`bg_overlay` n'accepte qu'une couleur unie) | Voile uni `rgba(0,0,0,0.3)` sur toute la carte (à doser sur le brouillon) |
| **Coins arrondis des photos** : `border_radius` de `[ux_banner]` n'arrondit que la bordure décorative (`inc/shortcodes/commons/border.php`), pas la photo | 1ᵉʳ essai : `bg_radius="16"` sur la `[col]` qui contient le bandeau (en px, appliqué à `.col-inner`). Si la photo dépasse des coins, 2ᵉ essai : `[ux_image_box image_radius]` (en **%**, donc légèrement elliptique). Sinon, coins droits. |
| **Guillemets « 99 »** gris au-dessus du témoignage | Rien (les guillemets sont dans le texte) |

## 3. Les sections, dans l'ordre (maquette + sections ajoutées)

| # | Section | Construction | Texte (`accueil.md`) |
|---|---|---|---|
| 1 | **Hero** (≈ 800 px) | `[ux_banner height="800px" bg="(pirogue)" bg_overlay="rgba(0,0,0,0.3)"]` > `[text_box width="55" position_x="5" text_align="left"]` : sur-titre, H1 (`font_size="5"`, `type_alt`), intro courte, bouton blanc + lien souligné | Sur-titre du hero ; H1 ; boutons « Demander un devis » → `/contact/` et « Voir nos séminaires » → `/sejours/` |
| 2 | **L'agence** : sur-titre à gauche (1/3), grand texte à droite (2/3), filet, rangée de 3 colonnes | `[section padding="128px"]` > `[row]` `[col span="4"]` + `[col span="8"]` `[ux_text font_size="3"]` ; `[divider]` ; `[row]` 3 × `[col span="4"]` (gras de 32 px + 1 ligne) | « [L'AGENCE] » ; paragraphe d'intro ; les 3 puces |
| 3 | **Destinations** : sur-titre, H2, chapô sur 3 colonnes ; 1 grande carte et 2 demi-cartes | `[row]` 3 colonnes de 1/3 ; `[col span="12" bg_radius="16"]` `[ux_banner height="460px" link=… text_pos="bottom" text_align="left"]` ; 2 × `[col span="6"]` (`height="400px"`) ; sous chaque carte, les 2 lignes avec le lien SEO ; puis le paragraphe « Vous hésitez… » | « [NOS DESTINATIONS] » ; H2 et chapô ; 3 × (H3, ligne de lieu, 2 lignes) |
| 4 | **Coups de cœur** : 3 rangées en alternance | `[row v_align="middle"]` > `[col span="7" bg_radius="16"]` image + `[col span="5"]` : méta de 12 px, H3 de 48 px, texte, lien souligné ; colonnes inversées une rangée sur deux | « [COUPS DE CŒUR] » ; H2 « Nos offres coup de cœur » (en sur-titre de section) ; 3 offres (badge prix dans la méta) |
| 5 | **Bande grise** `#EEEEEE` : grand titre centré, puis colonnes avec filet | `[section bg_color="#EEEEEE" padding="128px"]` > H2 centré (`font_size="3"`) ; `[row]` 4 × `[col span="3"]` : intitulé, `[divider]`, texte | « [NOTRE MÉTHODE] » ; H2 « Comment se passe l'organisation… » ; 4 étapes (étape 2 **sans** le délai `[À CONFIRMER]`) |
| 6 | **Témoignages** (Bloc UX), centré, avec flèches | `[ux_slider nav_style="circle" bullets="false"]` > 3 × `[testimonial stars="0" text_align="center"]` (✅ vérifié : `stars="0"` masque les étoiles) | « [AVIS CLIENTS] » ; 3 vrais avis, signés « SÉJOUR DANS LES PYRÉNÉES » |
| 7 | **Pourquoi Elios** *(ajoutée, style de la section 4)* | Une 4ᵉ rangée image / texte, image à gauche : sur-titre, H2 de 48 px, 3 paragraphes | « [POURQUOI ELIOS] » ; H2 « Pourquoi confier votre séminaire à une agence locale » ; 3 paragraphes ; photo `olympiades-entreprise-plage-groupe.webp` |
| 8 | **FAQ** *(ajoutée, style de la section 2)* | `[section padding="128px"]` > `[col span="4"]` sur-titre + H2 ; `[col span="8"]` `[accordion faq_schema="true"]` > 3 × `[accordion-item]` | « [BON À SAVOIR] » ; H2 « Questions fréquentes » ; **3 questions** publiables (budget, régions, temps de travail) ; transport et délai **retirés** (`[À CONFIRMER]`) |
| 9 | **CTA** (Bloc UX), bandeau photo dans le conteneur | `[col bg_radius="16"]` > `[ux_banner height="500px" bg="(kayak)" bg_overlay="rgba(0,0,0,0.35)"]` > `[text_box]` centré : sur-titre, H2 de 48 px, texte, 2 boutons | « [VOTRE PROJET] » ; « Parlons de votre prochain séminaire » ; texte ; « Demander un devis » (plein blanc) + « Appeler le 06 79 02 93 32 » (lien souligné blanc) |
| 10 | **Footer** (Bloc UX, option `footer_block`) | voir § 5 | `footer-et-menu.md` § 3 |

**Non publiée** : « Elios Evasion en quelques chiffres », car ses chiffres sont `[PROVISOIRE]`. Les puces la remplacent dans la section 2.

**Photos utilisées** (9, toutes présentes dans `images-alt.csv`) :
- `pirogue-tahitienne-team-building-palavas` ;
- `team-building-paddle-geant-equipe` ;
- `chateau-fines-roches-vignes-crepuscule` ;
- `seminaire-ski-groupe-entreprise-neige` ;
- `grotte-clamouse-parcours-aventure-tyrolienne` ;
- `vigne-galets-roules-chateauneuf-du-pape` ;
- `ski-de-randonnee-sommet-enneige` (photo de repli : la rédaction attend une photo `[À FOURNIR]`) ;
- `olympiades-entreprise-plage-groupe` ;
- `kayak-paddle-etang-palavas-coucher-soleil` (CTA).

## 4. Sur-titres rédigés (ajoutés dans `accueil.md`)

| Section | Sur-titre | Autres petites lignes |
|---|---|---|
| Hero | (déjà présent) « Agence de séminaires et de team building · Sud de la France » | — |
| L'agence | [L'AGENCE] | — |
| Destinations | [NOS DESTINATIONS] | Lignes de lieu : « HÉRAULT · SALAGOU · PALAVAS-LES-FLOTS », « VAUCLUSE · CHÂTEAUNEUF-DU-PAPE », « FONT-ROMEU · HIVER ET ÉTÉ » |
| Coups de cœur | [COUPS DE CŒUR] | Liens : « VOIR LA JOURNÉE → » (offres 1 et 2), « VOIR LE SÉJOUR → » (offre 3) |
| Étapes | [NOTRE MÉTHODE] | Intitulés : « 01 · VOTRE PROJET », « 02 · VOTRE PROGRAMME », « 03 · LES RÉSERVATIONS », « 04 · LE JOUR J » |
| Témoignages | [AVIS CLIENTS] | Signature : « SÉJOUR DANS LES PYRÉNÉES » |
| Pourquoi | [POURQUOI ELIOS] | — |
| FAQ | [BON À SAVOIR] | — |
| CTA | [VOTRE PROJET] | — |

Les crochets font partie du style de la maquette : ils sont affichés tels quels. Ce ne sont **pas** des repères éditoriaux du type `[À CONFIRMER]`.

## 5. Footer : mélange de la maquette et de la rédaction

**Mise en page de la maquette** :
- fond `#F9F9F9`, marges internes d'environ 120 px ;
- un bloc de présentation à gauche (5/12) ;
- 3 colonnes de liens à droite, avec un titre en petites capitales et des liens noirs ;
- une ligne de copyright en bas, en capitales `#656565`.

**Contenu de la rédaction** (`footer-et-menu.md` § 3) :

| Zone | Contenu |
|---|---|
| Gauche | Logo Elios (version foncée, sur fond clair : ⚠️ seul le logo **blanc** existe, la version couleur ou foncée est `[À FOURNIR]`) ; présentation en 2 lignes de la rédaction |
| Colonne « Contact » (le « Visit » de la maquette) | Font-Romeu-Odeillo-Via (66120) ; téléphone [06 79 02 93 32](tel:+33679029332). Adresse et e-mail affichés **seulement une fois fournis**. Les réseaux sociaux (le « Social » de la maquette) s'ajoutent ici, une fois les vraies URL fournies |
| Colonne « Destinations » | Les 5 liens de la colonne 2 de la rédaction |
| Colonne « Ressources » | FAQ et prix, Blog. Les 3 articles ne sont ajoutés qu'une fois publiés (consigne de la rédaction) |
| Ligne du bas (le « Legal » de la maquette) | © année automatique (`[ux_current_year]`, déjà utilisé par Flatsome dans `footer_left_text`) Elios Evasion · Mentions légales · Politique de confidentialité · CGV |

Construction : un Bloc UX « Footer » = `[section bg_color="#F9F9F9" padding="120px"]` > `[row]` > `[col span="5"]` + 3 × `[col span="2"]` (+ une rangée pour la ligne du bas), puis `footer_block` = ce bloc. Les footers standards de Flatsome sont désactivés : `footer_1` = 0, `footer_2` = 0.

⚠️ Les pages liées n'existent pas encore sur la préprod (seul l'accueil est dans le périmètre) : les liens du footer et des cartes mèneront à des 404 jusqu'à leur création. C'est normal à ce stade.

## 6. Points encore ouverts

1. **Logo** : seul le PNG blanc existe. Sur le header transparent, il convient. Mais le header collant (fond blanc) et le footer (fond clair) demandent une **version foncée** (`site_logo` pour le fond blanc, `site_logo_dark` pour le header transparent). D'ici là : logo blanc sur la photo, et texte « Elios Evasion » dans le footer.
2. **Modern Image Formats** : son réglage (WebP ou AVIF, original conservé) est toujours à relever dans *Réglages > Médias* avant d'envoyer les photos.

## 7. Prochaine étape (après validation de cette version)

1. **Options globales** : le client fait d'abord exporter et sauvegarder ses réglages actuels (*Flatsome > Avancé > Backup and Import*) et nous transmet le texte. On en reprend le format exact (`header_elements_right`, typographies), puis on génère le texte d'import avec les seules clés ci-dessus.
2. **Médias** : 9 photos en WebP, avec les noms et alt de `images-alt.csv`.
3. **Blocs UX** : Témoignages, CTA, Footer.
4. **Page id 8** :
   - modèle `page-transparent-header-light.php` ;
   - contenu en shortcodes, contrôlé automatiquement contre la référence ;
   - code sauvegardé dans `accueil.ux.txt`.
5. **Captures** à 1440 px et 390 px, comparaison avec `Homepage 1.png`, puis liste des écarts.
