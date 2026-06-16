use anyhow::Result;
use minijinja::Value;
use serde::Serialize;
use std::fs;
use std::path::Path;

#[derive(Debug, PartialEq, Serialize)]
pub struct FilePathDeatils {
  pub dir: Vec<Value>,
  // pub extension: Option<Value>,
  // pub extensions: Vec<Value>,
  // pub name: Value,
  pub path: Vec<Value>,
  // pub stem: Value,
}

// REMINDER: This is currently hard coded for
// move up directories to get to the
// `content` dir.

pub fn get_file_path_details(pb: &Path) -> Result<Value> {
  let dir: Vec<_> = pb
    .parent()
    .unwrap()
    .iter()
    .skip(5)
    .map(|part| Value::from(part.to_string_lossy().to_string()))
    .collect();

  let path: Vec<_> = pb
    .iter()
    .skip(5)
    .map(|part| Value::from(part.to_string_lossy().to_string()))
    .collect();

  let mut fpd = FilePathDeatils { dir, path };
  Ok(Value::from_serialize(fpd))
}
