# Blueprint de diseño · Secciones 4–7

> **Cubre 4 contenedores:** `#primer-programa-body`, `#blink-body`, `#componentes-body`,
> `#proyectos-body`. (El usuario pidió “primer programa, componentes, proyectos”; Blink es el
> desenlace natural de *Primer programa* y ya tiene su `<section>` en el HTML, así que se especifica
> aquí junto a él.)
>
> **Rol:** define diseño, estructura y **contenido literal, técnicamente verificado**. El ejecutor
> (Sonnet 5) implementa sin decidir contenido ni arquitectura.
>
> **Reglas duras (del usuario):**
> - **Nada de Lorem.** Todo el texto va redactado aquí.
> - **Todo código debe compilar en Arduino UNO R3.** No inventar pines ni conexiones.
> - Usa **exactamente** los 22 componentes del kit (lista en §6.1). Ni uno más, ni uno menos.
> - Mantener el sistema de diseño existente (`css/styles.css`), tokens de color, dark mode y a11y.

---

## 0. Infraestructura compartida (construir ANTES de las secciones)

Estas piezas se usan en las secciones 4–8. Construirlas una vez, en `js/components/`.

### 0.1 Bloque de código con resaltado + botón copiar → `js/components/code-block.js`
Firma: `codeBlock(codigo, { lang = "cpp", title = "" }) → string HTML`.

- **Resaltado de sintaxis offline y CSP-safe.** No usar CDNs. Recomendación firme: un **tokenizer
  mínimo propio** para C/C++/Arduino (palabras clave, tipos, funciones Arduino, números, strings,
  comentarios, directivas `#`). Alcanza con ~40 keywords. Alternativa: vendorizar `highlight.js`
  (un solo archivo) en `js/vendor/`. **Preferir el tokenizer propio** (más liviano, control total).
  - Keywords a colorear: `void setup loop if else for while return const int float bool char byte
    long double true false HIGH LOW INPUT OUTPUT INPUT_PULLUP #include #define`
  - Funciones Arduino a colorear: `pinMode digitalWrite digitalRead analogRead analogWrite delay
    delayMicroseconds millis tone noTone pulseIn Serial map constrain`
- **Botón “Copiar”** arriba a la derecha con feedback “¡Copiado!” (usar `navigator.clipboard`).
- **Numeración de líneas** opcional (parámetro), necesaria para el modo “línea por línea” de Blink.
- Estilo: fondo `var(--code-bg)`, texto `var(--code-text)`, fuente `var(--font-mono)`, borde
  redondeado, scroll horizontal propio (`overflow-x:auto`) para no romper el layout.
- Clases nuevas en CSS: `.code-block`, `.code-block__head`, `.code-block__copy`, `.code-block pre`,
  `.tok-key`, `.tok-fn`, `.tok-num`, `.tok-str`, `.tok-com`, `.tok-pre`.
- Colores de token (definir en tokens, versión light y dark): key=teal, fn=azul, num=ámbar,
  str=verde, com=gris atenuado, pre(directiva)=naranja.

### 0.2 Modal accesible reutilizable → `js/components/modal.js`
Lo usan Componentes (§6) y Proyectos (§7).
- API: `openModal(htmlContent, { labelledBy })` y `closeModal()`.
- Requisitos a11y **obligatorios**: `role="dialog"` + `aria-modal="true"`, **focus-trap** (Tab cicla
  dentro), cerrar con **Esc** y con click en el backdrop, **devolver el foco** al elemento que abrió
  el modal, bloquear scroll del `body` mientras está abierto.
- Animación de entrada suave (fade + slide corto), respetar `prefers-reduced-motion`.
- Clases: `.modal-backdrop`, `.modal`, `.modal__close`, `.modal__body`. Un solo backdrop reutilizable
  inyectado al final del `<body>`.

### 0.3 Nota de re-observación `.reveal`
Igual que en el blueprint 1–3: tras inyectar cada sección, llamar `observeReveals(mount)`
(ya exportada desde `main.js`). El contenido dentro de un modal **no** usa `.reveal`.

---

## 1. Sección 4 — «Tu primer programa»  (`#primer-programa-body`)

**Objetivo pedagógico:** llevar a Felipe de “no tengo nada instalado” a “entiendo qué es un sketch y
cómo se sube”, sin tecnicismos innecesarios.

### 1.1 Estructura visual (orden vertical)
1. **Intro corta** (1 párrafo).
2. **Timeline de 4 pasos** (componente vertical numerado, muy visual): Instalar → Conectar →
   Escribir → Subir. Cada paso con ícono, título, texto y una miniatura SVG cuando aplique.
3. **Mockup SVG del Arduino IDE** (ventana simulada: barra de herramientas con botones Verificar ✓ y
   Subir →, área de editor, y monitor serie). Con anotaciones tipo “globo” señalando cada botón.
4. **Anatomía de un Sketch**: bloque a dos columnas explicando `setup()` vs `loop()` con el código
   mínimo y anotaciones.
5. **Callout puente** hacia Blink (“ahora escribamos el primero de verdad →”).

### 1.2 Copia literal

**Intro:**
> Ya entiendes la electrónica básica. Ahora viene lo divertido: **darle instrucciones a tu Arduino**.
> Para eso necesitas un programa gratuito llamado **Arduino IDE**, donde escribes el código y lo
> envías a la placa. Vamos paso a paso; en cinco minutos tendrás todo listo.

**Timeline — Paso 1 · Instala el Arduino IDE**
> Entra a **arduino.cc/en/software** y descarga el **Arduino IDE** para tu sistema (Windows, Mac o
> Linux). Es gratis y de código abierto. Instálalo como cualquier programa. *(También existe una
> versión online, el Arduino Cloud Editor, pero para empezar la app de escritorio es más simple.)*

**Timeline — Paso 2 · Conecta tu Arduino**
> Une la placa al computador con el **cable USB** del kit. Verás encenderse una luz verde (`ON`) en
> la placa: eso significa que ya tiene energía. En el IDE, ve a **Herramientas → Placa** y elige
> **“Arduino Uno”**, y en **Herramientas → Puerto** selecciona el puerto que apareció al conectarla
> (en Windows suele ser `COM3`, `COM4`…; en Mac, algo como `/dev/cu.usbmodem…`).

**Timeline — Paso 3 · Escribe un Sketch**
> Un **sketch** es el nombre que Arduino le da a un programa. Al abrir el IDE ya te espera un sketch
> vacío con dos bloques: `setup()` y `loop()`. Escribes tu código dentro de ellos (lo vemos en
> detalle más abajo).

**Timeline — Paso 4 · Súbelo a la placa**
> Presiona el botón **Subir** (la flecha →). El IDE primero **compila** (traduce tu código a algo que
> el microcontrolador entiende) y luego lo **transfiere** por USB. Cuando aparezca *“Subido”*, ¡tu
> programa ya está corriendo en el Arduino, incluso si lo desconectas del computador y lo alimentas
> aparte!

