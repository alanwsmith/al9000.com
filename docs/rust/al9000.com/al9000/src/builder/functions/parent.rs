use minijinja::Value;
use std::path::PathBuf;

pub fn parent(file_path: String) -> Option<Value> {
  let pb = PathBuf::from(file_path);
  pb.parent().map(|output| {
    Value::from_safe_string(output.to_string_lossy().to_string())
  })
}
