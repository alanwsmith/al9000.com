use anyhow::Result;
use orion::{aead, kdf};
use std::fs;
use std::path::PathBuf;

fn main() -> Result<()> {
  let input_path = PathBuf::from("samples/input.txt");
  let output_path = PathBuf::from("samples/output.txt.bin");
  let password = "some_password".to_string();
  let salt = "c72ffc65-3966-481f-ad03-5e7ac42fc3ea".to_string();
  encrypt_file(&input_path, &output_path, &password, &salt)?;
  Ok(())
}

pub fn encrypt_file(
  input_path: &PathBuf,
  output_path: &PathBuf,
  password: &str,
  salt: &str,
) -> Result<()> {
  let input = fs::read(input_path)?;
  let kdf_password =
    kdf::Password::from_slice(password.as_bytes())?;
  let salt = kdf::Salt::from_slice(salt.as_bytes())?;
  let derived_key =
    kdf::derive_key(&kdf_password, &salt, 3, 1 << 16, 32)?;
  let bytes = aead::seal(&derived_key, &input)?;
  fs::write(output_path, bytes)?;
  Ok(())
}
