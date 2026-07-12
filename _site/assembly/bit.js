export const b = { init: "init" };

const clipCount = 18;

export async function init(_, __, el) {
  // Fix for multiple videos bugging out and
  // not rendering.
  if (window.navigator.userAgent.includes("Firefox")) {
    b.addStyles(`video { transform: rotate(0.01deg);}`);
  }

  // Put a message up that this doesn't seem to
  // work in safari.
  if (
    window.navigator.userAgent.includes("Safari") &&
    !window.navigator.userAgent.includes("Chrome") &&
    !window.navigator.userAgent.includes("Firefox")
  ) {
    console.log(window.navigator.userAgent);
    el.innerHTML = `<p class="message">Unfortunately, this page doesn't work in 
your browser. I'm not sure what's going on with it, but Safari won't 
render it even though it works find in Chrome and Firefox. Give one of 
    those a try if you want to see the page in action.</p>`;
    return;
  }

  const layout = getBlockLayout(
    el.propAsInt("minWidth"),
    el.propAsInt("maxWidth"),
    parseInt(el.getBoundingClientRect().width),
    parseInt(el.getBoundingClientRect().height),
    el.propAsInt("ratioWidth"),
    el.propAsInt("ratioHeight"),
  );
  layout.cellWidth -= layout.cellWidth % 2;
  b.setCSS("--cell-width", `${layout.cellWidth}px`);
  b.setCSS("--cell-height", `${layout.cellHeight}px`);

  for (let layerIndex = 0; layerIndex <= 1; layerIndex = layerIndex + 1) {
    const cells = [...new Array(layout.cells)].map((_, index) => {
      return b.render("cellTemplate", {
        __LAYER__: layerIndex,
        __INDEX__: index,
      });
    });
    el.appendChild(b.render("layerTemplate", {
      __CELLS__: cells,
    }));
  }

  b.qsa("video").forEach((el) => {
    el.addEventListener("ended", async (event) => {
      const otherLayer = event.target.dataset.layer === "0" ? "1" : "0";
      const index = event.target.dataset.index;
      const switchTo = b.qs(
        `video[data-layer='${otherLayer}'][data-index='${index}']`,
      );
      switchTo.play();
      switchTo.classList.remove("hidden");
      // delay a little to help prevent chrome from blinking
      // when switching videos.
      await b.sleep(90);
      event.target.classList.add("hidden");
      const vidIndex = b.randomInt(1, clipCount);
      event.target.src = `/assembly/clips/assembly-${vidIndex}.mp4`;
    });
  });

  b.qsa("video[data-layer='0']").forEach((el) => {
    const index = b.randomInt(1, clipCount);
    el.src = `/assembly/clips/assembly-${index}.mp4`;
  });

  b.qsa("video[data-layer='1']").forEach((el) => {
    const index = b.randomInt(1, clipCount);
    el.src = `/assembly/clips/assembly-${index}.mp4`;
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