# Pages villes : `/villes/` et le modèle des pages ville et département

## État actuel (relevé du 29/10/2026)

- **158 URL** dans `sitemap-villes.xml`, toutes indexables.
- **64 autres URL en `noindex, follow`**, sorties du sitemap. Bonne décision.
- Le hub `/villes/` annonce « 497 villes et départements ».
- **Search Console** :

  | Pages | Impr. | Position | Clics |
  |---|---|---|---|
  | Villes indexables | 67 | 35,6 | |
  | Départements indexables | 48 | 22,6 | |
  | Pages passées en `noindex` | 129 | | 2 |

- **Problème principal** : ces pages attirent des **particuliers qui cherchent un artisan** (« artisan toulouse », « entreprise douai », « volets sur mesure les lilas », « artisans lot »), et non des entreprises qui cherchent un site. **Environ 53 impressions hors cible**, le plus gros groupe de requêtes.
- **Cause probable** : le vocabulaire (« artisans » une vingtaine de fois par page) et les blocs du type « Combien de concurrents vous avez à X, métier par métier », qui listent des métiers et des volumes. Pour Google, la page ressemble à un annuaire d'artisans locaux.

## Politique d'indexation proposée

**Garder indexées seulement les pages qui ont un vrai argument local :**
1. La zone d'intervention physique de l'équipe : Montauban, Tarn-et-Garonne, Toulouse, Occitanie. La page Toulouse dit « l'équipe est à 47 km » : c'est un vrai argument.
2. Les villes où vous avez **au moins un client** à citer (preuve locale).
3. Les pages qui ont déjà eu des **clics** : Pas-de-Calais, Loire, Landes, Saintes. Les deux dernières sont en `noindex` : **à réévaluer**.

**Toutes les autres** passent en `noindex, follow` et sortent du sitemap. Ne pas les supprimer : elles peuvent servir de pages d'atterrissage pour la publicité.

> Ne pas créer de pages villes × secteurs (« site pompes funèbres Toulouse »…), sauf pour 2 ou 3 combinaisons réelles et documentées.

## Modèle de balises

### Page ville
| | Actuel | Proposé |
|---|---|---|
| Title | « Création de site internet à {Ville}, dès 69 € par mois » (variantes) | `Création de site internet à {Ville}, dès 69 € HT/mois` |
| Meta | « … pour artisans et commerçants … » | `Création de site internet à {Ville} pour les entreprises : un site pensé pour votre métier, modifiable depuis votre téléphone. Dès 69 € HT par mois.` |
| H1 | « Création de site internet à {Ville}, pour les artisans et commerçants » | `Création de site internet à {Ville}, pour les entreprises et commerces` |

### Page département
| | Proposé |
|---|---|
| Title | `Création de site internet dans le/la/les {Département} ({n°})` |
| Meta | `Création de site internet dans le/la/les {Département} pour les entreprises : une page par commune et une fiche Google à jour. Dès 69 € HT par mois.` |
| H1 | `Création de site internet dans le/la/les {Département}, pour les entreprises locales` |

> Contrôler la longueur des titles générés : avec un nom de ville long, `{Ville}` peut dépasser 60 caractères. Prévoir une version courte du modèle.

### Hub `/villes/`
- Actuel : « Création de site internet pour artisans, ville par ville »
- **Title proposé** : `Création de site internet près de chez vous, ville par ville`
- **Meta proposée** : `Où travaille l’équipe noddl, quelles villes on couvre, et ce que votre site doit faire pour y être trouvé. Création de site dès 69 € HT par mois.`
- **H1 proposé** : `Création de site internet près de chez vous, ville par ville`
- Retirer l'annonce « 497 villes et départements », qui ne correspond plus à ce qui est indexé.

## Contenu du modèle

| Bloc actuel | Action |
|---|---|
| « Combien de concurrents vous avez à {Ville} » / « Votre concurrence… métier par métier » | **Reformuler** du point de vue du client de noddl : « Combien d'entreprises de votre secteur cherchent à se faire voir à {Ville} ». Retirer les listes de métiers avec volumes, qui créent le signal « annuaire ». |
| « {n} recherches de clients chaque mois » | Garder si la source est fiable, et la citer. |
| « Le détail, métier par métier » | Remplacer par **« Par secteur »** (4 groupes), avec un lien vers les pages secteurs, pas de liste de métiers. |
| « Les mairies et les écoles dans {Département} » | Garder. C'est une cible réelle. |
| « Sur place » / « Comment noddl travaille avec les entreprises de {Ville} » | Garder, et remplacer « artisans » par « entreprises ». |
| Nouveau | Bloc **« Ils sont à {Ville} »** (clients locaux), uniquement s'il existe un client réel. |

## Maillage

- Chaque page ville renvoie vers `/solutions/site-internet/` (lien principal), `/metiers/` et `/solutions/seo-local/`.
- **Pas** de liens massifs entre pages villes (listes de 30 communes en pied de page) : 5 à 8 communes voisines maximum.
