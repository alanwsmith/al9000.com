export function blockNameUpdate(_, __, el) {
  const mode = s.data.modes[s.data.activeMode];
  if (el.key("key") === mode.activeBlock) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}

export function blockNameSet(_, sender, ___) {
  const mode = s.data.modes[s.data.activeMode];
  mode.activeBlock = sender.key("key");
  s.save();
  b.trigger("blockNameUpdate blockUpdate");
}
