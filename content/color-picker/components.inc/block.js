export function blockUpdate(_, __, el) {
  b.trace(el);

  const mode = s.data.modes[s.data.activeMode];
  s.data.colorKeys.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const key = `${type}-${color}`;
      const backgroundColor = `${key}-background-color`;
      if (mode.activeBlock === key) {
        el.classList.add(backgroundColor);
      } else {
        el.classList.remove(backgroundColor);
      }
    });
  });
}
