import { BUENAS_PRACTICAS } from "../data/buenas-practicas.js";
import { codeBlock } from "../components/code-block.js";

function practiceCard(p) {
  const tieneComparador = p.antes || p.despues;

  return `
    <div class="practice-card card reveal">
      <h3>${p.titulo}</h3>
      <p>${p.texto}</p>
      ${
        tieneComparador
          ? `
        <div class="code-compare">
          ${
            p.antes
              ? `<div class="code-compare__col">
                  <span class="code-compare__label code-compare__label--bad">❌ Antes</span>
                  ${codeBlock(p.antes, { title: "antes.ino" })}
                </div>`
              : ""
          }
          ${
            p.despues
              ? `<div class="code-compare__col">
                  <span class="code-compare__label code-compare__label--good">✅ Después</span>
                  ${codeBlock(p.despues, { title: "despues.ino" })}
                </div>`
              : p.notaDespues
                ? `<div class="code-compare__col">
                    <span class="code-compare__label code-compare__label--good">✅ Después</span>
                    <p class="text-soft">${p.notaDespues}</p>
                  </div>`
                : ""
          }
        </div>`
          : ""
      }
    </div>
  `;
}

export function renderBuenasPracticas(mount) {
  mount.innerHTML = `
    <div class="reveal">
      <p>
        Tu código no solo tiene que <strong>funcionar</strong>: tiene que <strong>entenderse</strong>,
        por ti mismo dentro de un mes o por quien te ayude. Estas prácticas te ahorrarán horas de
        frustración.
      </p>
    </div>

    <div class="grid grid--2">
      ${BUENAS_PRACTICAS.map(practiceCard).join("")}
    </div>
  `;
}
