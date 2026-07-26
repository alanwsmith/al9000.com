export function blockBuilderInit(_, __, el) {
  const textOptions = [
    b.render("blockBuilderOption", { __KEY__: "none" }),
    ...s.data.colorTypes.map((colorType) => {
      return s.data.colorNames.map((colorName) => {
        const subs = {
          __KEY__: `${colorType}-${colorName}`,
        };
        return b.render("blockBuilderOption", subs);
      });
    }).flat(),
  ];
  const subs = {
    __BLOCK_BUILDER_OPTIONS__: textOptions,
  };
  el.replaceChildren(b.render("blockBuilder", subs));
}
