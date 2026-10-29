# Intégration : Apimo

- **URL** : `https://noddl.io/integrations/apimo/`
- **Statut** : 🆕 Nouvelle page
- **Secteur** : agences immobilières (lien principal vers `/metiers/agence-immobiliere/`)
- **Rappel** : Apimo est un logiciel de transaction et de gestion pour les agences immobilières. Les biens y sont saisis puis diffusés.
- **Requêtes visées** (hypothèses, volumes à valider) :
  - principale : « site internet Apimo » ;
  - secondaires : « site agence immobilière Apimo », « passerelle Apimo site web », « Apimo intégration site », « afficher annonces Apimo sur son site ».

## Balises

- **Title proposé** : `Site d’agence immobilière synchronisé avec Apimo`
- **Meta proposée** : `Vos biens saisis dans Apimo apparaissent sur votre site noddl, avec photos, prix et statut, sans double saisie. Le site d’agence qui reste à jour seul.`
- **H1 proposé** : `Votre site d'agence immobilière synchronisé avec Apimo : vos annonces, toujours à jour`

## Plan de la page (H2)

1. **Vous saisissez dans Apimo, votre site suit.** Le principe de synchronisation [À CONFIRMER : sens (Apimo vers site uniquement ?), fréquence, données reprises].
2. **Ce qui remonte sur le site.** Photos, prix, surface, DPE, statut (vendu, sous compromis) [À CONFIRMER : liste réelle des champs].
3. **Des pages qui se référencent.** Une page par bien, des pages par ville ou par quartier, une recherche par critères [À CONFIRMER]. Lien vers `/solutions/seo-local/`.
4. **Chaque nouveau bien, sur vos réseaux.** [À CONFIRMER : publication automatique ?] Lien vers `/solutions/reseaux-sociaux/`.
5. **Ce qui se passe quand un bien est vendu.** [À CONFIRMER : retiré, ou affiché « vendu » ?]
6. **Comment se passe le branchement.** Ce qu'il faut demander à Apimo, délai.
7. **FAQ.**

## Précautions

- Ne pas utiliser le logo ni la marque Apimo d'une façon qui laisse croire à un partenariat officiel, sauf s'il existe. [À CONFIRMER : partenariat ou simple connexion technique via API ?]
- Vérifier le nom exact et la graphie de la marque utilisés par l'éditeur.

## Maillage interne

- **Sortants** : `/metiers/agence-immobiliere/` (lien principal), `/integrations/`, `/solutions/back-office/`.
- **Entrants** : `/metiers/agence-immobiliere/`, `/integrations/`, `/solutions/reseaux-sociaux/`.

## Données structurées

`Service` (avec `isRelatedTo` → `SoftwareApplication` « Apimo »), `FAQPage`, `BreadcrumbList`. Pour les **sites clients** : `RealEstateListing` sur chaque bien [À CONFIRMER].
