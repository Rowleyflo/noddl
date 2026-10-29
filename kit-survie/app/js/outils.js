// Outils pratiques : calculateurs et aides qui fonctionnent sans réseau.
(function () {
  "use strict";

  const memoire = {
    lire(cle, defaut) {
      try {
        const v = localStorage.getItem("kit." + cle);
        return v === null ? defaut : JSON.parse(v);
      } catch (e) {
        return defaut;
      }
    },
    ecrire(cle, valeur) {
      try {
        localStorage.setItem("kit." + cle, JSON.stringify(valeur));
      } catch (e) { /* stockage indisponible : on continue sans mémoriser */ }
    },
  };

  const nombre = (v) => {
    const n = parseFloat(String(v).replace(",", "."));
    return isFinite(n) ? n : 0;
  };
  const fr = (n, dec = 0) => n.toLocaleString("fr-FR", { maximumFractionDigits: dec, minimumFractionDigits: 0 });

  // --- Javel --------------------------------------------------------------

  // Dose visée : ~5 mg de chlore actif par litre (eau claire), doublée si l'eau est trouble.
  // Ordre de grandeur des recommandations CDC/OMS pour la désinfection d'urgence.
  const DOSE_MG_L = 5;
  const ML_PAR_GOUTTE = 0.05;

  function outilJavel(el) {
    const etat = memoire.lire("javel", { concentration: "2.6", autre: "", volume: "1", trouble: false });
    el.innerHTML = `
      <div class="formulaire">
        <label>Concentration indiquée sur l'étiquette (« % de chlore actif »)
          <select id="j-conc">
            <option value="2.6">2,6 % — eau de Javel en bouteille (courant)</option>
            <option value="3.6">3,6 %</option>
            <option value="9.6">9,6 % — Javel concentrée (berlingot)</option>
            <option value="autre">Autre…</option>
          </select>
        </label>
        <label id="j-autre-l" hidden>Concentration (%)
          <input id="j-autre" inputmode="decimal" placeholder="ex. 5">
        </label>
        <label>Volume d'eau à traiter (litres)
          <input id="j-vol" inputmode="decimal">
        </label>
        <label class="case"><input type="checkbox" id="j-trouble"> L'eau est trouble ou très froide</label>
      </div>
      <div class="resultat" id="j-res" aria-live="polite"></div>
      <div class="encadre encadre-danger" role="note"><p class="encadre-titre">Uniquement de la Javel nature</p>
        <p>Jamais de Javel parfumée, « gel », « avec détergent » ou anti-calcaire. Filtrez d'abord l'eau trouble
        (tissu, filtre à café). La Javel ne tue pas tous les parasites (cryptosporidium) : l'ébullition reste la méthode la plus sûre.</p></div>
      <p class="note">Voir la fiche <a href="#/fiche/eau-purifier">Purifier l'eau</a>.</p>`;

    const conc = el.querySelector("#j-conc");
    const autre = el.querySelector("#j-autre");
    const vol = el.querySelector("#j-vol");
    const trouble = el.querySelector("#j-trouble");
    conc.value = etat.concentration;
    autre.value = etat.autre;
    vol.value = etat.volume;
    trouble.checked = etat.trouble;

    function calculer() {
      el.querySelector("#j-autre-l").hidden = conc.value !== "autre";
      memoire.ecrire("javel", { concentration: conc.value, autre: autre.value, volume: vol.value, trouble: trouble.checked });
      const pourcent = conc.value === "autre" ? nombre(autre.value) : nombre(conc.value);
      const litres = nombre(vol.value);
      const res = el.querySelector("#j-res");
      if (pourcent <= 0 || litres <= 0) {
        res.innerHTML = "<p>Indiquez la concentration et le volume.</p>";
        return;
      }
      const dose = DOSE_MG_L * (trouble.checked ? 2 : 1);
      const ml = (dose * litres) / (pourcent * 10); // 1 % = 10 mg/mL
      const gouttes = Math.max(1, Math.round(ml / ML_PAR_GOUTTE));
      const attente = trouble.checked ? "1 heure" : "30 minutes";
      let quantite;
      if (ml < 1) quantite = `<strong>${gouttes} goutte${gouttes > 1 ? "s" : ""}</strong> (${fr(ml, 2)} mL)`;
      else if (ml < 15) quantite = `<strong>${fr(ml, 1)} mL</strong> (≈ ${gouttes} gouttes, ≈ ${fr(ml / 5, 1)} cuillère à café)`;
      else quantite = `<strong>${fr(ml, 0)} mL</strong> (≈ ${fr(ml / 15, 1)} cuillère${ml >= 30 ? "s" : ""} à soupe)`;
      res.innerHTML = `
        <p class="grand">${quantite}</p>
        <ol>
          <li>Ajoutez la Javel, mélangez, couvrez.</li>
          <li>Attendez <strong>${attente}</strong> à l'abri du soleil.</li>
          <li>Sentez : l'eau doit avoir une <strong>légère odeur de chlore</strong>. Sinon, remettez la même dose
          et attendez encore 15 minutes. Si toujours rien, la Javel est éventée : changez de méthode.</li>
        </ol>
        <p class="note">Une goutte ≈ 0,05 mL, mais cela varie selon le flacon : une seringue graduée est plus précise.
        La Javel perd de sa force avec le temps (les berlingots se diluent dans les 3 mois suivant la fabrication).</p>`;
    }
    [conc, autre, vol, trouble].forEach((c) => c.addEventListener("input", calculer));
    calculer();
  }

  // --- Autonomie eau et nourriture -----------------------------------------

  const ALIMENTS = [
    ["riz", "Riz blanc (sec)", 3600],
    ["pates", "Pâtes (sèches)", 3600],
    ["lentilles", "Lentilles, pois chiches (secs)", 3500],
    ["haricots", "Haricots secs", 3400],
    ["farine", "Farine de blé", 3400],
    ["avoine", "Flocons d'avoine", 3700],
    ["sucre", "Sucre", 4000],
    ["miel", "Miel, confiture", 2900],
    ["huile", "Huile", 9000],
    ["lait", "Lait en poudre entier", 4900],
    ["noix", "Noix, amandes, cacahuètes", 6000],
    ["chocolat", "Chocolat noir", 5500],
    ["poisson", "Conserves de poisson à l'huile", 2000],
    ["plats", "Plats cuisinés en conserve", 1200],
    ["legumes", "Conserves de légumes", 300],
    ["pdt", "Pommes de terre (fraîches)", 770],
  ];

  function outilAutonomie(el) {
    const etat = memoire.lire("autonomie", { adultes: "2", enfants: "0", eau: "", eauJour: "3", aliments: {} });
    el.innerHTML = `
      <div class="formulaire grille-2">
        <label>Adultes <input id="a-adultes" inputmode="numeric"></label>
        <label>Enfants <input id="a-enfants" inputmode="numeric"></label>
        <label>Eau stockée (litres) <input id="a-eau" inputmode="decimal"></label>
        <label>Litres / personne / jour <input id="a-eaujour" inputmode="decimal"></label>
      </div>
      <h3>Nourriture en stock (kg)</h3>
      <div class="formulaire grille-2" id="a-aliments">
        ${ALIMENTS.map(([id, nom, kcal]) => `<label>${nom} <small>${fr(kcal)} kcal/kg</small><input data-aliment="${id}" inputmode="decimal" placeholder="0"></label>`).join("")}
      </div>
      <div class="resultat" id="a-res" aria-live="polite"></div>
      <p class="note">Base de calcul : 2 000 kcal/jour par adulte, 1 500 par enfant (davantage en cas d'effort physique ou de froid).
      Minimum vital en eau : 2 L/jour pour boire, 3 L avec la cuisine et un peu d'hygiène. Les calories ne suffisent pas :
      variez (protéines, fruits et légumes) pour éviter les carences.</p>`;

    const champs = {
      adultes: el.querySelector("#a-adultes"),
      enfants: el.querySelector("#a-enfants"),
      eau: el.querySelector("#a-eau"),
      eauJour: el.querySelector("#a-eaujour"),
    };
    Object.entries(champs).forEach(([cle, champ]) => (champ.value = etat[cle]));
    const entreesAliments = el.querySelectorAll("[data-aliment]");
    entreesAliments.forEach((e) => (e.value = etat.aliments[e.dataset.aliment] || ""));

    function calculer() {
      const nouvel = { aliments: {} };
      Object.entries(champs).forEach(([cle, champ]) => (nouvel[cle] = champ.value));
      let kcal = 0;
      entreesAliments.forEach((e) => {
        if (e.value) nouvel.aliments[e.dataset.aliment] = e.value;
        const aliment = ALIMENTS.find((a) => a[0] === e.dataset.aliment);
        kcal += nombre(e.value) * aliment[2];
      });
      memoire.ecrire("autonomie", nouvel);

      const adultes = nombre(champs.adultes.value);
      const enfants = nombre(champs.enfants.value);
      const personnes = adultes + enfants;
      const res = el.querySelector("#a-res");
      if (personnes <= 0) {
        res.innerHTML = "<p>Indiquez le nombre de personnes.</p>";
        return;
      }
      const besoinKcal = adultes * 2000 + enfants * 1500;
      const joursEau = nombre(champs.eau.value) / (personnes * Math.max(nombre(champs.eauJour.value), 0.1));
      const joursNourriture = kcal / besoinKcal;
      const ligne = (titre, jours, detail) => {
        const classe = jours < 3 ? "alerte" : jours < 14 ? "moyen" : "ok";
        return `<div class="jauge jauge-${classe}"><span>${titre}</span><strong>${fr(Math.floor(jours))} jour${Math.floor(jours) > 1 ? "s" : ""}</strong><small>${detail}</small></div>`;
      };
      res.innerHTML =
        ligne("Eau", joursEau, `${fr(nombre(champs.eau.value))} L pour ${fr(personnes)} pers.`) +
        ligne("Nourriture", joursNourriture, `${fr(kcal)} kcal, besoin ${fr(besoinKcal)} kcal/jour`);
    }
    el.querySelectorAll("input").forEach((c) => c.addEventListener("input", calculer));
    calculer();
  }

  // --- Stocks et péremptions ------------------------------------------------

  const TYPES_STOCK = [
    ...ALIMENTS.map(([id, nom, kcal]) => ({ id, nom, unite: "kg", kcal })),
    { id: "eau", nom: "Eau", unite: "L" },
    { id: "medicament", nom: "Médicament", unite: "boîte(s)" },
    { id: "hygiene", nom: "Hygiène", unite: "unité(s)" },
    { id: "energie", nom: "Piles, combustible, énergie", unite: "unité(s)" },
    { id: "autre", nom: "Autre", unite: "unité(s)" },
  ];
  const TYPE_PAR_ID = Object.fromEntries(TYPES_STOCK.map((t) => [t.id, t]));

  const isoDans = (jours) => new Date(Date.now() + jours * 864e5).toISOString().slice(0, 10);
  const nouvelId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  // Affichés seulement dans l'aperçu intégré, pour montrer l'outil rempli.
  const EXEMPLES_STOCK = [
    ["Riz (exemple)", "riz", 5, 540, "Cellier"],
    ["Lentilles (exemple)", "lentilles", 2, 400, "Cellier"],
    ["Huile d'olive (exemple)", "huile", 1, 200, "Cuisine"],
    ["Thon à l'huile (exemple)", "poisson", 1.2, 25, "Cellier"],
    ["Eau en bouteilles (exemple)", "eau", 36, 300, "Garage"],
    ["Paracétamol 500 mg (exemple)", "medicament", 2, -10, "Trousse"],
    ["Piles AA lithium (exemple)", "energie", 24, 3000, "Sac d'évacuation"],
  ].map(([nom, type, quantite, jours, lieu]) => ({ id: nouvelId(), nom, type, quantite, peremption: isoDans(jours), lieu }));

  function etatPeremption(date) {
    if (!date) return { classe: "sans", texte: "Sans date", jours: Infinity };
    const aujourdhui = new Date(new Date().toISOString().slice(0, 10));
    const jours = Math.round((new Date(date) - aujourdhui) / 864e5);
    const mois = new Date(date).toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
    if (jours < 0) return { classe: "perime", texte: `Périmé depuis ${-jours} j`, jours };
    if (jours <= 30) return { classe: "bientot", texte: jours === 0 ? "Périme aujourd'hui" : `Dans ${jours} j`, jours };
    if (jours <= 90) return { classe: "surveiller", texte: `Dans ${jours} j`, jours };
    return { classe: "ok", texte: mois, jours };
  }

  function outilStocks(el) {
    let stocks = memoire.lire("stocks", null);
    if (!Array.isArray(stocks)) stocks = window.KIT_INTEGRE ? EXEMPLES_STOCK : [];
    const enregistrer = () => memoire.ecrire("stocks", stocks);
    const echapper = window.KitMarkdown.echapper;

    el.innerHTML = `
      <div class="resultat" id="st-bilan" aria-live="polite"></div>
      <details class="sommaire" id="st-ajout" ${stocks.length ? "" : "open"}>
        <summary>Ajouter un article</summary>
        <form class="formulaire grille-2" id="st-form">
          <label>Article <input id="st-nom" required placeholder="ex. Riz basmati" autocomplete="off"></label>
          <label>Type
            <select id="st-type">${TYPES_STOCK.map((t) => `<option value="${t.id}">${echapper(t.nom)}</option>`).join("")}</select>
          </label>
          <label>Quantité (<span id="st-unite">kg</span>) <input id="st-qte" inputmode="decimal" required placeholder="ex. 2"></label>
          <label>Date de péremption <input type="date" id="st-date"></label>
          <label>Emplacement <input id="st-lieu" placeholder="ex. Cave, sac d'évacuation" autocomplete="off"></label>
          <div class="champ-bouton"><button type="submit" class="bouton">Ajouter</button></div>
        </form>
      </details>
      <ul class="stocks" id="st-liste"></ul>
      <div class="boutons">
        ${window.KIT_INTEGRE ? "" : `<button type="button" class="bouton secondaire" id="st-exporter">Sauvegarder (fichier)</button>`}
        <label class="bouton secondaire" for="st-fichier">Importer une sauvegarde</label>
        <input type="file" id="st-fichier" accept=".json,application/json" hidden>
      </div>
      <p class="note" id="st-message" aria-live="polite"></p>
      <p class="note">Les stocks sont gardés <strong>sur cet appareil</strong>. Faites une sauvegarde de temps en temps
      et partagez-la avec la famille. Le nombre de personnes et la consommation d'eau viennent de l'outil
      <a href="#/outil/autonomie">Autonomie</a>.</p>`;

    const liste = el.querySelector("#st-liste");
    const type = el.querySelector("#st-type");
    const message = (texte) => (el.querySelector("#st-message").textContent = texte);
    type.addEventListener("change", () => (el.querySelector("#st-unite").textContent = TYPE_PAR_ID[type.value].unite));

    function afficher() {
      const tries = [...stocks].sort((a, b) => etatPeremption(a.peremption).jours - etatPeremption(b.peremption).jours);
      liste.innerHTML = tries.length ? tries.map((s) => {
        const t = TYPE_PAR_ID[s.type] || TYPE_PAR_ID.autre;
        const e = etatPeremption(s.peremption);
        return `<li class="stock">
          <div class="stock-info"><strong>${echapper(s.nom)}</strong><small>${echapper(t.nom)}${s.lieu ? " · " + echapper(s.lieu) : ""}</small></div>
          <label class="stock-qte"><input data-qte="${s.id}" inputmode="decimal" value="${s.quantite}" aria-label="Quantité de ${echapper(s.nom)}"> ${t.unite}</label>
          <span class="etat etat-${e.classe}">${e.texte}</span>
          <button type="button" class="bouton-suppr" data-suppr="${s.id}" aria-label="Supprimer ${echapper(s.nom)}">✕</button>
        </li>`;
      }).join("") : `<li class="stock-vide">Aucun article pour l'instant. Ajoutez vos réserves avec le formulaire ci-dessus :
        nourriture, eau, médicaments, piles. Les dates les plus proches s'afficheront en premier.</li>`;
      bilan();
    }

    function bilan() {
      const reglages = memoire.lire("autonomie", {});
      const adultes = nombre(reglages.adultes ?? 2);
      const enfants = nombre(reglages.enfants ?? 0);
      const personnes = Math.max(adultes + enfants, 1);
      const besoinKcal = Math.max(adultes * 2000 + enfants * 1500, 1500);
      const eauJour = Math.max(nombre(reglages.eauJour ?? 3), 0.1);
      let kcal = 0;
      let eau = 0;
      let perimes = 0;
      let bientot = 0;
      stocks.forEach((s) => {
        const t = TYPE_PAR_ID[s.type] || {};
        if (t.kcal) kcal += nombre(s.quantite) * t.kcal;
        if (s.type === "eau") eau += nombre(s.quantite);
        const e = etatPeremption(s.peremption).classe;
        if (e === "perime") perimes++;
        if (e === "bientot") bientot++;
      });
      const jauge = (titre, jours, detail) => {
        const classe = jours < 3 ? "alerte" : jours < 14 ? "moyen" : "ok";
        return `<div class="jauge jauge-${classe}"><span>${titre}</span><strong>${fr(Math.floor(jours))} j</strong><small>${detail}</small></div>`;
      };
      el.querySelector("#st-bilan").innerHTML =
        jauge("Nourriture", kcal / besoinKcal, `${fr(kcal)} kcal pour ${fr(personnes)} pers.`) +
        jauge("Eau", eau / (personnes * eauJour), `${fr(eau)} L à ${fr(eauJour, 1)} L/pers./jour`) +
        `<div class="jauge jauge-${perimes ? "alerte" : bientot ? "moyen" : "ok"}"><span>À surveiller</span>
          <strong>${perimes + bientot}</strong><small>${perimes} périmé${perimes > 1 ? "s" : ""}, ${bientot} à consommer sous 30 jours</small></div>`;
    }

    el.querySelector("#st-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const nom = el.querySelector("#st-nom").value.trim();
      const quantite = nombre(el.querySelector("#st-qte").value);
      if (!nom || quantite <= 0) return;
      stocks.push({
        id: nouvelId(), nom, type: type.value, quantite,
        peremption: el.querySelector("#st-date").value, lieu: el.querySelector("#st-lieu").value.trim(),
      });
      enregistrer();
      e.target.reset();
      el.querySelector("#st-unite").textContent = TYPE_PAR_ID[type.value].unite;
      message(`« ${nom} » ajouté.`);
      afficher();
      el.querySelector("#st-nom").focus();
    });

    liste.addEventListener("change", (e) => {
      const s = stocks.find((x) => x.id === e.target.dataset.qte);
      if (!s) return;
      s.quantite = nombre(e.target.value);
      enregistrer();
      bilan();
    });

    // Suppression en deux clics (pas de boîte de dialogue).
    liste.addEventListener("click", (e) => {
      const bouton = e.target.closest("[data-suppr]");
      if (!bouton) return;
      if (!bouton.classList.contains("confirmer")) {
        liste.querySelectorAll(".confirmer").forEach((b) => { b.classList.remove("confirmer"); b.textContent = "✕"; });
        bouton.classList.add("confirmer");
        bouton.textContent = "Supprimer ?";
        return;
      }
      const s = stocks.find((x) => x.id === bouton.dataset.suppr);
      stocks = stocks.filter((x) => x !== s);
      enregistrer();
      message(`« ${s.nom} » supprimé.`);
      afficher();
    });

    const exporter = el.querySelector("#st-exporter");
    if (exporter) exporter.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify({ kit: "stocks", version: 1, stocks }, null, 2)], { type: "application/json" });
      const lien = document.createElement("a");
      lien.href = URL.createObjectURL(blob);
      lien.download = `stocks-kit-survie-${new Date().toISOString().slice(0, 10)}.json`;
      lien.click();
      setTimeout(() => URL.revokeObjectURL(lien.href), 1000);
      message("Sauvegarde enregistrée dans vos téléchargements.");
    });

    el.querySelector("#st-fichier").addEventListener("change", async (e) => {
      const fichier = e.target.files[0];
      if (!fichier) return;
      try {
        const donnees = JSON.parse(await fichier.text());
        const importes = (Array.isArray(donnees) ? donnees : donnees.stocks || [])
          .filter((s) => s && typeof s.nom === "string" && s.nom.trim())
          .map((s) => ({
            id: nouvelId(), nom: s.nom.trim().slice(0, 120), type: TYPE_PAR_ID[s.type] ? s.type : "autre",
            quantite: nombre(s.quantite), peremption: /^\d{4}-\d{2}-\d{2}$/.test(s.peremption) ? s.peremption : "",
            lieu: typeof s.lieu === "string" ? s.lieu.slice(0, 120) : "",
          }));
        if (!importes.length) throw new Error("aucun article trouvé");
        stocks = stocks.concat(importes);
        enregistrer();
        message(`${importes.length} article${importes.length > 1 ? "s" : ""} importé${importes.length > 1 ? "s" : ""}.`);
        afficher();
      } catch (erreur) {
        message(`Import impossible : ce fichier n'est pas une sauvegarde de stocks valide (${erreur.message}).`);
      }
      e.target.value = "";
    });

    afficher();
  }

  // --- Solaire ----------------------------------------------------------------

  // Heures équivalentes de plein soleil par jour (ordre de grandeur, panneau orienté au sud).
  const ENSOLEILLEMENT = {
    sud: { ete: 6, mi: 4.5, hiver: 2.5 },
    centre: { ete: 5, mi: 3, hiver: 1.2 },
    nord: { ete: 5, mi: 2.5, hiver: 0.3 },
  };
  const RENDEMENT_SYSTEME = 0.8; // pertes : chaleur, câbles, régulateur, poussière
  const APPAREILS = [
    ["Téléphones (recharge)", 10, 1.5, 2],
    ["Lampes LED", 5, 5, 2],
    ["Radio", 2, 3, 1],
    ["Boîtier Meshtastic / talkies", 0.5, 24, 1],
    ["Ordinateur portable", 45, 2, 0],
    ["Réfrigérateur 12 V", 50, 8, 0],
    ["Autre appareil", 0, 0, 0],
  ];

  function outilSolaire(el) {
    const etat = memoire.lire("solaire", null) || {
      region: "centre", saison: "hiver", jours: "2", batterie: "lithium",
      appareils: APPAREILS.map(([nom, w, h, n]) => ({ nom, w, h, n })),
    };
    el.innerHTML = `
      <div class="formulaire grille-2">
        <label>Région
          <select id="so-region"><option value="sud">Sud de l'Europe</option><option value="centre">Centre (France, Allemagne…)</option><option value="nord">Nord (Scandinavie, Baltes)</option></select>
        </label>
        <label>Saison de référence
          <select id="so-saison"><option value="hiver">Hiver (le plus sûr)</option><option value="mi">Printemps / automne</option><option value="ete">Été</option></select>
        </label>
        <label>Jours sans soleil à tenir sur batterie <input id="so-jours" inputmode="numeric"></label>
        <label>Batterie
          <select id="so-batterie"><option value="lithium">Lithium LiFePO4</option><option value="plomb">Plomb (AGM, gel)</option></select>
        </label>
      </div>
      <div class="resultat" id="so-res" aria-live="polite"></div>
      <h3>Appareils</h3>
      <div class="tableau"><table class="table-appareils">
        <thead><tr><th>Appareil</th><th>W</th><th>h/jour</th><th>Nb</th></tr></thead>
        <tbody>${etat.appareils.map((a, i) => `<tr>
          <td>${i === etat.appareils.length - 1 ? `<input data-i="${i}" data-champ="nom" value="${window.KitMarkdown.echapper(a.nom)}" aria-label="Nom de l'appareil">` : window.KitMarkdown.echapper(a.nom)}</td>
          <td><input data-i="${i}" data-champ="w" inputmode="decimal" value="${a.w}" aria-label="Watts"></td>
          <td><input data-i="${i}" data-champ="h" inputmode="decimal" value="${a.h}" aria-label="Heures par jour"></td>
          <td><input data-i="${i}" data-champ="n" inputmode="numeric" value="${a.n}" aria-label="Nombre"></td>
        </tr>`).join("")}</tbody>
      </table></div>
      <p class="note">W = puissance de l'appareil, h/jour = durée d'utilisation par jour, Nb = nombre d'appareils. Ordres de grandeur pour un panneau orienté plein sud, sans ombre. Mettez « 0 » au nombre pour exclure un appareil.
      Détails dans la fiche <a href="#/fiche/energie-solaire">Électricité solaire 12 V</a>.</p>`;

    const champs = ["region", "saison", "jours", "batterie"].map((c) => [c, el.querySelector("#so-" + c)]);
    champs.forEach(([c, champ]) => (champ.value = etat[c]));

    function calculer() {
      champs.forEach(([c, champ]) => (etat[c] = champ.value));
      el.querySelectorAll("[data-champ]").forEach((champ) => {
        const a = etat.appareils[champ.dataset.i];
        a[champ.dataset.champ] = champ.dataset.champ === "nom" ? champ.value : nombre(champ.value);
      });
      memoire.ecrire("solaire", etat);

      const conso = etat.appareils.reduce((s, a) => s + nombre(a.w) * nombre(a.h) * nombre(a.n), 0);
      const soleil = ENSOLEILLEMENT[etat.region][etat.saison];
      const res = el.querySelector("#so-res");
      if (conso <= 0) {
        res.innerHTML = "<p>Indiquez au moins un appareil.</p>";
        return;
      }
      const panneau = Math.ceil(conso / (soleil * RENDEMENT_SYSTEME) / 10) * 10;
      const decharge = etat.batterie === "lithium" ? 0.85 : 0.5;
      const batterieWh = (conso * Math.max(nombre(etat.jours), 1)) / decharge;
      const batterieAh = Math.ceil(batterieWh / 12 / 10) * 10;
      res.innerHTML = `
        <dl class="liste-valeurs">
          <dt>Consommation</dt><dd>${fr(conso)} Wh/jour</dd>
          <dt>Panneau conseillé</dt><dd>${soleil < 0.5 ? "solaire insuffisant" : fr(panneau) + " W"}</dd>
          <dt>Batterie conseillée (12 V)</dt><dd>${fr(batterieAh)} Ah (${fr(batterieWh / 1000, 1)} kWh)</dd>
        </dl>
        ${soleil < 0.5 ? `<p class="note">En hiver dans le Nord, le solaire ne produit presque rien : prévoyez une autre source
          (groupe, éolienne, recharge ailleurs) ou réduisez la consommation au strict minimum.</p>` :
          panneau > 400 ? `<p class="note">Plus de 400 W de panneaux : réduisez d'abord la consommation (réfrigérateur, ordinateur),
          c'est bien moins cher que d'ajouter des panneaux.</p>` : ""}`;
    }
    el.addEventListener("input", calculer);
    calculer();
  }

  // --- Morse ----------------------------------------------------------------

  const MORSE = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
    K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
    U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
    0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "/": "-..-.", "@": ".--.-.", "-": "-....-", "'": ".----.",
  };
  const INVERSE = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

  function versMorse(texte) {
    return texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().trim()
      .split(/\s+/).map((mot) => [...mot].map((c) => MORSE[c] || "").filter(Boolean).join(" ")).filter(Boolean).join(" / ");
  }

  function depuisMorse(code) {
    return code.trim().split(/\s*\/\s*|\s{3,}/).map((mot) =>
      mot.split(/\s+/).map((s) => INVERSE[s.replace(/[•·]/g, ".").replace(/[–—_]/g, "-")] || (s ? "?" : "")).join("")
    ).join(" ");
  }

  function outilMorse(el) {
    el.innerHTML = `
      <div class="formulaire">
        <label>Texte → Morse <input id="m-texte" value="SOS" autocomplete="off"></label>
        <p class="morse" id="m-code" aria-live="polite"></p>
        <div class="boutons">
          <button type="button" class="bouton" id="m-son">▶ Son</button>
          <button type="button" class="bouton" id="m-lumiere">☀ Signal lumineux</button>
          <button type="button" class="bouton secondaire" id="m-stop">■ Arrêter</button>
        </div>
        <label>Vitesse : <span id="m-vit-val"></span> mots/min <input type="range" id="m-vit" min="5" max="20" value="8"></label>
        <label>Morse → texte (lettres séparées par un espace, mots par « / »)
          <input id="m-code-entree" placeholder="... --- ..." autocomplete="off"></label>
        <p class="grand" id="m-dechiffre" aria-live="polite"></p>
      </div>
      <h3>Alphabet</h3>
      <div class="table-morse">${Object.entries(MORSE).map(([k, v]) => `<div><strong>${k}</strong><code>${v}</code></div>`).join("")}</div>
      <p class="note">Rythme : point = 1 unité, trait = 3, espace entre signes = 1, entre lettres = 3, entre mots = 7.
      SOS = <code>... --- ...</code> enchaîné sans pause. Le signal lumineux fait clignoter tout l'écran : utile la nuit, écran au maximum.</p>
      <div class="flash" id="m-flash" hidden></div>`;

    const texte = el.querySelector("#m-texte");
    const code = el.querySelector("#m-code");
    const vit = el.querySelector("#m-vit");
    const flash = el.querySelector("#m-flash");
    let arret = null;

    const majCode = () => (code.textContent = versMorse(texte.value) || "—");
    const majVitesse = () => (el.querySelector("#m-vit-val").textContent = vit.value);
    texte.addEventListener("input", majCode);
    vit.addEventListener("input", majVitesse);
    majCode();
    majVitesse();
    el.querySelector("#m-code-entree").addEventListener("input", (e) => {
      el.querySelector("#m-dechiffre").textContent = depuisMorse(e.target.value);
    });

    // Séquence [allumé?, durée en unités]
    function sequence(morse) {
      const seq = [];
      morse.split(" / ").forEach((mot, iMot) => {
        if (iMot) seq.push([false, 7]);
        mot.split(" ").forEach((lettre, iLettre) => {
          if (iLettre) seq.push([false, 3]);
          [...lettre].forEach((s, iSigne) => {
            if (iSigne) seq.push([false, 1]);
            seq.push([true, s === "." ? 1 : 3]);
          });
        });
      });
      return seq;
    }

    function jouer(mode) {
      arreter();
      const unite = 1200 / nombre(vit.value);
      const seq = sequence(versMorse(texte.value));
      let audio = null;
      let oscillateur = null;
      if (mode === "son") {
        const Contexte = window.AudioContext || window.webkitAudioContext;
        if (!Contexte) return;
        audio = new Contexte();
        oscillateur = audio.createOscillator();
        const gain = audio.createGain();
        oscillateur.frequency.value = 650;
        gain.gain.value = 0;
        oscillateur.connect(gain).connect(audio.destination);
        oscillateur.start();
        let t = audio.currentTime + 0.05;
        seq.forEach(([allume, duree]) => {
          gain.gain.setValueAtTime(allume ? 0.5 : 0, t);
          t += (duree * unite) / 1000;
        });
        gain.gain.setValueAtTime(0, t);
        const minuteur = setTimeout(arreter, (t - audio.currentTime) * 1000 + 100);
        arret = () => { clearTimeout(minuteur); oscillateur.stop(); audio.close(); };
      } else {
        flash.hidden = false;
        let i = 0;
        let minuteur;
        const etape = () => {
          if (i >= seq.length) { i = 0; flash.classList.remove("allume"); minuteur = setTimeout(etape, unite * 7); return; }
          const [allume, duree] = seq[i++];
          flash.classList.toggle("allume", allume);
          minuteur = setTimeout(etape, duree * unite);
        };
        etape();
        arret = () => { clearTimeout(minuteur); flash.hidden = true; flash.classList.remove("allume"); };
        flash.onclick = arreter;
      }
    }
    function arreter() {
      if (arret) arret();
      arret = null;
    }
    el.querySelector("#m-son").addEventListener("click", () => jouer("son"));
    el.querySelector("#m-lumiere").addEventListener("click", () => jouer("lumiere"));
    el.querySelector("#m-stop").addEventListener("click", arreter);
    return arreter; // appelé quand on quitte la page
  }

  // --- Soleil et lune ------------------------------------------------------

  const RAD = Math.PI / 180;

  // Équation du lever du soleil (algorithme simplifié, précision ~1–2 min en Europe).
  function soleil(date, lat, lon) {
    const jourJulien = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12) / 864e5 + 2440587.5;
    const n = Math.round(jourJulien - 2451545.0 + 0.0008);
    const jMoyen = n - lon / 360;
    const M = (357.5291 + 0.98560028 * jMoyen) % 360;
    const C = 1.9148 * Math.sin(M * RAD) + 0.02 * Math.sin(2 * M * RAD) + 0.0003 * Math.sin(3 * M * RAD);
    const lambda = (M + C + 180 + 102.9372) % 360;
    const transit = 2451545.0 + jMoyen + 0.0053 * Math.sin(M * RAD) - 0.0069 * Math.sin(2 * lambda * RAD);
    const declinaison = Math.asin(Math.sin(lambda * RAD) * Math.sin(23.4397 * RAD));
    const versDate = (j) => new Date((j - 2440587.5) * 864e5);
    const angle = (hauteur) => {
      const cosW = (Math.sin(hauteur * RAD) - Math.sin(lat * RAD) * Math.sin(declinaison)) / (Math.cos(lat * RAD) * Math.cos(declinaison));
      if (cosW > 1) return "nuit";
      if (cosW < -1) return "jour";
      return Math.acos(cosW) / RAD / 360;
    };
    const lever = angle(-0.833);
    const crepuscule = angle(-6);
    return {
      midi: versDate(transit),
      lever: typeof lever === "number" ? versDate(transit - lever) : lever,
      coucher: typeof lever === "number" ? versDate(transit + lever) : lever,
      aube: typeof crepuscule === "number" ? versDate(transit - crepuscule) : crepuscule,
      crepuscule: typeof crepuscule === "number" ? versDate(transit + crepuscule) : crepuscule,
      dureeJour: typeof lever === "number" ? lever * 2 * 24 : lever === "jour" ? 24 : 0,
    };
  }

  function lune(date) {
    const synodique = 29.530588853;
    const reference = Date.UTC(2000, 0, 6, 18, 14) / 864e5; // nouvelle lune de référence
    const age = (((date.getTime() / 864e5 - reference) % synodique) + synodique) % synodique;
    const eclairage = (1 - Math.cos((2 * Math.PI * age) / synodique)) / 2;
    const phases = ["Nouvelle lune", "Premier croissant", "Premier quartier", "Gibbeuse croissante",
      "Pleine lune", "Gibbeuse décroissante", "Dernier quartier", "Dernier croissant"];
    return { age, eclairage, nom: phases[Math.floor((age / synodique) * 8 + 0.5) % 8] };
  }

  function outilSoleil(el) {
    const etat = memoire.lire("soleil", { lat: "48.85", lon: "2.35" });
    const aujourdhui = new Date();
    const iso = new Date(aujourdhui.getTime() - aujourdhui.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
    el.innerHTML = `
      <div class="formulaire grille-2">
        <label>Latitude (°, nord +) <input id="s-lat" inputmode="decimal"></label>
        <label>Longitude (°, est +) <input id="s-lon" inputmode="decimal"></label>
        <label>Date <input type="date" id="s-date" value="${iso}"></label>
        <div class="champ-bouton"><button type="button" class="bouton" id="s-gps">⌖ Ma position (GPS)</button></div>
      </div>
      <p class="note" id="s-gps-msg"></p>
      <div class="resultat" id="s-res" aria-live="polite"></div>
      <p class="note">Heures affichées dans le fuseau horaire de cet appareil. Le GPS fonctionne sans réseau (à l'extérieur, patience au premier calage).
      À midi solaire, le soleil est plein <strong>sud</strong> dans l'hémisphère nord : voir <a href="#/fiche/orientation-trouver-nord">Trouver le nord</a>.</p>`;

    const lat = el.querySelector("#s-lat");
    const lon = el.querySelector("#s-lon");
    const date = el.querySelector("#s-date");
    lat.value = etat.lat;
    lon.value = etat.lon;

    const heure = (d) => (typeof d === "string" ? (d === "jour" ? "soleil toujours levé" : "soleil toujours couché")
      : d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));

    function calculer() {
      memoire.ecrire("soleil", { lat: lat.value, lon: lon.value });
      const la = nombre(lat.value);
      const lo = nombre(lon.value);
      const res = el.querySelector("#s-res");
      if (Math.abs(la) > 90 || Math.abs(lo) > 180 || !date.value) {
        res.innerHTML = "<p>Coordonnées invalides.</p>";
        return;
      }
      const [a, m, j] = date.value.split("-").map(Number);
      const jour = new Date(a, m - 1, j, 12);
      const s = soleil(jour, la, lo);
      const l = lune(jour);
      const duree = s.dureeJour;
      res.innerHTML = `
        <dl class="liste-valeurs">
          <dt>Aube (début du jour utile)</dt><dd>${heure(s.aube)}</dd>
          <dt>Lever du soleil</dt><dd>${heure(s.lever)}</dd>
          <dt>Midi solaire (soleil au sud)</dt><dd>${heure(s.midi)}</dd>
          <dt>Coucher du soleil</dt><dd>${heure(s.coucher)}</dd>
          <dt>Fin du crépuscule (nuit)</dt><dd>${heure(s.crepuscule)}</dd>
          <dt>Durée du jour</dt><dd>${Math.floor(duree)} h ${String(Math.round((duree % 1) * 60)).padStart(2, "0")}</dd>
          <dt>Lune</dt><dd>${l.nom} — ${Math.round(l.eclairage * 100)} % éclairée</dd>
        </dl>`;
    }
    [lat, lon, date].forEach((c) => c.addEventListener("input", calculer));
    el.querySelector("#s-gps").addEventListener("click", () => {
      const msg = el.querySelector("#s-gps-msg");
      if (!navigator.geolocation) {
        msg.textContent = "GPS non disponible dans ce navigateur.";
        return;
      }
      msg.textContent = "Recherche de la position…";
      navigator.geolocation.getCurrentPosition(
        (p) => {
          lat.value = p.coords.latitude.toFixed(4);
          lon.value = p.coords.longitude.toFixed(4);
          msg.textContent = `Position trouvée (précision ± ${Math.round(p.coords.accuracy)} m).`;
          calculer();
        },
        (e) => (msg.textContent = "Position indisponible : " + e.message + " (le GPS exige souvent une page sécurisée ; saisissez les coordonnées à la main)."),
        { enableHighAccuracy: true, timeout: 60000 }
      );
    });
    calculer();
  }

  window.KitOutils = {
    memoire,
    liste: [
      { id: "javel", titre: "Dose de Javel", icone: "💧", resume: "Combien de Javel pour rendre l'eau potable.", rendre: outilJavel },
      { id: "stocks", titre: "Stocks & péremptions", icone: "🗃", resume: "Inventaire des réserves, dates de péremption, jours d'autonomie.", rendre: outilStocks },
      { id: "autonomie", titre: "Autonomie eau & nourriture", icone: "📦", resume: "Combien de jours tiennent vos stocks.", rendre: outilAutonomie },
      { id: "solaire", titre: "Solaire", icone: "🔋", resume: "Quel panneau et quelle batterie pour vos appareils.", rendre: outilSolaire },
      { id: "morse", titre: "Morse", icone: "📡", resume: "Traduire, émettre en son ou en lumière, décoder.", rendre: outilMorse },
      { id: "soleil", titre: "Soleil & lune", icone: "☀", resume: "Lever, coucher, midi solaire, phase de lune.", rendre: outilSoleil },
    ],
    // exposés pour les tests
    _soleil: soleil,
    _versMorse: versMorse,
    _depuisMorse: depuisMorse,
  };
})();
