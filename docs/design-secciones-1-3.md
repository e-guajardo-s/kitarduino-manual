# Blueprint de diseño · Secciones 1–3

> **Rol de este documento.** Especifica el **diseño, la estructura y el contenido literal** de las
> tres primeras secciones. Está pensado para que un ejecutor (Sonnet 5) lo implemente **sin tomar
> decisiones de contenido ni de arquitectura**. La copia en español ya está redactada y es
> técnicamente correcta; cópiala tal cual (puedes ajustar tildes/typos, no el significado).
>
> **No cambiar:** los IDs de anclaje, la paleta, los nombres de clases del sistema de diseño ya
> existente en `css/styles.css`, ni el tono (documentación moderna, cero infantilismo).

---

## 0. Convenciones de ejecución (para Sonnet)

### 0.1 Patrón de montaje
`js/main.js` ya deja los contenedores vacíos y menciona `js/sections/`. Implementar **un módulo por
sección** que exporta una función `render(mount)` y se importa desde `main.js`:

```
js/
  sections/
    que-es.js         → export function renderQueEs(mount)
    electronica.js    → export function renderElectronica(mount)
    protoboard.js     → export function renderProtoboard(mount)
  data/
    electronica.js    → export const CONCEPTOS = [...]   (datos, sin HTML de página)
    aplicaciones.js   → export const APLICACIONES = [...]
```

En `main.js`, tras los `init*()` actuales:

```js
import { renderQueEs } from "./sections/que-es.js";
import { renderElectronica } from "./sections/electronica.js";
import { renderProtoboard } from "./sections/protoboard.js";

renderQueEs(document.getElementById("que-es-body"));
renderElectronica(document.getElementById("electronica-body"));
renderProtoboard(document.getElementById("protoboard-body"));

// Reobservar los .reveal recién inyectados (initReveal ya corrió sobre el DOM inicial).
```

> **Importante:** las animaciones `.reveal` se enganchan en `initReveal()` **una sola vez al cargar**.
> Como estas secciones inyectan HTML nuevo (con elementos `.reveal`), hay que **volver a observar**.
> Refactor mínimo sugerido: exportar `observeReveals(root = document)` desde `main.js` y llamarla al
> final de cada `render()`. Igual con scroll-spy no aplica (los `<section>` ya existen en el HTML).

### 0.2 Reutilizar el sistema de diseño (no inventar clases nuevas salvo lo indicado)
Ya existen y deben reutilizarse: `.card`, `.grid`/`.grid--2/3/4`, `.badge` (+`--easy/medium/hard`),
`.section-head`, `.reveal`, `.btn`. Colores **solo** vía tokens (`var(--accent)`, `var(--text-soft)`,
`var(--surface)`, `var(--border)`, etc.). Nada de hex sueltos en el markup.

### 0.3 Clases nuevas que este blueprint introduce (añadir a `styles.css`)
- **Flow / diagrama entrada-proceso-salida:** `.flow`, `.flow-node`, `.flow-arrow`
- **Concepto (Sección 2):** `.concept-grid`, `.concept-card`, `.concept-card__icon`, `.concept-card__sym`, `.concept-card__example`
- **Calculadora Ley de Ohm:** `.ohm-calc`, `.ohm-field`, `.ohm-result`
- **Protoboard interactivo:** `.bb`, `.bb-figure`, `.bb-legend`, `.bb-hole` (para hover/highlight)
- **Tabla técnica compacta:** `.spec-list` (dl de pares término/valor)

Todas deben respetar dark mode (usar tokens) y `prefers-reduced-motion`.

### 0.4 Accesibilidad transversal
Cada SVG decorativo → `aria-hidden="true"`. Cada SVG informativo → `role="img"` + `<title>`.
Acordeones con `<details>/<summary>` nativos (accesibles por teclado sin JS). Contraste AA mínimo.

---

## 1. Sección 1 — «¿Qué es Arduino?»  (`#que-es-body`)

**Objetivo pedagógico:** que Felipe entienda en 60 segundos que Arduino es un puente entre el código
y el mundo físico, y dónde se usa en la vida real.

