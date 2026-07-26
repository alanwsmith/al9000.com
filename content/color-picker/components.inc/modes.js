export function modesInit(_, __, el) {
  b.trace("modesInit");
  const modes = Object.keys(s.data.modes).map((key) => {
    let checked = "";
    if (key === s.data.activeMode) {
      checked = " checked";
    }
    const subs = {
      __KEY__: key,
      __CHECKED__: checked,
    };
    return b.render("mode", subs);
  });
  const subs = {
    __MODES__: modes,
  };
  el.replaceChildren(b.render("modes", subs));
}

export async function modesSet(_, sender, ___) {
  b.trace("modeSet");
  s.data.activeMode = sender.prop("key");
  await s.save();
}
