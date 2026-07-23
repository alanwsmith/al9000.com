let sheet = new CSSStyleSheet();

const defaults = {
  logLevel: "DEBUG",
  hueRotation: 45,
  activeMode: "light",
  colorNames: ["base", "heading", "accent", "info", "warning"],
  colorTypes: ["default", "faded", "faint"],
  monoNames: ["black", "white", "match", "reverse"],
  config: {
    __L__: {
      __NAME__: "Lightness",
      __MIN__: 0,
      __MAX__: 1,
      __STEP__: 0.001,
    },
    __C__: {
      __NAME__: "Chroma",
      __MIN__: 0,
      __MAX__: 0.3,
      __STEP__: 0.0001,
    },
    __H__: {
      __NAME__: "Hue",
      __MIN__: 0,
      __MAX__: 360,
      __STEP__: 0.01,
    },
    /*
    __T__: {
      __NAME__: "Texture",
      __MIN__: 0,
      __MAX__: 100,
      __STEP__: 0.1,
    },
    */
  },
  modes: [
    {
      __KEY__: "light",
      activeColorIndex: 0,
      background: {
        __L__: 0.873,
        __C__: 0.0299,
        __H__: 217.5,
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
          __H_OFFSET__: 0,
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
    {
      __KEY__: "dark",
      activeColorIndex: 0,
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
  ],
};

class State {
  constructor() {
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
}

let s = new State();

export const b = {
  init: "init",
};

export async function init() {
  // b.setLogLevel("WARN");
  // await b.savePageData("data", defaults);
  s.data = await b.loadPageData("data", defaults);
  b.setLogLevel(s.data.logLevel);
  b.trigger(
    `initBaseStyles 
initBackgroundSliders 
initColorNameButtons 
initHueOffsetButtons 
initModeButtons
initColorSliders`,
  );
}

export function initBaseStyles() {
  const theStyles = `
.ui-set-0 { color: var(--ui-set-0); }
.ui-set-1 { color: var(--ui-set-1); }
.ui-set-2 { color: var(--ui-set-2); }
.ui-set-3 { color: var(--ui-set-3); }
.ui-set-4 { color: var(--ui-set-4); }
.ui-set-5 { color: var(--ui-set-5); }
.ui-set-6 { color: var(--ui-set-6); }
.ui-set-7 { color: var(--ui-set-7); }
`;
  sheet.replaceSync(theStyles);
  document.adoptedStyleSheets.push(sheet);
}

export function initBackgroundSliders(_, __, el) {
  const mode = s.getActiveMode();
  for (let key of Object.keys(s.data.config)) {
    const subs = {
      __KEY__: key,
      __MIN__: s.data.config[key].__MIN__,
      __MAX__: s.data.config[key].__MAX__,
      __NAME__: s.data.config[key].__NAME__,
      __STEP__: s.data.config[key].__STEP__,
      __VALUE__: mode.background[key],
    };
    el.appendChild(
      b.render("backgroundSlider", subs),
    );
  }
  b.trigger("updateCSS");
}

export function initColorNameButtons(_, __, el) {
  s.data.colorNames.forEach((name, index) => {
    const subs = {
      __INDEX__: index,
      __COLOR__: name,
    };
    el.appendChild(b.render("colorNameButton", subs));
  });
  b.trigger("setColorNameStyles updateActiveColor");
}

export function initColorSliders(_, __, el) {
  const mode = s.getActiveMode();
  const color = s.getActiveMode().colors[mode.activeColorIndex];
  const subs = {
    __L__: color.__L__,
    __C__: color.__C__,
    __FADED__: color.__FADED__,
    __FAINT__: color.__FAINT__,
  };
  el.appendChild(b.render("colorSliders", subs));
}

export function initHueOffsetButtons(_, __, el) {
  for (let index = 0; index < (360 / s.data.hueRotation); index += 1) {
    const subs = {
      __INDEX__: index,
    };
    el.appendChild(b.render("hueOffsetButton", subs));
  }
  b.trigger("updateHueOffset");
}

export function initModeButtons(_, __, el) {
  for (let mode of s.data.modes) {
    if (mode.__KEY__ === s.data.activeMode) {
      mode.__CHECKED__ = "checked";
    } else {
      mode.__CHECKED__ = "";
    }
    el.appendChild(
      b.render("modeButton", mode),
    );
  }
  setSwitches(s.data.activeMode);
}

export async function resetDefaults() {
  await b.clearPageData();
  location.reload();
}

export async function setLogLevel(_, sender, ___) {
  b.info(`Log level set to: ${sender.prop("key")}`);
  b.setLogLevel(sender.prop("key"));
  s.data.logLevel = sender.prop("key");
  await b.savePageData("data", s.data);
}

export async function setColorName(_, sender, ___) {
  b.warn("setColorName");
  const mode = s.getActiveMode();
  mode.activeColorIndex = sender.propAsInt("index");
  await b.savePageData("data", s.data);
  b.trigger(
    "setColorNameStyles updateHueOffset updateColorValue updateCSS updateActiveColor",
  );
}

export function setColorNameStyles(_, __, el) {
  b.warn("setColorNameStyles");
  const mode = s.getActiveMode();
  if (el.propAsInt("index") === mode.activeColorIndex) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}

export async function setColorValue(_, sender, ___) {
  b.warn("setColorValue");
  requestAnimationFrame(async () => {
    const mode = s.getActiveMode();
    mode.colors[mode.activeColorIndex][`__${sender.prop("key")}__`] = sender
      .valueAsFloat();
    await b.savePageData("data", s.data);
    b.trigger("updateCSS");
  });
}

export async function setHueOffset(_, sender, el) {
  b.warn("setHueOffset");
  const mode = s.getActiveMode();
  mode.colors[mode.activeColorIndex][`__H_OFFSET__`] = sender.propAsInt(
    "index",
  );
  await b.savePageData("data", s.data);
  b.trigger("updateHueOffset updateColorValue updateCSS");
}

export function updateHueOffset(_, __, el) {
  b.warn("updateHueOffset");
  const mode = s.getActiveMode();
  if (
    el.propAsInt("index") === mode.colors[mode.activeColorIndex][`__H_OFFSET__`]
  ) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}

export async function setMode(_, sender, ___) {
  b.warn("setMode");
  s.data.activeMode = sender.prop("key");
  setSwitches(s.data.activeMode);
  await b.savePageData("data", s.data);
  b.trigger(`
updateColorValue 
updateBackgroundValue 
setColorNameStyles
updateActiveColor
`);
}

export async function setParam(_, sender, ___) {
  b.warn("setParam");
  await requestAnimationFrame(async () => {
    s.setActiveValue(sender.prop("key"), sender.valueAsFloat());
    await b.savePageData("data", s.data);
    b.trigger("updateCSS");
  });
}

export function updateActiveColor(_, __, el) {
  const mode = s.getActiveMode();
  const targetColor = s.data.colorNames[mode.activeColorIndex];
  if (el.prop("key") === targetColor) {
    el.classList.remove("inactiveColor");
  } else {
    el.classList.add("inactiveColor");
  }
  if (s.data.monoNames.includes(el.prop("key"))) {
    el.classList.remove("inactiveColor");
  }
}

export function updateBackgroundValue(_, __, el) {
  b.warn("updateBackgroundValue");
  const mode = s.getActiveMode();
  el.value = mode.background[`${el.prop("key")}`];
}

export function updateColorValue(_, __, el) {
  b.warn("updateColorValue");
  const mode = s.getActiveMode();
  const v = mode.colors[mode.activeColorIndex][`__${el.prop("key")}__`];
  el.value = mode.colors[mode.activeColorIndex][`__${el.prop("key")}__`];
}

export function updateCSS(_, __, el) {
  b.warn("updateCSS");

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
}

function makePageVars(variables) {
  return `:root {
${
    variables.map((vv) => {
      return vv[0] + ": " + vv[1] + ";";
    }).join("\n")
  }
}
`;
}

function makeSwitches(mode) {
  const background = [
    `--background: var(--switch--background, var(--${mode}--background));`,
  ];
  const colorScheme = [
    `--color-scheme: var(--switch--color-scheme, var(--${mode}--color-scheme));`,
  ];
  const colors1 = s.data.colorNames.map((color) => {
    return `--default-${color}-color: var(--switch--default-${color}-color, var(--${mode}--default-${color}-color));`;
  });
  const colors2 = s.data.colorNames.map((color) => {
    return `--faded-${color}-color: var(--switch--faded-${color}-color, var(--${mode}--faded-${color}-color));`;
  });
  const colors3 = s.data.colorNames.map((color) => {
    return `--faint-${color}-color: var(--switch--faint-${color}-color, var(--${mode}--faint-${color}-color));`;
  });
  const monos1 = s.data.monoNames.map((color) => {
    return `--default-${color}-color: var(--switch--default-${color}-color, var(--${mode}--default-${color}-color));`;
  });
  const monos2 = s.data.monoNames.map((color) => {
    return `--faded-${color}-color: var(--switch--faded-${color}-color, var(--${mode}--faded-${color}-color));`;
  });
  const monos3 = s.data.monoNames.map((color) => {
    return `--faint-${color}-color: var(--switch--faint-${color}-color, var(--${mode}--faint-${color}-color));`;
  });

  const output = [
    ...colorScheme,
    ...background,
    ...colors1,
    ...colors2,
    ...colors3,
    ...monos1,
    ...monos2,
    ...monos3,
  ];
  return output.join("\n");
}

function makeClasses() {
  const background = [
    `.background { color: var(--background); }`,
  ];
  const colors1 = s.data.colorNames.map((color) => {
    return `.default-${color}-color { color: var(--default-${color}-color); }`;
  });
  const colors2 = s.data.colorNames.map((color) => {
    return `.faded-${color}-color { color: var(--faded-${color}-color); }`;
  });
  const colors3 = s.data.colorNames.map((color) => {
    return `.faint-${color}-color { color: var(--faint-${color}-color); }`;
  });
  const monos1 = s.data.monoNames.map((color) => {
    return `.default-${color}-color { color: var(--default-${color}-color); }`;
  });
  const monos2 = s.data.monoNames.map((color) => {
    return `.faded-${color}-color { color: var(--faded-${color}-color); }`;
  });
  const monos3 = s.data.monoNames.map((color) => {
    return `.faint-${color}-color { color: var(--faint-${color}-color); }`;
  });
  const output = [
    ...background,
    ...colors1,
    ...colors2,
    ...colors3,
    ...monos1,
    ...monos2,
    ...monos3,
  ];
  return output.join("\n");
}

function makeUiVars() {
  const activeMode = s.getActiveMode();
  const activeColorIndex = activeMode.activeColorIndex;
  const activeColor = activeMode.colors[activeColorIndex];
  const output = [];
  for (let i = 0; i < 8; i += 1) {
    const key = `--ui-set-${i}`;
    const rotation = ((s.data.hueRotation * i) +
      activeMode.background.__H__) % 360;
    const value =
      `oklch(${activeColor.__L__} ${activeColor.__C__} ${rotation})`;
    output.push([key, value]);
  }
  const out2 = output.map((x) => {
    return `${x[0]}: ${x[1]};`;
  });
  return `:root { ${out2.join("\n")}}`;
}

function makeUiClasses() {
  const activeMode = s.getActiveMode();
  const activeColorIndex = activeMode.activeColorIndex;
  const activeColor = activeMode.colors[activeColorIndex];
  const output = [];
  for (let i = 0; i < 8; i += 1) {
    const key = `.ui-set-${i}`;
    const value = `var(--ui-set-${i})`;
    output.push([key, value]);
  }
  const out2 = output.map((x) => {
    return `${x[0]} { color: ${x[1]}; }`;
  });
  return out2.join("\n");
}

function generatePageVariables() {
  let variables = [];
  for (let mode of s.data.modes) {
    variables.push(
      [
        `--${mode.__KEY__}--color-scheme`,
        mode.__KEY__,
      ],
    );
    variables.push(
      [
        `--${mode.__KEY__}--background`,
        `oklch(${mode.background.__L__} ${mode.background.__C__} ${mode.background.__H__})`,
      ],
    );

    s.data.colorNames.forEach((name, index) => {
      const color = mode.colors[index];
      const key = `--${mode.__KEY__}--default-${name}-color`;
      const rotation = ((s.data.hueRotation * color.__H_OFFSET__) +
        mode.background.__H__) % 360;
      const value = `oklch(${color.__L__} ${color.__C__} ${rotation})`;
      variables.push([key, value]);
    });

    s.data.colorNames.forEach((name, index) => {
      const color = mode.colors[index];
      const key = `--${mode.__KEY__}--faded-${name}-color`;
      const rotation = ((s.data.hueRotation * color.__H_OFFSET__) +
        mode.background.__H__) % 360;
      const value =
        `oklch(${color.__L__} ${color.__C__} ${rotation} / ${color.__FADED__})`;
      variables.push([key, value]);
    });

    s.data.colorNames.forEach((name, index) => {
      const color = mode.colors[index];
      const key = `--${mode.__KEY__}--faint-${name}-color`;
      const rotation = ((s.data.hueRotation * color.__H_OFFSET__) +
        mode.background.__H__) % 360;
      const value =
        `oklch(${color.__L__} ${color.__C__} ${rotation} / ${color.__FAINT__})`;
      variables.push([key, value]);
    });
  }

  for (let mode of s.data.modes) {
    const monos = mode.monos;
    Object.keys(monos).forEach((mono) => {
      variables.push([
        `--${mode.__KEY__}--default-${mono}-color`,
        `oklch(${monos[mono].__LIGHTNESS__} 0 0)`,
      ]);
      variables.push([
        `--${mode.__KEY__}--faded-${mono}-color`,
        `oklch(${monos[mono].__LIGHTNESS__} 0 0 / ${monos[mono].__FADED__})`,
      ]);
      variables.push([
        `--${mode.__KEY__}--faint-${mono}-color`,
        `oklch(${monos[mono].__LIGHTNESS__} 0 0 / ${monos[mono].__FAINT__})`,
      ]);
    });
  }
  return variables;
}

function setSwitches(mode) {
  b.setCSS(
    `--switch--background`,
    `var(--${mode}--background)`,
  );
  s.data.colorTypes.forEach((t) => {
    b.setCSS(
      `--switch--color-scheme`,
      `var(--${mode}--color-scheme)`,
    );
    s.data.colorNames.forEach((name) => {
      b.setCSS(
        `--switch--${t}-${name}-color`,
        `var(--${mode}--${t}-${name}-color)`,
      );
    });
    b.setCSS(
      `--switch--${t}-black-color`,
      `var(--${mode}--${t}-black-color)`,
    );
    b.setCSS(
      `--switch--${t}-white-color`,
      `var(--${mode}--${t}-white-color)`,
    );
    b.setCSS(
      `--switch--${t}-match-color`,
      `var(--${mode}--${t}-match-color)`,
    );
    b.setCSS(
      `--switch--${t}-reverse-color`,
      `var(--${mode}--${t}-reverse-color)`,
    );
  });
}

export async function copyThis(_, sender, el) {
  await b.quickCopy(el, sender);
}
