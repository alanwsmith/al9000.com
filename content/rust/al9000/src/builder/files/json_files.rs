use crate::Config;
use itertools::Itertools;
use std::path::Path;
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
    let parts = item.split(".");
    for part in parts {
      if part == "inc" {
        return false;
      }
    }
  }
  true
}

pub fn json_files(config: &Config) -> Vec<PathBuf> {
  WalkDir::new(config.content_dir())
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

//.map(|e| e.path().ok().to_path_buf())
// .map(|e| e.path().to_path_buf())
// .filter(|pb| {
//   !pb
//     .file_name()
//     .unwrap()
//     .display()
//     .to_string()
//     .starts_with(".")
// })
// .filter(|pb| {
//   !pb
//     .components()
//     .map(|c| c.as_os_str().display().to_string())
//     .contains("target")
// })
// .filter(|pb| pb.extension().is_some())
// .filter(|pb| {
//   config.content_file_extensions().contains(
//     &pb.extension().unwrap().to_string_lossy().to_string(),
//   )
// })
