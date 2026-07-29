function makeSwitches(mode) {
  const background = [
    `--background-color: var(--switch--background-color, var(--${mode}--background-color));`,
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
