export function monoSet(_, sender, ___) {
  const mode = s.data.modes[s.data.activeMode];
  mode.activeMonoKey = sender.key("key");
  s.save();
  b.trigger("monoUpdate monoSliderUpdate");
}

export function monoUpdate(_, __, el) {
  const mode = s.data.modes[s.data.activeMode];
  if (el.key("key") === mode.activeMonoKey) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}
