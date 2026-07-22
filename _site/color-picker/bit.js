export const b = {
  init: "init",
};

let s = {};
let defaults = {
  modes: [
    {
      __KEY__: "light",
      __CHECKED__: "checked",
    },
    {
      __KEY__: "dark",
      __CHECKED__: "",
    },
  ],
};

export async function init() {
  // await b.savePageData(defaults, "data");
  s = await b.loadPageData("data", defaults);
  b.trigger("initModeButtons");
}

export function initModeButtons(_, __, el) {
  for (let mode of s.modes) {
    el.appendChild(
      b.render("modeButton", mode),
    );
  }
}

export async function selectMode(_, sender, ___) {
  console.log(sender);
  for (let mode of s.modes) {
    if (sender.prop("key")) {
      mode["__CHECKED__"] = "checked";
    } else {
      mode["__CHECKED__"] = "";
    }
  }
  await b.savePageData(s, "data");
}