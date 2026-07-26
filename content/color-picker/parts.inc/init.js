export async function init() {
  s.data = await b.loadPageData("data", defaults);
  s.data.logLevel = "TRACE";
  b.setLogLevel(s.data.logLevel);
  if (!s.data.blocks) {
    initDefaultBlocks();
  }
  b.trigger(
    "blocksInit",
  );
  /*
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
blocksInit
`,
  );
  */
}

function initDefaultBlocks() {
  b.trace("initDefaultBlocks");
  const mode = s.getActiveMode();
  if (!mode.blocks) {
    mode.blocks = {};
    s.data.colorTypes.forEach((backgroundColorType) => {
      s.data.colorNames.forEach((backgroundColorName) => {
        const backgroundKey = `${backgroundColorType}-${backgroundColorName}`;
        mode.blocks[backgroundKey] = {};
        s.data.colorTypes.forEach((textColorType) => {
          s.data.colorNames.forEach((textColorName) => {
            const textKey = `${textColorType}-${textColorName}`;
            mode.blocks[backgroundKey][textKey] = {
              name: null,
              border: textKey,
            };
          });
        });
      });
    });
  }
}
