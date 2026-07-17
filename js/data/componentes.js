/* ============================================================
   Los 19 componentes del kit — datos técnicos verificados.
   categoria: "basico" | "sensor" | "actuador" | "pantalla"
   dificultad: "facil" | "medio" | "dificil"
   ============================================================ */

function yt(titulo, query) {
  return {
    titulo,
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
  };
}

export const COMPONENTES = [
  {
    id: "arduino-uno",
    nombre: "Arduino UNO R3",
    categoria: "basico",
    imagen: "assets/images/arduino_uno_r3.jpg",
    descripcionCorta: "El cerebro de todo tu kit.",
    paraQueSirve: "Ejecuta tu código y coordina sensores y actuadores.",
    comoFunciona: "Un microcontrolador ATmega328P lee entradas, decide según tu programa y controla salidas.",
    voltaje: "5V",
    pines: "14 digitales (6 PWM), 6 analógicos, 5V/3V3/GND",
    dificultad: "facil",
    usosReales: ["Es la base de todos los proyectos del kit", "Se programa desde el Arduino IDE por USB"],
    detalle:
      "El Arduino UNO R3 es una placa de desarrollo basada en el microcontrolador ATmega328P. Tiene 32 KB de memoria de programa, corre a 16 MHz y se programa por USB con el Arduino IDE. Es la placa más usada del mundo para aprender electrónica y programación porque es robusta, barata y tiene muchísima documentación.",
    pinout: [
      { pin: "0–13", descripcion: "Pines digitales (0=RX, 1=TX reservados para USB; 3,5,6,9,10,11 tienen PWM ~)" },
      { pin: "A0–A5", descripcion: "Pines analógicos (lectura 0–1023)" },
      { pin: "5V", descripcion: "Salida de 5 voltios regulados" },
      { pin: "3V3", descripcion: "Salida de 3.3 voltios regulados" },
      { pin: "GND", descripcion: "Tierra (0V), hay varios pines GND" },
      { pin: "VIN", descripcion: "Entrada de voltaje externo (7–12V)" },
    ],
    conexion: "No requiere conexión: es la placa central a la que conectas todo lo demás.",
    codigo: null,
    codigoExplicacion: [],
    erroresComunes: [
      "Alimentar por el pin 5V y por USB al mismo tiempo con fuentes distintas (puede dañar la placa).",
      "Cortocircuitar 5V con GND directamente.",
      "Olvidar seleccionar 'Arduino Uno' y el puerto correcto en el IDE.",
    ],
    consejos: [
      "El LED 'L' (pin 13) sirve para probar que la placa funciona sin nada conectado.",
      "Usa siempre el mismo GND entre el Arduino y cualquier componente externo.",
    ],
    proyectos: ["Todos los proyectos del kit"],
    variaciones: "Arduino Nano (más pequeño), Arduino Mega (más pines), Arduino Leonardo.",
    youtube: [yt("Arduino UNO: partes y pines explicados", "arduino uno partes y pines explicado español")],
  },
  {
    id: "cable-usb",
    nombre: "Cable USB",
    categoria: "basico",
    imagen: "assets/images/usb_cable_type_a_to_b.jpg",
    descripcionCorta: "Alimenta y programa la placa.",
    paraQueSirve: "Conecta el Arduino al computador para subir sketches y darle energía.",
    comoFunciona: "Lleva datos y 5V por el mismo cable (tipo A a tipo B).",
    voltaje: "5V",
    pines: "—",
    dificultad: "facil",
    usosReales: ["Subir programas al Arduino", "Alimentar la placa desde el PC o un cargador"],
    detalle:
      "El cable USB tipo A–B conecta el Arduino UNO al computador. Cumple dos funciones: transferir el programa compilado (datos) y alimentar la placa con 5V mientras está conectado.",
    pinout: [
      { pin: "Tipo B", descripcion: "Extremo cuadrado que va al Arduino" },
      { pin: "Tipo A", descripcion: "Extremo plano que va al computador" },
    ],
    conexion: "Un extremo al puerto USB del Arduino, el otro al computador.",
    codigo: null,
    codigoExplicacion: [],
    erroresComunes: [
      "Usar un cable 'solo carga' que no transmite datos (el IDE no detecta el puerto).",
      "Puerto USB del PC dañado o con poca energía.",
    ],
    consejos: ["Si el IDE no ve tu placa, prueba con otro cable USB antes de sospechar de la placa."],
    proyectos: ["Necesario para programar cualquier proyecto"],
    variaciones: "Algunos Arduino más nuevos usan USB-C o micro-USB.",
    youtube: [yt("Arduino no reconoce el puerto COM: solución", "arduino no reconoce puerto com solucion español")],
  },
  {
    id: "protoboard",
    nombre: "Protoboard (breadboard)",
    categoria: "basico",
    imagen: "assets/images/protoboard_170_points.jpg",
    descripcionCorta: "Arma circuitos sin soldar.",
    paraQueSirve: "Base de prototipado donde insertas componentes y cables a presión.",
    comoFunciona: "Filas de contactos metálicos conectan los agujeros por grupos.",
    voltaje: "—",
    pines: "Rieles + / −, columnas de 5",
    dificultad: "facil",
    usosReales: ["Todos los proyectos con componentes externos"],
    detalle:
      "Ya la explicamos en detalle en la sección 'Cómo usar un protoboard' más arriba: los rieles corren horizontalmente y las columnas centrales conectan grupos verticales de 5 agujeros, separados por el canal central.",
    pinout: [],
    conexion: "Ver la sección de protoboard más arriba para el detalle completo.",
    codigo: null,
    codigoExplicacion: [],
    erroresComunes: ["Ver la sección de protoboard para los errores clásicos."],
    consejos: ["Revisa la sección dedicada a la protoboard antes de armar tu primer circuito."],
    proyectos: ["Todos los proyectos con componentes externos"],
    variaciones: "Protoboards mini, de tamaño completo, o de doble canal.",
    youtube: [],
    enlaceSeccion: "#protoboard",
  },
  {
    id: "led",
    nombre: "LEDs",
    categoria: "basico",
    imagen: "assets/images/arduino_leds_set.jpg",
    descripcionCorta: "Luz que enciendes con código.",
    paraQueSirve: "Indicadores luminosos de colores.",
    comoFunciona: "Un diodo que emite luz cuando la corriente pasa en el sentido correcto; siempre con resistencia.",
    voltaje: "~2V (usar con 5V + resistencia)",
    pines: "Ánodo (+, pata larga), Cátodo (−, pata corta)",
    dificultad: "facil",
    usosReales: ["Blink", "Semáforo", "Indicadores de estado"],
    detalle:
      "Un LED (diodo emisor de luz) convierte electricidad en luz. Es polarizado: solo funciona en un sentido. La pata larga es el ánodo (+) y va hacia el pin del Arduino (a través de una resistencia); la pata corta es el cátodo (−) y va a GND. Sin resistencia, el LED recibe demasiada corriente y se quema en segundos.",
    pinout: [
      { pin: "Ánodo (+)", descripcion: "Pata larga; se conecta al pin (vía resistencia)" },
      { pin: "Cátodo (−)", descripcion: "Pata corta; se conecta a GND" },
    ],
    conexion: "Pin 8 → resistencia 220Ω → ánodo del LED; cátodo del LED → GND.",
    codigo: `const int led = 8;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);
  delay(500);
}`,
    codigoExplicacion: [
      "const int led = 8; → Guardamos el número de pin en un nombre para no repetir '8' por todos lados.",
      "pinMode(led, OUTPUT); → El pin 8 será una salida (va a entregar corriente).",
      "digitalWrite(led, HIGH); → 5V en el pin: el LED enciende.",
      "delay(500); → Espera medio segundo.",
      "digitalWrite(led, LOW); → 0V: el LED apaga.",
    ],
    erroresComunes: [
      "LED al revés (no enciende → dar vuelta las patas).",
      "Olvidar la resistencia (se quema).",
      "Pin equivocado en el código.",
    ],
    consejos: [
      "La resistencia puede ir de cualquier lado del LED, da igual el orden.",
      "Usa 220–330Ω para 5V.",
      "Si dudas de la polaridad, el lado plano del borde del LED es el cátodo (−).",
    ],
    proyectos: ["Blink", "Semáforo", "Botón + LED"],
    variaciones: "LEDs RGB (tres colores en uno), tiras LED, LEDs de alto brillo.",
    youtube: [yt("Cómo conectar un LED con Arduino", "arduino led resistencia tutorial español")],
  },
  {
    id: "resistencias",
    nombre: "Resistencias",
    categoria: "basico",
    imagen: "assets/images/resistors_set.jpg",
    descripcionCorta: "Protegen limitando la corriente.",
    paraQueSirve: "Reducen la corriente para no quemar componentes.",
    comoFunciona: "Oponen resistencia (Ω) al paso de electrones (ver Ley de Ohm).",
    voltaje: "—",
    pines: "2 patas, sin polaridad",
    dificultad: "facil",
    usosReales: ["Con cada LED", "Divisores de voltaje", "Pull-up / pull-down"],
    detalle:
      "Las resistencias no tienen polaridad: se pueden conectar en cualquier sentido. Su valor en ohmios (Ω) se lee por el código de colores de sus bandas. El kit trae principalmente resistencias de 220Ω (para LEDs) y 10kΩ (para pull-ups).",
    pinout: [],
    conexion: "En serie con el componente que quieras proteger (por ejemplo, entre el pin y el LED).",
    codigo: null,
    codigoExplicacion: [],
    erroresComunes: ["Confundir el valor por leer mal las bandas de color.", "Olvidar que los LEDs siempre la necesitan."],
    consejos: ["Usa una calculadora de código de colores si tienes dudas.", "220Ω es un buen valor por defecto para LEDs con 5V."],
    proyectos: ["Con cada LED", "Circuitos pull-up/pull-down"],
    variaciones: "Resistencias variables (potenciómetros), resistencias SMD.",
    youtube: [yt("Código de colores de resistencias explicado", "codigo de colores resistencias explicado español")],
  },
  {
    id: "servo-sg90",
    nombre: "Servo SG90",
    categoria: "actuador",
    imagen: "assets/images/servo_motor_sg90.jpg",
    descripcionCorta: "Motor que gira a un ángulo exacto.",
    paraQueSirve: "Mueve brazos, compuertas o el 'cuello' de un radar.",
    comoFunciona: "Recibe una señal PWM y posiciona su eje entre 0° y 180°.",
    voltaje: "4.8–6V",
    pines: "Café=GND, Rojo=5V, Naranjo=señal (PWM)",
    dificultad: "medio",
    usosReales: ["Radar Arduino", "Barrera automática", "Brazo robótico"],
    detalle:
      "El SG90 es un micro servomotor que gira su eje a un ángulo específico entre 0° y 180°. Por dentro tiene un motor DC, engranajes reductores y un circuito de control que mantiene la posición. Se controla con la librería Servo, no con analogWrite.",
    pinout: [
      { pin: "Café / Marrón", descripcion: "GND" },
      { pin: "Rojo", descripcion: "5V (alimentación)" },
      { pin: "Naranjo / Amarillo", descripcion: "Señal PWM (a un pin digital)" },
    ],
    conexion:
      "Rojo → 5V; Café → GND; Naranjo → pin 9. El SG90 puede alimentarse del 5V del Arduino para movimientos suaves; si tiembla o reinicia la placa, usar alimentación externa de 5V con GND común.",
    codigo: `#include <Servo.h>

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
}`,
    codigoExplicacion: [
      "#include <Servo.h> → Carga la librería que sabe controlar servos.",
      "Servo miServo; → Creamos un 'objeto' servo con el que daremos órdenes.",
      "miServo.attach(9); → Le decimos en qué pin está conectada la señal.",
      "miServo.write(angulo); → Ordena al servo ir a ese ángulo (0–180).",
    ],
    erroresComunes: [
      "Alimentar un servo grande desde el Arduino (baja el voltaje y reinicia la placa).",
      "No compartir GND entre servo y Arduino.",
      "Usar analogWrite en vez de la librería Servo.",
    ],
    consejos: [
      "La librería Servo viene incluida con el IDE (no hay que instalar nada).",
      "No fuerces el eje con la mano.",
      "Para varios servos, usa fuente externa.",
    ],
    proyectos: ["Radar Arduino (servo + HC-SR04)", "Barrera de estacionamiento", "Brazo robótico"],
    variaciones: "Servos de rotación continua, servos grandes (MG996R), motores paso a paso.",
    youtube: [yt("Controlar un servo SG90 con Arduino", "arduino servo sg90 tutorial español")],
  },
  {
    id: "dht11",
    nombre: "Sensor DHT11",
    categoria: "sensor",
    imagen: "assets/images/dht11_temp_humidity_sensor.jpg",
    descripcionCorta: "Mide temperatura y humedad.",
    paraQueSirve: "Informa el clima del ambiente.",
    comoFunciona: "Un termistor y un sensor de humedad envían los datos en digital por un pin.",
    voltaje: "3.3–5V",
    pines: "VCC, DATA, GND",
    dificultad: "medio",
    usosReales: ["Estación meteorológica", "Control de invernadero"],
    detalle:
      "El DHT11 mide temperatura (0–50°C, ±2°C) y humedad relativa (20–90%, ±5%). Envía los datos ya digitalizados por un solo pin. Necesita la librería 'DHT sensor library' (de Adafruit), que se instala desde el Gestor de Librerías del IDE.",
    pinout: [
      { pin: "VCC", descripcion: "Alimentación 3.3–5V" },
      { pin: "DATA", descripcion: "Pin de datos (a un pin digital)" },
      { pin: "GND", descripcion: "Tierra" },
    ],
    conexion: "VCC → 5V; GND → GND; DATA → pin 2. El módulo del kit suele traer la resistencia pull-up incorporada.",
    codigo: `#include <DHT.h>

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
}`,
    codigoExplicacion: [
      "#define DHTTYPE DHT11 → Le decimos a la librería qué modelo es.",
      "dht.begin(); → Inicia el sensor.",
      "readHumidity() / readTemperature() → Devuelven los valores medidos.",
      "delay(2000) → El DHT11 es lento: no conviene leerlo más seguido que cada ~2 s.",
    ],
    erroresComunes: [
      "No instalar la librería.",
      "Leerlo muy rápido (da 'nan').",
      "Confundir el pin DATA.",
      "Esperar decimales precisos (el DHT11 es de baja resolución).",
    ],
    consejos: [
      "Para mejor precisión existe el DHT22 (compatible con el mismo código cambiando el tipo).",
      "Muestra los datos en la LCD o la OLED para una estación sin PC.",
    ],
    proyectos: ["Estación meteorológica", "Control de invernadero", "Termómetro de cuarto"],
    variaciones: "DHT22 (más preciso), BME280 (añade presión).",
    youtube: [yt("DHT11: temperatura y humedad con Arduino", "arduino dht11 temperatura humedad tutorial español")],
  },
  {
    id: "lcd-1602",
    nombre: "Pantalla LCD 1602 I2C",
    categoria: "pantalla",
    imagen: "assets/images/lcd_1602_i2c_display.jpg",
    descripcionCorta: "Muestra 2 líneas de 16 caracteres.",
    paraQueSirve: "Despliega texto y datos sin necesitar el computador.",
    comoFunciona: "Un chip I2C (dirección 0x27/0x3F) controla la pantalla con solo 2 cables de datos.",
    voltaje: "5V",
    pines: "VCC, GND, SDA→A4, SCL→A5",
    dificultad: "medio",
    usosReales: ["Mostrar temperatura", "Mensajes", "Menús"],
    detalle:
      "La LCD 1602 muestra 2 líneas de 16 caracteres cada una. La versión I2C incluye un pequeño módulo adaptador que reduce la conexión a solo 4 cables (VCC, GND, SDA, SCL) en vez de los ~12 pines de una LCD normal.",
    pinout: [
      { pin: "VCC", descripcion: "Alimentación 5V" },
      { pin: "GND", descripcion: "Tierra" },
      { pin: "SDA", descripcion: "Datos I2C → A4" },
      { pin: "SCL", descripcion: "Reloj I2C → A5" },
    ],
    conexion: "VCC → 5V; GND → GND; SDA → A4; SCL → A5.",
    codigo: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Hola Felipe!");
}

void loop() {
}`,
    codigoExplicacion: [
      "LiquidCrystal_I2C lcd(0x27, 16, 2); → Dirección I2C 0x27, 16 columnas, 2 filas.",
      "lcd.init(); lcd.backlight(); → Inicia la pantalla y enciende la luz de fondo.",
      "lcd.setCursor(0, 0); → Posiciona el cursor en la primera columna, primera fila.",
      "lcd.print(\"...\"); → Escribe el texto en la pantalla.",
    ],
    erroresComunes: [
      "Dirección I2C equivocada (pantalla en blanco → probar 0x3F).",
      "Contraste mal ajustado (potenciómetro azul en la parte de atrás).",
      "No instalar la librería LiquidCrystal_I2C.",
    ],
    consejos: ["Si no ves nada, gira el potenciómetro de contraste antes de sospechar del código."],
    proyectos: ["Estación meteorológica", "Mostrar mensajes y menús"],
    variaciones: "LCD 2004 (4 líneas de 20 caracteres), LCD sin módulo I2C (más cables).",
    youtube: [yt("LCD 1602 I2C con Arduino", "arduino lcd 1602 i2c tutorial español")],
  },
  {
    id: "rele",
    nombre: "Módulo Relé (Relay)",
    categoria: "actuador",
    imagen: "assets/images/relay.png",
    descripcionCorta: "Un interruptor que controla el código.",
    paraQueSirve: "Enciende cargas de mayor voltaje (ampolletas, ventiladores).",
    comoFunciona: "Una bobina mueve un contacto mecánico; aísla el Arduino de la carga.",
    voltaje: "5V (lógica)",
    pines: "VCC, GND, IN (digital)",
    dificultad: "medio",
    usosReales: ["Encender luces domésticas", "Riego automático"],
    detalle:
      "El módulo relé permite que el Arduino (que trabaja a 5V) controle cargas de mucho más voltaje, como una ampolleta de 220V, sin tocarlas directamente. Por dentro, una bobina electromagnética mueve un contacto metálico que cierra o abre el circuito de alta potencia.",
    pinout: [
      { pin: "VCC", descripcion: "Alimentación lógica 5V" },
      { pin: "GND", descripcion: "Tierra" },
      { pin: "IN", descripcion: "Señal de control (pin digital)" },
      { pin: "COM / NO / NC", descripcion: "Terminales de potencia (a la carga)" },
    ],
    conexion: "VCC → 5V; GND → GND; IN → pin 7. Muchos módulos son activos en LOW (LOW enciende).",
    codigo: `const int rele = 7;

void setup() {
  pinMode(rele, OUTPUT);
}

void loop() {
  digitalWrite(rele, LOW);   // Muchos módulos: LOW = activado.
  delay(2000);
  digitalWrite(rele, HIGH);  // HIGH = desactivado.
  delay(2000);
}`,
    codigoExplicacion: [
      "pinMode(rele, OUTPUT); → El pin de control es una salida.",
      "digitalWrite(rele, LOW); → En muchos módulos, LOW activa el relé (revisa el tuyo).",
      "digitalWrite(rele, HIGH); → Desactiva el relé.",
    ],
    erroresComunes: [
      "Suponer que HIGH siempre activa (muchos módulos son al revés).",
      "Manipular 220V sin la protección y el conocimiento adecuados.",
    ],
    consejos: [
      "⚠️ No manipules 220V sin la supervisión de un adulto con experiencia. Para aprender, usa cargas de bajo voltaje (una ampolleta LED a pilas).",
    ],
    proyectos: ["Sistema de riego", "Encender luces"],
    variaciones: "Módulos de relé doble o de 4/8 canales, relés de estado sólido (SSR).",
    youtube: [yt("Módulo relé con Arduino", "arduino modulo rele relay tutorial español")],
    advertenciaSeguridad: true,
  },
  {
    id: "humedad-suelo",
    nombre: "Sensor de humedad de suelo",
    categoria: "sensor",
    imagen: "assets/images/soil_moisture_sensor.jpg",
    descripcionCorta: "Sabe si la tierra está seca.",
    paraQueSirve: "Mide cuánta agua tiene la tierra.",
    comoFunciona: "Dos electrodos miden la conductividad del suelo; más agua = más conductividad.",
    voltaje: "3.3–5V",
    pines: "VCC, GND, AO (analógico), DO (digital)",
    dificultad: "facil",
    usosReales: ["Sistema de riego automático"],
    detalle:
      "Este sensor tiene dos electrodos metálicos que se entierran en la tierra. Mide qué tan bien conduce la electricidad entre ellos: tierra húmeda conduce mejor (valor analógico más bajo), tierra seca conduce peor (valor más alto). También entrega una salida digital simple según un umbral ajustable.",
    pinout: [
      { pin: "VCC", descripcion: "Alimentación 3.3–5V" },
      { pin: "GND", descripcion: "Tierra" },
      { pin: "AO", descripcion: "Salida analógica (lectura continua)" },
      { pin: "DO", descripcion: "Salida digital (umbral ajustable con potenciómetro)" },
    ],
    conexion: "VCC → 5V; GND → GND; AO → A0.",
    codigo: `const int sensor = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int valor = analogRead(sensor);
  Serial.println(valor);      // 0 (mojado) ... 1023 (seco), aprox.
  delay(1000);
}`,
    codigoExplicacion: [
      "analogRead(sensor); → Lee el voltaje del sensor como un número entre 0 y 1023.",
      "Un valor alto indica tierra seca; un valor bajo, tierra húmeda (puede variar según el módulo).",
    ],
    erroresComunes: [
      "Dejar la sonda siempre energizada (la corroe con el tiempo: alimentarla solo al medir).",
      "Confundir AO (analógico) con DO (digital).",
    ],
    consejos: ["Calibra tu propio umbral: mide con la tierra seca y con la tierra recién regada para comparar."],
    proyectos: ["Sistema de riego automático"],
    variaciones: "Sensores capacitivos (no se corroen, más durables).",
    youtube: [yt("Sensor de humedad de suelo con Arduino", "arduino sensor humedad suelo riego tutorial español")],
  },
  {
    id: "pir",
    nombre: "Sensor de movimiento PIR",
    categoria: "sensor",
    imagen: "assets/images/pir_motion_sensor.jpg",
    descripcionCorta: "Detecta que alguien se mueve.",
    paraQueSirve: "Dispara una acción ante movimiento.",
    comoFunciona: "Capta los cambios de calor (infrarrojo) de un cuerpo que se mueve.",
    voltaje: "5V",
    pines: "VCC, OUT (digital), GND",
    dificultad: "facil",
    usosReales: ["Alarma", "Luz que se enciende sola"],
    detalle:
      "El sensor PIR (Infrarrojo Pasivo) detecta el calor que emiten los cuerpos. Cuando algo se mueve dentro de su rango, el patrón de calor cambia y el sensor lo detecta, entregando HIGH en su pin de salida. Necesita unos 30–60 segundos de calentamiento al encenderse.",
    pinout: [
      { pin: "VCC", descripcion: "Alimentación 5V" },
      { pin: "OUT", descripcion: "Salida digital (HIGH = movimiento detectado)" },
      { pin: "GND", descripcion: "Tierra" },
    ],
    conexion: "VCC → 5V; GND → GND; OUT → pin 2.",
    codigo: `const int pir = 2;
