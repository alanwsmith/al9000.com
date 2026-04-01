import init, { decrypt_file } from "./pkg/static_site_file_decryption.js";

async function decryptTextFileFromForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const url = formData.get("url");
  const password = formData.get("password");
  const resultsEl = event.target.querySelector("#results");
  if (!password) {
    resultsEl.innerHTML = "A password is required";
    return;
  }
  const response = await fetch(url);
  try {
    if (!response.ok) {
      resultsEl.innerHTML =
        `ERROR: ${response.status} - ${response.statusText} - ${url}`;
    } else {
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const responseBytes = await decrypt_file(bytes, password);
      const text = new TextDecoder().decode(responseBytes);
      resultsEl.innerHTML = text;
    }
  } catch (error) {
    resultsEl.innerHTML = `ERROR: ${error}`;
  }
}

async function main() {
  await init();
  document.querySelectorAll(".decryptTextFile").forEach((form) => {
    form.addEventListener("submit", (event) => {
      decryptTextFileFromForm(event);
    });
  });
}

main();