**Mockup del IDE — anotaciones (globos):**
- Botón ✓ (redondo, izquierda): **“Verificar: revisa que tu código no tenga errores.”**
- Botón → (a la derecha del anterior): **“Subir: manda el programa a la placa.”**
- Selector de placa/puerto (barra): **“Aquí eliges ‘Arduino Uno’ y el puerto.”**
- Área grande central: **“Editor: aquí escribes tu sketch.”**
- Franja inferior negra: **“Consola: mensajes de compilación y errores.”**

**Anatomía de un Sketch (dos columnas):**

Columna A — el código mínimo (usar `codeBlock`):
```cpp
void setup() {
  // Se ejecuta UNA vez, al encender o reiniciar.
  // Aquí preparas todo: qué pines usas, iniciar el monitor serie, etc.
}

void loop() {
  // Se ejecuta UNA y OTRA vez, para siempre, mientras haya energía.
  // Aquí va lo que tu proyecto hace de forma continua.
}
```

Columna B — explicación:
> **`setup()` — la preparación.** Se ejecuta **una sola vez** cuando la placa se enciende o se
> reinicia. Es donde configuras: qué pines son de entrada o salida (`pinMode`), a qué velocidad
> hablará el monitor serie (`Serial.begin`), etc.
>
> **`loop()` — el corazón.** Cuando `setup()` termina, `loop()` empieza a repetirse **infinitamente**.
> Todo lo que quieras que ocurra “todo el tiempo” (parpadear un LED, leer un sensor, revisar un botón)
> va aquí. Cuando llega al final, vuelve a empezar desde arriba, miles de veces por segundo.
>
> Ambos bloques son **obligatorios**: todo sketch de Arduino los tiene, aunque estén vacíos.

**Callout puente:**
> ¿Listo para tu primer programa de verdad? Empecemos por el clásico universal: hacer parpadear un
> LED. Se llama **Blink** y es el “Hola Mundo” de la electrónica. →

### 1.3 Especificación del mockup SVG del IDE
Ventana estilizada (no pixel-perfect, sí reconocible): barra de título con 3 “semáforos” (círculos
rojo/amarillo/verde), barra de herramientas teal con los dos botones circulares (✓ y →), un selector
tipo “Arduino Uno” con chevron, área de editor con 3–4 líneas de pseudo-código (usar los colores de
token para que se vea “resaltado”), y una franja inferior oscura de consola con texto “Subido.”.
`role="img"` + `<title>`. Debe verse bien en dark y light (usar tokens, no hex crudos salvo los 3
semáforos).

### 1.4 Componente Timeline (clases nuevas)
`.timeline`, `.timeline-step`, `.timeline-step__marker` (círculo numerado con línea vertical
conectora), `.timeline-step__content`. La línea conectora se dibuja con `::before` en el marker.
En móvil se mantiene vertical (ya lo es). Números 1–4 en el marker, color `--accent`.

---

## 2. Blink — el “Hola Mundo”  (`#blink-body`)

**Objetivo pedagógico:** explicar **línea por línea** el sketch más famoso, con diagrama correcto.

### 2.1 Estructura visual
1. **Intro** (qué es y por qué se empieza aquí).
2. **Bloque a dos columnas:** izquierda el `codeBlock` con **numeración de líneas**; derecha, un
   diagrama SVG mostrando el LED integrado (pin 13 / `L`) de la placa. *No requiere protoboard:* el
   UNO ya trae un LED en el pin 13; ese es el que parpadea. (Reusar el LED parpadeante del hero.)
3. **Explicación línea por línea:** lista numerada; cada ítem cita la línea y la explica. Interacción
   opcional (hover en una línea del código resalta su explicación) — si se implementa, con `data-line`.
4. **Variación sugerida** (mini reto): cambiar los `delay` para parpadeo rápido/lento.

### 2.2 Código (el sketch oficial, compila tal cual)
```cpp
// Blink — enciende y apaga el LED integrado de la placa.

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);   // El pin del LED integrado será una salida.
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH); // Enciende el LED (5V en el pin).
  delay(1000);                     // Espera 1000 ms = 1 segundo.
  digitalWrite(LED_BUILTIN, LOW);  // Apaga el LED (0V en el pin).
  delay(1000);                     // Espera 1 segundo con el LED apagado.
}
```

### 2.3 Explicación línea por línea (copia literal)
1. **`// Blink — …`** → Un **comentario**. Todo lo que va después de `//` es una nota para humanos; el
   Arduino la ignora por completo. Sirve para explicar qué hace el código.
2. **`void setup() {`** → Empieza el bloque de preparación, que corre una sola vez al encender.
3. **`pinMode(LED_BUILTIN, OUTPUT);`** → Le decimos al Arduino que el pin del LED integrado
   (`LED_BUILTIN` es un nombre que Arduino ya conoce: equivale al **pin 13**) va a **enviar**
   corriente, es decir, es una **salida** (`OUTPUT`).
4. **`}`** → Cierra el bloque `setup()`.
5. **`void loop() {`** → Empieza el bloque que se repite para siempre.
6. **`digitalWrite(LED_BUILTIN, HIGH);`** → Pone el pin en **HIGH** (5 voltios): el LED **se
   enciende**.
7. **`delay(1000);`** → **Pausa** el programa 1000 milisegundos (1 segundo). Durante ese tiempo el LED
   sigue encendido porque nada lo cambió.
8. **`digitalWrite(LED_BUILTIN, LOW);`** → Pone el pin en **LOW** (0 voltios): el LED **se apaga**.
9. **`delay(1000);`** → Otra pausa de 1 segundo, ahora con el LED apagado.
10. **`}`** → Cierra `loop()`. Al llegar aquí, vuelve a la línea 6 y repite: encender, esperar, apagar,
    esperar… eso es el parpadeo.

### 2.4 Variación (mini reto)
> **Pruébalo tú:** cambia los dos `1000` por `100`. ¿Qué pasa? (El LED parpadeará 10 veces más rápido.)
> Ahora prueba `2000`: parpadeo lento. Acabas de modificar tu primer programa. 🎉

### 2.5 Diagrama
SVG del UNO resaltando el LED integrado rotulado `L` junto al pin 13, con el LED en estado
“encendido” (reusar `.blink-led` del hero). Anotación: “Este LED ya viene en la placa: no necesitas
cables para Blink.” `aria-hidden` o `role="img"` con título.

---

## 3. Sección 6 — «Componentes del kit»  (`#componentes-body`)

**Objetivo pedagógico:** una ficha por componente, con datos correctos, y un modal con la
información profunda. Es la sección más grande.

### 3.1 Estructura visual
1. **Intro** (1 párrafo) + **buscador** (input que filtra por nombre/uso en vivo) + **chips de
   categoría** (filtros): `Todos`, `Básicos`, `Sensores (entradas)`, `Actuadores (salidas)`,
   `Pantallas`, `Control`.
2. **Grid de tarjetas** (`.grid--3` o `.grid--4` en desktop; data-driven desde
   `js/data/componentes.js`). Cada tarjeta abre el **modal** al hacer click o Enter.
3. **Modal** con las 13 secciones de contenido profundo (§3.4).

