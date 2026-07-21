export const b = { init: "initDetails" };

let s = {
  details: {
    data: {},
    key: `details-opener`,
  },
};

export async function initDetails() {
  s.details.data = await b.loadPageData(s.details.key, []);
  b.qsa("details").forEach((el, index) => {
    el.open = s.details.data[index] ? true : false;
    el.addEventListener("toggle", (_) => updateData());
  });
}

async function updateData() {
  b.qsa("details").forEach((el, index) => {
    s.details.data[index] = el.open;
  });
  await b.savePageData(s.details.data, s.details.key);
}