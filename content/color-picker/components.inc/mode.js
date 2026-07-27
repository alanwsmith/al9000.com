export async function modeSet(_, sender, ___) {
  b.trace("modeSet");
  s.data.activeMode = sender.prop("key");
  await s.save();
  b.trigger("backgroundSliderUpdate colorUpdate hueUpdate");
}