### 3.2 Los 22 componentes del kit (lista canónica — usar exactamente estos)
`Arduino UNO R3`, `Cable USB`, `Protoboard (breadboard)`, `LEDs`, `Resistencias`, `Servo SG90`,
`Sensor DHT11`, `Pantalla LCD 1602 I2C`, `Módulo Relé (Relay)`, `Sensor de humedad de suelo`,
`Sensor de movimiento PIR`, `Sensor táctil (Touch)`, `Sensor ultrasónico HC-SR04`,
`Interruptor basculante (Rocker Switch)`, `Pantalla OLED 0.96"`, `Sensor de obstáculos (IR)`,
`Display de 4 dígitos`, `Matriz de puntos 8×8 (Dot Matrix)`, `Joystick`, `Buzzer`,
`Display de 7 segmentos`, `Cables Dupont`.

**Categorías (para los chips de filtro):**
- **Básicos:** Arduino UNO R3, Cable USB, Protoboard, Cables Dupont, Resistencias, LEDs, Rocker Switch.
- **Sensores (entradas):** DHT11, Humedad de suelo, PIR, Touch, HC-SR04, Obstáculos IR, Joystick.
- **Actuadores (salidas):** Servo SG90, Relé, Buzzer.
- **Pantallas:** LCD 1602 I2C, OLED 0.96", Display 4 dígitos, Matriz 8×8, Display 7 segmentos.

*(Un componente puede tener una sola categoría principal para el filtro; usar la asignación de arriba.)*

### 3.3 Esquema de datos (`js/data/componentes.js`)
```js
{
  id, nombre, categoria,          // categoria: "basico" | "sensor" | "actuador" | "pantalla"
  icono,                          // SVG inline (ilustración simple del componente)
  descripcionCorta,               // 1 frase para la tarjeta
  paraQueSirve,                   // 1–2 frases
  comoFunciona,                   // 2–3 frases
  voltaje,                        // string, ej "5V" / "3.3–5V"
  pines,                          // string corto, ej "VCC, GND, TRIG, ECHO"
  dificultad,                     // "facil" | "medio" | "dificil"  → badge
  usosReales: [ ... ],            // 2–3 bullets
  // ---- profundo (modal) ----
  detalle,                        // párrafo(s) ampliados
  pinout: [ {pin, descripcion}, ... ],
  conexion,                       // texto: cómo se conecta al Arduino (¡pines reales!)
  codigo,                         // sketch que compila en UNO (o null si es pasivo)
  codigoExplicacion: [ ... ],     // puntos clave del código (líneas a explicar)
  erroresComunes: [ ... ],
  consejos: [ ... ],
  proyectos: [ ... ],             // en qué proyectos del kit se usa
  variaciones,                    // texto corto
  youtube: [ {titulo, query} ],   // enlaces = https://www.youtube.com/results?search_query=<query>
}
```
> **Enlaces de YouTube sin inventar URLs:** usar **búsquedas** (`/results?search_query=`) en lugar de
> IDs de video concretos (que podrían no existir). Así el enlace siempre lleva a resultados reales.

### 3.4 Plantilla del modal (13 secciones, en este orden)
1. Encabezado: ilustración + nombre + badges (voltaje, dificultad, categoría).
2. **Descripción detallada** (`detalle`).
3. **Funcionamiento** (`comoFunciona` ampliado).
4. **Pinout** (tabla `pin → descripción`).
5. **Conexión al Arduino** (`conexion`) + diagrama SVG de conexión.
6. **Código de ejemplo** (`codeBlock`, o nota “no requiere código” para pasivos).
7. **Explicación del código** (line-by-line para anchors; puntos clave para el resto).
8. **Errores comunes** (lista).
9. **Consejos** (lista).
10. **Proyectos donde se usa** (chips).
11. **Variaciones**.
12. **Videos recomendados** (enlaces de búsqueda YouTube).
13. Pie: botón cerrar.

> **Diagramas de conexión:** SVG esquemático (placa simplificada + componente + líneas de colores por
> cable, rojo=5V, negro=GND, otro=señal). No hace falta fotorrealismo; sí que los **pines rotulados
> coincidan** con el texto de `conexion`. Si el volumen lo exige, para los componentes no-anchor basta
> un diagrama de bloques rotulado (Componente.PIN → Arduino.PIN) claro y correcto.

### 3.5 CONTENIDO — Fichas de tarjeta (los 22, verificado)

> Formato: **Nombre** · *corta* · para qué · cómo · **V** · **pines** · dificultad · usos.

1. **Arduino UNO R3** · *El cerebro de todo.* · Ejecuta tu código y coordina sensores y actuadores. ·
   Un microcontrolador ATmega328P lee entradas, decide según tu programa y controla salidas. · **5V**
   · 14 digitales (6 PWM), 6 analógicos, 5V/3V3/GND · **fácil** · Todos los proyectos; es la base.
2. **Cable USB** · *Alimenta y programa la placa.* · Conecta el Arduino al computador para subir
   sketches y darle energía. · Lleva datos y 5V por el mismo cable (tipo A a tipo B). · **5V** · — ·
   **fácil** · Subir programas; alimentar la placa desde el PC o un cargador.
3. **Protoboard (breadboard)** · *Arma circuitos sin soldar.* · Base de prototipado donde insertas
   componentes y cables a presión. · Filas de contactos metálicos conectan los agujeros por grupos
   (ver Sección 3). · **—** · Rieles + / −, columnas de 5 · **fácil** · Todos los proyectos con
   componentes externos.
4. **LEDs** · *Luz que enciendes con código.* · Indicadores luminosos de colores. · Un diodo que
   emite luz cuando la corriente pasa en el sentido correcto; **siempre con resistencia**. · **~2V**
   (usar con 5V + resistencia) · Ánodo (+, pata larga), cátodo (−, pata corta) · **fácil** ·
   Blink, semáforo, indicadores de estado.
5. **Resistencias** · *Protegen limitando la corriente.* · Reducen la corriente para no quemar
   componentes. · Oponen resistencia (Ω) al paso de electrones (ver Ley de Ohm). · **—** · 2 patas,
   sin polaridad · **fácil** · Con cada LED; divisores de voltaje; pull-up/down.
6. **Servo SG90** · *Motor que gira a un ángulo exacto.* · Mueve brazos, compuertas o el “cuello” de
   un radar. · Recibe una señal PWM y posiciona su eje entre 0° y 180°. · **4.8–6V** · Café=GND,
   Rojo=5V, Naranjo=señal (PWM) · **medio** · Radar, barrera, brazo robótico.
7. **Sensor DHT11** · *Mide temperatura y humedad.* · Informa el clima del ambiente. · Un termistor y
   un sensor de humedad envían los datos en digital por un pin. · **3.3–5V** · VCC, DATA, GND ·
   **medio** · Estación meteorológica; control de invernadero.
8. **Pantalla LCD 1602 I2C** · *Muestra 2 líneas de 16 caracteres.* · Despliega texto y datos sin
   PC. · Un chip I2C (dirección 0x27/0x3F) controla la pantalla con solo 2 cables de datos. · **5V** ·
   VCC, GND, SDA→A4, SCL→A5 · **medio** · Mostrar temperatura, mensajes, menús.
