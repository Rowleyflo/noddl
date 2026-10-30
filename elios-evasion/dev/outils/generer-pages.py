#!/usr/bin/env python3
"""Génère les pages du site Elios Evasion à partir de la rédaction (redaction/**.md).

Le design reprend les règles de la page d'accueil validée par le client (couleurs, sur-titres,
sections à courbes, cartes blanches arrondies, boutons, animations, FAQ en accordéon) et les gabarits
de la maquette (« Expeditions » pour les fiches, « Adventures » pour le hub et les piliers).

Usage :
  python3 generer-pages.py --a-blanc           # produit dev/pages/generees/*.ux.txt + rapport, sans rien envoyer
  python3 generer-pages.py --envoyer [fichiers] # envoie médias, formulaire, pages et articles sur la préprod

Les repères non publiables ([À CONFIRMER], [PROVISOIRE], [À FOURNIR], [PHOTO À FOURNIR]) ne sont jamais publiés :
la phrase, la puce, la ligne de tableau ou la question qui les contient est retirée, et consignée dans le rapport.
"""
import base64
import csv
import html
import io
import json
import os
import re
import sys
import unicodedata
import urllib.request
from pathlib import Path

import markdown

RACINE = Path(__file__).resolve().parents[2]          # elios-evasion/
DEV = RACINE / 'dev'
SORTIE = DEV / 'pages' / 'generees'
MEDIAS_JSON = DEV / 'pages' / 'medias-ids.json'
RAPPORT = DEV / 'pages' / 'generation-rapport.md'
REPERE = re.compile(r'\[(?:PROVISOIRE|À CONFIRMER|À FOURNIR|PHOTO À FOURNIR|TEXTE À FOURNIR)[^\]]*\]')

# ---------------------------------------------------------------- charte (relevée sur l'accueil du client)
BLEU, ARDOISE, VERT, GRIS_FOND = '#047ea3', '#3d4955', '#aac816', '#f4f5f6'
SECTION_BLANCHE = '[section padding="160px" padding__sm="56px"]'
SECTION_GRISE = (f'[section bg_color="{GRIS_FOND}" padding="160px" padding__sm="56px" divider_top="curve" '
                 'divider_top_height="120px" divider_top_height__sm="40px" divider="curve" divider_height="120px" divider_height__sm="40px"]')
SECTION_DECOR = '[section bg="112" bg_size="original" bg_overlay="rgba(255, 255, 255, 0.576)" padding="160px" padding__sm="56px"]'
CARTE_COL = 'padding="20px 20px 10px 20px" bg_color="rgb(255,255,255)" bg_radius="30" animate="fadeInUp" depth="5"'
IMAGE_HERO_DEFAUT = 'lac-montagne-pic-du-midi-ossau-pyrenees.webp'
CTA_FOND = 95

PAGES_BROUILLON = {'/mentions-legales/', '/conditions-generales-de-vente/'}   # trop de données légales manquantes


def esc_attr(t):
    return t.replace('"', '&quot;').replace('[', '&#91;').replace(']', '&#93;')


def sur_titre(texte, couleur=BLEU, centre=False):
    t = html.escape(texte.upper().strip('[] '), quote=False)
    align = ' text_align="center"' if centre else ''
    return f'[ux_text font_size="0.75" text_color="{couleur}"{align}]\n<p><strong>&#91;{t}&#93;</strong></p>\n[/ux_text]\n'


def titre_h2(html_h2, centre=False, couleur=ARDOISE, taille='1.25'):
    align = ' text_align="center"' if centre else ''
    mobile = ' font_size__sm="1.15"' if float(taille) > 1.25 else ''   # titres agrandis : taille réduite sur mobile
    return f'[ux_text font_size="{taille}"{mobile} line_height="1.3" text_color="{couleur}"{align}]\n{html_h2}\n[/ux_text]\n'


def bouton(texte, lien, lien_simple=False):
    if lien_simple:
        return f'[button text="{esc_attr(texte)}" letter_case="lowercase" style="link" icon="icon-angle-right" icon_pos="right" link="{lien}"]\n'
    return f'[button text="{esc_attr(texte)}" padding="10px 30px 10px 30px" icon="icon-angle-right" icon_pos="right" link="{lien}"]\n'


def slugify(t):
    t = unicodedata.normalize('NFKD', t).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')


# ---------------------------------------------------------------- étiquettes de section (sur-titres génériques)
ETIQUETTES = [
    (r'questions fréquentes', 'Bon à savoir'), (r'programme|déroule|journée type|frise', 'Programme'),
    (r'prix|tarif|budget|coût|combien', 'Tarifs'), (r'pourquoi', 'Pourquoi Elios'),
    (r'autres|à découvrir|aussi|pour aller plus loin|lire aussi', 'À découvrir'),
    (r'organis|étape|comment', 'Notre méthode'), (r'lieu|domaine|château|grotte|moulin|accès|venir|où ', 'Le lieu'),
    (r'avis|témoign|ils ont|disent', 'Avis clients'), (r'hiver|été|saison|neige', 'La saison'),
    (r'comparatif|coup d.œil|tableau', 'En un coup d’œil'), (r'destination|territoire', 'Nos destinations'),
    (r'sommaire', 'Sommaire'),
]


def etiquette(titre, defaut=''):
    t = (titre or '').lower()
    for motif, lib in ETIQUETTES:
        if re.search(motif, t):
            return lib
    return defaut


