use anyhow::Result;
use base32::Alphabet;
use chrono::{DateTime, FixedOffset};
use regex::Regex;
use std::{fs, path::PathBuf};
use walkdir::WalkDir;

fn main() -> Result<()> {
  let files = get_files_with_extensions(
    &PathBuf::from("../../.."),
    &vec!["html"],
  );
  let date_matcher = Regex::new(
    r"created\s+=\s+(\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d-\d\d:\d\d)",
  )?;
  for f in files {
    let content = fs::read_to_string(f)?;
    for (_, [date]) in
      date_matcher.captures_iter(&content).map(|c| c.extract())
    {
      let dt = DateTime::parse_from_rfc3339(date)?;
      let encoded = encode_base32_datetime(&dt);
      let id = format!(
        "{}/{}/{}/{}",
        &encoded[0..=1],
        &encoded[2..=3],
        &encoded[4..=5],
        &encoded[6..=7],
      );
      dbg!(id);
    }
  }

  Ok(())
}

fn encode_base32_datetime(
  datetime: &DateTime<FixedOffset>
) -> String {
  let bytes = &datetime.timestamp().to_be_bytes()[3..8];
  base32::encode(Alphabet::Crockford, bytes).to_lowercase()
}

fn get_files_with_extensions(
  dir: &PathBuf,
  extensions: &Vec<&str>,
) -> Vec<PathBuf> {
  WalkDir::new(dir)
    .into_iter()
    .filter_map(|e| {
      let path = e.as_ref().unwrap().path();
      match path.extension() {
        Some(ext) => {
          if extensions.contains(&ext.to_str().unwrap()) {
            Some(path.to_path_buf())
          } else {
            None
          }
        }
        None => None,
      }
    })
    .collect()
}
