export function initColorNameButtons(_, __, el) {
  s.data.colorNames.forEach((name, index) => {
    const subs = {
      __INDEX__: index,
      __COLOR__: name,
      __COLOR_LETTER__: name.charAt(0),
    };
    el.appendChild(b.render("colorNameButton", subs));
  });
  //b.trigger("uColorName");
}
