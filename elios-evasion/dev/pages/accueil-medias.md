# Accueil : médias envoyés sur la préprod (30/10/2026)

Alt et noms de fichiers repris de `../../seo/donnees/images-alt.csv`. Le titre du média reprend l'alt.

| ID | Fichier (servi en AVIF) | Taille | Usage sur l'accueil |
|---|---|---|---|
| 12 | `pirogue-tahitienne-team-building-palavas.avif` | 600 × 600 | Hero |
| 13 | `team-building-paddle-geant-equipe.avif` | 600 × 600 | Carte Montpellier |
| 14 | `chateau-fines-roches-vignes-crepuscule.avif` | 600 × 600 | Carte Avignon |
| 15 | `seminaire-ski-groupe-entreprise-neige.avif` | 600 × 600 | Carte Pyrénées |
| 16 | `grotte-clamouse-parcours-aventure-tyrolienne.avif` | 600 × 600 | Coup de cœur 1 |
| 17 | `vigne-galets-roules-chateauneuf-du-pape.avif` | 600 × 600 | Coup de cœur 2 |
| 18 | `ski-de-randonnee-sommet-enneige.avif` | 1920 × 1275 | Coup de cœur 3 (photo de repli, la rédaction attend une photo `[À FOURNIR]`) |
| 19 | `olympiades-entreprise-plage-groupe.avif` | 600 × 600 | « Pourquoi Elios » |
| 20 | `kayak-paddle-etang-palavas-coucher-soleil.avif` | 600 × 600 | Bloc CTA |
| 38 | `logo-elios-evasion.avif` | 521 × 251 | Logo couleur (texte foncé) : header collant, footer |
| 39 | `logo-elios-evasion-blanc.avif` | 521 × 251 | Logo blanc : header transparent |

## Format : Modern Image Formats en AVIF

Test du 30/10/2026 sur un premier envoi en WebP (média 11, supprimé ensuite) :
- l'extension **reconvertit le WebP en AVIF** : `source_url` en `.avif`, et le WebP est gardé comme `original_image` ;
- double compression, et l'AVIF obtenu était **plus lourd** que le WebP (74 Ko contre 55 Ko).

**Décision** : on envoie les **JPEG d'origine renommés**, et l'extension fait une seule conversion, vers l'AVIF. Le PNG du ski de randonnée (2560 px) a été réduit à 1920 px en JPEG qualité 90. L'étape « conversion locale en WebP » des consignes est donc remplacée, tant que l'AVIF est actif.

⚠️ **Serveur** : les `.avif` sont servis **sans en-tête `Content-Type`**. Les navigateurs les affichent quand même, mais il vaut mieux que l'hébergeur déclare le type `image/avif` (réglage Apache, pas du CSS). À signaler au client.

## Résolution des photos

Sur l'ancien site, les photos prévues par la rédaction n'existent qu'en **600 × 600 px** (sauf le ski de randonnée). Elles sont un peu floues en grand format, surtout dans le **hero** (1440 × 800 px) et le bandeau CTA. Il faut demander au client les **originaux en haute définition**. Il suffira ensuite de remplacer le fichier : l'ID reste le même s'il est remplacé dans la médiathèque, sinon on change l'ID dans `accueil.ux.txt`.

Aucune image n'est liée à l'ancien site : tout est servi depuis la médiathèque de la préprod.