### 1.1 Estructura visual (orden de arriba a abajo)
1. **Intro a dos columnas** (`.grid--2`, se apila en móvil):
   - Izquierda: párrafo introductorio + lista de 3 ideas fuerza.
   - Derecha: tarjeta “anatomía mínima” (qué trae la placa) usando `.card` + `.spec-list`.
2. **Diagrama de flujo Entrada → Arduino → Salida** (`.flow`, ancho completo, muy visual).
3. **Grid de aplicaciones** (`.grid--3`, tarjetas `.card` con ícono SVG) — 6 tarjetas.
4. **Callout de cierre**: una tarjeta ancha, fondo `--accent-soft`, que conecta con “tu kit”.

### 1.2 Copia literal

**Intro (izquierda):**
> **Arduino es una pequeña computadora que puedes programar tú mismo.** No sirve para navegar por
> internet ni para jugar: sirve para **leer lo que pasa en el mundo real** (temperatura, luz,
> movimiento, distancia) y **hacer que ocurran cosas** (encender un LED, mover un motor, sonar una
> alarma). Todo eso lo controlas con un código que escribes en tu computador y envías a la placa por
> un cable USB.
>
> Lo mejor: Arduino es **hardware y software libre**. Eso significa que sus planos y su programa son
> abiertos, hay millones de personas aprendiendo con él y encuentras ayuda para casi cualquier idea.

**3 ideas fuerza (lista con íconos ✓):**
- **Lee el mundo físico** mediante *sensores* (sus “sentidos”).
- **Toma decisiones** con el código que tú escribes (su “cerebro”).
- **Actúa sobre el mundo** mediante *actuadores* como LEDs, motores o pantallas (sus “músculos”).

**Tarjeta anatomía mínima (`.spec-list`, título “Tu placa: Arduino UNO R3”):**
| Término | Valor |
|---|---|
| Cerebro | Microcontrolador ATmega328P |
| Memoria de programa | 32 KB (donde vive tu código) |
| Velocidad | 16 MHz |
| Pines digitales | 14 (de ellos, 6 con PWM `~`) |
| Pines analógicos | 6 (A0–A5) |
| Voltaje de trabajo | 5 V |
| Se programa por | Cable USB, desde el Arduino IDE |

> Nota para el ejecutor: renderizar como `<dl class="spec-list">` (term/description), no como tabla
> HTML, para que sea responsive.

**Diagrama de flujo (contenido de los 3 nodos):**
- **Nodo 1 — ENTRADA (sensores).** Subtítulo: “El mundo físico”. Ejemplos bajo el nodo: botón,
  sensor de temperatura (DHT11), sensor de distancia (HC-SR04), sensor de luz.
- **Nodo 2 — ARDUINO (procesa).** Subtítulo: “Tu código decide”. Micro-ejemplo de pseudocódigo
  dentro del nodo: `si (distancia < 20 cm) → encender alarma`.
- **Nodo 3 — SALIDA (actuadores).** Subtítulo: “Acción en el mundo”. Ejemplos: LED, motor servo,
  pantalla LCD, buzzer.
- Flechas animadas de izquierda a derecha entre nodos (respetar reduced-motion).

**Grid de aplicaciones (6 tarjetas; cada una: ícono SVG, título, 1 frase, ejemplo real):**

1. **Robótica** — Brazos, autos que esquivan obstáculos y robots seguidores de línea.
   *Ejemplo real:* un auto robot que usa un sensor ultrasónico para no chocar contra las paredes.
2. **Domótica (casa inteligente)** — Automatizar luces, cortinas, riego y seguridad del hogar.
   *Ejemplo real:* que las luces se enciendan solas al detectar movimiento en el pasillo.
3. **Automatización** — Repetir tareas sin intervención humana, con precisión y sin cansancio.
   *Ejemplo real:* una máquina que llena y tapa botellas siempre a la misma velocidad.
4. **Internet de las Cosas (IoT)** — Objetos cotidianos conectados que envían datos a internet.
   *Ejemplo real:* un macetero que te avisa al celular cuando la planta necesita agua.
5. **Agricultura** — Medir humedad del suelo, temperatura y activar el riego automáticamente.
   *Ejemplo real:* un invernadero que riega solo cuando la tierra está seca (¡lo harás con tu kit!).
