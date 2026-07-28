export const b = {};

export function copy(_, sender, __) {
  const el = b.qs(`#${sender.key("key")}`);
  b.quickCopy(el, sender);
}