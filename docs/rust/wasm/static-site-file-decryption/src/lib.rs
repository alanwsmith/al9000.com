use orion::{aead, kdf};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn decrypt_file(
  bytes: Vec<u8>,
  password: String,
) -> Vec<u8> {
  let kdf_password =
    kdf::Password::from_slice(password.trim().as_bytes()).unwrap();
  let salt =
    kdf::Salt::from_slice(b"ca0beb1d-5a8a-4da9-b278-058087d00125")
      .unwrap();
  let kdf_key =
    kdf::derive_key(&kdf_password, &salt, 3, 1 << 16, 32).unwrap();
  match aead::open(&kdf_key, &bytes) {
    Ok(response) => response,
    Err(_) => "The password you entered\nwas incorrect."
      .as_bytes()
      .to_vec(),
  }
}
