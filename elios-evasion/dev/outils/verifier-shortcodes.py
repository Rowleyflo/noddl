#!/usr/bin/env python3
"""Contrôle les shortcodes d'un fichier .ux.txt contre reference-flatsome/shortcodes-attributs.md.

Pour chaque shortcode ouvrant : le shortcode doit exister dans la référence, et chacun de ses
attributs doit figurer dans la liste extraite du code de Flatsome 3.20.12. Signale aussi les
attributs interdits par les consignes (class, style) et les repères éditoriaux non publiables.

Usage : python3 verifier-shortcodes.py fichier.ux.txt [autres fichiers…]
"""
import re
import sys
from pathlib import Path

REF = Path(__file__).resolve().parent.parent / 'reference-flatsome' / 'shortcodes-attributs.md'
INTERDITS = {'class', 'style_inline', 'css'}
# Classes utilitaires fournies par Flatsome (vérifiées dans assets/css/flatsome.css), permises par la directive 1.
CLASSES_FLATSOME = {'thin-font', 'touch-scroll-table'}  # .thin-font{font-weight:300!important} ; .touch-scroll-table (tableau défilant ≤ 849 px)
REPERES = re.compile(r'(?:\[|&#91;)(?:PROVISOIRE|À CONFIRMER|À FOURNIR|PHOTO À FOURNIR|TEXTE À FOURNIR)')


def charger_reference():
    ref, courant = {}, []
    for ligne in REF.read_text(encoding='utf-8').splitlines():
        m = re.match(r'## (.+?)\s+\(', ligne) or re.match(r'## (\[.+\])', ligne)
        if ligne.startswith('## '):
            noms = re.findall(r'\[([\w-]+)\]', ligne)
            courant = noms
            for n in noms:
                ref.setdefault(n, set())
            continue
        if courant:
            attrs = set(re.findall(r"'?(\w+)'?\s*(?:=>|=)", ligne))
            for n in courant:
                ref[n] |= attrs
    # Shortcodes sans attribut, vérifiés à la main dans le code du thème.
    ref.setdefault('ux_current_year', set())  # inc/functions/function-global.php, l. 113
    ref.setdefault('contact-form-7', {'id', 'title'})  # extension Contact Form 7 (formulaires)
    return ref


def verifier(chemin, ref):
    texte = Path(chemin).read_text(encoding='utf-8')
    erreurs = []
    for m in re.finditer(r'\[([a-z_-]+)((?:\s+[\w-]+="[^"]*")*)\s*\]', texte):
        nom, brut = m.group(1), m.group(2)
        base = re.sub(r'_\d+$', '', nom)
        if base not in ref:
            erreurs.append(f'shortcode inconnu : [{nom}]')
            continue
        for attr, val in re.findall(r'([\w-]+)="([^"]*)"', brut):
            if attr in INTERDITS:
                erreurs.append(f'[{nom}] attribut interdit par les consignes : {attr}')
            elif attr not in ref[base]:
                erreurs.append(f'[{nom}] attribut absent de la référence : {attr}="{val}"')
    html = re.sub(r'\[[^\]]*\]', '', texte)
    if 'style="' in html:
        erreurs.append('attribut HTML style="" dans le contenu')
    for classes in re.findall(r'class="([^"]*)"', html):
        inconnues = set(classes.split()) - CLASSES_FLATSOME
        if inconnues:
            erreurs.append(f'classe non fournie par Flatsome : {" ".join(sorted(inconnues))}')
    for r in REPERES.findall(texte):
        erreurs.append(f'repère éditorial non publiable : {r}')
    return erreurs


def main():
    ref = charger_reference()
    total = 0
    for chemin in sys.argv[1:]:
        erreurs = verifier(chemin, ref)
        total += len(erreurs)
        print(f'{chemin} : {"OK" if not erreurs else f"{len(erreurs)} problème(s)"}')
        for e in erreurs:
            print('  -', e)
    sys.exit(1 if total else 0)


if __name__ == '__main__':
    main()
