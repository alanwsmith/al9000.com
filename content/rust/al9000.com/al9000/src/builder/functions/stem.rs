use minijinja::Value;
use std::path::PathBuf;

// Reminder: This only strips extensions from
// filenames. Directories are left as is so that
// things like `templates.inc` don't get munged.
pub fn stem(path: &str) -> Option<Value> {
  let pathbuf = PathBuf::from(path);
  if (pathbuf.is_file()) {
    let file_stem = pathbuf.file_stem()?.display().to_string();
    Some(Value::from_safe_string(file_stem))
  } else {
    let file_stem = pathbuf.file_name()?.display().to_string();
    Some(Value::from_safe_string(file_stem))
  }
}
