use crate::constants::DEFAULT_DATE_FORMAT;
use chrono::{DateTime, Local};
use minijinja::{Error, Value};

// Usage:
// [@ date() @]
// [@ date(None, format="%Y-%m-%d") @]
// [@ date("2026-01-21T12:23:12-04:00") @]
// [@ date("2026-01-21T12:23:12-04:00", format="%Y-%m-%d") @]

pub fn date(
  input: Option<String>,
  options: Option<Value>,
) -> Result<Value, Error> {
  let format = match options {
    Some(opts) => opts
      .get_attr("format")
      .unwrap_or(DEFAULT_DATE_FORMAT.into()),
    None => DEFAULT_DATE_FORMAT.into(),
  };
  if let Some(date_string) = input {
    match date_string.parse::<DateTime<Local>>() {
      Ok(d) => Ok(Value::from_safe_string(
        d.format(&format.to_string()).to_string(),
      )),
      Err(_) => {
        Ok(Value::from_safe_string("[invalid date]".to_string()))
      }
    }
  } else {
    let d = Local::now();
    Ok(Value::from_safe_string(
      d.format(&format.to_string()).to_string(),
    ))
  }
}
