export async function init() {
  b.setLogLevel("DEBUG");
  // await b.savePageData("data", defaults);
  s.data = await b.loadPageData("data", defaults);
  if (!s.data.blocks) {
    generateDefaultBlocks();
  }
  b.setLogLevel(s.data.logLevel);
  b.trigger(
    `
monoBoxInit
initBaseStyles 
initBackgroundSliders 
initColorNameButtons 
initHueOffsetButtons 
initModeButtons
initColorSliders
iColorName
uCustomStyles
blockBuilderInit
`,
  );
}
