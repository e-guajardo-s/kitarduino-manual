import { codeBlock } from "../components/code-block.js";

const PASOS = [
  {
    titulo: "Instala el Arduino IDE",
    texto: `Entra a <strong>arduino.cc/en/software</strong> y descarga el <strong>Arduino IDE</strong> para tu sistema (Windows, Mac o Linux). Es gratis y de código abierto. Instálalo como cualquier programa. <em>(También existe una versión online, el Arduino Cloud Editor, pero para empezar la app de escritorio es más simple.)</em>`,
  },
  {
    titulo: "Conecta tu Arduino",
    texto: `Une la placa al computador con el <strong>cable USB</strong> del kit. Verás encenderse una luz verde (<code>ON</code>) en la placa: eso significa que ya tiene energía. En el IDE, ve a <strong>Herramientas → Placa</strong> y elige <strong>“Arduino Uno”</strong>, y en <strong>Herramientas → Puerto</strong> selecciona el puerto que apareció al conectarla (en Windows suele ser <code>COM3</code>, <code>COM4</code>…; en Mac, algo como <code>/dev/cu.usbmodem…</code>).`,
  },
  {
    titulo: "Escribe un Sketch",
    texto: `Un <strong>sketch</strong> es el nombre que Arduino le da a un programa. Al abrir el IDE ya te espera un sketch vacío con dos bloques: <code>setup()</code> y <code>loop()</code>. Escribes tu código dentro de ellos (lo vemos en detalle más abajo).`,
  },
  {
    titulo: "Súbelo a la placa",
    texto: `Presiona el botón <strong>Subir</strong> (la flecha →). El IDE primero <strong>compila</strong> (traduce tu código a algo que el microcontrolador entiende) y luego lo <strong>transfiere</strong> por USB. Cuando aparezca <em>“Subido”</em>, ¡tu programa ya está corriendo en el Arduino, incluso si lo desconectas del computador y lo alimentas aparte!`,
  },
];

const IDE_CALLOUTS = [
  { fuerte: "Verificar:", texto: "revisa que tu código no tenga errores." },
  { fuerte: "Subir:", texto: "manda el programa a la placa." },
  { fuerte: "Selector de placa/puerto:", texto: "aquí eliges “Arduino Uno” y el puerto." },
  { fuerte: "Editor:", texto: "aquí escribes tu sketch." },
];

function ideMockupSvg() {
  return `
    <svg viewBox="0 0 600 340" role="img" aria-labelledby="ide-title">
      <title id="ide-title">Ventana simulada del Arduino IDE con botones Verificar y Subir, el editor de código y la consola</title>

      <rect x="4" y="4" width="592" height="332" rx="10" fill="var(--surface)" stroke="var(--border)"/>

      <!-- Barra de título -->
      <rect x="4" y="4" width="592" height="28" rx="10" fill="var(--bg-alt)"/>
      <circle cx="20" cy="18" r="5" fill="#e25555"/>
      <circle cx="38" cy="18" r="5" fill="#f2b705"/>
      <circle cx="56" cy="18" r="5" fill="#3fb950"/>
      <text x="300" y="22" text-anchor="middle" font-family="sans-serif" font-size="11" fill="var(--text-faint)">sketch_blink.ino - Arduino IDE</text>

      <!-- Barra de herramientas -->
      <rect x="4" y="32" width="592" height="36" fill="var(--accent)" opacity="0.08"/>
      <circle cx="30" cy="50" r="12" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <path d="M25 50l4 4 7-8" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="66" cy="50" r="12" fill="var(--accent)"/>
      <path d="M62 50h8M66 46l4 4-4 4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="440" y="40" width="148" height="20" rx="10" fill="var(--surface)" stroke="var(--border-strong)"/>
      <text x="452" y="54" font-family="sans-serif" font-size="10" fill="var(--text-soft)">Arduino Uno, COM3</text>
      <path d="M576 47l4 3-4 3" fill="none" stroke="var(--text-faint)" stroke-width="1.5"/>

      <!-- Editor -->
      <rect x="4" y="68" width="592" height="200" fill="var(--code-bg)"/>
      <text x="24" y="95" font-family="monospace" font-size="12" fill="var(--tok-key)">void</text>
      <text x="60" y="95" font-family="monospace" font-size="12" fill="var(--tok-fn)">setup</text>
      <text x="104" y="95" font-family="monospace" font-size="12" fill="var(--code-text)">() {</text>
      <text x="40" y="115" font-family="monospace" font-size="12" fill="var(--tok-fn)">pinMode</text>
      <text x="94" y="115" font-family="monospace" font-size="12" fill="var(--code-text)">(LED_BUILTIN,</text>
      <text x="196" y="115" font-family="monospace" font-size="12" fill="var(--tok-key)">OUTPUT</text>
      <text x="240" y="115" font-family="monospace" font-size="12" fill="var(--code-text)">);</text>
      <text x="24" y="135" font-family="monospace" font-size="12" fill="var(--code-text)">}</text>
      <text x="24" y="160" font-family="monospace" font-size="12" fill="var(--tok-key)">void</text>
      <text x="60" y="160" font-family="monospace" font-size="12" fill="var(--tok-fn)">loop</text>
      <text x="98" y="160" font-family="monospace" font-size="12" fill="var(--code-text)">() {</text>
      <text x="40" y="180" font-family="monospace" font-size="12" fill="var(--tok-fn)">digitalWrite</text>
      <text x="122" y="180" font-family="monospace" font-size="12" fill="var(--code-text)">(LED_BUILTIN,</text>
      <text x="224" y="180" font-family="monospace" font-size="12" fill="var(--tok-key)">HIGH</text>
      <text x="252" y="180" font-family="monospace" font-size="12" fill="var(--code-text)">);</text>
      <text x="40" y="200" font-family="monospace" font-size="12" fill="var(--tok-fn)">delay</text>
      <text x="76" y="200" font-family="monospace" font-size="12" fill="var(--code-text)">(</text>
      <text x="82" y="200" font-family="monospace" font-size="12" fill="var(--tok-num)">1000</text>
      <text x="110" y="200" font-family="monospace" font-size="12" fill="var(--code-text)">);</text>
      <text x="24" y="220" font-family="monospace" font-size="12" fill="var(--code-text)">}</text>

      <!-- Consola -->
      <rect x="4" y="268" width="592" height="64" fill="#05090f"/>
      <text x="20" y="290" font-family="monospace" font-size="11" fill="#8fd694">Compilando el sketch...</text>
      <text x="20" y="308" font-family="monospace" font-size="11" fill="#8fd694">Subido.</text>
    </svg>
  `;
}

