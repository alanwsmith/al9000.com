import KSUID from "./ksuid.js";

export const b = { init: "makeKSUID" };

let current;

export function copyKSUID(_, sender, el) {
  b.quickCopy(el, sender);
}

export function makeKSUID(_, __, el) {
  el.innerHTML = KSUID.random();
}
