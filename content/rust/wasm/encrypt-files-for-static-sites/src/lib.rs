use orion::{aead, kdf};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn encrypt_file(
  bytes: Vec<u8>,
  password: String,
) -> Vec<u8> {
  let kdf_password =
    kdf::Password::from_slice(password.trim().as_bytes()).unwrap();
  let salt =
    kdf::Salt::from_slice(b"ca0beb1d-5a8a-4da9-b278-058087d00125")
      .unwrap();
  let kdf_key =
    kdf::derive_key(&kdf_password, &salt, 3, 1 << 8, 32).unwrap();
  aead::seal(&kdf_key, &bytes).unwrap()
}