const int led = 13;

void setup() {
  pinMode(pir, INPUT);
  pinMode(led, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(pir) == HIGH) {
    digitalWrite(led, HIGH);
    Serial.println("Movimiento!");
  } else {
    digitalWrite(led, LOW);
  }
  delay(200);
}`,
    codigoExplicacion: [
      "digitalRead(pir) == HIGH → Comprueba si el sensor detectó movimiento.",
      "Si es así, enciende el LED y avisa por el Monitor Serie.",
    ],
    erroresComunes: [
      "No esperar el calentamiento inicial (~30–60 s) antes de confiar en las lecturas.",
      "Sensibilidad y tiempo mal ajustados (tiene 2 potenciómetros).",
    ],
    consejos: ["Ajusta los dos potenciómetros del sensor para calibrar sensibilidad y tiempo de reactivación."],
    proyectos: ["Detector de movimiento", "Alarma"],
    variaciones: "Sensores de microondas (detectan a través de paredes finas).",
    youtube: [yt("Sensor PIR con Arduino", "arduino pir sensor movimiento tutorial español")],
  },
  {
    id: "touch",
    nombre: "Sensor táctil (Touch)",
    categoria: "sensor",
    imagen: "assets/images/capacitive_touch_sensor.jpg",
    descripcionCorta: "Un botón sin partes móviles.",
    paraQueSirve: "Reemplaza un pulsador con un toque.",
    comoFunciona: "Detecta el cambio de capacitancia de tu dedo (tecnología capacitiva).",
    voltaje: "2–5.5V",
    pines: "VCC, GND, SIG (digital)",
    dificultad: "facil",
    usosReales: ["Interruptores táctiles", "Lámparas"],
    detalle:
      "Este módulo (basado en el chip TTP223) detecta el toque de tu dedo por capacitancia, sin necesitar un botón mecánico. Se comporta exactamente como un botón digital: entrega HIGH al ser tocado.",
    pinout: [
      { pin: "VCC", descripcion: "Alimentación 2–5.5V" },
      { pin: "GND", descripcion: "Tierra" },
      { pin: "SIG", descripcion: "Salida digital (HIGH al tocar)" },
    ],
    conexion: "VCC → 5V; GND → GND; SIG → pin 2.",
    codigo: `const int boton = 2;
