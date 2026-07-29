export function monoColorUpdate(_, __, el) {
  const mode = s.getActiveMode();
  if (el.key("key") === mode.activeMonoKey) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}
