use anyhow::Result;
use clap::Parser;
use orion::{aead, kdf};
use security_framework::passwords::get_generic_password;
use std::{fs, path::PathBuf};

#[derive(Debug, Parser)]
struct Args {
  input_path: PathBuf,
  output_path: PathBuf,
}

fn main() -> Result<()> {
  let args = Args::parse();
  let debug = true;

  let password = if debug {
    "tmp_password_during_dev_so_the_prompt_does_not_keep_happening"
  } else {
    &get_password("al9000-com--orion--default--password")?
  };
  let salt = if debug {
    "tmp_salt_during_dev_so_the_prompt_does_not_keep_happening"
  } else {
    &get_password("al9000-com--orion--default--salt")?
  };

  let bytes = fs::read(&args.input_path)?;

  let kdf_password =
    kdf::Password::from_slice(password.trim().as_bytes())?;
  let salt = kdf::Salt::from_slice(salt.trim().as_bytes())?;
  let kdf_key =
    kdf::derive_key(&kdf_password, &salt, 3, 1 << 8, 32)?;
  let encrypted = aead::seal(&kdf_key, &bytes)?;
  fs::write(args.output_path, encrypted)?;

  // let bytes = fs::read(&mut *path)?;
  // path.add_extension("bin");
  // let kdf_password =
  //   kdf::Password::from_slice(password.trim().as_bytes())?;
  // let salt = kdf::Salt::from_slice(salt.trim().as_bytes())?;
  // let kdf_key =
  //   kdf::derive_key(&kdf_password, &salt, 3, 1 << 8, 32)?;
  // let encrypted = aead::seal(&kdf_key, &bytes)?;
  // fs::write(path, encrypted)?;

  // // For Dev/Debugging to prevent repeated auth modal
  // let password =
  //   "tmp_password_during_dev_so_the_prompt_does_not_keep_happening";
  // let salt =
  //   "tmp_salt_during_dev_so_the_prompt_does_not_keep_happening";
  // let password =
  //   get_password("al9000-com--orion--default--password")?;
  // let salt = get_password("al9000-com--orion--default--salt")?;

  // encrypt_file(&input_path, &password, &salt, &input.output_path;)?;
  Ok(())
}

// fn encrypt_file(
//   path: &mut PathBuf,
//   password: &str,
//   salt: &str,
// ) -> Result<()> {
//   let bytes = fs::read(&mut *path)?;
//   path.add_extension("bin");
//   let kdf_password =
//     kdf::Password::from_slice(password.trim().as_bytes())?;
//   let salt = kdf::Salt::from_slice(salt.trim().as_bytes())?;
//   let kdf_key =
//     kdf::derive_key(&kdf_password, &salt, 3, 1 << 8, 32)?;
//   let encrypted = aead::seal(&kdf_key, &bytes)?;
//   fs::write(path, encrypted)?;
//   Ok(())
// }

fn get_password(key: &str) -> Result<String> {
  let account = "alan";
  let response = get_generic_password(key, account)?;
  Ok(String::from_utf8(response)?)
}
