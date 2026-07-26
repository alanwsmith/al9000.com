export async function init() {
  b.savePageData("data", defaults);
  s.data = await b.loadPageData("data", defaults);
  s.data.logLevel = "TRACE";
  b.setLogLevel(s.data.logLevel);
  initDefaultBlocks();
  b.trigger(
    "modesInit blocksInit",
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
  Object.keys(s.data.modes).forEach((key) => {
    const mode = s.data.modes[key];
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
  });
  s.save();
}
