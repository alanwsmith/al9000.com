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
    for part in parts.clone() {
      if part == "inc" {
        return false;
      }
    }
  }
  true
}

pub fn off_files(config: &Config) -> Vec<PathBuf> {
  WalkDir::new(config.content_dir())
    .into_iter()
    .filter_entry(include_file)
    .filter_map(|e| e.ok())
    .map(|e| e.into_path().to_path_buf())
    .filter(|pb| pb.extension().is_some())
    .filter(|pb| {
      config.content_file_extensions().contains(
        &pb.extension().unwrap().to_string_lossy().to_string(),
      )
    })
    .filter(|pb| {
      let components = pb.components();
      for component in components {
        let item =
          component.as_os_str().to_string_lossy().to_string();
        let parts = item.split(".");
        for part in parts.clone() {
          if part == "off" {
            return true;
          }
        }
      }
      false
    })
    .collect()
}
