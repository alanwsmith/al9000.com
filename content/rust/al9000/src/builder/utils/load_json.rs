#![allow(unused)]
use crate::Config;
use crate::builder::content_files;
use crate::builder::get_page_data;
use crate::builder::json_files;
use crate::builder::utils::DataNode;
use anyhow::Result;
use itertools::Itertools;
use minijinja::Value;
use std::fs;
use std::path::Path;
use std::path::PathBuf;
use walkdir::WalkDir;

// Loads both JSON and TOML data.
pub fn load_json(config: &Config) -> Result<Value> {
  let mut data = DataNode::new();

  for json_file in json_files(config) {
    match fs::read_to_string(&json_file) {
      Ok(text) => match serde_json::from_str::<Value>(&text) {
        Ok(json) => {
          let shortened_path: &PathBuf =
            &json_file.components().skip(4).collect();
          data.insert(shortened_path, json);
        }
        Err(e) => (),
      },
      Err(e) => (),
    }
  }

  for content_file in content_files(config).iter() {
    let page_data = get_page_data(content_file)?;
    if page_data != Value::from_serialize("") {
      let shortened_path: &PathBuf =
        &content_file.components().skip(4).collect();
      data.insert(shortened_path, page_data);
    }
  }

  Ok(Value::from_serialize(data))
}

// WalkDir::new(config.content_dir())
//   .into_iter()
//   .filter_map(|e| e.ok())
//   .filter(|e| e.path().is_file())
//   .map(|e| e.path().to_path_buf())
//   .filter(|pb| {
//     !pb
//       .file_name()
//       .unwrap()
//       .display()
//       .to_string()
//       .starts_with(".")
//   })
//   .filter(|pb| {
//     !pb
//       .components()
//       .map(|c| c.as_os_str().display().to_string())
//       .contains("target")
//   })
//   .filter(|pb| pb.extension().is_some())
//   .filter(|pb| {
//     pb.extension().unwrap().display().to_string().to_lowercase()
//       == "json"
//   })
//   .for_each(|pb| match fs::read_to_string(&pb) {
//     Ok(text) => match serde_json::from_str::<Value>(&text) {
//       Ok(json) => {
//         let shortened_path: &PathBuf =
//           &pb.components().skip(4).collect();
//         data.insert(shortened_path, json);
//       }
//       Err(e) => (),
//     },
//     Err(e) => (),
//   });
