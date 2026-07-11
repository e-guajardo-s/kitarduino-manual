/* Protoboard interactiva — Sección 3
   El SVG se genera en JS (bucles) en vez de escribir cientos de <circle> a mano.
   Cada agujero lleva data-group con su grupo eléctrico real; al pasar el mouse
   o el foco se resalta todo el grupo conectado. */

const COLS = 20;
const COL_START_X = 40;
const COL_STEP = 20;
const HOLE_R = 3.2;

const TOP_ROWS = [
  { label: "j", y: 64 },
  { label: "i", y: 80 },
  { label: "h", y: 96 },
  { label: "g", y: 112 },
  { label: "f", y: 128 },
];
const BOTTOM_ROWS = [
  { label: "e", y: 166 },
  { label: "d", y: 182 },
  { label: "c", y: 198 },
  { label: "b", y: 214 },
  { label: "a", y: 230 },
];

const RAIL_TOP_PLUS_Y = 20;
const RAIL_TOP_MINUS_Y = 36;
const RAIL_BOTTOM_PLUS_Y = 260;
const RAIL_BOTTOM_MINUS_Y = 276;

const VIEW_W = COL_START_X * 2 + (COLS - 1) * COL_STEP;
const VIEW_H = 300;

function colX(i) {
  return COL_START_X + i * COL_STEP;
}

function railHoles(groupName, y) {
  let out = "";
  for (let i = 0; i < COLS; i++) {
    out += `<circle class="bb-hole" data-group="${groupName}" cx="${colX(i)}" cy="${y}" r="${HOLE_R}"></circle>`;
  }
  return out;
}

function mainHoles(rows, prefix) {
  let out = "";
  rows.forEach((row) => {
    for (let i = 0; i < COLS; i++) {
      out += `<circle class="bb-hole" data-group="${prefix}-${i}" cx="${colX(i)}" cy="${row.y}" r="${HOLE_R}"></circle>`;
    }
  });
  return out;
}

function rowLabels(rows) {
  return rows
    .map(
      (row) =>
        `<text x="${COL_START_X - 20}" y="${row.y + 4}" font-family="monospace" font-size="10" fill="currentColor" opacity="0.55">${row.label}</text>`
    )
    .join("");
}

function colNumbers() {
  let out = "";
  for (let i = 4; i < COLS; i += 5) {
    out += `<text x="${colX(i)}" y="${BOTTOM_ROWS[BOTTOM_ROWS.length - 1].y + 22}" text-anchor="middle" font-family="monospace" font-size="9" fill="currentColor" opacity="0.5">${i + 1}</text>`;
  }
  return out;
}

function buildSvg() {
  const lineX1 = colX(0) - 12;
  const lineX2 = colX(COLS - 1) + 12;

  return `
    <svg viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-labelledby="bb-title" id="bb-svg">
      <title id="bb-title">Protoboard: los agujeros de cada columna central están conectados de a cinco, y los rieles superior e inferior recorren toda la placa horizontalmente</title>

      <rect x="4" y="8" width="${VIEW_W - 8}" height="${VIEW_H - 16}" rx="10" fill="var(--bg-alt)" stroke="var(--border)" />

      <!-- Riel superior -->
      <line class="bb-rail-line" x1="${lineX1}" y1="${RAIL_TOP_PLUS_Y}" x2="${lineX2}" y2="${RAIL_TOP_PLUS_Y}" stroke="var(--rail-plus)" stroke-width="2"/>
      <line class="bb-rail-line" x1="${lineX1}" y1="${RAIL_TOP_MINUS_Y}" x2="${lineX2}" y2="${RAIL_TOP_MINUS_Y}" stroke="var(--rail-minus)" stroke-width="2"/>
      <text x="${lineX1 - 2}" y="${RAIL_TOP_PLUS_Y + 3}" text-anchor="end" font-family="monospace" font-size="11" fill="var(--rail-plus)" font-weight="700">+</text>
      <text x="${lineX1 - 2}" y="${RAIL_TOP_MINUS_Y + 3}" text-anchor="end" font-family="monospace" font-size="11" fill="var(--rail-minus)" font-weight="700">−</text>
      ${railHoles("railTopPlus", RAIL_TOP_PLUS_Y)}
      ${railHoles("railTopMinus", RAIL_TOP_MINUS_Y)}

      <!-- Mitad superior (columnas f-j) -->
      ${rowLabels(TOP_ROWS)}
      ${mainHoles(TOP_ROWS, "colTop")}

      <!-- Canal central -->
      <rect x="${lineX1}" y="140" width="${lineX2 - lineX1}" height="14" rx="4" fill="var(--border)" opacity="0.6"/>
      <text x="${VIEW_W / 2}" y="150" text-anchor="middle" font-family="monospace" font-size="9" fill="currentColor" opacity="0.6">canal central</text>

      <!-- Mitad inferior (columnas a-e) -->
      ${rowLabels(BOTTOM_ROWS)}
      ${mainHoles(BOTTOM_ROWS, "colBot")}
      ${colNumbers()}

      <!-- Riel inferior -->
      <line class="bb-rail-line" x1="${lineX1}" y1="${RAIL_BOTTOM_PLUS_Y}" x2="${lineX2}" y2="${RAIL_BOTTOM_PLUS_Y}" stroke="var(--rail-plus)" stroke-width="2"/>
      <line class="bb-rail-line" x1="${lineX1}" y1="${RAIL_BOTTOM_MINUS_Y}" x2="${lineX2}" y2="${RAIL_BOTTOM_MINUS_Y}" stroke="var(--rail-minus)" stroke-width="2"/>
      <text x="${lineX1 - 2}" y="${RAIL_BOTTOM_PLUS_Y + 3}" text-anchor="end" font-family="monospace" font-size="11" fill="var(--rail-plus)" font-weight="700">+</text>
      <text x="${lineX1 - 2}" y="${RAIL_BOTTOM_MINUS_Y + 3}" text-anchor="end" font-family="monospace" font-size="11" fill="var(--rail-minus)" font-weight="700">−</text>
      ${railHoles("railBotPlus", RAIL_BOTTOM_PLUS_Y)}
      ${railHoles("railBotMinus", RAIL_BOTTOM_MINUS_Y)}
    </svg>
  `;
}

