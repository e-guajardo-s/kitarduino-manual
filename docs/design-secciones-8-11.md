# Blueprint de diseño · Secciones 8–11

> **Cubre 4 contenedores:** `#programacion-body`, `#errores-body`, `#buenas-practicas-body`,
> `#recursos-body`. (El usuario pidió “programación, errores, recursos”; *Buenas prácticas* ya tiene
> su `<section>` en el HTML entre Errores y Recursos, así que se especifica aquí para no dejarla
> vacía — es la compañera natural de *Errores comunes*.)
>
> **Rol:** define diseño, estructura y **contenido literal, técnicamente verificado**. El ejecutor
> (Sonnet 5) implementa sin decidir contenido ni arquitectura.
>
> **Reglas duras:** nada de Lorem · todo código compila en UNO R3 · **no inventar URLs** (§11 lista
> las permitidas; para lo demás, usar búsquedas) · reutilizar el sistema de diseño y la
> infraestructura ya construida (`codeBlock`, `.card`, `.badge`, `<details>`, `observeReveals`).

---

## 0. Reutilización (no construir de nuevo)
- **Bloques de código:** usar `codeBlock(codigo, { title })` de `js/components/code-block.js`. Ya hay
  resaltado + copiar. Para estas secciones **no** hace falta `lineNumbers` (salvo donde se indique).
- **Acordeones:** usar `<details class="...">` nativo (accesible por teclado), mismo patrón que
  `.concept-card` de la Sección 2.
- **Datos:** `js/data/programacion.js`, `js/data/errores.js`, `js/data/buenas-practicas.js`,
  `js/data/recursos.js`. Secciones en `js/sections/` con `render(mount)` + `observeReveals(mount)`.
- **Sin modales** en estas secciones: todo es contenido inline de referencia.
- **Clases nuevas** (añadir a `styles.css`): `.prog-group`, `.prog-concept`, `.trouble-list`,
  `.trouble-item`, `.practice-card`, `.code-compare`, `.code-compare__col`, `.resource-group`,
  `.resource-card`. Todas con tokens y dark mode.

---

## 1. Sección 8 — «Aprende programación»  (`#programacion-body`)

**Objetivo pedagógico:** enseñar los 17 conceptos de programación **desde cero**, agrupados por tema
(no una lista plana), cada uno con explicación simple + ejemplo de código corto que compila.

### 1.1 Estructura visual
1. **Intro** (1 párrafo): el código es dar instrucciones ordenadas; no hay que memorizar, sino
   entender la idea de cada pieza.
2. **5 grupos temáticos**, cada uno con encabezado + breve intro + tarjetas de concepto. Cada
   **tarjeta de concepto** (`.prog-concept`): nombre + “qué es” (1 frase) + `codeBlock` + explicación.
3. Data-driven desde `js/data/programacion.js` (array de grupos → array de conceptos).

Esquema de datos:
```js
// grupo
{ id, titulo, intro, conceptos: [ { nombre, sintaxis /*etiqueta corta ej "int"*/, quEs, codigo, explicacion } ] }
```

### 1.2 Los 5 grupos y su contenido (copia literal + código verificado)

#### Grupo A — «Variables: guardar datos»
*Intro:* Una **variable** es como una caja con etiqueta donde guardas un valor para usarlo después.
Antes de usar una caja, dices de qué **tipo** es lo que va a guardar.

1. **Variable** · `=` · *Qué es:* Una caja con nombre que guarda un valor y lo recuerda.
   ```cpp
   int edad = 18;      // guardamos 18 en una caja llamada "edad"
   edad = edad + 1;    // ahora la caja vale 19
   ```
   *Explicación:* Creas la caja diciendo su tipo (`int`), su nombre (`edad`) y su valor inicial.
   Después puedes leerla o cambiarla cuando quieras.

