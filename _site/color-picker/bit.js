export function blockOptionsInit(_, __, el) {
  b.trace("blockOptionsInit");
  const mode = s.getActiveMode();
  const options = Object.keys(mode.blocks).map((key) => {
    let selected = "";
    if (key === mode.activeBlock) {
      selected = " selected";
    }
    const optionSubs = {
      __KEY__: key,
      __SELECTED__: selected,
    };
    return b.render("blockOption", optionSubs);
  });
  const subs = {
    __OPTIONS__: options,
  };
  el.replaceChildren(b.render("blockOptions", subs));
}

// export function blockOptionsSet(_, sender, ___) {
//   const mode = s.getActiveMode();
//   b.info(mode.blocks);
// }

// export function blockOptionsUpdate(_, __, el) {
//   el.replaceChildren();
//   const mode = s.getActiveMode();
//   s.data.colorTypes.map((colorType) => {
//     return s.data.colorNames.map((colorName) => {
//       const key = `${colorType}-${colorName}`;
//       let selected = "";
//       if (mode.activeBlock === key) {
//         selected = " selected";
//       }
//       const subs = {
//         __KEY__: `${colorType}-${colorName}`,
//         __SELECTED__: selected,
//       };
//       el.appendChild(b.render("blockBuilderOption", subs));
//     });
//   });
// }

export function blockSelectInit(_, __, el) {
  b.trace("blockSelectInit");
  el.replaceChildren(b.render("blockSelect"));
  b.trigger("blockOptionsInit");
}

export function blockSelectSet(_, sender, ___) {
  const mode = s.getActiveMode();
  mode.activeBlock = sender.value;
  s.save();
  // b.savePageData("data", s.data);
  b.info(sender.value);
  b.info(mode);
}

export function blocksInit(_, __, el) {
  b.trace("blocksInit");
  el.replaceChildren(b.render("blocks"));
  b.trigger("blockSelectInit");

  /*

  const examples = [];

  const textOptions = s.data.colorTypes.map((colorType) => {
    return s.data.colorNames.map((colorName) => {
      const backgroundKey = `${colorType}-${colorName}`;
      let selected = "";
      if (mode.activeBlock === backgroundKey) {
        selected = " selected";
        s.data.colorTypes.forEach((colorTextType) => {
          return s.data.colorNames.map((colorTextName) => {
            const colorKey = `${colorTextType}-${colorTextName}`;
            const textSubs = {
              __BACKGROUND_KEY__: backgroundKey,
              __COLOR_KEY__: colorKey,
            };
            examples.push(b.render("blockExample", textSubs));
          });
        });
      }

      const subs = {
        __KEY__: backgroundKey,
        __SELECTED__: selected,
      };

      return b.render("blockBuilderOption", subs);
    });
  }).flat();

  const subs = {
    __BLOCK_BUILDER_OPTIONS__: textOptions,
    __BLOCK_EXAMPLES__: examples,
  };

  el.replaceChildren(b.render("blockBuilder", subs));
  */
}

const defaults = {
  customStyles: "",
  baseCSS: `
:root {
  color-scheme: var(--color-scheme);
}

body { 
  background-color: var(--background-color);
  background-image: var(--background-image);
  background-repeat: repeat;
  background-size: 150px 150px;
  color: var(--default-base-color);
}
`,
  logLevel: "DEBUG",
  hueRotation: 45,
  activeMode: "light",
  colorNames: ["base", "heading", "accent", "info", "warning"],
  colorTypes: ["default", "faded", "faint"],
  monoNames: ["black", "white", "match", "reverse"],
  monoMap: {
    "faded": "__FADED__",
    "faint": "__FAINT__",
  },
  monoSliders: [
    { key: "faded", name: "Faded", token: "__FADED__" },
    { key: "faint", name: "Faint", token: "__FAINT__" },
  ],
  config: {
    __L__: {
      __NAME__: "Lightness",
      __MIN__: 0,
      __MAX__: 1,
      __STEP__: 0.0001,
    },
    __C__: {
      __NAME__: "Chroma",
      __MIN__: 0,
      __MAX__: 0.3,
      __STEP__: 0.00001,
    },
    __H__: {
      __NAME__: "Hue",
      __MIN__: 0,
      __MAX__: 360,
      __STEP__: 0.001,
    },
    __T__: {
      __NAME__: "Texture",
      __MIN__: 0,
      __MAX__: 100,
      __STEP__: 0.1,
    },
  },
  modes: {
    "light": {
      activeColorIndex: 0,
      activeMonoKey: "black",
      activeBlock: "default-accent",
      background: {
        __L__: 1,
        __C__: 0.01726,
        __H__: 45.298,
        __T__: 45,
      },
      monos: {
        "black": {
          __LIGHTNESS__: 0,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        "white": {
          __LIGHTNESS__: 1,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        "match": {
          __LIGHTNESS__: 1,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        "reverse": {
          __LIGHTNESS__: 0,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
      },
      colors: [
        {
          __L__: 0.3,
          __C__: 0.12,
          __H_OFFSET__: 4,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        {
          __L__: 0.4,
          __C__: 0.16,
          __H_OFFSET__: 3,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        {
          __L__: 0.54,
          __C__: 0.126,
          __H_OFFSET__: 5,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        {
          __L__: 0.62,
          __C__: 0.12,
          __H_OFFSET__: 2,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        {
          __L__: 0.6,
          __C__: 0.127,
          __H_OFFSET__: 4,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
      ],
    },
    "dark": {
      activeColorIndex: 0,
      activeMonoKey: "black",
      activeBlock: "default-base",
      background: {
        __L__: 0.138,
        __C__: 0.12,
        __H__: 166.07,
        __T__: 0,
      },
      monos: {
        "black": {
          __LIGHTNESS__: 0,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        "white": {
          __LIGHTNESS__: 1,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        "match": {
          __LIGHTNESS__: 0,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        "reverse": {
          __LIGHTNESS__: 1,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
      },
      colors: [
        {
          __L__: 0.883,
          __C__: 0.0372,
          __H_OFFSET__: 6,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        {
          __L__: 0.773,
          __C__: 0.12,
          __H_OFFSET__: 2,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        {
          __L__: 0.62,
          __C__: 0.08,
          __H_OFFSET__: 3,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        {
          __L__: 0.93,
          __C__: 0.15,
          __H_OFFSET__: 3,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
        {
          __L__: 0.7,
          __C__: 0.122,
          __H_OFFSET__: 4,
          __FADED__: 0.6,
          __FAINT__: 0.12,
        },
      ],
    },
  },
};

export async function init() {
  s.data = await b.loadPageData("data", defaults);
  s.data.logLevel = "TRACE";
  b.setLogLevel(s.data.logLevel);
  if (!s.data.modes[0].blocks) {
    initDefaultBlocks();
  }
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

export function modesInit(_, __, el) {
}

export async function modesSet(_, sender, ___) {
  b.trace("modeSet");
  s.data.activeMode = sender.prop("key");
  await s.save();
}

class State {
  constructor(b) {
    this.b = b;
    this.data = {};
  }
  getActiveMode() {
    for (let mode of this.data.modes) {
      if (this.data.activeMode === mode.__KEY__) {
        return mode;
      }
    }
  }
  setActiveValue(key, value) {
    for (let mode of this.data.modes) {
      if (this.data.activeMode === mode.__KEY__) {
        mode.background[key] = value;
      }
    }
  }
  save() {
    b.info("Saving data");
    b.savePageData("data", this.data);
  }
}



let sheet = new CSSStyleSheet();
export const b = {
  init: "init",
};

let s = new State(b);