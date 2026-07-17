import { COMPONENTES, CATEGORIAS } from "../data/componentes.js";
import { codeBlock } from "../components/code-block.js";
import { openModal, closeModal } from "../components/modal.js";

const DIFICULTAD_LABEL = { facil: "Fácil", medio: "Medio", dificil: "Difícil" };

const SEARCH_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`;
const YT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M10 9v6l5-3z" fill="currentColor" stroke="none"/></svg>`;

function componentCard(c) {
  return `
    <article class="card component-card" data-id="${c.id}" data-nombre="${c.nombre.toLowerCase()}" data-uso="${c.paraQueSirve.toLowerCase()}" data-categoria="${c.categoria}" tabindex="0" role="button" aria-haspopup="dialog">
      <div class="component-card__icon"><img src="${c.imagen}" alt="${c.nombre}" loading="lazy"></div>
      <h3>${c.nombre}</h3>
      <p>${c.descripcionCorta}</p>
      <div class="component-card__meta">
        <span class="badge badge--${c.dificultad === "facil" ? "easy" : c.dificultad === "medio" ? "medium" : "hard"}">${DIFICULTAD_LABEL[c.dificultad]}</span>
        <span class="component-card__voltage">${c.voltaje}</span>
      </div>
    </article>
  `;
}

function pinoutTable(pinout) {
  if (!pinout || !pinout.length) return "";
  return `
    <table class="spec-table">
      <thead><tr><th>Pin</th><th>Descripción</th></tr></thead>
      <tbody>
        ${pinout.map((p) => `<tr><td><code>${p.pin}</code></td><td>${p.descripcion}</td></tr>`).join("")}
      </tbody>
    </table>
  `;
}

function chipList(items) {
  if (!items || !items.length) return "";
  return `<ul class="chip-list">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

function componentModalContent(c) {
  const titleId = `modal-title-${c.id}`;
  const dificultadBadge = c.dificultad === "facil" ? "easy" : c.dificultad === "medio" ? "medium" : "hard";

  return `
    <div class="component-modal">
      <div class="component-modal__head">
        <div class="component-modal__icon"><img src="${c.imagen}" alt="${c.nombre}" loading="lazy"></div>
        <div>
          <h2 id="${titleId}">${c.nombre}</h2>
          <div class="component-modal__badges">
            <span class="badge badge--${dificultadBadge}">${DIFICULTAD_LABEL[c.dificultad]}</span>
            <span class="badge" style="background: var(--bg-alt); color: var(--text-soft);">${c.voltaje}</span>
          </div>
        </div>
      </div>

      <h3>Descripción</h3>
      <p>${c.detalle}</p>

      ${c.enlaceSeccion ? `<p><a class="component-modal__section-link" href="${c.enlaceSeccion}">Ver la sección completa dedicada a este tema →</a></p>` : ""}

      ${c.pinout && c.pinout.length ? `<h3>Pinout</h3>${pinoutTable(c.pinout)}` : ""}

      ${c.conexion ? `<h3>Conexión al Arduino</h3><p>${c.conexion}</p>` : ""}

      ${c.advertenciaSeguridad ? `
        <div class="callout--safety">
          ⚠️ <strong>Precaución:</strong> este componente puede involucrar voltajes peligrosos (220V).
          No lo manipules sin la supervisión de un adulto con experiencia. Para practicar, usa cargas
          de bajo voltaje.
        </div>` : ""}

      ${c.codigo ? `<h3>Código de ejemplo</h3>${codeBlock(c.codigo, { title: `${c.id}.ino` })}` : `<h3>Código</h3><p>Este componente no requiere código: es pasivo o mecánico.</p>`}

      ${c.codigoExplicacion && c.codigoExplicacion.length ? `
        <h3>Explicación del código</h3>
        <ul>${c.codigoExplicacion.map((e) => `<li>${e}</li>`).join("")}</ul>` : ""}

      ${c.erroresComunes && c.erroresComunes.length ? `
        <h3>Errores comunes</h3>
        <ul>${c.erroresComunes.map((e) => `<li>${e}</li>`).join("")}</ul>` : ""}

      ${c.consejos && c.consejos.length ? `
        <h3>Consejos</h3>
        <ul>${c.consejos.map((e) => `<li>${e}</li>`).join("")}</ul>` : ""}

      ${c.proyectos && c.proyectos.length ? `
        <h3>Proyectos donde se usa</h3>
        ${chipList(c.proyectos)}` : ""}

      ${c.variaciones ? `<h3>Variaciones</h3><p>${c.variaciones}</p>` : ""}

      ${c.youtube && c.youtube.length ? `
        <h3>Videos recomendados</h3>
        <ul class="video-links">
          ${c.youtube.map((v) => `<li><a href="${v.url}" target="_blank" rel="noopener noreferrer">${YT_ICON}${v.titulo}</a></li>`).join("")}
        </ul>` : ""}
    </div>
  `;
}

function initSearch(root) {
  const input = root.querySelector("#component-search");
  const chips = [...root.querySelectorAll(".filter-chip")];
  const cards = [...root.querySelectorAll(".component-card")];
  const countEl = root.querySelector("#components-count");

  let activeCategoria = "todos";

  function applyFilters() {
    const query = input.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const matchesCategoria = activeCategoria === "todos" || card.dataset.categoria === activeCategoria;
      const matchesQuery =
        !query || card.dataset.nombre.includes(query) || card.dataset.uso.includes(query);
      const show = matchesCategoria && matchesQuery;
      card.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });

    countEl.textContent = `${visible} componente${visible === 1 ? "" : "s"} encontrado${visible === 1 ? "" : "s"}`;
  }

  input.addEventListener("input", applyFilters);

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeCategoria = chip.dataset.categoria;
      applyFilters();
    });
  });

  applyFilters();
}

function initCardClicks(root) {
  root.querySelectorAll(".component-card").forEach((card) => {
    const open = () => {
      const c = COMPONENTES.find((item) => item.id === card.dataset.id);
      if (!c) return;
      openModal(componentModalContent(c), { labelledBy: `modal-title-${c.id}` });

      // El enlace a otra sección navega fuera del modal: hay que cerrarlo, o el
      // backdrop y el scroll bloqueado tapan la sección de destino.
      document
        .querySelector(".modal__body .component-modal__section-link")
        ?.addEventListener("click", closeModal);
    };

    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

export function renderComponentes(mount) {
  mount.innerHTML = `
    <div class="reveal">
      <p>
        Tu kit trae <strong>19 componentes</strong>: desde lo más básico (LEDs, resistencias) hasta
        sensores y pantallas. Aquí tienes una ficha de cada uno. Haz click en cualquier tarjeta para
        ver el detalle completo: pinout, conexión, código y consejos.
      </p>
    </div>

    <div class="components-toolbar reveal">
      <div class="components-search">
        ${SEARCH_ICON}
        <input type="search" id="component-search" placeholder="Buscar por nombre o uso...">
      </div>
      <div class="filter-chips">
        ${CATEGORIAS.map(
          (cat, i) =>
            `<button type="button" class="filter-chip ${i === 0 ? "is-active" : ""}" data-categoria="${cat.id}">${cat.nombre}</button>`
        ).join("")}
      </div>
    </div>

    <p class="components-count reveal" id="components-count"></p>

    <div class="grid grid--3 reveal">
      ${COMPONENTES.map(componentCard).join("")}
    </div>
  `;

  initSearch(mount);
  initCardClicks(mount);
}
