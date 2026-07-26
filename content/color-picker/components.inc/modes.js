export function modesInit(_, __, el) {
}

export async function modesSet(_, sender, ___) {
  b.trace("modeSet");
  s.data.activeMode = sender.prop("key");
  await s.save();
}
