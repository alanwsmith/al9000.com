use chrono::DateTime;
use chrono::Local;
use chrono::Utc;
use minijinja::Value;
use serde::Deserialize;

pub fn timestamp(datetime: Option<Value>) -> Value {
  match datetime {
    Some(dt_raw) => {
      match toml::value::Datetime::deserialize(dt_raw) {
        Ok(date) => {
          match date.to_string().parse::<DateTime<Local>>() {
            Ok(dt) => Value::from_safe_string(
              dt.to_rfc3339_opts(chrono::SecondsFormat::Secs, true)
                .to_string(),
            ),
            Err(_) => Value::from_safe_string(
              "[error processing date]".to_string(),
            ),
          }
        }
        Err(_) => Value::from_safe_string(
          "[error processing date]".to_string(),
        ),
      }
    }
    None => {
      let ts = chrono::prelude::Local::now();
      Value::from_safe_string(
        ts.to_rfc3339_opts(chrono::SecondsFormat::Secs, true)
          .to_string(),
      )
    }
  }

  // let ts = chrono::prelude::Local::now();
  // Value::from_safe_string(
  //   ts.to_rfc3339_opts(chrono::SecondsFormat::Secs, true)
  //     .to_string(),
  // )

  // match format {
  //   Some(f) => Value::from_safe_string(ts.format(f).to_string()),
  //   None => Value::from_safe_string(
  //     ts.to_rfc3339_opts(chrono::SecondsFormat::Secs, true)
  //       .to_string(),
  //   ),
  // }
  // let format = format.unwrap_or("%B %Y");

  // TODO: Parse strings in addition to TOML
  //

  // match toml::value::Datetime::deserialize(&input) {
  //   Ok(date) => match date.to_string().parse::<DateTime<Local>>() {
  //     Ok(dt) => {
  //       Some(Value::from_safe_string(dt.format(format).to_string()))
  //     }
  //     Err(_) => None,
  //   },
  //   Err(_) => None,
  // }

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
