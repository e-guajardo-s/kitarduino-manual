import { PASOS_TINKERCAD, VENTAJAS_TINKERCAD } from "../data/tinkercad.js";

const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
const PLAY_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
const ARROW_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

export function renderTinkercad(mount) {
  mount.innerHTML = `
    <div class="reveal">
      <p>
        Tinkercad Circuits es un <strong>simulador gratuito en el navegador</strong> hecho por
        Autodesk: arma el mismo circuito que harías con tu kit real (Arduino, protoboard, LEDs,
        sensores...) y prueba tu código <strong>sin conectar nada físicamente</strong>. Es la forma
        ideal de experimentar sin miedo a equivocarte.
      </p>
    </div>

    <div class="timeline reveal">
      ${PASOS_TINKERCAD.map(
        (paso, i) => `
        <div class="timeline-step">
          <div class="timeline-step__marker">${i + 1}</div>
          <div class="timeline-step__content">
            <h3>${paso.titulo}</h3>
            <p>${paso.texto}</p>
          </div>
        </div>`
      ).join("")}
    </div>

    <div class="card reveal">
      <h3 class="mt-0">¿Por qué usar el simulador?</h3>
      <ul class="idea-list mb-0">
        ${VENTAJAS_TINKERCAD.map(
          (v) => `
          <li>
            <span class="check">${CHECK_ICON}</span>
            <span>${v}</span>
          </li>`
        ).join("")}
      </ul>
    </div>

    <div class="callout reveal">
      <p style="margin-bottom: var(--space-4);">
        <strong>Ponlo en práctica ahora mismo:</strong> intenta recrear el proyecto Blink que viste
        más arriba dentro de Tinkercad, antes de armarlo con tu kit real. →
      </p>
      <a class="btn btn--simulator" href="https://www.tinkercad.com/circuits" target="_blank" rel="noopener noreferrer">
        ${PLAY_ICON}
        Abrir simulador
        ${ARROW_ICON}
      </a>
    </div>
  `;
}
