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
  const fadeTypes = ["faded"];
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const colors = mode.colors;
  // fadeTypes.forEach((ft) => {
  //   Object.entries(colors).forEach(([key, content]) => {
  //     const values = content.values;
  //     const oklch = `oklch(${values.lightness} ${values.chroma} ${
  //       hueRotate(
  //         mode.background.hue,
  //         content.hueOffset,
  //       )
  //     } / ${values[ft]})`;
  //     target.push(
  //       `--${m}--${ft}-${key}-color: ${oklch};`,
  //     );
  //   });
  // });
}

function addMonoFadeVars(m) {
  const fadeTypes = ["faded"];
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const monos = mode.monos;
  // fadeTypes.forEach((ft) => {
  //   Object.entries(monos).forEach(([key, values]) => {
  //     const oklch = `oklch(${values.lightness} 0 0 / ${values[ft]})`;
  //     target.push(
  //       `--${m}--${ft}-${key}-color: ${oklch};`,
  //     );
  //   });
  // });
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
    `--${m}--background-color: oklch(${s.data.modes[m].background.lightness} ${
      s.data.modes[m].background.chroma
    } ${s.data.modes[m].background.hue});`,
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
      `.${key}-color { color: var(--${key}-color); }`,
    );
    target.push(
      `.${key}-background-color { background-color: var(--${key}-color); }`,
    );
  });
}

function addMonoDefaultClasses(m) {
  const target = css.classes;
  const mode = s.data.modes[m];
  const monos = mode.monos;
  Object.entries(monos).forEach(([key, content]) => {
    target.push(
      `.${key}-color { color: var(--${key}-color); }`,
    );
    target.push(
      `.${key}-background-color { background-color: var(--${key}-color); }`,
    );
  });
}

function addColorFadeClasses(m) {
  const fadeTypes = ["faded"];
  const target = css.classes;
  const mode = s.data.modes[m];
  const colors = mode.colors;
  fadeTypes.forEach((ft) => {
    // Object.entries(colors).forEach(([key, content]) => {
    // target.push(
    //   `.${ft}-${key}-color { color: var(--${ft}-${key}-color); }`,
    // );
    // target.push(
    //   `.${ft}-${key}-background-color { background-color: var(--${ft}-${key}-color); }`,
    // );
    // });
  });
}

function addMonoFadeClasses(m) {
  const fadeTypes = ["faded"];
  const target = css.classes;
  const mode = s.data.modes[m];
  const monos = mode.monos;
  fadeTypes.forEach((ft) => {
    // Object.entries(monos).forEach(([key, content]) => {
    //   target.push(
    //     `.${ft}-${key}-color { color: var(--${ft}-${key}-color); }`,
    //   );
    //   target.push(
    //     `.${ft}-${key}-background-color { background-color: var(--${ft}-${key}-color); }`,
    //   );
    // });
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
      `--${m}--${key}-color: ${oklch};`,
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
      `--${m}--${key}-color: ${oklch};`,
    );
  });
}

function addColorFadeSwitches(m) {
  const fadeTypes = ["faded"];
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const colors = mode.colors;
  // fadeTypes.forEach((ft) => {
  //   Object.entries(colors).forEach(([key, content]) => {
  //     target.push(
  //       `--${ft}-${key}-color: var(--switch--${ft}-${key}-color, var(--${m}--${ft}-${key}-color));`,
  //     );
  //   });
  // });
}

function addMonoFadeSwitches(m) {
  const fadeTypes = ["faded"];
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const monos = mode.monos;
  // fadeTypes.forEach((ft) => {
  //   Object.entries(monos).forEach(([key, content]) => {
  //     target.push(
  //       `--${ft}-${key}-color: var(--switch--${ft}-${key}-color, var(--${m}--${ft}-${key}-color));`,
  //     );
  //   });
  // });
}

function addColorDefaultSwitches(m) {
  const target = css.modes[m];
  target.push(
    `--background-color: var(--switch--background-color, var(--${m}--background-color));`,
  );
  const mode = s.data.modes[m];
  const colors = mode.colors;
  Object.entries(colors).forEach(([key, content]) => {
    target.push(
      `--${key}-color: var(--switch--${key}-color, var(--${m}--${key}-color));`,
    );
  });
}

function addMonoDefaultSwitches(m) {
  const target = css.modes[m];
  const mode = s.data.modes[m];
  const monos = mode.monos;
  Object.entries(monos).forEach(([key, content]) => {
    target.push(
      `--${key}-color: var(--switch--${key}-color, var(--${m}--${key}-color));`,
    );
  });
}
