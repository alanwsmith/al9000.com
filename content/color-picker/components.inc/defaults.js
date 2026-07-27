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
  colorKeys: ["base", "heading", "accent", "info", "warning"],
  colorTypes: ["default", "faded", "faint"],
  monoNames: ["black", "white", "match", "reverse"],
  monoMap: {
    "faded": "faded",
    "faint": "faint",
  },
  monoSliders: [
    { key: "faded", name: "Faded", token: "faded" },
    { key: "faint", name: "Faint", token: "faint" },
  ],
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
        "base": {
          lightness: 0.3,
          chroma: 0.12,
          hueOffset: 4,
          faded: 0.6,
          faint: 0.12,
        },
        "heading": {
          lightness: 0.4,
          chroma: 0.16,
          hueOffset: 3,
          faded: 0.6,
          faint: 0.12,
        },
        "accent": {
          lightness: 0.54,
          chroma: 0.126,
          hueOffset: 5,
          faded: 0.6,
          faint: 0.12,
        },
        "info": {
          lightness: 0.62,
          chroma: 0.12,
          hueOffset: 2,
          faded: 0.6,
          faint: 0.12,
        },
        "warning": {
          lightness: 0.6,
          chroma: 0.127,
          hueOffset: 4,
          faded: 0.6,
          faint: 0.12,
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
          lightness: 0.883,
          chroma: 0.0372,
          hueOffset: 6,
          faded: 0.6,
          faint: 0.12,
        },
        heading: {
          lightness: 0.773,
          chroma: 0.12,
          hueOffset: 2,
          faded: 0.6,
          faint: 0.12,
        },
        accent: {
          lightness: 0.62,
          chroma: 0.08,
          hueOffset: 3,
          faded: 0.6,
          faint: 0.12,
        },
        info: {
          lightness: 0.93,
          chroma: 0.15,
          hueOffset: 3,
          faded: 0.6,
          faint: 0.12,
        },
        warning: {
          lightness: 0.7,
          chroma: 0.122,
          hueOffset: 4,
          faded: 0.6,
          faint: 0.12,
        },
      },
    },
  },
};
