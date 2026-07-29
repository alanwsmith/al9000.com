export function blockNamesInit(_, __, el) {
  b.trace("blockNamestInit");

  b.l(el);
  const mode = s.data.modes[s.data.activeMode];
  s.data.colorKeys.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const key = `${type}-${color}`;
      const subs = {
        __KEY__: key,
        __NAME__: `${color}: ${type}`,
      };
      el.appendChild(b.render("blockName", subs));
    });
  });

  //
}

// export function blockSelectSet(_, sender, ___) {
//   const mode = s.data.modes[s.data.activeMode];
//   mode.activeBlock = sender.value;
//   s.save();
//   b.trigger("blockUpdate");
// }
