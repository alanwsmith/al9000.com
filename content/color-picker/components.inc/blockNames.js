export function blockNamesInit(_, __, el) {
  b.trace("blockNamestInit");

  const mode = s.data.modes[s.data.activeMode];
  s.data.colorKeys.forEach((color) => {
    //    s.data.colorTypes.forEach((type) => {
    //     const key = `${type}-${color}`;
    const subs = {
      __KEY__: color,

      //      __KEY__: key,
      // __COLOR__: color,
      //__NAME__: `${color}: ${type}`,
      __NAME__: `${color}`,
    };
    el.appendChild(b.render("blockName", subs));
    // });
  });

  s.data.monoNames.forEach((color) => {
    //s.data.colorTypes.forEach((type) => {
    // const key = `${type}-${color}`;
    const subs = {
      __KEY__: color,
      //  __KEY__: key,
      // __COLOR__: color,
      //__NAME__: `${color}: ${type}`,
    };
    el.appendChild(b.render("blockName", subs));
    // });
  });
}
