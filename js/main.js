/* ============================================================
   Kit Arduino · Manual interactivo
   main.js — punto de entrada
   ------------------------------------------------------------
   Módulos de interfaz global: tema, navegación, scroll spy,
   animaciones de entrada y botón "volver arriba".
   Las secciones de contenido se montan desde js/sections/.
   ============================================================ */

import { renderQueEs } from "./sections/que-es.js";
import { renderElectronica } from "./sections/electronica.js";
import { renderProtoboard } from "./sections/protoboard.js";
import { renderPrimerPrograma } from "./sections/primer-programa.js";
import { renderBlink } from "./sections/blink.js";
import { renderTinkercad } from "./sections/tinkercad.js";
import { renderComponentes } from "./sections/componentes.js";
import { renderProyectos } from "./sections/proyectos.js";
import { renderProgramacion } from "./sections/programacion.js";
import { renderErrores } from "./sections/errores.js";
import { renderBuenasPracticas } from "./sections/buenas-practicas.js";
import { renderRecursos } from "./sections/recursos.js";
import { initCodeBlockCopy } from "./components/code-block.js";

/* ---------- Tema claro / oscuro ---------- */
const THEME_KEY = "kitarduino-theme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved ?? (prefersDark ? "dark" : "light"));

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

/* ---------- Menú móvil ---------- */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  // Cerrar al elegir una sección
  nav.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------- Scroll spy: resalta la sección visible en el nav ---------- */
function initScrollSpy() {
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  const sections = links
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean);

  const byId = new Map(links.map((link) => [link.hash.slice(1), link]));

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((l) => l.classList.remove("active"));
        byId.get(entry.target.id)?.classList.add("active");
      }
    },
    // Franja central de la pantalla: la sección que la cruza es la activa
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---------- Animaciones de entrada (.reveal) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

function initReveal() {
  observeReveals(document);
}

/* Vuelve a observar los .reveal de un contenedor recién inyectado en el DOM
   (las secciones se montan después de que initReveal ya corrió una vez). */
export function observeReveals(root) {
  root.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

/* ---------- Botón volver arriba ---------- */
function initToTop() {
  const btn = document.getElementById("to-top");

  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("show", window.scrollY > 600),
    { passive: true }
  );

  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

/* ---------- Secciones de contenido ---------- */
function initSections() {
  const mounts = [
    ["que-es-body", renderQueEs],
    ["electronica-body", renderElectronica],
    ["protoboard-body", renderProtoboard],
    ["primer-programa-body", renderPrimerPrograma],
    ["blink-body", renderBlink],
    ["tinkercad-body", renderTinkercad],
    ["componentes-body", renderComponentes],
    ["proyectos-body", renderProyectos],
    ["programacion-body", renderProgramacion],
    ["errores-body", renderErrores],
    ["buenas-practicas-body", renderBuenasPracticas],
    ["recursos-body", renderRecursos],
  ];

  for (const [id, render] of mounts) {
    const mount = document.getElementById(id);
    if (!mount) continue;
    render(mount);
    observeReveals(mount);
  }
}

/* ---------- Arranque ---------- */
initTheme();
initMobileNav();
initScrollSpy();
initReveal();
initToTop();
initSections();
initCodeBlockCopy();
