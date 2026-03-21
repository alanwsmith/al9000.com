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

function filterCardName(card) {
  const value = b.qs(`[data-r="displayNameSearch"]`).value.trim();
  if (value === "") return true;
  const pattern = new RegExp(value, "gi");
  return card.name.match(pattern) !== null;
}

function filterExcludeText(card) {
  const value = b.qs(`[data-r="displayExcludeText"]`).value.trim();
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
  const value = b.qs(`[data-r="displayExcludeType"]`).value.trim();
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
  const value = b.qs(`[data-r="displayTypeSearch"]`).value.trim();
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
  const cardList = allCards
    .filter((card) => filterIncludeType(card))
    .filter((card) => filterExcludeText(card))
    .filter((card) => filterExcludeType(card))
    .filter((card) => filterCardName(card))
    .sort(cardSorter)
    .filter((card, index) => index < 50);
  b.send(cardList.length, "cardCount");
  return cardList;

  // const output = allCards
  //   .filter((card) => filterCardName(card));
  // if (output.length === cards.length) {
  //   el.innerHTML = "waiting";
  //   b.send("tbd", "resultCount");
  // } else {
  //   b.send(output.length, "resultCount");
  //   el.replaceChildren(
  //     ...output
  //       .sort((a, b) =>
  //         a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  //       )
  //       .filter((card, index) => index < 20)
  //       .map((card) => {
  //         const subs = {
  //           __CARD_NAME__: card.name,
  //           __CARD_ID__: card.id,
  //           __IMG_SRC__: card.image_uris.png,
  //         };
  //         return b.render("cardTemplate", subs);
  //       }),
  //   );
  // }
  // el.replaceChildren(output);
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
  state = b.loadPage("state", { debugging: false });
  b.debugging = state.debugging;
  const hexChars = "abcdef1234567890";
  let dataKeys = hexChars.split("");
  if (b.debugging) dataKeys = ["debug"];
  for (let dataKey of dataKeys) {
    const result = await b.get(`/magic-data/scryfall-cards/${dataKey}.json`);
    if (result) {
      result.cards.forEach((card) => allCards.push(card));
    }
  }
  b.trigger("buildUI");
}

export function restoreState() {
  setDisplayState(state.display);
  b.trigger("search");
}

export function results(_, __, el) {
  el.replaceChildren(
    ...filteredCards().map((card) => {
      const subs = {
        __CARD_NAME__: card.name,
        __CARD_ID__: card.id,
        __IMG_SRC__: card.faces[0].image ? card.faces[0].image : "",
        __TYPE_LINES__: card.faces.map((face) => face.type_line).join(),
      };
      return b.render("cardTemplate", subs);
    }),
  );
}