2. **int** · `int` · *Qué es:* Guarda números **enteros** (sin decimales).
   ```cpp
   int leds = 3;
   int temperatura = -5;
   ```
   *Explicación:* Es el tipo más usado. En el Arduino UNO un `int` va desde −32.768 hasta 32.767.

3. **float** · `float` · *Qué es:* Guarda números **con decimales**.
   ```cpp
   float distancia = 12.5;
   float promedio = 3.75;
   ```
   *Explicación:* Se usa cuando necesitas precisión, como la distancia del sensor ultrasónico en cm.

4. **bool** · `bool` · *Qué es:* Guarda solo **verdadero o falso** (`true` / `false`).
   ```cpp
   bool encendido = true;
   bool puertaAbierta = false;
   ```
   *Explicación:* Perfecta para recordar estados de sí/no: ¿está encendido? ¿se presionó el botón?

5. **String** · `String` · *Qué es:* Guarda **texto** (palabras, frases).
   ```cpp
   String nombre = "Felipe";
   String saludo = "Hola " + nombre;   // "Hola Felipe"
   ```
   *Explicación:* El texto va entre comillas dobles. Puedes unir textos con `+`.

6. **const** · `const` · *Qué es:* Una variable que **nunca cambia** después de crearse.
   ```cpp
   const int LED_PIN = 13;   // el pin del LED no cambiará jamás
   ```
   *Explicación:* Útil para números fijos como pines. Si intentas cambiarla, el IDE te avisa con un
   error — eso te protege de equivocaciones.

7. **#define** · `#define` · *Qué es:* Le pone **nombre a un valor fijo** antes de compilar.
   ```cpp
   #define LED_PIN 13   // el compilador reemplaza LED_PIN por 13
   ```
   *Explicación:* Se parece a `const`. La diferencia: `#define` es un “buscar y reemplazar” de texto
   que ocurre antes de compilar, y no lleva punto y coma. Hoy se prefiere `const`, pero verás
   `#define` en muchos ejemplos (como con el DHT11).

#### Grupo B — «Decisiones: elegir qué hacer»
*Intro:* Los programas se vuelven inteligentes cuando **toman decisiones** según lo que pasa.

8. **if** · `if` · *Qué es:* Ejecuta un bloque **solo si** una condición es verdadera.
   ```cpp
   if (temperatura > 30) {
     digitalWrite(ventilador, HIGH);
   }
   ```
   *Explicación:* Entre paréntesis va la condición. Si se cumple, corre lo que está entre las llaves;
   si no, lo salta.

9. **else** · `else` · *Qué es:* Lo que se hace **si la condición NO se cumple**.
   ```cpp
   if (digitalRead(boton) == HIGH) {
     digitalWrite(led, HIGH);
   } else {
     digitalWrite(led, LOW);
   }
   ```
   *Explicación:* `if/else` es un cruce de caminos: un lado si es verdadero, el otro si es falso.

10. **switch** · `switch` · *Qué es:* Elige entre **muchas opciones** para una misma variable.
    ```cpp
    switch (modo) {
      case 1:
        digitalWrite(led, HIGH);
        break;
      case 2:
        tone(buzzer, 1000);
        break;
      default:
        // si no es ninguno de los anteriores
        break;
    }
    ```
    *Explicación:* Más limpio que muchos `if` seguidos cuando revisas los valores de una sola
    variable. El `break` evita que se “cuele” al siguiente caso; `default` es el “si ninguno”.

#### Grupo C — «Repetir: bucles»
*Intro:* Cuando algo se repite, no lo escribes muchas veces: usas un **bucle**.

11. **for** · `for` · *Qué es:* Repite un bloque un **número conocido** de veces.
    ```cpp
    for (int i = 0; i < 5; i++) {
      digitalWrite(led, HIGH);
      delay(200);
      digitalWrite(led, LOW);
      delay(200);
    }
    ```
    *Explicación:* Tiene tres partes: empieza (`i = 0`), condición para seguir (`i < 5`) y qué hacer
    en cada vuelta (`i++`, sumar 1). Este ejemplo parpadea el LED 5 veces.

