#!/usr/bin/env bash
# Retélécharge les images originales du site actuel dans contenu/images/ (non versionnées : ~130 Mo).
set -euo pipefail
cd "$(dirname "$0")/contenu"
mkdir -p images
python3 -c "
import json,re
u=set(json.load(open('images_by_page.json')))
u|=set(re.findall(r'https?://[^ )]+\.(?:png|jpe?g|gif|webp|svg)', open('navigation.md').read()))
for x in sorted({re.sub(r'-\d+x\d+(\.\w+)$',r'\1',('https:'+x if x.startswith('//') else x)) for x in u}): print(x)
" | while read -r u; do
  curl -sS -f -o "images/$(echo "$u" | sed -E 's#.*/uploads/##; s#/#-#g')" "$u" || echo "ÉCHEC $u"
done
