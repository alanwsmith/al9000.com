use crate::Config;
use itertools::Itertools;
use std::path::Path;
use std::path::PathBuf;
use walkdir::WalkDir;

// Returns the vec of content files that
// get transformed.

pub fn content_files(config: &Config) -> Vec<PathBuf> {
  WalkDir::new(config.content_dir())
    .into_iter()
    .filter_map(|e| e.ok())
    .filter(|e| e.path().is_file())
    .map(|e| e.path().to_path_buf())
    .filter(|pb| {
      !pb
        .file_name()
        .unwrap()
        .display()
        .to_string()
        .starts_with(".")
    })
    .filter(|pb| {
      !pb
        .components()
        .map(|c| c.as_os_str().display().to_string())
        .contains("target")
    })
    .filter(|pb| pb.extension().is_some())
    .filter(|pb| {
      config.content_file_extensions().contains(
        &pb.extension().unwrap().to_string_lossy().to_string(),
      )
    })
    .collect()
}
