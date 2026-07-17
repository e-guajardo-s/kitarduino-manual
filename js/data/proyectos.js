/* ============================================================
   Proyectos para principiantes — 3 niveles, solo piezas del kit.
   ============================================================ */

export const PROYECTOS = [
  // ---------- Nivel 1 ----------
  {
    id: "blink",
    nivel: 1,
    nombre: "Blink",
    objetivo: "Encender y apagar un LED para dominar setup(), loop(), digitalWrite y delay.",
    materiales: ["Arduino UNO R3"],
    conexion: "Ninguna: usa el LED integrado del pin 13 (LED_BUILTIN).",
    codigo: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`,
    explicacion: [
      "pinMode(LED_BUILTIN, OUTPUT) prepara el pin 13 como salida.",
      "digitalWrite alterna el pin entre HIGH (encendido) y LOW (apagado).",
      "delay(1000) pausa un segundo entre cada cambio.",
    ],
    resultado: "El LED 'L' de la placa parpadea cada 1 segundo, sin parar.",
  },
  {
    id: "semaforo",
    nivel: 1,
    nombre: "Semáforo",
    objetivo: "Controlar tres LEDs en secuencia, como un semáforo real.",
    materiales: ["3 LEDs (rojo, amarillo, verde)", "3 resistencias 220Ω", "Protoboard", "Cables Dupont"],
    conexion:
      "Pin 8 → 220Ω → LED rojo; Pin 9 → 220Ω → LED amarillo; Pin 10 → 220Ω → LED verde; los tres cátodos (−) a GND.",
    codigo: `const int rojo = 8;
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
}`,
    explicacion: [
      "Cada LED tiene su propio pin: 8 (rojo), 9 (amarillo), 10 (verde).",
      "Encendemos uno, esperamos, lo apagamos y pasamos al siguiente.",
      "El ciclo verde → amarillo → rojo se repite para siempre en loop().",
    ],
    resultado: "Los tres LEDs se turnan como un semáforo real, en bucle continuo.",
  },
  {
    id: "boton-led",
    nivel: 1,
    nombre: "Botón + LED",
    objetivo: "Leer una entrada (sensor táctil) y reaccionar con una salida (LED). Introduce digitalRead.",
    materiales: ["Sensor táctil (Touch)", "1 LED", "1 resistencia 220Ω", "Protoboard", "Cables Dupont"],
    conexion: "Touch: SIG → pin 2 (VCC → 5V, GND → GND); Pin 8 → 220Ω → LED → GND.",
    codigo: `const int boton = 2;
const int led = 8;

void setup() {
  pinMode(boton, INPUT);   // El touch entrega HIGH al tocarlo.
  pinMode(led, OUTPUT);
}

void loop() {
  if (digitalRead(boton) == HIGH) {
    digitalWrite(led, HIGH);   // Tocado -> LED encendido.
  } else {
    digitalWrite(led, LOW);    // Sin tocar -> LED apagado.
  }
}`,
    explicacion: [
      "digitalRead(boton) mira el estado del sensor táctil.",
      "El if/else decide encender o apagar el LED según ese estado.",
      "Con un pulsador mecánico en vez del touch, se usaría INPUT_PULLUP comparando con LOW.",
    ],
    resultado: "El LED se enciende mientras tocas el sensor, y se apaga al soltarlo.",
  },

  // ---------- Nivel 2 ----------
  {
    id: "sensor-distancia",
    nivel: 2,
    nombre: "Sensor de distancia",
    objetivo: "Medir distancia con el HC-SR04 y mostrarla en el Monitor Serie.",
    materiales: ["Sensor ultrasónico HC-SR04", "Protoboard", "Cables Dupont"],
    conexion: "VCC → 5V; GND → GND; TRIG → pin 9; ECHO → pin 10.",
    codigo: `const int trigPin = 9;
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
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duracion = pulseIn(echoPin, HIGH);
  float distancia = duracion * 0.0343 / 2;

  Serial.print("Distancia: ");
  Serial.print(distancia);
  Serial.println(" cm");
  delay(500);
}`,
    explicacion: [
      "Se envía un pulso de 10 microsegundos por TRIG para disparar la medición.",
      "pulseIn mide cuánto tarda el eco en volver por ECHO.",
      "Con la velocidad del sonido se convierte ese tiempo en centímetros.",
    ],
    resultado: "La distancia en centímetros aparece en el Monitor Serie, actualizándose cada medio segundo.",
  },
  {
    id: "controla-servo",
    nivel: 2,
    nombre: "Controla un Servo",
    objetivo: "Mover el servo con el joystick, usando map() para convertir un rango en otro.",
    materiales: ["Servo SG90", "Joystick", "Cables Dupont"],
    conexion: "Servo: rojo → 5V, café → GND, naranjo → pin 9. Joystick: VRx → A0 (VCC → 5V, GND → GND).",
    codigo: `#include <Servo.h>

