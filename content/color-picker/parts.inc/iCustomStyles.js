export function iCustomStyles(_, __, el) {
  const mode = s.getActiveMode();
  el.innerHTML = mode.customStyles;
}
