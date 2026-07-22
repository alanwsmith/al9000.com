const defaults = {
  hueRotation: 60,
  activeMode: "light",
  colorNames: ["base", "heading", "link", "accent", "warning"],
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
    __T__: {
      __NAME__: "Texture",
      __MIN__: 0,
      __MAX__: 100,
      __STEP__: 0.1,
    },
  },
  modes: [
    {
      __KEY__: "light",
      activeColorIndex: 0,
      background: {
        __L__: 0.7,
        __C__: 0.1,
        __H__: 200,
        __T__: 0,
      },
      colors: [
        {
          __L__: 0.3,
          __C__: 0.1,
          __H_OFFSET__: 0,
          __80__: 0.8,
          __20__: 0.2,
        },
        {
          __L__: 0.3,
          __C__: 0.1,
          __H_OFFSET__: 0,
          __80__: 0.8,
          __20__: 0.2,
        },
        {
          __L__: 0.3,
          __C__: 0.1,
          __H_OFFSET__: 0,
          __80__: 0.8,
          __20__: 0.2,
        },
        {
          __L__: 0.3,
          __C__: 0.1,
          __H_OFFSET__: 0,
          __80__: 0.8,
          __20__: 0.2,
        },
        {
          __L__: 0.3,
          __C__: 0.1,
          __H_OFFSET__: 0,
          __80__: 0.8,
          __20__: 0.2,
        },
      ],
    },
    {
      __KEY__: "dark",
      activeColorIndex: 0,
      background: {
        __L__: 0.2,
        __C__: 0.1,
        __H__: 30,
        __T__: 0,
      },
      colors: [
        {
          __L__: 0.8,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __80__: 0.8,
          __20__: 0.2,
        },
        {
          __L__: 0.8,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __80__: 0.8,
          __20__: 0.2,
        },
        {
          __L__: 0.8,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __80__: 0.8,
          __20__: 0.2,
        },
        {
          __L__: 0.8,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __80__: 0.8,
          __20__: 0.2,
        },
        {
          __L__: 0.8,
          __C__: 0.2,
          __H_OFFSET__: 0,
          __80__: 0.8,
          __20__: 0.2,
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
  // await b.savePageData("data", defaults);
  s.data = await b.loadPageData("data", defaults);
  b.trigger(
    "initBackgroundSliders initColorNameButtons initHueOffsetButtons initModeButtons initColorSliders",
  );
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
    __80__: color.__80__,
    __20__: color.__20__,
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

export async function setColorName(_, sender, ___) {
  const mode = s.getActiveMode();
  mode.activeColorIndex = sender.propAsInt("index");
  await b.savePageData("data", s.data);
  b.trigger("setColorNameStyles");
}

export function setColorNameStyles(_, __, el) {
  const mode = s.getActiveMode();
  if (el.propAsInt("index") === mode.activeColorIndex) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}

export async function setColorValue(_, sender, ___) {
  await requestAnimationFrame(async () => {
    const mode = s.getActiveMode();
    mode.colors[mode.activeColorIndex][`__${sender.prop("key")}__`] = sender
      .valueAsFloat();
    await b.savePageData("data", s.data);
  });
}

export async function setHueOffset(_, sender, el) {
  if (el.propAsInt("index") === sender.propAsInt("index")) {
    el.classList.add("active");
    await b.savePageData("data", s.data);
  } else {
    el.classList.remove("active");
  }
  b.trigger("updateColorValue");
}

export async function setMode(_, sender, ___) {
  s.data.activeMode = sender.prop("key");
  await b.savePageData("data", s.data);
  b.trigger("updateColorValue updateBackgroundValue setColorNameStyles");
}

export async function setParam(_, sender, ___) {
  await requestAnimationFrame(async () => {
    s.setActiveValue(sender.prop("key"), sender.valueAsFloat());
    await b.savePageData("data", s.data);
    b.trigger("updateCSS");
  });
}

export function updateBackgroundValue(_, __, el) {
  const mode = s.getActiveMode();
  el.value = mode.background[`${el.prop("key")}`];
}

export function updateColorValue(_, __, el) {
  const mode = s.getActiveMode();
  el.value = mode.colors[mode.activeColorIndex][`__${el.prop("key")}__`];
}

export function updateCSS(_, __, ___) {
  for (let mode of s.data.modes) {
    b.setCSS(
      `--${mode.__KEY__}--default-background-color`,
      `oklch(${mode.background.__L__} ${mode.background.__C__} ${mode.background.__H__})`,
    );
  }
}