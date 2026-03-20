export const b = {
  init: "init",
};

let cards = [];
let state;

const colorKeys = {
  C: { name: "colorless" },
  B: { name: "black" },
  U: { name: "blue" },
  G: { name: "green" },
  R: { name: "red" },
  W: { name: "white" },
};

export async function init() {
  state = b.loadPage("state", {
    cardName: "",
    debugging: false,
  });
  b.debugging = state.debugging;
  let leaders = ["a", "b", "c", "d", "e", "f"];
  for (let i = 0; i <= 9; i += 1) leaders.push(`${i}`);
  if (b.debugging) {
    leaders = ["debug"];
  }
  for (let leader of leaders) {
    const result = await b.get(`/magic-data/scryfall-cards/${leader}.json`);
    if (result) {
      result.cards.forEach((card) => {
        cards.push(card);
      });
    }
  }
  b.trigger("uiCardName");
}

export function uiCardName(_, __, el) {
  el.value = state.cardName;
  b.trigger("uiColors");
}

export function uiColors(_, __, el) {
  el.replaceChildren(
    ...Object.keys(colorKeys).map((key) => {
      return b.render("colorTemplate", {
        __COLOR_KEY__: key,
        __COLOR_NAME__: colorKeys[key].name,
      });
    }),
  );
  b.trigger("results");
}

export function focusName(_, __, el) {
  el.focus();
}

export function search(ev, __, ___) {
  b.debounce("results", "results saveState", 200);
}

export function results(_, __, el) {
  const output = cards
    .filter((card) => filterCardName(card));
  if (output.length === cards.length) {
    el.innerHTML = "waiting";
  } else {
    output.filter((card, index) => index < 20);
    el.innerHTML = output.length;
  }
}

function filterCardName(card) {
  const value = b.qs("[data-r=uiCardName]").value.trim();
  if (value === "") {
    return true;
  }
  const pattern = new RegExp(value, "gi");
  return card.name.match(pattern) !== null;
}

export function saveState() {
  state.cardName = b.qs("[data-r=uiCardName]").value.trim();
  b.savePage("state", state);
  b.debug("saved state");
}

// export function results(_, __, el) {
//   el.replaceChildren(
//     ...cards.filter((card) => {
//     }).map((card) => {
//       const subs = {
//         __CARD_NAME__: card.name,
//       };
//       return b.render("card", subs);
//     }),
//   );
// }
