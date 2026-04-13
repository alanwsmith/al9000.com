#![allow(non_snake_case)]
use orion::{aead, kdf};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn decryptBytes(bytes: Vec<u8>) -> Vec<u8> {
  let kdf_password =
    kdf::Password::from_slice("default".as_bytes()).unwrap();
  let salt =
    kdf::Salt::from_slice(b"28d408f7-e027-436e-a262-a6bd1950099a")
      .unwrap();
  let kdf_key =
    kdf::derive_key(&kdf_password, &salt, 3, 1 << 8, 32).unwrap();
  match aead::open(&kdf_key, &bytes) {
    Ok(response) => response,
    Err(_) => "".as_bytes().to_vec(),
  }
}
