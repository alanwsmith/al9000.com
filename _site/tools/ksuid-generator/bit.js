import KSUID from "./ksuid.js";

export const b = { init: "makeKSUID" };

let current;

export function copyKSUID(_, sender, el) {
  b.copy(el, sender);
}

export function makeKSUID(_, __, el) {
  el.innerHTML = KSUID.random();
}