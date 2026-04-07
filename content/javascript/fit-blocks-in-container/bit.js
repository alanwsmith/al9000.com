export const b = { init: "blocks" };

export function blocks(_, __, el) {
  const layout = getBlockLayout(
    el.propAsInt("minWidth"),
    el.propAsInt("maxWidth"),
    parseInt(el.getBoundingClientRect().width),
    parseInt(el.getBoundingClientRect().height),
    el.propAsInt("ratioWidth"),
    el.propAsInt("ratioHeight"),
  );

  for (let i = 0; i < layout.cells; i = i + 1) {
    el.append(b.render("cellTemplate"));
  }
  b.setCSS("--cell-width", `${layout.cellWidth}px`);
  b.setCSS("--cell-height", `${layout.cellHeight}px`);
}

function getBlockLayout(
  minWidth,
  maxWidth,
  containerWidth,
  containerHeight,
  ratioWidth,
  ratioHeight,
) {
  const maxItems = Math.floor(containerWidth / minWidth);
  let cellWidth = Math.floor(containerWidth / maxItems);
  if (cellWidth > maxWidth) {
    cellWidth = maxWidth;
  }
  const cellHeight = cellWidth / ratioWidth * ratioHeight;
  const columns = parseInt(containerWidth / cellWidth, 10);
  const rows = parseInt(containerHeight / cellHeight, 10);
  const cells = columns * rows;
  return {
    cellWidth: cellWidth,
    cellHeight: cellHeight,
    columns: columns,
    rows: rows,
    cells: cells,
  };
}

export function _origina_blocks(_, __, el) {
  const elWidth = parseInt(el.getBoundingClientRect().width);
  const elHeight = parseInt(el.getBoundingClientRect().height);
  const itemWidth = getBlockLayout(
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

function _original_getBlockLayout(minWidth, maxWidth, containerWidth) {
  const maxItems = Math.floor(containerWidth / minWidth);
  const optimalWidth = Math.floor(containerWidth / maxItems);
  if (optimalWidth <= maxWidth) {
    return optimalWidth;
  }
  return maxWidth;
}