const int led = 8;

void setup() {
  pinMode(boton, INPUT);
  pinMode(led, OUTPUT);
}

void loop() {
  if (digitalRead(boton) == HIGH) {
    digitalWrite(led, HIGH);
  } else {
    digitalWrite(led, LOW);
  }
}`,
    codigoExplicacion: [
      "digitalRead(boton) → Lee si el sensor está siendo tocado.",
      "El if/else enciende o apaga el LED según el estado.",
    ],
    erroresComunes: ["Confundirlo con un botón mecánico que necesita INPUT_PULLUP (el touch no lo necesita)."],
    consejos: ["Se usa exactamente igual que un botón digital simple, sin rebotes mecánicos que filtrar."],
    proyectos: ["Botón + LED", "Interruptor de lámpara"],
    variaciones: "Sensores táctiles multitáctil, sliders capacitivos.",
    youtube: [yt("Sensor táctil TTP223 con Arduino", "arduino sensor tactil ttp223 tutorial español")],
  },
  {
    id: "hc-sr04",
    nombre: "Sensor ultrasónico HC-SR04",
    categoria: "sensor",
    imagen: "assets/images/ultrasonic_sensor_hc_sr04.jpg",
    descripcionCorta: "Mide distancia con eco.",
    paraQueSirve: "Calcula qué tan lejos está un objeto.",
    comoFunciona: "Emite un ultrasonido y cronometra cuánto tarda el eco en volver.",
    voltaje: "5V",
    pines: "VCC, TRIG, ECHO, GND",
    dificultad: "medio",
    usosReales: ["Radar Arduino", "Auto que esquiva obstáculos", "Medidor de distancia"],
    detalle:
      "El HC-SR04 mide distancia como un murciélago: emite un pulso de ultrasonido por TRIG y mide en ECHO cuánto tarda el eco en volver. Como la velocidad del sonido es conocida (~343 m/s), con el tiempo se calcula la distancia. Rango útil: 2–400 cm.",
    pinout: [
      { pin: "VCC", descripcion: "Alimentación 5V" },
      { pin: "TRIG", descripcion: "Disparo del pulso (salida del Arduino)" },
      { pin: "ECHO", descripcion: "Recepción del eco (entrada al Arduino)" },
      { pin: "GND", descripcion: "Tierra" },
    ],
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
  delayMicroseconds(10);       // Pulso de 10 microsegundos.
  digitalWrite(trigPin, LOW);

  long duracion = pulseIn(echoPin, HIGH);   // Tiempo del eco (µs).
  float distancia = duracion * 0.0343 / 2;  // A centímetros.

  Serial.print("Distancia: ");
  Serial.print(distancia);
  Serial.println(" cm");
  delay(500);
}`,
    codigoExplicacion: [
      "Se manda un pulso de 10 µs por TRIG para disparar la medición.",
      "pulseIn(echoPin, HIGH) mide cuántos microsegundos dura el eco.",
      "distancia = duracion * 0.0343 / 2: multiplicamos por la velocidad del sonido (0.0343 cm/µs) y dividimos por 2 porque el sonido va y vuelve.",
      "Serial.print muestra el resultado en el Monitor Serie (lupa arriba a la derecha del IDE).",
    ],
    erroresComunes: [
      "Cruzar TRIG y ECHO.",
      "No abrir el Monitor Serie a 9600 baudios.",
      "Medir superficies blandas (absorben el sonido) o muy inclinadas (el eco se va para otro lado).",
    ],
    consejos: ["Deja el sensor fijo y apuntando de frente.", "Para un radar, móntalo sobre el servo."],
    proyectos: ["Radar Arduino", "Auto que esquiva obstáculos", "Medidor de distancia", "Alarma de proximidad"],
    variaciones: "Sensores de 3 pines, sensor láser ToF (VL53L0X) para más precisión.",
    youtube: [yt("HC-SR04: medir distancia con Arduino", "arduino hc-sr04 ultrasonico distancia tutorial español")],
  },
  {
    id: "oled-096",
    nombre: "Pantalla OLED 0.96\"",
    categoria: "pantalla",
    imagen: "assets/images/oled_display_0_96_i2c.jpg",
    descripcionCorta: "Pantalla nítida de 128×64.",
    paraQueSirve: "Muestra texto, íconos y gráficos.",
    comoFunciona: "Cada píxel emite su propia luz (no necesita retroiluminación); se controla por I2C.",
    voltaje: "3.3–5V",
    pines: "VCC, GND, SDA→A4, SCL→A5",
    dificultad: "medio",
    usosReales: ["Relojes", "Medidores", "Mini-interfaces"],
    detalle:
      "La pantalla OLED de 0.96 pulgadas tiene 128×64 píxeles monocromáticos (usualmente blanco o azul). Al usar el chip SSD1306, cada píxel emite su propia luz, por lo que el contraste es muy alto y el consumo bajo. Se controla por I2C, igual que la LCD.",
    pinout: [
      { pin: "VCC", descripcion: "Alimentación 3.3–5V" },
      { pin: "GND", descripcion: "Tierra" },
      { pin: "SDA", descripcion: "Datos I2C → A4" },
      { pin: "SCL", descripcion: "Reloj I2C → A5" },
    ],
    conexion: "VCC → 3.3–5V; GND → GND; SDA → A4; SCL → A5.",
    codigo: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.print("Hola!");
  display.display();
}

