export const b = { init: "update" };

export function update(_, sender, el) {
  const inputs = {};
  [...b.qsa("input")]
    .filter((input) => input.id)
    .forEach((input) => inputs[input.id] = input);
  if (sender === inputs.heightOutRatio) {
    inputs.widthOutRatio.value = parseFloat(inputs.widthInRatio.value) *
      parseFloat(inputs.heightOutRatio.value) /
      parseFloat(inputs.heightInRatio.value);
  } else {
    inputs.heightOutRatio.value = parseFloat(inputs.heightInRatio.value) *
      parseFloat(inputs.widthOutRatio.value) /
      parseFloat(inputs.widthInRatio.value);
  }
}

export function copyRatio(_, sender, el) {
  if (sender.prop("key") === el.prop("key")) {
    b.quickCopy(el, sender);
  }
}
