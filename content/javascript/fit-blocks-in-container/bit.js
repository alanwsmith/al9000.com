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