function initInteraction(root) {
  const svg = root.querySelector("#bb-svg");
  if (!svg) return;

  function setHighlight(group, on) {
    if (!group) return;
    svg.querySelectorAll(`[data-group="${group}"]`).forEach((hole) =>
      hole.classList.toggle("is-highlight", on)
    );
  }

  let current = null;

  function activate(hole) {
    if (!hole) return;
    const group = hole.dataset.group;
    if (group === current) return;
    setHighlight(current, false);
    setHighlight(group, true);
    current = group;
  }

  function clear() {
    setHighlight(current, false);
    current = null;
  }

  svg.addEventListener("pointerover", (e) => activate(e.target.closest(".bb-hole")));
  svg.addEventListener("pointerout", (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest?.(".bb-hole")) clear();
  });
  svg.addEventListener("pointerleave", clear);
  // Soporte táctil: toca un agujero para fijar el resaltado
  svg.addEventListener("click", (e) => activate(e.target.closest(".bb-hole")));
}

const CARDS = [
  {
    titulo: "Líneas de alimentación positivas (riel rojo +)",
    texto:
      "Las dos filas marcadas con <strong>+</strong> y una línea roja recorren la placa <strong>a lo largo (horizontal)</strong>. Todos los agujeros de esa línea están conectados entre sí. Aquí conectas los <strong>5 V</strong> del Arduino para tener “energía disponible” en toda la placa.",
  },
  {
    titulo: "Líneas de alimentación negativas (riel azul −)",
    texto:
      "Igual que las positivas, pero para <strong>GND (0 V)</strong>. Recorren la placa a lo largo y todos sus agujeros están unidos. Conecta aquí el pin <strong>GND</strong> del Arduino. Estos cuatro rieles (dos + y dos −) se llaman buses de alimentación.",
  },
  {
    titulo: "Filas y columnas (la zona central)",
    texto:
      "En el centro, los agujeros están conectados <strong>en grupos verticales de cinco</strong>. Cada columna (identificada con letras a–e y f–j y números de fila) forma un grupo aislado: los cinco agujeros de <code>a1–e1</code> están unidos entre sí, pero <strong>no</strong> con la fila 2, ni con la mitad de al lado.",
  },
  {
    titulo: "El canal central",
    texto:
      "Por la mitad de la placa corre una <strong>ranura o canal</strong>. Separa eléctricamente la mitad de arriba (filas f–j) de la de abajo (a–e). Está pensado justo para <strong>montar chips (circuitos integrados)</strong>: cada fila de patitas del chip cae en una columna distinta, sin cruzarse.",
  },
];

export function renderProtoboard(mount) {
  mount.innerHTML = `
    <div class="reveal">
      <span class="badge badge--easy">Sin soldar</span>
      <p style="margin-top: var(--space-4)">
        Una <strong>protoboard</strong> (o <em>breadboard</em>) es una placa llena de agujeritos
        que te permite <strong>armar circuitos sin soldar nada</strong>: insertas los componentes
        y los cables a presión, pruebas, y si algo está mal, lo desarmas y vuelves a empezar. Es
        perfecta para aprender y prototipar.
      </p>
      <p>
        El secreto está en entender qué agujeros están <strong>conectados entre sí por dentro</strong>.
        No lo están todos: siguen un patrón muy simple que verás a continuación.
        Pasa el mouse (o el dedo) sobre los agujeros del diagrama para ver qué grupo se enciende.
      </p>
    </div>

    <div class="bb-figure reveal" id="bb-container">
      ${buildSvg()}
      <div class="bb-legend">
        <span class="bb-legend__item"><span class="bb-legend__dot" style="background: var(--rail-plus)"></span>Riel + (5V)</span>
        <span class="bb-legend__item"><span class="bb-legend__dot" style="background: var(--rail-minus)"></span>Riel − (GND)</span>
        <span class="bb-legend__item"><span class="bb-legend__dot" style="background: var(--accent)"></span>Columna conectada</span>
        <span class="bb-legend__item"><span class="bb-legend__dot" style="background: var(--border-strong)"></span>Canal (separa mitades)</span>
      </div>
    </div>

    <div class="protoboard-grid reveal">
      ${CARDS.map(
        (c) => `
        <div class="card">
          <h3 class="mt-0" style="font-size: var(--text-lg)">${c.titulo}</h3>
          <p class="mb-0">${c.texto}</p>
        </div>`
      ).join("")}
    </div>

    <div class="callout--warning reveal">
      <h4>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4M12 17h.01"/></svg>
        Los tres errores clásicos
      </h4>
      <ul>
        <li>Creer que toda una fila horizontal del centro está conectada — <strong>no</strong>: en el centro la conexión es <strong>vertical</strong>, de a cinco agujeros.</li>
        <li>Olvidar llevar <strong>5 V y GND</strong> desde el Arduino a los rieles antes de empezar.</li>
        <li>En algunas protoboards, <strong>los rieles de alimentación se cortan por la mitad</strong>. Si media placa “no tiene energía”, probablemente sea eso: puentea las dos mitades con un cable.</li>
      </ul>
    </div>
  `;

  initInteraction(mount);
}
