import decryptInit, {
  decryptBytes,
} from "/tools/encryption/apps/wasm-decryptor/pkg/wasm_decryptor.js";

export const b = { init: "init videoList" };

let assetRoot = "https://frabjous-frangipane-78e763.netlify.app/multi-player";
let layout;
let sourceEl;
let videos = {
  //
  //

  "06e880e9-d204-4715-a89d-c5997fe59a84": {
    title: "",
    dimensions: [16, 9],
    crop: [4, 3],
    youtubeID: "",
  },
  "0a0554c8-e6ab-40d8-854e-1cc190a00842": {
    title: "",
    dimensions: [16, 9],
    crop: [16, 9],
    youtubeID: "",
  },
  "28560a05-6053-4a98-9051-3d0800cf2a51": {
    title: "",
    dimensions: [16, 9],
    crop: [16, 9],
    youtubeID: "",
  },
  "4126931d-d2f1-469e-a90a-a45ecaf48cbb": {
    title: "",
    dimensions: [16, 9],
    crop: [16, 9],
    youtubeID: "",
  },
  "45f3228e-af0d-4f7a-919c-07cee4d315f0": {
    title: "",
    dimensions: [16, 9],
    crop: [16, 9],
    youtubeID: "",
  },
  "a436f3a0-b408-42e1-9af4-6bfa71d92f59": {
    title: "",
    dimensions: [16, 9],
    crop: [16, 9],
    youtubeID: "",
  },
  "b3e46f26-7c36-4ba9-ab0d-320bf0210b2d": {
    title: "",
    dimensions: [16, 9],
    crop: [16, 9],
    youtubeID: "",
  },
  "bcf6fbe2-4852-4510-9cac-4a2c75c7bf1e": {
    title: "",
    dimensions: [16, 9],
    crop: [16, 9],
    youtubeID: "",
  },
  "d9118939-807a-46c8-904c-39658cab52b5": {
    title: "",
    dimensions: [16, 9],
    crop: [16, 9],
    youtubeID: "",
  },
  "db23297f-d8db-4616-a150-169839a7a3ba": {
    title: "",
    dimensions: [16, 9],
    crop: [16, 9],
    youtubeID: "",
  },
  "fc81dcf3-f2fa-4f7c-ac2d-8c9ef9ddae0f": {
    title: "",
    dimensions: [16, 9],
    crop: [16, 9],
    youtubeID: "",
  },
};
//

