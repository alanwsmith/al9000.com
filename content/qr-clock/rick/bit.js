function timestamp(datetime) {
  const parts = {};
  new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
    hour12: false,
  })
    .formatToParts(datetime)
    .filter((part) => part.type !== "literal")
    .forEach((part) => parts[part.type] = part.value);
  const date = [parts.year, parts.month, parts.day].join("-");
  const time = [parts.hour, parts.minute, parts.second].join(":");
  return `${date}T${time}.${parts.fractionalSecond}`;
}

export const b = {
  init: "showTime",
};

export function showTime(_, __, el) {
  const params = new URLSearchParams(window.location.search);
  const ts = parseInt(params.get("time"));
  if (ts) {
    const datetime = new Date(ts);
    const date = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(datetime);

    const time = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(datetime);
    el.innerHTML =
      `<div class="center">${time}</div><div class="center">${date}</div>`;
  } else {
    el.innerHTML = `<div class="center">???</div>`;
  }
}
