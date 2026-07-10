use crate::config::Config;
use crate::utils::*;
use anyhow::Result;
use minijinja::Value;
use std::fs;
use std::path::PathBuf;

// Loads data from *.json files and
// the data from `== block toml` blocks.
pub fn load_json_and_metadata(config: &Config) -> Result<Value> {
  let mut data = DataNode::new();
  for json_file in json_files() {
    match fs::read_to_string(&json_file) {
      Ok(text) => match serde_json::from_str::<Value>(&text) {
        Ok(json) => {
          let shortened_path: &PathBuf = &json_file
            .components()
            .skip(1) // skip the content dir and only get its children
            .collect();
          data.insert(shortened_path, json);
        }
        // TODO: Add error handling here
        Err(_) => (),
      },
      // TODO: Add error handling here
      Err(_) => (),
    }
  }
  for content_file in content_files(config.clone()).iter() {
    let page_data = get_page_data(content_file)?;
    if page_data != Value::from_serialize("") {
      let shortened_path: &PathBuf =
        &content_file.components().skip(1).collect();
      data.insert(shortened_path, page_data);
    }
  }
  Ok(Value::from_serialize(data))
}