void loop() {
}`,
    codigoExplicacion: [
      "display.begin(SSD1306_SWITCHCAPVCC, 0x3C); → Inicia la pantalla en la dirección I2C 0x3C.",
      "display.clearDisplay(); → Borra el buffer de la pantalla.",
      "display.print(\"Hola!\"); → Escribe texto en el buffer (aún no se ve).",
      "display.display(); → Envía el buffer a la pantalla física; sin esto, no aparece nada.",
    ],
    erroresComunes: [
      "Confundir la dirección I2C (0x3C es la más común para este módulo).",
      "Olvidar display.display() (nada aparece en pantalla).",
    ],
    consejos: ["Instala las librerías Adafruit_GFX y Adafruit_SSD1306 desde el Gestor de Librerías del IDE."],
    proyectos: ["Reloj", "Medidores", "Mini-interfaces"],
    variaciones: "OLED de 1.3\" (128×64 más grande), OLED a color.",
    youtube: [yt("Pantalla OLED SSD1306 con Arduino", "arduino oled ssd1306 0.96 tutorial español")],
  },
  {
    id: "obstaculo-ir",
    nombre: "Sensor de obstáculos (IR)",
    categoria: "sensor",
    imagen: "assets/images/ir_obstacle_avoidance_sensor.jpg",
    descripcionCorta: "Ve si hay algo enfrente.",
    paraQueSirve: "Detecta objetos cercanos sin tocarlos.",
    comoFunciona: "Un LED infrarrojo emite luz y un receptor mide cuánta rebota.",
    voltaje: "5V",
    pines: "VCC, GND, OUT (digital)",
    dificultad: "facil",
    usosReales: ["Robots que esquivan", "Conteo de objetos", "Evitar caídas de una mesa"],
    detalle:
      "Este sensor emite luz infrarroja (invisible al ojo) y mide cuánta rebota de vuelta con un fototransistor. Si un objeto está cerca, más luz rebota y el sensor lo detecta. Tiene un potenciómetro para ajustar la distancia de detección.",
    pinout: [
      { pin: "VCC", descripcion: "Alimentación 5V" },
      { pin: "GND", descripcion: "Tierra" },
      { pin: "OUT", descripcion: "Salida digital (LOW al detectar obstáculo, según módulo)" },
    ],
    conexion: "VCC → 5V; GND → GND; OUT → pin 2.",
    codigo: `const int sensor = 2;