9. **Módulo Relé (Relay)** · *Un interruptor que controla el código.* · Enciende cargas de mayor
   voltaje (ampolletas, ventiladores). · Una bobina mueve un contacto mecánico; aísla el Arduino de la
   carga. · **5V** (lógica) · VCC, GND, IN (digital) · **medio** · Encender luces domésticas; riego.
   ⚠️ Precaución con 220V.
10. **Sensor de humedad de suelo** · *Sabe si la tierra está seca.* · Mide cuánta agua tiene la
    tierra. · Dos electrodos miden la conductividad del suelo; más agua = más conductividad. ·
    **3.3–5V** · VCC, GND, AO (analógico), DO (digital) · **fácil** · Sistema de riego automático.
11. **Sensor de movimiento PIR** · *Detecta que alguien se mueve.* · Dispara una acción ante
    movimiento. · Capta los cambios de calor (infrarrojo) de un cuerpo que se mueve. · **5V** · VCC,
    OUT (digital), GND · **fácil** · Alarma; luz que se enciende sola.
12. **Sensor táctil (Touch)** · *Un botón sin partes móviles.* · Reemplaza un pulsador con un toque. ·
    Detecta el cambio de capacitancia de tu dedo (tecnología capacitiva). · **2–5.5V** · VCC, GND, SIG
    (digital) · **fácil** · Interruptores táctiles; lámparas.
13. **Sensor ultrasónico HC-SR04** · *Mide distancia con eco.* · Calcula qué tan lejos está un
    objeto. · Emite un ultrasonido y cronometra cuánto tarda el eco en volver. · **5V** · VCC, TRIG,
    ECHO, GND · **medio** · Radar; auto que esquiva; medidor de distancia.
14. **Interruptor basculante (Rocker Switch)** · *Enciende y apaga a lo físico.* · Corta o permite el
    paso de corriente. · Un contacto mecánico que se queda en la posición que lo dejas. · **—** · 2–3
    terminales · **fácil** · Encender/apagar un proyecto; interruptor general.
15. **Pantalla OLED 0.96"** · *Pantalla nítida de 128×64.* · Muestra texto, íconos y gráficos. ·
    Cada píxel emite su propia luz (no necesita retroiluminación); se controla por I2C. · **3.3–5V** ·
    VCC, GND, SDA→A4, SCL→A5 · **medio** · Relojes, medidores, mini-interfaces.
16. **Sensor de obstáculos (IR)** · *Ve si hay algo enfrente.* · Detecta objetos cercanos sin
    tocarlos. · Un LED infrarrojo emite luz y un receptor mide cuánta rebota. · **5V** · VCC, GND, OUT
    (digital) · **fácil** · Robots; conteo; evitar caídas de una mesa.
17. **Display de 4 dígitos** · *Muestra números de 4 cifras.* · Ideal para relojes y contadores. ·
    Un chip TM1637 controla los 4 dígitos de 7 segmentos con solo 2 pines. · **5V** · VCC, GND, CLK,
    DIO · **medio** · Reloj; cronómetro; marcador.
18. **Matriz de puntos 8×8 (Dot Matrix)** · *64 LEDs para dibujar.* · Muestra letras, íconos y
    animaciones. · Un chip MAX7219 enciende los LEDs en filas/columnas por multiplexado. · **5V** ·
    VCC, GND, DIN, CS, CLK · **difícil** · Letreros; caritas; mini-animaciones.
19. **Joystick** · *Como el de un control de videojuegos.* · Entrega dirección en 2 ejes + un botón. ·
    Dos potenciómetros miden X e Y (0–1023) y un pulsador da el clic. · **5V** · VCC, GND, VRx→A0,
    VRy→A1, SW (digital) · **medio** · Control de servos; menús; juegos.
20. **Buzzer** · *Hace sonidos y melodías.* · Emite pitidos y tonos. · Una lámina piezoeléctrica
    vibra a la frecuencia que le indiques con `tone()`. · **5V** · + (señal), − (GND) · **fácil** ·
    Alarmas; avisos; melodías simples.
21. **Display de 7 segmentos** · *Un dígito grande y brillante.* · Muestra un número (0–9) o letra
    simple. · Siete LEDs en forma de “8” se encienden en combinación para formar cada cifra. ·
    **~2V/segmento** (con resistencias) · Común (cátodo/ánodo) + 7 segmentos + punto · **medio** ·
    Contador; dado electrónico; marcador.
22. **Cables Dupont** · *Los “cables saltadores”.* · Conectan todo entre placa, protoboard y sensores.
    · Puntas macho/hembra que entran a presión en los headers y la protoboard. · **—** · M-M, M-H,
    H-H · **fácil** · Absolutamente todos los proyectos.

### 3.6 CONTENIDO PROFUNDO — Componentes ancla (modal completo, código verificado)

> Estos 5 son los que Felipe usará primero. Van **completos** y sirven de patrón para el resto.

#### 3.6.1 LED
- **Detalle:** Un LED (diodo emisor de luz) convierte electricidad en luz. Es **polarizado**: solo
  funciona en un sentido. La pata larga es el ánodo (+) y va hacia el pin del Arduino (a través de una
  resistencia); la pata corta es el cátodo (−) y va a GND. Sin resistencia, el LED recibe demasiada
  corriente y se quema en segundos.
- **Pinout:** Ánodo (+, pata larga) · Cátodo (−, pata corta).
- **Conexión:** Pin 8 → resistencia 220Ω → ánodo del LED; cátodo del LED → GND. *(Cualquier pin
  digital sirve; usamos el 8.)*
- **Código:**
```cpp
const int led = 8;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);
  delay(500);
}
```
- **Explicación (línea por línea):**
  - `const int led = 8;` → Guardamos el número de pin en un nombre para no repetir “8” por todos lados.
  - `pinMode(led, OUTPUT);` → El pin 8 será una salida (va a entregar corriente).
  - `digitalWrite(led, HIGH);` → 5V en el pin: el LED enciende.
  - `delay(500);` → Espera medio segundo.
  - `digitalWrite(led, LOW);` → 0V: el LED apaga.
- **Errores comunes:** LED al revés (no enciende → dar vuelta las patas); **olvidar la resistencia**
  (se quema); pin equivocado en el código.
- **Consejos:** La resistencia puede ir de cualquier lado del LED, da igual el orden. Usa 220–330Ω
  para 5V. Si dudas de la polaridad, el lado plano del borde del LED es el cátodo (−).
- **Proyectos:** Blink, Semáforo, Botón + LED.
- **Variaciones:** LEDs RGB (tres colores en uno), tiras LED, LEDs de alto brillo.
- **YouTube:** `{titulo:"Cómo conectar un LED con Arduino", query:"arduino led resistencia tutorial español"}`.

#### 3.6.2 Buzzer
- **Detalle:** El buzzer piezoeléctrico produce sonido al vibrar. Con la función `tone()` le indicas
  la **frecuencia** (en hertz): más alta = más agudo. Sirve para alarmas y melodías simples.
