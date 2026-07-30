export function setModeCSS(mode) {
  b.setCSS(
    `--switch--background-color`,
    `var(--${mode}--background-color)`,
  );
  s.data.colorKeys.forEach((color) => {
    const key = `--switch--${color}-color`;
    const value = `var(--${mode}--${color}-color)`;
    b.setCSS(
      key,
      value,
    );
  });
  s.data.monoNames.forEach((mono) => {
    const key = `--switch--${mono}-color`;
    const value = `var(--${mode}--${mono}-color)`;
    b.setCSS(
      key,
      value,
    );
  });
}
