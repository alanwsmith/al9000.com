use itertools::Itertools;
use std::path::Path;
use std::path::PathBuf;
use walkdir::WalkDir;

pub fn get_content_files(content_root: &Path) -> Vec<PathBuf> {
  WalkDir::new(content_root)
    .into_iter()
    .filter_map(|e| e.ok())
    .filter(|e| e.path().is_file())
    .map(|e| e.path().to_path_buf())
    .filter(|pb| {
      !pb
        .components()
        .map(|c| c.as_os_str().display().to_string())
        .contains("target")
    })
    .filter(|pb| {
      !pb
        .file_name()
        .unwrap()
        .display()
        .to_string()
        .starts_with(".")
    })
    .collect()
}
