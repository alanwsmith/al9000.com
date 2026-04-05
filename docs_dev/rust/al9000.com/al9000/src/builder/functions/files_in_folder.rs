use minijinja::{Value, value};
use std::path::PathBuf;
use walkdir::{DirEntry, WalkDir};

fn include_file(entry: &DirEntry) -> bool {
  if entry.file_name().to_string_lossy().starts_with(".") {
    return false;
  }

  //let pb = entry.path().to_path_buf();
  // let components = pb.components();
  // for component in components {
  //   let item = component.as_os_str().to_string_lossy().to_string();
  //   if item.as_str() == "target" {
  //     return false;
  //   }
  //   let parts = item.split(".");
  //   for part in parts {
  //     if part == "inc" {
  //       return false;
  //     }
  //   }
  // }
  true
}

pub fn files_in_folder(path: &str) -> Value {
  Value::from_serialize(
    WalkDir::new(PathBuf::from(format!(
      "../../../../content{}",
      path
    )))
    .min_depth(1)
    .max_depth(1)
    .sort_by_file_name()
    .into_iter()
    .filter_entry(include_file)
    .filter_map(|e| e.ok())
    .filter(|e| e.path().is_file())
    .map(|e| {
      Value::from_safe_string(format!(
        "/{}",
        e.path()
          .strip_prefix("../../../../content")
          .expect("could not remove 'content' from path")
          .to_string_lossy()
      ))
    })
    .collect::<Vec<_>>(),
  )
}
