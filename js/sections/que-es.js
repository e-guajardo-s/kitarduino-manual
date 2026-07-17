import { APLICACIONES, ICONOS } from "../data/aplicaciones.js";

const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

const IDEAS_FUERZA = [
  "<strong>Lee el mundo físico</strong> mediante <em>sensores</em> (sus “sentidos”).",
  "<strong>Toma decisiones</strong> con el código que tú escribes (su “cerebro”).",
  "<strong>Actúa sobre el mundo</strong> mediante <em>actuadores</em> como LEDs, motores o pantallas (sus “músculos”).",
];

const SPECS = [
  ["Cerebro", "Microcontrolador ATmega328P"],
  ["Memoria de programa", "32 KB (donde vive tu código)"],
  ["Velocidad", "16 MHz"],
  ["Pines digitales", "14 (de ellos, 6 con PWM ~)"],
  ["Pines analógicos", "6 (A0–A5)"],
  ["Voltaje de trabajo", "5 V"],
  ["Se programa por", "Cable USB, desde el Arduino IDE"],
];

function flowSvg(name) {
  const icons = {
    entrada: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>`,
    procesa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM2 9h3M2 15h3M19 9h3M19 15h3M9 2v3M15 2v3M9 19v3M15 19v3"/></svg>`,
    salida: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V9m0 0 4 4m-4-4-4 4"/><path d="M4 5v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/></svg>`,
  };
  return icons[name] ?? "";
}

const ARROW_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

export function renderQueEs(mount) {
  mount.innerHTML = `
    <div class="grid grid--2 reveal">
      <div>
        <p>
          <strong>Arduino es una pequeña computadora que puedes programar tú mismo.</strong>
          No sirve para navegar por internet ni para jugar: sirve para <strong>leer lo que pasa
          en el mundo real</strong> (temperatura, luz, movimiento, distancia) y <strong>hacer que
          ocurran cosas</strong> (encender un LED, mover un motor, sonar una alarma). Todo eso lo
          controlas con un código que escribes en tu computador y envías a la placa por un cable USB.
        </p>
        <p>
          Lo mejor: Arduino es <strong>hardware y software libre</strong>. Eso significa que sus
          planos y su programa son abiertos, hay millones de personas aprendiendo con él y
          encuentras ayuda para casi cualquier idea.
        </p>
        <ul class="idea-list">
          ${IDEAS_FUERZA.map(
            (texto) => `
            <li>
              <span class="check">${CHECK_ICON}</span>
              <span>${texto}</span>
            </li>`
          ).join("")}
        </ul>
      </div>

      <div class="card">
        <h3 class="mt-0">Tu placa: Arduino UNO R3</h3>
        <dl class="spec-list">
          ${SPECS.map(
            ([term, val]) => `
            <div class="spec-list-row">
              <dt>${term}</dt>
              <dd>${val}</dd>
            </div>`
          ).join("")}
        </dl>
      </div>
    </div>

    <div class="flow reveal">
      <div class="flow-node">
        <div class="flow-node__icon">${flowSvg("entrada")}</div>
        <h4>Entrada</h4>
        <p class="flow-node__sub">El mundo físico (sensores)</p>
        <ul class="flow-node__examples">
          <li>Botón</li>
          <li>Sensor de temperatura (DHT11)</li>
          <li>Sensor de distancia (HC-SR04)</li>
          <li>Sensor de luz</li>
        </ul>
      </div>
      <div class="flow-arrow">${ARROW_ICON}</div>
      <div class="flow-node flow-node--center">
        <div class="flow-node__icon">${flowSvg("procesa")}</div>
        <h4>Arduino</h4>
        <p class="flow-node__sub">Tu código decide</p>
        <code class="flow-node__code">si (distancia &lt; 20 cm)
  → encender alarma</code>
      </div>
      <div class="flow-arrow">${ARROW_ICON}</div>
      <div class="flow-node">
        <div class="flow-node__icon">${flowSvg("salida")}</div>
        <h4>Salida</h4>
        <p class="flow-node__sub">Acción en el mundo (actuadores)</p>
        <ul class="flow-node__examples">
          <li>LED</li>
          <li>Motor servo</li>
          <li>Pantalla LCD</li>
          <li>Relé</li>
        </ul>
      </div>
    </div>

    <div class="grid grid--3 reveal">
      ${APLICACIONES.map(
        (app) => `
        <article class="card app-card">
          <div class="app-card__icon">${ICONOS[app.icono] ?? ""}</div>
          <h3>${app.nombre}</h3>
          <p>${app.texto}</p>
          <p class="app-card__example"><strong>Ejemplo real:</strong> ${app.ejemplo}</p>
        </article>`
      ).join("")}
    </div>

    <div class="callout reveal">
      <p>
        <strong>Lo bonito es que no necesitas nada de esto por separado.</strong> Tu kit ya trae
        la placa, los sensores y los actuadores para construir varios de estos ejemplos. En las
        próximas secciones aprenderás la electrónica mínima y, muy pronto, tu primer programa.
      </p>
    </div>
  `;
}