void setup() {
  pinMode(sensor, INPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(sensor) == LOW) {
    Serial.println("Obstaculo detectado");
  }
  delay(200);
}`,
    codigoExplicacion: [
      "digitalRead(sensor) == LOW → En muchos módulos IR, LOW significa 'hay un obstáculo' (revisa el tuyo, algunos son al revés).",
    ],
    erroresComunes: [
      "Suponer la polaridad de la señal sin comprobarla (algunos módulos son HIGH al detectar).",
      "No ajustar el potenciómetro de alcance.",
    ],
    consejos: ["Prueba con el Monitor Serie qué valor entrega tu módulo específico antes de programar la lógica final."],
    proyectos: ["Robot que frena ante paredes", "Conteo de objetos"],
    variaciones: "Sensores IR de mayor alcance, sensores de línea (line follower).",
    youtube: [yt("Sensor de obstáculos infrarrojo con Arduino", "arduino sensor obstaculo infrarrojo tutorial español")],
  },
  {
    id: "matriz-8x8",
    nombre: "Matriz de puntos 8×8 (Dot Matrix)",
    categoria: "pantalla",
    imagen: "assets/images/matriz.png",
    descripcionCorta: "64 LEDs para dibujar.",
    paraQueSirve: "Muestra letras, íconos y animaciones.",
    comoFunciona: "Es una rejilla de 64 LEDs con 16 patas (8 filas y 8 columnas); cada punto se enciende activando su fila y su columna.",
    voltaje: "~2V por LED (con resistencias)",
    pines: "8 filas + 8 columnas (16 patas)",
    dificultad: "dificil",
    usosReales: ["Letreros", "Caritas", "Mini-animaciones"],
    detalle:
      "Esta matriz es el componente 'crudo': 64 LEDs organizados en 8 filas y 8 columnas, con 16 patas y SIN ningún chip controlador ni PCB. Para encender el LED de una fila y una columna, se ponen su fila y su columna en niveles opuestos. Como el Arduino no puede manejar los 64 LEDs a la vez, se 'multiplexan': se enciende una columna a la vez a gran velocidad y el ojo percibe la imagen completa. Cada línea necesita una resistencia para limitar la corriente. Es el componente más avanzado del kit.",
    pinout: [
      { pin: "Filas (8)", descripcion: "Ánodos (+): una pata por fila, a un pin digital" },
      { pin: "Columnas (8)", descripcion: "Cátodos (−): una pata por columna, cada una con su resistencia" },
    ],
    conexion:
      "Las 16 patas van cada una a un pin del Arduino: 8 filas (ánodos) directas y 8 columnas (cátodos) cada una con su resistencia de 220Ω (o al revés según el modelo). El orden de las patas NO es secuencial: guíate por el datasheet de tu matriz para saber cuál es cada fila y cada columna. En el ejemplo: filas → pines 2–9; columnas → 10, 11, 12, 13, A0, A1, A2, A3.",
    codigo: `// Matriz 8x8 "cruda" (sin chip): multiplexado por columnas.
