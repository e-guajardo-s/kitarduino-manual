/* ============================================================
   Bloque de código con resaltado de sintaxis propio (sin CDN)
   ------------------------------------------------------------
   Tokenizer mínimo para C/C++/Arduino: cubre lo que aparece en
   los sketches de este sitio (no es un parser completo de C++).
   ============================================================ */

const KEYWORDS = new Set([
  "void", "setup", "loop", "if", "else", "for", "while", "return",
  "const", "int", "float", "bool", "char", "byte", "long", "double",
  "true", "false", "HIGH", "LOW", "INPUT", "OUTPUT", "INPUT_PULLUP",
  "unsigned", "static",
]);

const ARDUINO_FUNCTIONS = new Set([
  "pinMode", "digitalWrite", "digitalRead", "analogRead", "analogWrite",
  "delay", "delayMicroseconds", "millis", "tone", "noTone", "pulseIn",
  "Serial", "map", "constrain", "attach", "write", "read", "begin",
  "print", "println", "readHumidity", "readTemperature", "init",
  "backlight", "setCursor", "display", "clearDisplay", "setTextSize",
  "setTextColor", "showNumberDec", "setBrightness", "shutdown",
  "setIntensity", "setLed",
]);

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* Tokeniza línea por línea preservando comentarios, strings, directivas,
   números, keywords y funciones conocidas de Arduino. */
function tokenizeLine(line) {
  let out = "";
  let i = 0;
  const n = line.length;

  // Directiva de preprocesador: toda la línea coloreada igual
  if (/^\s*#/.test(line)) {
    return `<span class="tok-pre">${escapeHtml(line)}</span>`;
  }

  while (i < n) {
    const rest = line.slice(i);

    // Comentario de línea: el resto de la línea
    if (rest.startsWith("//")) {
      out += `<span class="tok-com">${escapeHtml(rest)}</span>`;
      break;
    }

    // Strings "..."
    const strMatch = rest.match(/^"(?:[^"\\]|\\.)*"/);
    if (strMatch) {
      out += `<span class="tok-str">${escapeHtml(strMatch[0])}</span>`;
      i += strMatch[0].length;
      continue;
    }

    // Números (enteros o decimales)
    const numMatch = rest.match(/^\d+\.?\d*/);
    if (numMatch) {
      out += `<span class="tok-num">${escapeHtml(numMatch[0])}</span>`;
      i += numMatch[0].length;
      continue;
    }

    // Identificadores (keyword, función Arduino, o texto plano)
    const idMatch = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (idMatch) {
      const word = idMatch[0];
      if (KEYWORDS.has(word)) {
        out += `<span class="tok-key">${escapeHtml(word)}</span>`;
      } else if (ARDUINO_FUNCTIONS.has(word)) {
        out += `<span class="tok-fn">${escapeHtml(word)}</span>`;
      } else {
        out += escapeHtml(word);
      }
      i += word.length;
      continue;
    }

    // Cualquier otro carácter (espacios, símbolos, puntuación)
    out += escapeHtml(line[i]);
    i += 1;
  }

  return out;
}

/**
 * Genera el HTML de un bloque de código resaltado con botón copiar.
 * @param {string} codigo - código fuente sin resaltar
 * @param {object} opts
 * @param {string} [opts.title] - título mostrado en la cabecera
 * @param {boolean} [opts.lineNumbers] - si se numeran las líneas
 * @returns {string} HTML del bloque
 */
export function codeBlock(codigo, { title = "", lineNumbers = false } = {}) {
  const lines = codigo.replace(/\n$/, "").split("\n");
  const id = `code-${Math.random().toString(36).slice(2, 9)}`;

  const rendered = lines
    .map((line, idx) => {
      const tokenized = tokenizeLine(line) || " ";
      if (lineNumbers) {
        return `<span class="code-line" data-line="${idx + 1}"><span class="code-line__num">${idx + 1}</span><span class="code-line__text">${tokenized}</span></span>`;
      }
      return `<span class="code-line">${tokenized}</span>`;
    })
    .join("\n");

  return `
    <div class="code-block">
      <div class="code-block__head">
        <span class="code-block__title">${title || "sketch.ino"}</span>
        <button type="button" class="code-block__copy" data-copy-target="${id}" aria-label="Copiar código">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span class="copy-label">Copiar</span>
        </button>
      </div>
      <pre id="${id}" class="${lineNumbers ? "has-line-numbers" : ""}" data-raw="${encodeURIComponent(codigo.replace(/\n$/, ""))}"><code>${rendered}</code></pre>
    </div>
  `;
}

/* Delegación global de eventos para el botón "Copiar" de cualquier
   code-block insertado en la página (no requiere volver a inicializar). */
let copyDelegationInstalled = false;
export function initCodeBlockCopy() {
  if (copyDelegationInstalled) return;
  copyDelegationInstalled = true;

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".code-block__copy");
    if (!btn) return;

    const target = document.getElementById(btn.dataset.copyTarget);
    if (!target) return;

    const raw = decodeURIComponent(target.dataset.raw || "");
    try {
      await navigator.clipboard.writeText(raw);
      const label = btn.querySelector(".copy-label");
      const original = label.textContent;
      label.textContent = "¡Copiado!";
      btn.classList.add("is-copied");
      setTimeout(() => {
        label.textContent = original;
        btn.classList.remove("is-copied");
      }, 1800);
    } catch {
      // Si el navegador bloquea el portapapeles, no interrumpimos la UI.
    }
  });
}
