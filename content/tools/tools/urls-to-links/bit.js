export const b = {};

export function clearURLsToLinks(_, __, el) {
  el.value = "";
  b.forwardSender(el, "updateURLsToLinks");
}

export function copyURLsToLinks(_, sender, el) {
  b.quickCopy(el, sender);
}

export function showURLsToLinksExample(_, __, el) {
  el.value = `https://www.example.com
https://bittjs.com/`;
  b.forwardSender(el, "updateURLsToLinks");
}

export function updateURLsToLinks(_, sender, el) {
  const incoming = sender.value.split("\n").filter((line) => line.trim() !== "")
    .sort();
  b.dedupe(incoming);
  const output = incoming.map((line) =>
    `<li><a href="${line.trim()}">${line.trim()}</a></li>`
  );
  el.value = output.join("\n");
}
