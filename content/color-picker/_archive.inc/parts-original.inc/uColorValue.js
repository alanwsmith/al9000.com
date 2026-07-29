export function uColorValue(_, __, el) {
  b.trace("uColorValue");
  if (el) {
    const mode = s.getActiveMode();
    const v = mode.colors[mode.activeColorIndex][`__${el.key("key")}__`];
    el.value = mode.colors[mode.activeColorIndex][`__${el.key("key")}__`];
  }
}
