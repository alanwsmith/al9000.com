export function blocksInit(_, __, el) {
  b.trace("blocksInit");
  s.data.colorKeys.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __KEY__: `${type}-${color}`,
        __NAME__: `${color}: ${type}`,
      };
      el.appendChild(b.render("block", subs));
    });
  });
}
