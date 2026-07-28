export function blockSelectInit(_, __, el) {
  b.trace("blockSelectInit");
  const mode = s.data.modes[s.data.activeMode];
  s.data.colorKeys.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const key = `${type}-${color}`;
      const subs = {
        __KEY__: key,
        __NAME__: `${color}: ${type}`,
      };
      if (mode.activeBlock === key) {
        subs.__SELECTED__ = " selected";
      } else {
        subs.__SELECTED__ = "";
      }
      el.appendChild(b.render("blockOption", subs));
    });
  });
}

export function blockSelectSet(_, sender, ___) {
  const mode = s.data.modes[s.data.activeMode];
  mode.activeBlock = sender.value;
  s.save();
  b.trigger("blockUpdate");
}
