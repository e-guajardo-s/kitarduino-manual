import { codeBlock } from "../components/code-block.js";

const CODIGO_BLINK = `// Blink — enciende y apaga el LED integrado de la placa.

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);   // El pin del LED integrado será una salida.
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH); // Enciende el LED (5V en el pin).
  delay(1000);                     // Espera 1000 ms = 1 segundo.
  digitalWrite(LED_BUILTIN, LOW);  // Apaga el LED (0V en el pin).
  delay(1000);                     // Espera 1 segundo con el LED apagado.
}`;

const EXPLICACION = [
  { linea: 1, codigo: "// Blink — …", texto: "Un comentario. Todo lo que va después de // es una nota para humanos; el Arduino la ignora por completo. Sirve para explicar qué hace el código." },
  { linea: 3, codigo: "void setup() {", texto: "Empieza el bloque de preparación, que corre una sola vez al encender." },
  { linea: 4, codigo: "pinMode(LED_BUILTIN, OUTPUT);", texto: "Le decimos al Arduino que el pin del LED integrado (LED_BUILTIN equivale al pin 13) va a enviar corriente, es decir, es una salida (OUTPUT)." },
  { linea: 5, codigo: "}", texto: "Cierra el bloque setup()." },
  { linea: 6, codigo: "void loop() {", texto: "Empieza el bloque que se repite para siempre." },
  { linea: 7, codigo: "digitalWrite(LED_BUILTIN, HIGH);", texto: "Pone el pin en HIGH (5 voltios): el LED se enciende." },
  { linea: 8, codigo: "delay(1000);", texto: "Pausa el programa 1000 milisegundos (1 segundo). Durante ese tiempo el LED sigue encendido porque nada lo cambió." },
  { linea: 9, codigo: "digitalWrite(LED_BUILTIN, LOW);", texto: "Pone el pin en LOW (0 voltios): el LED se apaga." },
  { linea: 10, codigo: "delay(1000);", texto: "Otra pausa de 1 segundo, ahora con el LED apagado." },
  { linea: 11, codigo: "}", texto: "Cierra loop(). Al llegar aquí, vuelve a la línea 6 y repite: encender, esperar, apagar, esperar… eso es el parpadeo." },
];

function ledDiagramSvg() {
  return `
    <svg viewBox="0 0 160 140" role="img" aria-labelledby="blink-diagram-title">
      <title id="blink-diagram-title">El LED integrado de la placa, junto al pin 13, parpadeando</title>
      <rect x="20" y="20" width="120" height="90" rx="10" fill="var(--teal-700)"/>
      <rect x="55" y="45" width="18" height="12" rx="3" fill="#4a5560"/>
      <rect class="blink-led" x="57" y="47" width="14" height="8" rx="2" fill="#ffd35c"/>
      <text x="80" y="56" font-family="monospace" font-size="10" fill="#e6f6f7">L</text>
      <text x="80" y="90" text-anchor="middle" font-family="monospace" font-size="11" fill="#c2e9eb">PIN 13</text>
    </svg>
  `;
}

export function renderBlink(mount) {
  mount.innerHTML = `
    <div class="reveal">
      <p>
        Ya sabes cómo funciona un sketch. Ahora vamos a escribir el más famoso de todos:
        <strong>Blink</strong>. Se llama así porque hace parpadear un LED, y es tradicionalmente
        el primer programa que escribe cualquier persona que aprende Arduino — el equivalente al
        “Hola Mundo” de la programación.
      </p>
    </div>

    <div class="blink-layout reveal">
      <div>
        ${codeBlock(CODIGO_BLINK, { title: "blink.ino", lineNumbers: true })}
      </div>
      <div class="blink-diagram">
        ${ledDiagramSvg()}
        <p>Este LED ya viene en la placa: no necesitas cables para Blink.</p>
      </div>
    </div>

    <div class="reveal">
      <h3>Explicación línea por línea</h3>
      <p class="text-soft">Pasa el mouse sobre una línea del código para ver su explicación resaltada.</p>
      <ul class="line-explain" id="blink-explain">
        ${EXPLICACION.map(
          (e) => `
          <li data-line="${e.linea}">
            <span class="line-explain__num">${e.linea}</span>
            <div>
              <code>${e.codigo.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>
              <p>${e.texto}</p>
            </div>
          </li>`
        ).join("")}
      </ul>
    </div>

    <div class="challenge-box reveal">
      <p>
        <strong>Pruébalo tú:</strong> cambia los dos <code>1000</code> por <code>100</code>.
        ¿Qué pasa? (El LED parpadeará 10 veces más rápido.) Ahora prueba <code>2000</code>: parpadeo
        lento. Acabas de modificar tu primer programa. 🎉
      </p>
    </div>
  `;

  initLineHover(mount);
}

function initLineHover(root) {
  const pre = root.querySelector(".code-block pre");
  const explainList = root.querySelector("#blink-explain");
  if (!pre || !explainList) return;

  function setActive(lineNum) {
    explainList.querySelectorAll("li").forEach((li) => {
      li.classList.toggle("is-active", li.dataset.line === String(lineNum));
    });
  }

  pre.addEventListener("mouseover", (e) => {
    const codeLine = e.target.closest(".code-line[data-line]");
    if (codeLine) setActive(codeLine.dataset.line);
  });
  pre.addEventListener("mouseleave", () => setActive(null));

  explainList.addEventListener("mouseover", (e) => {
    const li = e.target.closest("li[data-line]");
    if (li) setActive(li.dataset.line);
  });
  explainList.addEventListener("mouseleave", () => setActive(null));
}
