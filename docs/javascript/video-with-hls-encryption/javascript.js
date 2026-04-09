const mediaSource = new MediaSource();
const videoEl = document.querySelector("#videoPlayer");
videoEl.src = URL.createObjectURL(mediaSource);

let sourceBuffer;
let segmentIndex = 0;
const totalSegments = 4;

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
//     const url = `/javascript/video-with-hls-encryption/parts/${i}.part`;
//     console.log(url);
//     const response = await fetch(url);
//     const data = await response.arrayBuffer();
//     sourceBuffer.appendBuffer(data);
//     if (i === 3) {
//       mediaSource.endOfStream();
//     }
//   }
// });