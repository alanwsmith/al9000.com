export async function setLogLevel(_, sender, ___) {
  b.setLogLevel(sender.prop("key"));
  s.data.logLevel = sender.prop("key");
  b.info(`Log level set to: ${sender.prop("key")}`);
  await b.savePageData("data", s.data);
}