// filas = ánodos (+); columnas = cátodos (−, con resistencia cada una).
const int filas[8]    = {2, 3, 4, 5, 6, 7, 8, 9};
const int columnas[8] = {10, 11, 12, 13, A0, A1, A2, A3};

// Cada byte es una fila; cada bit en 1 enciende ese punto (una carita).
byte imagen[8] = {
  0b00111100,
  0b01000010,
  0b10100101,
  0b10000001,
  0b10100101,
  0b10011001,
  0b01000010,
  0b00111100,
};

void setup() {
  for (int i = 0; i < 8; i++) {
    pinMode(filas[i], OUTPUT);
    pinMode(columnas[i], OUTPUT);
    digitalWrite(columnas[i], HIGH);  // HIGH = columna apagada
  }
}

void loop() {
  for (int c = 0; c < 8; c++) {          // recorre columna por columna
    for (int f = 0; f < 8; f++) {
      digitalWrite(filas[f], bitRead(imagen[f], 7 - c));
    }
    digitalWrite(columnas[c], LOW);      // enciende esta columna
    delay(2);
    digitalWrite(columnas[c], HIGH);     // la apaga antes de la siguiente
  }
}`,
    codigoExplicacion: [
      "filas[] y columnas[] → los 16 pines del Arduino: 8 para las filas (ánodos) y 8 para las columnas (cátodos).",
      "imagen[] → 8 bytes, uno por fila; cada bit en 1 es un LED encendido.",
      "bitRead(imagen[f], 7 - c) → saca el bit de la columna c dentro de la fila f.",
      "Se enciende una columna a la vez (LOW) muy rápido; el ojo ve la imagen completa: eso es multiplexar.",
      "delay(2) → cada columna brilla ~2 ms; con menos parpadea, con mucho más se nota el barrido.",
    ],
    erroresComunes: [
      "No poner una resistencia por columna (los LEDs reciben demasiada corriente y se dañan).",
      "Equivocar qué pata es cada fila y cada columna: en la matriz cruda el orden de los pines NO es secuencial (usa el datasheet).",
      "Barrido con delay muy largo (se ve el parpadeo) o dejar dos columnas encendidas a la vez (aparecen 'fantasmas').",
    ],
    consejos: [
      "Primero enciende UN solo LED (una fila en HIGH y una columna en LOW) para ubicar bien las patas.",
      "Dibuja tu figura en una cuadrícula de 8×8 en papel y tradúcela a los 8 bytes.",
    ],
    proyectos: ["Letrero animado", "Caritas", "Mini-animaciones"],
    variaciones: "Existe la versión en módulo con chip MAX7219, que se controla con solo 3 pines de datos (sin cablear las 16 patas); también hay matrices RGB y cadenas de varias matrices.",
    youtube: [yt("Matriz LED 8x8 sin módulo (multiplexado) con Arduino", "arduino matriz led 8x8 multiplexado sin modulo tutorial español")],
  },
  {
    id: "joystick",
    nombre: "Joystick",
    categoria: "sensor",
    imagen: "assets/images/analog_joystick_module.jpg",
    descripcionCorta: "Como el de un control de videojuegos.",
    paraQueSirve: "Entrega dirección en 2 ejes + un botón.",
    comoFunciona: "Dos potenciómetros miden X e Y (0–1023) y un pulsador da el clic.",
    voltaje: "5V",
    pines: "VCC, GND, VRx→A0, VRy→A1, SW (digital)",
    dificultad: "medio",
    usosReales: ["Control de servos", "Menús", "Juegos simples"],
    detalle:
      "El módulo joystick tiene dos potenciómetros (uno por eje) que entregan un valor analógico según la posición de la palanca, más un pulsador que se activa al presionar hacia abajo el eje.",
    pinout: [
      { pin: "VCC", descripcion: "Alimentación 5V" },
      { pin: "GND", descripcion: "Tierra" },
      { pin: "VRx", descripcion: "Eje X (analógico) → A0" },
      { pin: "VRy", descripcion: "Eje Y (analógico) → A1" },
      { pin: "SW", descripcion: "Botón (digital, usar INPUT_PULLUP)" },
    ],
    conexion: "VCC → 5V; GND → GND; VRx → A0; VRy → A1; SW → pin 2.",
    codigo: `void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT_PULLUP);
}

