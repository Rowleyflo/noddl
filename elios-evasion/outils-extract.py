import json, os, re, sys
from bs4 import BeautifulSoup, NavigableString

crawl, out = sys.argv[1], sys.argv[2]
os.makedirs(os.path.join(out, "pages"), exist_ok=True)

pages = json.load(open(os.path.join(crawl, "pages.json"))) + json.load(open(os.path.join(crawl, "posts.json")))
by_id = {p["id"]: p for p in pages}

BLOCK = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote", "img", "a", "rs-layer", "figcaption", "td", "th", "label"}


def clean(t):
    return re.sub(r"\s+", " ", t).strip()


def img_src(img):
    for k in ("data-lazyload", "data-src", "src"):
        v = img.get(k)
        if v and not v.startswith("data:") and "dummy" not in v:
            return v
    return None


def walk(node, lines, seen_imgs):
    for el in node.children:
        if isinstance(el, NavigableString) or el.name is None:
            continue
        if el.name in ("script", "style", "noscript", "form", "svg"):
            if el.name == "form":
                fields = [f.get("name") for f in el.find_all(["input", "textarea", "select"]) if f.get("name") and not f.get("name").startswith("_")]
                lines.append(f"- **[Formulaire]** champs : {', '.join(fields)}")
            continue
        n = el.name
        if n in ("h1", "h2", "h3", "h4", "h5", "h6"):
            t = clean(el.get_text(" "))
            if t:
                lines.append(f"{'#' * (int(n[1]) + 1)} {t}  _(<{n}>)_")
        elif n in ("p", "blockquote", "figcaption", "rs-layer"):
            for im in el.find_all("img"):
                add_img(im, lines, seen_imgs)
            t = clean(el.get_text(" "))
            if t:
                lines.append(("> " if n == "blockquote" else "") + t)
            for a in el.find_all("a", href=True):
                lines.append(f"  - lien : [{clean(a.get_text(' ')) or '(sans texte)'}]({a['href']})")
        elif n == "li":
            t = clean(el.get_text(" "))
            if t:
                lines.append(f"- {t}")
        elif n == "img":
            add_img(el, lines, seen_imgs)
        elif n == "a" and ("qbutton" in " ".join(el.get("class", [])) or "vc_btn" in " ".join(el.get("class", []))):
            lines.append(f"- **[Bouton]** {clean(el.get_text(' '))} → {el.get('href')}")
        else:
            style = el.get("style", "") or ""
            m = re.search(r"background-image:\s*url\(['\"]?([^'\")]+)", style)
            if m:
                lines.append(f"- **[Image de fond]** {m.group(1)}")
            for k in ("data-video-bg", "data-vc-video-bg"):
                if el.get(k):
                    lines.append(f"- **[Vidéo de fond]** {el.get(k)}")
            if el.name == "iframe":
                lines.append(f"- **[iframe]** {el.get('src')}")
            if el.name == "video":
                s = el.find("source")
                lines.append(f"- **[Vidéo]** {(s or el).get('src')}")
            if "vc_row" in " ".join(el.get("class", [])) and el.parent and "vc_row" not in " ".join(el.parent.get("class", [])):
                lines.append("\n---\n")
            walk(el, lines, seen_imgs)


def add_img(im, lines, seen):
    s = img_src(im)
    if s:
        seen.add(s)
        lines.append(f"- **[Image]** {s}  — alt : \"{im.get('alt', '')}\"")


