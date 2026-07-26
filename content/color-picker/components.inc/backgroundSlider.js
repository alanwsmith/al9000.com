export function backgroundSliderUpdate(_, __, el) {
  el.value = b.tee(s.data.modes[s.data.activeMode].background[el.prop("key")]);
}
