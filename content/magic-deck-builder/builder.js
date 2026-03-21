export const b = { init: "loadStateAndData" };

let allCards = [];
let state;

const colorKeys = {
  C: { name: "colorless" },
  B: { name: "black" },
  U: { name: "blue" },
  G: { name: "green" },
  R: { name: "red" },
  W: { name: "white" },
};

export function buildUI() {
  b.trigger("uiColors uiDebuggingSwitch restoreState");
}

export function cardCount(count, __, el) {
  el.innerHTML = count;
}

function cardSorter(a, b) {
  return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
}

function defaultState() {
  return {
    debugging: false,
    display: [
      {
        aria: {},
        dataset: { r: "displayExcludeText" },
        value: "name sticker|attraction",
      },
    ],
  };
}

function filterCardName(card) {
  const value = b.qs(`[data-r~="displayNameSearch"]`).value.trim();
  if (value === "") return true;
  const pattern = new RegExp(value, "gi");
  return card.name.match(pattern) !== null;
}

function filterColors(card) {
  const hasColors = [...b.qsa(`[data-r~=displayColorCheckbox]`)]
    .filter((input) => input.checked)
    .map((input) => input.dataset.key);
  const doesNotHaveColors = [...b.qsa(`[data-r~=displayColorCheckbox]`)]
    .filter((input) => input.checked === false)
    .map((input) => input.dataset.key);
  let hasColor = false;
  hasColors.forEach((color) => {
    card.faces.forEach((face) => {
      if (face.color_identity.includes(color)) {
        hasColor = true;
      }
    });
  });
  let doesNotHaveColor = true;
  doesNotHaveColors.forEach((color) => {
    card.faces.forEach((face) => {
      if (face.color_identity.includes(color)) {
        doesNotHaveColor = false;
      }
    });
  });
  return hasColor === true && doesNotHaveColor === true;
}

function filterExcludeText(card) {
  const value = b.qs(`[data-r~="displayExcludeText"]`).value.trim();
  if (value === "") return true;
  const pattern = new RegExp(value, "gi");
  for (const face of card.faces) {
    if (face.oracle_text && face.oracle_text.match(pattern)) {
      return false;
    }
  }
  return true;
}

function filterExcludeType(card) {
  const value = b.qs(`[data-r~="displayExcludeType"]`).value.trim();
  if (value === "") return true;
  const pattern = new RegExp(value, "gi");
  for (const face of card.faces) {
    if (face.type_line && face.type_line.match(pattern)) {
      return false;
    }
  }
  return true;
}

function filterIncludeType(card) {
  const value = b.qs(`[data-r~="displayTypeSearch"]`).value.trim();
  if (value === "") return true;
  const pattern = new RegExp(value, "gi");
  for (const face of card.faces) {
    if (face.type_line && face.type_line.match(pattern)) {
      return true;
    }
  }
  return false;
}

export function filteredCards() {
  const selectedCards = allCards
    .filter((card) => filterColors(card))
    .filter((card) => filterIncludeType(card))
    .filter((card) => filterExcludeText(card))
    .filter((card) => filterExcludeType(card))
    .filter((card) => filterCardName(card))
    .sort(cardSorter);
  b.send(selectedCards.length, "cardCount");
  const cardsPerPage = 12; // zero index
  const pages = Math.ceil(selectedCards.length / cardsPerPage);
  const maxIndex = (parseInt(b.qs(`[data-r~="displayPageNumber"]`).value) *
    cardsPerPage) - 1;
  const minIndex = maxIndex - cardsPerPage + 1;
  return selectedCards.filter((
    card,
    index,
  ) => (index >= minIndex && index <= maxIndex));
}

export function getDisplayState() {
  return [...b.qsa(`[data-r^="display"]`)].map((el) => {
    const item = {
      dataset: {},
      aria: {},
    };
    let typeAttr = el.getAttribute("type");
    if (typeAttr === "text" && el.value) {
      item.value = el.value;
    }
    if (typeAttr === "search" && el.value) {
      item.value = el.value;
    }
    if (typeAttr === "checkbox" && el.checked) {
      item.checked = el.checked;
    }
    for (const dsKey in el.dataset) {
      if (dsKey !== "s") {
        item.dataset[dsKey] = el.dataset[dsKey];
      }
    }
    for (const attr of el.attributes) {
      if (attr.name.startsWith("aria-")) {
        const ariaKey = attr.name.replace("aria-", "");
        item.aria[ariaKey] = attr.value;
      }
    }
    return item;
  });
}

