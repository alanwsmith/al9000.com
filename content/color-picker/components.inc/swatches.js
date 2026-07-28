export function swatchesUpdate(_, __, el) {
  el.replaceChildren();
  s.data.colorKeys.forEach((key) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __COLOR_TYPE__: type,
        __COLOR_KEY__: key,
        __COLOR_NAME__: key,
      };
      el.appendChild(b.render("swatch", subs));
    });
  });

  const mode = s.data.modes[s.data.activeMode];
  s.data.monoNames.forEach((key) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __COLOR_TYPE__: type,
        __COLOR_KEY__: key,
        __COLOR_NAME__: `${key}/${mode.monos[key].alt}`,
      };
      el.appendChild(b.render("swatch", subs));
    });
  });
}
