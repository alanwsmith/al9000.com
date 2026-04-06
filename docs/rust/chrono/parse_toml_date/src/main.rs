use anyhow::Result;
use chrono::{DateTime, Local};
use toml::Table;

fn main() -> Result<()> {
  let input = "date = 2026-04-06T14:23:43-04:00";
  let toml = &input.parse::<Table>()?;
  let key = "date";
  let format = "%a. %B %-d - %-I:%M%p";
  if let Some(date) = get_date(toml, key) {
    println!("{}", date.format(format));
  } else {
    println!("Could not get date");
  }
  Ok(())
}

fn get_date(
  toml: &Table,
  key: &str,
) -> Option<DateTime<Local>> {
  match toml.get(key) {
    Some(dt) => dt.to_string().parse::<DateTime<Local>>().ok(),
    None => None,
  }
}
