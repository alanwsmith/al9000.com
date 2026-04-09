import decryptInit, {
  decrypt_file,
} from "./pkg/static_site_file_decryption.js";
export const b = { init: "init videoList" };

// let dimensions = [16, 9];
let layout;
let sourceEl;
// let videoData;
let videos = [
  { name: "Once in a Lifetime", dimensions: [4, 3] },
  { name: "WTF", dimensions: [16, 9] },
  { name: "One Vision", dimensions: [16, 9] },
  { name: "Somebody I Used to Know", dimensions: [16, 9] },
  { name: "Tank", dimensions: [16, 9] },
  { name: "Like Sugar", dimensions: [16, 9] },
  { name: "Shot Me Down", dimensions: [16, 9] },
];
// let videoEls = [];

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
  // if (window.navigator.userAgent.includes("Firefox")) {
  //   b.addStyles(`video { transform: scale(113%);}`);
  // }
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
    // console.log(vidIndex, currentCol, currentRow);
    // console.log(distance);
    if (distance === 0) {
      videoEls[vidIndex].muted = false;
    } else {
      videoEls[vidIndex].muted = true;
    }
    const tout = setTimeout(() => {
      videoEls[vidIndex].play();
    }, distance * 180);
  }
  // console.log(centerRow);
  // for (let vidIndex = 0; vidIndex < videoEls.length; vidIndex += 1) {
  //   if (vidIndex === 10) {
  //     videoEls[vidIndex].muted = false;
  //   } else {
  //     videoEls[vidIndex].muted = true;
  //   }
  //   videoEls[vidIndex].play();
  //   await b.sleep(30);
  // }
}

export async function selectVideo(_, sender, el) {
  const index = sender.valueAsInt();
  if (index !== NaN) {
    if (!b.templates.welcome) {
      b.templates.welcome = b.qs(".welcome").outerHTML;
    }
    el.replaceChildren(b.render("loading"));
    const index = sender.valueAsInt();
    layout = getLayout(
      {
        maxWidth: 160,
        containerWidth: parseInt(el.getBoundingClientRect().width) - 10,
        containerHeight: parseInt(el.getBoundingClientRect().height),
        ratioWidth: videos[index].dimensions[0],
        ratioHeight: videos[index].dimensions[1],
        minColumns: 5,
        maxColumns: 19,
      },
    );
    b.setCSS("--cell-width", `${layout.cellWidth}px`);
    b.setCSS(
      "--aspect-ratio",
      `${videos[index].dimensions[0]} / ${videos[index].dimensions[1]}`,
    );
    const url = `tracks/music-${index}.mp4.bin`;
    const response = await fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const responseBytes = await decrypt_file(bytes, "music");
      const videoBlob = new Blob([responseBytes], { type: "video/mp4" });
      const videoData = URL.createObjectURL(videoBlob);

      // let binary = "";
      // for (let bi = 0; bi < responseBytes.length; bi++) {
      //   binary += String.fromCharCode(responseBytes[bi]);
      // }
      // const videoBase = `data:video/mp4;base64,${btoa(binary)}`;

      // const videoBlob = new Blob([responseBytes], { type: "video/mp4" });
      //const videoData = URL.createObjectURL(videoBlob);
      //const text = new TextDecoder().decode(responseBytes);
      // const videoBase = `data:video/mp4;base64,${btoa(text)}`;
      sourceEl = b.ce(`video`);
      sourceEl.playsinline = true;
      sourceEl.src = videoData;
      //sourceEl.src = videoBase;
      // brief delay so loading doesn't do a distracting fast blink.
      await b.sleep(400);
      el.replaceChildren();
      // videoEls = [];
      for (let i = 0; i < layout.cells; i = i + 1) {
        // console.log(i);
        const videoCopy = sourceEl.cloneNode(true);
        if (i === 0) {
          videoCopy.addEventListener("canplaythrough", async () => {
            console.log("ready");
            await b.sleep(100);
            b.trigger("play");
          });
        }
        // videoEls.push(
        //   b.render("cell", { __VIDEO__: videoCopy }),
        // );
        el.appendChild(b.render("cell", { __VIDEO__: videoCopy }));
        // el.appendChild(b.render("cell", { __VIDEO__: "" }));
      }

      // console.log("video prepped");
      //b.trigger("");

      //
    } else {
      el.innerHTML = "Error: Could not load video. Please check back later.";
    }
  }
}

