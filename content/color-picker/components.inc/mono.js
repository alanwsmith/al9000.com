export function monoSet(_, sender, ___) {
  const mode = s.data.modes[s.data.activeMode];
  mode.activeMonoKey = sender.prop("key");
  s.save();
  b.trigger("monoUpdate");
}

export function monoUpdate(_, __, el) {
  const mode = s.data.modes[s.data.activeMode];
  if (el.prop("key") === mode.activeMonoKey) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}
