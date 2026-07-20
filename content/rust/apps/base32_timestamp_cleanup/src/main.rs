use std::path::PathBuf;
use walkdir::WalkDir;

fn main() {
  let files = get_files_with_extensions(
    &PathBuf::from("../../.."),
    &vec!["html"],
  );
}

fn get_files_with_extensions(
  dir: &PathBuf,
  extensions: &Vec<&str>,
) -> Vec<PathBuf> {
  WalkDir::new(dir)
    .into_iter()
    .filter_map(|e| {
      let path = e.as_ref().unwrap().path();
      match path.extension() {
        Some(ext) => {
          if extensions.contains(&ext.to_str().unwrap()) {
            Some(path.to_path_buf())
          } else {
            None
          }
        }
        None => None,
      }
    })
    .collect()
}
