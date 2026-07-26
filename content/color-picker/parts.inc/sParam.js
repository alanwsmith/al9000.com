export async function setParam(_, sender, ___) {
  b.trace("setParam");
  await requestAnimationFrame(async () => {
    s.setActiveValue(sender.prop("key"), sender.valueAsFloat());
    await b.savePageData("data", s.data);
    b.trigger("updateCSS");
  });
}