- **Pinout:** `+` (señal, suele tener el pin más largo o marca) · `−` (GND).
- **Conexión:** Pin 8 → `+` del buzzer; `−` del buzzer → GND.
- **Código:**
```cpp
const int buzzer = 8;

void setup() {
  pinMode(buzzer, OUTPUT);
}

void loop() {
  tone(buzzer, 1000);  // Suena a 1000 Hz.
  delay(500);
  noTone(buzzer);      // Silencio.
  delay(500);
}
```
- **Explicación:** `tone(pin, frecuencia)` genera el sonido; `noTone(pin)` lo detiene. Con distintos
  valores de frecuencia puedes tocar notas musicales.
- **Errores comunes:** Confundir buzzer **activo** (suena solo con HIGH) con **pasivo** (necesita
  `tone()`); polaridad invertida; usar `delay` muy corto (no se alcanza a oír).
- **Consejos:** Para melodías, define las frecuencias de las notas (DO=262, RE=294, MI=330…). El buzzer
  no necesita resistencia.
- **Proyectos:** Alarma con PIR, avisos de la estación meteorológica, melodía de inicio.
- **Variaciones:** Buzzer activo vs pasivo; parlantes pequeños.
- **YouTube:** `{titulo:"Buzzer y tone() en Arduino", query:"arduino buzzer tone melodia tutorial español"}`.

#### 3.6.3 Servo SG90
- **Detalle:** Un servomotor gira su eje a un **ángulo exacto** (0°–180°) según la señal que recibe.
  Por dentro tiene un motor, engranajes y un circuito que mantiene la posición. Se controla con la
  librería `Servo` (no con `analogWrite`).
- **Pinout:** Café/Marrón = GND · Rojo = 5V · Naranjo/Amarillo = señal (a un pin digital).
- **Conexión:** Rojo → 5V; Café → GND; Naranjo → pin 9. *(El SG90 es pequeño y para movimientos
  suaves puede alimentarse del 5V del Arduino; si el servo tiembla o reinicia la placa, usar
  alimentación externa de 5V con GND común.)*
- **Código:**
```cpp
#include <Servo.h>

Servo miServo;

void setup() {
  miServo.attach(9);   // El servo está en el pin 9.
}

void loop() {
  miServo.write(0);    // Gira a 0°.
  delay(1000);
  miServo.write(90);   // Gira a 90° (centro).
  delay(1000);
  miServo.write(180);  // Gira a 180°.
  delay(1000);
}
```
- **Explicación:**
  - `#include <Servo.h>` → Carga la librería que sabe controlar servos.
  - `Servo miServo;` → Creamos un “objeto” servo con el que daremos órdenes.
  - `miServo.attach(9);` → Le decimos en qué pin está conectada la señal.
  - `miServo.write(angulo);` → Ordena al servo ir a ese ángulo (0–180).
- **Errores comunes:** Alimentar un servo grande desde el Arduino (baja el voltaje y **reinicia la
  placa**); no compartir GND entre servo y Arduino; usar `analogWrite` en vez de la librería.
- **Consejos:** La librería `Servo` viene incluida con el IDE (no hay que instalar nada). No fuerces el
  eje con la mano. Para varios servos, usa fuente externa.
- **Proyectos:** Radar Arduino (servo + HC-SR04), barrera de estacionamiento, brazo robótico.
- **Variaciones:** Servos de rotación continua; servos grandes (MG996R); motores paso a paso.
- **YouTube:** `{titulo:"Controlar un servo SG90", query:"arduino servo sg90 tutorial español"}`.

#### 3.6.4 Sensor ultrasónico HC-SR04
- **Detalle:** Mide distancia como un murciélago: emite un pulso de ultrasonido por `TRIG` y mide en
  `ECHO` cuánto tarda el eco en volver. Como la velocidad del sonido es conocida (~343 m/s), con el
  tiempo se calcula la distancia. Rango útil: 2–400 cm.
- **Pinout:** VCC (5V) · TRIG (disparo, salida del Arduino) · ECHO (eco, entrada al Arduino) · GND.
- **Conexión:** VCC → 5V; GND → GND; TRIG → pin 9; ECHO → pin 10.
- **Código:**
```cpp
const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);       // Pulso de 10 microsegundos.
  digitalWrite(trigPin, LOW);

  long duracion = pulseIn(echoPin, HIGH);   // Tiempo del eco (µs).
  float distancia = duracion * 0.0343 / 2;  // A centímetros.

  Serial.print("Distancia: ");
  Serial.print(distancia);
  Serial.println(" cm");
  delay(500);
}
```
- **Explicación:**
  - Se manda un pulso de **10 µs** por `TRIG` para disparar la medición.
  - `pulseIn(echoPin, HIGH)` mide cuántos microsegundos dura el eco.
  - `distancia = duracion * 0.0343 / 2`: multiplicamos por la velocidad del sonido (0.0343 cm/µs) y
    dividimos por 2 porque el sonido **va y vuelve**.
  - `Serial.print` muestra el resultado en el **Monitor Serie** (lupa arriba a la derecha del IDE).
- **Errores comunes:** Cruzar TRIG y ECHO; no abrir el Monitor Serie a 9600 baudios; medir superficies
  blandas (absorben el sonido) o muy inclinadas (el eco se va para otro lado).
- **Consejos:** Deja el sensor fijo y apuntando de frente. Para un radar, móntalo sobre el servo.
- **Proyectos:** Radar, auto que esquiva obstáculos, medidor de distancia, alarma de proximidad.
- **Variaciones:** Sensores de 3 pines; sensor láser ToF (VL53L0X) para más precisión.
- **YouTube:** `{titulo:"HC-SR04 medir distancia", query:"arduino hc-sr04 ultrasonico distancia tutorial español"}`.

#### 3.6.5 Sensor DHT11
- **Detalle:** Mide **temperatura** (0–50 °C, ±2 °C) y **humedad relativa** (20–90 %, ±5 %). Envía los
  datos ya digitalizados por un solo pin. Necesita la librería **DHT sensor library** (de Adafruit),
  que se instala desde el Gestor de Librerías del IDE.
- **Pinout:** VCC (3.3–5V) · DATA (a un pin digital) · GND. *(El módulo del kit suele traer la
  resistencia pull-up incorporada.)*
- **Conexión:** VCC → 5V; GND → GND; DATA → pin 2.
- **Código:**
```cpp
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float humedad = dht.readHumidity();
  float temp = dht.readTemperature();

  Serial.print("Humedad: ");
  Serial.print(humedad);
  Serial.print(" %  Temp: ");
  Serial.print(temp);
  Serial.println(" C");

  delay(2000);   // El DHT11 se lee cada 2 segundos.
}
```
- **Explicación:**
  - `#define DHTTYPE DHT11` → Le decimos a la librería qué modelo es.
  - `dht.begin();` → Inicia el sensor.
  - `readHumidity()` / `readTemperature()` → Devuelven los valores medidos.
  - `delay(2000)` → El DHT11 es lento: no conviene leerlo más seguido que cada ~2 s.
- **Errores comunes:** No instalar la librería; leerlo muy rápido (da `nan`); confundir el pin DATA;
  esperar decimales precisos (el DHT11 es de baja resolución).
