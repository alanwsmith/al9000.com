export function monoColorSet(_, sender, ___) {
  const mode = s.getActiveMode();
  mode.activeMonoKey = sender.key("key");
  b.savePageData("data", s.data);
  b.trigger("monoColorUpdate monoSliderUpdate");
}
