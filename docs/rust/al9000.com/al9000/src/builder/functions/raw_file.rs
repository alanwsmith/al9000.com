use crate::constants::CONTENT_DIR;
use minijinja::Error;
use minijinja::ErrorKind;
use minijinja::Value;
use std::fs;
use std::path::PathBuf;

// Include the contents of a specific file without
// passing it through the template parser.
pub fn raw_file(input: String) -> Result<Value, Error> {
  let path = PathBuf::from(CONTENT_DIR)
    .join(input.strip_prefix("/").unwrap_or(&input));
  match fs::read_to_string(&path) {
    Ok(content) => Ok(Value::from_safe_string(content)),
    Err(e) => Err(Error::new(
      ErrorKind::TemplateNotFound,
      format!("Missing raw_file: {}", path.display()),
    )),
  }
}
