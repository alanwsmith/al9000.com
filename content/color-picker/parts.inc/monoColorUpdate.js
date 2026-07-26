export function monoColorUpdate(_, __, el) {
  const mode = s.getActiveMode();
  if (el.prop("key") === mode.activeMonoKey) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}
