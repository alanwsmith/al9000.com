let css = {};

export function updateCSS(_, __, el) {
  el.innerHTML = JSON.stringify(s.data, null, 2);
}
