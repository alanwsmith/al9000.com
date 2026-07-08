use chrono::offset::Utc;
use minijinja::Value;

pub fn date() -> Value {
  let d = Utc::now();
  Value::from_safe_string(format!("{}", d))
}
