export function initColorSliders(_, __, el) {
  const mode = s.getActiveMode();
  const color = s.getActiveMode().colors[mode.activeColorIndex];
  const subs = {
    __L__: color.__L__,
    __C__: color.__C__,
    __FADED__: color.__FADED__,
    __FAINT__: color.__FAINT__,
  };
  el.appendChild(b.render("colorSliders", subs));
}