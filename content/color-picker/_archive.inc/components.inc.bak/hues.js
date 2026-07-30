export function huesInit(_, __, el) {
  b.trace("huesInit");
  for (let index = 0; index < s.hueCount(); index += 1) {
    const subs = {
      __INDEX__: index,
    };
    el.appendChild(b.render("hue", subs));
  }
  b.trigger("hueUpdate");
}
