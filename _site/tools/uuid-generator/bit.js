export const b = { init: "makeUUID" };

export function copyUUID(_, sender, el) {
  b.copy(el, sender);
}

export function makeUUID(_, __, el) {
  el.innerHTML = self.crypto.randomUUID();
}