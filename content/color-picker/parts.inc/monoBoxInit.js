export function monoBoxInit(_, __, el) {
  b.trace("monoBoxInit");
  const mode = s.getActiveMode();
  const colors = s.data.monoNames.map((color) => {
    const classes = ["mono-button"];
    if (mode.activeMonoKey === color) {
      classes.push("active");
    }
    const subs = {
      __COLOR__: color,
      __KEY__: color,
      __CLASSES__: classes.join(" "),
    };
    return b.render("monoColor", subs);
  });

  const sliders = s.data.monoSliders.map((slider) => {
    const value = mode.monos[mode.activeMonoKey][slider.token];
    const subs = {
      __NAME__: slider.name,
      __KEY__: slider.key,
      __MIN__: s.data.config.__L__.__MIN__,
      __MAX__: s.data.config.__L__.__MAX__,
      __STEP__: s.data.config.__L__.__STEP__,
      __VALUE__: value,
    };
    return b.render("monoSlider", subs);
  });

  const subs = {
    __COLORS__: colors,
    __SLIDERS__: sliders,
  };

  el.replaceChildren(
    b.render("monoBox", subs),
  );
}
