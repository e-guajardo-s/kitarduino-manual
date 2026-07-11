/* ============================================================
   Tinkercad Circuits — introducción para simular sin el kit físico.
   ============================================================ */

export const PASOS_TINKERCAD = [
  {
    titulo: "Crea tu cuenta gratis",
    texto: `Entra a <strong>tinkercad.com</strong> y haz clic en “Sign Up” (Registrarse). Puedes crear una cuenta con tu correo o entrar directo con una cuenta de Google. Es <strong>gratis</strong> y no necesitas tarjeta de crédito. Cuando te pregunte el tipo de cuenta, elige <strong>“Personal”</strong> (la opción “For education” es solo si tu colegio te entrega un código).`,
  },
  {
    titulo: "Crea un circuito nuevo",
    texto: `En el panel de la izquierda haz clic en <strong>“Circuits”</strong> y luego en el botón <strong>“Create new Circuit”</strong>. Se abrirá un lienzo en blanco: aquí armarás tus proyectos, igual que en una protoboard real pero sin usar cables físicos.`,
  },
  {
    titulo: "Agrega el Arduino y tus componentes",
    texto: `A la derecha hay un buscador de componentes. Busca <strong>“Arduino Uno R3”</strong> y arrástralo al lienzo. Luego busca cualquier otro componente de tu kit (LED, resistencia, servo, HC-SR04…) y conéctalos con el mouse: Tinkercad dibuja los cables de colores por ti, tal como harías en la protoboard real.`,
  },
  {
    titulo: "Escribe el código y simula",
    texto: `Haz clic en el botón <strong>“Code”</strong> sobre el Arduino: se abre un editor donde puedes elegir entre bloques visuales o <strong>texto</strong> (el mismo C++ que usarás en el IDE real). Escribe o pega tu sketch y presiona <strong>“Start Simulation”</strong> (▶): verás tus LEDs encender y tus sensores reaccionar, sin haber gastado un solo componente real.`,
  },
];

export const VENTAJAS_TINKERCAD = [
  "<strong>Prueba antes de conectar:</strong> verifica que tu código funcione antes de arriesgar un componente real.",
  "<strong>Sin miedo a quemar nada:</strong> en el simulador, un error de conexión no daña nada.",
  "<strong>Aprende sin tener el kit a mano:</strong> puedes seguir practicando en el colegio o donde no tengas la placa.",
  "<strong>Comparte tus circuitos:</strong> cada proyecto tiene un enlace que puedes compartir o guardar para después.",
];
