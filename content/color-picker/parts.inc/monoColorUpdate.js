export function monoColorUpdate(_, __, el) {
  const mode = s.getActiveMode();
  if (el.propAsInt("index") === mode.activeMonoIndex) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}
