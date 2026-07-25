export function uColorName(_, __, el) {
  b.trace("uColorName");
  const mode = s.getActiveMode();
  s.data.colorNames.forEach((name) => {
    if (s.data.colorNames[mode.activeColorIndex] === name) {
      el.innerHTML = `${name} color`;
      el.classList.add(`default-${name}-color`);
      // b.setCSS("--color-name-padding", mode.activeColorIndex);
    } else {
      el.classList.remove(`default-${name}-color`);
    }
  });
}
