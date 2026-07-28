export async function setLogLevel(_, sender, ___) {
  b.setLogLevel(sender.key("key"));
  s.data.logLevel = sender.key("key");
  b.info(`Log level set to: ${sender.key("key")}`);
  await b.savePageData("data", s.data);
}