// TODO: Add feature that you can skip including json files with `.skip

#![allow(unused)]
use crate::Config;
use crate::builder::utils::DataNode;
use itertools::Itertools;
use minijinja::Value;
use std::fs;
use std::path::Path;
use std::path::PathBuf;
use walkdir::WalkDir;

pub fn load_json(config: &Config) -> Value {
  let mut data = DataNode::new();
  WalkDir::new(config.content_dir())
    .into_iter()
    .filter_map(|e| e.ok())
    .filter(|e| e.path().is_file())
    .map(|e| e.path().to_path_buf())
    .filter(|pb| {
      !pb
        .file_name()
        .unwrap()
        .display()
        .to_string()
        .starts_with(".")
    })
    .filter(|pb| {
      !pb
        .components()
        .map(|c| c.as_os_str().display().to_string())
        .contains("target")
    })
    .filter(|pb| pb.extension().is_some())
    .filter(|pb| {
      pb.extension().unwrap().display().to_string().to_lowercase()
        == "json"
    })
    .for_each(|pb| match fs::read_to_string(&pb) {
      Ok(text) => match serde_json::from_str::<Value>(&text) {
        Ok(json) => {
          let shortened_path: &PathBuf =
            &pb.components().skip(4).collect();
          data.insert(shortened_path, json);
        }
        Err(e) => (),
      },
      Err(e) => (),
    });
  Value::from_serialize(data)
}
