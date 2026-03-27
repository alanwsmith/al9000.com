export const b = { init: "buildUI testQueryBuilder" };

let allCards = [];
let cardsOnPage = 30;
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

function buildQuery() {
  const query = { query: {} };
  query.name = b.qs(`#name_search`)?.value.trim();
  query.include_type_line = b.qs(`#type_line_search_include`)?.value.trim();
  query.include_oracle_text = b.qs(`#oracle_text_search_include`)?.value.trim();
  query.exclude_type_line = b.qs(`#type_line_search_exclude`)?.value.trim();
  query.exclude_oracle_text = b.qs(`#oracle_text_search_exclude`)?.value.trim();
  query.color_identity = [];
  query.colors = [];
  for (const color in colorKeys) {
    if (b.qs(`#color_checkbox_${color}`).checked) {
      query.color_identity.push(color);
      query.colors.push(color);
    }
  }
  query.colorless = b.qs(`#color_checkbox_C`).checked === true;
  return query;
}

export function buildUI() {
  b.trigger(
    "uiColors uiDebuggingSwitch uiOptions loadDataAndState testResults",
  );
}

export function cardCount(count, __, el) {
  el.innerHTML = count;
}

function cardIsColorless(card) {
  let colorlessCount = 0;
  for (const face of card.faces) {
    if (face.colors.length === 0 && face.color_identity.length === 0) {
      colorlessCount += 1;
    }
  }
  return colorlessCount === card.faces.length;
}

function cardIsOnPage(index, length) {
  const pageNum = parseInt(b.qs("#pageNumber").value, 10);
  const cardMaxIndex = (cardsOnPage * pageNum) - 1;
  const cardMinIndex = cardMaxIndex - cardsOnPage + 1;
  return (cardMinIndex <= index && index <= cardMaxIndex);
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
    debug: false,
    values: [
      {
        id: "type_list_search_exclude",
        value: "battle",
      },
      {
        id: "oracle_text_search_exclude",
        value: "name sticker|attraction",
      },
    ],
    cardLevels: {},
  };
}

export function excludeDefaults(_, sender, el) {
  if (sender.prop("key") === el.prop("key")) {
    el.value = defaultExcludes[sender.prop("key")];
    b.trigger("search");
  }
}

function excludeOracleTextV2(card, query) {
  if (!query.exclude_oracle_text) return true;
  let passCard = true;
  const pattern = new RegExp(query.exclude_oracle_text, "gi");
  for (const face of card.faces) {
    if (face.oracle_text.match(pattern)) passCard = false;
  }
  return passCard;
}

function excludeTypeLineV2(card, query) {
  if (!query.exclude_type_line) return true;
  let passCard = true;
  const pattern = new RegExp(query.exclude_type_line, "gi");
  for (const face of card.faces) {
    if (face.type_line.match(pattern)) passCard = false;
  }
  return passCard;
}

function filterCardsV2(cards, query) {
  if (query.name) {
    const pattern = new RegExp(query.name, "gi");
    return cards.filter((card) => {
      return card.name.match(pattern) !== null;
    });
  }
  let selectedCards = cards
    .filter((card) => includeOracleTextV2(card, query))
    .filter((card) => includeTypeLineV2(card, query))
    .filter((card) => excludeOracleTextV2(card, query))
    .filter((card) => excludeTypeLineV2(card, query))
    .filter((card) => includeColorsV2(card, query));
  return selectedCards;
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

function includeColorsV2(card, query) {
  if (
    query.colors.length === 0 && query.color_identity.length === 0 &&
    query.colorless === false
  ) {
    return true;
  }
  if (query.colorless === true && cardIsColorless(card) === true) {
    return true;
  }
  let passCard = false;
  for (const face of card.faces) {
    if (query.colors.length > 0) {
      for (const color of query.colors) {
        if (face.colors.includes(color)) passCard = true;
      }
      for (const color of face.colors) {
        if (!query.colors.includes(color)) return false;
      }
    }
    if (query.color_identity.length > 0) {
      for (const color of query.color_identity) {
        if (face.color_identity.includes(color)) passCard = true;
      }
      for (const color of face.color_identity) {
        if (!query.color_identity.includes(color)) return false;
      }
    }
  }
  return passCard;
}

function includeOracleTextV2(card, query) {
  if (!query.include_oracle_text) return true;
  const pattern = new RegExp(query.include_oracle_text, "gi");
  for (const face of card.faces) {
    if (face.oracle_text.match(pattern)) return true;
  }
  return false;
}

function includeTypeLineV2(card, query) {
  if (!query.include_type_line) return true;
  const pattern = new RegExp(query.include_type_line, "gi");
  for (const face of card.faces) {
    if (face.type_line.match(pattern)) return true;
  }
  return false;
}

export async function loadDataAndState() {
  state = b.loadPage("state", defaultState());
  const hexChars = "abcdef1234567890";
  let dataKeys = hexChars.split("");
  if (state.debug) dataKeys = ["debug"];
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

// TODO: Rename this to something else
// since build query is for the full
// query in V2 and it's confusing to
// have this be named the same thing.
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
    const filteredCards = filterCardsV2(allCards, buildQuery())
      .sort(cardSorter)
      .map((card) => {
        const cardLevel = state.cardLevels[card.id] === undefined
          ? ""
          : state.cardLevels[card.id];

        const subs = {
          __CARD_NAME__: card.name,
          __CARD_ID__: card.id,
          __CARD_LEVEL__: cardLevel,
          __IMG_SRC__: card.faces[0].image ? card.faces[0].image : "",
          __CARD_TYPE__: card.faces.map((face) => face.type_line).join(),
          __CARD_TEXT__: card.faces.map((face) => face.oracle_text).join(),
        };
        return b.render("cardTemplate", subs);
      });
    b.send(filteredCards.length, "cardCount");
    el.replaceChildren(...filteredCards
      .filter((card, index) => cardIsOnPage(index, filteredCards.length)));
  }
}

