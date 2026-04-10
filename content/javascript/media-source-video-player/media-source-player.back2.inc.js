export async function loadVideo(selector, config) {
  const el = document.querySelector(selector);
  el.addEventListener("canplay", () => {
    console.log("Got canplay.");
  });
  el.addEventListener("canplaythrough", () => {
    console.log("Got canplaythrough.");
  });
  const mediaSource = new MediaSource();
  if (mediaSource) {
    el.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener("sourceopen", async () => {
      const sourceBuffer = mediaSource.addSourceBuffer(config.codec);
      sourceBuffer.currentSegment = 0;
      sourceBuffer.urls = config.urls;
      sourceBuffer.addEventListener("updateend", async (event) => {
        loadSegment(event.target, mediaSource);
      });
      loadSegment(sourceBuffer, mediaSource);
    });
  } else {
    el.src = config.fallback;
  }
}

async function loadSegment(sourceBuffer, mediaSource) {
  if (sourceBuffer.currentSegment < sourceBuffer.urls.length) {
    try {
      const url = sourceBuffer.urls[sourceBuffer.currentSegment];
      const response = await fetch(url);
      if (response.ok) {
        console.log(`processing segment: ${sourceBuffer.currentSegment}`);
        sourceBuffer.currentSegment++;
        const buffer = await response.arrayBuffer();
        sourceBuffer.appendBuffer(buffer);
      } else {
        console.error(response);
        mediaSource.endOfStream("network");
      }
    } catch (error) {
      console.error(error);
      mediaSource.endOfStream("network");
    }
  } else {
    mediaSource.endOfStream();
  }
}
