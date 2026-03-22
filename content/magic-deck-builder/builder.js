export const b = { init: "buildUI" };

let allCards = [];
let state;

const colorKeys = {
  B: { name: "black" },
  U: { name: "blue" },
  G: { name: "green" },
  R: { name: "red" },
  W: { name: "white" },
};

const options = {
  type_line: [
    "Artifact",
    "Creature",
    "Enchantment",
    "Equipment",
    "Instant",
    "Planeswalker",
    "Sorcery",
  ],
  oracle_text: [
    "Deathtouch",
    "Flying",
    "Lifelink",
  ],
};

export function buildUI() {
  b.trigger("uiColors uiDebuggingSwitch uiOptions loadStateAndData");
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
    values: [
      {
        id: "type_list_search_exclude",
        value: "battle",
      },
      {
        id: "oraclue_text_search_exclude",
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

function filterCardNameIsActive() {
  const value = b.qs(`[data-r~="displayNameSearch"]`).value.trim();
  if (!value) return false;
  return true;
}

function filterColors(card) {
  const hasColors = [...b.qsa(`[data-r~=displayColorCheckbox]`)]
    .filter((input) => input.checked)
    .map((input) => input.dataset.key);
  if (hasColors.length === 0) {
    return true;
  }
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

export function filterCards(card, key, include) {
  const el = b.qs(`[data-s~=search][data-key=${key}][data-include=${include}]`);
  if (el.value) {
    const pattern = new RegExp(el.value, "gi");
    for (const face of card.faces) {
      if (face[el.dataset.key].match(pattern)) {
        return include;
      }
    }
    return !include;
  }
  return true;
}

export function filteredCards() {
  let selectedCards;
  if (filterCardNameIsActive()) {
    selectedCards = allCards
      .filter((card) => filterCardName(card));
  } else {
    selectedCards = allCards
      .filter((card) => filterColors(card))
      .filter((card) => filterCards(card, "type_line", true))
      .filter((card) => filterCards(card, "oracle_text", true))
      .filter((card) => filterCards(card, "type_line", false))
      .filter((card) => filterCards(card, "oracle_text", false));
  }
  selectedCards.sort(cardSorter);
  b.send(selectedCards.length, "cardCount");
  const cardsPerPage = 9;
  if (!b.qs(`[data-r~="displayPageNumber"]`).value) {
    b.qs(`[data-r~="displayPageNumber"]`).value = 1;
  }
  const pages = Math.ceil(selectedCards.length / cardsPerPage);
  const maxIndex = (parseInt(b.qs(`[data-r~="displayPageNumber"]`).value) *
    cardsPerPage) - 1;
  const minIndex = maxIndex - cardsPerPage + 1;
  return selectedCards.filter((
    card,
    index,
  ) => (index >= minIndex && index <= maxIndex));
}

export function getValues() {
  const keys = [
    "checked",
    "diabled",
    "hidden",
    "readOnly",
    "spellcheck",
    "value",
  ];
  return [...b.qsa(`[data-save][id]`)]
    .filter((el) => el.dataset.save === "true")
    .map((el) => {
      const item = {
        id: el.id,
        aria: {},
        keys: {},
      };
      for (const key of keys) {
        if (el[key]) item.keys[key] = el[key];
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

// export function getDisplayState() {
//   return [...b.qsa(`[data-r^="display"]`)].map((el) => {
//     const item = {
//       dataset: {},
//       aria: {},
//     };
//     let typeAttr = el.getAttribute("type");
//     if (typeAttr === "text" && el.value) {
//       item.value = el.value;
//     }
//     if (typeAttr === "search" && el.value) {
//       item.value = el.value;
//     }
//     if (typeAttr === "checkbox" && el.checked) {
//       item.checked = el.checked;
//     }
//     for (const dsKey in el.dataset) {
//       if (dsKey !== "s") {
//         item.dataset[dsKey] = el.dataset[dsKey];
//       }
//     }
//     for (const attr of el.attributes) {
//       if (attr.name.startsWith("aria-")) {
//         const ariaKey = attr.name.replace("aria-", "");
//         item.aria[ariaKey] = attr.value;
//       }
//     }
//     return item;
//   });
// }

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
  b.trigger("search");
}

export function nextPage(_, __, el) {
  el.value = el.valueInt() + 1;
  b.trigger("results");
}

export function previousPage(_, __, el) {
  if (el.valueInt() > 0) {
    el.value = el.valueInt() - 1;
    b.trigger("results");
  }
}

export function resetState() {
  state = defaultState();
  state.debugging = true;
  b.savePage("state", state);
  b.trigger("loadStateAndData");
}

export function results(_, __, el) {
  state.values = getValues();
  b.savePage("state", state);
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

export function search(ev, sender, ___) {
  if (sender && sender.propBool("include") === true) {
    b.qs(`[data-r~="displayPageNumber"]`).value = 1;
  }
  b.debounce("newSearch", "results", 200);
}

export function selectOption(_, sender, el) {
  if (sender.prop("key") === el.prop("key")) {
    el.value = sender.value.toLowerCase();
    sender.selectedIndex = 0;
    b.trigger("search");
  }
}

export function setValues(payload) {
}

// export function setDisplayState(els) {
//   // TODO: Update this and getDisplayState so that
//   // the data-r will find keys with `display`
//   // in them but can also have other signals
//   // as well.
//   if (els) {
//     for (const data of els) {
//       const selector = data.dataset.key
//         ? `[data-r="${data.dataset.r}"][data-key="${data.dataset.key}"]`
//         : `[data-r="${data.dataset.r}"]`;
//       const el = b.qs(selector);
//       if (el) {
//         if (data.value) {
//           el.value = data.value;
//         }
//         if (data.checked) {
//           el.checked = data.checked;
//         }
//         for (const ariaKey in data.aria) {
//           if (ariaKey !== "r" && ariaKey !== "key") {
//             el.setAttribute(`aria-${ariaKey}`, data.aria[ariaKey]);
//           }
//         }
//       }
//     }
//   }
// }

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
  el.replaceChildren(b.switch({
    __APPEND__: "Debugging",
    __RECEIVE__: "displayDebuggingToggle",
    __SEND__: "toggleDebugging",
    __SAVE__: "true",
    __ID__: "search_debugging_toggle",
  }));
}

export function uiOptions(_, __, el) {
  el.replaceChildren();
  el.appendChild(b.render("optionSpacerTemplate"));
  for (const value of options[el.prop("key")]) {
    el.appendChild(b.render("optionTemplate", { __VALUE__: value }));
  }
}
