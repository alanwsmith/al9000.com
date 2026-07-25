export async function init() {
  // b.setLogLevel("TRACE");
  // await b.savePageData("data", defaults);
  s.data = await b.loadPageData("data", defaults);
  b.setLogLevel(s.data.logLevel);
  b.trigger(
    `
initBaseStyles 
initBackgroundSliders 
initColorNameButtons 
initHueOffsetButtons 
initModeButtons
initColorSliders
iColorName
uCustomStyles
`,
  );
}
