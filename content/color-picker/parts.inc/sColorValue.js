
export async function setColorValue(_, sender, ___) {
  b.trace("setColorValue");
  requestAnimationFrame(async () => {
    const mode = s.getActiveMode();
    mode.colors[mode.activeColorIndex][`__${sender.prop("key")}__`] = sender
      .valueAsFloat();
    await b.savePageData("data", s.data);
    b.trigger("updateCSS");
  });
}