export function modesInit(_, __, el) {
  b.info(s.data.modes);
  // const modes = Object.keys(s.data.modes).map((mode) => {
  //   b.info(mode);
  // });
}

export async function modesSet(_, sender, ___) {
  b.trace("modeSet");
  s.data.activeMode = sender.prop("key");
  await s.save();
}
