import init, { hello_world } from "./pkg/hello_world.js";

async function main() {
  await init();
  const el = document.querySelector("#output");
  el.innerHTML = hello_world();
}

main();
