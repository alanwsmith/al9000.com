#![allow(warnings)]
use anyhow::Result;
use clap::Parser;
use orion::{aead, kdf};
use security_framework::passwords::get_generic_password;
use std::{fs, path::PathBuf};

#[derive(Debug, Parser)]
struct Input {
  input_path: PathBuf,
}

fn main() -> Result<()> {
  let mut input = Input::parse();
  let password =
    "tmp_password_during_dev_so_the_prompt_does_not_keep_happening";
  let salt =
    "tmp_salt_during_dev_so_the_prompt_does_not_keep_happening";
  encrypt_file(&mut input.input_path, password, salt)?;
  let password =
    get_password("al9000-com--orion--default--password")?;
  let salt = get_password("al9000-com--orion--default--salt")?;
  Ok(())
}

fn encrypt_file(
  path: &mut PathBuf,
  password: &str,
  salt: &str,
) -> Result<()> {
  let bytes = fs::read(&mut *path)?;
  path.add_extension("bin");
  let kdf_password =
    kdf::Password::from_slice(password.as_bytes())?;
  let salt = kdf::Salt::from_slice(salt.as_bytes())?;
  let kdf_key =
    kdf::derive_key(&kdf_password, &salt, 3, 1 << 16, 32)?;
  let encrypted = aead::seal(&kdf_key, &bytes)?;
  fs::write(path, encrypted)?;
  Ok(())
}

fn get_password(key: &str) -> Result<String> {
  let account = "alan";
  let response = get_generic_password(key, account)?;
  Ok(String::from_utf8(response)?)
}
