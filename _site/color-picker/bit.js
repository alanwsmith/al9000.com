export function backgroundSliderUpdate(_, __, el) {
  el.value = s.data.modes[s.data.activeMode].background[el.key("key")];
}

export async function backgroundSliderSet(_, sender, ___) {
  await requestAnimationFrame(async () => {
    s.data.modes[s.data.activeMode].background[sender.key("key")] = sender
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

export function blockUpdate(_, __, el) {
  b.trace(el);

  const mode = s.data.modes[s.data.activeMode];
  s.data.colorKeys.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const key = `${type}-${color}`;
      const backgroundColor = `${key}-background-color`;
      if (mode.activeBlock === key) {
        el.classList.add(backgroundColor);
      } else {
        el.classList.remove(backgroundColor);
      }
    });
  });
}

export function blockNameUpdate(_, __, el) {
  const mode = s.data.modes[s.data.activeMode];
  if (el.key("key") === mode.activeBlock) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}

export function blockNameSet(_, sender, ___) {
  const mode = s.data.modes[s.data.activeMode];
  mode.activeBlock = sender.key("key");
  s.save();
  b.trigger("blockNameUpdate blockUpdate");
}

export function blockNamesInit(_, __, el) {
  b.trace("blockNamestInit");

  const mode = s.data.modes[s.data.activeMode];
  s.data.colorKeys.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const key = `${type}-${color}`;
      const subs = {
        __KEY__: key,
        __NAME__: `${color}: ${type}`,
      };
      el.appendChild(b.render("blockName", subs));
    });
  });

  s.data.monoNames.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const key = `${type}-${color}`;
      const subs = {
        __KEY__: key,
        __NAME__: `${color}: ${type}`,
      };
      el.appendChild(b.render("blockName", subs));
    });
  });
}

export function blocksInit(_, __, el) {
  b.trace("blocksInit");
  const mode = s.data.modes[s.data.activeMode];
  s.data.colorKeys.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __COLOR_CLASS__: `${type}-${color}-color`,
        __BACKGROUND_CLASS__: `${mode.activeBlock}-background-color`,
      };
      el.appendChild(b.render("block", subs));
    });
  });

  s.data.monoNames.forEach((color) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __COLOR_CLASS__: `${type}-${color}-color`,
        __BACKGROUND_CLASS__: `${mode.activeBlock}-background-color`,
      };
      el.appendChild(b.render("block", subs));
    });
  });

  b.trigger("blockNameUpdate");
}

// export function blockSelectInit(_, __, el) {
//   b.trace("blockSelectInit");
//   const mode = s.data.modes[s.data.activeMode];
//   s.data.colorKeys.forEach((color) => {
//     s.data.colorTypes.forEach((type) => {
//       const key = `${type}-${color}`;
//       const subs = {
//         __KEY__: key,
//         __NAME__: `${color}: ${type}`,
//       };
//       if (mode.activeBlock === key) {
//         subs.__SELECTED__ = " selected";
//       } else {
//         subs.__SELECTED__ = "";
//       }
//       el.appendChild(b.render("blockOption", subs));
//     });
//   });
// }

// export function blockSelectSet(_, sender, ___) {
//   const mode = s.data.modes[s.data.activeMode];
//   mode.activeBlock = sender.value;
//   s.save();
//   b.trigger("blockUpdate");
// }

export async function colorSet(_, sender, ___) {
  b.trace("colorSet");
  s.data.modes[s.data.activeMode].activeColor = sender.key("key");
  await s.save();
  b.trigger("colorUpdate hueUpdate colorSliderUpdate updateCSS updateJSON");
}

