function makeClasses() {
  const background = [
    `.background-color { color: var(--background-color); }`,
  ];
  // TODO: Move these individual arrays into
  // the collections array.
  const colors1 = s.data.colorNames.map((color) => {
    return `.default-${color}-color { color: var(--default-${color}-color); }`;
  });
  const colors2 = s.data.colorNames.map((color) => {
    return `.faded-${color}-color { color: var(--faded-${color}-color); }`;
  });
  const colors3 = s.data.colorNames.map((color) => {
    return `.faint-${color}-color { color: var(--faint-${color}-color); }`;
  });
  const monos1 = s.data.monoNames.map((color) => {
    return `.default-${color}-color { color: var(--default-${color}-color); }`;
  });
  const monos2 = s.data.monoNames.map((color) => {
    return `.faded-${color}-color { color: var(--faded-${color}-color); }`;
  });
  const monos3 = s.data.monoNames.map((color) => {
    return `.faint-${color}-color { color: var(--faint-${color}-color); }`;
  });

  const collection = [];
  s.data.colorNames.forEach((color) => {
    collection.push(
      `.default-${color}-background-color { background-color: var(--default-${color}-color); }`,
      `.faded-${color}-background-color { background-color: var(--faded-${color}-color); }`,
      `.faint-${color}-background-color { background-color: var(--faint-${color}-color); }`,
    );
  });

  const output = [
    ...background,
    ...colors1,
    ...colors2,
    ...colors3,
    ...monos1,
    ...monos2,
    ...monos3,
    ...collection,
  ];
  return output.join("\n");
}
