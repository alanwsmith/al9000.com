export async function hueSet(_, sender, ___) {
  b.trace("hueSet");
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  color.hueOffset = sender.propAsInt("index");
  await s.save();
  b.trigger("hueUpdate");
}

export function hueUpdate(_, __, el) {
  b.trace("hueUpdate");
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  if (el.propAsInt("index") === color.hueOffset) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}