6. **Arte y música interactivos** — Instalaciones que reaccionan al público con luz y sonido.
   *Ejemplo real:* una escultura cuyas luces cambian según cuánta gente se le acerca.

**Callout de cierre (tarjeta ancha, fondo `--accent-soft`):**
> **Lo bonito es que no necesitas nada de esto por separado.** Tu kit ya trae la placa, los sensores
> y los actuadores para construir varios de estos ejemplos. En las próximas secciones aprenderás la
> electrónica mínima y, muy pronto, tu primer programa.

### 1.3 Íconos SVG requeridos (línea, `stroke="currentColor"`, 24×24, estilo Feather)
`robot`, `casa`, `engranaje`, `nube-wifi`, `planta`, `onda-sonido`. Trazos simples, coherentes con el
ícono del header. No usar librerías externas; inline.

---

## 2. Sección 2 — «Conceptos básicos de electrónica»  (`#electronica-body`)

**Objetivo pedagógico:** dar intuición física (no fórmulas áridas) usando la **analogía del agua**,
que es el estándar didáctico correcto. Cada concepto: explicación simple + dibujo + ejemplo cotidiano.

### 2.1 Estructura visual
1. **Bloque “analogía del agua”** destacado arriba (`.card` ancha con SVG): establece el marco mental
   una sola vez (voltaje=presión, corriente=caudal, resistencia=cañería angosta).
2. **Calculadora interactiva Ley de Ohm** (`.ohm-calc`) — pieza estrella, muy visual e interactiva.
3. **Grid de conceptos** (`.concept-grid`): 12 tarjetas, cada una es un `<details>` (acordeón) o
   tarjeta con front/back. Cada tarjeta: **símbolo/unidad**, **título**, **explicación simple**,
   **mini-SVG**, **ejemplo cotidiano**.

> Data-driven: definir los 12 conceptos en `js/data/electronica.js` como array de objetos y
> renderizar en bucle. Estructura de cada objeto:
> ```js
> { id, nombre, unidad, simbolo, explicacion, ejemplo, svg /* string o nombre de dibujo */ }
> ```

### 2.2 La analogía del agua (bloque superior — copia literal)
> **Imagina la electricidad como agua corriendo por cañerías.** Es la mejor forma de entenderla:
> - La **presión** que empuja el agua es el **voltaje**.
> - La **cantidad de agua** que pasa por segundo es la **corriente**.
> - Una **cañería más angosta** deja pasar menos agua: eso es la **resistencia**.
>
> Con solo estas tres ideas ya entiendes el 90% de la electrónica que necesitas para tu kit.

SVG del bloque: un tramo de cañería con una bomba (presión = voltaje), flujo de gotas (corriente) y
una sección estrecha (resistencia), etiquetado. `role="img"` + `<title>`.

### 2.3 Los 12 conceptos (copia literal — usar tal cual)

> Formato por tarjeta: **[Símbolo · Unidad] — Título** · *Explicación* · *Ejemplo cotidiano* · *Dibujo*.

1. **Voltaje** · símbolo `V` · unidad *voltio (V)*
   - *Explicación:* Es la “fuerza” o presión que empuja a los electrones a moverse. Sin voltaje, no
     hay movimiento de electricidad. Se mide siempre **entre dos puntos** (una diferencia).
   - *Ejemplo cotidiano:* Una pila AA entrega 1,5 V; un puerto USB entrega 5 V; el enchufe de tu casa,
     220 V (¡por eso es peligroso!).
   - *Dibujo:* dos torres de agua a distinta altura → la diferencia de altura es el voltaje.

2. **Corriente** · símbolo `I` · unidad *amperio (A)*
   - *Explicación:* Es la cantidad de electrones que pasan por un cable cada segundo. A más corriente,
     más “caudal” de electricidad.
   - *Ejemplo cotidiano:* Un LED necesita poca corriente (unos 0,02 A = 20 mA); un motor necesita
     mucha más. Por eso un LED se conecta con una resistencia y un motor a veces necesita ayuda extra.
   - *Dibujo:* cañería con gotas moviéndose; contar gotas por segundo.

