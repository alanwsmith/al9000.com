// Set up state (can add defaults here if needed)
let s = {};

export const b = { init: "loadState" };

// Load state and fire inits
export async function loadState() {
  s = await b.loadPageData("state", s);
  b.trigger("initDetails initCodeButtons");
}

// Details Opener
export async function initDetails() {
  if (!s.details) {
    s.details = { data: [] };
  }
  b.qsa("details").forEach((el, index) => {
    el.open = s.details.data[index] ? true : false;
    el.addEventListener("toggle", (_) => updateData());
  });
}

export async function updateData() {
  b.qsa("details").forEach((el, index) => {
    s.details.data[index] = el.open;
  });
  await b.savePageData("state", s);
}

// Automatic Code Buttons
export function initCodeButtons() {
  const blocks = b.qsa(".code-block");
  for (let block of blocks) {
    if (
      !block.classList.contains("no-buttons") &&
      !block.classList.contains("no-copy")
    ) {
      const uuid = self.crypto.randomUUID();
      const preEl = block.querySelector("pre");
      preEl.dataset.copyId = uuid;
      preEl.dataset.r = `${preEl.dataset.r} copyCode`;
      const button = document.createElement("button");
      button.innerHTML = "Copy";
      button.dataset.s = "copyCode";
      button.dataset.copyId = uuid;
      block.appendChild(button);
    }
  }
}

export async function copyCode(_, sender, el) {
  if (sender.key("copyId") === el.key("copyId")) {
    await b.copy(el, sender);
  }
}

// Copy the contents of an element
export async function copyElement(_, sender, ___) {
  await b.copy(sender, sender);
}
