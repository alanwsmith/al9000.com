import decryptInit, {
  decrypt_file,
} from "./pkg/static_site_file_decryption.js";

export const b = { init: "init videoList" };

export async function init() {
  await decryptInit();
  if (window.navigator.userAgent.includes("Firefox")) {
    b.addStyles(`video { transform: rotate(0.08deg);}`);
  }
}

export async function videoList(_, __, el) {
  const response = await fetch("/multi-player/config.json");
  if (response.ok) {
    const json = await response.json();
    [...Object.entries(json.tracks)].forEach(([key, data]) => {
      el.appendChild(b.render("option", {
        __UUID__: key,
        __TITLE__: data.title,
      }));

      console.log(key);
      console.log(data);
    });
  }
}
