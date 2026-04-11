import decryptInit, {
  decrypt_file,
} from "./pkg/static_site_file_decryption.js";
export const b = { init: "init videoList" };

let assetRoot = "https://frabjous-frangipane-78e763.netlify.app/multi-player";
assetRoot = "tmp-split-test";
let layout;
let sourceEl;
let videos = {
  "sample": {
    title: "sample",
    sourceDimensions: [16, 9],
    cropDimensions: [16, 9],
    youtubeID: "5IsSpAOD6K8",
  },
  "tmp1": {
    title: "tmp 1Title",
    sourceDimensions: [16, 9],
    cropDimensions: [16, 9],
    youtubeID: "5IsSpAOD6K8",
  },
  "0a0554c8-e6ab-40d8-854e-1cc190a00842": {
    title: "Some Title",
    sourceDimensions: [16, 9],
    cropDimensions: [16, 9],
    youtubeID: "5IsSpAOD6K8",
  },
};
//

// {
//   key: 0,
//   name: "Talking Heads - Once in a Lifetime",
//   dimensions: [4, 3],
//   crop: [4, 3],
//   link: "https://www.youtube.com/watch?v=5IsSpAOD6K8",
// },
// {
//   key: 1,
//   name: "OK Go - WTF",
//   dimensions: [16, 9],
//   crop: [16, 9],
//   link: "https://www.youtube.com/watch?v=12zJw9varYE",
// },
// {
//   key: 2,
//   name: "Queen - One Vision",
//   dimensions: [16, 9],
//   crop: [16, 9],
//   link: "https://www.youtube.com/watch?v=8bOtuoNFzB0",
// },
// {
//   key: 3,
//   name: "CDK - Gotye/Somebody I Used to Know",
//   dimensions: [16, 9],
//   crop: [16, 9],
//   link: "https://www.youtube.com/watch?v=REPPgPcw4hk",
// },
// {
//   key: 4,
//   name: "Cowboy Bebop - Tank",
//   dimensions: [16, 9],
//   crop: [4, 3],
//   link: "https://www.youtube.com/watch?v=EL-D9LrFJd4",
// },
// {
//   key: 5,
//   name: "Chaka Khan - Like Sugar",
//   dimensions: [16, 9],
//   crop: [2, 1.42],
//   link: "https://www.youtube.com/watch?v=RecY5iZn6B0",
// },
// {
//   key: 6,
//   name: "The White Stripes - Seven Nation Army",
//   dimensions: [16, 9],
//   crop: [4, 3],
//   link: "https://www.youtube.com/watch?v=0J2QdDbelmY",
// },
// {
//   key: 7,
//   name: "Pogo - Alice",
//   dimensions: [4, 3],
//   crop: [4, 3],
//   link: "https://www.youtube.com/watch?v=pAwR6w2TgxY",
// },
// {
//   key: 8,
//   name: "Taylor Swift - Fortnight",
//   dimensions: [16, 9],
//   crop: [16, 9],
//   link: "https://www.youtube.com/watch?v=pAwR6w2TgxY",
// },
// {
//   key: 9,
//   name: "Beyoncé - Countdown",
//   dimensions: [16, 9],
//   crop: [16, 9],
//   link: "https://www.youtube.com/watch?v=2XY3AvVgDns",
// },
// {
//   key: 10,
//   name: "WOW｜INORI - PRAYER",
//   dimensions: [16, 9],
//   crop: [16, 9],
//   link: "https://www.youtube.com/watch?v=3Aos1Z2htDU",
// },
// {
//   key: 11,
//   name: "OK Go - Love",
//   dimensions: [16, 9],
//   crop: [4, 3],
//   link: "https://www.youtube.com/watch?v=gz9BRl7DVSM",
// },
// {
//   key: 12,
//   name: "Daft Punk - Around The World",
//   dimensions: [16, 9],
//   crop: [4, 3],
//   link: "https://www.youtube.com/watch?v=4JkIs37a2JE",
// },
// {
//   key: 13,
//   name: "The White Stripes - Fell in Love with a Girl",
//   dimensions: [16, 9],
//   crop: [4, 3],
//   link: "https://www.youtube.com/watch?v=fTH71AAxXmM",
// },
// {
//   key: 14,
//   name: "Nine Inch Nails - As Alive As You Need Me To Be",
//   dimensions: [16, 9],
//   crop: [16, 9],
//   link: "https://www.youtube.com/watch?v=Rrd6JniMI3U",
// },
// {
//   key: 15,
//   name: "LORN - ANVIL",
//   dimensions: [16, 9],
//   crop: [16, 9],
//   link: "https://www.youtube.com/watch?v=CqaAs_3azSs",
// },

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

