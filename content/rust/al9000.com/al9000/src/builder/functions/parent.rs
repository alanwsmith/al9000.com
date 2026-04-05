use std::path::PathBuf;

pub fn parent(file_path: String) -> String {
  let pb = PathBuf::from(file_path);
  if let Some(output) = pb.parent() {
    output.to_string_lossy().to_string()
  } else {
    "".to_string()
  }
}
