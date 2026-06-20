export const b = {
  init: "showWord",
};

export function showWord(_, __, el) {
  const params = new URLSearchParams(window.location.search);
  const word = params.get("word");
  if (word) {
    el.innerHTML = word;
  } else {
    el.innerHTML = `<div class="center">???</div>`;
  }
}