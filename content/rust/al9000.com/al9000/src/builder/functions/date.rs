use chrono::DateTime;
use chrono::Local;
use chrono::Utc;
use minijinja::Value;
use serde::Deserialize;

pub fn date(
  input: Value,
  format: Option<&str>,
) -> Option<Value> {
  match toml::value::Datetime::deserialize(&input)
    .unwrap()
    .to_string()
    .parse::<DateTime<Local>>()
  {
    Ok(dt) => {
      Some(Value::from_safe_string(dt.format("%B %Y").to_string()))
    }
    Err(_) => None,
  }
}
