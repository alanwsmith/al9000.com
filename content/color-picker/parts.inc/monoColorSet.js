export function monoColorSet(_, sender, ___) {
  const mode = s.getActiveMode();
  mode.activeMonoIndex = sender.propAsInt("index");
  b.savePageData("data", s.data);
  b.trigger("monoColorUpdate");
}
