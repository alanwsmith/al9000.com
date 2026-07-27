export function backgroundSlidersInit(_, __, el) {
  b.trace("backgroundSlidersInit");
  Object.entries(s.data.config).forEach(([key, subs]) => {
    subs.__KEY__ = key;
    el.appendChild(b.render("backgroundSlider", subs));
  });
  b.trigger("backgroundSliderUpdate");
}
