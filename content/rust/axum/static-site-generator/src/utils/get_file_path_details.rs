use anyhow::Result;
use minijinja::Value;
use serde::Serialize;
use std::fs;
use std::path::Path;

#[derive(Debug, PartialEq, Serialize)]
pub struct FilePathDeatils {
  pub dir: Value,
  pub dir_parts: Vec<Value>,
  pub extension: Option<Value>,
  pub name: Value,
  pub path: Value,
  pub path_parts: Vec<Value>,
  pub stem: Value,
}

pub fn get_file_path_details(pb: &Path) -> Result<Value> {
  let dir = Value::from(format!(
    "/{}",
    pb.parent()
      .unwrap()
      .iter()
      .skip(1)
      .map(|part| part.to_string_lossy().to_string())
      .collect::<Vec<_>>()
      .join("/"),
  ));
  let dir_parts: Vec<_> = pb
    .parent()
    .unwrap()
    .iter()
    .skip(1)
    .map(|part| Value::from(part.to_string_lossy().to_string()))
    .collect();
  let extension = pb
    .extension()
    .map(|v| Value::from(v.to_string_lossy().to_string()));
  let name = Value::from(
    pb.file_name().unwrap().to_string_lossy().to_string(),
  );
  let path = Value::from(format!(
    "/{}",
    pb.iter()
      .skip(1)
      .map(|part| part.to_string_lossy().to_string())
      .collect::<Vec<_>>()
      .join("/")
  ));
  let path_parts: Vec<_> = pb
    .iter()
    .skip(1)
    .map(|part| Value::from(part.to_string_lossy().to_string()))
    .collect();
  let stem = Value::from(
    pb.file_stem().unwrap().to_string_lossy().to_string(),
  );
  let fpd = FilePathDeatils {
    dir,
    dir_parts,
    extension,
    name,
    path,
    path_parts,
    stem,
  };
  Ok(Value::from_serialize(fpd))
}
