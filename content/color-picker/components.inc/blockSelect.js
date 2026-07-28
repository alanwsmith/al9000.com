export function blockSelectInit(_, __, el) {
  b.trace("blockSelectInit");
  s.data.colorKeys.forEach((key) => {
    const subs = {};
    el.appendChild(b.render("blockOption", subs));
  });

  // el.replaceChildren(b.render("blockOption"));
  //b.trigger("blockOptionsInit");
}

export function blockSelectSet(_, sender, ___) {
  const mode = s.getActiveMode();
  mode.activeBlock = sender.value;
  s.save();
}
