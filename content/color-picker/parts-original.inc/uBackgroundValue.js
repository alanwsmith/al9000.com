export function uBackgroundValue(_, __, el) {
  b.trace("uBackgroundValue");
  const mode = s.getActiveMode();
  el.value = mode.background[`${el.key("key")}`];
}
