let css = {};

export function updateCSS(_, __, el) {
  el.innerHTML = JSON.stringify(css, null, 2);
}