12. **while** · `while` · *Qué es:* Repite **mientras** una condición sea verdadera.
    ```cpp
    while (digitalRead(boton) == LOW) {
      // no hace nada: espera a que presionen el botón
    }
    ```
    *Explicación:* Se usa cuando no sabes cuántas veces se repetirá, solo la condición para parar.
    Cuidado: si la condición nunca se vuelve falsa, el programa se queda “atrapado”.

#### Grupo D — «Organizar: funciones y listas»
*Intro:* Para que tu código no sea un desorden, lo agrupas en piezas con nombre.

13. **Funciones** · `void` · *Qué es:* Un **bloque de código con nombre** que puedes reutilizar.
    ```cpp
    void parpadear(int pin, int veces) {
      for (int i = 0; i < veces; i++) {
        digitalWrite(pin, HIGH);
        delay(200);
        digitalWrite(pin, LOW);
        delay(200);
      }
    }

    // Luego, en loop() la llamas así:
    // parpadear(13, 3);
    ```
    *Explicación:* Defines una vez cómo “parpadear” y la usas cuantas veces quieras, cambiando el pin
    y las repeticiones. `setup()` y `loop()` también son funciones.

14. **Arrays** · `[]` · *Qué es:* Una **lista** de valores guardados en una sola variable.
    ```cpp
    int pines[3] = {8, 9, 10};
    digitalWrite(pines[0], HIGH);   // el primero (índice 0)
    digitalWrite(pines[2], HIGH);   // el tercero (índice 2)
    ```
    *Explicación:* En vez de tres variables, tienes una lista. Se cuenta **desde 0**: el primer
    elemento es `pines[0]`. Ideal junto a un `for` para recorrer todos.

#### Grupo E — «Comunicarse y medir el tiempo»
*Intro:* Herramientas que usarás en casi todos tus programas.

15. **Serial.print** · `Serial` · *Qué es:* Envía texto **del Arduino al computador** (Monitor Serie).
    ```cpp
    void setup() {
      Serial.begin(9600);          // inicia la comunicación
    }
    void loop() {
      Serial.println("Hola!");     // escribe en el Monitor Serie
      delay(1000);
    }
    ```
    *Explicación:* Tu mejor amigo para **depurar**: te deja “ver” qué está pensando el Arduino. Abre
    el Monitor Serie con la lupa (arriba a la derecha del IDE) a 9600 baudios. `println` agrega un
    salto de línea; `print` no.

16. **delay** · `delay` · *Qué es:* **Pausa** el programa una cantidad de milisegundos.
    ```cpp
    delay(1000);   // espera 1 segundo (1000 ms)
    ```
    *Explicación:* Simple pero **bloquea todo**: durante la pausa, el Arduino no puede hacer nada más
    (ni leer botones). Está bien para empezar; más adelante se reemplaza por `millis()`.

17. **millis** · `millis` · *Qué es:* Dice **cuántos milisegundos** pasaron desde que se encendió.
    ```cpp
    unsigned long anterior = 0;

    void loop() {
      unsigned long ahora = millis();
      if (ahora - anterior >= 1000) {
        anterior = ahora;
        // pasó 1 segundo, SIN bloquear el resto del programa
      }
    }
    ```
    *Explicación:* Es como mirar un cronómetro en vez de quedarte esperando. Permite hacer **varias
    cosas “a la vez”** (parpadear un LED y leer un botón al mismo tiempo). Lo profundizamos en Buenas
    prácticas.

### 1.3 Visuales opcionales (si el tiempo lo permite; no bloquean la sección)
Pequeños SVG conceptuales para 3–4 ideas clave, en el estilo de línea del sitio:
- **Variable:** una caja con etiqueta y un valor adentro.
- **if/else:** un camino que se bifurca en dos.
- **for:** una flecha circular con un contador.
- **Array:** una fila de cajitas numeradas 0, 1, 2.
Son un plus visual; si no, las tarjetas con código ya comunican bien.

