# Brief : intégrer la page d'accueil à partir de la maquette PDF du designer

> À lire **après** `00-consignes-dev.md` (directives, mécanismes Flatsome vérifiés, état de la préprod). Ce brief remplace la proposition `maquette/accueil-proposition.dc.html`, qui **ne sert pas de modèle**.

## Les deux sources, et laquelle décide quoi

| Sujet | Source qui fait foi |
|---|---|
| Mise en page, ordre et type des sections, couleurs, polices, tailles, espacements, arrondis, boutons, style des cartes, header, footer, animations indiquées | **La maquette PDF du designer** (fournie par le client dans la session) |
| Tous les textes : titres, paragraphes, boutons, liens, FAQ | **`../redaction/transverse/accueil.md`** (texte SEO validé) |
| Liens internes et leurs ancres | `../redaction/transverse/accueil.md` (règles dans `../seo/02-cocon-semantique-et-maillage.md`) |
| Photos et leurs alt | `../seo/donnees/images-alt.csv` (noms et alt) ; fichiers sources dans `../contenu/images/` (à retélécharger avec `../telecharger-images.sh` s'ils sont absents) |

**En cas de conflit** :
- La maquette prévoit une section que nos textes n'ont pas : on la signale au client, sans inventer de texte. On peut construire la section vide avec un repère `[TEXTE À FOURNIR]`, en brouillon.
- Nos textes contiennent une section que la maquette n'a pas : on la signale aussi, et le client tranche entre l'ajouter dans le style des autres sections ou la retirer.
- Un texte de la maquette diffère du nôtre : on garde **le nôtre** et on signale l'écart.
- Une photo de la maquette n'existe pas dans nos fichiers : on utilise la photo la plus proche de `images-alt.csv`, et on la signale.

## Ce qui ne doit jamais apparaître en ligne
- Aucun repère `[PROVISOIRE]`, `[À CONFIRMER]`, `[À FOURNIR]` : les chiffres clés et les 3 témoignages de `accueil.md` sont provisoires, donc absents.
  - Si la maquette prévoit une section témoignages, on peut utiliser les **3 vrais témoignages** de l'ancien site, cités dans `../redaction/pyrenees/sejour-team-building-pyrenees.md` (Céline A., Samantha C., Mathieu M.).
  - Si elle prévoit des chiffres clés, seul « 7 lieux partenaires » est réel ; le reste est signalé au client.
- Retirer de la FAQ les deux questions dont la réponse est `[À CONFIRMER]` (transport, délai de réservation), ainsi que le délai d'envoi du devis dans l'étape 2. Voir `pages/accueil-test-verification.md`.

## Étapes

1. **Lire** `00-consignes-dev.md`, puis ce brief, puis la maquette PDF page par page.
2. **Préprod** : l'inventaire authentifié est **déjà fait** (§ 6 ter des consignes). À faire seulement :
   - **relire les réglages** de Modern Image Formats (webp-uploads) dans l'admin, en demandant au client ;
   - **réutiliser la page brouillon « accueil » (id 8)** au lieu d'en créer une nouvelle ;
   - garder en tête que **Classic Editor est actif** : le contenu de la page s'écrit par l'API REST (champ `content`, shortcodes bruts). Si le client colle du code à la main, il doit utiliser l'onglet **Texte** de l'éditeur classique, jamais l'onglet Visuel, qui transforme les balises en texte affiché.
3. **Relevé du design de la maquette** : produire `pages/accueil-design-releve.md` avec :
   - la palette (codes hexadécimaux), les polices et graisses, les tailles des titres H1/H2/H3 et du texte, la largeur du contenu, les espacements de section, les arrondis, les styles de boutons, le header (transparent ou non, collant ou non, hauteur), le footer, et les animations indiquées ;
   - la liste des sections, dans l'ordre, avec pour chacune son rendu dans la maquette et le texte de `accueil.md` qui va dedans.
4. **Correspondance avec Flatsome** : pour chaque élément du relevé, l'option globale (clé dans `reference-flatsome/options-customizer.md`) ou l'élément et ses attributs (`reference-flatsome/shortcodes-attributs.md`).
   - **Polices** : vérifier qu'elles sont dans la liste Google Fonts de Flatsome. Sinon, le signaler et proposer la plus proche, ou l'envoi de la police dans les réglages de Flatsome si le thème le permet (à vérifier dans le code).
   - **Ce qui est impossible sans CSS perso** : on le liste et on propose l'option native la plus proche. **On ne le contourne jamais** avec du CSS, un attribut `style`, une classe inventée ou du HTML brut.
   - **Faire valider cette table par le client** avant la suite.
5. **Options globales** :
   - générer le texte d'import pour Flatsome > Avancé > Backup and Import, uniquement avec des clés vérifiées et seulement les clés qui changent (couleurs, polices, tailles, boutons, header, largeur) ;
   - avant tout import, **faire exporter et sauvegarder** les réglages actuels par le client ;
   - c'est le client qui colle le texte, ou alors on obtient son accord explicite avant d'importer soi-même.
6. **Médias** :
   - envoyer uniquement les photos utilisées sur l'accueil, en WebP, avec le nom de fichier et l'alt de `images-alt.csv` ;
   - noter leurs ID dans `pages/accueil-medias.md` ;
   - **pas de lien vers des images de l'ancien site** dans la version finale.
7. **Blocs UX réutilisables** prévus par la maquette (CTA devis, footer, témoignages) : les créer une seule fois dans `blocks` et les insérer avec `[block id=""]`. Le footer passe par l'option `footer_block`.
8. **Page d'accueil** :
   - la créer **en brouillon**, avec le modèle `page-blank.php` ;
   - contenu en shortcodes UX Builder, en n'utilisant que des attributs de la référence, puis contrôle automatique de chaque attribut contre la référence (voir le script utilisé pour `pages/accueil-test.ux.txt`) ;
   - sauvegarder le code dans `pages/accueil.ux.txt`.
9. **Comparaison avec la maquette** :
   - prendre des captures du brouillon (Playwright, ordinateur 1440 px et mobile 390 px) ;
   - les comparer section par section à la maquette ;
   - lister les écarts restants et leur cause (limite de Flatsome, photo manquante, texte différent).
10. **Validation** : envoyer au client le lien du brouillon, les captures et la liste des écarts. Ne la définir comme **page d'accueil** (`show_on_front=page`, `page_on_front`) qu'après son accord.
11. **Garder une trace** : committer et pousser les fichiers de `dev/pages/`, et mettre à jour le journal des décisions des consignes.

## Rappels
- **Thème enfant uniquement**, aucune modification du thème parent. Rien n'est ajouté au thème enfant sans accord.
- **Pas de CSS personnalisé**, sous aucune forme.
- **Rien d'inventé.** Un doute sur une option, une valeur ou un fait se vérifie (code du thème, préprod, textes validés) ou se pose en question au client.
- **Aucune extension installée ou désactivée** sans accord du client.
- **Ne pas toucher aux autres pages** : le périmètre est la page d'accueil, plus les options globales et les blocs qu'elle nécessite.
- **Code de Flatsome** : la référence du dépôt suffit le plus souvent. Pour vérifier un point qu'elle ne couvre pas, demander au client de redonner le zip du thème dans la session. Ne jamais committer le thème.
