import init, { decrypt_file } from "./pkg/static_site_file_decryption.js";

let videoData;

export const b = { init: "players" };

export async function players(_, __, el) {
  await init();
  const url = "tracks/music-1.mp4.bin";
  const response = await fetch(url);
  if (response.ok) {
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const responseBytes = await decrypt_file(bytes, "music");
    const videoBlob = new Blob([responseBytes], { type: "video/mp4" });
    videoData = URL.createObjectURL(videoBlob);
  }

  const layout = getBlockLayout(
    el.propAsInt("minWidth"),
    el.propAsInt("maxWidth"),
    parseInt(el.getBoundingClientRect().width),
    parseInt(el.getBoundingClientRect().height),
    el.propAsInt("ratioWidth"),
    el.propAsInt("ratioHeight"),
  );
  console.log(layout);

  for (let i = 0; i < layout.cells; i = i + 1) {
    el.append(b.render("cellTemplate"));
  }
  b.setCSS("--cell-width", `${layout.cellWidth}px`);
  b.setCSS("--cell-height", `${layout.cellHeight}px`);
  b.trigger("vidTest");
}

export async function vidTest(_, __, el) {
  //  const videoData = URL.createObjectURL(videoBlob);
  el.src = videoData;
  // await init();
  // const url = "tracks/music-1.mp4.bin";
  // const response = await fetch(url);
  // if (response.ok) {
  //   const blob = await response.blob();
  //   const buffer = await blob.arrayBuffer();
  //   const bytes = new Uint8Array(buffer);
  //   const responseBytes = await decrypt_file(bytes, "music");
  //   const vidBlob = new Blob([responseBytes], { type: "video/mp4" });
  //   const url = URL.createObjectURL(vidBlob);
  //   el.src = url;
  // }
}

export async function play(_, __, ___) {
  const videoEls = b.qsa("video");
  for (let vidIndex = 0; vidIndex < videoEls.length; vidIndex += 1) {
    if (vidIndex === 10) {
      videoEls[vidIndex].muted = false;
    } else {
      videoEls[vidIndex].muted = true;
    }
    videoEls[vidIndex].play();
    await b.sleep(70);
  }
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
