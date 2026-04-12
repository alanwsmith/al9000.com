import decryptInit, {
  decrypt_file,
} from "./pkg/static_site_file_decryption.js";

export const b = { init: "init" };

let config;
let data = [];
let videoObjects;

export async function init() {
  b.setCSS("--video-width", "100px");
  b.setCSS("--cell-width", "100px");
  await decryptInit();
  if (window.navigator.userAgent.includes("Firefox")) {
    b.addStyles(`video { transform: rotate(0.08deg);}`);
  }
  const response = await fetch("/multi-player/config.json");
  if (response.ok) {
    try {
      config = await response.json();
      b.trigger("videoList");
    } catch (error) {
      console.error(`Could not load config`, error);
    }
  }
}

export async function loadData(obj) {
  if (obj.currentSegment === config.details.segments.length) {
    console.log("data load finished");
    obj.mediaSource.endOfStream();
    return;
  }
  if (obj.sourceBuffer.updating === true) {
    console.log("buffer already updating");
    await b.sleep(config.retryDelay);
    loadData(obj);
    return;
  }
  if (obj.currentSegment >= data.length) {
    console.log("waiting for data");
    await b.sleep(config.retryDelay);
    loadData(obj);
    return;
  }
  console.log(`adding data: ${obj.currentSegment}`);
  obj.sourceBuffer.appendBuffer(data[obj.currentSegment]);
  obj.currentSegment++;
}

export async function startVideos() {
  config.retryDelay = 200 * videoObjects.length;
  await b.sleep(300);
  console.log("Starting videos");
  let tmpNeedsSound = true;
  for (let i = 0; i < videoObjects.length; i++) {
    const el = videoObjects[i].el;
    if (tmpNeedsSound === true) {
      el.muted = false;
      tmpNeedsSound = false;
    } else {
      el.muted = true;
    }
    videoObjects[i].tout = setTimeout(() => {
      el.play();
    }, i * 160);
  }
  await b.sleep(200 * videoObjects.length);
}

export async function selectVideo(_, sender, ___) {
  if (sender.value) {
    config.currentVideoId = sender.value;
    config.started = false;
    config.retryDelay = 200;
    await getVideoDetails();
    getVideoData();
    try {
      videoObjects = [...b.qsa("video")].map((el, index) => {
        //if (index === 0) {
        //  el.addEventListener("canplaythrough", () => {
        //    startVideos();
        //    //console.log("Got canplaythrough.");
        //  });
        //}
        const mediaSource = new MediaSource();
        el.src = URL.createObjectURL(mediaSource);
        return {
          el: el,
          mediaSource: mediaSource,
          currentSegment: 0,
        };
      });
      for (let obj of videoObjects) {
        obj.mediaSource.addEventListener("sourceopen", async () => {
          obj.sourceBuffer = obj.mediaSource.addSourceBuffer(
            `video/webm; codecs="vp9, opus"`,
          );
          obj.sourceBuffer.addEventListener("updateend", async (event) => {
            loadData(obj);
          });
          loadData(obj);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function getVideoDetails() {
  const url = `${config.storageRoot}/${config.currentVideoId}/details.json`;
  const response = await fetch(url);
  if (response.ok) {
    try {
      const details = await response.json();
      config.details = details;
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Could not get details");
  }
}

export async function getVideoData() {
  data = [];
  for (let i = 0; i < config.details.segments.length; i++) {
    const segURL = `${config.storageRoot}/${config.currentVideoId}/${
      config.details.segments[i]
    }`;
    console.log(segURL);

    if (i === Math.min(15, config.details.segments.length)) {
      await startVideos();
    }

    const response = await fetch(segURL);
    if (response.ok) {
      try {
        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const responseBytes = await decrypt_file(bytes, "default");
        data.push(responseBytes);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Could not get segment");
    }
  }
}

export async function videoList(_, __, el) {
  el.appendChild(b.render(`<option>Choose a video</option>`));
  [...Object.entries(config.tracks)].forEach(([key, data]) => {
    el.appendChild(b.render("option", {
      __UUID__: key,
      __TITLE__: data.title,
    }));
  });
}