inventory = []
images_all = {}
for pid, p in sorted(by_id.items(), key=lambda kv: kv[1]["link"]):
    path = os.path.join(crawl, "html", f"{pid}.html")
    soup = BeautifulSoup(open(path, encoding="utf-8").read(), "html.parser")
    y = p.get("yoast_head_json") or {}
    title = clean(BeautifulSoup(p["title"]["rendered"], "html.parser").get_text())
    rel = p["link"].replace("https://www.elios-evasion.fr", "") or "/"
    lines = [f"# {title}", "", f"- **URL** : {rel}", f"- **ID WP** : {pid} — parent : {p.get('parent', 0)} — modèle : {p.get('template') or 'défaut'} — modifié le {p['modified'][:10]}",
             f"- **Title SEO** : {y.get('title', '')}", f"- **Meta description** : {y.get('description') or ('(aucune — Google/Facebook récupèrent du code WPBakery brut : « ' + y['og_description'][:60] + '… »)' if y.get('og_description') else '(aucune)')}",
             f"- **Robots** : {', '.join(f'{k}={v}' for k, v in (y.get('robots') or {}).items())}", f"- **Canonical** : {y.get('canonical', '')}"]
    ogi = y.get("og_image") or []
    if ogi:
        lines.append(f"- **Image OG** : {ogi[0].get('url')}")
    lines += ["", "## Contenu", ""]
    seen = set()
    main = soup.select_one(".content_inner") or soup.body
    # skip title area and sidebar duplicates handled by walk
    walk(main, lines, seen)
    text = "\n".join(lines)
    text = re.sub(r"(\n---\n\s*){2,}", "\n---\n\n", text)
    fname = (rel.strip("/").replace("/", "__") or "accueil") + ".md"
    open(os.path.join(out, "pages", fname), "w").write(text + "\n")
    words = len(clean(main.get_text(" ")).split())
    h1 = [clean(h.get_text(" ")) for h in main.find_all("h1")]
    inventory.append({"url": rel, "id": pid, "parent": p.get("parent", 0), "titre": title, "seo_title": y.get("title", ""),
                      "meta_desc": y.get("description", ""), "robots": (y.get("robots") or {}).get("index", ""), "mots": words,
                      "h1": " | ".join(h1), "images": len(seen), "fichier": fname, "modifie": p["modified"][:10]})
    for s in seen:
        images_all.setdefault(s, []).append(rel)

json.dump(inventory, open(os.path.join(out, "inventory.json"), "w"), ensure_ascii=False, indent=1)
json.dump(images_all, open(os.path.join(out, "images_by_page.json"), "w"), ensure_ascii=False, indent=1)

# Navigation + footer from home
home = BeautifulSoup(open(os.path.join(crawl, "html", "12.html"), encoding="utf-8").read(), "html.parser")
nav = ["# Navigation & footer (site actuel)", "", "## Menu principal", ""]


def menu(ul, depth=0):
    for li in ul.find_all("li", recursive=False):
        a = li.find("a")
        nav.append("  " * depth + f"- {clean(a.get_text(' '))} → {a.get('href')}")
        sub = li.find("ul")
        if sub:
            menu(sub, depth + 1)


mm = home.select_one(".main_menu > ul")
if mm:
    menu(mm)
nav += ["", "## Footer", ""]
for col in home.select("footer .footer_top [class*=footer_col]"):
    t = [clean(x.get_text(" ")) for x in col.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "span", "a"]) if clean(x.get_text(" "))]
    if t:
        nav.append("- " + " / ".join(dict.fromkeys(t)))
    for a in col.find_all("a", href=True):
        nav.append(f"  - lien : {clean(a.get_text(' '))} → {a['href']}")
fb = home.select_one(".footer_bottom_holder")
if fb:
    nav.append("- Bas de footer : " + clean(fb.get_text(" ")))
    for a in fb.find_all("a", href=True):
        nav.append(f"  - lien : {clean(a.get_text(' '))} → {a['href']}")
hd = home.select_one("header")
if hd:
    logo = hd.select_one(".logo_wrapper img, .q_logo img")
    if logo:
        nav.append(f"\n## Logo\n- {img_src(logo)}")
    for a in hd.find_all("a", href=re.compile(r"^(tel:|mailto:|https?://(www\.)?(facebook|instagram|linkedin|youtube))")):
        nav.append(f"- Header lien : {a['href']}")
open(os.path.join(out, "navigation.md"), "w").write("\n".join(nav) + "\n")
print(len(inventory), "pages", len(images_all), "images référencées")
