# Tenera : arborescence

Domaine : **[À CONFIRMER]**. Les exemples utilisent `tenera.fr`.

```
/                                  Accueil
/le-groupe/                        Vision, gouvernance, chiffres, histoire
/nos-entreprises/                  Hub des filiales
  /nos-entreprises/stena/          Fiche Stena (renvoie vers stena.fr)
  /nos-entreprises/lc-concept/     Fiche LC Concept (renvoie vers son site)
/savoir-faire/                     Ce que le groupe sait faire, par secteur (naval, industrie et énergie, tertiaire et santé)
/references/                       Sélection de chantiers des filiales
/rejoindre-le-groupe/              Pour les dirigeants qui envisagent de céder
/carrieres/                        Emploi dans le groupe (renvoie vers les offres des filiales)
/actualites/                       Blog et actualités (formule Signature, blog IA)
  /actualites/<slug>/
/contact/
/mentions-legales/
/politique-de-confidentialite/
```

**Menu principal** : Le groupe · Nos entreprises · Savoir-faire · Références · Rejoindre le groupe · Carrières · Contact
**Pied de page** : logos et liens des filiales, actualités, mentions légales, LinkedIn.

## Choix structurants

- **`/nos-entreprises/<filiale>/`** : une page par filiale, sur un modèle commun. Quand le groupe rachète une entreprise, on ajoute une page, une carte sur l'accueil, une ligne dans `subOrganization` et des références. C'est le « système prêt pour la croissance externe » promis (proposition, p. 07).
- **`/savoir-faire/`** reste **une seule page** au lancement, avec un H2 par secteur. On la découpera en sous-pages quand le groupe aura assez de références par secteur (au moins 4 ou 5 chantiers chacun), pour ne pas créer de pages minces.
- **`/rejoindre-le-groupe/`** est la page qui porte le plus d'enjeu business pour la holding : c'est par elle qu'arrivent les prochains rachats.
- **Pas de version anglaise** au lancement. Une page `/en/` résumant le groupe est à envisager si les armateurs étrangers ou les partenaires européens comptent [À CONFIRMER].

## Sitemap

Un seul `sitemap.xml` (pages + articles). Le soumettre à Google Search Console et à Bing Webmaster Tools dès la mise en ligne.
