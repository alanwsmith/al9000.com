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
  b.trigger("uiCardName uiColors uiDebuggingSwitch results");
}

function filterCardName(card) {
  const value = b.qs("[data-r=uiCardName]").value.trim();
  if (value === "") return true;
  const pattern = new RegExp(value, "gi");
  return card.name.match(pattern) !== null;
}

export function resultCount(count, __, el) {
  el.innerHTML = count;
}

export function saveState() {
  state.cardName = b.qs("[data-r=uiCardName]").value.trim();
  b.savePage("state", state);
  b.debug("saved state");
}

export function search(ev, __, ___) {
  b.debounce("results", "results saveState", 200);
}

export function uiCardName(_, __, el) {
  el.value = state.cardName;
  el.focus();
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
}

export function uiDebuggingSwitch(_, __, el) {
  const subs = {
    __APPEND__: "Debugging",
    __SEND__: "toggleDebugging",
  };
  el.replaceChildren(b.switch(subs));
}

export function results(_, __, el) {
  const output = cards
    .filter((card) => filterCardName(card));
  if (output.length === cards.length) {
    el.innerHTML = "waiting";
    b.send("tbd", "resultCount");
  } else {
    b.send(output.length, "resultCount");
    el.replaceChildren(
      ...output
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .filter((card, index) => index < 20)
        .map((card) => {
          const subs = {
            __CARD_NAME__: card.name,
            __CARD_ID__: card.id,
            __IMG_SRC__: card.image_uris.png,
          };
          return b.render("cardTemplate", subs);
        }),
    );
  }
}

export function toggleDebugging(_, sender, ___) {
  b.debug(`Debugging: ${sender.aria("checked")}`);
  sender.toggleAria("checked");
  state.debugging = sender.ariaBool("checked");
  b.debuggins = state.debugging;
  b.trigger("saveState");
}