export function renderPrimerPrograma(mount) {
  mount.innerHTML = `
    <div class="reveal">
      <p>
        Ya entiendes la electrónica básica. Ahora viene lo divertido: <strong>darle instrucciones a
        tu Arduino</strong>. Para eso necesitas un programa gratuito llamado <strong>Arduino IDE</strong>,
        donde escribes el código y lo envías a la placa. Vamos paso a paso; en cinco minutos tendrás
        todo listo.
      </p>
    </div>

    <div class="timeline reveal">
      ${PASOS.map(
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

    <div class="ide-mockup reveal">
      ${ideMockupSvg()}
      <ul class="ide-callouts">
        ${IDE_CALLOUTS.map((c) => `<li><strong>${c.fuerte}</strong> ${c.texto}</li>`).join("")}
      </ul>
    </div>

    <div class="reveal">
      <h3>Anatomía de un Sketch</h3>
      <div class="sketch-anatomy">
        <div>
          ${codeBlock(
            `void setup() {
  // Se ejecuta UNA vez, al encender o reiniciar.
  // Aquí preparas todo: qué pines usas, iniciar el monitor serie, etc.
}

void loop() {
  // Se ejecuta UNA y OTRA vez, para siempre, mientras haya energía.
  // Aquí va lo que tu proyecto hace de forma continua.
}`,
            { title: "sketch_vacio.ino" }
          )}
        </div>
        <div>
          <p>
            <strong><code>setup()</code> — la preparación.</strong> Se ejecuta <strong>una sola
            vez</strong> cuando la placa se enciende o se reinicia. Es donde configuras: qué pines
            son de entrada o salida (<code>pinMode</code>), a qué velocidad hablará el monitor serie
            (<code>Serial.begin</code>), etc.
          </p>
          <p>
            <strong><code>loop()</code> — el corazón.</strong> Cuando <code>setup()</code> termina,
            <code>loop()</code> empieza a repetirse <strong>infinitamente</strong>. Todo lo que
            quieras que ocurra “todo el tiempo” (parpadear un LED, leer un sensor, revisar un botón)
            va aquí. Cuando llega al final, vuelve a empezar desde arriba, miles de veces por
            segundo.
          </p>
          <p class="mb-0">
            Ambos bloques son <strong>obligatorios</strong>: todo sketch de Arduino los tiene, aunque
            estén vacíos.
          </p>
        </div>
      </div>
    </div>

    <div class="callout reveal">
      <p>
        ¿Listo para tu primer programa de verdad? Empecemos por el clásico universal: hacer
        parpadear un LED. Se llama <strong>Blink</strong> y es el “Hola Mundo” de la electrónica. →
      </p>
    </div>
  `;
}
