export async function sColor(_, sender, ___) {
  b.trace("sColor");
  const mode = s.getActiveMode();
  mode.activeColorIndex = sender.propAsInt("index");
  await b.savePageData("data", s.data);
  b.trigger(
    "updateCSS",
  );
}
