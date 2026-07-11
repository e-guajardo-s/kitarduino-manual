/* Los 12 conceptos básicos de electrónica — Sección 2 */

export const CONCEPTOS = [
  {
    id: "voltaje",
    nombre: "Voltaje",
    simbolo: "V",
    unidad: "voltio (V)",
    explicacion:
      "Es la “fuerza” o presión que empuja a los electrones a moverse. Sin voltaje, no hay movimiento de electricidad. Se mide siempre <strong>entre dos puntos</strong> (una diferencia).",
    ejemplo:
      "Una pila AA entrega 1,5 V; un puerto USB entrega 5 V; el enchufe de tu casa, 220 V (¡por eso es peligroso!).",
    svg: `<svg viewBox="0 0 200 90" role="img"><title>Dos torres de agua a distinta altura: la diferencia de altura es el voltaje</title>
      <rect x="20" y="20" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="24" y="55" width="22" height="21" fill="currentColor" opacity="0.35"/>
      <rect x="150" y="8" width="30" height="72" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="154" y="15" width="22" height="61" fill="currentColor" opacity="0.35"/>
      <line x1="50" y1="76" x2="150" y2="80" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
      <line x1="50" y1="55" x2="150" y2="15" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
      <path d="M60 55 v-40" stroke="currentColor" stroke-width="1.5" marker-end="url(#ah)"/>
      <text x="66" y="38" font-size="11" fill="currentColor">V</text>
      <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
  {
    id: "corriente",
    nombre: "Corriente",
    simbolo: "I",
    unidad: "amperio (A)",
    explicacion:
      "Es la cantidad de electrones que pasan por un cable cada segundo. A más corriente, más “caudal” de electricidad.",
    ejemplo:
      "Un LED necesita poca corriente (unos 0,02 A = 20 mA); un motor necesita mucha más. Por eso un LED se conecta con una resistencia y un motor a veces necesita ayuda extra.",
    svg: `<svg viewBox="0 0 200 70" role="img"><title>Cañería con gotas moviéndose: contar gotas por segundo es la corriente</title>
      <rect x="10" y="28" width="180" height="14" rx="7" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle class="i-drop" cx="35" cy="35" r="4" fill="currentColor"/>
      <circle class="i-drop" cx="70" cy="35" r="4" fill="currentColor"/>
      <circle class="i-drop" cx="105" cy="35" r="4" fill="currentColor"/>
      <circle class="i-drop" cx="140" cy="35" r="4" fill="currentColor"/>
      <circle class="i-drop" cx="170" cy="35" r="4" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "resistencia",
    nombre: "Resistencia",
    simbolo: "R",
    unidad: "ohmio (Ω)",
    explicacion:
      "Es la oposición al paso de la corriente. Una resistencia “frena” los electrones y los convierte en un poco de calor. Sirve para <strong>proteger</strong> componentes delicados como los LEDs.",
    ejemplo:
      "Una cañería angosta deja pasar menos agua. La resistencia de 220 Ω que usarás con los LEDs evita que se quemen.",
    svg: `<svg viewBox="0 0 200 70" role="img"><title>Resistor con bandas de colores junto a un tramo estrecho de cañería</title>
      <line x1="10" y1="35" x2="55" y2="35" stroke="currentColor" stroke-width="2"/>
      <rect x="55" y="20" width="60" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <rect x="66" y="20" width="6" height="30" fill="#e97435"/>
      <rect x="80" y="20" width="6" height="30" fill="#1b1f24"/>
      <rect x="94" y="20" width="6" height="30" fill="#c9302c"/>
      <line x1="115" y1="35" x2="190" y2="35" stroke="currentColor" stroke-width="2"/>
    </svg>`,
  },
  {
    id: "potencia",
    nombre: "Potencia",
    simbolo: "P",
    unidad: "vatio (W)",
    explicacion:
      "Es la energía que un componente consume o entrega por segundo. Se calcula multiplicando voltaje por corriente: <strong>P = V × I</strong>.",
    ejemplo:
      "Una ampolleta de 60 W consume más energía que una de 5 W. Tu Arduino completo consume alrededor de medio vatio: muy poquito.",
    svg: `<svg viewBox="0 0 200 70" role="img"><title>Fórmula P = V por I</title>
      <text x="100" y="42" text-anchor="middle" font-family="monospace" font-size="24" fill="currentColor" font-weight="700">P = V × I</text>
    </svg>`,
  },
  {
    id: "ley-ohm",
    nombre: "Ley de Ohm",
    simbolo: "Ω",
    unidad: "V = I × R",
    explicacion:
      "La regla más importante de toda la electrónica. Relaciona voltaje, corriente y resistencia: si conoces dos, puedes calcular la tercera. Se despeja como un triángulo.",
    ejemplo:
      "Para encender un LED (que “usa” unos 2 V) desde un pin de 5 V sin quemarlo, esta ley te dice qué resistencia poner. La calculadora de arriba lo hace por ti.",
    svg: `<svg viewBox="0 0 160 100" role="img"><title>Triángulo de la Ley de Ohm: V arriba, I y R abajo</title>
      <polygon points="80,10 10,90 150,90" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="45" y1="50" x2="115" y2="50" stroke="currentColor" stroke-width="1.5"/>
      <line x1="80" y1="50" x2="80" y2="90" stroke="currentColor" stroke-width="1.5"/>
      <text x="80" y="40" text-anchor="middle" font-family="monospace" font-size="20" fill="currentColor" font-weight="700">V</text>
      <text x="45" y="78" text-anchor="middle" font-family="monospace" font-size="20" fill="currentColor" font-weight="700">I</text>
      <text x="115" y="78" text-anchor="middle" font-family="monospace" font-size="20" fill="currentColor" font-weight="700">R</text>
    </svg>`,
  },
  {
    id: "polaridad",
    nombre: "Polaridad",
    simbolo: "±",
    unidad: "+ / −",
    explicacion:
      "Algunos componentes tienen lado positivo y negativo, y <strong>solo funcionan si los conectas en el sentido correcto</strong>. Se llaman polarizados.",
    ejemplo:
      "Un LED solo enciende en un sentido; su pata larga es el + (ánodo) y la corta el − (cátodo). Una pila también: lado plano −, lado con “pezón” +.",
    svg: `<svg viewBox="0 0 160 90" role="img"><title>LED con pata larga positiva y pata corta negativa</title>
      <polygon points="55,30 55,60 95,45" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="95" y1="30" x2="95" y2="60" stroke="currentColor" stroke-width="2"/>
      <line x1="55" y1="45" x2="30" y2="20" stroke="currentColor" stroke-width="2"/>
      <line x1="95" y1="45" x2="125" y2="55" stroke="currentColor" stroke-width="2"/>
      <text x="22" y="16" font-family="monospace" font-size="16" fill="currentColor" font-weight="700">+</text>
      <text x="128" y="62" font-family="monospace" font-size="16" fill="currentColor" font-weight="700">−</text>
    </svg>`,
  },
  {
    id: "gnd",
    nombre: "GND (tierra)",
    simbolo: "⏚",
    unidad: "0 V",
    explicacion:
      "Es el punto de referencia de 0 voltios, el “nivel del mar” de tu circuito. <strong>Todo voltaje se mide respecto a GND.</strong> Todos los componentes deben compartir el mismo GND.",
    ejemplo:
      "Si el voltaje es la altura, GND es el suelo desde donde mides. Sin un suelo común, nadie se pone de acuerdo en cuánto mide cada cosa.",
    svg: `<svg viewBox="0 0 160 80" role="img"><title>Símbolo de tierra conectado a varios componentes</title>
      <line x1="80" y1="10" x2="80" y2="45" stroke="currentColor" stroke-width="2"/>
      <line x1="55" y1="45" x2="105" y2="45" stroke="currentColor" stroke-width="2"/>
      <line x1="63" y1="55" x2="97" y2="55" stroke="currentColor" stroke-width="2"/>
      <line x1="71" y1="65" x2="89" y2="65" stroke="currentColor" stroke-width="2"/>
    </svg>`,
  },
  {
    id: "5v",
    nombre: "5 V",
    simbolo: "5V",
    unidad: "pin de alimentación",
    explicacion:
      "Es el voltaje principal con el que trabaja el Arduino UNO. La mayoría de tus sensores y actuadores se alimentan con 5 V desde el pin marcado <code>5V</code>.",
    ejemplo: "Es el mismo voltaje que entrega un cargador USB de celular.",
    svg: `<svg viewBox="0 0 160 70" role="img"><title>Pin de 5 voltios de la placa Arduino resaltado</title>
      <rect x="40" y="20" width="80" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="80" y="40" text-anchor="middle" font-family="monospace" font-size="16" fill="currentColor" font-weight="700">5V</text>
    </svg>`,
  },
  {
    id: "3v3",
    nombre: "3.3 V",
    simbolo: "3V3",
    unidad: "pin de alimentación",
    explicacion:
      "Un segundo voltaje, más bajo, que también entrega la placa. Algunos componentes modernos (sobre todo módulos wifi) funcionan a 3,3 V y se <strong>dañan</strong> con 5 V.",
    ejemplo: "Piensa en 3,3 V como “media presión”: ideal para componentes más delicados.",
    svg: `<svg viewBox="0 0 160 70" role="img"><title>Pin de 3.3 voltios junto al pin de 5 voltios para comparar</title>
      <rect x="15" y="20" width="60" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5"/>
      <text x="45" y="40" text-anchor="middle" font-family="monospace" font-size="13" fill="currentColor" opacity="0.5">5V</text>
      <rect x="90" y="20" width="60" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="120" y="40" text-anchor="middle" font-family="monospace" font-size="13" fill="currentColor" font-weight="700">3V3</text>
    </svg>`,
  },
  {
    id: "digital-analogico",
    nombre: "Digital vs Analógico",
    simbolo: "⎍",
    unidad: "HIGH/LOW vs 0–5V",
    explicacion:
      "Una señal <strong>digital</strong> solo tiene dos estados: encendido o apagado (1 o 0, HIGH o LOW). Una señal <strong>analógica</strong> puede tomar cualquier valor intermedio, como un dimmer de luz.",
    ejemplo:
      "Un interruptor de luz común es digital (prendido/apagado). La perilla del volumen es analógica (sube de a poquito). El Arduino lee lo analógico con los pines A0–A5.",
    svg: `<svg viewBox="0 0 200 70" role="img"><title>Onda cuadrada digital comparada con onda suave analógica</title>
      <polyline points="10,50 10,20 40,20 40,50 70,50 70,20 90,20" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M110 40 Q 125 10 140 40 T 190 40" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`,
  },
  {
    id: "pwm",
    nombre: "PWM",
    simbolo: "~",
    unidad: "Modulación por Ancho de Pulso",
    explicacion:
      "Es un truco para <strong>simular una señal analógica usando una digital</strong>. El pin se enciende y apaga miles de veces por segundo; si está encendido más tiempo, el resultado “promedio” es mayor. Así puedes regular el brillo de un LED o la velocidad de un motor.",
    ejemplo:
      "Como pedalear en bici y dejar de pedalear muy rápido: en promedio vas a media velocidad. Los pines PWM del UNO son 3, 5, 6, 9, 10 y 11 (llevan el símbolo ~).",
    svg: `<svg viewBox="0 0 200 70" role="img"><title>Tres ondas cuadradas con distinto ancho de pulso: 25%, 50% y 75%</title>
      <polyline points="5,55 5,45 15,45 15,55 25,55 25,45 35,45 35,55 45,55 45,45 55,45 55,55" fill="none" stroke="currentColor" stroke-width="2"/>
      <polyline points="70,55 70,45 85,45 85,55 100,55 100,45 115,45 115,55" fill="none" stroke="currentColor" stroke-width="2"/>
      <polyline points="135,55 135,45 158,45 158,55 165,55 165,45 188,45 188,55" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="30" y="15" text-anchor="middle" font-size="9" fill="currentColor">25%</text>
      <text x="95" y="15" text-anchor="middle" font-size="9" fill="currentColor">50%</text>
      <text x="160" y="15" text-anchor="middle" font-size="9" fill="currentColor">75%</text>
    </svg>`,
  },
  {
    id: "pull-updown",
    nombre: "Pull-up y Pull-down",
    simbolo: "⇅",
    unidad: "resistencias",
    explicacion:
      "Cuando un pin de entrada no está conectado a nada, “flota” y lee valores al azar. Una resistencia <strong>pull-up</strong> lo mantiene en HIGH por defecto; una <strong>pull-down</strong>, en LOW. Así el pin siempre tiene un valor definido hasta que presionas un botón.",
    ejemplo:
      "Es como un resorte que devuelve un botón a su posición de reposo: sabes cómo está cuando nadie lo toca. El Arduino trae pull-ups internas (INPUT_PULLUP).",
    svg: `<svg viewBox="0 0 200 80" role="img"><title>Botón con resistencia a 5V (pull-up) comparado con resistencia a GND (pull-down)</title>
      <text x="35" y="14" text-anchor="middle" font-size="9" fill="currentColor">PULL-UP</text>
      <line x1="35" y1="18" x2="35" y2="30" stroke="currentColor" stroke-width="2"/>
      <rect x="27" y="30" width="16" height="18" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="35" y1="48" x2="35" y2="60" stroke="currentColor" stroke-width="2"/>
      <circle cx="35" cy="66" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="160" y="14" text-anchor="middle" font-size="9" fill="currentColor">PULL-DOWN</text>
      <line x1="160" y1="18" x2="160" y2="30" stroke="currentColor" stroke-width="2"/>
      <circle cx="160" cy="24" r="0" />
      <rect x="152" y="46" width="16" height="18" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="160" y1="18" x2="160" y2="46" stroke="currentColor" stroke-width="2"/>
      <line x1="160" y1="64" x2="160" y2="70" stroke="currentColor" stroke-width="2"/>
    </svg>`,
  },
];
