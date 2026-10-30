# Formulaire de devis (Contact Form 7) : à coller dans l'admin

L'API de Contact Form 7 de la préprod répond sans rien enregistrer (création et mise à jour testées le 30/10/2026). Toutes les pages utilisent donc le formulaire **id 5** (« Formulaire de contact 1 »). Pour le transformer en formulaire de devis, d'après la spécification de `../../redaction/transverse/contact.md` :

1. *Contact > Formulaires de contact > Formulaire de contact 1*.
2. **Titre** : `Demande de devis`.
3. Onglet **Formulaire** : remplacer tout le contenu par le bloc ci-dessous.
4. Onglet **E-mail** :
   - **Destinataire** : l'adresse de réception des demandes (encore à fournir ; par défaut, celle de l'admin du site) ;
   - **Objet** : `Demande de devis : [entreprise] ([effectif] participants)` ;
   - **En-têtes additionnels** : `Reply-To: [email]` ;
   - **Corps du message** : le second bloc ci-dessous.
5. Onglet **Messages** : « Le message a été envoyé avec succès » = `Merci, votre demande est bien partie ! En attendant, vous pouvez consulter nos questions fréquentes.`
6. Enregistrer. L'identifiant reste 5 : toutes les pages affichent le nouveau formulaire.

## Formulaire

```
<label>Entreprise ou organisme *
[text* entreprise autocomplete:organization placeholder "Nom de votre entreprise ou de votre CSE"]</label>

<label>Nom et prénom *
[text* nom autocomplete:name]</label>

<label>E-mail professionnel *
[email* email autocomplete:email]</label>

<label>Téléphone *
[tel* telephone autocomplete:tel placeholder "06 12 34 56 78"]</label>

<label>Nombre de participants * (une estimation suffit)
[number* effectif min:1]</label>

<label>Dates souhaitées
[text dates placeholder "ex. : mi-juin 2027, ou 12 et 13 mars"]</label>

<label>Destination souhaitée *
[select* destination include_blank "Montpellier et vallée de l'Hérault" "Avignon et Vaucluse" "Pyrénées (séminaire de plusieurs jours)" "Je ne sais pas encore"]</label>

<label>Type de format *
[select* format include_blank "Journée clé en main" "Demi-journée" "Journée sur mesure" "Séminaire de plusieurs jours" "Sortie CSE" "Autre"]</label>

<label>Budget indicatif par personne (HT)
[select budget include_blank "Moins de 120 €" "De 120 à 150 €" "De 150 à 200 €" "Plus de 200 €" "Je ne sais pas encore"]</label>

<label>Votre message
[textarea message placeholder "Objectif de la journée, activité qui vous tente, contraintes, besoins particuliers (accessibilité, régimes alimentaires…)"]</label>

[acceptance rgpd] J'accepte qu'Elios Evasion utilise les informations saisies pour répondre à ma demande de devis. Ces données ne sont ni vendues ni cédées. [/acceptance]

[submit class:button class:primary "Envoyer ma demande de devis"]

<p>Les champs marqués d'un astérisque sont obligatoires.</p>
```

## Corps de l'e-mail

```
Entreprise : [entreprise]
Nom : [nom]
E-mail : [email]
Téléphone : [telephone]
Participants : [effectif]
Dates : [dates]
Destination : [destination]
Format : [format]
Budget : [budget]

Message :
[message]

--
Envoyé depuis la page : [_post_title] ([_url])
```
