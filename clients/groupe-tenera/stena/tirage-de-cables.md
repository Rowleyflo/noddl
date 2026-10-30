# Stena : tirage de câbles

- **URL** : `/tirage-de-cables/` (conservée)
- **Statut** : ✏️
- **Rôle** : page du « cœur de métier historique ». C'est la page métier la plus importante du site.
- **Requêtes visées** (hypothèses) :
  - principale : « tirage de câbles » (entreprise, sous-traitant) ;
  - secondaires : « tirage câble grosse section », « tirage de câbles en fourreau », « sous-traitant tirage de câbles + Loire-Atlantique / Nantes / Saint-Nazaire », « tirage câble courant fort courant faible », « pose de câbles en trèfle ».

## Balises

| | Actuel |
|---|---|
| Title | Tirage de câbles \| Stena |
| Meta | Extrait automatique, coupé |
| H1 | Tirage de câbles |

- **Title** : `Tirage de câbles toutes sections, sous-traitant | Stena`
- **Meta** : `Tirage sur chemin de câbles ou en fourreau, grosses sections au cabestan, courants forts et faibles, sites Seveso ou amiantés : Stena, depuis 2005.`
- **H1** : `Tirage de câbles : toutes sections, tous milieux, sauf aérien`

## Plan (H2) et contenu (700 à 1 000 mots)

Base : `02-contenus-recuperes-stena.md`, §3.1. **Tous les faits existent déjà, il faut les structurer.**

1. **Introduction** (60 mots) : cœur de métier historique depuis 2005, pour les installateurs, tous contextes sauf aérien. Chiffre annuel de km tirés [À CONFIRMER].
2. **Sur chemin de câbles, échelle ou dalle marine** : à plat ou à champ, colliers fournis, pose en trèfle pour les câbles de puissance.
3. **En fourreaux** : avec ou sans pré-aiguillage, aiguille fibre jusqu'à 320 m, compresseur et furet.
4. **Grosses sections** : porte-touret de 2 t, 2 cabestans, treuil (3 ou 3,5 t, à harmoniser), vérins jusqu'à 12 t ; cadence record de **10 km par semaine** (Crucey).
5. **Courants forts et courants faibles** : puissance, commande, VDI, fibre ? [À CONFIRMER : fibre optique].
6. **Sites sensibles** : poste HT, amiante SS4, Seveso, ATEX ; lien vers `/secteurs/sites-sensibles/`.
7. **Exemples de chantiers** : 3 cartes (Cordemais, Crucey, Synutra).
8. **FAQ**
   - « Quelle section maximale pouvez-vous tirer ? »
   - « Fournissez-vous les colliers et accessoires ? » (réponse actuelle : selon contrat)
   - « Intervenez-vous en site occupé ou en exploitation ? »
   - « Quelle est votre zone d'intervention ? »
   - « Quel délai pour mobiliser une équipe ? » [À CONFIRMER]
9. **CTA** : « Envoyez-nous vos plans et votre cahier des charges » → `/contact-et-devis/` (motif pré-rempli « Tirage de câbles »).

## Maillage

- Vers `/pose-de-chemin-de-cables/` (« des supports posés pour un tirage de qualité ») et `/pose-et-raccordement/` (« jusqu'au raccordement en 630 mm² »).
- Vers les secteurs naval, industrie-énergie et sites sensibles.
- Reçoit : accueil, fiches chantier de tirage, page Stena du site Tenera.

## Données structurées

`Service` (`serviceType` : « Tirage de câbles électriques », `provider` → `#org`, `areaServed`) + `FAQPage` + `BreadcrumbList`.
