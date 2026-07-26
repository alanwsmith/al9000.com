export async function sMode(_, sender, ___) {
  b.trace("sMode");
  s.data.activeMode = sender.prop("key");
  setSwitches(s.data.activeMode);
  await b.savePageData("data", s.data);
  b.trigger(`updateCSS uCustomStyles blockOptionsUpdate blockExamplesUpdate`);
}
