const videos = {};

export async function loadVideo(selector, config) {
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
    el.src = config.fallback;
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
        videos[uuid].sourceBuffer.appendBuffer(buffer);
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