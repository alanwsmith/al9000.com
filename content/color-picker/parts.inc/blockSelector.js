export function blockSelectorSet(_, sender, ___) {
}

export function blockSelectorUpdate(_, __, el) {
  el.replaceChildren();
  const mode = s.getActiveMode();
  s.data.colorTypes.map((colorType) => {
    return s.data.colorNames.map((colorName) => {
      const key = `${colorType}-${colorName}`;
      let selected = "";
      if (mode.activeBlock === key) {
        b.info(key);
        selected = " selected";
      }
      const subs = {
        __KEY__: `${colorType}-${colorName}`,
        __SELECTED__: selected,
      };
      el.appendChild(b.render("blockBuilderOption", subs));
    });
  });
}
