let working = {};

export async function updateCSSx(_, __, el) {
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

  el.replaceChildren(
    b.render("mainCSS", subs),
  );
}

export function updateCSS(_, __, el) {
  b.trace("updateCSS");

  // TODO: Remove save page from everywhere
  // else and just do it here.
  b.savePageData("data", s.data);
  const mode = s.getActiveMode();

  let bgImage = "none";
  if (mode.background.__T__ > 0) {
    const svg = encodeURIComponent(
      b.render("mainSVG", {
        __OPACITY__: `${mode.background.__T__}%`,
      }).outerHTML,
    )
      .replace(/'/g, "%27")
      .replace(/"/g, "%22");

    bgImage = `url("data:image/svg+xml,${svg}")`;
    // const cssURL = `url("data:image/svg+xml,${svg}")`;
    // b.setCSS(
    //   `--background-image`,
    //   `url("data:image/svg+xml,${svg}")`,
    // );
  }

  const variables = generatePageVariables();
  variables.forEach((vv) => {
    b.setCSS(vv[0], vv[1]);
  });

  working.sheetParts = [
    s.data.baseCSS,
    `
:root { 
--background-image: ${bgImage};
}
`,
    makePageVars(variables),
    `:root { 
${makeSwitches("light")} 
}
`,
    `@media (prefers-color-scheme: dark) {
  :root { 
${makeSwitches("dark")} 
  }
}
`,
    makeClasses(),
    s.data.customStyles,
  ].join("\n");

  el.innerHTML = working.sheetParts;

  const combinedSheet = `${working.sheetParts}
  ${makeUiVars()}
  ${makeUiClasses()}
${mode.customStyles}
`;
  sheet.replaceSync(combinedSheet);
  b.trigger(`
uBackgroundValue 
uColorButton 
uHueOffset
uColorValue
monoColorUpdate
`);
  //uColorName
}