void loop() {
  Serial.print(analogRead(A0));
  Serial.print(", ");
  Serial.print(analogRead(A1));
  Serial.print("  boton: ");
  Serial.println(digitalRead(2));
  delay(200);
}`,
    codigoExplicacion: [
      "analogRead(A0) / analogRead(A1) → Leen la posición de cada eje (0 a 1023, centro ~512).",
      "pinMode(2, INPUT_PULLUP) → El botón usa resistencia pull-up interna; presionado = LOW.",
    ],
    erroresComunes: ["Olvidar INPUT_PULLUP en el botón (lecturas inestables).", "Confundir VRx con VRy."],
    consejos: ["El centro de cada eje ronda los 512, pero puede variar levemente entre joysticks."],
    proyectos: ["Controlar un servo", "Menús de navegación"],
    variaciones: "Joysticks analógicos dobles, joysticks con más botones.",
    youtube: [yt("Joystick con Arduino", "arduino joystick tutorial español")],
  },
  {
    id: "display-7-segmentos",
    nombre: "Display de 7 segmentos",
    categoria: "pantalla",
    imagen: "assets/images/7seg.jpg",
    descripcionCorta: "Un dígito grande y brillante.",
    paraQueSirve: "Muestra un número (0–9) o letra simple.",
    comoFunciona: "Siete LEDs en forma de '8' se encienden en combinación para formar cada cifra.",
    voltaje: "~2V/segmento (con resistencias)",
    pines: "Común (cátodo/ánodo) + 7 segmentos + punto",
    dificultad: "medio",
    usosReales: ["Contador", "Dado electrónico", "Marcador"],
    detalle:
      "Un display de 7 segmentos es literalmente 7 LEDs (más el punto decimal) dispuestos en forma de '8'. Encendiendo la combinación correcta de segmentos se forma cualquier dígito del 0 al 9. Puede ser de cátodo común (el pin común va a GND) o ánodo común (el pin común va a 5V).",
    pinout: [
      { pin: "a–g", descripcion: "Los 7 segmentos individuales (cada uno con su resistencia)" },
      { pin: "Común", descripcion: "GND (cátodo común) o 5V (ánodo común)" },
      { pin: "dp", descripcion: "Punto decimal (opcional)" },
    ],
    conexion:
      "Conexión típica (cátodo común): segmentos a–g a 7 pines digitales (por ejemplo, 2 al 8) con una resistencia de 220Ω cada uno; el pin común → GND.",
    codigo: `// Cátodo común: cada segmento con su propia resistencia.
