export const b = {
  init: "htmlColors",
};

export async function htmlColors(_, __, el) {
  let response = await b.getJSON("/tools/html-colors/colors.json");
  if (response) {
    for (let key of Object.keys(response)) {
      const subs = {
        __NAME__: key,
      };
      el.appendChild(b.render("htmlColor", subs));
    }
  }
}
