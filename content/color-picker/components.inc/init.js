export async function init() {
  s.data = await b.loadPageData("data", defaults);
  s.data.logLevel = "DEBUG";
  b.setLogLevel(s.data.logLevel);
  initDefaultBlocks();
  b.trigger(
    "modesInit backgroundSlidersInit colorsInit huesInit colorSlidersInit updateCSS updateJSON monosInit",
  );
  setModeCSS(s.data.activeMode);
}

function initDefaultBlocks() {
  b.trace("initDefaultBlocks");
  Object.keys(s.data.modes).forEach((key) => {
    const mode = s.data.modes[key];
    if (!mode.blocks) {
      mode.blocks = {};
      s.data.colorTypes.forEach((backgroundColorType) => {
        s.data.colorKeys.forEach((backgroundColorName) => {
          const backgroundKey = `${backgroundColorType}-${backgroundColorName}`;
          mode.blocks[backgroundKey] = {};
          s.data.colorTypes.forEach((textColorType) => {
            s.data.colorKeys.forEach((textColorName) => {
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