3. **Resistencia** · símbolo `R` · unidad *ohmio (Ω)*
   - *Explicación:* Es la oposición al paso de la corriente. Una resistencia “frena” los electrones y
     los convierte en un poco de calor. Sirve para **proteger** componentes delicados como los LEDs.
   - *Ejemplo cotidiano:* Una cañería angosta deja pasar menos agua. La resistencia de 220 Ω que
     usarás con los LEDs evita que se quemen.
   - *Dibujo:* resistor con sus bandas de colores + tramo estrecho de cañería.

4. **Potencia** · símbolo `P` · unidad *vatio (W)*
   - *Explicación:* Es la energía que un componente consume o entrega por segundo. Se calcula
     multiplicando voltaje por corriente: **P = V × I**.
   - *Ejemplo cotidiano:* Una ampolleta de 60 W consume más energía que una de 5 W. Tu Arduino
     completo consume alrededor de medio vatio: muy poquito.
   - *Dibujo:* fórmula P = V × I con íconos.

5. **Ley de Ohm** · fórmula `V = I × R`
   - *Explicación:* La regla más importante de toda la electrónica. Relaciona voltaje, corriente y
     resistencia: si conoces dos, puedes calcular la tercera. Se despeja como un triángulo.
   - *Ejemplo cotidiano:* Para encender un LED (que “usa” unos 2 V) desde un pin de 5 V sin quemarlo,
     esta ley te dice qué resistencia poner. (La calculadora de arriba lo hace por ti.)
   - *Dibujo:* el triángulo clásico V arriba, I y R abajo (tapa la que buscas).

6. **Polaridad** · símbolos `+ / −`
   - *Explicación:* Algunos componentes tienen lado positivo y negativo, y **solo funcionan si los
     conectas en el sentido correcto**. Se llaman *polarizados*.
   - *Ejemplo cotidiano:* Un LED solo enciende en un sentido; su pata larga es el **+** (ánodo) y la
     corta el **−** (cátodo). Una pila también: lado plano **−**, lado con “pezón” **+**.
   - *Dibujo:* LED con pata larga/corta marcada + y −.

7. **GND (tierra)** · símbolo `⏚`
   - *Explicación:* Es el punto de referencia de 0 voltios, el “nivel del mar” de tu circuito. **Todo
     voltaje se mide respecto a GND.** Todos los componentes deben compartir el mismo GND.
   - *Ejemplo cotidiano:* Si el voltaje es la altura, GND es el suelo desde donde mides. Sin un suelo
     común, nadie se pone de acuerdo en cuánto mide cada cosa.
   - *Dibujo:* símbolo de tierra + varios componentes conectados a una línea común.

8. **5 V** · pin de alimentación
   - *Explicación:* Es el voltaje principal con el que trabaja el Arduino UNO. La mayoría de tus
     sensores y actuadores se alimentan con 5 V desde el pin marcado `5V`.
   - *Ejemplo cotidiano:* Es el mismo voltaje que entrega un cargador USB de celular.
   - *Dibujo:* pin “5V” de la placa resaltado.

9. **3.3 V** · pin de alimentación
   - *Explicación:* Un segundo voltaje, más bajo, que también entrega la placa. Algunos componentes
     modernos (sobre todo módulos wifi) funcionan a 3,3 V y se **dañan** con 5 V.
   - *Ejemplo cotidiano:* Piensa en 3,3 V como “media presión”: ideal para componentes más delicados.
   - *Dibujo:* pin “3V3” resaltado, junto al de 5V para comparar.

10. **Digital vs Analógico**
    - *Explicación:* Una señal **digital** solo tiene dos estados: encendido o apagado (1 o 0, `HIGH`
      o `LOW`). Una señal **analógica** puede tomar cualquier valor intermedio, como un dimmer de luz.
    - *Ejemplo cotidiano:* Un interruptor de luz común es **digital** (prendido/apagado). La perilla
      del volumen es **analógica** (sube de a poquito). El Arduino lee lo analógico con los pines A0–A5.
    - *Dibujo:* onda cuadrada (digital) vs rampa/onda suave (analógica), lado a lado.

