export async function monoSliderSet(_, sender, ___) {
  await requestAnimationFrame(async () => {
    const mode = s.getActiveMode();
    const monoKey = mode.activeMonoKey;
    const mono = mode.monos[monoKey];
    const token = s.data.monoMap[sender.prop("key")];
    b.info(mono);
    b.info(sender.prop("key"));
    b.info(mono);
    b.info(token);
    mono[token] = sender.valueAsFloat();
    await b.savePageData("data", s.data);
    b.trigger("updateCSS");
  });
}
