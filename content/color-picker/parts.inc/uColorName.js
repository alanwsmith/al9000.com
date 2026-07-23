export function uColorName(_, __, el) {
  b.trace("uColorName");
  const mode = s.getActiveMode();
  s.data.colorNames.forEach((name) => {
    if (s.data.colorNames[mode.activeColorIndex] === name) {
      el.innerHTML = name;
      el.classList.add(`default-${name}-background-color`);
    } else {
      el.classList.remove(`default-${name}-background-color`);
    }
  });
}