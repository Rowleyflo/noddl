# Création des autres pages : état de préparation (30/10/2026)

> Audit du 30/10/2026. **Génération faite le même jour** après le feu vert du client : voir le journal des consignes et `pages/generation-rapport.md`.

## 1. Ce qu'il reste à créer : 36 contenus

| Lot | Contenus | Type WordPress | Parent ou URL |
|---|---|---|---|
| Hub | `/sejours/` | page | — |
| Silo Montpellier | pilier `/seminaire-montpellier/` + 7 fiches journée | pages | fiches enfants du pilier |
| Silo Avignon | pilier `/seminaire-avignon/` + 4 fiches journée (anciennes URL `/seminaire-a-la-journee/…` : 301 à prévoir) | pages | fiches enfants du pilier |
| Silo Pyrénées | `/sejours/sejour-team-building-pyrenees/`, `/sejours/seminaire-ski-hiver/`, `/sejours/seminaire-montagne-ete/`, `/sejours/seminaire-pyrenees-catalanes/` | pages | enfants de `/sejours/` |
| Transverse | `/journee-sur-mesure/`, `/a-propos/`, `/contact/`, `/faq/`, `/blog/` (index), `/mentions-legales/`, `/conditions-generales-de-vente/` | pages | — |
| Blog | 11 articles `/blog/<slug>/` | articles | — |

Le footer et le menu sont déjà en place (bloc 23, menu 3) : leurs liens fonctionneront dès que les pages existeront.

## 2. Ce qui est prêt

- **Accès** : API REST authentifiée en administrateur ; création de pages, d'articles, de médias, de Blocs UX et de menus déjà éprouvée sur l'accueil.
- **Formulaires** : l'API de Contact Form 7 accepte la création (`POST /contact-form-7/v1/contact-forms`).
- **Design global** : options Flatsome (imports 1 à 5), CSS autorisé (pilule, encarts arrondis), règles d'animation et de balisage (consignes § 4) ; tout est réutilisable tel quel.
- **Blocs réutilisables** : CTA (22), Témoignages (21, vrais avis Pyrénées), Footer (23).
- **Chaîne médias** : JPEG d'origine renommé → AVIF par l'extension, alt de `images-alt.csv`. Les 65 photos demandées (hors accueil) sont **toutes** dans `images-alt.csv` ; 10 sont déjà dans la médiathèque, il en reste **55 à envoyer**.
- **Contrôles automatiques** : `outils/verifier-shortcodes.py` (attributs, classes, repères), audit du plan des titres rendu comparé à celui de la rédaction.
- **Rédaction** : les 36 textes existent (900 à 1 750 mots), au même format que l'accueil (blocs `<!-- [HERO] -->`, `[CARTES]`, `[FAQ]`…).

## 3. Ce qui bloque ou reste à décider

### 3.1 Réglages de l'admin, à faire par le client (pas d'API pour ça)

1. **Permaliens** : ils sont encore en format daté (`/2026/10/30/…`). Les articles doivent être sous `/blog/<slug>/` : *Réglages > Permaliens > Structure personnalisée* = `/blog/%postname%/`. **À faire avant de générer les articles.**
2. **Extensions Yoast SEO et Redirection** (prévues dans les consignes, non installées) : il faut l'accord du client pour les installer. Elles servent aux titles et metas et aux redirections 301 (anciennes URL Avignon, article de 2021). Ce n'est pas bloquant pour générer les pages, mais c'est indispensable avant la mise en ligne.
3. **Contenus d'exemple de WordPress** : « Page d'exemple » (id 2, publiée), « Bonjour tout le monde » (id 1), « Politique de confidentialité » (id 3, brouillon, absente de la rédaction alors que le footer y renvoie). À supprimer ou à remplacer ? Décision du client.

### 3.2 Gabarits : les maquettes à associer

La maquette contient 4 autres pages. **Correspondance proposée, à valider** :

