const mediaSource = new MediaSource();
const videoEl = document.querySelector("#videoPlayer");
videoEl.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener("sourceopen", async () => {
  const sourceBuffer = mediaSource.addSourceBuffer(
    `video/webm;`,
  );
  for (let i = 0; i <= 3; i += 1) {
    const url = `/javascript/video-with-hls-encryption/parts/${i}`;
    console.log(url);
    const response = await fetch(`/javascript/video-with-hls-encryption/parts/${i}.part`);
    const data = await response.arrayBuffer();
    sourceBuffer.appendBuffer(data);
    if (i === 3) {
      mediaSource.endOfStream();
    }
  }
});