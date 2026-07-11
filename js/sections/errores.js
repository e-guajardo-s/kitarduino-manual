import { ERRORES } from "../data/errores.js";

const ALERT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4M12 17h.01"/></svg>`;
const CHEVRON_ICON = `<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;

function errorItem(e) {
  return `
    <details class="trouble-item">
      <summary>
        <span class="trouble-item__icon">${ALERT_ICON}</span>
        <span class="trouble-item__sintoma">${e.sintoma}</span>
        ${CHEVRON_ICON}
      </summary>
      <div class="trouble-item__body">
        <h4>Causas probables</h4>
        <ul>${e.causas.map((c) => `<li>${c}</li>`).join("")}</ul>
        <h4>Cómo solucionarlo</h4>
        <ol>${e.solucion.map((s) => `<li>${s}</li>`).join("")}</ol>
      </div>
    </details>
  `;
}

export function renderErrores(mount) {
  mount.innerHTML = `
    <div class="callout reveal">
      <p style="margin-bottom: var(--space-3); font-size: var(--text-base); font-weight: 600;">
        Antes de frustrarte, diagnostica como un detective:
      </p>
      <ul style="margin: 0; padding-left: 1.2rem;">
        <li><strong>Lee el mensaje de error completo</strong> (la franja de abajo del IDE): casi siempre dice la línea y qué pasó.</li>
        <li><strong>Cambia una sola cosa a la vez</strong> y vuelve a probar. Si cambias tres, no sabrás cuál era.</li>
        <li><strong>Usa <code>Serial.println()</code></strong> para "ver" qué está haciendo tu programa por dentro.</li>
        <li><strong>Revisa lo simple primero:</strong> ¿está bien conectado? ¿el pin del código es el pin real? ¿GND compartido?</li>
      </ul>
    </div>

    <div class="trouble-list reveal">
      ${ERRORES.map(errorItem).join("")}
    </div>
  `;
}
