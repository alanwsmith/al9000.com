import init, {
  decryptBytes,
} from "/tools/encryption/apps/wasm-decryptor/pkg/wasm_decryptor.js";

async function decrypt(bytes) {
  const response = await decryptBytes(bytes);
  if (response.length === 0) {
    console.error("Could not decrypt bytes");
    return undefined;
  } else {
    return response;
  }
}

async function decryptTextFile(url) {
  const response = await fetch(url);
  try {
    if (response.ok) {
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      const encryptedBytes = new Uint8Array(buffer);
      const decryptedBytes = await decrypt(encryptedBytes);
      const text = new TextDecoder().decode(decryptedBytes.buffer);
      return text;
    } else {
      console.error(response);
      return undefined;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// async function handleDecryptTextFileForm(event) {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const url = formData.get("url");
//   const password = formData.get("password");
//   const resultsEl = event.target.querySelector("#results");
//   if (!password) {
//     resultsEl.innerHTML = "A password is required";
//     return;
//   }
//   const response = await fetch(url);
//   try {
//     if (!response.ok) {
//       resultsEl.innerHTML =
//         `ERROR: ${response.status} - ${response.statusText} - ${url}`;
//     } else {
//       const blob = await response.blob();
//       const buffer = await blob.arrayBuffer();
//       const bytes = new Uint8Array(buffer);
//       const responseBytes = await decrypt_file(bytes, password);
//       const text = new TextDecoder().decode(responseBytes);
//       resultsEl.innerHTML = text;
//     }
//   } catch (error) {
//     resultsEl.innerHTML = `ERROR: ${error}`;
//   }
// }

async function main() {
  await init();
  await testDecryptor();
}

async function testDecryptor() {
  console.log("Testing decryptor");
  const text = await decryptTextFile(
    "/tools/encryption/apps/cli-encryptor/samples/encrypted.txt.bin",
  );
  console.log(text);
}

main();
