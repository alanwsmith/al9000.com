import decryptInit, {
  decrypt_file,
} from "./pkg/static_site_file_decryption.js";
export const b = { init: "init videoList" };

let layout;
let sourceEl;
let videos = [
  {
    key: 0,
    name: "Once in a Lifetime",
    dimensions: [4, 3],
    crop: [4, 3],
    link: "https://www.youtube.com/watch?v=5IsSpAOD6K8",
  },
  {
    key: 1,
    name: "WTF",
    dimensions: [16, 9],
    crop: [16, 9],
    link: "https://www.youtube.com/watch?v=12zJw9varYE",
  },
  {
    key: 2,
    name: "Queen - One Vision",
    dimensions: [16, 9],
    crop: [16, 9],
    link: "https://www.youtube.com/watch?v=8bOtuoNFzB0",
  },
  {
    key: 3,
    name: "Gotye (CDK) - Somebody I Used to Know",
    dimensions: [16, 9],
    crop: [16, 9],
    link: "https://www.youtube.com/watch?v=REPPgPcw4hk",
  },
  {
    key: 4,
    name: "Cowboy Bebop - Tank",
    dimensions: [16, 9],
    crop: [16, 9],
    link: "https://www.youtube.com/watch?v=EL-D9LrFJd4",
  },
  {
    key: 5,
    name: "Chaka Khan - Like Sugar",
    dimensions: [16, 9],
    crop: [2, 1.42],
    link: "https://www.youtube.com/watch?v=RecY5iZn6B0",
  },
  {
    key: 6,
    name: "The White Stripes - Seven Nation Army",
    dimensions: [16, 9],
    crop: [16, 9],
    link: "https://www.youtube.com/watch?v=0J2QdDbelmY",
  },
  {
    key: 7,
    name: "Pogo - Alice",
    dimensions: [4, 3],
    crop: [4, 3],
    link: "https://www.youtube.com/watch?v=pAwR6w2TgxY",
  },
  {
    key: 8,
    name: "Gotye - Somebody I Used to Know",
    dimensions: [16, 9],
    crop: [16, 9],
    link: "https://www.youtube.com/watch?v=8UVNT4wvIGY",
  },
  {
    key: 9,
    name: "Peger Gabriel - Sledgehammer",
    dimensions: [16, 9],
    crop: [4, 3],
    link: "https://www.youtube.com/watch?v=kgdyBvHdNKY",
  },
];

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
  /*
  if (window.navigator.userAgent.includes("Firefox")) {
    b.addStyles(`video { transform: rotate(0.08deg);}`);
  }
  */
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
        ratioWidth: videos[index].crop[0],
        ratioHeight: videos[index].crop[1],
        minColumns: 5,
        maxColumns: 19,
      },
    );

    // STARTING_WIDTH * OUTPUT_HEIGHT / STARTING_HEIGHT

    // This does the aspect ration bump.
    const videoWidth = layout.cellHeight * videos[index].dimensions[0] /
      videos[index].dimensions[1];
    console.log(layout.cellWidth, videoWidth);
    b.setCSS("--video-width", `${videoWidth}px`);

    const videoLeft = (layout.cellWidth - videoWidth) / 2;
    b.setCSS("--video-left", `${videoLeft - 1}px`);
    console.log("left", videoLeft);

    // STARTING_HEIGHT * OUTPUT_WIDTH / STARTING_WIDTH
    const videoHeight = layout.cellHeight * videoWidth / layout.cellWidth;

    const videoUp = (layout.cellHeight - videoHeight) / 2;
    b.setCSS("--video-up", `${videoUp - 1}px`);

    // const videoHeight = layout.cellHeight * videos[index].crop[0] /
    //   videos[index].crop[1];
    // console.log(layout.cellHeight, videoHeight);
    // b.setCSS("--video-height", `${videoHeight}px`);

    // b.setCSS("--video-width", `${layout.cellWidth}px`);

    // let videoWidth = layout.cellWidth * videos[index].crop[0] /
    //   videos[index].crop[1];
    // console.log(layout.cellWidth, videoWidth);
    // b.setCSS("--video-width", `${videoWidth}px`);

    // const videoHeight = layout.cellHeight * videos[index].dimensions[0] /
    //   videos[index].dimensions[1];
    // console.log(layout.cellHeight, videoHeight);
    // b.setCSS("--video-height", `${videoHeight}px`);

    // const videoUp = (layout.cellHeight - videoHeight) / 2;
    // b.setCSS("--video-up", `${videoUp}px`);

    // let videoWidth = videos[index].crop[0] * layout.cellHeight /
    //   videos[index].crop[1];
    // console.log(layout.cellWidth, videoWidth);
    // b.setCSS("--cell-width", `${layout.cellWidth}px`);

    // const videoLeft = (layout.cellWidth - videoWidth) / 2;
    // b.setCSS("--video-left", `${videoLeft}px`);
    // console.log("left", videoLeft);

    b.setCSS("--cell-width", `${layout.cellWidth}px`);
    b.setCSS(
      "--aspect-ratio",
      `${videos[index].crop[0]} / ${videos[index].crop[1]}`,
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
      sourceEl = b.ce(`video`);
      sourceEl.playsinline = true;
      sourceEl.src = videoData;
      await b.sleep(400);
      el.replaceChildren();
      for (let i = 0; i < layout.cells; i = i + 1) {
        const videoCopy = sourceEl.cloneNode(true);
        if (i === 0) {
          videoCopy.addEventListener("canplaythrough", async () => {
            await b.sleep(100);
            b.trigger("play");
          });
        }
        el.appendChild(b.render("cell", { __VIDEO__: videoCopy }));
      }
    } else {
      el.innerHTML = "Error: Could not load video. Please check back later.";
    }
  }
}

export async function videoList(_, __, el) {
  el.appendChild(b.render(`<option>Choose a video</option>`));
  videos.forEach((video, index) => {
    el.appendChild(b.render("option", {
      __INDEX__: index,
      __NAME__: video.name,
    }));
  });
}
