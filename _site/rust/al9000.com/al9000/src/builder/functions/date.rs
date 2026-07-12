use chrono::DateTime;
use chrono::Local;
use chrono::Utc;
use minijinja::Value;
use serde::Deserialize;

pub fn date(
  input: Value,
  format: Option<&str>,
) -> Option<Value> {
  let format = format.unwrap_or("%B %Y");

  // TODO: Parse strings in addition to TOML

  match toml::value::Datetime::deserialize(&input) {
    Ok(date) => match date.to_string().parse::<DateTime<Local>>() {
      Ok(dt) => {
        Some(Value::from_safe_string(dt.format(format).to_string()))
      }
      Err(_) => None,
    },
    Err(_) => None,
  }

  // .unwrap()
  // .to_string()
  // .parse::<DateTime<Local>>()
  // {
  // // TODO: Add ability to pass format to use.
  // Ok(dt) => {
  //   Some(Value::from_safe_string(dt.format("%B %Y").to_string()))
  // }
  // Err(_) => None,
  // }
}