11. **PWM** · *Modulación por Ancho de Pulso* · pines con `~`
    - *Explicación:* Es un truco para **simular una señal analógica usando una digital**. El pin se
      enciende y apaga miles de veces por segundo; si está encendido más tiempo, el resultado “promedio”
      es mayor. Así puedes regular el brillo de un LED o la velocidad de un motor.
    - *Ejemplo cotidiano:* Como pedalear en bici y dejar de pedalear muy rápido: en promedio vas a
      media velocidad. Los pines PWM del UNO son 3, 5, 6, 9, 10 y 11 (llevan el símbolo `~`).
    - *Dibujo:* tres ondas cuadradas con distinto “ancho” (25%, 50%, 75%) y el brillo de LED asociado.

12. **Pull-up y Pull-down** · resistencias
    - *Explicación:* Cuando un pin de entrada no está conectado a nada, “flota” y lee valores al azar.
      Una resistencia **pull-up** lo mantiene en `HIGH` por defecto; una **pull-down**, en `LOW`. Así
      el pin siempre tiene un valor definido hasta que presionas un botón.
    - *Ejemplo cotidiano:* Es como un resorte que devuelve un botón a su posición de reposo: sabes
      cómo está cuando nadie lo toca. El Arduino trae pull-ups internas (`INPUT_PULLUP`).
    - *Dibujo:* botón con resistencia a 5V (pull-up) vs a GND (pull-down).

### 2.4 Calculadora Ley de Ohm (interactiva — spec funcional)
- Tres campos: **Voltaje (V)**, **Corriente (mA)**, **Resistencia (Ω)**.
- El usuario llena **dos** cualquiera → al calcular, muestra el tercero. Si llena los tres, priorizar
  recalcular el último editado o mostrar aviso suave.
- Fórmulas: `V = I·R`, `I = V/R`, `R = V/I`. Ojo unidades: corriente en **mA** → convertir a A
  (dividir por 1000) internamente.
- Extra didáctico: bajo el resultado, mostrar también la **potencia** `P = V·I` en mW.
- Caso de uso guía (texto de ayuda): “Prueba con V = 3 (lo que sobra tras el LED) e I = 20 mA para
  ver por qué se usa una resistencia de ~150–220 Ω”. *(No afirmar un valor exacto de LED; mantenerlo
  como ejercicio.)*
- Validación: no dividir por cero; campos vacíos permitidos; feedback claro. Accesible (labels + aria).

---

## 3. Sección 3 — «Cómo usar un protoboard»  (`#protoboard-body`)

**Objetivo pedagógico:** que Felipe entienda **qué agujeros están conectados entre sí** antes de armar
nada. Es el error #1 de los principiantes.

### 3.1 Estructura visual
1. **Intro breve** (qué es y para qué): 1 párrafo + badge “sin soldar”.
2. **Figura protoboard grande e interactiva** (`.bb-figure`): SVG correcto de una protoboard con
   leyenda. **Interacción:** al pasar el mouse/foco sobre un agujero, se resaltan **todos los agujeros
   eléctricamente conectados** a él. Es la mejor forma de “ver” las conexiones internas.
3. **Cuatro tarjetas explicativas** (`.grid--2`): rieles +, rieles −, columnas, canal central.
4. **Tarjeta de errores comunes** (callout) específica de protoboard.

### 3.2 Copia literal

**Intro:**
> Una **protoboard** (o *breadboard*) es una placa llena de agujeritos que te permite **armar
> circuitos sin soldar nada**: insertas los componentes y los cables a presión, pruebas, y si algo
> está mal, lo desarmas y vuelves a empezar. Es perfecta para aprender y prototipar.
>
> El secreto está en entender qué agujeros están **conectados entre sí por dentro**. No lo están todos:
> siguen un patrón muy simple que verás a continuación.

**Tarjeta 1 — Líneas de alimentación positivas (riel rojo +):**
> Las dos filas marcadas con **+** y una línea roja recorren la placa **a lo largo (horizontal)**.
> Todos los agujeros de esa línea están conectados entre sí. Aquí conectas los **5 V** del Arduino
> para tener “energía disponible” en toda la placa.

**Tarjeta 2 — Líneas de alimentación negativas (riel azul −):**
> Igual que las positivas, pero para **GND (0 V)**. Recorren la placa a lo largo y todos sus agujeros
> están unidos. Conecta aquí el pin **GND** del Arduino. *Estos cuatro rieles (dos + y dos −) se
> llaman buses de alimentación.*

