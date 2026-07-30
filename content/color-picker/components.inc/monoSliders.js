export function monoSlidersInit(_, __, el) {
  ["faded"].forEach((key) => {
    const subs = JSON.parse(JSON.stringify(s.data.config[key]));
    subs.__KEY__ = key;
    el.appendChild(b.render("monoSlider", subs));
  });
  b.trigger("monoSliderUpdate");
}
