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
  b.trigger("ui_colors ui_debuggingSwitch restoreState");
}

export async function loadStateAndData() {
  state = b.loadPage("state", { debugging: false });
  console.log(state);
  // Clear the state
  // state = {};
  // b.savePage("state", state);

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
        allCards.push(card);
      });
    }
  }
  b.trigger("buildUI");
  //b.trigger("init_colors init_nameSearch init_debuggingSwitch search");
  // for (const [key, value] of Object.entries(state)) {
  //   if (key.startsWith("value_")) {
  //     b.qs(`[data-r="${key}"]`).value = value;
  //   }
  // }
}

export function restoreState() {
  setDisplayState(state.display);

  //

  // for (const [key, payload] of Object.entries(state)) {
  //   if (key.startsWith("display_")) {
  //     const el = b.qs(`[data-r="${key}"]`);
  //     console.log(payload);
  //     for (const dsKey in payload.dataset) {
  //       el.setAttribute(`data-${dsKey}`, payload.dataset[dsKey]);
  //     }
  //     for (const ariaKey in payload.aria) {
  //       el.setAttribute(`aria-${ariaKey}`, payload.aria[ariaKey]);
  //     }
  //     if (payload.value) {
  //       el.value = payload.value;
  //     }
  //     if (payload.checked) {
  //       el.checked = payload.checked;
  //     }
  //   }
  // }

  //
}

export function search(ev, __, ___) {
  b.debounce("newSearch", "updateState", 200);
}

export function ui_colors(_, __, el) {
  el.replaceChildren(
    ...Object.keys(colorKeys).map((key) => {
      return b.render("colorTemplate", {
        __COLOR_KEY__: key,
        __COLOR_NAME__: colorKeys[key].name,
      });
    }),
  );
}

export function ui_debuggingSwitch(_, __, el) {
  const subs = {
    __APPEND__: "Debugging",
    __RECEIVE__: "displayDebuggingToggle",
    __SEND__: "updateDebuggingToggle",
  };
  el.replaceChildren(b.switch(subs));
}

export function updateDebuggingToggle(_, sender, ___) {
  sender.toggleAria("checked");
  updateState();
}

export function updateState() {
  state.display = getDisplayState();
  console.log(state);
  b.savePage("state", state);
  b.trigger("results");
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
