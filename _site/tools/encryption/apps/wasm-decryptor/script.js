import init, {
  decryptBytes,
} from "/tools/encryption/apps/wasm-decryptor/pkg/wasm_decryptor.js";

async function main() {
  await init();
  await testDecryptor();
}

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

async function decryptWebm(url) {
  const buffer = await decryptURL(url);
  if (!buffer) {
    return undefined;
  }
  const blob = new Blob([buffer], { type: "video/webm" });
  return URL.createObjectURL(blob);
}

const videos = {};

async function loadEncryptedSplitVideo(el, baseURL) {
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
          mediaSource: mediaSource,
          currentSegment: 0,
          totalSegments: json.fileCount,
        };
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

async function testDecryptor() {
  console.log("Testing decryptor");

  const text = await decryptTextFile(
    "/tools/encryption/apps/cli-encryptor/samples/encrypted.txt.bin",
  );
  console.log(text);

  const videoURL = await decryptWebm(
    "/tools/encryption/apps/cli-encryptor/samples/video.webm.bin",
  );
  const videoEl = document.querySelector("#decryptedVideo");
  videoEl.src = videoURL;

  const splitVideoEl = document.querySelector("#splitDecryptedVideo");
  const videoRootURL = "/tools/encryption/apps/wasm-decryptor/samples/video";
  loadEncryptedSplitVideo(splitVideoEl, videoRootURL);
}

main();