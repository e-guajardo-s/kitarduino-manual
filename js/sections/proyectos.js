import { PROYECTOS, NIVELES } from "../data/proyectos.js";
import { codeBlock } from "../components/code-block.js";
import { openModal } from "../components/modal.js";

function projectCard(p) {
  return `
    <article class="card project-card" data-id="${p.id}" tabindex="0" role="button" aria-haspopup="dialog">
      <h4>${p.nombre}</h4>
      <p>${p.objetivo}</p>
      <ul class="chip-list">
        ${p.materiales.slice(0, 3).map((m) => `<li>${m}</li>`).join("")}
        ${p.materiales.length > 3 ? `<li>+${p.materiales.length - 3} más</li>` : ""}
      </ul>
    </article>
  `;
}

function projectModalContent(p, nivelInfo) {
  const titleId = `project-modal-${p.id}`;
  return `
    <div class="project-modal">
      <h2 id="${titleId}">${p.nombre}</h2>
      <div class="project-modal__meta">
        <span class="badge badge--${nivelInfo.badge}">${nivelInfo.nombre}</span>
      </div>

      <h3>Objetivo</h3>
      <p>${p.objetivo}</p>

      <h3>Materiales</h3>
      <ul class="chip-list">${p.materiales.map((m) => `<li>${m}</li>`).join("")}</ul>

      <h3>Conexión</h3>
      <p>${p.conexion}</p>

      ${p.advertenciaSeguridad ? `
        <div class="callout--safety">
          ⚠️ <strong>Precaución:</strong> este proyecto involucra un relé que puede controlar cargas de
          alto voltaje. No lo manipules sin supervisión de un adulto con experiencia; practica primero
          con cargas de bajo voltaje o un LED.
        </div>` : ""}

      <h3>Código</h3>
      ${codeBlock(p.codigo, { title: `${p.id}.ino`, lineNumbers: true })}

      <h3>Explicación</h3>
      <ul>${p.explicacion.map((e) => `<li>${e}</li>`).join("")}</ul>

      <div class="project-modal__result">
        <strong>Resultado esperado</strong>
        <p class="mb-0">${p.resultado}</p>
      </div>
    </div>
  `;
}

function initProjectClicks(root) {
  root.querySelectorAll(".project-card").forEach((card) => {
    const open = () => {
      const p = PROYECTOS.find((item) => item.id === card.dataset.id);
      if (!p) return;
      const nivelInfo = NIVELES.find((n) => n.id === p.nivel);
      openModal(projectModalContent(p, nivelInfo), { labelledBy: `project-modal-${p.id}` });
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

export function renderProyectos(mount) {
  const grupos = NIVELES.map((nivel) => ({
    nivel,
    proyectos: PROYECTOS.filter((p) => p.nivel === nivel.id),
  }));

  mount.innerHTML = `
    <div class="reveal">
      <p>
        La mejor forma de aprender Arduino es <strong>construyendo</strong>. Aquí tienes 10 proyectos
        ordenados por dificultad, todos con piezas de tu kit. Haz click en cualquiera para ver la
        receta completa: materiales, conexión, código y qué resultado esperar.
      </p>
    </div>

    ${grupos
      .map(
        (g) => `
      <div class="project-level reveal">
        <div class="project-level__head">
          <span class="badge badge--${g.nivel.badge}">${g.nivel.nombre}</span>
          <h3>${g.nivel.descripcion}</h3>
        </div>
        <div class="grid grid--3">
          ${g.proyectos.map(projectCard).join("")}
        </div>
      </div>`
      )
      .join("")}
  `;

  initProjectClicks(mount);
}
