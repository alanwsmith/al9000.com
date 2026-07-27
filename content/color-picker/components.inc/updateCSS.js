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
  addDefaultSwitches("light");
  addDefaultClasses("light");

  l.push(`}`);
  d.push(`}}`);

  output = [...l, ...d, ...r, ...c];
  el.innerHTML = output.join("\n");
  addUI();
  sheet.replaceSync(output.join("\n"));
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
