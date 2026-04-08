export const b = { init: "cells" };

export function cells(_, __, el) {
  const layout = getLayout(
    {
      maxWidth: el.propAsInt("maxWidth"),
      containerWidth: parseInt(el.getBoundingClientRect().width),
      containerHeight: parseInt(el.getBoundingClientRect().height),
      ratioWidth: el.propAsInt("ratioWidth"),
      ratioHeight: el.propAsInt("ratioHeight"),
      minColumns: 5,
      maxColumns: 19,
    },
  );
  console.log(layout);
  el.replaceChildren();
  for (let i = 0; i < layout.cells; i = i + 1) {
    el.append(b.render("cellTemplate"));
  }
  b.setCSS("--cell-width", `${layout.cellWidth}px`);
  b.setCSS("--cell-height", `${layout.cellHeight}px`);
}