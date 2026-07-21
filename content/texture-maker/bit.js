export const b = { init: "init" };
const s = { data: {}, svg: null };

export async function init(_, __, ___) {
  const defaults = {
    l: 0.2,
    c: 0.2,
    h: 220.0,
    o: 4.0,
  };
  s.data = await b.loadPageData("data", defaults);
  b.trigger("initValue updateCSS");
}

export function initValue(_, __, el) {
  const key = el.prop("key");
  const value = s.data[key];
  b.setCSS(`--svg-bg-${key}`, value);
  el.value = value;
}

export async function updateValue(_, sender, ___) {
  const key = sender.prop("key");
  s.data[key] = sender.valueAsFloat();
  b.setCSS(`--svg-bg-${key}`, sender.valueAsFloat());
  await b.savePageData(s.data, "data");
  b.debounce("css", "updateCSS", 80);
}

export function updateCSS(_, __, el) {
  s.svg = encodeURIComponent(
    b.render("mainSVG", {
      __OPACITY__: `${s.data.o}%`,
    }).outerHTML,
  )
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  const cssURL = `url("data:image/svg+xml,${s.svg}")`;
  b.setCSS(
    `--svg-bg-url`,
    `url("data:image/svg+xml,${s.svg}")`,
  );
  const subs = {
    __l__: s.data.l,
    __c__: s.data.c,
    __h__: s.data.h,
    __url__: cssURL,
  };
  el.replaceChildren(b.render("mainCSS", subs));
}

//    `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E %3Cfilter id='noiseFilter'%3E %3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='2' result='noise' /%3E %3CfeColorMatrix type='saturate' values='0' result='grayscale' /%3E %3CfeComponentTransfer%3E %3CfeFuncA in='grayscale' type='linear' slope='0.4' result='updated' /%3E %3C/feComponentTransfer%3E %3CfeMerge%3E %3CfeMergeNode in='noise' /%3E %3CfeMergeNode in='updated' /%3E %3C/feMerge%3E %3C/filter%3E %3Crect width='100%25' height='100%25' opacity='0.17' filter='url(%23noiseFilter)'/%3E %3C/svg%3E")`,

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
