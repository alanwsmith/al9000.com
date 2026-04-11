import decryptInit, {
  decrypt_file,
} from "./pkg/static_site_file_decryption.js";
export const b = { init: "init videoList" };

let assetRoot = "https://frabjous-frangipane-78e763.netlify.app/multi-player";
assetRoot = "tmp-split-test";
let layout;
let sourceEl;
let videos = {
  "a436f3a0-b408-42e1-9af4-6bfa71d92f59": {
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

// const videos = {};

export async function selectVideo(_, sender, ___) {
  const config = {
    codec: `video/webm; codecs=\"vp9, opus\"`,
    // codec: `video/webm`,
    urls: [
      //`${assetRoot}/a436f3a0-b408-42e1-9af4-6bfa71d92f59/segment-0000000000.bin`,
      //`${assetRoot}/a436f3a0-b408-42e1-9af4-6bfa71d92f59/full.webm`,
      // `${assetRoot}/muxed/000.webm`,
      // `${assetRoot}/muxed/001.webm`,
      // `${assetRoot}/muxed/002.webm`,
      // `${assetRoot}/muxed/003.webm`,
      // `${assetRoot}/muxed/004.webm`,
      // `${assetRoot}/muxed/005.webm`,
      // `${assetRoot}/muxed/006.webm`,
      // `${assetRoot}/muxed/007.webm`,
      // `${assetRoot}/muxed/008.webm`,
      // `${assetRoot}/muxed/009.webm`,
      // `${assetRoot}/muxed/010.webm`,
      // `${assetRoot}/muxed/011.webm`,
      // `${assetRoot}/muxed/012.webm`,
      // `${assetRoot}/muxed/013.webm`,
      // `${assetRoot}/muxed/014.webm`,
      // `${assetRoot}/m2/remuxed.webm`,
      `${assetRoot}/m2/segment-0000000000.bin`,
      `${assetRoot}/m2/segment-0000000001.bin`,
      `${assetRoot}/m2/segment-0000000002.bin`,
      `${assetRoot}/m2/segment-0000000003.bin`,
      `${assetRoot}/m2/segment-0000000004.bin`,
      `${assetRoot}/m2/segment-0000000005.bin`,
      `${assetRoot}/m2/segment-0000000006.bin`,
      `${assetRoot}/m2/segment-0000000007.bin`,
      `${assetRoot}/m2/segment-0000000008.bin`,
      `${assetRoot}/m2/segment-0000000009.bin`,
    ],
  };
  const uuid = self.crypto.randomUUID();
  const el = document.querySelector(`#tmpVideo`);
  el.addEventListener("canplaythrough", () => {
    console.log("Got canplaythrough.");
  });
  const mediaSource = new MediaSource();
  videos[uuid] = {
    mediaSource: mediaSource,
    urls: config.urls,
    currentSegment: 0,
  };
  if (mediaSource) {
    console.log("DOING MEDIA SOURCE");
    el.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener("sourceopen", async () => {
      console.log("HERE1");
      videos[uuid].sourceBuffer = mediaSource.addSourceBuffer(config.codec);

      videos[uuid].sourceBuffer.addEventListener("update", async (event) => {
        console.log(event);
      });
      videos[uuid].sourceBuffer.addEventListener("error", async (event) => {
        console.log(event);
      });
      videos[uuid].sourceBuffer.addEventListener("updateend", async (event) => {
        console.log("HERE2");
        console.log(videos[uuid].sourceBuffer.updating);
        if (videos[uuid].mediaSource.readyState === "open") {
          loadSegment(uuid);
        } else {
          console.error(el.error);
          console.log(videos[uuid].mediaSource.readyState);
          console.log("HERE3");
        }
      });
      loadSegment(uuid);
    });
  } else {
    try {
      //const response = await fetch(config.fallback);

      const response = await fetch(
        `${assetRoot}/a436f3a0-b408-42e1-9af4-6bfa71d92f59/full.webm`,
      );
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const blob = new Blob([bytes], { type: "video/webm" });
        //const responseBytes = await decrypt_file(bytes, "key");
        //const blob = new Blob([responseBytes], { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        el.src = url;
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

async function loadSegment(uuid) {
  console.log(`loadSegment: ${uuid}`);
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

        // try {
        //   videos[uuid].sourceBuffer.appendBuffer(bytes.buffer);
        // } catch (e2) {
        //   console.error("HERE", e2);
        // }

        const responseBytes = await decrypt_file(bytes, "default");
        console.log(responseBytes.length);
        videos[uuid].sourceBuffer.appendBuffer(responseBytes.buffer);
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

//export async function selectVideo(_, sender, ___) {
//  const uuid = sender.value;
//  const details = await getSegments(sender.value);
//  if (details) {
//    console.log(details);
//    videos[uuid].el = document.querySelector("#tmpVideo");
//    console.log(videos[uuid].el);
//    videos[uuid].el.addEventListener("canplaythrough", () => {
//      console.log("Got canplaythrough.");
//    });
//    let mediaSource = new MediaSource();
//    videos[uuid].mediaSource = mediaSource;
//    videos[uuid].urls = details.segments.map((seg) =>
//      `${assetRoot}/${uuid}/${seg}`
//    );
//    console.log(videos[uuid]);
//    videos[uuid].currentSegment = 0;
//    if (mediaSource) {
//      videos[uuid].el.src = URL.createObjectURL(mediaSource);
//      console.log(videos[uuid].el);
//      // this is a check to see if things are closing in dev
//      // it's not needed in prod
//      // mediaSource.addEventListener("sourceclose", (event) => {
//      //   console.log("MediaSource sourceclose:", event);
//      // });
//      // console.log(MediaSource.isTypeSupported(details.mimeType));
//      mediaSource.addEventListener("sourceopen", async () => {
//        console.log(details);
//        videos[uuid].sourceBuffer = mediaSource.addSourceBuffer(
//          details.mimeType,
//        );
//        console.log(details.mimeType);
//        videos[uuid].sourceBuffer.addEventListener(
//          "error",
//          (event) => console.log(event, videos[uuid].el.error),
//        );
//        videos[uuid].sourceBuffer.addEventListener(
//          "updateend",
//          async (event) => {
//            //console.log(videos[uuid].sourceBuffer.error);
//            // loadSegment(uuid);
//            if (videos[uuid].mediaSource.readyState === "open") {
//              loadSegment(uuid);
//            } else {
//              console.log("HERE");
//              console.error(videos[uuid].el.error);
//              console.error(videos[uuid].mediaSource.readyState);
//            }
//          },
//        );
//        loadSegment(uuid);
//      });
//    } else {
//      console.error("Could not load video from this browser");
//    }
//  }
//}

//async function loadSegment(uuid) {
//  console.log(`loadSegment got: ${uuid}`);
//  if (videos[uuid].currentSegment < videos[uuid].urls.length) {
//    try {
//      const url = videos[uuid].urls[videos[uuid].currentSegment];
//      console.log(url);
//      const response = await fetch(url);
//      if (response.ok) {
//        console.log(videos[uuid].el.error);
//        console.log(videos[uuid].sourceBuffer.error);
//        console.log(`processing segment: ${videos[uuid].currentSegment}`);
//        videos[uuid].currentSegment++;
//        const buffer = await response.arrayBuffer();
//        const bytes = new Uint8Array(buffer);
//        const responseBytes = await decrypt_file(
//          bytes,
//          "default",
//        );
//        // const blob = new Blob([responseBytes], { type: "video/webm" });
//        console.log(responseBytes.length);
//        videos[uuid].sourceBuffer.appendBuffer(responseBytes.buffer);
//        console.log(videos[uuid].el.error);
//        //videos[uuid].sourceBuffer.appendBuffer(responseBytes.buffer);
//      } else {
//        console.error(response);
//        videos[uuid].mediaSource.endOfStream("network");
//      }
//    } catch (error) {
//      console.error(error);
//      videos[uuid].mediaSource.endOfStream("network");
//    }
//  } else {
//    console.log("All segments processed");
//    videos[uuid].mediaSource.endOfStream();
//  }
//}

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