// const url = `tracks/music-${videoIndex}.mp4.bin`;
// const response = await fetch(url);

// // console.log("loading...");
// b.send("Loading", "playButton");
// const selectEl = b.qs(`[data-r="videoList"]`);
// const videoIndex = parseInt(selectEl.value, 10);
// layout = getLayout(
//   {
//     maxWidth: 160,
//     containerWidth: parseInt(el.getBoundingClientRect().width) - 10,
//     containerHeight: parseInt(el.getBoundingClientRect().height),
//     ratioWidth: videos[videoIndex].dimensions[0],
//     ratioHeight: videos[videoIndex].dimensions[1],
//     minColumns: 5,
//     maxColumns: 19,
//   },
// );
// console.log(layout);
// el.replaceChildren();
// for (let i = 0; i < layout.cells; i = i + 1) {
//   el.append(b.render("cell", { __INDEX__: i }));
// }
// b.setCSS("--cell-width", `${layout.cellWidth}px`);
// b.setCSS(
//   "--aspect-ratio",
//   `${videos[videoIndex].dimensions[0]} / ${videos[videoIndex].dimensions[1]}`,
// );

//b.setCSS("--cell-height", `${layout.cellHeight}px`);

// const url = `tracks/music-${videoIndex}.mp4.bin`;
// const response = await fetch(url);
// if (response.ok) {
//   // console.log("got response");
//   const blob = await response.blob();
//   const buffer = await blob.arrayBuffer();
//   const bytes = new Uint8Array(buffer);
//   const responseBytes = await decrypt_file(bytes, "music");
//   const videoBlob = new Blob([responseBytes], { type: "video/mp4" });
//   videoData = URL.createObjectURL(videoBlob);
//   // console.log("video prepped");
//   b.trigger("video");
// } else {
//   el.innerHTML = "Error: Could not load video. Please check back later.";
// }

//

// export async function video(_, __, el) {
//   el.muted = true;
//   el.src = videoData;
//   // console.log(el.propAsInt("index"));
//   if (el.propAsInt("index") === 0) {
//     el.addEventListener("canplaythrough", async () => {
//       await b.sleep(100);
//       b.send("Play", "playButton");
//     });
//   }
// }

export async function videoList(_, __, el) {
  el.appendChild(b.render(`<option>Choose a video</option>`));
  videos.forEach((video, index) => {
    el.appendChild(b.render("option", {
      __INDEX__: index,
      __NAME__: video.name,
    }));
  });
}

// export async function play(_, __, ___) {
//   const videoEls = b.qsa("video");
//   for (let vidIndex = 0; vidIndex < videoEls.length; vidIndex += 1) {
//     let centerRow = 2;
//     if (layout.rows < 5) {
//       centerRow = Math.floor((layout.rows - 1) / 2);
//     }
//     const centerCol = Math.floor((layout.columns - 1) / 2);
//     const currentCol = Math.floor(vidIndex % layout.columns);
//     const currentRow = Math.floor(vidIndex / layout.columns);
//     const distance = Math.abs(currentCol - centerCol) +
//       Math.abs(currentRow - centerRow);
//     // console.log(vidIndex, currentCol, currentRow);
//     // console.log(distance);
//     if (distance === 0) {
//       videoEls[vidIndex].muted = false;
//     }
//     const tout = setTimeout(() => {
//       videoEls[vidIndex].play();
//     }, distance * 180);
//   }
//   // console.log(centerRow);
//   // for (let vidIndex = 0; vidIndex < videoEls.length; vidIndex += 1) {
//   //   if (vidIndex === 10) {
//   //     videoEls[vidIndex].muted = false;
//   //   } else {
//   //     videoEls[vidIndex].muted = true;
//   //   }
//   //   videoEls[vidIndex].play();
//   //   await b.sleep(30);
//   // }
// }

// let videoData;

