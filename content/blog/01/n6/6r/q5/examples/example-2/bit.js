export const b = {};

export function copyWithKey(_, sender, el) {
  if (sender.prop("key") === el.prop("key")) {
    b.quickCopy(el, sender);
  }
}
