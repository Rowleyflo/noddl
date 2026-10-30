# Stena : recrutement

- **URL** : `/recrutement/` (+ `/recrutement/<poste>-<ville>/` pour chaque offre)
- **Statut** : 🆕
- **Rôle** : capter le seul volume de recherche important du secteur. Les entreprises d'électricité recrutent en continu, et les candidats cherchent par métier et par ville.
- **Requêtes visées** (hypothèses) : « emploi électricien Missillac », « emploi électricien Saint-Nazaire », « offre électricien industriel Loire-Atlantique », « emploi tireur de câbles », « électricien chemin de câbles emploi », « électricien grand déplacement ».

## Balises (page liste)

- **Title** : `Recrutement : électriciens, tireurs de câbles (44) | Stena`
- **Meta** : `Stena recrute électriciens, monteurs de chemins de câbles et chefs d'équipe en Loire-Atlantique : chantiers variés, formations, contrats de droit français.`
- **H1** : `Rejoindre Stena : nos offres d'emploi`

## Plan (H2)

1. **Pourquoi Stena** : chantiers (navires, centrales, CHU…), formations prises en charge (habilitations, CACES, SS4, SEI), équipe stable, appartenance au groupe Tenera.
2. **Offres en cours** : une carte par offre, chacune avec sa page.
3. **Les métiers** : description courte de chaque métier, pour se positionner sur les recherches génériques.
4. **Candidature spontanée** : formulaire avec CV.

## Page d'offre

- **Title** : `<Poste> H/F – <Ville> (<dép.>) | Stena`, par exemple `Électricien industriel H/F – Missillac (44) | Stena`.
- **Données structurées `JobPosting` obligatoires** : `title`, `description`, `datePosted`, `validThrough`, `employmentType`, `hiringOrganization` → `#org`, `jobLocation` (adresse), `baseSalary` (fourchette, fortement recommandée), `directApply`.
- Dépublier, ou passer `validThrough` à une date passée, dès que le poste est pourvu.
- **Diffusion** : les pages offres avec `JobPosting` apparaissent dans Google Jobs. Les relayer aussi sur France Travail, Indeed et LinkedIn, avec un lien vers la page.

## Maillage

Depuis l'accueil, le pied de page, `/presentation/` et `tenera/carrieres/`.
