// Rendu Markdown minimal, sans dépendance : titres, paragraphes, listes imbriquées,
// tableaux, citations, encadrés (> [!DANGER] …), code, liens, gras, italique.
(function () {
  "use strict";

  const ENCADRES = {
    DANGER: "Danger",
    ATTENTION: "Attention",
    ASTUCE: "Astuce",
    INFO: "À savoir",
  };

  function echapper(texte) {
    return texte.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function slug(texte) {
    return texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function enLigne(texte) {
    const codes = [];
    let html = echapper(texte).replace(/`([^`]+)`/g, (_, c) => {
      codes.push(c);
      return "\u0000" + (codes.length - 1) + "\u0000";
    });
    html = html
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, libelle, url) => {
        if (/^javascript:/i.test(url)) return libelle;
        const externe = /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";
        return `<a href="${url}"${externe}>${libelle}</a>`;
      })
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^\w*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
      .replace(/(^|[^\w])_([^_\s][^_]*)_(?!\w)/g, "$1<em>$2</em>");
    return html.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[i]}</code>`);
  }

  const RE_LISTE = /^(\s*)([-*]|\d+\.)\s+(.*)$/;

  function construireListe(elements, i, retrait) {
    const type = elements[i].type;
    let html = `<${type}>`;
    while (i < elements.length && elements[i].retrait >= retrait) {
      html += "<li>" + enLigne(elements[i].texte);
      i++;
      if (i < elements.length && elements[i].retrait > retrait) {
        const sous = construireListe(elements, i, elements[i].retrait);
        html += sous.html;
        i = sous.i;
      }
      html += "</li>";
    }
    return { html: html + `</${type}>`, i };
  }

  function cellules(ligne) {
    return ligne.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  }

  function rendre(md) {
    const lignes = md.replace(/\r/g, "").split("\n");
    const sortie = [];
    let paragraphe = [];

    const fermerParagraphe = () => {
      if (paragraphe.length) sortie.push("<p>" + enLigne(paragraphe.join(" ")) + "</p>");
      paragraphe = [];
    };

    for (let i = 0; i < lignes.length; i++) {
      const ligne = lignes[i];

      if (!ligne.trim()) {
        fermerParagraphe();
        continue;
      }

      const titre = ligne.match(/^(#{1,4})\s+(.*)$/);
      if (titre) {
        fermerParagraphe();
        const niveau = Math.max(2, titre[1].length);
        sortie.push(`<h${niveau} id="${slug(titre[2])}">${enLigne(titre[2])}</h${niveau}>`);
        continue;
      }

      if (/^(-{3,}|\*{3,})\s*$/.test(ligne)) {
        fermerParagraphe();
        sortie.push("<hr>");
        continue;
      }

      if (ligne.startsWith("```")) {
        fermerParagraphe();
        const code = [];
        for (i++; i < lignes.length && !lignes[i].startsWith("```"); i++) code.push(lignes[i]);
        sortie.push("<pre><code>" + echapper(code.join("\n")) + "</code></pre>");
        continue;
      }

      if (ligne.startsWith(">")) {
        fermerParagraphe();
        const bloc = [];
        for (; i < lignes.length && lignes[i].startsWith(">"); i++) bloc.push(lignes[i].replace(/^>\s?/, ""));
        i--;
        const type = bloc[0].match(/^\[!(\w+)\]\s*(.*)$/);
        if (type && ENCADRES[type[1].toUpperCase()]) {
          const cle = type[1].toUpperCase();
          const intitule = type[2] || ENCADRES[cle];
          sortie.push(
            `<div class="encadre encadre-${cle.toLowerCase()}" role="note">` +
              `<p class="encadre-titre">${enLigne(intitule)}</p>${rendre(bloc.slice(1).join("\n"))}</div>`
          );
        } else {
          sortie.push("<blockquote>" + rendre(bloc.join("\n")) + "</blockquote>");
        }
        continue;
      }

      if (ligne.trim().startsWith("|") && i + 1 < lignes.length && /^\s*\|?\s*:?-{3,}/.test(lignes[i + 1])) {
        fermerParagraphe();
        const entetes = cellules(ligne);
        const rangees = [];
        for (i += 2; i < lignes.length && lignes[i].trim().startsWith("|"); i++) rangees.push(cellules(lignes[i]));
        i--;
        sortie.push(
          '<div class="tableau"><table><thead><tr>' +
            entetes.map((c) => `<th>${enLigne(c)}</th>`).join("") +
            "</tr></thead><tbody>" +
            rangees.map((r) => "<tr>" + r.map((c) => `<td>${enLigne(c)}</td>`).join("") + "</tr>").join("") +
            "</tbody></table></div>"
        );
        continue;
      }

      if (RE_LISTE.test(ligne)) {
        fermerParagraphe();
        const elements = [];
        for (; i < lignes.length && lignes[i].trim(); i++) {
          const m = lignes[i].match(RE_LISTE);
          if (m) {
            elements.push({ retrait: m[1].length, type: /\d/.test(m[2]) ? "ol" : "ul", texte: m[3] });
          } else {
            elements[elements.length - 1].texte += " " + lignes[i].trim();
          }
        }
        i--;
        sortie.push(construireListe(elements, 0, elements[0].retrait).html);
        continue;
      }

      paragraphe.push(ligne.trim());
    }
    fermerParagraphe();
    return sortie.join("\n");
  }

  // Texte brut (pour la recherche et les extraits).
  function texteBrut(md) {
    return md
      .replace(/^>\s?\[!\w+\]\s*/gm, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[#>*_`|]/g, " ")
      .replace(/-{3,}/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  window.KitMarkdown = { rendre, texteBrut, echapper, slug };
})();
