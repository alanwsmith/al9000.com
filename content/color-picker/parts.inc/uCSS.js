export function updateCSS(_, __, el) {
  b.trace("updateCSS");
  // TODO: Remove save page from everywhere
  // else and just do it here.
  b.savePageData("data", s.data);
  const mode = s.getActiveMode();
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
    s.data.customStyles,
  ].join("\n");

  el.innerHTML = sheetParts;

  const combinedSheet = `${sheetParts}
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
`);
  //uColorName
}
