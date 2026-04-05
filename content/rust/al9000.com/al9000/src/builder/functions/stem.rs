use minijinja::Value;
use std::path::PathBuf;

pub fn stem(path: &str) -> Option<Value> {
  let pathbuf = PathBuf::from(path);
  let file_stem = pathbuf.file_stem()?.display().to_string();
  Some(Value::from_safe_string(file_stem))
}
