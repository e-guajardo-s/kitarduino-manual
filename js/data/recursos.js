/* ============================================================
   Recursos para seguir aprendiendo — URLs reales y verificadas.
   Canales de YouTube y "cómo buscar datasheets" usan búsquedas,
   nunca IDs o PDFs inventados.
   ============================================================ */

function ytSearch(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export const GRUPOS_RECURSOS = [
  {
    id: "oficial",
    titulo: "Documentación oficial de Arduino",
    recursos: [
      {
        titulo: "Arduino (sitio oficial)",
        descripcion: "La página madre: software, guías y tienda.",
        url: "https://www.arduino.cc",
        tipo: "web",
      },
      {
        titulo: "Arduino Docs",
        descripcion: "Documentación oficial de placas y librerías.",
        url: "https://docs.arduino.cc",
        tipo: "web",
      },
      {
        titulo: "Referencia del lenguaje",
        descripcion: "Todas las funciones (digitalWrite, millis, etc.) explicadas con ejemplos.",
        url: "https://www.arduino.cc/reference/es/",
        tipo: "web",
      },
      {
        titulo: "Project Hub",
        descripcion: "Miles de proyectos de la comunidad con código y esquemas.",
        url: "https://projecthub.arduino.cc",
        tipo: "web",
      },
    ],
  },
  {
    id: "espanol",
    titulo: "Aprender en español",
    recursos: [
      {
        titulo: "Luis Llamas",
        descripcion: "Tutoriales en español, claros y muy completos, de casi cualquier componente.",
        url: "https://www.luisllamas.es",
        tipo: "web",
      },
      {
        titulo: "Programarfacil",
        descripcion: "Cursos y artículos de Arduino en español.",
        url: "https://programarfacil.com",
        tipo: "web",
      },
      {
        titulo: "Aprendiendo Arduino",
        descripcion: "Material de curso ordenado por temas.",
        url: "https://aprendiendoarduino.wordpress.com",
        tipo: "web",
      },
    ],
  },
  {
    id: "practicar",
    titulo: "Practicar y simular",
    recursos: [
      {
        titulo: "Tinkercad Circuits",
        descripcion:
          "Simulador online gratis: arma circuitos Arduino y prueba tu código sin tener la placa a mano. Ideal para experimentar sin miedo.",
        url: "https://www.tinkercad.com/circuits",
        tipo: "web",
      },
      {
        titulo: "Wokwi",
        descripcion: "Otro simulador de Arduino en el navegador, con muchos componentes.",
        url: "https://wokwi.com",
        tipo: "web",
      },
    ],
  },
  {
    id: "youtube",
    titulo: "Canales de YouTube",
    recursos: [
      {
        titulo: "Programar Fácil (Arduino en español)",
        descripcion: "Tutoriales en español, mismo autor del sitio Programarfacil.",
        url: ytSearch("programarfacil arduino"),
        tipo: "video",
      },
      {
        titulo: "Bitwise Ar (español)",
        descripcion: "Proyectos y explicaciones de Arduino en español.",
        url: ytSearch("bitwise ar arduino"),
        tipo: "video",
      },
      {
        titulo: "Paul McWhorter (inglés)",
        descripcion: "Curso paso a paso muy recomendado, ideal si te animas con subtítulos en inglés.",
        url: ytSearch("paul mcwhorter arduino tutorial"),
        tipo: "video",
      },
      {
        titulo: "DroneBot Workshop (inglés)",
        descripcion: "Proyectos y sensores explicados en profundidad.",
        url: ytSearch("dronebot workshop arduino"),
        tipo: "video",
      },
    ],
  },
  {
    id: "datasheets",
    titulo: "Datasheets y hojas de datos",
    recursos: [
      {
        titulo: "ATmega328P (el chip del UNO)",
        descripcion: "Página oficial de Microchip con la hoja de datos.",
        url: "https://www.microchip.com/en-us/product/atmega328p",
        tipo: "web",
      },
      {
        titulo: "Cómo buscar datasheets",
        descripcion:
          "Para cualquier sensor, busca en Google 'nombre del componente + datasheet pdf' (por ejemplo, 'HC-SR04 datasheet pdf'). La hoja de datos trae voltajes, pinout exacto y límites del componente.",
        url: null,
        tipo: "info",
      },
    ],
  },
  {
    id: "libros",
    titulo: "Libros recomendados",
    recursos: [
      {
        titulo: "“Getting Started with Arduino”",
        descripcion: "Massimo Banzi (cofundador de Arduino). El punto de partida oficial, corto y claro.",
        url: null,
        tipo: "libro",
      },
      {
        titulo: "“Programming Arduino: Getting Started with Sketches”",
        descripcion: "Simon Monk. Enfocado en aprender a programar la placa desde cero.",
        url: null,
        tipo: "libro",
      },
      {
        titulo: "“Arduino. Curso práctico de formación”",
        descripcion: "Óscar Torrente Artero (Marcombo). Un clásico completo en español.",
        url: null,
        tipo: "libro",
      },
    ],
  },
];
