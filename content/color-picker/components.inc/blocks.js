export function blocksInit(_, sender, el) {
  b.trace("blocksInit");
  const mode = s.data.modes[s.data.activeMode];
  s.data.colorKeys.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __COLOR_CLASS__: `${type}-${color}-color`,
        __BACKGROUND_CLASS__: `${mode.activeBlock}-background-color`,
      };
      el.appendChild(b.render("block", subs));
    });
  });
}
