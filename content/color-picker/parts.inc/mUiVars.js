
function makeUiVars() {
  const activeMode = s.getActiveMode();
  const activeColorIndex = activeMode.activeColorIndex;
  const activeColor = activeMode.colors[activeColorIndex];
  const output = [];
  for (let i = 0; i < 8; i += 1) {
    const key = `--ui-set-${i}`;
    const rotation = ((s.data.hueRotation * i) +
      activeMode.background.__H__) % 360;
    const value =
      `oklch(${activeColor.__L__} ${activeColor.__C__} ${rotation})`;
    output.push([key, value]);
  }
  const out2 = output.map((x) => {
    return `${x[0]}: ${x[1]};`;
  });
  return `:root { ${out2.join("\n")}}`;
}
