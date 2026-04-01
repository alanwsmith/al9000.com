export const b = {};

export function copyUniqueLines(_, sender, el) {
  b.quickCopy(el, sender);
}

export function uniqueLines(_, sender, el) {
  const lines = new Set(
    [...sender.value.split("\n").filter((line) => line.trim() !== "")],
  );
  el.value = [...lines].join("\n");
}
