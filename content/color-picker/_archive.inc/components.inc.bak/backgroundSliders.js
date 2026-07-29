export function backgroundSlidersInit(_, __, el) {
  b.trace("backgroundSlidersInit");
  Object.entries(s.data.config).forEach(([key, subs]) => {
    if (key !== "faded" && key !== "faint") {
      subs.__KEY__ = key;
      el.appendChild(b.render("backgroundSlider", subs));
    }
  });
  b.trigger("backgroundSliderUpdate");
}