- **Consejos:** Para mejor precisión existe el DHT22 (compatible con el mismo código cambiando el
  tipo). Muestra los datos en la LCD o la OLED para una estación sin PC.
- **Proyectos:** Estación meteorológica, control de invernadero, termómetro de cuarto.
- **Variaciones:** DHT22 (más preciso), BME280 (añade presión).
- **YouTube:** `{titulo:"DHT11 temperatura y humedad", query:"arduino dht11 temperatura humedad tutorial español"}`.

### 3.7 CONTENIDO PROFUNDO — Resto de componentes (datos correctos para expandir)

> Para estos, el ejecutor genera el modal siguiendo el patrón anterior. Aquí van los **hechos
> verificados** (pinout, conexión, código que compila, errores, consejos, proyectos, YouTube). El
> ejecutor redacta la explicación línea-por-línea siguiendo el estilo de los anchors. **No cambiar los
> pines ni el código.**

- **Sensor de humedad de suelo** — Conexión: VCC→5V, GND→GND, **AO→A0**. Código: `analogRead(A0)`;
  valor alto = seco, bajo = húmedo (o al revés según módulo; comentarlo). Errores: dejar la sonda
  siempre energizada la corroe (alimentarla solo al medir); confundir AO (analógico) con DO (digital).
  Proyectos: Sistema de riego. YouTube query: `arduino sensor humedad suelo riego tutorial español`.
  ```cpp
  const int sensor = A0;
  void setup(){ Serial.begin(9600); }
  void loop(){
    int valor = analogRead(sensor);
    Serial.println(valor);      // 0 (mojado) … 1023 (seco), aprox.
    delay(1000);
  }
  ```
- **Sensor PIR** — Conexión: VCC→5V, GND→GND, **OUT→pin 2** (digital). `digitalRead` = HIGH cuando hay
  movimiento. Errores: no esperar el calentamiento inicial (~30–60 s); sensibilidad/tiempo mal
  ajustados (tiene 2 potenciómetros). Proyectos: Detector de movimiento, alarma. YouTube:
  `arduino pir sensor movimiento tutorial español`.
  ```cpp
  const int pir = 2;
  const int led = 13;
  void setup(){ pinMode(pir, INPUT); pinMode(led, OUTPUT); Serial.begin(9600); }
  void loop(){
    if (digitalRead(pir) == HIGH) { digitalWrite(led, HIGH); Serial.println("Movimiento!"); }
    else { digitalWrite(led, LOW); }
    delay(200);
  }
  ```
- **Sensor táctil (Touch TTP223)** — Conexión: VCC→5V, GND→GND, **SIG→pin 2**. `digitalRead`=HIGH al
  tocar. Se usa igual que un botón, sin rebotes mecánicos. Proyectos: interruptor de lámpara.
  YouTube: `arduino sensor tactil ttp223 tutorial español`.
- **Módulo Relé** — Conexión: VCC→5V, GND→GND, **IN→pin 7**. Muchos módulos son **activos en LOW**
  (LOW enciende). Del lado de potencia: COM/NO/NC (a la carga). ⚠️ **Advertencia de seguridad
  obligatoria en el modal:** no manipular 220V sin supervisión de un adulto con experiencia; para
  aprender, usar cargas de bajo voltaje (una ampolleta LED a pilas). Proyectos: riego, luces.
  YouTube: `arduino modulo rele relay tutorial español`.
  ```cpp
  const int rele = 7;
  void setup(){ pinMode(rele, OUTPUT); }
  void loop(){
    digitalWrite(rele, LOW);   // Muchos módulos: LOW = activado.
    delay(2000);
    digitalWrite(rele, HIGH);  // HIGH = desactivado.
    delay(2000);
  }
  ```
- **Sensor de obstáculos (IR)** — Conexión: VCC→5V, GND→GND, **OUT→pin 2**. `digitalRead`=LOW cuando
  detecta un obstáculo (según módulo). Tiene un potenciómetro para el alcance. Proyectos: robot que
  frena ante paredes. YouTube: `arduino sensor obstaculo infrarrojo tutorial español`.
- **Joystick** — Conexión: VCC→5V, GND→GND, **VRx→A0, VRy→A1, SW→pin 2**. `analogRead` de cada eje
  (0–1023, centro ~512); `digitalRead(SW)` para el botón (usar `INPUT_PULLUP`). Proyectos: mover un
  servo, menús. YouTube: `arduino joystick tutorial español`.
  ```cpp
  void setup(){ Serial.begin(9600); pinMode(2, INPUT_PULLUP); }
  void loop(){
    Serial.print(analogRead(A0)); Serial.print(", ");
    Serial.print(analogRead(A1)); Serial.print("  boton: ");
    Serial.println(digitalRead(2));
    delay(200);
  }
  ```
- **LCD 1602 I2C** — Conexión: VCC→5V, GND→GND, **SDA→A4, SCL→A5**. Librería `LiquidCrystal_I2C`,
  dirección `0x27` (o `0x3F`). Errores: dirección I2C equivocada (pantalla en blanco → probar 0x3F);
  contraste (potenciómetro azul en la parte de atrás). Proyectos: mostrar temperatura. YouTube:
  `arduino lcd 1602 i2c tutorial español`.
  ```cpp
  #include <Wire.h>
  #include <LiquidCrystal_I2C.h>
  LiquidCrystal_I2C lcd(0x27, 16, 2);
  void setup(){
    lcd.init(); lcd.backlight();
    lcd.setCursor(0,0); lcd.print("Hola Felipe!");
  }
  void loop(){}
  ```
- **OLED 0.96" (SSD1306)** — Conexión: VCC→3.3–5V, GND→GND, **SDA→A4, SCL→A5**. Librerías
  `Adafruit_SSD1306` + `Adafruit_GFX`, dirección `0x3C`. Errores: confundir dirección; olvidar
  `display.display()` (nada aparece). Proyectos: reloj, medidores. YouTube:
  `arduino oled ssd1306 0.96 tutorial español`.
  ```cpp
  #include <Wire.h>
  #include <Adafruit_GFX.h>
  #include <Adafruit_SSD1306.h>
  Adafruit_SSD1306 display(128, 64, &Wire, -1);
  void setup(){
    display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
    display.clearDisplay();
    display.setTextSize(2); display.setTextColor(SSD1306_WHITE);
    display.setCursor(0,0); display.print("Hola!");
    display.display();
  }
  void loop(){}
  ```
- **Display de 4 dígitos (TM1637)** — Conexión: VCC→5V, GND→GND, **CLK→pin 2, DIO→pin 3**. Librería
  `TM1637Display`. Proyectos: reloj, contador. YouTube: `arduino tm1637 display 4 digitos tutorial
  español`.
  ```cpp
  #include <TM1637Display.h>
  TM1637Display display(2, 3);   // CLK, DIO
  void setup(){ display.setBrightness(5); display.showNumberDec(1234); }
  void loop(){}
  ```
