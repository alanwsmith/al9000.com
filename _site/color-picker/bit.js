export function backgroundSliderUpdate(_, __, el) {
  el.value = s.data.modes[s.data.activeMode].background[el.prop("key")];
}

export async function backgroundSliderSet(_, sender, ___) {
  await requestAnimationFrame(async () => {
    s.data.modes[s.data.activeMode].background[sender.prop("key")] = sender
      .valueAsFloat();
    await b.savePageData("data", s.data);
    b.trigger("updateCSS updateJSON");
  });
}

export function backgroundSlidersInit(_, __, el) {
  b.trace("backgroundSlidersInit");
  Object.entries(s.data.config).forEach(([key, subs]) => {
    if (key !== "faded" && key !== "faint") {
      subs.__KEY__ = key;
      el.appendChild(b.render("backgroundSlider", subs));
    }
  });
  b.trigger("backgroundSliderUpdate");
}

export function blockOptionsInit(_, __, el) {
  // b.trace("blockOptionsInit");
  // const mode = s.getActiveMode();
  // const options = Object.keys(mode.blocks).map((key) => {
  //   let selected = "";
  //   if (key === mode.activeBlock) {
  //     selected = " selected";
  //   }
  //   const optionSubs = {
  //     __KEY__: key,
  //     __SELECTED__: selected,
  //   };
  //   return b.render("blockOption", optionSubs);
  // });
  // const subs = {
  //   __OPTIONS__: options,
  // };
  // el.replaceChildren(b.render("blockOptions", subs));
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

export async function colorSet(_, sender, ___) {
  b.trace("colorSet");
  s.data.modes[s.data.activeMode].activeColor = sender.prop("key");
  await s.save();
  b.trigger("colorUpdate hueUpdate colorSliderUpdate updateCSS updateJSON");
}

export function colorUpdate(_, __, el) {
  b.trace("colorUpdate");
  if (
    el.prop("key") ===
      s.data.modes[s.data.activeMode].activeColor
  ) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}

export function colorSliderSet(_, sender, ___) {
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  color.values[sender.prop("key")] = sender.valueAsFloat();
  s.save();
  b.trigger("updateCSS updateJSON");
}

export function colorSliderUpdate(_, __, el) {
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  el.value = color.values[el.prop("key")];
}

export function colorSlidersInit(_, __, el) {
  b.trace("colorSliderInit");
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  Object.keys(color.values).forEach((key) => {
    const subs = JSON.parse(JSON.stringify(
      s.data.config[key],
    ));
    subs.__KEY__ = key;
    el.appendChild(b.render("colorSlider", subs));
  });
  b.trigger("colorSliderUpdate");
}

export function colorsInit(_, __, el) {
  s.data.colorKeys.forEach((key) => {
    const subs = {
      __KEY__: key,
    };
    el.appendChild(b.render("color", subs));
  });
  b.trigger("colorUpdate");
}

const defaults = {
  baseCSS: `
:root {
  color-scheme: var(--color-scheme);
}

body { 
  background-color: var(--default-background-color);
  background-image: var(--default-background-image);
  background-repeat: repeat;
  background-size: 150px 150px;
  color: var(--default-base-color);
}
`,
  logLevel: "DEBUG",
  hueRotation: 45,
  activeMode: "light",
  colorKeys: ["base", "heading", "accent", "info", "warning"],
  colorTypes: ["default", "faded", "faint"],
  monoNames: ["black", "white", "match", "reverse"],
  config: {
    "lightness": {
      __NAME__: "Lightness",
      __MIN__: 0,
      __MAX__: 1,
      __STEP__: 0.0001,
    },
    "chroma": {
      __NAME__: "Chroma",
      __MIN__: 0,
      __MAX__: 0.3,
      __STEP__: 0.00001,
    },
    "hue": {
      __NAME__: "Hue",
      __MIN__: 0,
      __MAX__: 360,
      __STEP__: 0.001,
    },
    "texture": {
      __NAME__: "Texture",
      __MIN__: 0,
      __MAX__: 100,
      __STEP__: 0.1,
    },
    "faded": {
      __NAME__: "Faded",
      __MIN__: 0,
      __MAX__: 1,
      __STEP__: 0.0001,
    },
    "faint": {
      __NAME__: "Faint",
      __MIN__: 0,
      __MAX__: 1,
      __STEP__: 0.0001,
    },
  },
  modes: {
    "light": {
      activeColor: "base",
      activeMonoKey: "black",
      activeBlock: "default-accent",
      background: {
        lightness: 1,
        chroma: 0.01726,
        hue: 45.298,
        texture: 45,
      },
      monos: {
        "black": {
          __LIGHTNESS__: 0,
          faded: 0.6,
          faint: 0.12,
        },
        "white": {
          __LIGHTNESS__: 1,
          faded: 0.6,
          faint: 0.12,
        },
        "match": {
          __LIGHTNESS__: 1,
          faded: 0.6,
          faint: 0.12,
        },
        "reverse": {
          __LIGHTNESS__: 0,
          faded: 0.6,
          faint: 0.12,
        },
      },
      colors: {
        base: {
          hueOffset: 4,
          values: {
            lightness: 0.3,
            chroma: 0.12,
            faded: 0.6,
            faint: 0.12,
          },
        },
        heading: {
          hueOffset: 3,
          values: {
            lightness: 0.4,
            chroma: 0.16,
            faded: 0.6,
            faint: 0.12,
          },
        },
        accent: {
          hueOffset: 5,
          values: {
            lightness: 0.54,
            chroma: 0.126,
            faded: 0.6,
            faint: 0.12,
          },
        },
        info: {
          hueOffset: 2,
          values: {
            lightness: 0.62,
            chroma: 0.12,
            faded: 0.6,
            faint: 0.12,
          },
        },
        warning: {
          hueOffset: 4,
          values: {
            lightness: 0.6,
            chroma: 0.127,
            faded: 0.6,
            faint: 0.12,
          },
        },
      },
    },
    "dark": {
      activeColor: "base",
      activeMonoKey: "black",
      activeBlock: "default-base",
      background: {
        lightness: 0.138,
        chroma: 0.12,
        hue: 166.07,
        texture: 0,
      },
      monos: {
        "black": {
          __LIGHTNESS__: 0,
          faded: 0.6,
          faint: 0.12,
        },
        "white": {
          __LIGHTNESS__: 1,
          faded: 0.6,
          faint: 0.12,
        },
        "match": {
          __LIGHTNESS__: 0,
          faded: 0.6,
          faint: 0.12,
        },
        "reverse": {
          __LIGHTNESS__: 1,
          faded: 0.6,
          faint: 0.12,
        },
      },
      colors: {
        base: {
          hueOffset: 6,
          values: {
            lightness: 0.883,
            chroma: 0.0372,
            faded: 0.6,
            faint: 0.12,
          },
        },
        heading: {
          hueOffset: 2,
          values: {
            faded: 0.6,
            faint: 0.12,
            lightness: 0.773,
            chroma: 0.12,
          },
        },
        accent: {
          hueOffset: 3,
          values: {
            lightness: 0.62,
            chroma: 0.08,
            faded: 0.6,
            faint: 0.12,
          },
        },
        info: {
          hueOffset: 3,
          values: {
            lightness: 0.93,
            chroma: 0.15,
            faded: 0.6,
            faint: 0.12,
          },
        },
        warning: {
          hueOffset: 4,
          values: {
            faded: 0.6,
            faint: 0.12,
            lightness: 0.7,
            chroma: 0.122,
          },
        },
      },
    },
  },
};

export async function hueSet(_, sender, ___) {
  b.trace("hueSet");
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  color.hueOffset = sender.propAsInt("index");
  await s.save();
  b.trigger("hueUpdate updateCSS updateJSON");
}

export function hueUpdate(_, __, el) {
  b.trace("hueUpdate");
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  if (el.propAsInt("index") === color.hueOffset) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}

export function huesInit(_, __, el) {
  b.trace("huesInit");
  for (let index = 0; index < s.hueCount(); index += 1) {
    const subs = {
      __INDEX__: index,
    };
    el.appendChild(b.render("hue", subs));
  }
  b.trigger("hueUpdate");
}

export async function init() {
  s.data = await b.loadPageData("data", defaults);
  s.data.logLevel = "DEBUG";
  b.setLogLevel(s.data.logLevel);
  initDefaultBlocks();
  b.trigger(
    "modesInit backgroundSlidersInit colorsInit huesInit colorSlidersInit updateCSS updateJSON",
  );
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

export async function modeSet(_, sender, ___) {
  b.trace("modeSet");
  s.data.activeMode = sender.prop("key");
  await s.save();
  b.trigger(
    "backgroundSliderUpdate colorUpdate hueUpdate colorSliderUpdate updateCSS updateJSON",
  );
}

export function modesInit(_, __, el) {
  b.trace("modesInit");
  const modes = Object.keys(s.data.modes).map((key) => {
    let checked = "";
    if (key === s.data.activeMode) {
      checked = " checked";
    }
    const subs = {
      __KEY__: key,
      __CHECKED__: checked,
    };
    return b.render("mode", subs);
  });
  const subs = {
    __MODES__: modes,
  };
  el.replaceChildren(b.render("modes", subs));
}

export async function resetDefaults(_, __, ___) {
  s.data = defaults;
  await s.save();
  location.reload();
}

class State {
  constructor(b) {
    this.b = b;
    this.data = {};
  }
  hueCount() {
    return 360 / this.data.hueRotation;
  }
  async save() {
    b.trace("Saving data");
    await b.savePageData("data", this.data);
  }
}

let css;
let output;

export function updateCSS(_, __, el) {
  output = [];
  css = {
    classes: [],
    modes: {
      light: [],
      dark: [],
    },
    raw: [],
    ui: [],
  };

  const c = css.classes;
  const l = css.modes.light;
  const d = css.modes.dark;
  const r = css.raw;

  l.push(`:root {`);
  d.push(`@media (prefers-color-scheme: dark) { :root {`);

  addBaseCSS();
  addBackgroundOKLCH("light");
  addDefaultVars("light");
  addFadeVars("light");
  addDefaultSwitches("light");
  addFadeSwitches("light");
  addDefaultClasses("light");

  l.push(`}`);
  d.push(`}}`);

  output = [...l, ...d, ...r, ...c];
  el.innerHTML = output.join("\n");
  addUI();
  sheet.replaceSync(output.join("\n"));
}

function addFadeVars(m) {
  const fadeTypes = ["faded", "faint"];
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const colors = mode.colors;
  fadeTypes.forEach((ft) => {
    Object.entries(colors).forEach(([key, content]) => {
      const values = content.values;
      const oklch = `oklch(${values.lightness} ${values.chroma} ${
        hueRotate(
          mode.background.hue,
          content.hueOffset,
        )
      } / ${values[ft]})`;
      target.push(
        `--light--${ft}-${key}-color: ${oklch};`,
      );
    });
  });
}

function addUI() {
  const mode = s.data.modes[s.data.activeMode];
  const colors = mode.colors;
  const color = colors[mode.activeColor];
  for (let i = 0; i <= s.hueCount(); i += 1) {
    output.push(`.ui--hue-color-${i} { color: oklch(
${color.values.lightness}
${color.values.chroma}
${hueRotate(mode.background.hue, i)}
); }`);
  }
}

function hueRotate(value, index) {
  const adjust = index * s.data.hueRotation;
  return (value + adjust) % 360;
}

function addBackgroundOKLCH(m) {
  css.modes[m].push(
    `--light--default-background-color: oklch(${
      s.data.modes[m].background.lightness
    } ${s.data.modes[m].background.chroma} ${s.data.modes[m].background.hue});`,
  );
}

function addBaseCSS() {
  css.raw.push(s.data.baseCSS);
}

function addDefaultClasses(m) {
  const target = css.classes;
  target.push(
    `.default-background-color { color: var(--default-background-color); }`,
  );
  const mode = s.data.modes[m];
  const colors = mode.colors;
  Object.entries(colors).forEach(([key, content]) => {
    target.push(
      `.default-${key}-color { color: var(--default-${key}-color); }`,
    );
  });
}

function addDefaultVars(m) {
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const colors = mode.colors;
  Object.entries(colors).forEach(([key, content]) => {
    const values = content.values;
    const oklch = `oklch(${values.lightness} ${values.chroma} ${
      hueRotate(
        mode.background.hue,
        content.hueOffset,
      )
    })`;
    target.push(
      `--light--default-${key}-color: ${oklch};`,
    );
  });
}

function addFadeSwitches(m) {
  const fadeTypes = ["faded", "faint"];
  const target = css.modes[m];
  const mode = s.data.modes.light;
  const colors = mode.colors;
  fadeTypes.forEach((ft) => {
    Object.entries(colors).forEach(([key, content]) => {
      target.push(
        `--${ft}-${key}-color: var(--switch--${ft}-${key}-color, var(--light--${ft}-${key}-color));`,
      );
    });
  });
}

function addDefaultSwitches(m) {
  const target = css.modes[m];
  target.push(
    `--default-background-color: var(--switch--default-background-color, var(--light--default-background-color));`,
  );
  const mode = s.data.modes.light;
  const colors = mode.colors;
  Object.entries(colors).forEach(([key, content]) => {
    target.push(
      `--default-${key}-color: var(--switch--default-${key}-color, var(--light--default-${key}-color));`,
    );
  });
}

export function updateJSON(_, __, el) {
  el.innerHTML = JSON.stringify(s.data, null, 2);
}



let sheet = new CSSStyleSheet();
document.adoptedStyleSheets.push(sheet);
export const b = {
  init: "init",
};

let s = new State(b);