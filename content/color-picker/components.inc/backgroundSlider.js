export function backgroundSliderUpdate(_, __, el) {
  el.value = s.data.modes[s.data.activeMode].background[el.key("key")];
}

export async function backgroundSliderSet(_, sender, ___) {
  await requestAnimationFrame(async () => {
    s.data.modes[s.data.activeMode].background[sender.key("key")] = sender
      .valueAsFloat();
    await b.savePageData("data", s.data);
    b.trigger("updateCSS updateJSON");
  });
}
