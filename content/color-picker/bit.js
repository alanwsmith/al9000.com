let sheet = new CSSStyleSheet();

const defaults = {
  logLevel: "DEBUG",
  hueRotation: 45,
  activeMode: "light",
  colorNames: ["base", "heading", "info", "accent", "warning"],
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
        __L__: 0.92,
        __C__: 0.05,
        __H__: 70,
        __T__: 0,
      },
      colors: [
        {
          __L__: 0.3,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __LIGHTER__: 0.8,
          __LIGHTEST__: 0.2,
        },
        {
          __L__: 0.4,
          __C__: 0.16,
          __H_OFFSET__: 3,
          __LIGHTER__: 0.8,
          __LIGHTEST__: 0.2,
        },
        {
          __L__: 0.54,
          __C__: 0.26,
          __H_OFFSET__: 5,
          __LIGHTER__: 0.8,
          __LIGHTEST__: 0.2,
        },
        {
          __L__: 0.62,
          __C__: 0.2,
          __H_OFFSET__: 2,
          __LIGHTER__: 0.8,
          __LIGHTEST__: 0.2,
        },
        {
          __L__: 0.6,
          __C__: 0.27,
          __H_OFFSET__: 4,
          __LIGHTER__: 0.8,
          __LIGHTEST__: 0.2,
        },
      ],
    },
    {
      __KEY__: "dark",
      activeColorIndex: 0,
      background: {
        __L__: 0.2,
        __C__: 0.2,
        __H__: 30,
        __T__: 0,
      },
      colors: [
        {
          __L__: 0.8,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __LIGHTER__: 0.8,
          __LIGHTEST__: 0.2,
        },
        {
          __L__: 0.8,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __LIGHTER__: 0.8,
          __LIGHTEST__: 0.2,
        },
        {
          __L__: 0.8,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __LIGHTER__: 0.8,
          __LIGHTEST__: 0.2,
        },
        {
          __L__: 0.8,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __LIGHTER__: 0.8,
          __LIGHTEST__: 0.2,
        },
        {
          __L__: 0.8,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __LIGHTER__: 0.8,
          __LIGHTEST__: 0.2,
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
    "initBaseStyles initBackgroundSliders initColorNameButtons initHueOffsetButtons initModeButtons initColorSliders",
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
  b.trigger("setColorNameStyles");
}

export function initColorSliders(_, __, el) {
  const mode = s.getActiveMode();
  const color = s.getActiveMode().colors[mode.activeColorIndex];
  const subs = {
    __L__: color.__L__,
    __C__: color.__C__,
    __LIGHTER__: color.__LIGHTER__,
    __LIGHTEST__: color.__LIGHTEST__,
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
}

export async function resetDefaults() {
  await b.clearPageData();
  location.reload();
}

export async function setLogLevel(_, sender, ___) {
  b.setLogLevel(sender.prop("key"));
  s.data.logLevel = sender.prop("key");
  await b.savePageData("data", s.data);
}

export async function setColorName(_, sender, ___) {
  b.warn("setColorName");
  const mode = s.getActiveMode();
  mode.activeColorIndex = sender.propAsInt("index");
  await b.savePageData("data", s.data);
  b.trigger("setColorNameStyles updateHueOffset updateColorValue updateCSS");
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
  await b.savePageData("data", s.data);
  b.trigger("updateColorValue updateBackgroundValue setColorNameStyles");
}

export async function setParam(_, sender, ___) {
  b.warn("setParam");
  await requestAnimationFrame(async () => {
    s.setActiveValue(sender.prop("key"), sender.valueAsFloat());
    await b.savePageData("data", s.data);
    b.trigger("updateCSS");
  });
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

  const variableValues = generatePageVariables();

  variableValues.forEach((vv) => {
    b.setCSS(vv[0], vv[1]);
  });

  const sheetParts = [
    makePageVars(variableValues),
    `:root { ${makeSwitches("light")} }`,
    `@media (prefers-color-scheme: dark) { :root { ${makeSwitches("dark")} }}`,
    makeClasses(),
  ].join("\n");

  el.innerHTML = sheetParts;

  const combinedSheet = `${sheetParts}
  ${makeUiVars()}
  ${makeUiClasses()}`;

  sheet.replaceSync(combinedSheet);
}

function makePageVars(variableValues) {
  return `:root { ${
    variableValues.map((vv) => {
      return vv[0] + ": " + vv[1] + ";";
    }).join("\n")
  }}`;
}

function makeSwitches(mode) {
  const background = [
    `--default-background-color: var(--switch--background-color, var(--${mode}--default-background-color));`,
    `--lighter-background-color: var(--switch--background-color, var(--${mode}--lighter-background-color));`,
    `--lightest-background-color: var(--switch--background-color, var(--${mode}--lightest-background-color));`,
  ];
  const colors1 = s.data.colorNames.map((color) => {
    return `--default-${color}-color: var(--switch--${color}-color, var(--${mode}--default-${color}-color));`;
  });
  const colors2 = s.data.colorNames.map((color) => {
    return `--lighter-${color}-color: var(--switch--${color}-color, var(--${mode}--lighter-${color}-color));`;
  });
  const colors3 = s.data.colorNames.map((color) => {
    return `--lightest-${color}-color: var(--switch--${color}-color, var(--${mode}--lightest-${color}-color));`;
  });
  const output = [...background, ...colors1, ...colors2, ...colors3];
  return output.join("\n");
}

function makeClasses() {
  const background = [
    `.default-background-color { color: var(--default-background-color); }`,
    `.lighter-background-color { color: var(--lighter-background-color); }`,
    `.lightest-background-color { color: var(--lightest-background-color); }`,
  ];
  const colors1 = s.data.colorNames.map((color) => {
    return `.default-${color}-color { color: var(--default-${color}-color); }`;
  });
  const colors2 = s.data.colorNames.map((color) => {
    return `.lighter-${color}-color { color: var(--lighter-${color}-color); }`;
  });
  const colors3 = s.data.colorNames.map((color) => {
    return `.lightest-${color}-color { color: var(--lightest-${color}-color); }`;
  });
  const output = [...background, ...colors1, ...colors2, ...colors3];
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
  let variableValues = [];
  for (let mode of s.data.modes) {
    variableValues.push(
      [
        `--${mode.__KEY__}--default-background-color`,
        `oklch(${mode.background.__L__} ${mode.background.__C__} ${mode.background.__H__})`,
      ],
      [
        `--${mode.__KEY__}--lighter-background-color`,
        `oklch(${mode.background.__L__} ${mode.background.__C__} ${mode.background.__H__} / 0.8)`,
      ],
      [
        `--${mode.__KEY__}--lightest-background-color`,
        `oklch(${mode.background.__L__} ${mode.background.__C__} ${mode.background.__H__} / 0.2)`,
      ],
    );

    s.data.colorNames.forEach((name, index) => {
      const color = mode.colors[index];
      const key = `--${mode.__KEY__}--default-${name}-color`;
      const rotation = ((s.data.hueRotation * color.__H_OFFSET__) +
        mode.background.__H__) % 360;
      const value = `oklch(${color.__L__} ${color.__C__} ${rotation})`;
      variableValues.push([key, value]);
    });

    s.data.colorNames.forEach((name, index) => {
      const color = mode.colors[index];
      const key = `--${mode.__KEY__}--lighter-${name}-color`;
      const rotation = ((s.data.hueRotation * color.__H_OFFSET__) +
        mode.background.__H__) % 360;
      const value = `oklch(${color.__L__} ${color.__C__} ${rotation} / 0.8)`;
      variableValues.push([key, value]);
    });

    s.data.colorNames.forEach((name, index) => {
      const color = mode.colors[index];
      const key = `--${mode.__KEY__}--lightest-${name}-color`;
      const rotation = ((s.data.hueRotation * color.__H_OFFSET__) +
        mode.background.__H__) % 360;
      const value = `oklch(${color.__L__} ${color.__C__} ${rotation} / 0.2)`;
      variableValues.push([key, value]);
    });
  }
  return variableValues;
}

export async function copyThis(_, sender, el) {
  await b.quickCopy(el, sender);
}
