export function blockOptionsInit(_, __, el) {
  b.info("blockOptionsInit");
  const mode = s.getActiveMode();
  b.info(mode.blocks);
  const options = Object.keys(mode.blocks).map((key) => {
    const optionSubs = {
      __KEY__: key,
    };
    return b.render("blockOption", optionSubs);
  });

  const subs = {
    __OPTIONS__: options,
  };
  el.replaceChildren(b.render("blockOptions", subs));
}

// export function blockOptionsSet(_, sender, ___) {
//   const mode = s.getActiveMode();
//   b.info(mode.blocks);
// }

// export function blockOptionsUpdate(_, __, el) {
//   el.replaceChildren();
//   const mode = s.getActiveMode();
//   s.data.colorTypes.map((colorType) => {
//     return s.data.colorNames.map((colorName) => {
//       const key = `${colorType}-${colorName}`;
//       let selected = "";
//       if (mode.activeBlock === key) {
//         selected = " selected";
//       }
//       const subs = {
//         __KEY__: `${colorType}-${colorName}`,
//         __SELECTED__: selected,
//       };
//       el.appendChild(b.render("blockBuilderOption", subs));
//     });
//   });
// }
