/* Aplicaciones reales de Arduino — Sección 1 (¿Qué es Arduino?) */

export const APLICACIONES = [
  {
    id: "robotica",
    nombre: "Robótica",
    icono: "robot",
    texto: "Brazos, autos que esquivan obstáculos y robots seguidores de línea.",
    ejemplo: "un auto robot que usa un sensor ultrasónico para no chocar contra las paredes.",
  },
  {
    id: "domotica",
    nombre: "Domótica (casa inteligente)",
    icono: "casa",
    texto: "Automatizar luces, cortinas, riego y seguridad del hogar.",
    ejemplo: "que las luces se enciendan solas al detectar movimiento en el pasillo.",
  },
  {
    id: "automatizacion",
    nombre: "Automatización",
    icono: "engranaje",
    texto: "Repetir tareas sin intervención humana, con precisión y sin cansancio.",
    ejemplo: "una máquina que llena y tapa botellas siempre a la misma velocidad.",
  },
  {
    id: "iot",
    nombre: "Internet de las Cosas (IoT)",
    icono: "nube-wifi",
    texto: "Objetos cotidianos conectados que envían datos a internet.",
    ejemplo: "un macetero que te avisa al celular cuando la planta necesita agua.",
  },
  {
    id: "agricultura",
    nombre: "Agricultura",
    icono: "planta",
    texto: "Medir humedad del suelo, temperatura y activar el riego automáticamente.",
    ejemplo: "un invernadero que riega solo cuando la tierra está seca (¡lo harás con tu kit!).",
  },
  {
    id: "arte",
    nombre: "Arte y música interactivos",
    icono: "onda-sonido",
    texto: "Instalaciones que reaccionan al público con luz y sonido.",
    ejemplo: "una escultura cuyas luces cambian según cuánta gente se le acerca.",
  },
];

/* Íconos de línea estilo Feather (24x24, stroke=currentColor) */
export const ICONOS = {
  robot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="2"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/><circle cx="9.5" cy="14" r="1"/><circle cx="14.5" cy="14" r="1"/><path d="M9 19v2M15 19v2M3 13h2M19 13h2"/></svg>`,
  casa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>`,
  engranaje: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.96 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.96a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.03A1.7 1.7 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.03c.14.6.62 1.06 1.56 1.35H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1.35Z"/></svg>`,
  "nube-wifi": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z"/><path d="M9 17a3 3 0 0 1 5-2M11 15a1 1 0 0 1 2 1"/></svg>`,
  planta: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22V12"/><path d="M12 12C12 7 9 4 4 4c0 5 3 8 8 8Z"/><path d="M12 12c0-4 3-6 8-6 0 4-3 6-8 6Z"/></svg>`,
  "onda-sonido": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12h2M6 8v8M10 5v14M14 8v8M18 5v14M22 12h-2"/></svg>`,
};
