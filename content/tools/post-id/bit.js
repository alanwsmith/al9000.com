export const b = { init: "makePostID" };

export function copyPostID(_, sender, el) {
  b.quickCopy(el, sender);
}

export function makePostID(_, __, el) {
  const now = new Date();
  const year = now.getFullYear() % 100;
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const tenSecondInterval = Math.floor(now.getSeconds() / 10); // 0-5
  const combined = year * 12 * 31 * 24 * 60 * 6 +
    (month - 1) * 31 * 24 * 60 * 6 +
    (day - 1) * 24 * 60 * 6 +
    hour * 60 * 6 +
    minute * 6 +
    tenSecondInterval;
  el.innerHTML = combined
    .toString(36)
    .padStart(6, "0")
    .match(/.{1,2}/g)
    .join("/");
}
