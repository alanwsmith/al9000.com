use crate::constants::CONTENT_DIR;
use std::path::PathBuf;
use walkdir::DirEntry;
use walkdir::WalkDir;

fn include_file(entry: &DirEntry) -> bool {
  let pb = entry.path().to_path_buf();
  let components = pb.components();
  for component in components {
    let item = component.as_os_str().to_string_lossy().to_string();
    if item.as_str() == "target" {
      return false;
    }
  }
  true
}

pub fn json_files() -> Vec<PathBuf> {
  WalkDir::new(CONTENT_DIR)
    .into_iter()
    .filter_entry(include_file)
    .filter_map(|e| e.ok())
    .map(|e| e.into_path().to_path_buf())
    .filter(|pb| pb.extension().is_some())
    .filter(|pb| {
      &pb
        .extension()
        .unwrap()
        .to_string_lossy()
        .to_string()
        .to_lowercase()
        == "json"
    })
    .collect()
}