Servo miServo;

void setup() {
  miServo.attach(9);
}

void loop() {
  int x = analogRead(A0);               // 0..1023
  int angulo = map(x, 0, 1023, 0, 180);  // a grados
  miServo.write(angulo);
  delay(15);
}`,
    explicacion: [
      "analogRead(A0) lee la posición del eje X del joystick (0 a 1023).",
      "map() convierte ese rango al rango de ángulos del servo (0 a 180°).",
      "miServo.write(angulo) mueve el servo a esa posición.",
    ],
    resultado: "El servo sigue el movimiento del joystick en tiempo real.",
  },
  {
    id: "mensaje-lcd",
    nivel: 2,
    nombre: "Mensaje en la LCD",
    objetivo: "Escribir texto en la pantalla LCD 1602 I2C y mostrar un contador con millis().",
    materiales: ["Pantalla LCD 1602 I2C", "Cables Dupont"],
    conexion: "VCC → 5V; GND → GND; SDA → A4; SCL → A5.",
    codigo: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);
unsigned long ultimoSegundo = 0;
int contador = 0;

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Hola Felipe!");
}

void loop() {
  if (millis() - ultimoSegundo >= 1000) {
    ultimoSegundo = millis();
    contador++;
    lcd.setCursor(0, 1);
    lcd.print("Segundos: ");
    lcd.print(contador);
  }
}`,
    explicacion: [
      "millis() devuelve los milisegundos desde que la placa se encendió, sin bloquear el programa (a diferencia de delay).",
      "Cada vez que pasa 1 segundo real, se actualiza el contador en la segunda línea de la LCD.",
      "lcd.setCursor(0, 1) posiciona el cursor en la segunda fila antes de escribir.",
    ],
    resultado: "La pantalla muestra un saludo fijo arriba y un contador de segundos que sube abajo.",
  },

  // ---------- Nivel 3 ----------
  {
    id: "estacion-meteorologica",
    nivel: 3,
    nombre: "Estación meteorológica",
    objetivo: "Leer temperatura y humedad con el DHT11 y mostrarlas en la LCD.",
    materiales: ["Sensor DHT11", "Pantalla LCD 1602 I2C", "Cables Dupont"],
    conexion: "DHT11: DATA → pin 2 (VCC → 5V, GND → GND). LCD: SDA → A4, SCL → A5.",
    codigo: `#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  dht.begin();
  lcd.init();
  lcd.backlight();
}

void loop() {
  float humedad = dht.readHumidity();
  float temp = dht.readTemperature();

  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temp);
  lcd.print("C");

  lcd.setCursor(0, 1);
  lcd.print("Humedad: ");
  lcd.print(humedad);
  lcd.print("%");

  delay(2000);   // El DHT11 se lee cada 2 segundos.
}`,
    explicacion: [
      "El loop lee el sensor DHT11 y actualiza la pantalla en cada vuelta.",
      "delay(2000) respeta el ritmo de lectura recomendado para el DHT11.",
      "Cada línea de la LCD muestra un dato distinto: temperatura arriba, humedad abajo.",
    ],
    resultado: "Una mini estación meteorológica que muestra el clima del cuarto sin necesitar el computador.",
  },
  {
    id: "detector-movimiento",
    nivel: 3,
    nombre: "Detector de movimiento (alarma)",
    objetivo: "Hacer parpadear un LED rojo de alarma cuando el PIR detecta movimiento.",
    materiales: ["Sensor PIR", "LED rojo", "Resistencia 220Ω", "Protoboard", "Cables Dupont"],
    conexion: "PIR: OUT → pin 2 (VCC → 5V, GND → GND). LED: pin 8 → resistencia 220Ω → ánodo; cátodo → GND.",
    codigo: `const int pir = 2;
const int ledAlarma = 8;

void setup() {
  pinMode(pir, INPUT);
  pinMode(ledAlarma, OUTPUT);
}

void loop() {
  if (digitalRead(pir) == HIGH) {
    // Parpadeo rápido: modo alarma.
    digitalWrite(ledAlarma, HIGH);
    delay(100);
    digitalWrite(ledAlarma, LOW);
    delay(100);
  } else {
    digitalWrite(ledAlarma, LOW);
  }
}`,
    explicacion: [
      "El PIR necesita entre 30 y 60 segundos de calentamiento al encenderse; no confíes en la primera lectura.",
      "Al detectar movimiento (HIGH), el LED parpadea rápido en 'modo alarma'.",
      "Sin movimiento, el LED queda apagado.",
    ],
    resultado: "Alarma visual que parpadea apenas detecta movimiento cerca del sensor.",
  },
  {
    id: "sistema-riego",
    nivel: 3,
    nombre: "Sistema de riego automático",
    objetivo: "Activar un relé (que simula una bomba de riego) cuando la tierra está seca.",
    materiales: ["Sensor de humedad de suelo", "Módulo Relé", "Cables Dupont"],
    conexion: "Sensor: AO → A0 (VCC → 5V, GND → GND). Relé: IN → pin 7.",
    codigo: `const int sensorSuelo = A0;
const int rele = 7;
const int umbralSeco = 600; // Ajusta este valor según tu propia calibración.

void setup() {
  pinMode(rele, OUTPUT);
  digitalWrite(rele, HIGH); // HIGH = apagado en la mayoría de los módulos.
  Serial.begin(9600);
}

void loop() {
  int humedad = analogRead(sensorSuelo);
  Serial.println(humedad);

  if (humedad > umbralSeco) {
    digitalWrite(rele, LOW);   // Tierra seca: activa el riego.
  } else {
    digitalWrite(rele, HIGH);  // Tierra húmeda: apaga el riego.
  }

  delay(1000);
}`,
    explicacion: [
      "analogRead(A0) entrega un valor más alto cuanto más seca está la tierra.",
      "Si supera el umbral definido, se activa el relé (revisa si tu módulo es activo en LOW o HIGH).",
      "⚠️ No mezcles agua con 220V. Para practicar, usa el relé con una carga de bajo voltaje o reemplázala por un LED.",
    ],
    resultado: "El riego (o el LED que lo simula) se activa solo cuando la tierra realmente lo necesita.",
    advertenciaSeguridad: true,
  },
  {
    id: "radar-arduino",
    nivel: 3,
    nombre: "Radar Arduino",
    objetivo: "Montar el HC-SR04 sobre el servo para barrer 0–180° y medir distancia en cada ángulo.",
    materiales: ["Servo SG90", "Sensor ultrasónico HC-SR04", "Cables Dupont"],
    conexion: "Servo: señal → pin 9. HC-SR04: TRIG → pin 10, ECHO → pin 11 (VCC → 5V, GND → GND ambos).",
    codigo: `#include <Servo.h>

Servo radar;
const int trigPin = 10, echoPin = 11;

float medir() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long d = pulseIn(echoPin, HIGH);
  return d * 0.0343 / 2;
}

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  radar.attach(9);
}

void loop() {
  for (int a = 0; a <= 180; a++) {
    radar.write(a);
    delay(30);
    Serial.print(a);
    Serial.print(",");
    Serial.println(medir());
  }
  for (int a = 180; a >= 0; a--) {
    radar.write(a);
    delay(30);
    Serial.print(a);
    Serial.print(",");
    Serial.println(medir());
  }
}`,
    explicacion: [
      "La función medir() encapsula la lectura del HC-SR04 para no repetir el código.",
      "El primer for barre el servo de 0° a 180°, midiendo la distancia en cada grado.",
      "El segundo for hace el barrido de vuelta, de 180° a 0°, para un movimiento continuo tipo radar.",
      "Cada par 'ángulo,distancia' se imprime por Serial (la clásica pantalla verde de radar se arma en el computador con Processing; es un extra opcional, no obligatorio).",
    ],
    resultado: "Un radar que barre de lado a lado y reporta la distancia a cualquier obstáculo en cada ángulo.",
  },
];

export const NIVELES = [
  { id: 1, nombre: "Nivel 1", badge: "easy", descripcion: "Tus primeros pasos: LEDs y una entrada simple." },
  { id: 2, nombre: "Nivel 2", badge: "medium", descripcion: "Sensores y salidas más interesantes." },
  { id: 3, nombre: "Nivel 3", badge: "hard", descripcion: "Combina varios componentes en un proyecto real." },
];