- **Matriz de puntos 8×8 (MAX7219)** — Conexión: VCC→5V, GND→GND, **DIN→pin 11, CS→pin 10,
  CLK→pin 13**. Librería `LedControl`. Dificultad alta. Proyectos: letrero, caritas. YouTube:
  `arduino matriz led max7219 tutorial español`.
  ```cpp
  #include <LedControl.h>
  LedControl lc = LedControl(11, 13, 10, 1);  // DIN, CLK, CS, #dispositivos
  void setup(){ lc.shutdown(0, false); lc.setIntensity(0, 8); lc.clearDisplay(0);
    for (int i=0;i<8;i++) lc.setLed(0, i, i, true);   // una diagonal
  }
  void loop(){}
  ```
- **Display de 7 segmentos (1 dígito)** — Es un conjunto de 7 LEDs (a–g) + punto. Común **cátodo**
  (el común va a GND) o común **ánodo** (a 5V). **Cada segmento necesita su resistencia.** Conexión
  típica (cátodo común): segmentos a–g a 7 pines digitales (ej. 2–8) con resistencias, común→GND.
  Errores: muchísimo cableado; equivocar el tipo (cátodo/ánodo). Proyectos: dado electrónico,
  contador. YouTube: `arduino display 7 segmentos tutorial español`.
- **Resistencias** — Sin código propio. Modal explica: código de colores, valores típicos del kit
  (220Ω para LEDs, 10kΩ para pull-ups), cómo leer las bandas, y que **no tienen polaridad**. YouTube:
  `codigo de colores resistencias explicado español`.
- **Rocker Switch** — Sin código. Interruptor mecánico que abre/cierra un circuito. Modal explica que
  va **en serie** con la línea de alimentación para cortar toda la energía del proyecto. YouTube:
  `interruptor basculante como funciona`.
- **Cables Dupont** — Sin código. Modal explica los tres tipos (M-M, M-H, H-H) y cuándo usar cada uno
  (protoboard↔protoboard M-M; Arduino↔módulo con headers macho suele ser M-H). YouTube:
  `cables dupont jumper para que sirven`.
- **Arduino UNO R3** — Sin “sketch de ejemplo” propio (es la placa). Modal reusa la anatomía de la
  Sección 1 + mapa de pines (digitales 0–13, PWM ~3,5,6,9,10,11; analógicos A0–A5; 5V, 3V3, GND, VIN).
  Errores: alimentar por 5V y USB a la vez con fuentes distintas; cortocircuitar 5V–GND. YouTube:
  `arduino uno partes y pines explicado español`.
- **Cable USB** — Sin código. Modal: tipo A–B, lleva datos + 5V; sirve para programar y alimentar;
  si el PC no reconoce la placa, probar otro cable (algunos son “solo carga”). YouTube:
  `arduino no reconoce puerto com solucion español`.
- **Protoboard** — El modal enlaza a la Sección 3 (ya explicada) en vez de repetir.

---

## 4. Sección 7 — «Proyectos para principiantes»  (`#proyectos-body`)

**Objetivo pedagógico:** práctica progresiva. Tres niveles de dificultad; cada proyecto es una receta
completa que **solo usa piezas del kit**.

### 4.1 Estructura visual
1. **Intro** + leyenda de niveles (badges easy/medium/hard).
2. **Tres grupos** (Nivel 1 / 2 / 3), cada uno con su encabezado y un grid de tarjetas de proyecto.
3. Cada **tarjeta de proyecto** (click → modal, mismo componente `modal.js`) con:
   **Objetivo · Materiales (chips) · Diagrama (SVG) · Código (`codeBlock`) · Explicación ·
   Resultado esperado.**
4. Los “Materiales” son chips que idealmente enlazan al modal del componente correspondiente (§6).

### 4.2 Datos (`js/data/proyectos.js`)
```js
{ id, nivel /*1|2|3*/, nombre, objetivo, materiales:[...], conexion, codigo,
  explicacion:[...], resultado, diagrama /* svg o descriptor */ }
```

### 4.3 CONTENIDO — Nivel 1 (completo)

#### Proyecto 1.1 — Blink
- **Objetivo:** Encender y apagar un LED para dominar `setup()`, `loop()`, `digitalWrite` y `delay`.
- **Materiales:** Solo el Arduino UNO (usa el LED integrado del pin 13).
- **Código:** *(el mismo de §2.2, Blink).*
- **Explicación:** Ver Sección Blink (§2.3).
- **Resultado esperado:** El LED “L” de la placa parpadea cada 1 segundo.

#### Proyecto 1.2 — Semáforo
- **Objetivo:** Controlar tres LEDs en secuencia, como un semáforo real.
- **Materiales:** 3 LEDs (rojo, amarillo, verde), 3 resistencias 220Ω, protoboard, cables Dupont.
- **Conexión:** Pin 8→220Ω→LED rojo; Pin 9→220Ω→LED amarillo; Pin 10→220Ω→LED verde; los tres
  cátodos (−) a GND.
- **Código:**
```cpp
const int rojo = 8;
const int amarillo = 9;
const int verde = 10;

void setup() {
  pinMode(rojo, OUTPUT);
  pinMode(amarillo, OUTPUT);
  pinMode(verde, OUTPUT);
}

void loop() {
  // Verde 3 s
  digitalWrite(verde, HIGH);
  delay(3000);
  digitalWrite(verde, LOW);

  // Amarillo 1 s
  digitalWrite(amarillo, HIGH);
  delay(1000);
  digitalWrite(amarillo, LOW);

  // Rojo 3 s
  digitalWrite(rojo, HIGH);
  delay(3000);
  digitalWrite(rojo, LOW);
}
```
- **Explicación:** Cada LED en su pin; encendemos uno, esperamos, lo apagamos y pasamos al siguiente,
  imitando el ciclo verde → amarillo → rojo.
- **Resultado esperado:** Los tres LEDs se turnan como un semáforo, en bucle.

#### Proyecto 1.3 — Botón + LED
- **Objetivo:** Leer una **entrada** (botón/touch) y reaccionar con una salida (LED). Introduce
  `digitalRead` e `INPUT_PULLUP`.
- **Materiales:** Sensor táctil (o un pulsador), 1 LED, 1 resistencia 220Ω, protoboard, cables.
- **Conexión:** Touch SIG→pin 2 (VCC→5V, GND→GND); Pin 8→220Ω→LED→GND.
- **Código:**
```cpp
const int boton = 2;
const int led = 8;

void setup() {
  pinMode(boton, INPUT);   // El touch entrega HIGH al tocarlo.
  pinMode(led, OUTPUT);
}

void loop() {
  if (digitalRead(boton) == HIGH) {
    digitalWrite(led, HIGH);   // Tocado → LED encendido.
  } else {
    digitalWrite(led, LOW);    // Sin tocar → LED apagado.
  }
}
```
- **Explicación:** `digitalRead` mira el estado del sensor; el `if/else` decide encender o apagar el
  LED. *(Con un pulsador mecánico en vez del touch, usar `INPUT_PULLUP` y comparar con `LOW`.)*
- **Resultado esperado:** El LED se enciende mientras tocas el sensor.

### 4.4 CONTENIDO — Nivel 2 (especificado; el ejecutor completa el código siguiendo los anchors §3.6)

