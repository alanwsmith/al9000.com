export function colorSliderSet(_, sender, ___) {
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  color.values[sender.prop("key")] = sender.valueAsFloat();
  s.save();
  b.trigger("updateCSS");
}

export function colorSliderUpdate(_, __, el) {
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  el.value = color.values[el.prop("key")];
}
