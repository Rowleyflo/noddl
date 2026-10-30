# Stena : réalisations (portfolio + modèle de fiche chantier)

## Hub

- **URL** : `/nos-realisations/` (conservée)
- **Statut** : ✏️ (option Portfolio)
- **Title** : `Réalisations : chantiers d'électricité industrielle | Stena`
- **Meta** : `Centrales EDF, CHU, navires, raffinerie, Roland-Garros : les chantiers où Stena a posé, tiré et raccordé pour les grands installateurs, par secteur.`
- **H1** : `Nos réalisations`
- **Contenu** : grille filtrable par secteur et par métier, cartes datées (photo, titre, ville, département, année, donneur d'ordre si autorisé). Les plus récentes en premier.
- **Données structurées** : `CollectionPage` + `ItemList`.

## Modèle de fiche chantier

- **URL** : `/nos-realisations/<type>-<nom>-<ville>/` (voir les slugs dans `plan-redirections.md`)
- **Longueur** : 250 à 500 mots. Les fiches actuelles font 22 à 52 mots : c'est trop peu pour être indexé utilement ou cité.

### Balises

- **Title** : `<Prestation> – <Site>, <Ville> (<dép.>) | Stena` (≤ 60 caractères ; raccourcir la prestation si besoin)
  - Exemple : `Tirage de câbles, centrale EDF de Cordemais (44) | Stena`
- **Meta** : `<Ce que Stena a fait> pour <donneur d'ordre> sur <site>, à <ville>. <Chiffre clé ou contrainte>. <Année>.`
  - Exemple : `Tirage de câbles de petites et grosses sections sur la tranche 5 de la centrale EDF de Cordemais, pour Clemessy, en site de production en exploitation.`
- **H1** : `<Site> : <prestation principale>`

### Plan

1. **En bref** (tableau) : lieu, secteur, donneur d'ordre, client final, année, durée, équipe, prestations.
2. **Le contexte** : pourquoi ce chantier, quelles contraintes (site occupé, hauteur, amiante, planning).
3. **Ce que nous avons fait** : prestations détaillées, avec chiffres (km, sections, nombre d'équipements).
4. **Le résultat** : délai tenu, réserves levées, témoignage du donneur d'ordre si possible.
5. **Photos** (3 à 6), avec un alt descriptif (« Tirage de câbles de grosse section au cabestan, centrale EDF de Cordemais »).
6. **Liens** : page(s) métier, page secteur, 2 chantiers similaires. Si LC Concept est intervenue : lien vers son site.

### Données structurées

`Article` (ou `CreativeWork`) avec `about` (le service), `contentLocation` (`Place` avec la ville), `datePublished`, `author` → `#org`, `image`.

## Rédaction des 22 fiches existantes

Les faits disponibles sont dans `02-contenus-recuperes-stena.md` (§5.2 et §5.3). Pour atteindre 250 mots, il faut les compléter avec le client (`04-collecte-client.md`, fiche chantier). **Priorité** : les 8 chantiers de la plaquette ou de grande notoriété (CHU de Nantes, CHU de Caen, Donges, Cordemais, Roland-Garros, Marion Dufresne, Yersin, Crucey), puis les autres.

## Rythme

Une nouvelle fiche par mois au minimum. C'est la seule source de contenu frais de Stena (pas de blog dans la formule). Chaque fiche peut être relayée sur LinkedIn et dans les publications Google Business Profile.
