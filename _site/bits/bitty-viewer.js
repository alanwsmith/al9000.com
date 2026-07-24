export const b = {
  init: "init",
};

export function init() {
  document.addEventListeners("mouseover", (event) => {
    if (event.target.dataset && event.target.dataset.r) {
      console.log(event.target.dataset.r);
    }
  });
}