**Tarjeta 3 — Filas y columnas (la zona central):**
> En el centro, los agujeros están conectados **en grupos verticales de cinco**. Cada columna
> (identificada con letras a–e y f–j y números de fila) forma un grupo aislado: los cinco agujeros de
> `a1–e1` están unidos entre sí, pero **no** con la fila 2, ni con la mitad de al lado.

**Tarjeta 4 — El canal central:**
> Por la mitad de la placa corre una **ranura o canal**. Separa eléctricamente la mitad de arriba
> (filas f–j) de la de abajo (a–e). Está pensado justo para **montar chips (circuitos integrados)**:
> cada fila de patitas del chip cae en una columna distinta, sin cruzarse.

**Callout errores comunes (protoboard):**
> ⚠️ **Los tres errores clásicos:**
> - Creer que toda una fila horizontal del centro está conectada — **no**: en el centro la conexión es
>   **vertical**, de a cinco agujeros.
> - Olvidar llevar **5 V y GND** desde el Arduino a los rieles antes de empezar.
> - En algunas protoboards, **los rieles de alimentación se cortan por la mitad**. Si media placa “no
>   tiene energía”, probablemente sea eso: puentea las dos mitades con un cable.

### 3.3 Especificación del SVG de la protoboard (¡debe ser correcto!)
- **Layout:** una protoboard tipo *half+* estándar. De arriba a abajo:
  1. Riel superior: dos líneas horizontales, `+` (roja) y `−` (azul).
  2. Zona superior de columnas: filas de agujeros con etiquetas de columna **f, g, h, i, j** y números
     de fila 1..N a un costado.
  3. **Canal central** (ranura horizontal).
  4. Zona inferior de columnas: etiquetas **a, b, c, d, e**.
  5. Riel inferior: líneas `+` (roja) y `−` (azul).
- **Conectividad que la interacción debe reflejar (regla eléctrica real):**
  - Hover en un agujero de un **riel** → resalta **toda la línea horizontal** de ese riel.
  - Hover en un agujero **central** → resalta **los 5 agujeros de su columna en su mitad** (a–e *o*
    f–j), **sin** cruzar el canal, **sin** incluir la otra fila.
  - Marcar cada agujero con `data-group` (p.ej. `railTop+`, `railTop-`, `colTop-3`, `colBot-3`) para
    que el JS resalte por grupo. Añadir clase `.bb-hole` y estado `.is-highlight`.
- **Accesibilidad:** el SVG lleva `role="img"` + `<title>Protoboard: los agujeros de cada columna
  central están conectados de a cinco</title>`. La interacción es una ayuda extra, no la única vía:
  las 4 tarjetas ya explican todo en texto.
- **Leyenda** (`.bb-legend`): puntos de color → “Riel + (5V)”, “Riel − (GND)”, “Columna conectada”,
  “Canal (separa mitades)”.

> Sugerencia de generación del SVG para el ejecutor: dibujar los agujeros con un bucle en JS y
> construir el `<svg>` como string, en vez de escribir cientos de `<circle>` a mano. Filas centrales:
> ~30 columnas × 5 agujeros por mitad. Mantener `viewBox` proporcional y `max-width:100%`.

---

## 4. Checklist de aceptación (verificar en navegador antes de dar por cerrada la etapa)
- [ ] Las 3 secciones se montan y **no** hay contenedores vacíos.
- [ ] `.reveal` de las secciones inyectadas anima al hacer scroll (reobservación aplicada).
- [ ] Dark mode correcto en todos los bloques nuevos (sin hex sueltos; solo tokens).
- [ ] Calculadora Ley de Ohm: calcula las 3 variantes, convierte mA↔A, muestra potencia, no divide por 0.
- [ ] Protoboard: hover/foco resalta el grupo eléctrico **correcto** (rieles horizontales; columnas de a 5, sin cruzar el canal).
- [ ] Responsive: grids colapsan bien en móvil; ningún desborde horizontal.
- [ ] Teclado: acordeones (`<details>`) y calculadora operables sin mouse; foco visible.
- [ ] Contenido textual **exacto** al de este documento (sin Lorem, sin inventar datos).
```