export function search(_, sender, ___) {
  b.debounce("newSearch", "results", 200);
}

export function searchFromStart(_, __, ___) {
  b.qs(`#pageNumber`).value = 1;
  b.debounce("newSearch", "results", 200);
}

export function selectOption(_, sender, el) {
  if (sender.prop("key") === el.prop("key")) {
    el.value = sender.value.toLowerCase();
    sender.selectedIndex = 0;
    b.trigger("search");
  }
}

export function setCardLevel(_, sender, el) {
  state.cardLevels[sender.prop("id")] = sender.propInt("key");
  b.savePage("state", state);
  if (sender.prop("id") === el.prop("id")) {
    el.innerHTML = sender.prop("key");
  }
}

export function setValues(payload) {
  for (const item of payload) {
    const el = b.qs(`#${item.id}`);
    if (el) {
      for (const key in item.keys) {
        el[key] = item.keys[key];
      }
      for (const key in item.aria) {
        el.setAttribute(`aria-${key}`, item.aria[key]);
      }
    }
  }
}

export async function testResults(_, __, el) {
  if (el) {
    const testFileJSON = await b.get(
      "/magic-deck-builder/filter-tests/tests.on.json",
    );
    if (testFileJSON) {
      let didSoloTest = false;
      for (const testDir of testFileJSON.tests) {
        const cardsData = await b.get(`${testDir}/cards.json`);
        const queryData = await b.get(`${testDir}/query.json`);
        if (cardsData && queryData) {
          if (queryData.solo) {
            didSoloTest = true;
            //el.innerHTML += `Checking: ${testDir}\n`;
            const results = filterCardsV2(cardsData.cards, queryData.query);
            const resultNames = results.map((card) => card.name);
            if (
              JSON.stringify(resultNames) ===
                JSON.stringify(queryData.resultNames)
            ) {
              el.innerHTML += `PASSED: ${testDir}\n`;
            } else {
              el.innerHTML += `FAILED: ${testDir}\n`;
              console.log(resultNames);
              console.log(queryData.resultNames);
            }
          }
        } else {
          el.innerHTML += `ERROR LOADING: ${testFile}\n`;
        }
      }
      if (didSoloTest === false) {
        for (const testDir of testFileJSON.tests) {
          const cardsData = await b.get(`${testDir}/cards.json`);
          const queryData = await b.get(`${testDir}/query.json`);
          if (cardsData && queryData) {
            if (!queryData.solo) {
              didSoloTest = true;
              //el.innerHTML += `Checking: ${testDir}\n`;
              const results = filterCardsV2(cardsData.cards, queryData.query);
              const resultNames = results.map((card) => card.name);
              if (
                JSON.stringify(resultNames) ===
                  JSON.stringify(queryData.resultNames)
              ) {
                el.innerHTML += `PASSED: ${testDir}\n`;
              } else {
                el.innerHTML += `FAILED: ${testDir}\n`;
                console.log(resultNames);
                console.log(queryData.resultNames);
              }
            }
          } else {
            el.innerHTML += `ERROR LOADING: ${testFile}\n`;
          }
        }
      }
    }
  }
}

export function toggleDebugging(_, sender, ___) {
  sender.toggleAria("checked");
  state.debug = sender.ariaBool("checked");
  state.values = getValues();
  b.savePage("state", state);
  b.trigger("loadDataAndState");
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