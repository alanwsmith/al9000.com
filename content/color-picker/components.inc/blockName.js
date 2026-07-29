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

  const newColor = sender.key("color");
  if (s.data.colorKeys.includes(newColor)) {
    mode.activeColor = newColor;
    b.l(newColor);
    b.trigger(
      "colorUpdate hueUpdate colorSliderUpdate",
    );
  }

  if (s.data.monoNames.includes(newColor)) {
    mode.activeMonoKey = newColor;
    b.l(newColor);
    b.trigger(
      "monoUpdate",
    );
  }
  s.save();
  b.trigger("blockNameUpdate blockUpdate");
}
