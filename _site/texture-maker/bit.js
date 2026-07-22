// import { highlight } from "https://esm.sh/@lumis-sh/lumis";
// import { htmlInline } from "https://esm.sh/@lumis-sh/lumis/formatters";
// import javascript from "https://esm.sh/@lumis-sh/lumis/langs/javascript";
// import dracula from "https://esm.sh/@lumis-sh/themes/dracula";

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

export async function updateCSS(_, __, el) {
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

  // const x = await highlight(
  //   "const x = 1",
  //   htmlInline({ language: javascript, theme: dracula }),
  // );

  el.replaceChildren(
    b.render("mainCSS", subs),
  );
  //el.innerHTML = "asdfasdf";
  // el.innerHTML = await highlight(
  //   `console.log("here")`,
  //   // b.render("mainCSS", subs).outerHTML,
  //   htmlInline({ language: javascript, theme: dracula }),
  // );
}