---

## 2. Sección 9 — «Errores comunes»  (`#errores-body`)

**Objetivo pedagógico:** una guía de diagnóstico. Cada problema frecuente con sus causas y la
solución paso a paso. Reduce la frustración (la causa #1 de abandono al empezar).

### 2.1 Estructura visual
1. **Intro** + un **recuadro de método** (cómo diagnosticar en general).
2. **Lista de 7 problemas** como acordeones (`<details class="trouble-item">`): el `summary` muestra
   un ícono de alerta + el síntoma; al abrir, muestra **causas probables** y **cómo solucionarlo**
   (lista de pasos). Data-driven desde `js/data/errores.js`.

Esquema de datos:
```js
{ id, sintoma, causas: [...], solucion: [...] }   // solucion = pasos accionables
```

### 2.2 Recuadro de método (copia literal, va arriba)
> **Antes de frustrarte, diagnostica como un detective:**
> - **Lee el mensaje de error completo** (la franja de abajo del IDE): casi siempre dice la línea y
>   qué pasó.
> - **Cambia una sola cosa a la vez** y vuelve a probar. Si cambias tres, no sabrás cuál era.
> - **Usa `Serial.println()`** para “ver” qué está haciendo tu programa por dentro.
> - **Revisa lo simple primero:** ¿está bien conectado? ¿el pin del código es el pin real? ¿GND
>   compartido?

### 2.3 Los 7 problemas (copia literal)

1. **“No aparece el puerto” (Herramientas → Puerto vacío o gris)**
   - *Causas:* Cable USB de “solo carga” (no transmite datos); falta el driver del chip USB (común en
     placas clon con chip CH340); la placa no está bien conectada; el puerto lo ocupa otro programa.
   - *Solución:* 1) Prueba **otro cable USB** que sí sea de datos. 2) Si tu placa es un clon, instala
     el **driver CH340**. 3) Revisa que la luz `ON` de la placa esté encendida. 4) Reconecta y mira
     de nuevo el menú **Herramientas → Puerto**.

2. **“No compila” (error en rojo al Verificar)**
   - *Causas:* Falta un **punto y coma `;`** al final de una línea; una **llave `}` sin cerrar**; un
     nombre **mal escrito** (mayúsculas cuentan); una **librería no instalada** (`.h: No such file`).
   - *Solución:* 1) Lee el error: te dice la **línea**. 2) Revisa el punto y coma de esa línea y la
     anterior. 3) Cuenta que cada `{` tenga su `}`. 4) Si dice “No such file”, instala la librería
     desde **Herramientas → Gestor de Librerías**.

3. **“No carga / error al subir” (compila bien pero falla al Subir)**
   - *Causas:* Placa o puerto mal seleccionados; el puerto está **ocupado** (otra ventana con el
     Monitor Serie abierto); mala conexión del cable. El mensaje `avrdude: stk500_getsync()` significa
     que el IDE no logra hablar con la placa.
   - *Solución:* 1) Verifica **Herramientas → Placa = “Arduino Uno”** y el **Puerto** correcto.
     2) Cierra otras ventanas del IDE o del Monitor Serie que usen el puerto. 3) Presiona el botón
     **Reset** de la placa justo antes de subir. 4) Prueba otro cable/puerto USB.

4. **“El LED no enciende o está al revés”**
   - *Causas:* Polaridad invertida (el LED es polarizado); **falta la resistencia** o el LED se quemó;
     el **pin del código** no es el pin real; LED defectuoso.
   - *Solución:* 1) Da vuelta el LED: la **pata larga (+)** va hacia el pin (vía resistencia), la
     **corta (−)** a GND. 2) Confirma que haya una resistencia (220–330Ω). 3) Revisa que el número de
     pin del código coincida con el físico. 4) Prueba con otro LED.