async function getSegments(uuid) {
  const url = `${assetRoot}/${uuid}/details.json`;
  const response = await fetch(url);
  if (response.ok) {
    try {
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    return false;
  }
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
      s;
    }
    const tout = setTimeout(() => {
      videoEls[vidIndex].play();
    }, distance * 180);
  }
}
export async function selectVideo(ev, sender, el) {
  const uuid = sender.value;
  const details = await getSegments(sender.value);
  if (details) {
    console.log(details);

    const el = document.querySelector("#tmpVideo");
    el.addEventListener("canplaythrough", () => {
      console.log("Got canplaythrough.");
    });
    let mediaSource = new MediaSource();
    videos[uuid].mediaSource = mediaSource;
    videos[uuid].urls = details.segments.map((seg) =>
      `${assetRoot}/${uuid}/${seg}`
    );
    videos[uuid].currentSegment = 0;
    if (mediaSource) {
      el.src = URL.createObjectURL(mediaSource);

      // this is a check to see if things are closing in dev
      // it's not needed in prod
      // mediaSource.addEventListener("sourceclose", (event) => {
      //   console.log("MediaSource sourceclose:", event);
      // });

      console.log(MediaSource.isTypeSupported(details.mimeType));
      mediaSource.addEventListener("sourceopen", async () => {
        console.log(details);
        videos[uuid].sourceBuffer = mediaSource.addSourceBuffer(
          details.mimeType,
        );
        console.log(details.mimeType);
        videos[uuid].sourceBuffer.addEventListener(
          "updateend",
          async (event) => {
            if (videos[uuid].mediaSource.readyState === "open") {
              loadSegment(uuid);
            } else {
              console.error(videos[uuid].mediaSource.readyState);
            }
          },
        );
        loadSegment(uuid);
      });
    } else {
      console.error("Could not load video from this browser");
    }
  }
}

async function loadSegment(uuid) {
  if (videos[uuid].currentSegment < videos[uuid].urls.length) {
    try {
      const url = videos[uuid].urls[videos[uuid].currentSegment];
      console.log(url);
      const response = await fetch(url);
      if (response.ok) {
        console.log(`processing segment: ${videos[uuid].currentSegment}`);
        videos[uuid].currentSegment++;
        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const responseBytes = await decrypt_file(
          bytes,
          "default",
        );
        console.log(responseBytes.length);
        videos[uuid].sourceBuffer.appendBuffer(responseBytes.buffer);

        //videos[uuid].sourceBuffer.appendBuffer(responseBytes.buffer);
      } else {
        console.error(response);
        videos[uuid].mediaSource.endOfStream("network");
      }
    } catch (error) {
      console.error(error);
      videos[uuid].mediaSource.endOfStream("network");
    }
  } else {
    videos[uuid].mediaSource.endOfStream();
  }
}

export async function _selectVideo(_, sender, el) {
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
    // This does the aspect ration bump.
    const videoWidth = layout.cellHeight * videos[index].dimensions[0] /
      videos[index].dimensions[1];
    console.log(layout.cellWidth, videoWidth);
    b.setCSS("--video-width", `${videoWidth}px`);
    const videoLeft = (layout.cellWidth - videoWidth) / 2;
    b.setCSS("--video-left", `${videoLeft - 1}px`);
    // STARTING_HEIGHT * OUTPUT_WIDTH / STARTING_WIDTH
    const videoHeight = layout.cellHeight * videoWidth / layout.cellWidth;
    const videoUp = (layout.cellHeight - videoHeight) / 2;
    b.setCSS("--video-up", `${videoUp - 1}px`);
    b.setCSS("--cell-width", `${layout.cellWidth}px`);
    b.setCSS(
      "--aspect-ratio",
      `${videos[index].crop[0]} / ${videos[index].crop[1]}`,
    );
    const url = `tracks/payload-${index}.mp4.bin`;
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
  [...Object.entries(videos)].forEach(([uuid, details]) => {
    el.appendChild(b.render("option", {
      __UUID__: uuid,
      __TITLE__: details.title,
    }));
  });
}
