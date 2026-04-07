export const b = {
  init: "blocks",
};

export function blocks(_, __, el) {
  const elWidth = parseInt(el.getBoundingClientRect().width);
  const elHeight = parseInt(el.getBoundingClientRect().height);
  const itemWidth = getItemWidth(
    el.propAsInt("minWidth"),
    el.propAsInt("maxWidth"),
    elWidth,
  );
  const itemHeight = itemWidth / el.propAsInt("ratioWidth") *
    el.propAsInt("ratioHeight");
  const columns = parseInt(elWidth / itemWidth, 10);
  const rows = parseInt(elHeight / itemHeight, 10);
  const cells = columns * rows;
  for (let i = 0; i < cells; i = i + 1) {
    el.append(b.render("cellTemplate"));
  }
  b.setCSS("--cell-width", `${itemWidth}px`);
  b.setCSS("--cell-height", `${itemHeight}px`);
}

function getItemWidth(minWidth, maxWidth, containerWidth) {
  const maxItems = Math.floor(containerWidth / minWidth);
  const optimalWidth = Math.floor(containerWidth / maxItems);
  if (optimalWidth <= maxWidth) {
    return optimalWidth;
  }
  return maxWidth;
}