# ---------------------------------------------------------------- lecture de la rédaction
def lire(fichier):
    s = Path(fichier).read_text(encoding='utf-8')
    fm = {}
    if s.startswith('---'):
        _, entete, s = s.split('---', 2)
        fm = dict(re.findall(r'^(\w+): ?(.*)$', entete, re.M))
    blocs = []
    for m in re.finditer(r'<!-- \[([A-Z_]+)\](.*?)-->(.*?)(?=<!-- \[[A-Z_]+\]|\Z)', s, re.S):
        blocs.append({'type': m.group(1), 'com': m.group(2).strip(), 'md': m.group(3).strip('\n')})
    if not blocs:      # pages sans découpage (mentions légales, CGV) : une seule page de texte
        blocs = [{'type': 'PAGE_SIMPLE', 'com': '', 'md': re.sub(r'<!--.*?-->', '', s, flags=re.S).strip()}]
    return fm, blocs


def images_du_commentaire(com):
    """Images d'un commentaire : on ignore celles annoncées « à fournir », sauf la photo de repli (« à défaut : x »)."""
    defaut = re.search(r'à défaut\s*:\s*([a-z0-9-]+\.webp)', com)
    propre = REPERE.sub('', com)
    imgs = re.findall(r'([a-z0-9-]+\.webp)', propre)
    if defaut and defaut.group(1) not in imgs:
        imgs.insert(0, defaut.group(1))
    return imgs


def champ_commentaire(com, nom):
    m = re.search(nom + r'\s*:\s*«\s*(.*?)\s*»(?:\s*→\s*(\S+))?', com)
    return (m.group(1), m.group(2)) if m else (None, None)


# ---------------------------------------------------------------- nettoyage des repères
class Journal(list):
    def note(self, quoi):
        self.append(re.sub(r'\s+', ' ', quoi).strip()[:220])


PHRASE = re.compile(r'(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Þ«(])')


def nettoyer(md, journal):
    """Retire toute unité (ligne de tableau, puce, titre, phrase, citation) contenant un repère."""
    md = re.sub(r'<!--.*?-->', '', md, flags=re.S)   # d'abord les commentaires (sinon un « --> » peut disparaître avec une phrase)
    sortie = []
    for ligne in md.split('\n'):
        if not REPERE.search(ligne):
            sortie.append(ligne)
            continue
        brut = ligne.strip()
        if 'tel:+33679029332' in ligne and 'À CONFIRMER' in ligne and 'PROVISOIRE' not in ligne:
            journal.note(REPERE.search(ligne).group(0))
            sortie.append(REPERE.sub('', ligne).rstrip())
            continue
        if brut.startswith('|') or re.match(r'^([-*]|\d+\.)\s', brut) or brut.startswith('#') or brut.startswith('>'):
            journal.note(brut)
            continue
        phrases = PHRASE.split(ligne)
        gardees = [p for p in phrases if not REPERE.search(p)]
        for p in phrases:
            if REPERE.search(p):
                journal.note(p)
        if gardees:
            sortie.append(' '.join(gardees))
    texte = '\n'.join(sortie)
    texte = re.sub(r'<!--.*?-->', '', texte, flags=re.S)
    return re.sub(r'\n{3,}', '\n\n', texte).strip()


def vers_html(md):
    h = markdown.markdown(md, extensions=['tables', 'attr_list', 'sane_lists'])
    h = h.replace('[', '&#91;').replace(']', '&#93;')   # aucun crochet ne doit être pris pour un shortcode
    h = re.sub(r'(<table>.*?</table>)', r'<div class="touch-scroll-table">\1</div>', h, flags=re.S)   # classe Flatsome
    return h.strip()


def separer_titre(md):
    """Renvoie (html du H2 ou '', texte du H2, reste du markdown)."""
    m = re.search(r'^## (.+)$', md, re.M)
    if not m:
        return '', '', md
    h2 = vers_html(m.group(0))
    texte = re.sub(r'\s*\{#[^}]+\}', '', m.group(1)).strip()
    return h2, texte, (md[:m.start()] + md[m.end():]).strip()


# ---------------------------------------------------------------- médias
class Medias:
    def __init__(self):
        self.ids = json.loads(MEDIAS_JSON.read_text()) if MEDIAS_JSON.exists() else {}
        self.alt = {}
        for r in csv.DictReader(open(RACINE / 'seo/donnees/images-alt.csv', encoding='utf-8')):
            self.alt.setdefault(r['nouveau_nom'], r)
        self.demandees = set()

    def id(self, nom):
        self.demandees.add(nom)
        return self.ids.get(nom, f'MEDIA:{nom}')


