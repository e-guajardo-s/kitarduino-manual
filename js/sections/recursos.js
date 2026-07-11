import { GRUPOS_RECURSOS } from "../data/recursos.js";

const ICONS = {
  web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M10 9v6l5-3z" fill="currentColor" stroke="none"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`,
  libro: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>`,
};

function resourceCard(r) {
  const icono = ICONS[r.tipo] ?? ICONS.web;
  const etiqueta = r.tipo === "libro" ? "Libro" : r.tipo === "info" ? "Guía" : r.tipo === "video" ? "Video" : "Sitio web";

  return `
    <article class="card resource-card">
      <div class="resource-card__icon">${icono}</div>
      <h4>${r.titulo}</h4>
      <p>${r.descripcion}</p>
      ${
        r.url
          ? `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="resource-card__link">
              Visitar
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>
            </a>`
          : `<span class="resource-card__tag">${etiqueta}</span>`
      }
    </article>
  `;
}

function grupoBlock(g) {
  return `
    <div class="resource-group reveal">
      <h3>${g.titulo}</h3>
      <div class="grid grid--3">
        ${g.recursos.map(resourceCard).join("")}
      </div>
    </div>
  `;
}

export function renderRecursos(mount) {
  mount.innerHTML = `
    <div class="reveal">
      <p>Aquí tienes un mapa para seguir aprendiendo Arduino después de este manual.</p>
    </div>

    ${GRUPOS_RECURSOS.map(grupoBlock).join("")}
  `;
}
