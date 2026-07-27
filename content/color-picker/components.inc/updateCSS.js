let output = [];

export function updateCSS(_, __, el) {
  output = [];
  addBaseCSS();
  addDefaultLightVars();
  addDefaultLightSwitches();
  el.innerHTML = output.join("\n");

  sheet.replaceSync(output.join("\n"));
}

function hueRotate(value, index) {
  const adjust = index * s.data.hueRotation;
  return (value + adjust) % 360;
}

function addBaseCSS() {
  output.push(s.data.baseCSS);
}

function addDefaultLightVars() {
  output.push(`:root {`);
  const mode = s.data.modes.light;
  const colors = mode.colors;
  Object.entries(colors).forEach(([key, content]) => {
    const values = content.values;
    const oklch = `oklch(${values.lightness} ${values.chroma} ${
      hueRotate(
        mode.background.hue,
        content.hueOffset,
      )
    })`;
    output.push(
      `--light--default-${key}-color: ${oklch};`,
    );
  });
  output.push(`}`);
}

function addDefaultLightSwitches() {
  output.push(`:root {`);
  const mode = s.data.modes.light;
  const colors = mode.colors;
  Object.entries(colors).forEach(([key, content]) => {
    output.push(
      `--default-${key}-color: var(--switch--default-${key}-color, var(--light--default-${key}-color));`,
    );
  });
  output.push(`}`);
}