// export async function players(_, __, el) {
//   await init();
//   const url = "tracks/music-1.mp4.bin";
//   const response = await fetch(url);
//   if (response.ok) {
//     const blob = await response.blob();
//     const buffer = await blob.arrayBuffer();
//     const bytes = new Uint8Array(buffer);
//     const responseBytes = await decrypt_file(bytes, "music");
//     const videoBlob = new Blob([responseBytes], { type: "video/mp4" });
//     videoData = URL.createObjectURL(videoBlob);
//   }
//   const layout = getBlockLayout(
//     el.propAsInt("minWidth"),
//     el.propAsInt("maxWidth"),
//     parseInt(el.getBoundingClientRect().width),
//     parseInt(el.getBoundingClientRect().height),
//     el.propAsInt("ratioWidth"),
//     el.propAsInt("ratioHeight"),
//   );
//   console.log(layout);
//   for (let i = 0; i < layout.cells; i = i + 1) {
//     el.append(b.render("cellTemplate"));
//   }
//   b.setCSS("--cell-width", `${layout.cellWidth}px`);
//   b.setCSS("--cell-height", `${layout.cellHeight}px`);
//   b.trigger("vidTest");
// }

// export function playButton(payload, __, el) {
//   if (payload === "Loading") {
//     el.disabled = true;
//   } else {
//     el.disabled = false;
//   }
//   el.innerHTML = payload;
// }

// export async function vidTest(_, __, el) {
//   //  const videoData = URL.createObjectURL(videoBlob);
//   el.src = videoData;
//   // await init();
//   // const url = "tracks/music-1.mp4.bin";
//   // const response = await fetch(url);
//   // if (response.ok) {
//   //   const blob = await response.blob();
//   //   const buffer = await blob.arrayBuffer();
//   //   const bytes = new Uint8Array(buffer);
//   //   const responseBytes = await decrypt_file(bytes, "music");
//   //   const vidBlob = new Blob([responseBytes], { type: "video/mp4" });
//   //   const url = URL.createObjectURL(vidBlob);
//   //   el.src = url;
//   // }
// }

// export async function play(_, __, ___) {
//   const videoEls = b.qsa("video");
//   for (let vidIndex = 0; vidIndex < videoEls.length; vidIndex += 1) {
//     if (vidIndex === 10) {
//       videoEls[vidIndex].muted = false;
//     } else {
//       videoEls[vidIndex].muted = true;
//     }
//     videoEls[vidIndex].play();
//     await b.sleep(30);
//   }
// }

// function getBlockLayout(
//   minWidth,
//   maxWidth,
//   containerWidth,
//   containerHeight,
//   ratioWidth,
//   ratioHeight,
// ) {
//   // let cellWidth = Math.floor(containerWidth / 5);
//   // for (let count = 7; count < 21; count += 1) {
//   //   const checkWidth= Math.floor(contaigerWidth / count);
//   //   if (checkWidth >
//   // }
//   const maxItems = Math.floor(containerWidth / minWidth);
//   let cellWidth = Math.floor(containerWidth / maxItems);
//   if (cellWidth > maxWidth) {
//     cellWidth = maxWidth;
//   }
//   let fiveCount = Math.floor(containerWidth / 5);
//   if (fiveCount < cellWidth) {
//     cellWidth = fiveCount;
//   }
//   const cellHeight = parseInt(cellWidth / ratioWidth * ratioHeight);
//   let columns = parseInt(containerWidth / cellWidth, 10);
//   columns = columns - (columns % 2 === 0 ? 1 : 0);
//   const rows = parseInt(containerHeight / cellHeight, 10);
//   const cells = columns * rows;
//   return {
//     cellWidth: cellWidth,
//     cellHeight: cellHeight,
//     columns: columns,
//     rows: rows,
//     cells: cells,
//   };
// }

// function getBlockLayout(
//   minWidth,
//   maxWidth,
//   containerWidth,
//   containerHeight,
//   ratioWidth,
//   ratioHeight,
// ) {
//   const maxItems = Math.floor(containerWidth / minWidth);
//   let cellWidth = Math.floor(containerWidth / maxItems);
//   if (cellWidth > maxWidth) {
//     cellWidth = maxWidth;
//   }
//   const cellHeight = cellWidth / ratioWidth * ratioHeight;
//   const columns = parseInt(containerWidth / cellWidth, 10);
//   const rows = parseInt(containerHeight / cellHeight, 10);
//   const cells = columns * rows;
//   return {
//     cellWidth: cellWidth,
//     cellHeight: cellHeight,
//     columns: columns,
//     rows: rows,
//     cells: cells,
//   };
// }