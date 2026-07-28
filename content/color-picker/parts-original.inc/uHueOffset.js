export function uHueOffset(_, __, el) {
  b.trace("uHueOffset");
  const mode = s.getActiveMode();
  if (el) {
    if (
      el.keyAsInt("index") ===
        mode.colors[mode.activeColorIndex][`__H_OFFSET__`]
    ) {
      el.classList.add("set-active");
    } else {
      el.classList.remove("set-active");
    }
  }
}
