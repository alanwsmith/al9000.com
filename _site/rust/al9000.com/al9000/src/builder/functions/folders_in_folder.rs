use std::path::PathBuf;
use walkdir::WalkDir;

// Returns an array of folders in a folder.
// Only the folder names themselves are
// returned (i.e. they're not full paths).

// REMINDER: This is hard coded to the
// current content directory based
// of the position of the source code.

pub fn folders_in_folder(path: &str) -> Vec<String> {
  WalkDir::new(PathBuf::from(format!(
    "../../../../content{}",
    path
  )))
  .min_depth(1)
  .max_depth(1)
  .sort_by_file_name()
  .into_iter()
  .filter_map(|e| e.ok())
  .filter(|e| e.path().is_dir())
  .map(|e| {
    e.path().file_name().unwrap().to_string_lossy().to_string()
  })
  .collect::<Vec<_>>()
}
