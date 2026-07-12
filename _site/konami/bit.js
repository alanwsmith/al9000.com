export const b = { init: "init output" };

// https://freesound.org/people/V-ktor/sounds/482993/
const passSound = new Audio("explosion-482993_8836484-lq.mp3");

// https://freesound.org/people/8bitmyketison/sounds/699923/
const failSound = new Audio("error-699923_15173053-lq.mp3");

const letters = {};

let listening = false;
let index = 0;
const current = [];
const target = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

export function accepted(_, __, el) {
  el.innerHTML = `<a href="/">[code accepted]<br />[return to home page]</a>`;
}

export async function check(_, __, ___) {
  listening = false;
  index = 0;
  for (let i = 0; i < 10; i += 1) {
    if (current[i] !== target[i]) {
      await b.sleep(280);
      failSound.play();
      b.trigger("fail");
      return;
    }
  }
  b.trigger("pass");
}

export async function pass(_, __, ___) {
  await b.sleep(300);
  passSound.play();
  b.trigger("accepted");
  b.setCSS("--code-color", "green");
}

export async function fail(_, __, el) {
  for (let i = 0; i < 10; i += 1) {
    current[i] = "x";
  }
  b.trigger("output");
  b.setCSS("--code-color", "red");
  await b.sleep(1700);
  b.setCSS("--code-color", "goldenrod");
  for (let i = 0; i < 10; i += 1) {
    current[i] = "_";
  }
  b.trigger("output");
  listening = true;
}

export function update(key, __, ___) {
  if (listening) {
    key = key.toLowerCase();
    if (letters[key]) {
      current[index] = key;
      index += 1;
    }
    b.trigger("output");
    if (index === 10) {
      b.trigger("check");
      return;
    }
  }
}

export function output(_, __, el) {
  el.innerHTML = current.map((l) => {
    return letters[l];
  }).join("");
}

export function init() {
  [...Array(26)].forEach((_, i) => {
    const letter = String.fromCharCode("a".charCodeAt(0) + i);
    letters[letter] = letter;
  });
  letters["_"] = "_";
  letters["arrowup"] = "⇧";
  letters["arrowdown"] = "⇓";
  letters["arrowleft"] = "⇐";
  letters["arrowright"] = "⇒";
  for (let i = 0; i < 10; i += 1) {
    letters[i] = i;
    current.push("_");
  }
  window.addEventListener(
    "keydown",
    (event) => {
      b.send(event.key, "update");
    },
  );
  listening = true;
}