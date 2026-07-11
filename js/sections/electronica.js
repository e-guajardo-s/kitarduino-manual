import { CONCEPTOS } from "../data/electronica.js";

const WATER_SVG = `
  <svg viewBox="0 0 320 140" role="img" aria-labelledby="water-title">
    <title id="water-title">Cañería con una bomba que representa el voltaje, gotas que representan la corriente y una sección angosta que representa la resistencia</title>
    <rect x="10" y="60" width="60" height="30" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
    <text x="40" y="105" text-anchor="middle" font-size="11" fill="currentColor">Bomba (V)</text>
    <line x1="70" y1="75" x2="140" y2="75" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
    <circle class="i-drop" cx="90" cy="75" r="3.5" fill="var(--surface)"/>
    <circle class="i-drop" cx="110" cy="75" r="3.5" fill="var(--surface)"/>
    <circle class="i-drop" cx="130" cy="75" r="3.5" fill="var(--surface)"/>
    <path d="M140 65 L170 70 L170 80 L140 85 Z" fill="none" stroke="currentColor" stroke-width="2"/>
    <text x="155" y="105" text-anchor="middle" font-size="11" fill="currentColor">Angosto (R)</text>
    <line x1="170" y1="75" x2="310" y2="75" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <circle class="i-drop" cx="200" cy="75" r="2.5" fill="var(--surface)"/>
    <circle class="i-drop" cx="230" cy="75" r="2.5" fill="var(--surface)"/>
    <circle class="i-drop" cx="260" cy="75" r="2.5" fill="var(--surface)"/>
    <circle class="i-drop" cx="290" cy="75" r="2.5" fill="var(--surface)"/>
    <text x="230" y="35" text-anchor="middle" font-size="11" fill="currentColor">Caudal = corriente (I)</text>
  </svg>
`;

function ohmTemplate() {
  return `
    <div class="ohm-calc reveal" id="ohm-calc">
      <h3 class="mt-0">Calculadora de la Ley de Ohm</h3>
      <p class="text-soft">Escribe dos valores cualquiera y calcula el tercero automáticamente.</p>
      <div class="ohm-calc__grid">
        <div class="ohm-field">
          <label for="ohm-v">Voltaje</label>
          <div class="unit-wrap">
            <input type="number" id="ohm-v" inputmode="decimal" placeholder="ej: 5" step="any">
            <span class="unit-suffix">V</span>
          </div>
        </div>
        <div class="ohm-field">
          <label for="ohm-i">Corriente</label>
          <div class="unit-wrap">
            <input type="number" id="ohm-i" inputmode="decimal" placeholder="ej: 20" step="any">
            <span class="unit-suffix">mA</span>
          </div>
        </div>
        <div class="ohm-field">
          <label for="ohm-r">Resistencia</label>
          <div class="unit-wrap">
            <input type="number" id="ohm-r" inputmode="decimal" placeholder="ej: 220" step="any">
            <span class="unit-suffix">Ω</span>
          </div>
        </div>
      </div>
      <div class="ohm-calc__result">
        <div class="ohm-result">
          Resultado
          <strong id="ohm-output">Completa dos campos</strong>
        </div>
        <div class="ohm-result">
          Potencia
          <strong id="ohm-power">—</strong>
        </div>
      </div>
      <p class="ohm-calc__hint">
        Prueba con <code>V = 3</code> (lo que sobra tras el LED) e <code>I = 20 mA</code> para ver
        por qué se usa una resistencia de referencia con los LEDs de tu kit.
      </p>
    </div>
  `;
}

function conceptCard(c) {
  return `
    <details class="concept-card">
      <summary>
        <span class="concept-card__sym">${c.simbolo}</span>
        <span class="title">${c.nombre}</span>
        <span class="unit">${c.unidad}</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </summary>
      <div class="concept-card__body">
        <div class="concept-card__icon">${c.svg}</div>
        <p>${c.explicacion}</p>
        <p class="concept-card__example">
          <span class="label">Ejemplo cotidiano</span>
          ${c.ejemplo}
        </p>
      </div>
    </details>
  `;
}

function initOhmCalculator(root) {
  const vInput = root.querySelector("#ohm-v");
  const iInput = root.querySelector("#ohm-i");
  const rInput = root.querySelector("#ohm-r");
  const output = root.querySelector("#ohm-output");
  const power = root.querySelector("#ohm-power");

  let lastEdited = null;
  [vInput, iInput, rInput].forEach((el) =>
    el.addEventListener("input", () => {
      lastEdited = el;
      calculate();
    })
  );

  function calculate() {
    const v = parseFloat(vInput.value);
    const iMa = parseFloat(iInput.value);
    const r = parseFloat(rInput.value);
    const i = iMa / 1000; // mA → A

    const has = { v: !isNaN(v), i: !isNaN(iMa), r: !isNaN(r) };
    const filled = Object.values(has).filter(Boolean).length;

    if (filled < 2) {
      output.textContent = "Completa dos campos";
      power.textContent = "—";
      return;
    }

    let resultV = v, resultI = i, resultR = r, target = "";

    // Si están los tres, recalcular el que NO se editó recientemente
    const missing = !has.v ? "v" : !has.i ? "i" : !has.r ? "r" : (
      lastEdited === vInput ? "i" : lastEdited === iInput ? "r" : "v"
    );

    if (missing === "v") {
      resultV = resultI * resultR;
      target = `${resultV.toFixed(2)} V`;
    } else if (missing === "i") {
      if (resultR === 0) { output.textContent = "R no puede ser 0"; power.textContent = "—"; return; }
      resultI = resultV / resultR;
      target = `${(resultI * 1000).toFixed(2)} mA`;
    } else {
      if (resultI === 0) { output.textContent = "I no puede ser 0"; power.textContent = "—"; return; }
      resultR = resultV / resultI;
      target = `${resultR.toFixed(2)} Ω`;
    }

    output.textContent = target;
    power.textContent = `${(resultV * resultI * 1000).toFixed(2)} mW`;
  }
}

export function renderElectronica(mount) {
  mount.innerHTML = `
    <div class="water-analogy reveal">
      <div>
        <p>
          <strong>Imagina la electricidad como agua corriendo por cañerías.</strong> Es la mejor
          forma de entenderla:
        </p>
        <ul>
          <li>La <strong>presión</strong> que empuja el agua es el <strong>voltaje</strong>.</li>
          <li>La <strong>cantidad de agua</strong> que pasa por segundo es la <strong>corriente</strong>.</li>
          <li>Una <strong>cañería más angosta</strong> deja pasar menos agua: eso es la <strong>resistencia</strong>.</li>
        </ul>
        <p class="mb-0">
          Con solo estas tres ideas ya entiendes el 90% de la electrónica que necesitas para tu kit.
        </p>
      </div>
      <div class="water-analogy__art">${WATER_SVG}</div>
    </div>

    ${ohmTemplate()}

    <div class="concept-grid reveal">
      ${CONCEPTOS.map(conceptCard).join("")}
    </div>
  `;

  initOhmCalculator(mount);
}