const int segmentos[7] = {2, 3, 4, 5, 6, 7, 8}; // a, b, c, d, e, f, g

void setup() {
  for (int i = 0; i < 7; i++) pinMode(segmentos[i], OUTPUT);
}

void loop() {
  // Muestra el número 1: solo segmentos b y c encendidos.
  digitalWrite(segmentos[1], HIGH); // b
  digitalWrite(segmentos[2], HIGH); // c
}`,
    codigoExplicacion: [
      "Cada posición del arreglo segmentos[] corresponde a una letra (a, b, c...) del display.",
      "Para dibujar un número, se encienden solo los segmentos que lo forman (el '1' usa solo b y c).",
    ],
    erroresComunes: [
      "Muchísimo cableado si no se planea bien (7 resistencias + 7 cables).",
      "Equivocar el tipo (cátodo/ánodo común invierte la lógica HIGH/LOW).",
    ],
    consejos: ["Dibuja en papel qué segmentos necesitas para cada dígito antes de programar."],
    proyectos: ["Dado electrónico", "Contador simple"],
    variaciones: "Displays de 7 segmentos con controlador (menos cables), displays dobles.",
    youtube: [yt("Display de 7 segmentos con Arduino", "arduino display 7 segmentos tutorial español")],
  },
  {
    id: "cables-dupont",
    nombre: "Cables Dupont",
    categoria: "basico",
    imagen: "assets/images/dupont_cables_m_m.jpg",
    descripcionCorta: "Los 'cables saltadores'.",
    paraQueSirve: "Conectan todo entre placa, protoboard y sensores.",
    comoFunciona: "Puntas macho/hembra que entran a presión en los headers y la protoboard.",
    voltaje: "—",
    pines: "M-M, M-H",
    dificultad: "facil",
    usosReales: ["Absolutamente todos los proyectos"],
    detalle:
      "Los cables Dupont vienen en dos variantes según sus puntas: macho-macho (M-M) y macho-hembra (M-H). Se usan para conectar el Arduino, la protoboard y los módulos sensores entre sí sin soldar.",
    pinout: [],
    conexion:
      "Macho-Macho (M-M): entre dos agujeros de protoboard. Macho-Hembra (M-H): de un pin del Arduino a un módulo con headers macho.",
    codigo: null,
    codigoExplicacion: [],
    erroresComunes: ["Usar el tipo de punta equivocado para la conexión que necesitas."],
    consejos: ["Ten ambos tipos a mano: casi todos los proyectos del kit usan tanto M-M como M-H."],
    proyectos: ["Todos los proyectos"],
    variaciones: "Cables planos (ribbon cable), cables de colores para organizar por función.",
    youtube: [yt("Cables Dupont: para qué sirve cada tipo", "cables dupont jumper para que sirven")],
  },
];

export const CATEGORIAS = [
  { id: "todos", nombre: "Todos" },
  { id: "basico", nombre: "Básicos" },
  { id: "sensor", nombre: "Sensores (entradas)" },
  { id: "actuador", nombre: "Actuadores (salidas)" },
  { id: "pantalla", nombre: "Pantallas" },
];
