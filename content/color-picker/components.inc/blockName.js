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

  if (s.data.colorKeys.includes(mode.activeBlock)) {
    mode.activeColor = sender.key("key");
    b.trigger(
      "colorUpdate hueUpdate colorSliderUpdate",
    );
  }

  if (s.data.monoNames.includes(mode.activeBlock)) {
    mode.activeMonoKey = sender.key("key");
    b.trigger(
      "monoUpdate",
    );
  }
  s.save();
  b.trigger("blockNameUpdate blockUpdate");
}
