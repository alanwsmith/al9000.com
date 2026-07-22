class State {
  constructor() {
    this.data = {
      activeMode: "light",
      config: {
        __L__: {
          __MIN__: 0,
          __MAX__: 1,
          __STEP__: 0.001,
        },
        __C__: {
          __MIN__: 0,
          __MAX__: 0.3,
          __STEP__: 0.0001,
        },
        __H__: {
          __MIN__: 0,
          __MAX__: 360,
          __STEP__: 0.01,
        },
      },
      modes: [
        {
          __KEY__: "light",
          background: {
            __L__: 0.7,
            __C__: 0.1,
            __H__: 200,
          },
        },
        {
          __KEY__: "dark",
          background: {
            __L__: 0.2,
            __C__: 0.1,
            __H__: 30,
          },
        },
      ],
    };
  }
  activeMode() {
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
  s.data = await b.loadPageData("data", s.data);
  b.trigger("initModeButtons initBackgroundSliders");
}

export function initBackgroundSliders(_, __, el) {
  const mode = s.activeMode();
  for (let key of Object.keys(s.data.config)) {
    const subs = {
      __KEY__: key,
      __MIN__: s.data.config[key].__MIN__,
      __MAX__: s.data.config[key].__MAX__,
      __STEP__: s.data.config[key].__STEP__,
      __VALUE__: mode.background[key],
    };
    el.appendChild(
      b.render("backgroundSlider", subs),
    );
  }
  b.trigger("updateStyles");
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

export async function setMode(_, sender, ___) {
  s.data.activeMode = sender.prop("key");
  await b.savePageData(s.data, "data");
}

export function setParam(_, sender, ___) {
  requestAnimationFrame(() => {
    b.send(sender, "updateParam");
  });
}

export async function updateParam(payload, __, ___) {
  s.setActiveValue(payload.prop("key"), payload.valueAsFloat());
  await b.savePageData(s.data, "data");
  b.trigger("updateStyles");
}

export function updateStyles(_, __, ___) {
  for (let mode of s.data.modes) {
    b.setCSS(
      `--${mode.__KEY__}--default-background-color`,
      `oklch(${mode.background.__L__} ${mode.background.__C__} ${mode.background.__H__})`,
    );
  }
}
