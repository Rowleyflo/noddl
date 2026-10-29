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
      { id: "autonomie", titre: "Autonomie eau & nourriture", icone: "📦", resume: "Combien de jours tiennent vos stocks.", rendre: outilAutonomie },
      { id: "morse", titre: "Morse", icone: "📡", resume: "Traduire, émettre en son ou en lumière, décoder.", rendre: outilMorse },
      { id: "soleil", titre: "Soleil & lune", icone: "☀", resume: "Lever, coucher, midi solaire, phase de lune.", rendre: outilSoleil },
    ],
    // exposés pour les tests
    _soleil: soleil,
    _versMorse: versMorse,
    _depuisMorse: depuisMorse,
  };
})();
