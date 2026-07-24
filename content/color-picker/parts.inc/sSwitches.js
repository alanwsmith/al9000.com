function setSwitches(mode) {
  b.setCSS(
    `--switch--background`,
    `var(--${mode}--background)`,
  );
  s.data.colorTypes.forEach((t) => {
    b.setCSS(
      `--switch--color-scheme`,
      `var(--${mode}--color-scheme)`,
    );
    s.data.colorNames.forEach((name) => {
      b.setCSS(
        `--switch--${t}-${name}-color`,
        `var(--${mode}--${t}-${name}-color)`,
      );
    });
    b.setCSS(
      `--switch--${t}-black-color`,
      `var(--${mode}--${t}-black-color)`,
    );
    b.setCSS(
      `--switch--${t}-white-color`,
      `var(--${mode}--${t}-white-color)`,
    );
    b.setCSS(
      `--switch--${t}-match-color`,
      `var(--${mode}--${t}-match-color)`,
    );
    b.setCSS(
      `--switch--${t}-reverse-color`,
      `var(--${mode}--${t}-reverse-color)`,
    );
  });
}
