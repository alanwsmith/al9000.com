export function initModeButtons(_, __, el) {
  for (let mode of s.data.modes) {
    if (mode.__KEY__ === s.data.activeMode) {
      mode.__CHECKED__ = "checked";
    } else {
      mode.__CHECKED__ = "";
    }
    el.appendChild(
      b.render("modeButton", mode),
    );
  }
  setSwitches(s.data.activeMode);
}
