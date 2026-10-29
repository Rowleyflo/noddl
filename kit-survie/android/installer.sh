#!/data/data/com.termux/files/usr/bin/bash
# Installe (ou met à jour) le kit de survie dans Termux, sur Android.
#
#   pkg install -y curl && curl -fsSL https://raw.githubusercontent.com/Rowleyflo/noddl/claude/epic-pasteur-ccvrus/kit-survie/android/installer.sh | bash
#
# Variables facultatives : KIT_IA=oui|non (sans question), KIT_DEPOT, KIT_BRANCHE.
set -euo pipefail

DEPOT="${KIT_DEPOT:-https://github.com/Rowleyflo/noddl.git}"
BRANCHE="${KIT_BRANCHE:-claude/epic-pasteur-ccvrus}"
DOSSIER="$HOME/noddl"
KIT="$DOSSIER/kit-survie"

etape() { printf '\n\033[1;32m== %s\033[0m\n' "$1"; }

# Tout est dans une fonction appelée à la fin : avec « curl | bash », le script est ainsi
# lu en entier avant de s'exécuter (sinon pkg pourrait en avaler la suite sur l'entrée standard).
principal() {
etape "1/4 Paquets : Python et git"
pkg update -y
pkg install -y python git

etape "2/4 Téléchargement du kit"
if [ -d "$DOSSIER/.git" ]; then
  git -C "$DOSSIER" pull --ff-only
else
  git clone --depth 1 --branch "$BRANCHE" "$DEPOT" "$DOSSIER"
fi
python "$KIT/construire.py"

etape "3/4 Raccourcis"
chmod +x "$KIT/android/demarrer.sh"
ln -sf "$KIT/android/demarrer.sh" "$PREFIX/bin/kit-survie"
# Pour l'application Termux:Widget (raccourci sur l'écran d'accueil), si elle est installée.
mkdir -p "$HOME/.shortcuts"
ln -sf "$KIT/android/demarrer.sh" "$HOME/.shortcuts/Kit de survie"
echo "Commande « kit-survie » créée."

etape "4/4 Assistant IA (facultatif)"
ram_go=$(( $(awk '/MemTotal/ {print $2}' /proc/meminfo) / 1024 / 1024 ))
if [ "$ram_go" -ge 7 ]; then
  modele="qwen3:4b"; taille="2,5 Go"
else
  modele="qwen3:1.7b"; taille="1,4 Go"
fi
echo "Mémoire du téléphone : ~${ram_go} Go → modèle conseillé : $modele ($taille à télécharger)."

reponse="${KIT_IA:-}"
if [ -z "$reponse" ] && [ -r /dev/tty ]; then
  read -r -p "Installer l'assistant IA maintenant ? [o/N] " reponse < /dev/tty || reponse=""
fi
case "$reponse" in
  o|O|oui|OUI)
    pkg install -y ollama
    if ! curl -fs http://127.0.0.1:11434/api/version > /dev/null 2>&1; then
      ollama serve > "$PREFIX/tmp/ollama.log" 2>&1 &
      for _ in $(seq 1 20); do
        curl -fs http://127.0.0.1:11434/api/version > /dev/null 2>&1 && break
        sleep 1
      done
    fi
    ollama pull "$modele"
    echo "Assistant installé avec $modele."
    ;;
  *)
    echo "Assistant non installé. Pour l'ajouter plus tard : relancez ce script avec KIT_IA=oui."
    ;;
esac

etape "Terminé"
cat <<'FIN'
Pour lancer le kit : tapez  kit-survie
Chrome s'ouvre sur http://localhost:8080. Ensuite, dans Chrome :
menu ⋮ → « Installer l'application » (ou « Ajouter à l'écran d'accueil »).
L'application installée s'ouvre ensuite même sans Termux (sauf l'assistant).
FIN
}

principal < /dev/null