function getLayout(d) {
  let cellWidth = Math.floor(d.containerWidth / d.minColumns);
  for (let columns = d.minColumns + 2; columns <= d.maxColumns; columns += 2) {
    const checkWidth = Math.floor(d.containerWidth / columns);
    if (checkWidth > d.maxWidth) {
      cellWidth = checkWidth;
    } else {
      break;
    }
  }
  const cellHeight = Math.floor(cellWidth / d.ratioWidth * d.ratioHeight);
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

export async function init() {
  await decryptInit();
  if (window.navigator.userAgent.includes("Firefox")) {
    b.addStyles(`video { transform: rotate(0.08deg);}`);
  }
}

export function play() {
  const videoEls = b.qsa("video");
  for (let vidIndex = 0; vidIndex < videoEls.length; vidIndex += 1) {
    let centerRow = 2;
    if (layout.rows < 5) {
      centerRow = Math.floor((layout.rows - 1) / 2);
    }
    const centerCol = Math.floor((layout.columns - 1) / 2);
    const currentCol = Math.floor(vidIndex % layout.columns);
    const currentRow = Math.floor(vidIndex / layout.columns);
    const distance = Math.abs(currentCol - centerCol) +
      Math.abs(currentRow - centerRow);
    if (distance === 0) {
      videoEls[vidIndex].muted = false;
    } else {
      videoEls[vidIndex].muted = true;
    }
    const tout = setTimeout(() => {
      videoEls[vidIndex].play();
    }, distance * 180);
  }
}

export async function selectVideo(_, sender, el) {
  const id = sender.value;
  const video = videos[id];
  if (id) {
    el.replaceChildren(b.render("loading"));
    layout = getLayout(
      {
        maxWidth: 160,
        containerWidth: parseInt(el.getBoundingClientRect().width) - 10,
        containerHeight: parseInt(el.getBoundingClientRect().height),
        ratioWidth: video.crop[0],
        ratioHeight: video.crop[1],
        minColumns: 5,
        maxColumns: 19,
      },
    );
  }

  // This does the aspect ration bump.
  const videoWidth = layout.cellHeight * video.dimensions[0] /
    video.dimensions[1];
  console.log(layout.cellWidth, videoWidth);
  b.setCSS("--video-width", `${videoWidth}px`);
  const videoLeft = (layout.cellWidth - videoWidth) / 2;
  b.setCSS("--video-left", `${videoLeft - 1}px`);
  console.log("left", videoLeft);
  // STARTING_HEIGHT * OUTPUT_WIDTH / STARTING_WIDTH
  const videoHeight = layout.cellHeight * videoWidth / layout.cellWidth;
  const videoUp = (layout.cellHeight - videoHeight) / 2;
  b.setCSS("--video-up", `${videoUp - 1}px`);
  // const videoHeight = layout.cellHeight * video.crop[0] /
  //   video.crop[1];
  // console.log(layout.cellHeight, videoHeight);
  // b.setCSS("--video-height", `${videoHeight}px`);
  // b.setCSS("--video-width", `${layout.cellWidth}px`);
  // let videoWidth = layout.cellWidth * video.crop[0] /
  //   video.crop[1];
  // console.log(layout.cellWidth, videoWidth);
  // b.setCSS("--video-width", `${videoWidth}px`);
  // const videoHeight = layout.cellHeight * video.dimensions[0] /
  //   video.dimensions[1];
  // console.log(layout.cellHeight, videoHeight);
  // b.setCSS("--video-height", `${videoHeight}px`);
  // const videoUp = (layout.cellHeight - videoHeight) / 2;
  // b.setCSS("--video-up", `${videoUp}px`);
  // let videoWidth = video.crop[0] * layout.cellHeight /
  //   video.crop[1];
  // console.log(layout.cellWidth, videoWidth);
  // b.setCSS("--cell-width", `${layout.cellWidth}px`);
  // const videoLeft = (layout.cellWidth - videoWidth) / 2;
  // b.setCSS("--video-left", `${videoLeft}px`);
  // console.log("left", videoLeft);
  b.setCSS("--cell-width", `${layout.cellWidth}px`);
  b.setCSS(
    "--aspect-ratio",
    `${video.crop[0]} / ${video.crop[1]}`,
  );

  // const url = `tracks/payload-${index}.mp4.bin`;
  const url = `tmp-track-check/${id}.webm.bin`;

  const response = await fetch(url);
  if (response.ok) {
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const responseBytes = await decryptBytes(bytes);
    const videoBlob = new Blob([responseBytes], { type: "video/webm" });
    const videoData = URL.createObjectURL(videoBlob);

    // sourceEl = b.ce(`video`);
    // sourceEl.playsinline = true;
    // sourceEl.src = videoData;
    //sourceEl.src = "tmp-track-check/output.mp4";
    await b.sleep(200);
    el.replaceChildren();
    for (let i = 0; i < layout.cells; i = i + 1) {
      const newVideo = b.ce(`video`);
      newVideo.playsinline = true;
      newVideo.src = videoData;

      //const videoCopy = sourceEl.cloneNode(true);
      el.appendChild(b.render("cell", { __VIDEO__: newVideo }));
      if (i === 0) {
        newVideo.addEventListener("canplaythrough", async () => {
          console.log("HERE3");
          await b.sleep(3000);
          b.trigger("play");
        });
      }
    }

    //sourceEl = b.ce(`video`);
    //sourceEl.playsinline = true;
    //sourceEl.src = videoData;
    ////sourceEl.src = "tmp-track-check/output.mp4";
    //await b.sleep(400);
    //el.replaceChildren();
    //for (let i = 0; i < layout.cells; i = i + 1) {
    //  const videoCopy = sourceEl.cloneNode(true);
    //  el.appendChild(b.render("cell", { __VIDEO__: videoCopy }));
    //  if (i === 0) {
    //    videoCopy.addEventListener("canplaythrough", async () => {
    //      console.log("HERE3");
    //      await b.sleep(5000);
    //      b.trigger("play");
    //    });
    //  }
    //}
  } else {
    el.innerHTML = "Error: Could not load video. Please check back later.";
  }

  // const response = await fetch(url);
  // if (response.ok) {
  //   const blob = await response.blob();
  //   const buffer = await blob.arrayBuffer();
  //   const bytes = new Uint8Array(buffer);
  //   const responseBytes = await decrypt_file(bytes, "music");
  //   const videoBlob = new Blob([responseBytes], { type: "video/mp4" });
  //   const videoData = URL.createObjectURL(videoBlob);
  //   sourceEl = b.ce(`video`);
  //   sourceEl.playsinline = true;
  //   sourceEl.src = videoData;
  //   await b.sleep(400);
  //   el.replaceChildren();
  //   for (let i = 0; i < layout.cells; i = i + 1) {
  //     const videoCopy = sourceEl.cloneNode(true);
  //     if (i === 0) {
  //       videoCopy.addEventListener("canplaythrough", async () => {
  //         await b.sleep(100);
  //         b.trigger("play");
  //       });
  //     }
  //     el.appendChild(b.render("cell", { __VIDEO__: videoCopy }));
  //   }
  // } else {
  //   el.innerHTML = "Error: Could not load video. Please check back later.";
  // }

  // if (index !== NaN) {
  //   if (!b.templates.welcome) {
  //     b.templates.welcome = b.qs(".welcome").outerHTML;
  //   }
  //   el.replaceChildren(b.render("loading"));
  //   const index = sender.valueAsInt();
  //   layout = getLayout(
  //     {
  //       maxWidth: 160,
  //       containerWidth: parseInt(el.getBoundingClientRect().width) - 10,
  //       containerHeight: parseInt(el.getBoundingClientRect().height),
  //       ratioWidth: videos[index].crop[0],
  //       ratioHeight: videos[index].crop[1],
  //       minColumns: 5,
  //       maxColumns: 19,
  //     },
  //   );
  //   // STARTING_WIDTH * OUTPUT_HEIGHT / STARTING_HEIGHT
  //   // This does the aspect ration bump.
  //   const videoWidth = layout.cellHeight * videos[index].dimensions[0] /
  //     videos[index].dimensions[1];
  //   console.log(layout.cellWidth, videoWidth);
  //   b.setCSS("--video-width", `${videoWidth}px`);
  //   const videoLeft = (layout.cellWidth - videoWidth) / 2;
  //   b.setCSS("--video-left", `${videoLeft - 1}px`);
  //   console.log("left", videoLeft);
  //   // STARTING_HEIGHT * OUTPUT_WIDTH / STARTING_WIDTH
  //   const videoHeight = layout.cellHeight * videoWidth / layout.cellWidth;
  //   const videoUp = (layout.cellHeight - videoHeight) / 2;
  //   b.setCSS("--video-up", `${videoUp - 1}px`);
  //   // const videoHeight = layout.cellHeight * videos[index].crop[0] /
  //   //   videos[index].crop[1];
  //   // console.log(layout.cellHeight, videoHeight);
  //   // b.setCSS("--video-height", `${videoHeight}px`);
  //   // b.setCSS("--video-width", `${layout.cellWidth}px`);
  //   // let videoWidth = layout.cellWidth * videos[index].crop[0] /
  //   //   videos[index].crop[1];
  //   // console.log(layout.cellWidth, videoWidth);
  //   // b.setCSS("--video-width", `${videoWidth}px`);
  //   // const videoHeight = layout.cellHeight * videos[index].dimensions[0] /
  //   //   videos[index].dimensions[1];
  //   // console.log(layout.cellHeight, videoHeight);
  //   // b.setCSS("--video-height", `${videoHeight}px`);
  //   // const videoUp = (layout.cellHeight - videoHeight) / 2;
  //   // b.setCSS("--video-up", `${videoUp}px`);
  //   // let videoWidth = videos[index].crop[0] * layout.cellHeight /
  //   //   videos[index].crop[1];
  //   // console.log(layout.cellWidth, videoWidth);
  //   // b.setCSS("--cell-width", `${layout.cellWidth}px`);
  //   // const videoLeft = (layout.cellWidth - videoWidth) / 2;
  //   // b.setCSS("--video-left", `${videoLeft}px`);
  //   // console.log("left", videoLeft);
  //   b.setCSS("--cell-width", `${layout.cellWidth}px`);
  //   b.setCSS(
  //     "--aspect-ratio",
  //     `${videos[index].crop[0]} / ${videos[index].crop[1]}`,
  //   );
  //   const url = `tracks/payload-${index}.mp4.bin`;
  //   const response = await fetch(url);
  //   if (response.ok) {
  //     const blob = await response.blob();
  //     const buffer = await blob.arrayBuffer();
  //     const bytes = new Uint8Array(buffer);
  //     const responseBytes = await decrypt_file(bytes, "music");
  //     const videoBlob = new Blob([responseBytes], { type: "video/mp4" });
  //     const videoData = URL.createObjectURL(videoBlob);
  //     sourceEl = b.ce(`video`);
  //     sourceEl.playsinline = true;
  //     sourceEl.src = videoData;
  //     await b.sleep(400);
  //     el.replaceChildren();
  //     for (let i = 0; i < layout.cells; i = i + 1) {
  //       const videoCopy = sourceEl.cloneNode(true);
  //       if (i === 0) {
  //         videoCopy.addEventListener("canplaythrough", async () => {
  //           await b.sleep(100);
  //           b.trigger("play");
  //         });
  //       }
  //       el.appendChild(b.render("cell", { __VIDEO__: videoCopy }));
  //     }
  //   } else {
  //     el.innerHTML = "Error: Could not load video. Please check back later.";
  //   }
  // }

  //
}

export async function videoList(_, __, el) {
  el.appendChild(b.render(`<option>Choose a video</option>`));
  [...Object.entries(videos)].forEach(([id, video], index) => {
    el.appendChild(b.render("option", {
      __ID__: id,
      __TITLE__: video.title,
    }));
  });
}
