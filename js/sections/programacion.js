import { GRUPOS_PROGRAMACION } from "../data/programacion.js";
import { codeBlock } from "../components/code-block.js";

function conceptoCard(c) {
  return `
    <div class="prog-concept card">
      <div class="prog-concept__head">
        <span class="prog-concept__sym">${c.sintaxis}</span>
        <h4>${c.nombre}</h4>
      </div>
      <p class="prog-concept__que-es">${c.quEs}</p>
      ${codeBlock(c.codigo, { title: `${c.nombre.toLowerCase()}.ino` })}
      <p class="prog-concept__explicacion">${c.explicacion}</p>
    </div>
  `;
}

function grupoBlock(g) {
  return `
    <div class="prog-group reveal">
      <h3>${g.titulo}</h3>
      <p class="prog-group__intro">${g.intro}</p>
      <div class="grid grid--2">
        ${g.conceptos.map(conceptoCard).join("")}
      </div>
    </div>
  `;
}

export function renderProgramacion(mount) {
  mount.innerHTML = `
    <div class="reveal">
      <p>
        Programar es simplemente <strong>dar instrucciones ordenadas</strong>. No necesitas
        memorizar nada de esto: la idea es que entiendas qué hace cada pieza para reconocerla
        cuando la veas en un sketch. Están agrupadas por tema para que las relaciones se entiendan
        mejor.
      </p>
    </div>

    ${GRUPOS_PROGRAMACION.map(grupoBlock).join("")}
  `;
}
