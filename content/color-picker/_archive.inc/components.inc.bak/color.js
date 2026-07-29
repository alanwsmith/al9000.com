export async function colorSet(_, sender, ___) {
  b.trace("colorSet");
  s.data.modes[s.data.activeMode].activeColor = sender.key("key");
  await s.save();
  b.trigger("colorUpdate hueUpdate colorSliderUpdate updateCSS updateJSON");
}

export function colorUpdate(_, __, el) {
  b.trace("colorUpdate");
  if (
    el.key("key") ===
      s.data.modes[s.data.activeMode].activeColor
  ) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}
