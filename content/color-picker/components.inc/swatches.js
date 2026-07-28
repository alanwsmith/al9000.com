export function swatchesInit(_, __, el) {
  s.data.colorKeys.forEach((key) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __COLOR_TYPE__: type,
        __COLOR_KEY__: key,
      };
      el.appendChild(b.render("swatch", subs));
    });
  });
}
