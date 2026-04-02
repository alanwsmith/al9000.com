export const b = {};

export function clearInput(_, __, el) {
  el.value = "";
  b.forwardSender(el, "uniqueLines");
}

export function copyUniqueLines(_, sender, el) {
  b.quickCopy(el, sender);
}

export function showExample(_, __, el) {
  el.value = `alfa
bravo
alfa
charlie
bravo
delta
alfa
echo`;
  b.forwardSender(el, "uniqueLines");
}

export function uniqueLines(_, sender, el) {
  const lines = new Set(
    [...sender.value.split("\n").filter((line) => line.trim() !== "")],
  );
  el.value = [...lines].join("\n");
}
