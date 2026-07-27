export function sCustomStyles(_, __, el) {
  b.trace("sCustomStyles");
  s.data.customStyles = el.value;
  b.trigger("updateCSS");
}
