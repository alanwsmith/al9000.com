export function colorsInit(_, __, el) {
  s.data.colorKeys.forEach((key) => {
    const subs = {
      __KEY__: key,
    };
    el.appendChild(b.render("color", subs));
  });
  b.trigger("colorUpdate");
}
