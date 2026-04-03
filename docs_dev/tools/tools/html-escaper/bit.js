export const b = {};

export function clearHTMLEscaper(_, __, el) {
  el.value = "";
  b.forwardSender(el, "updateHTMLEscaper");
}

export function copyHTMLEscaper(_, sender, el) {
  b.quickCopy(el, sender);
}

export function showHTMLEscaperExample(_, __, el) {
  el.value = `
Less Than: <
Greater Than: >
Double Quote: "
Single Quote: '
Ampersand: &
`.trim();
  b.forwardSender(el, "updateHTMLEscaper");
}

export function updateHTMLEscaper(_, sender, el) {
  el.value = sender.value
    .replaceAll(`&`, `&amp;`)
    .replaceAll(`"`, `&quot;`)
    .replaceAll(`'`, `&#39;`)
    .replaceAll(`<`, `&lt;`)
    .replaceAll(`>`, `&gt;`);
}