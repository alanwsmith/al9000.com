export const b = { init: "example" };

let sampleSVG;

export function chroma(_, sender, ___) {
  b.setCSS("--svg-bg-chroma", sender.valueAsFloat());
}

export function example(_, __, el) {
  sampleSVG = b.render("mainSVG", {
    __OPACITY__: "10%",
  });
  el.replaceChildren(sampleSVG);
}

export function hue(_, sender, ___) {
  b.setCSS("--svg-bg-hue", sender.valueAsFloat());
}

export function lightness(_, sender, ___) {
  b.setCSS("--svg-bg-lightness", sender.valueAsFloat());
}