5. **“El servo no funciona, tiembla o reinicia la placa”**
   - *Causas:* Alimentación insuficiente (un servo exige más corriente de la que da el pin); **GND no
     compartido** entre servo y Arduino; pin de señal equivocado; usar `analogWrite` en vez de la
     librería `Servo`.
   - *Solución:* 1) Si tiembla o la placa se reinicia, usa una **fuente externa de 5V** y **une los
     GND**. 2) Verifica que el cable naranjo (señal) esté en el pin que dice el código. 3) Usa
     `#include <Servo.h>` y `miServo.write(angulo)`, no `analogWrite`.

6. **“El sensor no responde o da valores raros”**
   - *Causas:* **VCC y GND invertidos**; pin de datos equivocado; falta la **librería**; lo lees
     **demasiado rápido** (el DHT11 devuelve `nan` si lo consultas antes de 2 s); no esperaste el
     **calentamiento** (el PIR necesita ~30–60 s).
   - *Solución:* 1) Revisa el cableado con la ficha del componente (sección Componentes). 2) Abre el
     **Monitor Serie** e imprime la lectura para ver qué pasa. 3) Respeta los tiempos: `delay(2000)`
     con el DHT11, espera inicial con el PIR. 4) Instala la librería que pide el sensor.

7. **“La pantalla LCD está encendida pero sin texto”**
   - *Causas:* **Contraste** mal ajustado (lo más común); **dirección I2C** equivocada (0x27 vs 0x3F);
     `SDA`/`SCL` cruzados o no conectados a **A4/A5**; falta la librería.
   - *Solución:* 1) Gira el **potenciómetro azul** de la parte de atrás hasta que aparezca el texto.
     2) Si sigue en blanco, prueba la dirección **`0x3F`** en el código. 3) Confirma **SDA→A4** y
     **SCL→A5**. 4) Un sketch “I2C Scanner” te dice la dirección exacta de tu módulo.

---

## 3. Sección 10 — «Buenas prácticas»  (`#buenas-practicas-body`)

**Objetivo pedagógico:** enseñar a escribir código **limpio y mantenible**, con comparaciones
visuales “antes / después” que se entienden de un vistazo.

### 3.1 Estructura visual
1. **Intro** (1 párrafo): el código no solo tiene que funcionar, tiene que **entenderse** (por ti
   mismo dentro de un mes, o por quien te ayude).
2. **6 tarjetas de práctica** (`.practice-card`). Las que se prestan llevan un **comparador de código
   `❌ Antes / ✅ Después`** (`.code-compare`, dos `codeBlock` lado a lado, que se apilan en móvil).
   Data-driven desde `js/data/buenas-practicas.js`.

Esquema:
```js
{ id, titulo, texto, antes /*codigo|null*/, despues /*codigo|null*/ }
```

### 3.2 Las 6 prácticas (copia literal + código)

1. **Organiza tu código** — *(sin comparador)*
   > Mantén siempre el mismo orden: primero las **constantes** (pines, valores fijos), luego
   > `setup()`, después `loop()`, y al final tus **funciones auxiliares**. Agrupa lo que está
   > relacionado. Un código ordenado se lee como una receta, de arriba hacia abajo.

2. **Comenta el “por qué”, no lo obvio**
   - *Texto:* Un buen comentario explica **por qué** haces algo, no repite lo que el código ya dice.
     Demasiados comentarios obvios estorban tanto como ninguno.
   - *Antes:*
     ```cpp
     i = i + 1;   // le suma 1 a i
     delay(2000); // espera 2000
     ```
   - *Después:*
     ```cpp
     i = i + 1;
     delay(2000); // el DHT11 no se puede leer más seguido que cada 2 s
     ```

3. **Nombra bien tus variables**
   - *Texto:* Un nombre descriptivo vale más que mil comentarios. `pinLed` se entiende solo; `x` te
     obliga a adivinar. Sé consistente y usa el mismo idioma.
   - *Antes:*
     ```cpp
     int x = 13;
     int y = 220;
     digitalWrite(x, HIGH);
     ```
   - *Después:*
     ```cpp
     const int pinLed = 13;
     const int resistencia = 220;
     digitalWrite(pinLed, HIGH);
     ```

