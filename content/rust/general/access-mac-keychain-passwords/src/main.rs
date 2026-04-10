use anyhow::Result;
use security_framework::passwords::get_generic_password;

fn main() -> Result<()> {
  let retreived_password = get_password("al9000-post-example")?;
  println!("{}", retreived_password);
  Ok(())
}

fn get_password(key: &str) -> Result<String> {
  let account = "alan";
  let response = get_generic_password(key, account)?;
  Ok(String::from_utf8(response)?)
}
