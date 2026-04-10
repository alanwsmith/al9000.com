import init, { decrypt_file } from "./pkg/static_site_file_decryption.js";

let initialized = false;
const videos = {};

export async function loadEncryptedVideo(selector, config) {
  if (initialized === false) {
    await init();
    initialized = true;
  }
  const uuid = self.crypto.randomUUID();
  const el = document.querySelector(selector);
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
    el.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener("sourceopen", async () => {
      videos[uuid].sourceBuffer = mediaSource.addSourceBuffer(config.codec);
      videos[uuid].sourceBuffer.addEventListener("updateend", async (event) => {
        if (videos[uuid].mediaSource.readyState === "open") {
          loadSegment(uuid);
        }
      });
      loadSegment(uuid);
    });
  } else {
    try {
      const response = await fetch(config.fallback);
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const responseBytes = await decrypt_file(bytes, "key");
        const blob = new Blob([responseBytes], { type: "video/webm" });
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
  if (videos[uuid].currentSegment < videos[uuid].urls.length) {
    try {
      const url = videos[uuid].urls[videos[uuid].currentSegment];
      const response = await fetch(url);
      if (response.ok) {
        console.log(`processing segment: ${videos[uuid].currentSegment}`);
        videos[uuid].currentSegment++;
        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const responseBytes = await decrypt_file(bytes, "key");
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
