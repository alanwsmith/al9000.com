export const b = {};

export function copy(_, sender, __) {
  const el = b.qs(`#${sender.prop("key")}`);
  b.quickCopy(el, sender);
}