export function initHueOffsetButtons(_, __, el) {
  for (let index = 0; index < (360 / s.data.hueRotation); index += 1) {
    const subs = {
      __INDEX__: index,
    };
    el.appendChild(b.render("hueOffsetButton", subs));
  }
  b.trigger("updateHueOffset");
}