export function search(ev, __, ___) {
  b.debounce("newSearch", "updateState", 200);
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

export function updateState() {
  state.display = getDisplayState();
  b.savePage("state", state);
  b.trigger("results");
}

export function setDisplayState(els) {
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

// const id = el.dataset.r;
// const key = el.dataset.key;

//

// const id = el.dataset.r;
// const key = el.dataset.key;
// let typeAttr = el.getAttribute("type")
//   ? el.getAttribute("type").toLowerCase()
//   : undefined;
// if (key === undefined) {
//   state[id] = {
//     dataset: {},
//     aria: {},
//   };
//   if (typeAttr === "text" && el.value) {
//     state[id].value = el.value;
//   }
//   if (typeAttr === "search" && el.value) {
//     state[id].value = el.value;
//   }
//   if (typeAttr === "checkbox" && el.checked) {
//     state[id].checked = el.checked;
//   }
//   for (const dsKey in el.dataset) {
//     if (dsKey !== "s" && dsKey !== "r") {
//       state[id].dataset[dsKey] = el.dataset[dsKey];
//     }
//   }
//   for (const attr of el.attributes) {
//     if (attr.name.startsWith("aria-")) {
//       const ariaKey = attr.name.replace("aria-", "");
//       state[id].aria[ariaKey] = attr.value;
//     }
//   }
// } else {
//   if (!state[id][key]) {
//     state[id][key] = [];
//   }
//   const item = {};
//   if (typeAttr === "text" && el.value) {
//     item.value = el.value;
//   }
//   if (typeAttr === "search" && el.value) {
//     item.value = el.value;
//   }
//   if (typeAttr === "checkbox" && el.checked) {
//     item.checked = el.checked;
//   }
//   for (const dsKey in el.dataset) {
//     if (dsKey !== "s" && dsKey !== "r" && dsKey !== "key") {
//       item.dataset[dsKey] = el.dataset[dsKey];
//     }
//   }
//   for (const attr of el.attributes) {
//     if (attr.name.startsWith("aria-")) {
//       const ariaKey = attr.name.replace("aria-", "");
//       item.aria[ariaKey] = attr.value;
//     }
//   }
//   state[id][key].push(item);
// }

//

// } }

//export function updateState() {
//console.log(key);

//// if it has a key, save the keys
//console.log(el);
//});
//b.savePage("state", state);

////state.nameSearch = b.qs("[data-r=init_nameSearch");
//  console.log("updateState");
//}

// let leaders = ["a", "b", "c", "d", "e", "f"];
// for (let i = 0; i <= 9; i += 1) leaders.push(`${i}`);
// if (b.debugging) {
//   leaders = ["debug"];
// }
// for (let leader of leaders) {
//   const result = await b.get(`/magic-data/scryfall-cards/${leader}.json`);
//   if (result) {
//     result.cards.forEach((card) => {
//       allCards.push(card);
//     });
//   }
// }
// b.trigger("init_colors init_nameSearch init_debuggingSwitch search");

// export async function init() {
//   state = b.loadPage("state", { debugging: false });
//   b.debugging = state.debugging;
//   let leaders = ["a", "b", "c", "d", "e", "f"];
//   for (let i = 0; i <= 9; i += 1) leaders.push(`${i}`);
//   if (b.debugging) {
//     leaders = ["debug"];
//   }
//   for (let leader of leaders) {
//     const result = await b.get(`/magic-data/scryfall-cards/${leader}.json`);
//     if (result) {
//       result.cards.forEach((card) => {
//         allCards.push(card);
//       });
//     }
//   }
//   b.trigger("init_colors init_nameSearch init_debuggingSwitch search");
// }

// export function init_cardName(_, __, el) {
//   if (state.cardName !== "") {
//     el.value = state.cardName;
//   }
//   el.focus();
// }

// function filterCardName(card) {
//   const value = b.qs("[data-r=uiCardName]").value.trim();
//   if (value === "") return true;
//   const pattern = new RegExp(value, "gi");
//   return card.name.match(pattern) !== null;
// }

// export function resultCount(count, __, el) {
//   el.innerHTML = count;
// }

// export function saveState() {
//   b.savePage("state", state);
// }

// export function results(_, __, el) {
//   const output = allCcards
//     .filter((card) => filterCardName(card));
//   if (output.length === cards.length) {
//     el.innerHTML = "waiting";
//     b.send("tbd", "resultCount");
//   } else {
//     b.send(output.length, "resultCount");
//     el.replaceChildren(
//       ...output
//         .sort((a, b) =>
//           a.name.toLowerCase().localeCompare(b.name.toLowerCase())
//         )
//         .filter((card, index) => index < 20)
//         .map((card) => {
//           const subs = {
//             __CARD_NAME__: card.name,
//             __CARD_ID__: card.id,
//             __IMG_SRC__: card.image_uris.png,
//           };
//           return b.render("cardTemplate", subs);
//         }),
//     );
//   }
// }

// export function toggleDebugging(_, sender, ___) {
//   b.debug(`Debugging: ${sender.aria("checked")}`);
//   sender.toggleAria("checked");
//   state.debugging = sender.ariaBool("checked");
//   b.debuggins = state.debugging;
//   b.trigger("saveState");
// }
