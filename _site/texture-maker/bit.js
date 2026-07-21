export const b = { init: "init" };

const s = {
  data: {},
  svg: null,
};

export async function init(_, __, ___) {
  const defaults = {
    l: 0.2,
    c: 0.2,
    h: 220.0,
    o: 4.0,
  };
  s.data = await b.loadPageData("data", defaults);
  b.trigger("initValue");
}

export function initValue(_, __, el) {
  const key = el.prop("key");
  const value = s.data[key];
  b.setCSS(`--svg-bg-${key}`, value);
  el.value = value;
}

export async function update(_, sender, ___) {
  const key = sender.prop("key");
  s.data[key] = sender.valueAsFloat();
  await b.savePageData(s.data, "data");
  b.setCSS(`--svg-bg-${key}`, sender.valueAsFloat());
}

// export function chroma(_, sender, ___) {
//   b.setCSS("--svg-bg-chroma", sender.valueAsFloat());
//   s.data.chroma = sender.valueAsFloat();
// }

// export function example(_, __, el) {
//   sampleSVG = b.render("mainSVG", {
//     __OPACITY__: `${opacity_value}%`,
//   });
//   el.replaceChildren(sampleSVG);
//   b.trigger("updateSVG");
// }

// export function hue(_, sender, ___) {
//   b.setCSS("--svg-bg-hue", sender.valueAsFloat());
//   s.data.hue = sender.valueAsFloat();
// }

// export function initChroma(_, __, el) {
//   el.value = s.data.chroma;
// }

// export function initHue(_, __, el) {
//   el.value = s.data.hue;
// }

// export function initLightness(_, __, el) {
//   el.value = s.data.lightness;
// }

// export function initOpacity(_, __, el) {
//   el.value = s.data.opacity;
// }

// export function lightness(_, sender, ___) {
//   b.setCSS("--svg-bg-lightness", sender.valueAsFloat());
//   s.data.lightness = sender.valueAsFloat();
// }

// export function opacity(_, sender, ___) {
//   opacity_value = sender.valueAsFloat();
//   // s.data.opacity = sender.valueAsFloat();
//   b.trigger("example");
// }

// export function updateSVG(_, __, el) {
//   el.value = "asdf";
// }