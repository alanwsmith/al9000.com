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
