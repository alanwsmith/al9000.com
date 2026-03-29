export const b = {};

export function characters(_, __, el) {
  for (let c = 33; c <= 126686; c++) {
    const unicodeCode = `#x${c.toString(16)};`;
    const charEl = b.ce("span");
    charEl.classList.add("unicodeChar");
    charEl.innerHTML = `&${unicodeCode} `;
    el.appendChild(charEl);
  }
}
