use std::path::Path;
use std::path::PathBuf;
use walkdir::{DirEntry, WalkDir};

fn main() {
  let samples = PathBuf::from("samples");
  let all_files = all_files(&samples);
  dbg!(all_files);
  let filtered_files = skip_hidden(&samples);
  dbg!(filtered_files);
}

fn all_files(path: &Path) -> Vec<PathBuf> {
  WalkDir::new(path)
    .sort_by_file_name()
    .into_iter()
    .filter_map(|e| e.ok())
    .map(|e| e.path().to_path_buf())
    .collect()
}

fn include_file(entry: &DirEntry) -> bool {
  if entry.file_name().to_string_lossy().starts_with(".") {
    return false;
  }
  true
}

fn skip_hidden(path: &Path) -> Vec<PathBuf> {
  WalkDir::new(path)
    .sort_by_file_name()
    .into_iter()
    .filter_entry(include_file)
    .filter_map(|e| e.ok())
    .map(|e| e.path().to_path_buf())
    .collect()
}
