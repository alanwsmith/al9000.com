const videos = {};

export async function loadVideo(selector, config) {
  const uuid = self.crypto.randomUUID();
  console.log(uuid);
  const el = document.querySelector(selector);
  el.addEventListener("canplay", () => {
    console.log("Got canplay.");
  });
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
    const urlObj = URL.createObjectURL(mediaSource);
    el.src = urlObj;
    // el.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("sourceended", async () => {
      console.log("ENDED");
    });
    mediaSource.addEventListener("sourceopen", async () => {
      videos[uuid].sourceBuffer = mediaSource.addSourceBuffer(config.codec);
      // videos[uuid].sourceBuffer = mediaSource.addSourceBuffer(
      //   'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      // );

      console.log(videos[uuid].sourceBuffer);

      videos[uuid].sourceBuffer.addEventListener("updateend", async (event) => {
        console.log(videos[uuid].mediaSource.readyState);
        if (videos[uuid].mediaSource.readyState === "open") {
          await loadSegment(uuid);
        }
      });
      console.log(mediaSource);
      console.log(videos[uuid].mediaSource.readyState);
      await loadSegment(uuid);
    });
  } else {
    el.src = config.fallback;
  }
}

async function loadSegment(uuid) {
  if (videos[uuid].currentSegment < videos[uuid].urls.length) {
    // console.log(videos[uuid].mediaSource);
    try {
      const url = videos[uuid].urls[videos[uuid].currentSegment];
      console.log(url);
      const response = await fetch(url);
      if (response.ok) {
        console.log(`processing segment: ${videos[uuid].currentSegment}`);
        videos[uuid].currentSegment++;
        const buffer = await response.arrayBuffer();
        //        if (!videos[uuid].sourceBuffer.updating) {
        videos[uuid].sourceBuffer.appendBuffer(buffer);
        //       } else {
        //        console.log("it's updating");
        //     }
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

  //
}