export async function setMode(_, sender, ___) {
  b.trace("setMode");
  s.data.activeMode = sender.prop("key");
  setSwitches(s.data.activeMode);
  await b.savePageData("data", s.data);
  b.trigger(`updateCSS`);
}
