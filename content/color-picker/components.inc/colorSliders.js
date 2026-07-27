export function colorSlidersInit(_, __, el) {
  b.trace("colorSliderInit");
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  Object.keys(color.values).forEach((key) => {
    const subs = JSON.parse(JSON.stringify(
      s.data.config[key],
    ));
    subs.__KEY__ = key;
    el.appendChild(b.render("colorSlider", subs));
  });
  b.trigger("colorSliderUpdate");
}
