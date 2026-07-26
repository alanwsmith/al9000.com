export function blockSelectInit(_, __, el) {
  b.trace("blockSelectInit");
  el.replaceChildren(b.render("blockSelect"));
  b.trigger("blockOptionsInit");
}
