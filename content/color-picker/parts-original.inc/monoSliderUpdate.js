export async function monoSliderUpdate(_, __, el) {
  b.trace("monoSliderUpdate");
  const mode = s.getActiveMode();

  // this is a gross way to get the
  // keys but it works until everything
  // can be refactored
  const value = mode.monos[mode.activeMonoKey][s.data.monoMap[el.key("key")]];
  // b.debug(value);
  // const x = s.data.monoMap[el.key("key")];
  // b.info(x);
  el.value = value;
}
