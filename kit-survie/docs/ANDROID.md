# Le kit sur Android

Le kit complet (fiches, checklists, outils **et assistant IA**) tourne directement sur le
téléphone, sans PC ni Internet, grâce à **Termux** (un terminal Linux pour Android).

Comptez 15 minutes, et une connexion Wi-Fi pour l'installation (environ 300 Mo sans l'IA,
1,5 à 3 Go de plus avec).

## 1. Installer Termux

1. Installez **F-Droid** (magasin d'applications libres) depuis [f-droid.org](https://f-droid.org),
   puis, dans F-Droid, installez **Termux**.
   La version de Termux sur le Play Store est en retard : préférez celle de F-Droid.
2. Facultatif, dans F-Droid aussi : **Termux:Widget**, pour lancer le kit d'un appui depuis
   l'écran d'accueil.

## 2. Installer le kit

Ouvrez Termux et tapez (ou collez) cette ligne, puis Entrée :

```bash
pkg install -y curl && curl -fsSL https://raw.githubusercontent.com/Rowleyflo/noddl/claude/epic-pasteur-ccvrus/kit-survie/android/installer.sh | bash
```

Le script installe Python, télécharge le kit, crée la commande `kit-survie`, puis propose
d'installer l'assistant IA. Il choisit le modèle selon la mémoire du téléphone :

| Mémoire du téléphone | Modèle | Téléchargement |
|---|---|---|
| Moins de 7 Go | `qwen3:1.7b` | ~1,4 Go |
| 7 Go et plus | `qwen3:4b` | ~2,5 Go |

Sur un téléphone, l'IA répond lentement (quelques mots par seconde) et vide la batterie :
gardez-la pour les vraies questions, les fiches répondent instantanément.

## 3. Lancer le kit et l'installer comme une application

1. Dans Termux, tapez `kit-survie`. Chrome s'ouvre sur le kit.
2. Sur la page d'accueil, appuyez sur **« Installer l'application »** (ou menu ⋮ de Chrome →
   *Installer l'application* / *Ajouter à l'écran d'accueil*).
3. L'icône **Survie** apparaît sur l'écran d'accueil.

Ensuite, l'application **s'ouvre même quand Termux est fermé** : fiches, recherche,
checklists et outils sont gardés sur le téléphone. Seul l'assistant IA a besoin que
`kit-survie` tourne dans Termux.

Avec **Termux:Widget** : ajoutez le widget Termux sur l'écran d'accueil, choisissez
« Kit de survie » ; un appui lance tout.

## 4. Empêcher Android de couper le kit

Android ferme les applications en arrière-plan pour économiser la batterie. Pour Termux :
**Paramètres → Applications → Termux → Batterie → Sans restriction** (le nom varie selon la
marque). Le kit demande aussi à Android de ne pas mettre Termux en veille tant qu'il tourne.

## 5. Partager le kit avec la famille, sans Internet

Votre téléphone peut servir le kit aux autres téléphones, assistant compris :

1. Activez le **point d'accès / partage de connexion** de votre téléphone (même sans données
   mobiles, il crée un réseau local).
2. Lancez `kit-survie` : Termux affiche une adresse du type `http://192.168.x.x:8080`.
3. Les autres se connectent à votre point d'accès et ouvrent cette adresse dans leur navigateur.

Pour qu'ils aient leur propre copie autonome, envoyez-leur le fichier unique (page
*Installer & partager* du kit) ou installez Termux chez eux de la même façon.

## 6. Mettre à jour

Relancez la même ligne d'installation qu'à l'étape 2 : elle récupère les nouvelles fiches.
Puis ouvrez une fois l'application avec `kit-survie` lancé pour rafraîchir sa copie.

## Organic Maps : à faire maintenant

- **Téléchargez les cartes** de votre région, de votre pays et des pays voisins (et de la
  destination de repli si vous en avez une). Une carte non téléchargée est inutile une fois
  le réseau coupé.
- La recherche par catégorie fonctionne **hors ligne** : « eau potable », « pharmacie »,
  « hôpital », « abri », « station-service ».
- Créez une **liste de signets « Kit survie »** : domicile, points de ralliement, sources d'eau,
  maisons de la famille, itinéraires de repli. Partagez-la (menu de la liste → *Exporter*,
  fichier KMZ) avec chaque membre de la famille : elle s'importe d'un appui dans leur Organic Maps.
- Le **GPS fonctionne sans réseau** : en mode avion, réactivez seulement la localisation.

## En cas de problème

| Problème | Solution |
|---|---|
| `kit-survie : command not found` | Relancez la ligne d'installation |
| Chrome ne s'ouvre pas | Ouvrez Chrome vous-même sur `http://localhost:8080` |
| « Aucune IA locale détectée » | Attendez quelques secondes et rechargez : l'IA met du temps à démarrer |
| L'IA est très lente | Normal sur téléphone. Fermez les autres applications, ou essayez `kit-survie --modele qwen3:1.7b` |
| Le kit s'arrête écran éteint | Voir l'étape 4 |