4. **Entiende por qué `delay()` es un problema**
   - *Texto:* `delay()` **congela** todo el programa: durante la pausa, el Arduino no puede leer un
     botón, ni un sensor, ni nada. Para un solo LED da igual, pero apenas quieras hacer dos cosas “a
     la vez”, se vuelve un estorbo.
   - *Antes:*
     ```cpp
     void loop() {
       digitalWrite(led, HIGH);
       delay(1000);   // aquí el botón NO se puede leer
       digitalWrite(led, LOW);
       delay(1000);   // ni aquí
     }
     ```
   - *Después:* *(ver la práctica siguiente: la solución es `millis()`)*

5. **Usa `millis()` para hacer varias cosas a la vez**
   - *Texto:* En lugar de esperar bloqueando, revisas el “cronómetro” `millis()` y actúas cuando toca.
     Así el `loop()` sigue girando y puede atender otras tareas entre medio.
   - *Antes:*
     ```cpp
     digitalWrite(led, HIGH);
     delay(1000);
     digitalWrite(led, LOW);
     delay(1000);
     ```
   - *Después:*
     ```cpp
     unsigned long anterior = 0;
     bool encendido = false;

     void loop() {
       if (millis() - anterior >= 1000) {
         anterior = millis();
         encendido = !encendido;             // invierte el estado
         digitalWrite(led, encendido);
       }
       // Aquí el programa SIGUE libre para leer botones, sensores, etc.
     }
     ```

6. **Divide en funciones (modulariza)**
   - *Texto:* Si `loop()` se hace largo, pártelo en **funciones con nombre claro**. Cada función hace
     una cosa. Así `loop()` se lee como un resumen y encuentras los errores más rápido.
   - *Antes:*
     ```cpp
     void loop() {
       int d = pulseIn(echoPin, HIGH) * 0.0343 / 2;
       if (d < 20) { tone(buzzer, 1000); }
       else { noTone(buzzer); }
       // ...20 líneas más mezcladas...
     }
     ```
   - *Después:*
     ```cpp
     void loop() {
       float distancia = medirDistancia();
       avisarSiCerca(distancia);
     }

     float medirDistancia() {
       return pulseIn(echoPin, HIGH) * 0.0343 / 2;
     }

     void avisarSiCerca(float d) {
       if (d < 20) tone(buzzer, 1000);
       else noTone(buzzer);
     }
     ```

---

## 4. Sección 11 — «Recursos»  (`#recursos-body`)

**Objetivo pedagógico:** dejar a Felipe con un mapa claro de dónde seguir aprendiendo. Enlaces
**reales y estables**.

### 4.1 Estructura visual
1. **Intro** (1 frase).
2. **5 grupos de recursos** (`.resource-group`), cada uno con un grid de **tarjetas-enlace**
   (`.resource-card`: ícono + título + descripción + enlace). Data-driven desde
   `js/data/recursos.js`. Los enlaces abren en pestaña nueva (`target="_blank" rel="noopener"`).

Esquema:
```js
// grupo
{ id, titulo, recursos: [ { titulo, descripcion, url } ] }
```

### 4.2 Contenido (URLs verificadas — usar EXACTAMENTE estas, no inventar)

> **Regla:** para canales de YouTube y datasheets de sensores, usar **enlaces de búsqueda**
> (`https://www.youtube.com/results?search_query=…` o el buscador correspondiente), nunca IDs o PDFs
> inventados. Los sitios web listados abajo son estables y reales.

**Grupo 1 — Documentación oficial de Arduino**
- **Arduino (sitio oficial)** — La página madre: software, guías y tienda. → `https://www.arduino.cc`
- **Arduino Docs** — Documentación oficial de placas y librerías. → `https://docs.arduino.cc`
- **Referencia del lenguaje** — Todas las funciones (`digitalWrite`, `millis`, etc.) explicadas con
  ejemplos. → `https://www.arduino.cc/reference/es/`
