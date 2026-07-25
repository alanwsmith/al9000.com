export function gCustomStyles(_, __, el) {
  const mode = s.getActiveMode();
  mode.customStyles = el.value;
  b.info(mode);
  b.trigger("updateCSS");
}
