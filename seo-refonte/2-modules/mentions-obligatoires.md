# Module : mentions obligatoires

- **URL** : `https://noddl.io/solutions/mentions-obligatoires/`
- **Statut** : 🆕 Nouvelle page
- **Type** : module métier, pompes funèbres (et autres professions réglementées [À CONFIRMER : immobilier ? autres ?])
- **Cible** : opérateurs funéraires (pompes funèbres, marbriers-funéraires, régies municipales)
- **Requêtes visées** (hypothèses, volumes à valider) :
  - principale : « mentions obligatoires site pompes funèbres » ;
  - secondaires : « devis type pompes funèbres en ligne », « obligation publication devis funéraire », « mentions légales site internet entreprise », « habilitation funéraire site internet ».
- **Search Console** : rien aujourd'hui.

## Balises

- **Title proposé** : `Mentions obligatoires : un site en règle, tenu à jour`
- **Meta proposée** : `Devis-types, habilitation, mentions légales : noddl affiche et tient à jour les mentions que votre métier impose, à commencer par le funéraire.`
- **H1 proposé** : `Mentions obligatoires sur votre site : affichées, à jour, sans y penser`

## Plan de la page (H2)

1. **Certaines professions ont des obligations sur leur site.** Le principe, sans jargon.
2. **Pour les pompes funèbres.** Ce que le module affiche et tient à jour :
   - les devis-types ou modèles de devis réglementaires ;
   - le numéro d'habilitation préfectorale ;
   - les mentions légales de l'entreprise ;
   - [À CONFIRMER : autres éléments gérés].

   Lien vers `/metiers/pompes-funebres/`.
3. **Comment ça marche.** Saisie une fois, affichage au bon endroit, alerte quand une information doit être mise à jour [À CONFIRMER].
4. **Pour les autres professions.** [À CONFIRMER : agences immobilières (barème d'honoraires, carte professionnelle) ? Sinon, supprimer ce bloc.]
5. **Ce que le module ne fait pas.** Il n'est pas un conseil juridique : c'est l'entreprise qui reste responsable du contenu de ses mentions.
6. **FAQ.**

## Contenu et précautions

- **Validation juridique obligatoire avant publication.** La réglementation funéraire (Code général des collectivités territoriales) impose notamment des modèles de devis et leur mise à disposition. Faire relire les références exactes et les dates par un juriste ou une fédération professionnelle avant de les citer. Ne pas citer d'article de loi non vérifié.
- **Ton sobre.** Voir `02-regles-transverses.md`, section 5.

## Maillage interne

- **Sortants** : `/metiers/pompes-funebres/`, `/solutions/back-office/`, `/solutions/site-internet/`.
- **Entrants** : `/metiers/pompes-funebres/` (lien principal), `/solutions/`, `/solutions/back-office/`, le guide funéraire proposé dans `6-contenus/guides.md`.

## Données structurées

`Service` + `FAQPage`.

> Note sur l'URL : `/solutions/mentions-obligatoires/` reste générique pour accueillir d'autres professions plus tard. Si le module reste 100 % funéraire, envisager `/solutions/mentions-obligatoires-funeraire/`. **Décider avant publication**, pour ne pas avoir à rediriger ensuite.
