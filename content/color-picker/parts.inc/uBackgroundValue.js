export function updateBackgroundValue(_, __, el) {
  b.trace("updateBackgroundValue");
  const mode = s.getActiveMode();
  el.value = mode.background[`${el.prop("key")}`];
}

