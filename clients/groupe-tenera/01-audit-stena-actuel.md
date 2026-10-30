# Audit de stena.fr (relevé du 30/10/2026)

## 1. Synthèse

Le site a dix ans. Il a été réalisé par Nexus Création (Beauvais), tourne sous WordPress avec un thème « stena » sur mesure et l'extension All in One SEO 4.8, et il est hébergé chez OVH. **Rien n'a été publié depuis novembre 2017.** Le contenu de fond est bon et précis : moyens, sections, hauteurs, zones à risques. Il est en revanche dispersé, très court, sans balisage, et noyé dans des pages techniques WordPress indexables.

**L'actif à préserver** : un domaine ancien (2005-2006), des URL de métier propres (`/tirage-de-cables/`, `/pose-de-chemin-de-cables/`, `/pose-et-raccordement/`) et d'éventuels liens entrants (annuaires, Qualifelec, clients). On ne peut pas les mesurer sans la Search Console ni un outil de backlinks → **[À CONFIRMER] : accès à la Search Console du domaine, ou à défaut création de la propriété avant la bascule.**

## 2. Technique

| Point | Constat | Gravité | Correction dans la refonte |
|---|---|---|---|
| Mobile | **Aucune balise `meta viewport`** : le site ne s'adapte pas aux mobiles. Google indexe en « mobile first » | 🔴 | Site responsive (inclus) |
| HTTPS | Fonctionne, et `http://stena.fr` redirige en 301 | 🟢 | Garder les redirections http → https et non-www → www |
| Vitesse | Réponse serveur en 0,65 s, mais images non optimisées (bannières de 3000 px, plaquette de 3,6 Mo) | 🟠 | Statique, images WebP dimensionnées |
| Sitemap | Sitemap index AIOSEO avec 3 sous-sitemaps, 31 URL, plus un `sitemap.rss` | 🟠 | Il contient des pages techniques (voir §3) |
| Pages techniques indexables | `/caroussel/` (0 mot), `/les-chiffres/` (0 mot), `/texte-accueil/` (doublon de l'accueil), `/actualites-sur-la-page-daccueil/` (texte en double) : blocs de la page d'accueil publiés comme pages | 🔴 | Redirection 301 ou 410 (voir le plan de redirections) |
| Restes de blog WordPress | Commentaires ouverts, widgets « Méta / Connexion / Site de WordPress-FR », catégorie « Non classé », archives par mois, auteur « admin » | 🟠 | Supprimés. Vérifier `/author/admin/`, `/category/non-classe/`, `/2016/…`, `/feed/` au crawl de bascule |
| Données structurées | AIOSEO génère `BreadcrumbList`, `WebPage`, `Article` et `CollectionPage`, mais **ni `Organization` ni `LocalBusiness`**, pas d'adresse, pas de téléphone | 🟠 | Graphe complet avec lien vers Tenera (voir `03`, §5) |
| Images | Sur l'accueil, **21 images sur 27 sans attribut alt**, dont les 10 logos clients. Les alt existants sont des noms de fichier (« photo_eolienn ») | 🟠 | Alt descriptifs, logos nommés |
| Titres | Title de l'accueil : **« Stena »** seul. Les autres titles sont des « Nom de page \| Stena » | 🔴 | Titles réécrits (voir les fiches) |
| Meta descriptions | Générées automatiquement à partir du début du texte, souvent coupées en plein milieu (CGA, mentions légales, documentation) | 🟠 | Rédigées à la main |
| H1 | Un H1 par page, mais `/texte-accueil/` en a deux. Les H2 des articles sont des widgets (« Laisser un commentaire », « Méta ») | 🟠 | Hiérarchie propre |
| Polices | Google Fonts chargées depuis les serveurs de Google (Merriweather, Montserrat, Inconsolata) : un point RGPD | 🟠 | Polices hébergées sur le site |
| Robots IA | `robots.txt` minimal (`Disallow: /wp-admin/`) : rien n'est bloqué, rien n'est explicité | 🟢 | Autorisation explicite (voir `03`, §6) |

## 3. Contenu

| Point | Constat |
|---|---|
| Volume | La page la plus longue (hors CGV) fait **198 mots** (`/pose-et-raccordement/`). Les fiches réalisation font de 22 à 52 mots |
| Fraîcheur | 5 « actualités » de nov. 2015 à nov. 2017. Rien depuis. Un acheteur qui voit « Actualités 2016 » en 2026 conclut que l'entreprise est en sommeil |
| Coquilles visibles | « Bâteau » (×2, y compris dans les titles), « EPHAD » (dans l'URL et le texte), « Monthlery » / « Lina » pour Linas-Montlhéry, « sociète », « CLEMESSY » écrit « clemsy » dans le nom de fichier du logo, « Fax. : 02 40 8 42 39 » (il manque un chiffre sur la page contact) |
| Certification | Attestation **Qualifelec valable du 01/08/2015 au 31/07/2016**, toujours en téléchargement. Un acheteur la lira comme une qualification expirée → **qualification actuelle [À CONFIRMER]** |
| Chiffres | La page `/les-chiffres/` est vide. Les seuls chiffres sont dans la plaquette PDF 2015 : « + 15 km de chemins de câbles par an », « + 600 km de câbles tirés par an » |
| Références | 10 réalisations listées, plus 4 chantiers en « actualités ». Les références les plus fortes sont **uniquement dans la plaquette PDF** : CHU de Nantes, CHU de Caen, raffinerie de Donges, centrale photovoltaïque de l'ancienne base militaire de Crucey, Super U Saint-Michel-Chef-Chef, École d'architecture de Nantes, Nef Dubigeon |
| Logos clients | Bouygues, SPIE, SFEE, Clemessy, OET, LC Concept, Houllier, Fauché, Eiffage, Cegelec, Ineo, FEE, Dourmap. C'est un argument fort, mais on ne lit que des images sans texte : **ni Google ni une IA ne le voient** |
| Contact | Formulaire avec un motif « CDC Tirage de câbles / Pose et raccordement », un téléphone et un fax. Ni e-mail, ni plan, ni horaires, ni zone d'intervention |
| Positionnement | Clair et différenciant : « dédiée exclusivement à la sous-traitance auprès des grands installateurs », « jamais de main-d'œuvre détachée », « zone amiantée, sites Seveso ». Ces arguments sont enterrés dans `/presentation/` et doivent remonter |

## 4. Visibilité dans les moteurs d'IA (GEO)

Une IA qui répond à « quel sous-traitant pour du tirage de câbles en Loire-Atlantique ? » s'appuie sur des pages qu'elle comprend sans ambiguïté et sur des sources tierces cohérentes. Aujourd'hui :
- **l'entité Stena est confuse** : « Stena » renvoie massivement à **Stena Line** (ferries) et à **Stena AB / Stena Recycling** (groupe suédois). Dans le naval, c'est un homonyme direct. Le site ne dit jamais « Stena, sous-traitant en électricité industrielle basé à Missillac (44) » dans une phrase claire et répétée ;
- **les faits citables sont dans des images ou des PDF** : logos clients, plaquette, chiffres ;
- **l'adresse diverge** entre le site (Missillac) et le répertoire Sirene (établissement de Chaumes-en-Retz fermé) [À CONFIRMER] ;
- **aucun lien `sameAs`** vers LinkedIn, Google Business Profile, Qualifelec ou Pappers ;
- les pages ne répondent à aucune question directe : pas de FAQ, pas de « Combien de… », « Quelles qualifications… ».

→ Réponses dans `03-strategie-seo-geo-groupe.md`.

## 5. Recherches à mener avant la bascule (impossibles d'ici)

1. **Search Console de stena.fr** : pages et requêtes qui reçoivent des impressions sur les 16 derniers mois. On préserve en priorité ce qui en reçoit.
2. **Liens entrants** (Ahrefs, Semrush ou Majestic) : URL de destination à rediriger avec soin.
3. **Crawl complet** (Screaming Frog) : URL hors sitemap (archives, pièces jointes, `?p=`, `/wp-content/uploads/*.pdf`).
4. **Fiche Google Business Profile** : existe-t-elle ? Qui la gère ? Quelle adresse ?
5. **Requête `site:stena.fr`** dans Google et Bing, pour voir ce qui est réellement indexé.
6. **Test des IA** : poser les questions de la liste de suivi (`03`, §8) à ChatGPT, Perplexity, Copilot et Gemini avant la refonte, pour avoir un point zéro.
