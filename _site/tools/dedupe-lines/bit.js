export const b = {};

export function clearDedupeLines(_, __, el) {
  el.value = "";
  b.forwardSender(el, "updateDedupeLines");
}

export function copyDedupeLines(_, sender, el) {
  b.quickCopy(el, sender);
}

export function showDedupeLinesExample(_, __, el) {
  el.value = `
alfa
bravo
alfa
charlie
bravo
delta
alfa
echo
`.trim();
  b.forwardSender(el, "updateDedupeLines");
}

export function updateDedupeLines(_, sender, el) {
  const lines = new Set(
    [...sender.value.split("\n").filter((line) => line.trim() !== "")],
  );
  el.value = [...lines].join("\n");
}