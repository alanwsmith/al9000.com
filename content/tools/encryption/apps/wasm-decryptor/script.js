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

async function decryptTextFile(url) {
  const buffer = await decryptURL(url);
  if (!buffer) {
    return undefined;
  }
  const text = new TextDecoder().decode(buffer);
  return text;
}

// async function decrypt(bytes) {
//   const response = await decryptBytes(bytes);
//   if (response.length === 0) {
//     console.error("Could not decrypt bytes");
//     return undefined;
//   } else {
//     return response;
//   }
// }

// async function decryptTextFile(url) {
//   const response = await fetch(url);
//   try {
//     if (response.ok) {
//       const blob = await response.blob();
//       const buffer = await blob.arrayBuffer();
//       const encryptedBytes = new Uint8Array(buffer);
//       const decryptedBytes = await decrypt(encryptedBytes);
//       const text = new TextDecoder().decode(decryptedBytes.buffer);
//       return text;
//     } else {
//       console.error(response);
//       return undefined;
//     }
//   } catch (error) {
//     console.error(error);
//     return undefined;
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