export function colorUpdate(_, __, el) {
  b.trace("colorUpdate");
  if (
    el.key("key") ===
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
  color.values[sender.key("key")] = sender.valueAsFloat();
  s.save();
  b.trigger("updateCSS updateJSON");
}

export function colorSliderUpdate(_, __, el) {
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  el.value = color.values[el.key("key")];
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
  monoNames: ["black", "white"],
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
          alt: "reverse",
          lightness: 0,
          faded: 0.1,
          faint: 0.12,
        },
        "white": {
          alt: "match",
          lightness: 1,
          faded: 0.2,
          faint: 0.22,
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
          alt: "match",
          lightness: 0,
          faded: 0.5,
          faint: 0.22,
        },
        "white": {
          alt: "reverse",
          lightness: 1,
          faded: 0.4,
          faint: 0.32,
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
  color.hueOffset = sender.keyAsInt("index");
  await s.save();
  b.trigger("hueUpdate updateCSS updateJSON");
}

export function hueUpdate(_, __, el) {
  b.trace("hueUpdate");
  const mode = s.data.modes[s.data.activeMode];
  const color = mode.colors[mode.activeColor];
  if (el.keyAsInt("index") === color.hueOffset) {
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
    `
modesInit 
backgroundSlidersInit 
colorsInit 
huesInit 
colorSlidersInit 
monosInit
monoSlidersInit
swatchesUpdate
blockNamesInit
blocksInit
updateCSS 
`,
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

export async function modeSet(_, sender, ___) {
  b.trace("modeSet");
  s.data.activeMode = sender.key("key");
  await s.save();
  b.trigger(
    "backgroundSliderUpdate colorUpdate hueUpdate colorSliderUpdate updateCSS updateJSON monoUpdate swatchesUpdate ",
  );
  setModeCSS(s.data.activeMode);
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

export function monoSet(_, sender, ___) {
  const mode = s.data.modes[s.data.activeMode];
  mode.activeMonoKey = sender.key("key");
  s.save();
  b.trigger("monoUpdate monoSliderUpdate");
}

export function monoUpdate(_, __, el) {
  const mode = s.data.modes[s.data.activeMode];
  if (el.key("key") === mode.activeMonoKey) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}

export function monoSliderSet(_, sender, ___) {
  const mode = s.data.modes[s.data.activeMode];
  mode.monos[mode.activeMonoKey][sender.key("key")] = sender.valueAsFloat();
  s.save();
  b.trigger("updateCSS");
}

export function monoSliderUpdate(_, __, el) {
  const mode = s.data.modes[s.data.activeMode];
  el.value = mode.monos[mode.activeMonoKey][el.key("key")];
}

export function monoSlidersInit(_, __, el) {
  ["faded", "faint"].forEach((key) => {
    const subs = JSON.parse(JSON.stringify(s.data.config[key]));
    subs.__KEY__ = key;
    el.appendChild(b.render("monoSlider", subs));
  });
  b.trigger("monoSliderUpdate");
}

export function monosInit(_, __, el) {
  s.data.monoNames.forEach((name) => {
    const subs = {
      __KEY__: name,
    };
    el.appendChild(b.render("mono", subs));
  });
  b.trigger("monoUpdate");
}

export async function resetDefaults(_, __, ___) {
  s.data = defaults;
  await s.save();
  location.reload();
}

export function setModeCSS(mode) {
  const colors = ["base", "heading", "accent", "info", "warning", "background"];
  const kinds = ["default", "faded", "faint"];

  kinds.forEach((kind) => {
    colors.forEach((color) => {
      const key = `--switch--${kind}-${color}-color`;
      const value = `var(--${mode}--${kind}-${color}-color)`;
      b.setCSS(
        key,
        value,
      );
    });
    s.data.monoNames.forEach((mono) => {
      const key = `--switch--${kind}-${mono}-color`;
      const value = `var(--${mode}--${kind}-${mono}-color)`;
      b.setCSS(
        key,
        value,
      );
    });
  });
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

export function swatchesUpdate(_, __, el) {
  el.replaceChildren();
  s.data.colorKeys.forEach((key) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __COLOR_TYPE__: type,
        __COLOR_KEY__: key,
        __COLOR_NAME__: key,
      };
      el.appendChild(b.render("swatch", subs));
    });
  });

  const mode = s.data.modes[s.data.activeMode];
  s.data.monoNames.forEach((key) => {
    s.data.colorTypes.forEach((type) => {
      const subs = {
        __COLOR_TYPE__: type,
        __COLOR_KEY__: key,
        __COLOR_NAME__: `${key}/${mode.monos[key].alt}`,
      };
      el.appendChild(b.render("swatch", subs));
    });
  });
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

  ["light", "dark"].forEach((mode) => {
    addBackgroundOKLCH(mode);

    addColorDefaultVars(mode);
    addColorFadeVars(mode);
    addMonoDefaultVars(mode);
    addMonoFadeVars(mode);

    addColorDefaultSwitches(mode);
    addMonoDefaultSwitches(mode);
    addColorFadeSwitches(mode);
    addMonoFadeSwitches(mode);

    addColorDefaultClasses(mode);
    addMonoDefaultClasses(mode);

    addColorFadeClasses(mode);
    addMonoFadeClasses(mode);
  });

  l.push(`}`);
  d.push(`}}`);

  output = [...l, ...d, ...r, ...c];
  el.innerHTML = output.join("\n");
  addUI();
  sheet.replaceSync(output.join("\n"));

  b.trigger("updateJSON");
}

function addColorFadeVars(m) {
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
        `--${m}--${ft}-${key}-color: ${oklch};`,
      );
    });
  });
}

function addMonoFadeVars(m) {
  const fadeTypes = ["faded", "faint"];
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const monos = mode.monos;
  fadeTypes.forEach((ft) => {
    Object.entries(monos).forEach(([key, values]) => {
      const oklch = `oklch(${values.lightness} 0 0 / ${values[ft]})`;
      target.push(
        `--${m}--${ft}-${key}-color: ${oklch};`,
      );
    });
  });
}

