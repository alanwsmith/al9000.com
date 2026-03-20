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
  for (const [key, payload] of Object.entries(state)) {
    if (key.startsWith("display_")) {
      if (Array.isArray(payload)) {
        // TODO: Handle unpacking keys here
      } else {
        const el = b.qs(`[data-r="${key}"]`);
        for (const dsKey in payload.dataset) {
          el.setAttribute(`data-${dsKey}`, payload.dataset[dsKey]);
        }
        for (const ariaKey in payload.aria) {
          el.setAttribute(`aria-${ariaKey}`, payload.aria[ariaKey]);
        }
        if (payload.value) {
          el.value = payload.value;
        }
      }
    }
  }
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
    __RECEIVE__: "display_debuggingToggle",
    __SEND__: "update_debuggingToggle",
  };
  el.replaceChildren(b.switch(subs));
}

export function update_debuggingToggle(_, sender, ___) {
  sender.toggleAria("checked");
  updateState();
}

export function updateState() {
  b.qsa(`[data-r^="display_"]`).forEach((el) => {
    const id = el.dataset.r;
    const key = el.dataset.key;
    if (key === undefined) {
      state[id] = {
        dataset: {},
        aria: {},
      };
      if (el.value) {
        state[id].value = el.value;
      }
      for (const dsKey in el.dataset) {
        if (dsKey !== "s" && dsKey !== "r") {
          state[id].dataset[dsKey] = el.dataset[dsKey];
        }
      }
      for (const attr of el.attributes) {
        if (attr.name.startsWith("aria-")) {
          const ariaKey = attr.name.replace("aria-", "");
          state[id].aria[ariaKey] = attr.value;
        }
      }
    } else {
      state[id] = [];
    }
  });
  b.savePage("state", state);
}

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
