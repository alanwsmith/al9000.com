export function blockSelectInit(_, __, el) {
  b.trace("blockSelectInit");
  s.data.colorKeys.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __KEY__: `${type}-${color}`,
        __NAME__: `${color}: ${type}`,
      };
      el.appendChild(b.render("blockOption", subs));
    });
  });
  // el.replaceChildren(b.render("blockOption"));
  //b.trigger("blockOptionsInit");
}

export function blockSelectSet(_, sender, ___) {
  const mode = s.getActiveMode();
  s.save();
}