| Maquette (PDF / PNG) | Pages du site |
|---|---|
| Page 2 « About » | `/a-propos/` |
| Page 3 « Adventures » (offres en cartes, filtres) | hub `/sejours/` et les 2 piliers `/seminaire-montpellier/`, `/seminaire-avignon/` |
| Page 4 « Expeditions » (fiche détaillée : bandeau, infos clés, programme, inclus) | les 11 fiches journée + les 4 pages Pyrénées |
| Page 5 « Destinations » | page des destinations : **pas d'équivalent** dans la rédaction (l'ancienne `/nos-destinations/` est remplacée par `/sejours/`) |

**Sans maquette** : articles de blog, index du blog, contact, FAQ, mentions légales, CGV. On les construit avec le même système de design (typographie, sur-titres, encarts, espacements), ou le designer les fournit.

### 3.3 Textes non publiables

Toutes les pages contiennent des repères `[À CONFIRMER]`, `[PROVISOIRE]` ou `[À FOURNIR]`, environ 300 au total. Les 3 options :

- **Comme pour l'accueil** : on retire les phrases ou blocs concernés, et la page est publiable mais un peu plus courte. C'est possible pour les fiches, les piliers, le hub, la FAQ et les articles.
- **Bloquant** :
  - **mentions légales** (20 « à fournir ») et **CGV** (31 « à fournir ») : créées en **brouillon** tant qu'Elios n'a pas répondu, et relues par un juriste ;
  - **contact** : le formulaire n'a **pas d'e-mail de réception** (`[À FOURNIR]`). L'e-mail d'admin du site (`contact@otkudesign.fr`) contient une faute de frappe probable ;
  - **à propos** : 8 « à fournir », dont l'année de création et le parcours.
- Le brouillon de mail `../mail-infos-manquantes.md` regroupe déjà toutes les questions à Elios : **à envoyer maintenant** fait gagner du temps.

### 3.4 Photos

- 30 des photos prévues n'existent qu'en **600 × 600 px** sur l'ancien site : elles seront floues dans les grands bandeaux des fiches. Il faut les originaux HD (même demande que pour l'accueil).
- Une vingtaine de repères `[PHOTO À FOURNIR]` : la rédaction prévoit une photo de repli pour la plupart. Sinon, la section est construite sans photo.

### 3.5 Formulaires

- **Formulaire de devis** (contact) : champs spécifiés dans `../redaction/transverse/contact.md`, création possible par l'API, mais l'e-mail de réception manque.
- **Formulaire de pré-réservation** (`[FORMULAIRE]` sur 17 pages) : **un seul** formulaire CF7, réutilisé partout via un Bloc UX ; la page d'origine est transmise automatiquement dans l'e-mail (balise CF7 `[_post_title]`).

### 3.6 Vérification visuelle

Les brouillons ne s'affichent qu'en étant connecté : pour l'accueil, j'ai dû reconstituer le rendu. Pour 36 pages, 2 options :
- **publier directement sur la préprod**, puisque le site est en `noindex` et pas encore public : le rendu est réel, et les captures se font automatiquement ;
- garder des brouillons, et le client relit dans l'admin.

## 4. Peut-on tout faire d'un coup ? Oui, avec ce déroulé

1. **Préalables** (client) : permaliens `/blog/%postname%/`, décision sur les contenus d'exemple, validation de la correspondance des gabarits (§ 3.2), choix de publication (§ 3.6), e-mail de réception des formulaires.
2. **Pages modèles** (les consignes demandent un modèle validé par type avant la série) : 1 fiche journée, 1 pilier, le hub, 1 page simple (FAQ), 1 article. Ce sont 5 pages, à valider en une seule passe.
3. **Génération en série** : un script lit chaque `.md` et produit, par lot :
   - l'envoi des photos ;
   - les pages parentes, puis les enfants ;
   - le retrait automatique des repères non publiables ;
   - les shortcodes du gabarit ;
   - le contrôle des attributs et du plan des titres ;
   - la publication ou le brouillon, selon le choix du § 3.6 ;
   - les captures à 1440 et 390 px.
4. **Formulaires et blocs** : formulaire de pré-réservation, Bloc UX « Autres journées » par silo, formulaire de devis.
5. **Rapport** : la liste des écarts et des phrases retirées, page par page.

Le contrôle page par page reste nécessaire : textes, photos et liens internes sont propres à chaque page. Le script garantit que chaque attribut est vérifié et que le balisage suit la rédaction.
