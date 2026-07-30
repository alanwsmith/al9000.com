export function monoSliderSet(_, sender, ___) {
  const mode = s.data.modes[s.data.activeMode];
  mode.monos[mode.activeMonoKey][sender.key("key")] = sender.valueAsFloat();
  s.save();
  b.trigger("updateCSS");
}

export function monoSliderUpdate(_, __, el) {
  const mode = s.data.modes[s.data.activeMode];
  el.value = mode.monos[mode.activeMonoKey][el.key("key")];
}
