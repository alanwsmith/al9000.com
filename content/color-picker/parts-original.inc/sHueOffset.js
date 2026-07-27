export async function setHueOffset(_, sender, el) {
  b.trace("setHueOffset");
  const mode = s.getActiveMode();
  mode.colors[mode.activeColorIndex][`__H_OFFSET__`] = sender.propAsInt(
    "index",
  );
  await b.savePageData("data", s.data);
  b.trigger("updateCSS");
}

