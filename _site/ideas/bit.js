export const b = {
  init: "init",
};

let s = {
  currentItem: -1,
  items: {
    public: [],
    personal: [],
  },
  set: "general",
};

export function init(_, __, el) {
  s.items[s.set] = [...b.qsa(`.${s.set}-ideas li`)];
  b.shuffle(s.items[s.set]);
  b.trigger("newIdea");
}

export function newIdea(_, __, el) {
  if (s.currentItem >= s.items[s.set].length) {
    b.shuffle(s.items[s.set]);
    s.currentItem = 0;
  } else {
    s.currentItem += 1;
  }
  el.innerHTML = s.items[s.set][s.currentItem].innerHTML;
  //el.innerHTML = s.items[s.set][0].innerHTML;
}