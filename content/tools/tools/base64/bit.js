export const b = {};

export function clearToBase64(_, __, el) {
  el.value = "";
  b.forwardSender(el, "updateToBase64");
}

export function copyToBase64(_, sender, el) {
  b.quickCopy(el, sender);
}

export function showToBase64Example(_, __, el) {
  el.value = `the quick brown fox`.trim();
  b.forwardSender(el, "updateToBase64");
}

export function updateToBase64(_, sender, el) {
  el.value = btoa(sender.value);
}

export function clearFromBase64(_, __, el) {
  el.value = "";
  b.forwardSender(el, "updateFromBase64");
}

export function copyFromBase64(_, sender, el) {
  b.quickCopy(el, sender);
}

export function showFromBase64Example(_, __, el) {
  el.value = `dGhlIHF1aWNrIGJyb3duIGZveA==`.trim();
  b.forwardSender(el, "updateFromBase64");
}

export function updateFromBase64(_, sender, el) {
  el.value = atob(sender.value);
}
