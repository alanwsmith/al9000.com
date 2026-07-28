export function setModeCSS(mode) {
  const colors = ["base", "heading", "accent", "info", "warning", "background"];
  const kinds = ["default", "faded", "faint"];

  kinds.forEach((kind) => {
    colors.forEach((color) => {
      const key = `--switch--${kind}-${color}-color`;
      const value = `var(--${mode}--${kind}-${color}-color)`;
      b.setCSS(
        key,
        value,
      );
    });
  });
}
