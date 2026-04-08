function getLayout(d) {
  let cellWidth = Math.floor(d.containerWidth / d.minColumns);
  console.log(d);
  for (let columns = d.minColumns + 2; columns <= d.maxColumns; columns += 2) {
    const checkWidth = Math.floor(d.containerWidth / columns);
    console.log(checkWidth, d.maxWidth);

    if (checkWidth > d.maxWidth) {
      cellWidth = checkWidth;
    }
  }
  const cellHeight = parseInt(cellWidth / d.ratioWidth * d.ratioHeight);
  const columns = parseInt(d.containerWidth / cellWidth, 10);
  const rows = parseInt(d.containerHeight / cellHeight, 10);
  const cells = columns * rows;
  return {
    cellWidth: cellWidth,
    cellHeight: cellHeight,
    columns: columns,
    rows: rows,
    cells: cells,
  };
}

// const maxItems = Math.floor(containerWidth / minWidth);
// let cellWidth = Math.floor(containerWidth / maxItems);
// if (cellWidth > maxWidth) {
//   cellWidth = maxWidth;
// }
// const cellHeight = cellWidth / ratioWidth * ratioHeight;
// const columns = parseInt(containerWidth / cellWidth, 10);
// const rows = parseInt(containerHeight / cellHeight, 10);
// const cells = columns * rows;
// return {
//   cellWidth: cellWidth,
//   cellHeight: cellHeight,
//   columns: columns,
//   rows: rows,
//   cells: cells,
// };