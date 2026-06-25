use crate::constants::CONTENT_DIR;
use minijinja::Error;
use minijinja::Value;

pub fn raw_include(path: Value) -> Result<Value, Error> {
  Ok(Value::from_safe_string(CONTENT_DIR.to_string()))
}
