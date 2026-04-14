import init, {
  decryptBytes,
} from "/tools/encryption/apps/wasm-decryptor/pkg/wasm_decryptor.js";

async function decryptURL(url) {
  const response = await fetch(url);
  try {
    if (response.ok) {
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      const encryptedBytes = new Uint8Array(buffer);
      const decryptedBytes = await decryptBytes(encryptedBytes);
      if (decryptedBytes.length === 0) {
        console.error("Decrypion failed. Check credentails");
        return undefined;
      }
      return decryptedBytes.buffer;
    } else {
      console.error(response);
      return undefined;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

const videos = {};

async function loadSplitEncryptedVideo(el, baseURL) {
  const uuid = self.crypto.randomUUID();
  const detailsURL = `${baseURL}/details.json`;
  const details = await fetch(detailsURL);
  if (details.ok) {
    try {
      const json = await details.json();
      el.addEventListener("canplaythrough", (event) => {
        // TODO: Set up to check against the UUID so
        // that multiple videos can be on the
        // page at once.
        console.log("Got canplaythrough.");
      });
      const mediaSource = new MediaSource();
      if (mediaSource) {
        videos[uuid] = {
          baseURL: baseURL,
          mediaSource: mediaSource,
          currentSegment: 0,
          totalSegments: json.fileCount,
        };
        el.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener("sourceopen", async () => {
          videos[uuid].sourceBuffer = mediaSource.addSourceBuffer(
            `video/webm; codecs="vp9, opus"`,
          );
          videos[uuid].sourceBuffer.addEventListener(
            "updateend",
            async (event) => {
              if (videos[uuid].mediaSource.readyState === "open") {
                loadSegment(uuid);
              }
            },
          );
          loadSegment(uuid);
        });
      } else {
        // Presenter error message to UI here.
        console.error("MediaSource not avaialbe on this browser");
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error(`Could not load: ${detailsURL}`);
  }
}

async function loadSegment(uuid) {
  if (videos[uuid].currentSegment < videos[uuid].totalSegments) {
    try {
      const url = `${videos[uuid].baseURL}/${videos[uuid].currentSegment}.bin`;
      console.log(`processing segment: ${videos[uuid].currentSegment}`);
      const buffer = await decryptURL(url);
      if (buffer.length === 0) {
        console.error("Could not decrypt file. Check password");
        videos[uuid].mediaSource.endOfStream("network");
      } else {
        // const buffer = await response.arrayBuffer();
        // const bytes = new Uint8Array(buffer);
        // const responseBytes = await decrypt_file(bytes, "key");
        videos[uuid].sourceBuffer.appendBuffer(buffer);
        videos[uuid].currentSegment++;
      }
    } catch (error) {
      console.error(error);
      videos[uuid].mediaSource.endOfStream("network");
    }
  } else {
    videos[uuid].mediaSource.endOfStream();
  }
}

async function main() {
  await init();
  const videoEl = document.querySelector("#splitDecryptedVideo");
  const videoRootURL = "/tools/encryption/apps/wasm-decryptor/samples/video";
  loadSplitEncryptedVideo(videoEl, videoRootURL);
}

main();