- **Project Hub** — Miles de proyectos de la comunidad con código y esquemas. →
  `https://projecthub.arduino.cc`

**Grupo 2 — Aprender en español**
- **Luis Llamas** — Tutoriales en español, claros y muy completos, de casi cualquier componente. →
  `https://www.luisllamas.es`
- **Programarfacil** — Cursos y artículos de Arduino en español. → `https://programarfacil.com`
- **Aprendiendo Arduino** — Material de curso ordenado por temas. →
  `https://aprendiendoarduino.wordpress.com`

**Grupo 3 — Practicar y simular**
- **Tinkercad Circuits** — Simulador online gratis: arma circuitos Arduino y prueba tu código **sin
  tener la placa a mano**. Ideal para experimentar sin miedo. → `https://www.tinkercad.com/circuits`
- **Wokwi** — Otro simulador de Arduino en el navegador, con muchos componentes. →
  `https://wokwi.com`

**Grupo 4 — Canales de YouTube** *(enlaces de búsqueda; el ejecutor arma la URL con `search_query`)*
- **Programar Fácil (Arduino en español)** — búsqueda: `programarfacil arduino`
- **Bitwise Ar (español)** — búsqueda: `bitwise ar arduino`
- **Paul McWhorter (inglés, curso paso a paso muy recomendado)** — búsqueda: `paul mcwhorter arduino tutorial`
- **DroneBot Workshop (inglés, proyectos y sensores)** — búsqueda: `dronebot workshop arduino`

**Grupo 5 — Datasheets y hojas de datos**
- **ATmega328P (el chip del UNO)** — Página oficial de Microchip con la hoja de datos. →
  `https://www.microchip.com/en-us/product/atmega328p`
- **Cómo buscar datasheets** — *(tarjeta explicativa, sin URL de descarga)* Para cualquier sensor,
  busca en Google **“<nombre del componente> datasheet pdf”** (por ejemplo, `HC-SR04 datasheet pdf`).
  La hoja de datos trae voltajes, pinout exacto y límites del componente.

**Grupo 6 — Libros recomendados** *(tarjetas sin enlace: título + autor + por qué)*
- **“Getting Started with Arduino”** — *Massimo Banzi* (cofundador de Arduino). El punto de partida
  oficial, corto y claro.
- **“Programming Arduino: Getting Started with Sketches”** — *Simon Monk*. Enfocado en aprender a
  programar la placa desde cero.
- **“Arduino. Curso práctico de formación”** — *Óscar Torrente Artero* (Marcombo). Un clásico
  completo en español.

> *Nota de diseño:* las tarjetas de YouTube usan el ícono de video y enlazan a la búsqueda; las de
> libros no llevan enlace (muestran “Libro” como etiqueta en vez de flecha). La tarjeta “Cómo buscar
> datasheets” es informativa, sin enlace saliente.

---

## 5. Checklist de aceptación
- [ ] Programación: 5 grupos, 17 conceptos, cada uno con código que compila y explicación exacta.
- [ ] Errores: recuadro de método + 7 acordeones (síntoma → causas → solución), operables por teclado.
- [ ] Buenas prácticas: 6 tarjetas; las de comparación muestran ❌ Antes / ✅ Después lado a lado
      (apiladas en móvil).
- [ ] Recursos: grupos con tarjetas-enlace; **todas las URLs son las de este documento** (ninguna
      inventada); YouTube y datasheets de sensores usan búsquedas; libros sin enlace.
- [ ] Enlaces salientes con `target="_blank" rel="noopener noreferrer"`.
- [ ] `codeBlock` reutilizado (copiar funciona); `observeReveals(mount)` llamado en cada sección.
- [ ] Responsive + dark mode + sin overflow horizontal + foco visible en acordeones y enlaces.
```
