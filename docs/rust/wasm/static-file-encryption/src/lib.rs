use orion::{aead, kdf};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn encrypt_file(
  bytes: Vec<u8>,
  password: String,
) -> Vec<u8> {
  let user_password =
    kdf::Password::from_slice(password.as_bytes()).unwrap();
  let salt =
    kdf::Salt::from_slice(b"ca0beb1d-5a8a-4da9-b278-058087d00125")
      .unwrap();
  let derived_key =
    kdf::derive_key(&user_password, &salt, 3, 1 << 16, 32).unwrap();
  aead::seal(&derived_key, &bytes).unwrap()

  // let secret_key =
  //   aead::SecretKey::from_slice(&derived_key).unwrap();

  //  aead::seal(&secret_key, b"asdf").unwrap()

  // if let Ok(secret_key) =
  //   aead::SecretKey::from_slice(password.as_bytes())
  // {
  //   if let Ok(data) = aead::seal(&secret_key, b"asdf") {
  //     format!("okay")
  //   } else {
  //     format!("not okay 1")
  //   }
  // } else {
  //   format!("not okay 2")
  // }

  // let secret_key =
  //   aead::SecretKey::from_slice(password.as_bytes()).unwrap();

  //  let secret_key = aead::SecretKey::default();
  //format!("{:?}", secret_key)

  // aead::seal(&secret_key, &bytes).unwrap()

  // match aead::seal(&secret_key, b"asdf") {
  //   Ok(_) => format!("asdf"),
  //   Err(e) => format!("Error: {}", e),
  // }

  //bytes
}
