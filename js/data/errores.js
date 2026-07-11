/* ============================================================
   7 problemas comunes — diagnóstico paso a paso.
   ============================================================ */

export const ERRORES = [
  {
    id: "puerto",
    sintoma: "No aparece el puerto (Herramientas → Puerto vacío o gris)",
    causas: [
      "Cable USB de 'solo carga' (no transmite datos).",
      "Falta el driver del chip USB (común en placas clon con chip CH340).",
      "La placa no está bien conectada.",
      "El puerto lo ocupa otro programa.",
    ],
    solucion: [
      "Prueba otro cable USB que sí sea de datos.",
      "Si tu placa es un clon, instala el driver CH340.",
      "Revisa que la luz ON de la placa esté encendida.",
      "Reconecta y mira de nuevo el menú Herramientas → Puerto.",
    ],
  },
  {
    id: "no-compila",
    sintoma: "No compila (error en rojo al Verificar)",
    causas: [
      "Falta un punto y coma ; al final de una línea.",
      "Una llave } sin cerrar.",
      "Un nombre mal escrito (mayúsculas cuentan).",
      "Una librería no instalada (.h: No such file).",
    ],
    solucion: [
      "Lee el error: te dice la línea.",
      "Revisa el punto y coma de esa línea y la anterior.",
      "Cuenta que cada { tenga su }.",
      "Si dice 'No such file', instala la librería desde Herramientas → Gestor de Librerías.",
    ],
  },
  {
    id: "no-carga",
    sintoma: "No carga / error al subir (compila bien pero falla al Subir)",
    causas: [
      "Placa o puerto mal seleccionados.",
      "El puerto está ocupado (otra ventana con el Monitor Serie abierto).",
      "Mala conexión del cable.",
      "El mensaje avrdude: stk500_getsync() significa que el IDE no logra hablar con la placa.",
    ],
    solucion: [
      "Verifica Herramientas → Placa = 'Arduino Uno' y el Puerto correcto.",
      "Cierra otras ventanas del IDE o del Monitor Serie que usen el puerto.",
      "Presiona el botón Reset de la placa justo antes de subir.",
      "Prueba otro cable/puerto USB.",
    ],
  },
  {
    id: "led-invertido",
    sintoma: "El LED no enciende o está al revés",
    causas: [
      "Polaridad invertida (el LED es polarizado).",
      "Falta la resistencia o el LED se quemó.",
      "El pin del código no es el pin real.",
      "LED defectuoso.",
    ],
    solucion: [
      "Da vuelta el LED: la pata larga (+) va hacia el pin (vía resistencia), la corta (−) a GND.",
      "Confirma que haya una resistencia (220–330Ω).",
      "Revisa que el número de pin del código coincida con el físico.",
      "Prueba con otro LED.",
    ],
  },
  {
    id: "servo-no-funciona",
    sintoma: "El servo no funciona, tiembla o reinicia la placa",
    causas: [
      "Alimentación insuficiente (un servo exige más corriente de la que da el pin).",
      "GND no compartido entre servo y Arduino.",
      "Pin de señal equivocado.",
      "Usar analogWrite en vez de la librería Servo.",
    ],
    solucion: [
      "Si tiembla o la placa se reinicia, usa una fuente externa de 5V y une los GND.",
      "Verifica que el cable naranjo (señal) esté en el pin que dice el código.",
      "Usa #include <Servo.h> y miServo.write(angulo), no analogWrite.",
    ],
  },
  {
    id: "sensor-no-responde",
    sintoma: "El sensor no responde o da valores raros",
    causas: [
      "VCC y GND invertidos.",
      "Pin de datos equivocado.",
      "Falta la librería.",
      "Lo lees demasiado rápido (el DHT11 devuelve nan si lo consultas antes de 2 s).",
      "No esperaste el calentamiento (el PIR necesita ~30–60 s).",
    ],
    solucion: [
      "Revisa el cableado con la ficha del componente (sección Componentes).",
      "Abre el Monitor Serie e imprime la lectura para ver qué pasa.",
      "Respeta los tiempos: delay(2000) con el DHT11, espera inicial con el PIR.",
      "Instala la librería que pide el sensor.",
    ],
  },
  {
    id: "lcd-sin-texto",
    sintoma: "La pantalla LCD está encendida pero sin texto",
    causas: [
      "Contraste mal ajustado (lo más común).",
      "Dirección I2C equivocada (0x27 vs 0x3F).",
      "SDA/SCL cruzados o no conectados a A4/A5.",
      "Falta la librería.",
    ],
    solucion: [
      "Gira el potenciómetro azul de la parte de atrás hasta que aparezca el texto.",
      "Si sigue en blanco, prueba la dirección 0x3F en el código.",
      "Confirma SDA→A4 y SCL→A5.",
      "Un sketch 'I2C Scanner' te dice la dirección exacta de tu módulo.",
    ],
  },
];
