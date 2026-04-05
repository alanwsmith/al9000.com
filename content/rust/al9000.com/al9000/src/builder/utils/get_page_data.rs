use anyhow::Result;
use minijinja::Value;
use std::fs;
use std::path::Path;
use toml::Table;

pub fn get_page_data(pb: &Path) -> Result<Value> {
  let input = fs::read_to_string(pb)?;
  let parts = input.split("== block toml").collect::<Vec<&str>>();
  if parts.len() > 1 {
    let extract =
      parts[1].split("== endblock").collect::<Vec<&str>>();
    if extract.len() > 1 {
      let value = extract[0].parse::<Table>()?;
      Ok(Value::from_serialize(value))
    } else {
      Ok(Value::from_serialize(""))
    }
  } else {
    Ok(Value::from_serialize(""))
  }
}
