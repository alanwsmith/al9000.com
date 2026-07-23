
function makeUiClasses() {
  const activeMode = s.getActiveMode();
  const activeColorIndex = activeMode.activeColorIndex;
  const activeColor = activeMode.colors[activeColorIndex];
  const output = [];
  for (let i = 0; i < 8; i += 1) {
    const key = `.ui-set-${i}`;
    const value = `var(--ui-set-${i})`;
    output.push([key, value]);
  }
  const out2 = output.map((x) => {
    return `${x[0]} { color: ${x[1]}; }`;
  });

  output.forEach((x) => {
    out2.push(
      `${
        x[0]
      }.set-active { color: var(--default-match-color); background-color: ${
        x[1]
      }; }`,
    );
  });

  return out2.join("\n");
}