#### Proyecto 2.1 — Sensor de distancia
- **Objetivo:** Medir distancia con el HC-SR04 y mostrarla en el Monitor Serie.
- **Materiales:** HC-SR04, protoboard, cables.
- **Conexión:** VCC→5V, GND→GND, TRIG→9, ECHO→10.
- **Código:** el de §3.6.4 (HC-SR04). **Resultado:** la distancia en cm aparece en el Monitor Serie.

#### Proyecto 2.2 — Controla un Servo
- **Objetivo:** Mover el servo a distintos ángulos; luego controlarlo con el joystick.
- **Materiales:** Servo SG90, (opcional joystick), cables.
- **Conexión:** Servo: rojo→5V, café→GND, naranjo→9. Joystick VRx→A0.
- **Código base:** el de §3.6.3. **Versión con joystick** (a incluir):
```cpp
#include <Servo.h>
Servo miServo;
void setup(){ miServo.attach(9); }
void loop(){
  int x = analogRead(A0);              // 0..1023
  int angulo = map(x, 0, 1023, 0, 180); // a grados
  miServo.write(angulo);
  delay(15);
}
```
- **Explicación:** `map()` convierte el rango del joystick (0–1023) al del servo (0–180°).
- **Resultado:** el servo sigue el movimiento del joystick.

#### Proyecto 2.3 — Mensaje en la LCD
- **Objetivo:** Escribir texto en la pantalla LCD 1602 I2C.
- **Materiales:** LCD 1602 I2C, cables.
- **Conexión:** VCC→5V, GND→GND, SDA→A4, SCL→A5.
- **Código:** el de §3.7 (LCD), ampliado para mostrar un contador que sube cada segundo con `millis`.
- **Resultado:** la pantalla muestra un saludo y un número que aumenta.

### 4.5 CONTENIDO — Nivel 3 (especificado; combina componentes)

#### Proyecto 3.1 — Estación meteorológica
- **Objetivo:** Leer temperatura y humedad con el DHT11 y mostrarlas en la LCD (o la OLED).
- **Materiales:** DHT11, LCD 1602 I2C (o OLED 0.96"), cables.
- **Conexión:** DHT11 DATA→2 (VCC→5V, GND→GND); LCD SDA→A4, SCL→A5.
- **Código:** combinar §3.6.5 (DHT11) + §3.7 (LCD): leer cada 2 s y `lcd.print` de temp y humedad.
- **Explicación:** el `loop` lee el sensor y actualiza la pantalla; se usa `delay(2000)` por el ritmo
  del DHT11. **Resultado:** una mini estación que muestra el clima del cuarto sin PC.

#### Proyecto 3.2 — Detector de movimiento (alarma)
- **Objetivo:** Sonar el buzzer y encender un LED cuando el PIR detecta movimiento.
- **Materiales:** PIR, buzzer, LED, resistencia 220Ω, cables.
- **Conexión:** PIR OUT→2; buzzer→8; LED→pin 13 (integrado) o pin externo con resistencia.
- **Código:** combinar PIR (§3.7) + buzzer (`tone`). Al detectar HIGH en el PIR: `tone(8, 1000)` +
  LED HIGH; si no, silencio y LED LOW.
- **Explicación:** el PIR necesita ~30–60 s de calentamiento al inicio. **Resultado:** alarma sonora y
  visual ante movimiento.

#### Proyecto 3.3 — Sistema de riego automático
- **Objetivo:** Regar (activar el relé/una bomba) cuando la tierra está seca.
- **Materiales:** Sensor de humedad de suelo, módulo relé, cables. *(La “bomba” puede simularse con un
  LED o el buzzer para aprender sin agua ni 220V.)*
- **Conexión:** Sensor AO→A0 (VCC→5V, GND→GND); Relé IN→7.
- **Código:** leer `analogRead(A0)`; si supera un umbral de “seco”, activar el relé (recordar que
  muchos son activos en LOW); si no, apagarlo. Incluir el umbral como constante comentada.
- **Explicación:** un `if` compara la lectura con el umbral. ⚠️ Advertencia: no mezclar agua con 220V;
  para practicar, usar el relé con una carga de bajo voltaje o un LED. **Resultado:** el riego se
  activa solo cuando hace falta.

#### Proyecto 3.4 — Radar Arduino
- **Objetivo:** Montar el HC-SR04 sobre el servo para barrer 0–180° y medir distancia en cada ángulo
  (el clásico “radar”).
- **Materiales:** Servo SG90, HC-SR04, cables (idealmente el sensor fijado al brazo del servo).
- **Conexión:** Servo señal→9; HC-SR04 TRIG→10, ECHO→11 (VCC→5V, GND→GND ambos).
- **Código:** un `for` que mueve el servo de 0 a 180 (y de vuelta) y, en cada ángulo, mide la
  distancia y la envía por Serial como `angulo,distancia`.
```cpp
#include <Servo.h>
Servo radar;
const int trigPin = 10, echoPin = 11;

float medir() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long d = pulseIn(echoPin, HIGH);
  return d * 0.0343 / 2;
}

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT); pinMode(echoPin, INPUT);
  radar.attach(9);
}

void loop() {
  for (int a = 0; a <= 180; a++) {
    radar.write(a); delay(30);
    Serial.print(a); Serial.print(","); Serial.println(medir());
  }
  for (int a = 180; a >= 0; a--) {
    radar.write(a); delay(30);
    Serial.print(a); Serial.print(","); Serial.println(medir());
  }
}
```
- **Explicación:** por cada grado, el servo se posiciona, se mide la distancia y se imprime el par
  `ángulo,distancia`. *(La clásica pantalla verde de radar se hace con Processing en el PC; mencionarlo
  como extra opcional, no obligatorio.)* **Resultado:** un radar que barre y reporta obstáculos por
  ángulo.

---

## 5. Checklist de aceptación
- [ ] `code-block.js` y `modal.js` construidos y reutilizados (no duplicar lógica en cada sección).
- [ ] Resaltado de sintaxis funciona **offline** (sin CDN); botón copiar funciona.
- [ ] Modal accesible: foco atrapado, Esc cierra, foco vuelve al disparador, scroll del body bloqueado.
- [ ] Sección 4: timeline de 4 pasos + mockup del IDE + anatomía setup/loop, texto exacto.
- [ ] Blink: código + explicación de las 10 líneas, exactos.
- [ ] Componentes: **22 tarjetas** (ni más ni menos), buscador y filtros por categoría funcionando.
- [ ] Cada modal de componente abre con las 13 secciones; anchors completos; resto con datos correctos.
- [ ] **Ningún pin ni código inventado:** todo coincide con este documento. Sketches compilan en UNO R3.
- [ ] Relé y riego incluyen la **advertencia de seguridad** sobre 220V.
- [ ] Proyectos: Nivel 1 completos; Nivel 2–3 con objetivo, materiales, conexión, código y resultado.
- [ ] Enlaces de YouTube usan `search_query` (búsquedas), no IDs de video inventados.
- [ ] Responsive y dark mode correctos; sin overflow horizontal; teclado operable.
```
