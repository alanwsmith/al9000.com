export const b = {
  init: "init",
};

export function init() {
  document.addEventListener("mouseover", (event) => {
    if (
      event.target.dataset && (event.target.dataset.r || event.target.dataset.s)
    ) {
      console.log(event.target.dataset.s, event.target.dataset.r);
    }
  });
}