export const b = { init: "makeUUID" };

export function copyUUID(_, sender, el) {
  b.quickCopy(el, sender);
}

export function makeUUID(_, __, el) {
  el.innerHTML = self.crypto.randomUUID();
}