function addUI() {
  // TODO: Set these once with variables
  // then update the variables.
  const mode = s.data.modes[s.data.activeMode];
  const colors = mode.colors;
  const color = colors[mode.activeColor];
  for (let i = 0; i <= s.hueCount(); i += 1) {
    output.push(
      `.ui--hue-color-${i} { color: oklch(${color.values.lightness} ${color.values.chroma} ${
        hueRotate(mode.background.hue, i)
      }); }`,
    );
  }
}

function hueRotate(value, index) {
  const adjust = index * s.data.hueRotation;
  return (value + adjust) % 360;
}

function addBackgroundOKLCH(m) {
  css.modes[m].push(
    `--${m}--default-background-color: oklch(${
      s.data.modes[m].background.lightness
    } ${s.data.modes[m].background.chroma} ${s.data.modes[m].background.hue});`,
  );
}

function addBaseCSS() {
  css.raw.push(s.data.baseCSS);
}

function addColorDefaultClasses(m) {
  const target = css.classes;
  const mode = s.data.modes[m];
  const colors = mode.colors;
  Object.entries(colors).forEach(([key, content]) => {
    target.push(
      `.default-${key}-color { color: var(--default-${key}-color); }`,
    );
    target.push(
      `.default-${key}-background-color { background-color: var(--default-${key}-color); }`,
    );
  });
}

function addMonoDefaultClasses(m) {
  const target = css.classes;
  const mode = s.data.modes[m];
  const monos = mode.monos;
  Object.entries(monos).forEach(([key, content]) => {
    target.push(
      `.default-${key}-color { color: var(--default-${key}-color); }`,
    );
    target.push(
      `.default-${key}-background-color { background-color: var(--default-${key}-color); }`,
    );
  });
}

function addColorFadeClasses(m) {
  const fadeTypes = ["faded", "faint"];
  const target = css.classes;
  const mode = s.data.modes[m];
  const colors = mode.colors;
  fadeTypes.forEach((ft) => {
    Object.entries(colors).forEach(([key, content]) => {
      target.push(
        `.${ft}-${key}-color { color: var(--${ft}-${key}-color); }`,
      );
      target.push(
        `.${ft}-${key}-background-color { background-color: var(--${ft}-${key}-color); }`,
      );
    });
  });
}

function addMonoFadeClasses(m) {
  const fadeTypes = ["faded", "faint"];
  const target = css.classes;
  const mode = s.data.modes[m];
  const monos = mode.monos;
  fadeTypes.forEach((ft) => {
    Object.entries(monos).forEach(([key, content]) => {
      target.push(
        `.${ft}-${key}-color { color: var(--${ft}-${key}-color); }`,
      );
    });
  });
}

function addColorDefaultVars(m) {
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
      `--${m}--default-${key}-color: ${oklch};`,
    );
  });
}

function addMonoDefaultVars(m) {
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const monos = mode.monos;
  Object.entries(monos).forEach(([key, values]) => {
    const oklch = `oklch(${values.lightness} 0 0)`;
    target.push(
      `--${m}--default-${key}-color: ${oklch};`,
    );
  });
}

function addColorFadeSwitches(m) {
  const fadeTypes = ["faded", "faint"];
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const colors = mode.colors;
  fadeTypes.forEach((ft) => {
    Object.entries(colors).forEach(([key, content]) => {
      target.push(
        `--${ft}-${key}-color: var(--switch--${ft}-${key}-color, var(--${m}--${ft}-${key}-color));`,
      );
    });
  });
}

function addMonoFadeSwitches(m) {
  const fadeTypes = ["faded", "faint"];
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const monos = mode.monos;
  fadeTypes.forEach((ft) => {
    Object.entries(monos).forEach(([key, content]) => {
      target.push(
        `--${ft}-${key}-color: var(--switch--${ft}-${key}-color, var(--${m}--${ft}-${key}-color));`,
      );
    });
  });
}

function addColorDefaultSwitches(m) {
  const target = css.modes[m];
  target.push(
    `--default-background-color: var(--switch--default-background-color, var(--${m}--default-background-color));`,
  );
  const mode = s.data.modes[m];
  const colors = mode.colors;
  Object.entries(colors).forEach(([key, content]) => {
    target.push(
      `--default-${key}-color: var(--switch--default-${key}-color, var(--${m}--default-${key}-color));`,
    );
  });
}

function addMonoDefaultSwitches(m) {
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const monos = mode.monos;
  Object.entries(monos).forEach(([key, content]) => {
    target.push(
      `--default-${key}-color: var(--switch--default-${key}-color, var(--${m}--default-${key}-color));`,
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