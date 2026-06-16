use anyhow::Result;
use minijinja::Value;
use serde::Serialize;
use std::fs;
use std::path::Path;

#[derive(Debug, PartialEq, Serialize)]
pub struct FilePathDeatils {
  pub dir: Vec<Value>,
  pub dir_string: Value,
  pub extension: Option<Value>,
  pub name: Value,
  pub path: Vec<Value>,
  pub stem: Value,
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

  let dir_string = Value::from(format!(
    "/{}",
    pb.parent()
      .unwrap()
      .iter()
      .skip(5)
      .map(|part| part.to_string_lossy().to_string())
      .collect::<Vec<_>>()
      .join("/"),
  ));

  let extension = pb
    .extension()
    .map(|v| Value::from(v.to_string_lossy().to_string()));

  let name = Value::from(
    pb.file_name().unwrap().to_string_lossy().to_string(),
  );

  let path: Vec<_> = pb
    .iter()
    .skip(5)
    .map(|part| Value::from(part.to_string_lossy().to_string()))
    .collect();

  let stem = Value::from(
    pb.file_stem().unwrap().to_string_lossy().to_string(),
  );

  let mut fpd = FilePathDeatils {
    dir,
    dir_string,
    extension,
    name,
    path,
    stem,
  };
  Ok(Value::from_serialize(fpd))
}
