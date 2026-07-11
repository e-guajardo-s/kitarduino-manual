/* ============================================================
   6 buenas prácticas — algunas con comparador Antes/Después.
   ============================================================ */

export const BUENAS_PRACTICAS = [
  {
    id: "organiza",
    titulo: "Organiza tu código",
    texto:
      "Mantén siempre el mismo orden: primero las <strong>constantes</strong> (pines, valores fijos), luego <code>setup()</code>, después <code>loop()</code>, y al final tus <strong>funciones auxiliares</strong>. Agrupa lo que está relacionado. Un código ordenado se lee como una receta, de arriba hacia abajo.",
    antes: null,
    despues: null,
  },
  {
    id: "comenta-por-que",
    titulo: "Comenta el 'por qué', no lo obvio",
    texto:
      "Un buen comentario explica <strong>por qué</strong> haces algo, no repite lo que el código ya dice. Demasiados comentarios obvios estorban tanto como ninguno.",
    antes: `i = i + 1;   // le suma 1 a i
delay(2000); // espera 2000`,
    despues: `i = i + 1;
delay(2000); // el DHT11 no se puede leer más seguido que cada 2 s`,
  },
  {
    id: "nombra-variables",
    titulo: "Nombra bien tus variables",
    texto:
      "Un nombre descriptivo vale más que mil comentarios. <code>pinLed</code> se entiende solo; <code>x</code> te obliga a adivinar. Sé consistente y usa el mismo idioma.",
    antes: `int x = 13;
int y = 220;
digitalWrite(x, HIGH);`,
    despues: `const int pinLed = 13;
const int resistencia = 220;
digitalWrite(pinLed, HIGH);`,
  },
  {
    id: "delay-problema",
    titulo: "Entiende por qué delay() es un problema",
    texto:
      "<code>delay()</code> <strong>congela</strong> todo el programa: durante la pausa, el Arduino no puede leer un botón, ni un sensor, ni nada. Para un solo LED da igual, pero apenas quieras hacer dos cosas 'a la vez', se vuelve un estorbo.",
    antes: `void loop() {
  digitalWrite(led, HIGH);
  delay(1000);   // aquí el botón NO se puede leer
  digitalWrite(led, LOW);
  delay(1000);   // ni aquí
}`,
    despues: null,
    notaDespues: "Ver la práctica siguiente: la solución es millis().",
  },
  {
    id: "usa-millis",
    titulo: "Usa millis() para hacer varias cosas a la vez",
    texto:
      "En lugar de esperar bloqueando, revisas el 'cronómetro' <code>millis()</code> y actúas cuando toca. Así el <code>loop()</code> sigue girando y puede atender otras tareas entre medio.",
    antes: `digitalWrite(led, HIGH);
delay(1000);
digitalWrite(led, LOW);
delay(1000);`,
    despues: `unsigned long anterior = 0;
bool encendido = false;

void loop() {
  if (millis() - anterior >= 1000) {
    anterior = millis();
    encendido = !encendido;             // invierte el estado
    digitalWrite(led, encendido);
  }
  // Aquí el programa SIGUE libre para leer botones, sensores, etc.
}`,
  },
  {
    id: "modulariza",
    titulo: "Divide en funciones (modulariza)",
    texto:
      "Si <code>loop()</code> se hace largo, pártelo en <strong>funciones con nombre claro</strong>. Cada función hace una cosa. Así <code>loop()</code> se lee como un resumen y encuentras los errores más rápido.",
    antes: `void loop() {
  int d = pulseIn(echoPin, HIGH) * 0.0343 / 2;
  if (d < 20) { tone(buzzer, 1000); }
  else { noTone(buzzer); }
  // ...20 líneas más mezcladas...
}`,
    despues: `void loop() {
  float distancia = medirDistancia();
  avisarSiCerca(distancia);
}

float medirDistancia() {
  return pulseIn(echoPin, HIGH) * 0.0343 / 2;
}

void avisarSiCerca(float d) {
  if (d < 20) tone(buzzer, 1000);
  else noTone(buzzer);
}`,
  },
];
