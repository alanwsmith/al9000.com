export function backgroundSliderUpdate(_, __, el) {
  el.value = s.data.modes[s.data.activeMode].background[el.prop("key")];
}

export async function backgroundSliderSet(_, sender, ___) {
  await requestAnimationFrame(async () => {
    s.data.modes[s.data.activeMode].background[sender.prop("key")] = sender
      .valueAsFloat();
    await b.savePageData("data", s.data);
    b.trigger("updateCSS outputJSON");
  });
}
