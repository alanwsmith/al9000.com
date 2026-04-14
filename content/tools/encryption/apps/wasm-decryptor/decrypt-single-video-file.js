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

async function decryptWebm(url) {
  const buffer = await decryptURL(url);
  if (!buffer) {
    return undefined;
  }
  const blob = new Blob([buffer], { type: "video/webm" });
  return URL.createObjectURL(blob);
}

async function main() {
  await init();
  const videoEl = document.querySelector("#singleDecryptedVideo");
  const videoURL = await decryptWebm(
    "/tools/encryption/apps/cli-encryptor/samples/video.webm.bin",
  );
  videoEl.src = videoURL;
}

main();