export async function loadStateAndData() {
  state = b.loadPage("state", defaultState());
  b.debugging = state.debugging;
  const hexChars = "abcdef1234567890";
  let dataKeys = hexChars.split("");
  if (b.debugging) dataKeys = ["debug"];
  allCards = [];
  for (let dataKey of dataKeys) {
    const result = await b.get(`/magic-data/scryfall-cards/${dataKey}.json`);
    if (result) {
      result.cards.forEach((card) => allCards.push(card));
    }
  }
  b.trigger("buildUI");
}

export function nextPage(_, __, el) {
  el.value = el.valueInt() + 1;
  b.trigger("saveState");
}

export function previousPage(_, __, el) {
  if (el.valueInt() > 0) {
    el.value = el.valueInt() - 1;
    b.trigger("saveState");
  }
}

export function resetState() {
  state = defaultState();
  state.debugging = true;
  state.display.push(
    { aria: { checked: "true" }, dataset: { r: "displayDebuggingToggle" } },
  );
  b.savePage("state", state);
  b.trigger("loadStateAndData");
}

export function restoreState() {
  setDisplayState(state.display);
  b.trigger("saveState");
}

export function results(_, __, el) {
  el.replaceChildren(
    ...filteredCards().map((card) => {
      const subs = {
        __CARD_NAME__: card.name,
        __CARD_ID__: card.id,
        __IMG_SRC__: card.faces[0].image ? card.faces[0].image : "",
        __CARD_TYPE__: card.faces.map((face) => face.type_line).join(),
        __CARD_TEXT__: card.faces.map((face) => face.oracle_text).join(),
      };
      return b.render("cardTemplate", subs);
    }),
  );
}

export function search(ev, __, ___) {
  if (ev.type !== "bittytrigger") {
    b.qs(`[data-r~="displayPageNumber"]`).value = 1;
  }
  b.debounce("newSearch", "saveState", 200);
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
    __RECEIVE__: "displayDebuggingToggle",
    __SEND__: "toggleDebugging",
  };
  el.replaceChildren(b.switch(subs));
}

export async function toggleDebugging(_, sender, ___) {
  sender.toggleAria("checked");
  state.debugging = sender.ariaBool("checked");
  b.debugging = state.debugging;
  const hexChars = "abcdef1234567890";
  let dataKeys = hexChars.split("");
  if (b.debugging) dataKeys = ["debug"];
  allCards = [];
  for (let dataKey of dataKeys) {
    const result = await b.get(`/magic-data/scryfall-cards/${dataKey}.json`);
    if (result) {
      result.cards.forEach((card) => allCards.push(card));
    }
  }
  b.trigger("search");
}

export function saveState() {
  state.display = getDisplayState();
  b.savePage("state", state);
  b.trigger("results");
}

export function setDisplayState(els) {
  // TODO: Update this and getDisplayState so that
  // the data-r will find keys with `display`
  // in them but can also have other signals
  // as well.
  if (els) {
    for (const data of els) {
      const selector = data.dataset.key
        ? `[data-r="${data.dataset.r}"][data-key="${data.dataset.key}"]`
        : `[data-r="${data.dataset.r}"]`;
      const el = b.qs(selector);
      if (el) {
        if (data.value) {
          el.value = data.value;
        }
        if (data.checked) {
          el.checked = data.checked;
        }
        for (const dataKey in data.dataset) {
          if (dataKey !== "r" && dataKey !== "key") {
            el.dataset[dataKey] = data.dataset[dataKey];
          }
        }
        for (const ariaKey in data.aria) {
          if (ariaKey !== "r" && ariaKey !== "key") {
            el.setAttribute(`aria-${ariaKey}`, data.aria[ariaKey]);
          }
        }
      }
    }
  }
}
