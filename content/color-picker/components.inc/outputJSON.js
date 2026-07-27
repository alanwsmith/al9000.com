export function outputJSON(_, __, el) {
  el.innerHTML = JSON.stringify(s.data, null, 2);
}
