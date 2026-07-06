export const b = {
  init: "init",
};

let items = [];

export function init(_, __, el) {
  items = [...b.qsa("#main-ideas li")];
  b.shuffle(items);
  b.trigger("newIdea");
}

export function newIdea(_, __, el) {
  el.innerHTML = items[b.randomInt(0, items.length)].innerHTML;
}