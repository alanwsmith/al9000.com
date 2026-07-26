export function blockBuilderInit(_, __, el) {
  const mode = s.getActiveMode();

  const examples = [];

  const textOptions = s.data.colorTypes.map((colorType) => {
    return s.data.colorNames.map((colorName) => {
      const backgroundKey = `${colorType}-${colorName}`;
      let selected = "";
      if (mode.activeBlock === backgroundKey) {
        selected = " selected";

        s.data.colorTypes.forEach((colorTextType) => {
          return s.data.colorNames.map((colorTextName) => {
            const colorKey = `${colorTextType}-${colorTextName}`;
            const textSubs = {
              __BACKGROUND_KEY__: backgroundKey,
              __COLOR_KEY__: colorKey,
            };
            examples.push(b.render("blockExample", textSubs));
          });
        });
      }

      const subs = {
        __KEY__: backgroundKey,
        __SELECTED__: selected,
      };

      return b.render("blockBuilderOption", subs);
    });
  }).flat();

  const subs = {
    __BLOCK_BUILDER_OPTIONS__: textOptions,
    __BLOCK_EXAMPLES__: examples,
  };

  el.replaceChildren(b.render("blockBuilder", subs));
}
