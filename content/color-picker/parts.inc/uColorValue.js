
export function updateColorValue(_, __, el) {
  b.trace("updateColorValue");
  const mode = s.getActiveMode();
  const v = mode.colors[mode.activeColorIndex][`__${el.prop("key")}__`];
  el.value = mode.colors[mode.activeColorIndex][`__${el.prop("key")}__`];
}
