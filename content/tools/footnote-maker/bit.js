export const b = {};

export function bodyLink(_, sender, el) {
  const parts = [
    `<sup class="footnote-link" id="footnote-link-${sender.value}">`,
    `<a href="#footnote-ref-${sender.value}">`,
    sender.value,
    `</a>`,
    `</sup>`,
  ];
  el.value = parts.join("");
}

export function copyBodyLink(_, sender, ___) {
  b.copy(sender.key("target"), sender);
}

export function copyFootnoteLink(_, sender, ___) {
  b.copy(sender.key("target"), sender);
}

export function footnoteLink(_, sender, el) {
  const parts = [
    `<a class="footnote-ref" id="footnote-ref-${sender.value}" href="#footnote-link-${sender.value}">`,
    sender.value,
    `</a>`,
  ];
  el.value = parts.join("");
}
