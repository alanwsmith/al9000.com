export const b = {};

export function copyURLLinks(_, sender, el) {
  b.quickCopy(el, sender);
}

export function urlsToLink(_, sender, el) {
  const incoming = sender.value.split("\n").filter((line) => line.trim() !== "")
    .sort();
  b.dedupe(incoming);
  const output = incoming.map((line) =>
    `<li><a href="${line.trim()}">${line.trim()}</a></li>`
  );
  el.value = output.join("\n");
}
