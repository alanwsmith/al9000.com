// let currentSegment = 0;

export async function loadVideo(selector, config) {
  //console.log("loading video");
  const el = document.querySelector(selector);
  el.addEventListener("canplay", () => {
    console.log("video can be played");
  });
  const mediaSource = new MediaSource();
  if (mediaSource) {
    // console.log("creted media source");
    el.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener("sourceopen", async () => {
      //  console.log("media source opened");
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

//async function loadSegment(config, currentSegment, sourceBuffer, mediaSource) {
// async function loadSegment(config, sourceBuffer, sourceBuffer) {
async function loadSegment(sourceBuffer, mediaSource) {
  // console.log(sourceBuffer);
  // console.log(`getting segment: ${sourceBuffer.currentSegment}`);
  // console.log(sourceBuffer);
  if (sourceBuffer.currentSegment < sourceBuffer.urls.length) {
    try {
      const url = sourceBuffer.urls[sourceBuffer.currentSegment];
      //console.log(url);
      const response = await fetch(url);
      if (response.ok) {
        console.log(`processing segment: ${sourceBuffer.currentSegment}`);
        sourceBuffer.currentSegment++;
        const buffer = await response.arrayBuffer();
        sourceBuffer.appendBuffer(buffer);
      } else {
        console.error("TKTKTK");
        mediaSource.endOfStream("network");
      }
    } catch (error) {
      console.error("TKTKTK");
      mediaSource.endOfStream("network");
    }
  } else {
    mediaSource.endOfStream();
  }

  // if (currentSegment < config.urls.length) {
  //   try {
  //     const response = await fetch(config.urls[currentSegment]);
  //     if (response.ok) {
  //       console.log(`processing segment: ${currentSegment}`);
  //       const buffer = await response.arrayBuffer();
  //       sourceBuffer.appendBuffer(buffer);
  //       currentSegment += 1;
  //     } else {
  //       // TODO: Update the med
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     mediaSource.endOfStream("network");
  //   }
  // } else {
  //   console.log("all segments received");
  // }

  // try {

  //}
}

//async function initStream(mediaSource, config) {
//  // for (let i = 0; i < config.urls.length; i++) {
//  //   console.log(config.urls[i]);
//    // try {
//    //   const response = await fetch(config.urls[i]);
//    //   if (response.ok) {
//    //   }
//    // }
//  //}
//  // try {
//  // }
//}

// const mediaSource = new MediaSource();
// const videoEl = document.querySelector("#videoPlayer");
// videoEl.src = URL.createObjectURL(mediaSource);

// let sourceBuffer;
// let segmentIndex = 0;
// const totalSegments = 4;

// mediaSource.addEventListener('sourceopen', async () => {
//     sourceBuffer = mediaSource.addSourceBuffer('video/webm');
//     sourceBuffer.addEventListener('updateend', loadNextSegment);
//     // Start with the first segment
//     await loadNextSegment();
// });

// mediaSource.addEventListener("sourceopen", async () => {
//   const sourceBuffer = mediaSource.addSourceBuffer(
//     `video/webm;`,
//   );
//   for (let i = 0; i <= 3; i += 1) {
//     const url = `[@ parent(file_path) @]/parts/${i}.part`;
//     console.log(url);
//     const response = await fetch(url);
//     const data = await response.arrayBuffer();
//     sourceBuffer.appendBuffer(data);
//     if (i === 3) {
//       mediaSource.endOfStream();
//     }
//   }
// });
