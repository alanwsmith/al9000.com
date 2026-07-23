export function updateCSS(_, __, el) {
  b.trace("updateCSS");
  const variables = generatePageVariables();
  variables.forEach((vv) => {
    b.setCSS(vv[0], vv[1]);
  });

  const sheetParts = [
    `:root {
color-scheme: var(--color-scheme);
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
  ].join("\n");

  el.innerHTML = sheetParts;

  const combinedSheet = `${sheetParts}
  ${makeUiVars()}
  ${makeUiClasses()}`;
  sheet.replaceSync(combinedSheet);
  b.trigger("uBackgroundValue uColorButton uColorName uHueOffset");
}
