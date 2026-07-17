/* ============================================================
   Modal accesible reutilizable
   ------------------------------------------------------------
   Un solo backdrop inyectado una vez en <body>. API:
     openModal(html, { labelledBy }) / closeModal()
   Requisitos: focus-trap, Esc cierra, click en backdrop cierra,
   foco vuelve al elemento que abrió el modal, scroll bloqueado.
   ============================================================ */

let backdrop = null;
let modalEl = null;
let closeBtn = null;
let bodyEl = null;
let lastFocused = null;

function ensureModal() {
  if (backdrop) return;

  backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <button type="button" class="modal__close" aria-label="Cerrar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <div class="modal__body"></div>
    </div>
  `;
  document.body.appendChild(backdrop);

  modalEl = backdrop.querySelector(".modal");
  closeBtn = backdrop.querySelector(".modal__close");
  bodyEl = backdrop.querySelector(".modal__body");

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
      closeModal();
    }
    if (e.key === "Tab" && backdrop.classList.contains("is-open")) {
      trapFocus(e);
    }
  });
}

function trapFocus(e) {
  const focusable = modalEl.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

/**
 * Abre el modal con el contenido HTML dado.
 * @param {string} html
 * @param {object} [opts]
 * @param {string} [opts.labelledBy] - id de un elemento dentro del html para aria-labelledby
 */
export function openModal(html, { labelledBy } = {}) {
  ensureModal();
  lastFocused = document.activeElement;

  bodyEl.innerHTML = html;
  if (labelledBy) {
    modalEl.setAttribute("aria-labelledby", labelledBy);
  } else {
    modalEl.removeAttribute("aria-labelledby");
  }

  backdrop.classList.add("is-open");
  document.body.classList.add("modal-open");

  // Mover el foco dentro del modal (el botón cerrar es un ancla estable).
  closeBtn.focus();
}

export function closeModal() {
  if (!backdrop || !backdrop.classList.contains("is-open")) return;

  backdrop.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  bodyEl.innerHTML = "";

  if (lastFocused && typeof lastFocused.focus === "function") {
    // preventScroll: al cerrar navegando a otra sección, devolver el foco no debe
    // arrastrar la página de vuelta a la tarjeta que abrió el modal.
    lastFocused.focus({ preventScroll: true });
  }
  lastFocused = null;
}
