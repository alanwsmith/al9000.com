export const b = {};

export function clearLinesToLineItems(_, __, el) {
  el.value = "";
  b.forwardSender(el, "updateLinesToLineItems");
}

export function copyLinesToLineItems(_, sender, el) {
  b.quickCopy(el, sender);
}

export function showLinesToLineItemsExample(_, __, el) {
  el.value = `alfa

bravo

charlie`;

  b.forwardSender(el, "updateLinesToLineItems");
}

export function updateLinesToLineItems(_, sender, el) {
  el.value = sender.value
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => `<li>${line.trim()}</li>`)
    .join("\n");
}
