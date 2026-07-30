export function monosInit(_, __, el) {
  s.data.monoNames.forEach((name) => {
    const subs = {
      __KEY__: name,
    };
    el.appendChild(b.render("mono", subs));
  });
  b.trigger("monoUpdate");
}
