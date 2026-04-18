import KSUID from "./ksuid.js";

export const b = { init: "init" };

export function init() {
  const id = KSUID.random();
  console.log(id.toString()); // "0ujsswThIGTUYm2K8FjOOfXtY1K"
}