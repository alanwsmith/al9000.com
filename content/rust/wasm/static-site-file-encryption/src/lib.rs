use orion::{aead, kdf};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn encrypt_file(
  bytes: Vec<u8>,
  password: String,
) -> Vec<u8> {
  let p2 = "wasm";
  let kdf_password =
    kdf::Password::from_slice(p2.as_bytes()).unwrap();
  let salt =
    kdf::Salt::from_slice(b"ca0beb1d-5a8a-4da9-b278-058087d00125")
      .unwrap();
  let kdf_key =
    kdf::derive_key(&kdf_password, &salt, 3, 1 << 16, 32).unwrap();
  aead::seal(&kdf_key, &bytes).unwrap()
}

// #[wasm_bindgen]
// pub fn encrypt_file(
//   cleartext_bytes: Vec<u8>,
//   password: String,
// ) -> Vec<u8> {
//   let user_password =
//     kdf::Password::from_slice(password.as_bytes()).unwrap();
//   let salt =
//     kdf::Salt::from_slice(b"ca0beb1d-5a8a-4da9-b278-058087d00125")
//       .unwrap();
//   let derived_key =
//     kdf::derive_key(&user_password, &salt, 3, 1 << 16, 32).unwrap();
//   aead::seal(&derived_key, &cleartext_bytes).unwrap()
// }
