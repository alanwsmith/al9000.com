const defaults = {
  baseCSS: `
:root {
  color-scheme: var(--color-scheme);
}

body { 
  background-color: var(--background-color);
  background-image: var(--background-image);
  background-repeat: repeat;
  background-size: 150px 150px;
  color: var(--base-color);
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
      activeBlock: "faded-accent",
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
        },
        "white": {
          alt: "match",
          lightness: 1,
          faded: 0.2,
        },
      },
      colors: {
        base: {
          hueOffset: 4,
          values: {
            lightness: 0.3,
            chroma: 0.12,
            faded: 0.6,
          },
        },
        heading: {
          hueOffset: 3,
          values: {
            lightness: 0.4,
            chroma: 0.16,
            faded: 0.6,
          },
        },
        accent: {
          hueOffset: 5,
          values: {
            lightness: 0.54,
            chroma: 0.126,
            faded: 0.6,
          },
        },
        info: {
          hueOffset: 2,
          values: {
            lightness: 0.62,
            chroma: 0.12,
            faded: 0.6,
          },
        },
        warning: {
          hueOffset: 4,
          values: {
            lightness: 0.6,
            chroma: 0.127,
            faded: 0.6,
          },
        },
      },
    },
    "dark": {
      activeColor: "base",
      activeMonoKey: "black",
      activeBlock: "faded-base",
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
        },
        "white": {
          alt: "reverse",
          lightness: 1,
          faded: 0.4,
        },
      },
      colors: {
        base: {
          hueOffset: 6,
          values: {
            lightness: 0.883,
            chroma: 0.0372,
            faded: 0.6,
          },
        },
        heading: {
          hueOffset: 2,
          values: {
            lightness: 0.773,
            chroma: 0.12,
            faded: 0.6,
          },
        },
        accent: {
          hueOffset: 3,
          values: {
            lightness: 0.62,
            chroma: 0.08,
            faded: 0.6,
          },
        },
        info: {
          hueOffset: 3,
          values: {
            lightness: 0.93,
            chroma: 0.15,
            faded: 0.6,
          },
        },
        warning: {
          hueOffset: 4,
          values: {
            lightness: 0.7,
            chroma: 0.122,
            faded: 0.6,
          },
        },
      },
    },
  },
};
