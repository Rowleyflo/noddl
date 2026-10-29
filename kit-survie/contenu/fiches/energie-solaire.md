---
titre: Électricité solaire 12 V
categorie: feu
resume: Panneau, régulateur, batterie : comprendre, dimensionner et installer un petit système solaire pour la lumière, la radio, les téléphones.
mots_cles: [solaire, panneau, batterie, électricité, 12V, régulateur, lithium, station électrique, énergie, recharge]
risque: moyen
ordre: 3
---

## Le principe

**Panneau** → **régulateur** (contrôleur de charge) → **batterie** → **appareils**.

- Le régulateur protège la batterie (charge et décharge). **Indispensable.** Un régulateur
  **MPPT** récupère 10 à 30 % d'énergie de plus qu'un modèle PWM.
- Les appareils en **12 V et USB** (lampes LED, radio, téléphones, routeur Meshtastic) se
  branchent directement : c'est le plus efficace.
- Un **convertisseur** 12 V → 230 V permet d'utiliser les appareils de la maison, mais perd 10 à
  15 % et consomme même à vide : allumez-le seulement quand c'est nécessaire.

> [!ASTUCE] La solution la plus simple
> Une **station électrique portable** (batterie lithium + régulateur + prises USB, 12 V et 230 V
> dans un seul boîtier) avec un **panneau pliable** de 100 à 200 W. Rien à câbler, transportable
> en cas d'évacuation.

## Combien ça produit en Europe ?

Pour un panneau de **100 W** bien orienté, par jour, en moyenne :

| Région | Été | Printemps / automne | Hiver |
|---|---|---|---|
| Sud (Espagne, Italie, sud de la France) | ~500 Wh | ~350 Wh | ~200 Wh |
| Centre (France, Belgique, Allemagne, Pologne) | ~400 Wh | ~230 Wh | ~90 Wh |
| Nord (Scandinavie, pays baltes) | ~400 Wh | ~200 Wh | presque rien |

**L'hiver est le dimensionnement qui compte** si vous voulez de l'électricité toute l'année.

## Combien consomment les appareils ?

| Appareil | Consommation par jour |
|---|---|
| Recharger un téléphone | 10–15 Wh |
| Lampe LED 5 W, 5 heures | 25 Wh |
| Radio, 3 heures | 5–10 Wh |
| Boîtier Meshtastic, talkies | 2–5 Wh |
| Ordinateur portable, 2 heures | 60–100 Wh |
| Ordinateur avec IA locale, 1 heure | 50–100 Wh |
| Petit réfrigérateur 12 V | 300–600 Wh |

Calcul pour votre cas : l'[outil Solaire](#/outil/solaire).

## Les batteries

| Type | Énergie utilisable | Durée de vie | Remarques |
|---|---|---|---|
| **Lithium LiFePO4** | 80–90 % de la capacité | 2 000 à 5 000 cycles | Le meilleur choix : légère, sûre, durable. Ne pas charger sous 0 °C |
| **Plomb (AGM, gel)** | 50 % (au-delà, elle s'abîme vite) | 300 à 800 cycles | Moins chère, lourde. Ne jamais la laisser déchargée |

Capacité en Wh = tension × ampères-heures (une batterie 12 V 100 Ah ≈ 1 200 Wh).

## Installer

- **Orientation plein sud**, inclinaison proche de la **latitude** (environ 45° en France),
  davantage en hiver (latitude + 15°). Un panneau à plat produit nettement moins l'hiver.
- **La moindre ombre** sur une partie du panneau fait chuter toute la production.
- Câbles courts et assez gros (la basse tension chauffe vite les fils fins), **fusible** au plus
  près de la batterie, ordre de branchement : batterie sur le régulateur **d'abord**, panneau ensuite.
- Batterie au plomb : dans un endroit **aéré** (elle peut dégager de l'hydrogène en charge).
- Nettoyez les panneaux (poussière, neige, feuilles).

> [!DANGER] Court-circuit
> Une batterie, même en 12 V, peut délivrer des centaines d'ampères : un outil métallique entre
> ses bornes fond, brûle et peut faire exploser la batterie. Retirez bagues et montre,
> protégez les bornes.

## Discrétion

En période de conflit, des panneaux visibles et des fenêtres éclairées la nuit signalent un
foyer équipé. Rentrez les panneaux pliables le soir, occultez les fenêtres.
