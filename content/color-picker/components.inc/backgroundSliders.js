export function backgroundSlidersInit(_, __, el) {
  b.trace("backgroundSlidersInit");
  const sliders = Object.entries(s.data.config).map(([key, subs]) => {
    subs.__KEY__ = key;
    return b.render("backgroundSlider", subs);
  });
  const subs = {
    __SLIDERS__: sliders,
  };
  el.replaceChildren(b.render("backgroundSliders", subs));
  b.trigger("backgroundSliderUpdate");
}
