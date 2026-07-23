  export async function copyThis(_, sender, el) {
  await b.quickCopy(el, sender);
}

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
  export function initBaseStyles() {
  const theStyles = ``;
  sheet.replaceSync(theStyles);
  document.adoptedStyleSheets.push(sheet);
}
  export function initColorNameButtons(_, __, el) {
  s.data.colorNames.forEach((name, index) => {
    const subs = {
      __INDEX__: index,
      __COLOR__: name,
      __COLOR_LETTER__: name.charAt(0),
    };
    el.appendChild(b.render("colorNameButton", subs));
  });
  b.trigger("uColorName");
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
`,
  );
}


  
function makeClasses() {
  const background = [
    `.background { color: var(--background); }`,
  ];
  // TODO: Move these individual arrays into
  // the collections array.
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

  const collection = [];
  s.data.colorNames.forEach((color) => {
    collection.push(
      `.default-${color}-background-color { background-color: var(--default-${color}-color); }`,
      `.faded-${color}-background-color { background-color: var(--faded-${color}-color); }`,
      `.faint-${color}-background-color { background-color: var(--faint-${color}-color); }`,
    );
  });

  const output = [
    ...background,
    ...colors1,
    ...colors2,
    ...colors3,
    ...monos1,
    ...monos2,
    ...monos3,
    ...collection,
  ];
  return output.join("\n");
}

  function makePageVars(variables) {
  return `:root {
${variables.map((vv) => {
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

  output.forEach((x) => {
    out2.push(
      `${
        x[0]
      }.set-active { color: var(--default-match-color); background-color: ${
        x[1]
      }; }`,
    );
  });

  return out2.join("\n");
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

  export async function resetDefaults() {
  await b.clearPageData();
  location.reload();
}

  export async function sColor(_, sender, ___) {
  b.trace("sColorName");
  const mode = s.getActiveMode();
  mode.activeColorIndex = sender.propAsInt("index");
  await b.savePageData("data", s.data);
  b.trigger(
    "updateCSS",
  );
}


  
export async function setColorValue(_, sender, ___) {
  b.trace("setColorValue");
  requestAnimationFrame(async () => {
    const mode = s.getActiveMode();
    mode.colors[mode.activeColorIndex][`__${sender.prop("key")}__`] = sender
      .valueAsFloat();
    await b.savePageData("data", s.data);
    b.trigger("updateCSS");
  });
}
  export async function setHueOffset(_, sender, el) {
  b.trace("setHueOffset");
  const mode = s.getActiveMode();
  mode.colors[mode.activeColorIndex][`__H_OFFSET__`] = sender.propAsInt(
    "index",
  );
  await b.savePageData("data", s.data);
  b.trigger("updateCSS");
}
  export async function setLogLevel(_, sender, ___) {
  b.setLogLevel(sender.prop("key"));
  s.data.logLevel = sender.prop("key");
  b.info(`Log level set to: ${sender.prop("key")}`);
  await b.savePageData("data", s.data);
}
  export async function sMode(_, sender, ___) {
  b.trace("sMode");
  s.data.activeMode = sender.prop("key");
  setSwitches(s.data.activeMode);
  await b.savePageData("data", s.data);
  b.trigger(`updateCSS`);
}

  export async function setParam(_, sender, ___) {
  b.trace("setParam");
  await requestAnimationFrame(async () => {
    s.setActiveValue(sender.prop("key"), sender.valueAsFloat());
    await b.savePageData("data", s.data);
    b.trigger("updateCSS");
  });
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
  export function uBackgroundValue(_, __, el) {
  b.trace("uBackgroundValue");
  const mode = s.getActiveMode();
  el.value = mode.background[`${el.prop("key")}`];
}

  export function updateCSS(_, __, el) {
  b.trace("updateCSS");
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
  b.trigger("uBackgroundValue uColorButton uColorName uHueOffset");
}

  export function uColorButton(_, __, el) {
  b.trace("setColorNameStyles");
  b.info(el);
  // const mode = s.getActiveMode();
  // if (el.propAsInt("index") === mode.activeColorIndex) {
  //   el.classList.add("active");
  // } else {
  //   el.classList.remove("active");
  // }
}

  export function uColorName(_, __, el) {
  b.trace("uColorName");
  const mode = s.getActiveMode();
  s.data.colorNames.forEach((name) => {
    if (s.data.colorNames[mode.activeColorIndex] === name) {
      el.innerHTML = name;
      el.classList.add(`default-${name}-background-color`);
    } else {
      el.classList.remove(`default-${name}-background-color`);
    }
  });
}

  
export function updateColorValue(_, __, el) {
  b.trace("updateColorValue");
  const mode = s.getActiveMode();
  const v = mode.colors[mode.activeColorIndex][`__${el.prop("key")}__`];
  el.value = mode.colors[mode.activeColorIndex][`__${el.prop("key")}__`];
}

  export function updateHueOffset(_, __, el) {
  b.trace("updateHueOffset");
  const mode = s.getActiveMode();
  if (
    el.propAsInt("index") === mode.colors[mode.activeColorIndex][`__H_OFFSET__`]
  ) {
    el.classList.add("set-active");
  } else {
    el.classList.remove("set-active");
  }
}



let sheet = new CSSStyleSheet();
let s = new State();
export const b = {
  init: "init",
};