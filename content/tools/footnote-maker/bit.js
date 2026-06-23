export const b = {};

export function bodyLink(_, sender, el) {
  const parts = [
    `<sup class="footnoteLink" id="body-${sender.value}">`,
    `<a href="#footnote-${sender.value}">`,
    sender.value,
    `</a>`,
    `</sup>`,
  ];
  el.value = parts.join("");
}

export function copyBodyLink(_, sender, ___) {
  b.copy(sender.prop("target"), sender);
}

export function copyFootnoteLink(_, sender, ___) {
  b.copy(sender.prop("target"), sender);
}

export function footnoteLink(_, sender, el) {
  const parts = [
    `<a class="footnoteId" id="footnote-${sender.value}" href="#body-${sender.value}">`,
    sender.value,
    `</a>`,
  ];
  el.value = parts.join("");
}
