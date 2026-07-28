export const b = {};

export function copyWithKey(_, sender, el) {
  if (sender.key("key") === el.key("key")) {
    b.quickCopy(el, sender);
  }
}