# ---------------------------------------------------------------- rendu des blocs
class Rendu:
    def __init__(self, fm, medias, journal, article, cartes_images, form_id):
        self.fm, self.m, self.j, self.article = fm, medias, journal, article
        self.cartes_images, self.form_id = cartes_images, form_id
        self.cote_image = 0      # alternance image à droite / à gauche
        self.a_formulaire = False

    # enveloppe de section (les articles n'ont pas de fonds ni de courbes : ils sont dans la colonne du blog)
    def section(self, contenu, style='blanche'):
        if self.article:
            return contenu + '[gap height="48px" height__sm="24px"]\n\n'
        ouv = {'blanche': SECTION_BLANCHE, 'grise': SECTION_GRISE, 'decor': SECTION_DECOR}[style]
        return f'{ouv}\n\n{contenu}\n[/section]\n'

    def entete(self, h2, texte_h2, etiq, centre=False):
        if not h2:
            return ''
        e = sur_titre(etiq, centre=centre) if etiq and not self.article else ''
        return e + titre_h2(h2, centre=centre)

    # ------------------------------------------------------------ HERO
    def hero(self, b):
        surtitre, _ = champ_commentaire(b['com'], 'sur-titre')
        btxt, blien = champ_commentaire(b['com'], 'bouton')
        md = nettoyer(b['md'], self.j)
        h1 = re.search(r'^# (.+)$', md, re.M)
        intro = re.sub(r'^# .+$', '', md, flags=re.M).strip()
        if self.article:     # le titre de l'article est le H1 du thème
            return (self.section(f'[row]\n\n[col span__sm="12"]\n\n{vers_html(intro)}\n\n[/col]\n\n[/row]\n') if intro else '')
        imgs = images_du_commentaire(b['com']) or [self.fm.get('image_principale', '').strip() or IMAGE_HERO_DEFAUT]
        img = imgs[0] if imgs[0] in self.m.alt or imgs[0] in self.m.ids else IMAGE_HERO_DEFAUT
        if blien and blien.startswith('#devis'):
            blien = '#devis' if self.form_id else '/contact/'
        s = (f'[ux_banner height="680px" height__sm="520px" bg="{self.m.id(img)}" bg_size="original" bg_overlay="rgba(0,0,0,0.35)" '
             f'bg_pos="50% 50%" parallax="2" divider="curve" divider_height="120px" divider_height__sm="40px"]\n\n'
             '[text_box width="67" width__sm="90" animate="fadeInUp" position_x="0" position_x__sm="50" position_y="75" position_y__sm="80" text_align="left"]\n\n')
        if surtitre and not REPERE.search(surtitre):
            s += f'[ux_text font_size="0.75"]\n<p><strong>{html.escape(surtitre.upper(), quote=False)}</strong></p>\n[/ux_text]\n'
        s += f'[ux_text font_size="1.14" font_size__sm="0.64" line_height="1.1"]\n<h1 class="thin-font">{html.escape(h1.group(1).strip(), quote=False)}</h1>\n[/ux_text]\n'
        if btxt:
            s += '[gap height="16px"]\n\n' + bouton(btxt, blien or '/contact/')
        s += '\n[/text_box]\n\n[/ux_banner]\n'
        if intro:
            s += self.section('[row]\n\n[col span="9" span__sm="12" animate="fadeInUp"]\n\n'
                              f'[ux_text font_size="1.35" font_size__sm="1.15" line_height="1.7"]\n{vers_html(intro)}\n[/ux_text]\n\n[/col]\n\n[/row]\n', 'decor')
        return s

    # ------------------------------------------------------------ ESSENTIEL
    def essentiel(self, b):
        md = nettoyer(b['md'], self.j)
        items = re.findall(r'^[-*] \*\*(.+?)\*\*\s*:?\s*(.*)$', md, re.M)
        if 'retenir' in b['com'].lower() or not items:
            h2, t, reste = separer_titre(md)
            corps = vers_html(reste)
            carte = (f'[row]\n\n[col span="12" {CARTE_COL}]\n\n'
                     + sur_titre('À retenir') + (titre_h2(h2) if h2 else '') + f'{corps}\n\n[/col]\n\n[/row]\n')
            return self.section(carte.replace('padding="20px 20px 10px 20px"', 'padding="40px 40px 30px 40px" padding__sm="24px"'))
        cols = ''
        for lib, val in items:
            cols += (f'[col span="4" span__md="6" span__sm="6" animate="fadeInUp"]\n\n'
                     f'[ux_text font_size="0.75" text_color="{BLEU}"]\n<p><strong>{html.escape(lib.upper(), quote=False)}</strong></p>\n[/ux_text]\n'
                     '[divider width="100%" height="1px" color="#E2E2E2"]\n\n'
                     f'{vers_html(val)}\n\n[/col]\n')
        h2, t, _ = separer_titre(md)
        apres = re.sub(r'^## .+$|^[-*] \*\*.+$', '', md, flags=re.M).strip()
        tete = '[row]\n\n[col span__sm="12" animate="fadeInUp"]\n\n' + ('' if self.article else sur_titre("L'essentiel")) + (titre_h2(h2) if h2 else '') + '[gap height="24px"]\n\n[/col]\n\n[/row]\n'
        s = tete + f'[row]\n\n{cols}\n[/row]\n'
        if apres:
            s += f'[row]\n\n[col span="9" span__sm="12" animate="fadeInUp"]\n\n[gap height="24px"]\n\n{vers_html(apres)}\n\n[/col]\n\n[/row]\n'
        return self.section(s, 'grise')

    # ------------------------------------------------------------ SECTION
    def section_bloc(self, b):
        com = b['com'].lower()
        md = nettoyer(b['md'], self.j)
        if not md or 'masqué' in com:
            if b['md'].strip():
                self.j.note(f"section masquée : {b['com'][:80]}")
            return ''
        h2, t, reste = separer_titre(md)
        etiq = etiquette(t)
        imgs = [i for i in images_du_commentaire(b['com']) if i in self.m.alt or i in self.m.ids]
        puces = re.findall(r'^[-*] \*\*(.+?)\*\*\s*[:,]?\s*(.*)$', reste, re.M)
        etapes = re.findall(r'^\d+\. (.+)$', reste, re.M)
        if ('puce' in com or 'icône' in com) and len(puces) >= 3 and not imgs:
            return self.points_forts(h2, t, etiq, reste, puces)
        if ('étape' in com or 'frise' in com) and len(etapes) >= 3:
            return self.etapes(h2, t, etiq, reste, etapes)
        if 'sommaire' in com:
            carte = (f'[row]\n\n[col span="12" {CARTE_COL}]\n\n' + (titre_h2(h2) if h2 else '') + vers_html(reste) + '\n\n[/col]\n\n[/row]\n')
            return self.section(carte.replace('padding="20px 20px 10px 20px"', 'padding="40px 40px 30px 40px" padding__sm="24px"'))
        corps = vers_html(reste)
        if 'grille de tous les articles' in com:      # index du blog : la grille d'articles native de Flatsome
            corps += '\n\n[blog_posts posts=\"12\" image_height=\"66%\" image_radius=\"5\" show_date=\"text\" excerpt_length=\"20\"]\n'
        if imgs and not self.article:
            self.cote_image ^= 1
            img = f'[col span="6" span__sm="12" animate="fadeInUp"{" force_first=\"small\"" if self.cote_image == 0 else ""}]\n\n[ux_image id="{self.m.id(imgs[0])}" image_size="original" height="75%"]\n\n[/col]\n'
            pad = 'padding="0px 0px 0px 48px"' if self.cote_image else 'padding="0px 48px 0px 0px"'
            txt = f'[col span="6" span__sm="12" {pad} padding__sm="24px 0px 0px 0px" animate="fadeInUp"]\n\n{self.entete(h2, t, etiq)}[gap height="8px"]\n\n{corps}\n\n[/col]\n'
            ligne = img + txt if self.cote_image else txt + img
            return self.section(f'[row v_align="middle"]\n\n{ligne}\n[/row]\n')
        if imgs and self.article:
            corps = f'[ux_image id="{self.m.id(imgs[0])}" image_size="original" height="56%"]\n\n' + corps
        largeur = '12' if ('<table' in corps or self.article) else '9'
        return self.section(f'[row]\n\n[col span="{largeur}" span__sm="12" animate="fadeInUp"]\n\n{self.entete(h2, t, etiq)}[gap height="8px"]\n\n{corps}\n\n[/col]\n\n[/row]\n')

    def points_forts(self, h2, t, etiq, reste, puces):
        n = len(puces)
        span = '3' if n % 4 == 0 else '4'
        cols = ''
        for lead, suite in puces:
            cols += (f'[col span="{span}" span__md="6" span__sm="12" animate="fadeInUp"]\n\n'
                     f'[ux_text font_size="1.1" line_height="1.4" text_color="{VERT}"]\n<p><strong>{html.escape(lead, quote=False)}</strong></p>\n[/ux_text]\n'
                     f'[ux_text font_size="1.1" line_height="1.5"]\n{vers_html(suite) if suite else ""}\n[/ux_text]\n\n[/col]\n')
        apres = re.sub(r'^[-*] \*\*.+$', '', reste, flags=re.M).strip()
        s = '[row]\n\n[col span__sm="12" animate="fadeInUp"]\n\n' + self.entete(h2, t, etiq) + '[gap height="32px" height__sm="16px"]\n\n[/col]\n\n[/row]\n'
        s += f'[row]\n\n{cols}\n[/row]\n'
        if apres:
            s += f'[row]\n\n[col span="9" span__sm="12" animate="fadeInUp"]\n\n[gap height="24px"]\n\n{vers_html(apres)}\n\n[/col]\n\n[/row]\n'
        return self.section(s)

    def etapes(self, h2, t, etiq, reste, etapes):
        cols = ''
        for i, e in enumerate(etapes, 1):
            cols += (f'[col span="3" span__md="6" span__sm="12" animate="fadeInUp"]\n\n'
                     f'[ux_text font_size="0.75" text_color="{BLEU}"]\n<p><strong>ÉTAPE {i:02d}</strong></p>\n[/ux_text]\n'
                     '[divider width="100%" height="1px" color="#E2E2E2"]\n\n[gap height="8px"]\n\n'
                     f'{vers_html(e)}\n\n[/col]\n')
        apres = re.sub(r'^\d+\. .+$', '', reste, flags=re.M).strip()
        s = ('[row h_align="center"]\n\n[col span="10" span__sm="12" animate="fadeInUp"]\n\n'
             + (sur_titre(etiq or 'Notre méthode', couleur='rgba(61, 73, 85, 0.512)', centre=True) if h2 and not self.article else '')
             + (titre_h2(h2, centre=True, taille='1.875') if h2 else '') + '[gap height="64px" height__sm="24px"]\n\n[/col]\n\n[/row]\n')
        s += f'[row]\n\n{cols}\n[/row]\n'
        if apres:
            s += f'[row]\n\n[col span__sm="12" animate="fadeInUp"]\n\n[gap height="24px"]\n\n{vers_html(apres)}\n\n[/col]\n\n[/row]\n'
        return self.section(s, 'grise')

    # ------------------------------------------------------------ PROGRAMME
    def programme(self, b):
        md = nettoyer(b['md'], self.j)
        h2, t, reste = separer_titre(md)
        parties = re.split(r'^\*\*(.+?)\*\*\s*$', reste, flags=re.M)
        avant, colonnes, apres = parties[0].strip(), [], ''
        for i in range(1, len(parties), 2):
            corps = parties[i + 1].strip()
            liste = re.match(r'((?:^[-*\d].*\n?)+)', corps, re.M)
            if liste:
                colonnes.append((parties[i], liste.group(1)))
                apres += corps[liste.end():].strip() + '\n\n'
            else:
                colonnes.append((parties[i], corps))
        if not colonnes:
            return self.section_bloc({**b, 'com': b['com'] + ' texte'})
        span = str(12 // min(len(colonnes), 3)) if len(colonnes) <= 3 else '6'
        cols = ''.join(
            f'[col span="{span}" span__sm="12" padding="40px 40px 30px 40px" padding__sm="24px" bg_color="rgb(255,255,255)" bg_radius="30" animate="fadeInUp" depth="5"]\n\n'
            f'[ux_text font_size="0.75" text_color="{BLEU}"]\n<p><strong>{html.escape(nom.upper(), quote=False)}</strong></p>\n[/ux_text]\n'
            f'{vers_html(contenu)}\n\n[/col]\n' for nom, contenu in colonnes)
        s = ('[row]\n\n[col span__sm="12" animate="fadeInUp"]\n\n' + self.entete(h2, t, 'Programme')
             + (vers_html(avant) if avant else '') + '[gap height="32px" height__sm="16px"]\n\n[/col]\n\n[/row]\n')
        s += f'[row v_align="equal"]\n\n{cols}\n[/row]\n'
        if apres.strip():
            s += f'[row]\n\n[col span="9" span__sm="12" animate="fadeInUp"]\n\n[gap height="24px"]\n\n{vers_html(apres.strip())}\n\n[/col]\n\n[/row]\n'
        return self.section(s, 'grise')

    # ------------------------------------------------------------ GALERIE
    def galerie(self, b):
        imgs = [i for i in images_du_commentaire(b['com']) if i in self.m.alt or i in self.m.ids]
        if not imgs:
            return ''
        span = '4' if len(imgs) != 4 else '3'
        cols = ''.join(f'[col span="{span}" span__sm="6" animate="fadeInUp"]\n\n[ux_image id="{self.m.id(i)}" image_size="original" height="75%" lightbox="true" image_hover="zoom-long"]\n\n[/col]\n' for i in imgs[:6])
        tete = '' if self.article else '[row]\n\n[col span__sm="12"]\n\n' + sur_titre('En images') + '\n[/col]\n\n[/row]\n'
        return self.section(tete + f'[row]\n\n{cols}\n[/row]\n')

    # ------------------------------------------------------------ CARTES
    def cartes(self, b):
        brut = b['md']
        md = nettoyer(brut, self.j)
        h2, t, reste = separer_titre(md)
        etiq = etiquette(t, 'À découvrir')
        cartes = []
        if re.search(r'^### ', brut, re.M):      # cartes rédigées : H3 + image en commentaire + texte
            for m in re.finditer(r'^### (.+?)\n(.*?)(?=^### |\Z)', brut, re.S | re.M):
                img = re.search(r'([a-z0-9-]+\.webp)', REPERE.sub('', m.group(2)))
                if REPERE.search(m.group(1)):
                    self.j.note('carte : ' + m.group(1)); continue
                corps = nettoyer(m.group(2), self.j)
                cartes.append({'h3': vers_html('### ' + m.group(1)), 'img': img.group(1) if img else None, 'corps': vers_html(corps), 'lien': None})
            apres = ''
            dernier = list(re.finditer(r'^### ', reste, re.M))
        else:                                     # liste de liens : « - [Titre](url) : description »
            for m in re.finditer(r'^[-*] \[(.+?)\]\((.+?)\)\s*[:–-]?\s*(.*)$', reste, re.M):
                titre, url, desc = m.groups()
                cartes.append({'h3': None, 'titre': titre, 'img': self.cartes_images.get(url.rstrip('/') + '/'), 'corps': vers_html(desc) if desc else '', 'lien': url})
            apres = re.sub(r'^[-*] \[.+$', '', reste, flags=re.M).strip()
        if not cartes:
            return self.section_bloc({**b, 'com': 'texte'})
        n = len(cartes)
        span = '4' if n % 3 == 0 or n > 4 else '6'
        cols = ''
        for c in cartes:
            img = ''
            if c['img'] and (c['img'] in self.m.alt or c['img'] in self.m.ids):
                lien = f' link="{c["lien"]}"' if c['lien'] else ''
                img = f'[ux_image id="{self.m.id(c["img"])}" image_size="original" height="66%" image_hover="zoom-long"{lien}]\n\n[gap height="16px"]\n\n'
            if c['h3']:
                tete = f'[ux_text font_size="1.1" line_height="1.3" text_color="{ARDOISE}"]\n{c["h3"]}\n[/ux_text]\n'
            else:
                tete = f'[ux_text font_size="1.1" line_height="1.3" text_color="{ARDOISE}"]\n<p><strong><a href="{c["lien"]}">{html.escape(c["titre"], quote=False)}</a></strong></p>\n[/ux_text]\n'
            pied = bouton('Découvrir', c['lien'], lien_simple=True) if c['lien'] else ''
            cols += f'[col span="{span}" span__sm="12" {CARTE_COL}]\n\n{img}{tete}{c["corps"]}\n\n{pied}\n[/col]\n'
        if re.search(r'^### ', brut, re.M):
            intro = re.sub(r'^### .+?(?=^### |\Z)', '', reste, flags=re.S | re.M).strip()
        else:
            intro = ''
        s = ('[row]\n\n[col span__sm="12" animate="fadeInUp"]\n\n' + self.entete(h2, t, etiq)
             + (vers_html(intro) if intro else '') + '[gap height="32px" height__sm="16px"]\n\n[/col]\n\n[/row]\n')
        s += f'[row v_align="equal"]\n\n{cols}\n[/row]\n'
        if apres:
            s += f'[row h_align="center"]\n\n[col span="9" span__sm="12" animate="fadeInUp"]\n\n[gap height="32px"]\n\n[ux_text font_size="1.25" text_align="center"]\n{vers_html(apres)}\n[/ux_text]\n\n[/col]\n\n[/row]\n'
        return self.section(s, 'grise')

    # ------------------------------------------------------------ TABLEAU
    def tableau(self, b):
        return self.section_bloc({**b, 'com': 'tableau'})

    # ------------------------------------------------------------ FAQ
    def faq(self, b):
        brut = b['md']
        groupes = re.split(r'^(## .+)$', brut, flags=re.M)
        if len(groupes) == 1:
            groupes = ['', '## Questions fréquentes', brut]
        lignes, premier = '', True
        for i in range(1, len(groupes), 2):
            h2, items = vers_html(groupes[i]), ''
            for m in re.finditer(r'^### (.+?)\n(.*?)(?=^### |\Z)', groupes[i + 1], re.S | re.M):
                q, r = m.group(1).strip(), m.group(2).strip()
                if REPERE.search(q) or REPERE.search(r):
                    self.j.note('FAQ retirée : ' + q); continue
                items += f'[accordion-item title="{esc_attr(q)}"]\n\n{vers_html(r)}\n\n[/accordion-item]\n'
            if not items:
                self.j.note('thème de FAQ vide retiré : ' + groupes[i]); continue
            acc = f'[accordion faq_schema="true"]\n\n{items}\n[/accordion]\n'
            if self.article:
                lignes += titre_h2(h2) + acc
            else:
                lignes += ('[row]\n\n[col span="4" span__sm="12" animate="fadeInUp"]\n\n' + (sur_titre('Bon à savoir') if premier else '') + titre_h2(h2)
                           + f'\n[/col]\n[col span="8" span__sm="12" animate="fadeInUp"]\n\n{acc}\n[/col]\n\n[/row]\n[gap height="48px"]\n\n')
            premier = False
        return self.section(lignes) if lignes else ''

    # ------------------------------------------------------------ TÉMOIGNAGES (seulement les vrais)
    def temoignages(self, b):
        if 'PROVISOIRE' in b['com'] or 'PROVISOIRE' in b['md'] or 'provisoire' in b['com'].lower():
            self.j.note('bloc témoignages provisoires retiré')
            return ''
        md = nettoyer(b['md'], self.j)
        h2, t, reste = separer_titre(md)
        temos = re.findall(r'> «\s*(.+?)\s*»\s*\n> —\s*(.+)', reste)
        if not temos:
            return ''
        slides = ''.join(f'[testimonial pos="center" name="{esc_attr(n.strip())}" font_size="large" stars="0"]\n\n<p>« {html.escape(q, quote=False)} »</p>\n\n[/testimonial]\n' for q, n in temos)
        s = ('[row h_align="center"]\n\n[col span="8" span__sm="12" padding="0px 40px 0px 40px" padding__sm="0px" align="center" animate="fadeInUp"]\n\n'
             + sur_titre('Avis clients', couleur=ARDOISE, centre=True) + (titre_h2(h2, centre=True, couleur=BLEU) if h2 else '')
             + f'[ux_slider hide_nav="true" nav_pos="outside" nav_size="normal" nav_style="simple" nav_color="dark" bullets="false" auto_slide="false"]\n\n{slides}\n[/ux_slider]\n\n[/col]\n\n[/row]\n')
        return self.section(s)

    # ------------------------------------------------------------ CTA (même structure que le bloc CTA de l'accueil)
    def cta(self, b):
        md = nettoyer(b['md'], self.j)
        if 'FORMULAIRE' in b['com']:
            return self.formulaire(b)
        h2, t, reste = separer_titre(md)
        liens = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', reste)
        texte = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1', reste) if not h2 else reste
        boutons = ''
        if not liens:
            boutons = bouton('Demander un devis', '/contact/') + '\n[button text="Appeler le 06 79 02 93 32" color="secondary" style="link" icon="icon-phone" link="tel:+33679029332"]\n'
        if self.article:
            return self.section(f'[row]\n\n[col span="12" {CARTE_COL}]\n\n' + (titre_h2(h2, couleur=VERT) if h2 else '') + vers_html(reste) + f'\n{boutons}\n[/col]\n\n[/row]\n')
        corps = vers_html(reste)
        boite = ('[row]\n\n[col animate="fadeInUp"]\n\n[ux_banner height="500px" height__sm="447px" bg_color="rgba(255, 255, 255, 0)"]\n\n'
                 '[text_box text_color="dark" width="70" width__sm="90" position_x="50" position_y="50"]\n\n'
                 + sur_titre('Votre projet', couleur=ARDOISE)
                 + (f'[ux_text font_size="1.03" font_size__sm="0.69" line_height="1.2" text_color="{VERT}"]\n{h2}\n[/ux_text]\n' if h2 else '')
                 + f'[gap height="8px"]\n\n{corps}\n[gap height="16px"]\n\n{boutons}\n[/text_box]\n\n[/ux_banner]\n\n[/col]\n\n[/row]\n')
        return f'[section bg="{CTA_FOND}" bg_size="original" padding="87px"]\n\n{boite}\n[/section]\n'

    # ------------------------------------------------------------ FORMULAIRE (Contact Form 7)
    def formulaire(self, b):
        md = nettoyer(b['md'], self.j)
        h2, t, reste = separer_titre(md)
        if '| # |' in b['md'] or 'Nom du champ CF7' in b['md']:     # spécification du formulaire (page contact)
            reste = re.split(r'^\|', reste, maxsplit=1, flags=re.M)[0].strip()
        if not self.form_id:
            return self.cta({**b, 'com': 'CTA'})
        self.a_formulaire = True
        texte = vers_html(reste) if reste else ''
        if self.article:
            return self.section(titre_h2(h2) + texte + f'[contact-form-7 id="{self.form_id}"]\n')
        return self.section('[scroll_to title="Devis" link="devis" bullet="false"]\n\n[row v_align="middle"]\n\n'
                            '[col span="5" span__sm="12" padding="0px 48px 0px 0px" padding__sm="0px" animate="fadeInUp"]\n\n'
                            + sur_titre('Votre projet') + (titre_h2(h2) if h2 else '') + f'{texte}\n\n[/col]\n'
                            f'[col span="7" span__sm="12" padding="40px 40px 30px 40px" padding__sm="24px" bg_color="rgb(255,255,255)" bg_radius="30" animate="fadeInUp" depth="5"]\n\n'
                            f'[contact-form-7 id="{self.form_id}"]\n\n[/col]\n\n[/row]\n', 'grise')

    # ------------------------------------------------------------ page de texte simple (pages légales)
    def page_simple(self, b):
        md = nettoyer(b['md'], self.j)
        h1 = re.search(r'^# (.+)$', md, re.M)
        corps = re.sub(r'^# .+$', '', md, count=1, flags=re.M).strip()
        tete = ''
        if h1:
            tete = ('[row]\n\n[col span="9" span__sm="12" animate="fadeInUp"]\n\n'
                    f'[ux_text font_size="2.2" font_size__sm="1.6" line_height="1.2" text_color="{ARDOISE}"]\n<h1>{html.escape(h1.group(1).strip(), quote=False)}</h1>\n[/ux_text]\n\n[/col]\n\n[/row]\n')
        return self.section(tete + f'[row]\n\n[col span="9" span__sm="12"]\n\n{vers_html(corps)}\n\n[/col]\n\n[/row]\n', 'decor')

    def rendre(self, blocs):
        rendus = {'HERO': self.hero, 'ESSENTIEL': self.essentiel, 'SECTION': self.section_bloc, 'PROGRAMME': self.programme,
                  'GALERIE': self.galerie, 'CARTES': self.cartes, 'TABLEAU': self.tableau, 'FAQ': self.faq,
                  'TEMOIGNAGES': self.temoignages, 'CTA': self.cta, 'FORMULAIRE': self.formulaire, 'PAGE_SIMPLE': self.page_simple}
        return ''.join(rendus.get(b['type'], self.section_bloc)(b) for b in blocs)


# ---------------------------------------------------------------- liste des contenus
def contenus():
    fichiers = []
    for f in sorted((RACINE / 'redaction').glob('*/*.md')):
        if '_infos' in f.parts or f.name in ('accueil.md', 'footer-et-menu.md', '00-guide-redaction.md'):
            continue
        fichiers.append(f)
    return fichiers


def generer(fichiers, medias, form_id=None):
    images_pages = {}
    for f in contenus():
        fm, _ = lire(f)
        if fm.get('url') and fm.get('image_principale'):
            images_pages[fm['url'].split(' ')[0]] = fm['image_principale'].strip()
    resultats = []
    SORTIE.mkdir(parents=True, exist_ok=True)
    for f in fichiers:
        fm, blocs = lire(f)
        url = fm['url'].split(' ')[0].strip()
        article = url.startswith('/blog/') and url != '/blog/'
        journal = Journal()
        r = Rendu(fm, medias, journal, article, images_pages, form_id)
        contenu = r.rendre(blocs)
        if not contenu.lstrip().startswith('[ux_banner') and not article:
            journal.note('pas de hero : modèle de page sans header transparent')
        if article and blocs and blocs[0]['type'] == 'HERO':
            journal.note('article : le H1 est le titre de l\'article (thème)')
        cibles = set(re.findall(r'id="([^"]+)"', contenu)) | set(re.findall(r'\[scroll_to [^\]]*link="#?([^"]+)"', contenu))
        def ancre_morte(m):
            journal.note('lien d’ancre retiré (thème absent) : #' + m.group(1))
            return ''
        contenu = re.sub(r'<li><a href="#([^"]+)">[^<]*</a></li>\n?', lambda m: m.group(0) if m.group(1) in cibles else ancre_morte(m), contenu)
        contenu = re.sub(r'(?: · )?<a href="#([^"]+)">[^<]*</a>', lambda m: m.group(0) if m.group(1) in cibles else ancre_morte(m), contenu)
        contenu = contenu.replace('</strong> :  · ', '</strong> : ')
        nom = url.strip('/').replace('/', '__') or 'accueil'
        (SORTIE / f'{nom}.ux.txt').write_text(contenu, encoding='utf-8')
        h1 = fm.get('h1', '').strip().strip('"') or (re.search(r'^# (.+)$', ''.join(b['md'] for b in blocs), re.M) or [None, ''])[1]
        resultats.append({'fichier': str(f.relative_to(RACINE)), 'url': url, 'article': article, 'h1': h1,
                          'image': fm.get('image_principale', '').strip(), 'contenu': contenu, 'journal': list(journal),
                          'sortie': str((SORTIE / f'{nom}.ux.txt').relative_to(RACINE))})
    return resultats


# ---------------------------------------------------------------- envoi sur la préprod
class API:
    def __init__(self):
        self.base = 'https://' + os.environ['WP_URL'].replace('https://', '').rstrip('/') + '/wp-json'
        self.auth = 'Basic ' + base64.b64encode(f"{os.environ['WP_USER']}:{os.environ['WP_APP_PASSWORD']}".encode()).decode()

    def req(self, chemin, donnees=None, methode=None, brut=None, entetes=None):
        h = {'Authorization': self.auth}
        corps = None
        if donnees is not None:
            corps = json.dumps(donnees).encode(); h['Content-Type'] = 'application/json'
        if brut is not None:
            corps = brut; h.update(entetes or {})
        for essai in range(4):
            try:
                r = urllib.request.Request(self.base + chemin, data=corps, headers=h, method=methode or ('POST' if corps else 'GET'))
                return json.load(urllib.request.urlopen(r, timeout=120))
            except urllib.error.HTTPError as e:
                raise RuntimeError(f'{chemin} : HTTP {e.code} {e.read()[:300]}')
            except Exception:
                if essai == 3:
                    raise
                import time; time.sleep(2 ** essai)

    def tout(self, chemin):
        res, page = [], 1
        while True:
            lot = self.req(f'{chemin}{"&" if "?" in chemin else "?"}per_page=100&page={page}')
            res += lot
            if len(lot) < 100:
                return res
            page += 1


def envoyer_medias(api, medias, noms):
    from PIL import Image
    index = {}
    for r in csv.DictReader(open(RACINE / 'contenu/medias.csv', encoding='utf-8')):
        cle = r['url'].split('uploads/')[1].replace('/', '-')
        index.setdefault(cle, r['url'])
    for nom in sorted(noms):
        if nom in medias.ids:
            continue
        ligne = medias.alt.get(nom)
        if not ligne:
            print('  ! pas dans images-alt.csv :', nom); continue
        url = index.get(ligne['fichier_actuel'])
        m_date = re.match(r'(\d{4})-(\d\d)-(.*)', ligne['fichier_actuel'])
        if not url and m_date:   # absent de l'inventaire : adresse reconstruite sur l'ancien site
            url = f'https://www.elios-evasion.fr/wp-content/uploads/{m_date[1]}/{m_date[2]}/{m_date[3]}'
        if not url:
            print('  ! fichier d’origine introuvable :', nom, ligne['fichier_actuel']); continue
        donnees = urllib.request.urlopen(url, timeout=120).read()
        im = Image.open(io.BytesIO(donnees))
        base = nom.rsplit('.', 1)[0]
        if url.lower().endswith('.png') or im.width > 1920:
            im = im.convert('RGB')
            if im.width > 1920:
                im = im.resize((1920, round(im.height * 1920 / im.width)), Image.LANCZOS)
            tampon = io.BytesIO(); im.save(tampon, 'JPEG', quality=90, optimize=True); donnees = tampon.getvalue()
        m = api.req('/wp/v2/media', brut=donnees, entetes={'Content-Disposition': f'attachment; filename={base}.jpg', 'Content-Type': 'image/jpeg'})
        api.req(f'/wp/v2/media/{m["id"]}', {'alt_text': ligne['alt'], 'title': ligne['alt']})
        medias.ids[nom] = m['id']
        MEDIAS_JSON.write_text(json.dumps(medias.ids, indent=1, ensure_ascii=False))
        print(f'  média {m["id"]:4} {nom} ({im.width}×{im.height})')


FORMULAIRE_DEVIS = """<label>Entreprise ou organisme *
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

<p>Les champs marqués d'un astérisque sont obligatoires.</p>"""


def formulaire_devis(api):
    """L'API de Contact Form 7 de la préprod répond mais n'enregistre rien (création et mise à jour testées le 30/10).
    On utilise donc le formulaire existant (id 5) ; son contenu « devis » est à coller dans l'admin (dev/pages/formulaire-devis-cf7.md)."""
    return 5


def titre_page(fm, h1):
    t = (fm.get('title') or '').strip().strip('"')
    t = re.split(r'\s*\|\s*', t)[0] if t else ''
    return t or h1


def envoyer_contenus(api, resultats, fiches):
    pages = {(p['slug'], p['parent']): p['id'] for p in api.tout('/wp/v2/pages?status=any&_fields=id,slug,parent')}
    articles = {p['slug']: p['id'] for p in api.tout('/wp/v2/posts?status=any&_fields=id,slug')}
    ids_url = {'/': 8}
    ordre = sorted(resultats, key=lambda r: (r['article'], r['url'].count('/')))
    for r in ordre:
        fm = fiches[r['url']]
        segments = r['url'].strip('/').split('/')
        slug = segments[-1]
        if r['article']:
            corps = {'title': r['h1'], 'slug': slug, 'content': r['contenu'], 'status': 'publish',
                     'excerpt': (fm.get('meta') or '').strip().strip('"'), 'comment_status': 'closed', 'ping_status': 'closed'}
            img = fm.get('image_principale', '').strip()
            if img in MEDIAS.ids:
                corps['featured_media'] = MEDIAS.ids[img]
            pid = articles.get(slug)
            res = api.req(f'/wp/v2/posts/{pid}' if pid else '/wp/v2/posts', corps)
            print(f'  article {res["id"]:4} {res["link"]}')
            continue
        parent = ids_url.get('/' + '/'.join(segments[:-1]) + '/', 0) if len(segments) > 1 else 0
        corps = {'title': titre_page(fm, r['h1']), 'slug': slug, 'parent': parent, 'content': r['contenu'],
                 'status': 'draft' if r['url'] in PAGES_BROUILLON else 'publish',
                 'template': 'page-transparent-header-light.php' if r['contenu'].lstrip().startswith('[ux_banner') else 'page-blank.php',
                 'excerpt': '', 'comment_status': 'closed', 'ping_status': 'closed'}   # Flatsome affiche l'extrait d'une page en tête de page (page-header-excerpt) : on le laisse vide
        pid = pages.get((slug, parent))
        res = api.req(f'/wp/v2/pages/{pid}' if pid else '/wp/v2/pages', corps)
        ids_url[r['url']] = res['id']
        print(f'  page {res["id"]:4} {res["status"]:8} {res["link"]}')
    return ids_url


if __name__ == '__main__' and '--envoyer' in sys.argv:
    MEDIAS = Medias()
    api = API()
    fichiers = [Path(a) for a in sys.argv[2:]] or contenus()
    generer(fichiers, MEDIAS)                 # 1er passage : liste des médias demandés
    print('Médias…'); envoyer_medias(api, MEDIAS, MEDIAS.demandees)
    print('Formulaire…'); fid = formulaire_devis(api); print('  formulaire CF7', fid)
    res = generer(fichiers, MEDIAS, form_id=fid)
    restants = [r['url'] for r in res if 'MEDIA:' in r['contenu']]
    if restants:
        print('  ! médias non résolus dans :', restants)
    fiches = {}
    for f in fichiers:
        fm, _ = lire(f); fiches[fm['url'].split(' ')[0].strip()] = fm
    print('Pages et articles…'); envoyer_contenus(api, res, fiches)
    rap = ['# Génération des pages : rapport', '', '| Page | Retraits (repères non publiables) |', '|---|---|']
    for r in res:
        rap.append(f"| `{r['url']}` | {len(r['journal'])} |")
    rap += ['', '## Détail des retraits', '']
    for r in res:
        if r['journal']:
            rap.append(f"### `{r['url']}`"); rap += [f'- {j}' for j in r['journal']]; rap.append('')
    RAPPORT.write_text('\n'.join(rap), encoding='utf-8')
    sys.exit(0)

if __name__ == '__main__':
    medias = Medias()
    fichiers = [Path(a) for a in sys.argv[2:]] or contenus()
    res = generer(fichiers, medias, form_id=os.environ.get('CF7_ID', '5'))
    print(f'{len(res)} contenus générés dans {SORTIE.relative_to(RACINE)}')
    manquantes = sorted(n for n in medias.demandees if n not in medias.ids)
    print(f'médias demandés : {len(medias.demandees)} ; à envoyer : {len(manquantes)}')
    for r in res:
        print(f"{r['url']:58} {len(r['contenu']):6} car. | {len(r['journal'])} retraits")
