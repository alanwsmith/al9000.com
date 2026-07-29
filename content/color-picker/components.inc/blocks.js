export function blocksInit(_, __, el) {
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

  s.data.monoNames.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __COLOR_CLASS__: `${type}-${color}-color`,
        __BACKGROUND_CLASS__: `${mode.activeBlock}-background-color`,
      };
      el.appendChild(b.render("block", subs));
    });
  });

  b.trigger("blockNameUpdate");
}

// export function blockSelectInit(_, __, el) {
//   b.trace("blockSelectInit");
//   const mode = s.data.modes[s.data.activeMode];
//   s.data.colorKeys.forEach((color) => {
//     s.data.colorTypes.forEach((type) => {
//       const key = `${type}-${color}`;
//       const subs = {
//         __KEY__: key,
//         __NAME__: `${color}: ${type}`,
//       };
//       if (mode.activeBlock === key) {
//         subs.__SELECTED__ = " selected";
//       } else {
//         subs.__SELECTED__ = "";
//       }
//       el.appendChild(b.render("blockOption", subs));
//     });
//   });
// }

// export function blockSelectSet(_, sender, ___) {
//   const mode = s.data.modes[s.data.activeMode];
//   mode.activeBlock = sender.value;
//   s.save();
//   b.trigger("blockUpdate");
// }
