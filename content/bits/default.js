export const b = { init: "initDetails initCodeButtons" };

let s = {
  details: { data: {}, key: `details-opener` },
};

export async function initDetails() {
  s.details.data = await b.loadPageData(s.details.key, []);
  b.qsa("details").forEach((el, index) => {
    el.open = s.details.data[index] ? true : false;
    el.addEventListener("toggle", (_) => updateData());
  });
}

export async function updateData() {
  b.qsa("details").forEach((el, index) => {
    s.details.data[index] = el.open;
  });
  await b.savePageData(s.details.key, s.details.data);
}

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
  if (sender.prop("copyId") === el.prop("copyId")) {
    await b.quickCopy(el, sender);
  }
}
