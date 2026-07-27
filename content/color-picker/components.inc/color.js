export async function colorSet(_, sender, ___) {
  b.trace("colorSet");
  s.data.modes[s.data.activeMode].activeColor = sender.prop("key");
  await s.save();
  b.trigger("colorUpdate hueUpdate colorSliderUpdate updateCSS updateJSON");
}

export function colorUpdate(_, __, el) {
  b.trace("colorUpdate");
  if (
    el.prop("key") ===
      s.data.modes[s.data.activeMode].activeColor
  ) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}
