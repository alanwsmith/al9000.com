export const b = { init: "init" };

export async function init(_, __, el) {
  // Fix for multiple videos bugging out and
  // not rendering.
  if (window.navigator.userAgent.includes("Firefox")) {
    b.addStyles(`video { transform: rotate(0.01deg);}`);
  }

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
  b.trigger("initVideos");

  //   el.addEventListener("ended", (event) => {
  //     // event.target.src = "/assembly/clips/assembly-_V1-0005.mp4";
  //     // event.target.play();
  //     console.log(event);
  //   });
  // });

  // b.qs("#v1").play();
}

export function initVideos() {
  [...b.qsa("video")].forEach((el) => {
    const index = b.randomInt(1, 9);
    el.src = `/assembly/clips/assembly-_V1-000${index}.mp4`;
    el.play();
  });
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