/* ============================================================
   17 conceptos de programación, agrupados por tema.
   ============================================================ */

export const GRUPOS_PROGRAMACION = [
  {
    id: "variables",
    titulo: "Variables: guardar datos",
    intro:
      "Una <strong>variable</strong> es como una caja con etiqueta donde guardas un valor para usarlo después. Antes de usar una caja, dices de qué <strong>tipo</strong> es lo que va a guardar.",
    conceptos: [
      {
        nombre: "Variable",
        sintaxis: "=",
        quEs: "Una caja con nombre que guarda un valor y lo recuerda.",
        codigo: `int edad = 18;      // guardamos 18 en una caja llamada "edad"
edad = edad + 1;    // ahora la caja vale 19`,
        explicacion:
          "Creas la caja diciendo su tipo (int), su nombre (edad) y su valor inicial. Después puedes leerla o cambiarla cuando quieras.",
      },
      {
        nombre: "int",
        sintaxis: "int",
        quEs: "Guarda números enteros (sin decimales).",
        codigo: `int leds = 3;
int temperatura = -5;`,
        explicacion: "Es el tipo más usado. En el Arduino UNO un int va desde -32.768 hasta 32.767.",
      },
      {
        nombre: "float",
        sintaxis: "float",
        quEs: "Guarda números con decimales.",
        codigo: `float distancia = 12.5;
float promedio = 3.75;`,
        explicacion: "Se usa cuando necesitas precisión, como la distancia del sensor ultrasónico en cm.",
      },
      {
        nombre: "bool",
        sintaxis: "bool",
        quEs: "Guarda solo verdadero o falso (true / false).",
        codigo: `bool encendido = true;
bool puertaAbierta = false;`,
        explicacion: "Perfecta para recordar estados de sí/no: ¿está encendido? ¿se presionó el botón?",
      },
      {
        nombre: "String",
        sintaxis: "String",
        quEs: "Guarda texto (palabras, frases).",
        codigo: `String nombre = "Felipe";
String saludo = "Hola " + nombre;   // "Hola Felipe"`,
        explicacion: "El texto va entre comillas dobles. Puedes unir textos con +.",
      },
      {
        nombre: "const",
        sintaxis: "const",
        quEs: "Una variable que nunca cambia después de crearse.",
        codigo: `const int LED_PIN = 13;   // el pin del LED no cambiará jamás`,
        explicacion:
          "Útil para números fijos como pines. Si intentas cambiarla, el IDE te avisa con un error — eso te protege de equivocaciones.",
      },
      {
        nombre: "#define",
        sintaxis: "#define",
        quEs: "Le pone nombre a un valor fijo antes de compilar.",
        codigo: `#define LED_PIN 13   // el compilador reemplaza LED_PIN por 13`,
        explicacion:
          "Se parece a const. La diferencia: #define es un 'buscar y reemplazar' de texto que ocurre antes de compilar, y no lleva punto y coma. Hoy se prefiere const, pero verás #define en muchos ejemplos (como con el DHT11).",
      },
    ],
  },
  {
    id: "decisiones",
    titulo: "Decisiones: elegir qué hacer",
    intro: "Los programas se vuelven inteligentes cuando <strong>toman decisiones</strong> según lo que pasa.",
    conceptos: [
      {
        nombre: "if",
        sintaxis: "if",
        quEs: "Ejecuta un bloque solo si una condición es verdadera.",
        codigo: `if (temperatura > 30) {
  digitalWrite(ventilador, HIGH);
}`,
        explicacion:
          "Entre paréntesis va la condición. Si se cumple, corre lo que está entre las llaves; si no, lo salta.",
      },
      {
        nombre: "else",
        sintaxis: "else",
        quEs: "Lo que se hace si la condición NO se cumple.",
        codigo: `if (digitalRead(boton) == HIGH) {
  digitalWrite(led, HIGH);
} else {
  digitalWrite(led, LOW);
}`,
        explicacion: "if/else es un cruce de caminos: un lado si es verdadero, el otro si es falso.",
      },
      {
        nombre: "switch",
        sintaxis: "switch",
        quEs: "Elige entre muchas opciones para una misma variable.",
        codigo: `switch (modo) {
  case 1:
    digitalWrite(led, HIGH);
    break;
  case 2:
    tone(buzzer, 1000);
    break;
  default:
    // si no es ninguno de los anteriores
    break;
}`,
        explicacion:
          "Más limpio que muchos if seguidos cuando revisas los valores de una sola variable. El break evita que se 'cuele' al siguiente caso; default es el 'si ninguno'.",
      },
    ],
  },
  {
    id: "bucles",
    titulo: "Repetir: bucles",
    intro: "Cuando algo se repite, no lo escribes muchas veces: usas un <strong>bucle</strong>.",
    conceptos: [
      {
        nombre: "for",
        sintaxis: "for",
        quEs: "Repite un bloque un número conocido de veces.",
        codigo: `for (int i = 0; i < 5; i++) {
  digitalWrite(led, HIGH);
  delay(200);
  digitalWrite(led, LOW);
  delay(200);
}`,
        explicacion:
          "Tiene tres partes: empieza (i = 0), condición para seguir (i < 5) y qué hacer en cada vuelta (i++, sumar 1). Este ejemplo parpadea el LED 5 veces.",
      },
      {
        nombre: "while",
        sintaxis: "while",
        quEs: "Repite mientras una condición sea verdadera.",
        codigo: `while (digitalRead(boton) == LOW) {
  // no hace nada: espera a que presionen el botón
}`,
        explicacion:
          "Se usa cuando no sabes cuántas veces se repetirá, solo la condición para parar. Cuidado: si la condición nunca se vuelve falsa, el programa se queda 'atrapado'.",
      },
    ],
  },
  {
    id: "organizar",
    titulo: "Organizar: funciones y listas",
    intro: "Para que tu código no sea un desorden, lo agrupas en piezas con nombre.",
    conceptos: [
      {
        nombre: "Funciones",
        sintaxis: "void",
        quEs: "Un bloque de código con nombre que puedes reutilizar.",
        codigo: `void parpadear(int pin, int veces) {
  for (int i = 0; i < veces; i++) {
    digitalWrite(pin, HIGH);
    delay(200);
    digitalWrite(pin, LOW);
    delay(200);
  }
}

// Luego, en loop() la llamas así:
// parpadear(13, 3);`,
        explicacion:
          "Defines una vez cómo 'parpadear' y la usas cuantas veces quieras, cambiando el pin y las repeticiones. setup() y loop() también son funciones.",
      },
      {
        nombre: "Arrays",
        sintaxis: "[ ]",
        quEs: "Una lista de valores guardados en una sola variable.",
        codigo: `int pines[3] = {8, 9, 10};
digitalWrite(pines[0], HIGH);   // el primero (índice 0)
digitalWrite(pines[2], HIGH);   // el tercero (índice 2)`,
        explicacion:
          "En vez de tres variables, tienes una lista. Se cuenta desde 0: el primer elemento es pines[0]. Ideal junto a un for para recorrer todos.",
      },
    ],
  },
  {
    id: "comunicar-tiempo",
    titulo: "Comunicarse y medir el tiempo",
    intro: "Herramientas que usarás en casi todos tus programas.",
    conceptos: [
      {
        nombre: "Serial.print",
        sintaxis: "Serial",
        quEs: "Envía texto del Arduino al computador (Monitor Serie).",
        codigo: `void setup() {
  Serial.begin(9600);          // inicia la comunicación
}
void loop() {
  Serial.println("Hola!");     // escribe en el Monitor Serie
  delay(1000);
}`,
        explicacion:
          "Tu mejor amigo para depurar: te deja 'ver' qué está pensando el Arduino. Abre el Monitor Serie con la lupa (arriba a la derecha del IDE) a 9600 baudios. println agrega un salto de línea; print no.",
      },
      {
        nombre: "delay",
        sintaxis: "delay",
        quEs: "Pausa el programa una cantidad de milisegundos.",
        codigo: `delay(1000);   // espera 1 segundo (1000 ms)`,
        explicacion:
          "Simple pero bloquea todo: durante la pausa, el Arduino no puede hacer nada más (ni leer botones). Está bien para empezar; más adelante se reemplaza por millis().",
      },
      {
        nombre: "millis",
        sintaxis: "millis",
        quEs: "Dice cuántos milisegundos pasaron desde que se encendió.",
        codigo: `unsigned long anterior = 0;

void loop() {
  unsigned long ahora = millis();
  if (ahora - anterior >= 1000) {
    anterior = ahora;
    // pasó 1 segundo, SIN bloquear el resto del programa
  }
}`,
        explicacion:
          "Es como mirar un cronómetro en vez de quedarte esperando. Permite hacer varias cosas 'a la vez' (parpadear un LED y leer un botón al mismo tiempo). Lo profundizamos en Buenas prácticas.",
      },
    ],
  },
];
