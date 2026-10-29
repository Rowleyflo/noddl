// Application : routage par ancre (#/…), vues, recherche, checklists, assistant.
(function () {
  "use strict";

  const vue = document.getElementById("vue");
  const { rendre, texteBrut, echapper } = window.KitMarkdown;
  const { memoire } = window.KitOutils;

  if (!window.KIT_DATA) {
    vue.innerHTML = `<section class="page"><h1>Contenu introuvable</h1>
      <p>Le fichier <code>app/data/donnees.js</code> n'a pas été généré. Lancez <code>python3 construire.py</code>
      (ou <code>python3 serveur.py</code>, qui le fait automatiquement).</p></section>`;
    return;
  }

  const DONNEES = window.KIT_DATA;
  const FICHES = DONNEES.fiches;
  const PAR_ID = Object.fromEntries(FICHES.map((f) => [f.id, f]));
  const CATEGORIES = Object.fromEntries(DONNEES.categories.map((c) => [c.id, c]));
  // Le serveur Python est-il là ? (pas en fichier unique ni en file://)
  const AVEC_SERVEUR = !window.KIT_FICHIER_UNIQUE && /^https?:$/.test(location.protocol);

  const normaliser = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  FICHES.forEach((f) => {
    f._brut = texteBrut(f.contenu);
    f._norm = {
      titre: normaliser(f.titre),
      mots: normaliser(f.mots_cles.join(" ")),
      resume: normaliser(f.resume),
      contenu: normaliser(f._brut),
    };
  });

  let nettoyage = null; // fonction appelée en quittant une vue (ex. arrêter le Morse)

  // Mode intégré (aperçu dans une page hôte qui n'accepte pas les ancres « #/… ») :
  // la navigation reste interne, sans toucher à l'adresse.
  const PAR_ANCRE = !window.KIT_INTEGRE;
  let cheminInterne = "";
  const cheminActuel = () => decodeURIComponent(PAR_ANCRE ? location.hash.replace(/^#\/?/, "") : cheminInterne);
  function naviguer(chemin) {
    if (PAR_ANCRE) {
      location.hash = "#/" + chemin;
    } else {
      cheminInterne = chemin;
      router();
    }
  }

  // --- Utilitaires ---------------------------------------------------------

  const carteFiche = (f) => `
    <a class="carte" href="#/fiche/${f.id}">
      <span class="carte-titre">${echapper(f.titre)}${f.risque === "eleve" ? ' <span class="pastille" title="Sujet à risque">!</span>' : ""}</span>
      <span class="carte-texte">${echapper(f.resume)}</span>
    </a>`;

  function page(html) {
    vue.innerHTML = `<section class="page">${html}</section>`;
  }

  // --- Vues ----------------------------------------------------------------

  function fichesUrgence() {
    // FICHES est déjà triée par catégorie puis ordre ; on remet les catégories dans l'ordre d'affichage.
    const rang = Object.fromEntries(DONNEES.categories.map((c, i) => [c.id, i]));
    return FICHES.filter((f) => f.urgence).sort((a, b) => rang[a.categorie] - rang[b.categorie] || a.ordre - b.ordre);
  }

  function vueAccueil() {
    const urgences = fichesUrgence();
    const comptes = {};
    FICHES.forEach((f) => (comptes[f.categorie] = (comptes[f.categorie] || 0) + 1));
    page(`
      <h1 class="visuellement-cache">Accueil</h1>
      <button type="button" class="carte carte-installer" id="installer">
        <span class="carte-titre">📲 Installer l'application</span>
        <span class="carte-texte">Ajoute le kit à l'écran d'accueil : il s'ouvrira ensuite même sans réseau ni Termux.</span>
      </button>
      <h2 class="titre-section">Urgence</h2>
      <div class="grille-urgence">
        ${urgences.map((f) => `<a class="bouton-urgence" href="#/fiche/${f.id}">${echapper(f.titre)}</a>`).join("")}
      </div>
      <h2 class="titre-section">Bibliothèque</h2>
      <div class="grille-categories">
        ${DONNEES.categories.filter((c) => comptes[c.id]).map((c) => `
          <a class="categorie" href="#/categorie/${c.id}">
            <span class="categorie-icone" aria-hidden="true">${c.icone}</span>
            <span>${echapper(c.titre)}</span><small>${comptes[c.id]} fiche${comptes[c.id] > 1 ? "s" : ""}</small>
          </a>`).join("")}
      </div>
      <h2 class="titre-section">Accès rapide</h2>
      <div class="liste-cartes">
        <a class="carte" href="#/checklists"><span class="carte-titre">☑ Checklists</span><span class="carte-texte">Sac d'évacuation, kit 72 h, alerte nucléaire, coupure longue…</span></a>
        <a class="carte" href="#/outil/stocks"><span class="carte-titre">🗃 Mes stocks</span><span class="carte-texte">Inventaire des réserves, dates de péremption, jours d'autonomie.</span></a>
        <a class="carte" href="#/outils"><span class="carte-titre">⚙ Outils</span><span class="carte-texte">Dose de Javel, autonomie, solaire, Morse, soleil et lune.</span></a>
        <a class="carte" href="#/assistant"><span class="carte-titre">✦ Assistant</span><span class="carte-texte">Poser une question : l'IA locale répond à partir des fiches.</span></a>
        <a class="carte" href="#/imprimer"><span class="carte-titre">🖨 Fiches d'urgence sur papier</span><span class="carte-texte">Toutes les fiches d'urgence sur une page, à imprimer et ranger avec la trousse.</span></a>
        <a class="carte" href="#/a-propos"><span class="carte-titre">ⓘ Installer & partager</span><span class="carte-texte">Mettre le kit sur un téléphone, une clé USB, le PC d'un proche.</span></a>
      </div>
      <p class="avertissement">Ce kit ne remplace pas une formation aux premiers secours ni les consignes des autorités.
      Si un réseau fonctionne : <strong>112</strong> (urgences, partout en Europe).</p>`);
  }

  function vueFiches(categorie) {
    const cats = categorie ? [CATEGORIES[categorie]].filter(Boolean) : DONNEES.categories;
    page(`
      <h1>${categorie && CATEGORIES[categorie] ? `${CATEGORIES[categorie].icone} ${echapper(CATEGORIES[categorie].titre)}` : "Toutes les fiches"}</h1>
      ${cats.map((c) => {
        const fiches = FICHES.filter((f) => f.categorie === c.id);
        if (!fiches.length) return "";
        return `${categorie ? "" : `<h2 class="titre-section">${c.icone} ${echapper(c.titre)}</h2>`}
          <div class="liste-cartes">${fiches.map(carteFiche).join("")}</div>`;
      }).join("")}`);
  }

  function vueFiche(id) {
    const f = PAR_ID[id];
    if (!f) return vueIntrouvable();
    const cat = CATEGORIES[f.categorie];
    const html = rendre(f.contenu);
    const sections = [...f.contenu.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
    const voisines = FICHES.filter((x) => x.categorie === f.categorie && x.id !== f.id);
    page(`
      <nav class="fil"><a href="#/categorie/${cat.id}">${cat.icone} ${echapper(cat.titre)}</a></nav>
      <h1>${echapper(f.titre)}</h1>
      <p class="chapeau">${echapper(f.resume)}</p>
      ${f.risque === "eleve" ? `<div class="bandeau-risque" role="note">⚠ Sujet à risque vital. En cas de doute, abstenez-vous ou demandez à une personne formée.</div>` : ""}
      ${sections.length > 3 ? `<details class="sommaire"><summary>Sommaire</summary><ol>${sections.map((s) =>
        `<li><a href="#/fiche/${f.id}/${window.KitMarkdown.slug(s)}">${echapper(s.replace(/[*`]/g, ""))}</a></li>`).join("")}</ol></details>` : ""}
      <article class="contenu">${html}</article>
      ${voisines.length ? `<h2 class="titre-section">Dans la même catégorie</h2><div class="liste-cartes">${voisines.map(carteFiche).join("")}</div>` : ""}`);
  }

  function chercher(requete) {
    const termes = normaliser(requete).split(/[^a-z0-9]+/).filter((t) => t.length > 1);
    if (!termes.length) return [];
    const resultats = [];
    for (const f of FICHES) {
      let score = 0;
      let trouves = 0;
      for (const t of termes) {
        let s = 0;
        if (f._norm.titre.includes(t)) s += 10;
        if (f._norm.mots.includes(t)) s += 6;
        if (f._norm.resume.includes(t)) s += 4;
        const occurrences = f._norm.contenu.split(t).length - 1;
        s += Math.min(occurrences, 5);
        if (s) trouves++;
        score += s;
      }
      if (score) resultats.push({ f, score: score * (trouves / termes.length) ** 2, termes });
    }
    return resultats.sort((a, b) => b.score - a.score);
  }

  function extrait(f, termes) {
    const texte = f._norm.contenu;
    let pos = -1;
    for (const t of termes) {
      pos = texte.indexOf(t);
      if (pos >= 0) break;
    }
    if (pos < 0) return echapper(f.resume);
    // NFD + retrait des accents garde les longueurs : la position vaut pour le texte d'origine.
    const debut = Math.max(0, pos - 70);
    const morceau = (debut ? "…" : "") + f._brut.slice(debut, pos + 130) + "…";
    // Découpage mots / reste : les indices impairs sont les mots, surlignés s'ils contiennent un terme.
    return morceau.split(/([\p{L}\p{N}]+)/u).map((p, i) =>
      i % 2 && termes.some((t) => normaliser(p).includes(t)) ? `<mark>${echapper(p)}</mark>` : echapper(p)).join("");
  }

  function vueRecherche(requete) {
    document.getElementById("champ-recherche").value = requete;
    const resultats = chercher(requete);
    page(`
      <h1>Recherche : « ${echapper(requete)} »</h1>
      ${resultats.length ? `<div class="liste-cartes">${resultats.map(({ f, termes }) => `
        <a class="carte" href="#/fiche/${f.id}">
          <span class="carte-titre">${echapper(f.titre)}</span>
          <span class="carte-texte">${extrait(f, termes)}</span>
        </a>`).join("")}</div>`
        : `<p>Aucune fiche trouvée. Essayez un autre mot, ou posez la question à l'<a href="#/assistant">assistant</a>.</p>`}`);
  }

  // --- Checklists ------------------------------------------------------------

  function vueChecklists() {
    page(`
      <h1>Checklists</h1>
      <p class="chapeau">Cochez au fur et à mesure. L'état est gardé sur cet appareil.</p>
      <div class="liste-cartes">${DONNEES.checklists.map((c) => {
        const total = c.sections.reduce((n, s) => n + s.elements.length, 0);
        const faits = Object.values(memoire.lire("checklist." + c.id, {})).filter(Boolean).length;
        return `<a class="carte" href="#/checklist/${c.id}">
          <span class="carte-titre">${echapper(c.titre)} <small>${faits}/${total}</small></span>
          <span class="carte-texte">${echapper(c.resume)}</span></a>`;
      }).join("")}</div>`);
  }

  function vueChecklist(id) {
    const c = DONNEES.checklists.find((x) => x.id === id);
    if (!c) return vueIntrouvable();
    const cle = "checklist." + c.id;
    const etat = memoire.lire(cle, {});
    page(`
      <nav class="fil"><a href="#/checklists">☑ Checklists</a></nav>
      <h1>${echapper(c.titre)}</h1>
      <p class="chapeau">${echapper(c.resume)}</p>
      <div class="progression"><div class="progression-barre" id="barre"></div></div>
      <p class="note" id="compte"></p>
      ${c.sections.map((s) => `
        ${s.titre ? `<h2>${echapper(s.titre)}</h2>` : ""}
        <ul class="checklist">${s.elements.map((e) => `
          <li><label><input type="checkbox" data-id="${e.id}" ${etat[e.id] ? "checked" : ""}><span>${window.KitMarkdown.rendre(e.texte).replace(/^<p>|<\/p>$/g, "")}</span></label></li>`).join("")}
        </ul>`).join("")}
      <div class="boutons"><button type="button" class="bouton secondaire" id="reinit">Tout décocher</button></div>`);

    const cases = vue.querySelectorAll("input[type=checkbox]");
    const maj = () => {
      const faits = [...cases].filter((x) => x.checked).length;
      vue.querySelector("#barre").style.width = (100 * faits) / cases.length + "%";
      vue.querySelector("#compte").textContent = `${faits} sur ${cases.length}`;
    };
    cases.forEach((x) => x.addEventListener("change", () => {
      etat[x.dataset.id] = x.checked;
      memoire.ecrire(cle, etat);
      maj();
    }));
    // Confirmation par un second clic (les boîtes confirm() sont bloquées dans certains navigateurs intégrés).
    const reinit = vue.querySelector("#reinit");
    let minuteurReinit = null;
    reinit.addEventListener("click", () => {
      if (!minuteurReinit) {
        reinit.textContent = "Confirmer : tout décocher";
        minuteurReinit = setTimeout(() => {
          reinit.textContent = "Tout décocher";
          minuteurReinit = null;
        }, 4000);
        return;
      }
      clearTimeout(minuteurReinit);
      minuteurReinit = null;
      reinit.textContent = "Tout décocher";
      cases.forEach((x) => (x.checked = false));
      memoire.ecrire(cle, {});
      maj();
    });
    maj();
  }

  // --- Outils ----------------------------------------------------------------

  function vueOutils() {
    page(`
      <h1>Outils</h1>
      <div class="liste-cartes">${window.KitOutils.liste.map((o) => `
        <a class="carte" href="#/outil/${o.id}"><span class="carte-titre">${o.icone} ${echapper(o.titre)}</span>
        <span class="carte-texte">${echapper(o.resume)}</span></a>`).join("")}</div>`);
  }

  function vueOutil(id) {
    const o = window.KitOutils.liste.find((x) => x.id === id);
    if (!o) return vueIntrouvable();
    page(`<nav class="fil"><a href="#/outils">⚙ Outils</a></nav><h1>${o.icone} ${echapper(o.titre)}</h1><div id="outil"></div>`);
    const fin = o.rendre(vue.querySelector("#outil"));
    if (typeof fin === "function") nettoyage = fin;
  }

  // --- Assistant ---------------------------------------------------------------

  const conversation = []; // [{role, content, sources?}] gardée tant que la page est ouverte
  let enCours = null;

  function bulle(message) {
    const sources = message.sources && message.sources.length
      ? `<div class="sources">Sources : ${message.sources.map((s, i) =>
        `<a href="#/fiche/${s.fiche}">[${i + 1}] ${echapper(s.titre)}${s.section !== "Introduction" ? " — " + echapper(s.section) : ""}</a>`).join(" ")}</div>`
      : "";
    const corps = message.role === "user" ? `<p>${echapper(message.content)}</p>` : rendre(message.content || "…");
    return `<div class="bulle bulle-${message.role === "user" ? "moi" : "ia"}">${corps}${sources}</div>`;
  }

  function vueAssistant() {
    page(`
      <h1>Assistant</h1>
      <div id="etat-llm" class="note">Vérification de l'IA locale…</div>
      <div id="fil-discussion" class="discussion" aria-live="polite">${conversation.map(bulle).join("")}</div>
      <form id="form-question" class="form-question">
        <textarea id="question" rows="2" placeholder="Ex. : comment purifier l'eau d'un ruisseau ?" required></textarea>
        <button type="submit" class="bouton" id="envoyer">Envoyer</button>
      </form>
      <p class="note">L'assistant répond uniquement à partir des fiches du kit et cite ses sources.
      Il peut se tromper : vérifiez toujours dans la fiche citée, surtout pour la santé et l'alimentation.</p>`);

    const etatLlm = vue.querySelector("#etat-llm");
    const formulaire = vue.querySelector("#form-question");
    const champ = vue.querySelector("#question");
    const fil = vue.querySelector("#fil-discussion");

    if (!AVEC_SERVEUR) {
      if (window.KIT_INTEGRE && !conversation.length) {
        fil.innerHTML = `<p class="note">Exemple de conversation, pour l'aperçu :</p>` + [
          { role: "user", content: "Comment purifier l'eau d'un ruisseau ?" },
          {
            role: "assistant",
            content: "1. **Clarifiez** l'eau : laissez reposer, puis filtrez à travers un tissu propre plié [1].\n" +
              "2. **Faites bouillir 1 minute** à gros bouillons : c'est la méthode la plus sûre [2].\n" +
              "3. Sans combustible : **4 gouttes de Javel à 2,6 %** par litre, attendez 30 minutes. " +
              "L'eau doit garder une légère odeur de chlore [3].",
            sources: [
              { fiche: "eau-purifier", titre: "Purifier l'eau", section: "Étape 1 : clarifier" },
              { fiche: "eau-purifier", titre: "Purifier l'eau", section: "Étape 2 : désinfecter › Ébullition" },
              { fiche: "eau-purifier", titre: "Purifier l'eau", section: "Étape 2 : désinfecter › Eau de Javel" },
            ],
          },
        ].map(bulle).join("");
      }
      etatLlm.innerHTML = `L'assistant a besoin du serveur du kit sur un PC (<code>python3 serveur.py</code>) et d'un modèle d'IA local.
        Ici, utilisez la <a href="#/">bibliothèque</a> et la recherche, qui marchent sans serveur.`;
      formulaire.hidden = true;
      return;
    }

    fetch("api/etat").then((r) => r.json()).then((etat) => {
      etatLlm.innerHTML = etat.llm && etat.modele
        ? `IA locale prête — modèle <strong>${echapper(etat.modele)}</strong>.`
        : `Aucune IA locale détectée. Installez <strong>Ollama</strong> puis un modèle (voir « Installer & partager »).
           La bibliothèque reste utilisable.`;
    }).catch(() => (etatLlm.textContent = "Serveur du kit injoignable : la bibliothèque reste utilisable hors ligne."));

    champ.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formulaire.requestSubmit();
      }
    });

    formulaire.addEventListener("submit", async (e) => {
      e.preventDefault();
      const question = champ.value.trim();
      if (!question || enCours) return;
      champ.value = "";
      const historique = conversation.map(({ role, content }) => ({ role, content }));
      conversation.push({ role: "user", content: question });
      const reponse = { role: "assistant", content: "", sources: [] };
      conversation.push(reponse);
      const afficher = () => {
        if (!document.body.contains(fil)) return; // on a quitté la page
        fil.innerHTML = conversation.map(bulle).join("");
        fil.lastElementChild.scrollIntoView({ block: "end" });
      };
      afficher();
      vue.querySelector("#envoyer").disabled = true;
      enCours = new AbortController();
      try {
        const r = await fetch("api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, historique }),
          signal: enCours.signal,
        });
        if (!r.ok) {
          const erreur = await r.json().catch(() => ({}));
          throw new Error(erreur.erreur || `erreur ${r.status}`);
        }
        const lecteur = r.body.getReader();
        const decodeur = new TextDecoder();
        let tampon = "";
        for (;;) {
          const { value, done } = await lecteur.read();
          if (done) break;
          tampon += decodeur.decode(value, { stream: true });
          const evenements = tampon.split("\n\n");
          tampon = evenements.pop();
          for (const ev of evenements) {
            if (!ev.startsWith("data:")) continue;
            const d = JSON.parse(ev.slice(5));
            if (d.type === "sources") reponse.sources = d.sources;
            else if (d.type === "texte") reponse.content += d.texte;
            else if (d.type === "erreur") reponse.content += `\n\n> [!ATTENTION]\n> ${d.message}`;
          }
          afficher();
        }
      } catch (erreur) {
        if (erreur.name !== "AbortError") reponse.content += `\n\n> [!ATTENTION]\n> ${erreur.message}`;
      } finally {
        enCours = null;
        afficher();
        const bouton = vue.querySelector("#envoyer");
        if (bouton) bouton.disabled = false;
      }
    });
  }

  // --- À propos ----------------------------------------------------------------

  function vueAPropos() {
    const adresse = AVEC_SERVEUR ? location.origin : null;
    page(`
      <h1>Installer & partager</h1>
      <h2>Sur un téléphone</h2>
      <ol>
        <li><strong>Android, kit complet</strong> : avec l'application Termux, tout tourne dans le téléphone, assistant compris
          (guide <code>docs/ANDROID.md</code>). Ensuite, depuis l'accueil, « Installer l'application » : elle s'ouvre même sans réseau.</li>
        <li><strong>Fichier unique (le plus simple, marche partout)</strong> : enregistrez
          ${AVEC_SERVEUR ? `<a href="telecharger" download>kit-survie.html</a>` : "<code>dist/kit-survie.html</code>"}
          sur le téléphone et ouvrez-le avec le navigateur. Fiches, checklists et outils fonctionnent sans réseau ni PC.</li>
        <li><strong>Via le PC</strong> : sur le même Wi-Fi que le PC qui fait tourner le serveur${adresse ? `, ouvrez <code>${echapper(adresse)}</code>` : ""}.
          Tout fonctionne, assistant compris, tant que le PC est allumé. Sans box Internet, activez le <em>partage de connexion</em>
          du téléphone et connectez-y le PC : ça crée un réseau local, même sans données mobiles.</li>
        <li><strong>Cartes</strong> : installez <em>Organic Maps</em> et téléchargez les cartes de votre pays et des pays voisins <strong>maintenant</strong>.</li>
      </ol>
      <h2>Sur un PC</h2>
      <ol>
        <li>Installez Python 3, puis dans le dossier du kit : <code>python3 serveur.py</code>.</li>
        <li>Pour l'assistant : installez <strong>Ollama</strong> (ollama.com) et un modèle, par exemple
          <code>ollama pull qwen3:8b</code> (PC 16 Go) ou <code>ollama pull qwen3:4b</code> (PC 8 Go).</li>
      </ol>
      <h2>Multiplier les copies</h2>
      <p>Copiez tout le dossier du kit, avec Ollama et les modèles, sur une clé USB ou un disque externe, et donnez une copie à chaque foyer.
      Gardez-en une hors ligne, débranchée. Une page imprimée des fiches d'urgence ne tombe jamais en panne de batterie.</p>
      <h2>Avertissement</h2>
      <p>Les fiches suivent les recommandations publiées (OMS, CDC, Croix-Rouge, ERC, ANSM), mais rien ne remplace une formation
      (PSC1 en France) et l'avis d'un professionnel quand il est joignable. Les auteurs ne peuvent être tenus responsables de l'usage du contenu.</p>`);
  }

  function vueImprimer() {
    const urgences = fichesUrgence();
    page(`
      <h1>Fiches d'urgence sur papier</h1>
      <p class="chapeau">${urgences.length} fiches, une par page à l'impression. Une copie papier ne tombe jamais en panne de batterie :
      rangez-la avec la trousse de secours et dans chaque sac d'évacuation.</p>
      ${window.KIT_INTEGRE ? "" : `<div class="boutons"><button type="button" class="bouton" id="imprimer">Imprimer</button></div>`}
      ${urgences.map((f) => `
        <article class="contenu fiche-imprimable">
          <h1>${echapper(f.titre)}</h1>
          <p class="chapeau">${echapper(f.resume)}</p>
          ${rendre(f.contenu)}
        </article>`).join("")}`);
    const bouton = vue.querySelector("#imprimer");
    if (bouton) bouton.addEventListener("click", () => window.print());
  }

  function vueIntrouvable() {
    page(`<h1>Page introuvable</h1><p><a href="#/">Retour à l'accueil</a></p>`);
  }

  // --- Routage -----------------------------------------------------------------

  function router() {
    if (nettoyage) {
      nettoyage();
      nettoyage = null;
    }
    const chemin = cheminActuel();
    const [section, param, ancre] = chemin.split("/");
    const routes = {
      "": vueAccueil,
      fiches: () => vueFiches(),
      categorie: () => vueFiches(param),
      fiche: () => vueFiche(param),
      checklists: vueChecklists,
      checklist: () => vueChecklist(param),
      outils: vueOutils,
      outil: () => vueOutil(param),
      assistant: vueAssistant,
      "a-propos": vueAPropos,
      imprimer: vueImprimer,
      recherche: () => vueRecherche(chemin.slice("recherche/".length)),
    };
    (routes[section] || vueIntrouvable)();

    const onglet = { "": "accueil", categorie: "fiches", fiche: "fiches", checklist: "checklists", outil: "outils" }[section] ?? section;
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("actif", a.dataset.nav === onglet));
    if (section !== "recherche") document.getElementById("champ-recherche").value = "";

    const cible = ancre && document.getElementById(ancre);
    if (cible) cible.scrollIntoView();
    else window.scrollTo(0, 0);
  }

  document.getElementById("form-recherche").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("champ-recherche").value.trim();
    if (q) naviguer("recherche/" + encodeURIComponent(q));
  });

  if (!PAR_ANCRE) {
    document.addEventListener("click", (e) => {
      const lien = e.target.closest('a[href^="#/"]');
      if (!lien) return;
      e.preventDefault();
      naviguer(lien.getAttribute("href").slice(2));
    });
  }

  // Thème : automatique (système) → sombre → clair. Sans choix mémorisé, on ne touche pas
  // à l'attribut : une page hôte peut l'avoir posé.
  const racine = document.documentElement;
  const appliquerTheme = (t) => (t ? racine.setAttribute("data-theme", t) : racine.removeAttribute("data-theme"));
  const themeMemorise = memoire.lire("theme", null);
  if (themeMemorise) appliquerTheme(themeMemorise);
  document.getElementById("bouton-theme").addEventListener("click", () => {
    const suivant = { null: "dark", dark: "light", light: null }[String(memoire.lire("theme", null))];
    memoire.ecrire("theme", suivant);
    appliquerTheme(suivant);
  });

  // Installation comme application (Chrome Android) : Chrome signale quand c'est possible.
  let invitationInstallation = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    invitationInstallation = e;
    document.body.classList.add("installable");
  });
  window.addEventListener("appinstalled", () => document.body.classList.remove("installable"));
  document.addEventListener("click", async (e) => {
    if (!e.target.closest("#installer") || !invitationInstallation) return;
    invitationInstallation.prompt();
    await invitationInstallation.userChoice;
    invitationInstallation = null;
    document.body.classList.remove("installable");
  });

  if (PAR_ANCRE) window.addEventListener("hashchange", router);
  router();

  if (AVEC_SERVEUR && "serviceWorker" in navigator && window.isSecureContext) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
