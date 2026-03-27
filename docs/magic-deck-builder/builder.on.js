export const b = { init: "buildUI testQueryBuilder" };

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
    "Land",
    "Planeswalker",
    "Sorcery",
  ],
  oracle_text: [
    "Deathtouch",
    "Flying",
    "Lifelink",
  ],
};

const defaultExcludes = {
  type_line: "battle",
  oracle_text: "name sticker|attraction",
};

function getActiveColors(card) {
  const colorSet = new Set();
  card.faces.forEach((face) => {
    face.color_identity.forEach((color) => colorSet.add(color));
    face.colors.forEach((color) => colorSet.add(color));
  });
  return Array.from(colorSet);
}

export function buildUI() {
  b.trigger(
    "uiColors uiDebuggingSwitch uiOptions loadDataAndState testResults",
  );
}

export function cardCount(count, __, el) {
  el.innerHTML = count;
}

function cardSorter(a, b) {
  return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
}

export function clearQuery(_, sender, el) {
  if (sender.prop("key") === el.prop("key")) {
    el.value = "";
    b.trigger("searchFromStart");
  }
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

function excludeColors(card) {
  const includeColorless =
    b.qs(`[data-r=displayColorlessCheckbox]`).checked === true;
  if (includeColorless && getActiveColors(card).length === 0) {
    return true;
  }

  const colorsToCheck = [...b.qsa(`[data-r~=displayColorCheckbox]`)]
    .filter((input) => input.checked === false)
    .map((input) => input.dataset.key)
    .filter((key) => getActiveColors(card).includes(key));
  //.map((input) => input.dataset.key);
  console.log(colorsToCheck);

  // .filter((input) => getActiveColors(card).includes(input.dataset.key));
  if (colorsToCheck.length > 0) {
    return false;
  }
  return true;

  // const colors = getActiveColors(card);
  // console.log(colors);

  //   let hasColor = false;
  //   hasColors.forEach((color) => {
  //     card.faces.forEach((face) => {
  //       if (face.color_identity.includes(color)) {
  //         hasColor = true;
  //       }
  //     });
  //   });
  //   let doesNotHaveColor = true;
  //   doesNotHaveColors.forEach((color) => {
  //     card.faces.forEach((face) => {
  //       if (face.color_identity.includes(color)) {
  //         doesNotHaveColor = false;
  //       }
  //     });
  //   });
  //   return hasColor === true && doesNotHaveColor === true;
  // }
}

export function excludeDefaults(_, sender, el) {
  if (sender.prop("key") === el.prop("key")) {
    el.value = defaultExcludes[sender.prop("key")];
    b.trigger("search");
  }
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

// function filterColors(card) {
//   const hasColors = [...b.qsa(`[data-r~=displayColorCheckbox]`)]
//     .filter((input) => input.checked)
//     .map((input) => input.dataset.key);
//   if (hasColors.length === 0) {
//     return true;
//   }
//   const doesNotHaveColors = [...b.qsa(`[data-r~=displayColorCheckbox]`)]
//     .filter((input) => input.checked === false)
//     .map((input) => input.dataset.key);
//   let hasColor = false;
//   hasColors.forEach((color) => {
//     card.faces.forEach((face) => {
//       if (face.color_identity.includes(color)) {
//         hasColor = true;
//       }
//     });
//   });
//   let doesNotHaveColor = true;
//   doesNotHaveColors.forEach((color) => {
//     card.faces.forEach((face) => {
//       if (face.color_identity.includes(color)) {
//         doesNotHaveColor = false;
//       }
//     });
//   });
//   return hasColor === true && doesNotHaveColor === true;
// }

export function filterCards(card, key, include) {
  const el = b.qs(`[data-s~=search][data-key=${key}][data-include=${include}]`);
  if (el.value) {
    for (const query of queryBuilder(el.value)) {
      let passes = 0;
      for (const check of query) {
        const pattern = new RegExp(check, "gi");
        for (const face of card.faces) {
          if (face[el.dataset.key].match(pattern)) {
            passes += 1;
          }
        }
      }
      if (passes >= query.length) {
        return include;
      }
    }

    // const pattern = new RegExp(el.value, "gi");
    // for (const face of card.faces) {
    //   if (face[el.dataset.key].match(pattern)) {
    //     return include;
    //   }
    // }

    return !include;
  }
  return true;
}

function filterCardsV2(cards, query) {
  if (query.name) {
    const pattern = new RegExp(query.name, "gi");
    return cards.filter((card) => {
      return card.name.match(pattern) !== null;
    });
  }
  return cards;
}

export function filteredCards() {
  let selectedCards;
  if (filterCardNameIsActive()) {
    selectedCards = allCards
      .filter((card) => filterCardName(card));
  } else {
    selectedCards = allCards
      //.filter((card) => filterColors(card))
      .filter((card) => includeColors(card))
      .filter((card) => excludeColors(card))
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

function includeColors(card) {
  const hasColors = [...b.qsa(`[data-r~=displayColorCheckbox]`)]
    .filter((input) => input.checked)
    .map((input) => input.dataset.key);
  const includeColorless =
    b.qs(`[data-r=displayColorlessCheckbox]`).checked === true;
  if (hasColors.length === 0 && includeColorless === false) {
    return true;
  }
  let includeCard = false;
  card.faces.forEach((face) => {
    hasColors.forEach((color) => {
      if (face.colors.includes(color)) {
        includeCard = true;
      }
      if (face.color_identity.includes(color)) {
        includeCard = true;
      }
    });
    if (face.colors.length === 0 && includeColorless) {
      includeCard = true;
    }
    if (face.color_identity.length === 0 && includeColorless) {
      includeCard = true;
    }
  });
  return includeCard;

  // const hasColors = [...b.qsa(`[data-r~=displayColorCheckbox]`)]
  //   .filter((input) => input.checked)
  //   .map((input) => input.dataset.key);
  // if (hasColors.length === 0) {
  //   return true;
  // }
  // const doesNotHaveColors = [...b.qsa(`[data-r~=displayColorCheckbox]`)]
  //   .filter((input) => input.checked === false)
  //   .map((input) => input.dataset.key);
  // let hasColor = false;
  // hasColors.forEach((color) => {
  //   card.faces.forEach((face) => {
  //     if (face.color_identity.includes(color)) {
  //       hasColor = true;
  //     }
  //   });
  // });
  // let doesNotHaveColor = true;
  // doesNotHaveColors.forEach((color) => {
  //   card.faces.forEach((face) => {
  //     if (face.color_identity.includes(color)) {
  //       doesNotHaveColor = false;
  //     }
  //   });
  // });
  // return hasColor === true && doesNotHaveColor === true;
}

export async function loadDataAndState() {
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
  setValues(state.values);
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

function queryBuilder(input) {
  const queries = input.split("||")
    .map((theOr) => theOr.trim())
    .map((rawOr) =>
      rawOr.split("&&")
        .map((rawAnd) => rawAnd.trim())
    );
  return queries;
}

export function results(_, __, el) {
  if (el) {
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
}

export function search(_, sender, ___) {
  if (sender && sender.propBool("include") === true) {
    b.qs(`[data-r~="displayPageNumber"]`).value = 1;
  }
  b.debounce("newSearch", "results", 200);
}

export function searchFromStart(_, __, ___) {
  b.qs(`[data-r~="displayPageNumber"]`).value = 1;
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
  for (const item of payload) {
    const el = b.qs(`#${item.id}`);
    for (const key in item.keys) {
      el[key] = item.keys[key];
    }
    for (const key in item.aria) {
      el.setAttribute(`aria-${key}`, item.aria[key]);
    }
  }
}

export async function testResults(_, __, el) {
  if (el) {
    const testFileJSON = await b.get(
      "/magic-deck-builder/filter-tests/tests.on.json",
    );
    if (testFileJSON) {
      for (const testDir of testFileJSON.tests) {
        const cardsData = await b.get(`${testDir}/cards.json`);
        const queryData = await b.get(`${testDir}/query.json`);
        const resultsData = await b.get(`${testDir}/results.json`);
        if (cardsData && queryData && resultsData) {
          el.innerHTML += `Checking: ${testDir}\n`;
          const results = filterCardsV2(cardsData.cards, queryData.query);
          const resultNames = results.map((card) => card.name);
          if (
            JSON.stringify(resultNames) ===
              JSON.stringify(resultsData.resultNames)
          ) {
            el.innerHTML += `PASSED: ${testDir}\n`;
          } else {
            el.innerHTML += `FAILED: ${testDir}\n`;
            console.log(resultNames);
            console.log(resultsData.resultNames);
          }
        } else {
          el.innerHTML += `ERROR LOADING: ${testFile}\n`;
        }
      }
    }
  }
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

export function uiColors(_, __, el) {
  if (el) {
    el.replaceChildren(
      ...Object.keys(colorKeys).map((key) => {
        return b.render("colorTemplate", {
          __COLOR_KEY__: key,
          __COLOR_NAME__: colorKeys[key].name,
        });
      }),
    );
    el.appendChild(b.render("colorlessTemplate"));
  }
}

export function uiDebuggingSwitch(_, __, el) {
  if (el) {
    el.replaceChildren(b.switch({
      __APPEND__: "Debugging",
      __RECEIVE__: "displayDebuggingToggle",
      __SEND__: "toggleDebugging",
      __SAVE__: "true",
      __ID__: "search_debugging_toggle",
    }));
  }
}

export function uiOptions(_, __, el) {
  if (el) {
    el.replaceChildren();
    el.appendChild(b.render("optionSpacerTemplate"));
    for (const value of options[el.prop("key")]) {
      el.appendChild(b.render("optionTemplate", { __VALUE__: value }));
    }
  }
}

//export function testQueryBuilder(_, __, el) {

// const tests = [
//   {given: "alfa", expect: ["alfa"]}
// ]

//el.innerHTML = "asdf";
//}