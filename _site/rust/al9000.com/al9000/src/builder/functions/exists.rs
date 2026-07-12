use minijinja::Value;
use std::path::PathBuf;

// REMINDER:
//
// The path to the content directory is hard coded
// based of the location of where the build
// process source code is stored and run.

pub fn exists(input_path: Value) -> bool {
  let path =
    PathBuf::from(format!("../../../../content{}", input_path));
  path.exists()
}
