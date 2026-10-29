#!/data/data/com.termux/files/usr/bin/bash
# Démarre le kit dans Termux : l'IA locale si elle est installée, le serveur, puis Chrome.
# Les arguments sont transmis à serveur.py (ex. : kit-survie --modele qwen3:1.7b).

KIT="$(cd "$(dirname "$(readlink -f "$0")")/.." && pwd)"

# Empêche Android de mettre Termux en veille tant que le kit tourne.
termux-wake-lock 2> /dev/null || true
trap 'termux-wake-unlock 2> /dev/null || true' EXIT

ia_prete() { curl -fs http://127.0.0.1:11434/api/version > /dev/null 2>&1; }

if command -v ollama > /dev/null && ! ia_prete; then
  echo "Démarrage de l'assistant IA…"
  ollama serve > "$PREFIX/tmp/ollama.log" 2>&1 &
  for _ in $(seq 1 15); do
    ia_prete && break
    sleep 1
  done
fi

(sleep 2 && termux-open-url "http://localhost:8080") &

cd "$KIT" && python serveur.py "$@"
