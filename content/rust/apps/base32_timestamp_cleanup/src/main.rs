use anyhow::Result;
use base32::Alphabet;
use chrono::{DateTime, FixedOffset};
use regex::Regex;
use std::{fs, path::PathBuf};
use walkdir::WalkDir;

fn main() -> Result<()> {
  update_file_ids()?;
  make_blog_folders()?;
  println!("done.");
  Ok(())
}

fn make_blog_folders() -> Result<()> {
  let base_dir = "../../../blog";
  let id_matcher = Regex::new(r#"id\s+=\s+"(..)/(..)/(..)/(..)""#)?;
  let files = get_files_with_extensions(
    &PathBuf::from(base_dir),
    &vec!["html"],
  );
  for f in files {
    let content = fs::read_to_string(&f)?;
    if let Some((_, [f1, f2, f3, f4])) = id_matcher
      .captures_iter(&content)
      .next()
      .map(|c| c.extract())
    {
      let new_folder =
        PathBuf::from(base_dir).join(f1).join(f2).join(f3).join(f4);
      dbg!(&new_folder);
      // NOTE: Uncomment this line to make the
      // dirs. It should be idempotent, but
      // there's no need to test that.
      // std::fs::create_dir_all(new_folder)?;
    }
  }
  Ok(())
}

fn update_file_ids() -> Result<()> {
  let files = get_files_with_extensions(
    &PathBuf::from("../../.."),
    &vec!["html"],
  );
  let date_matcher = Regex::new(
    r"created\s+=\s+(\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d-\d\d:\d\d)",
  )?;
  let id_matcher = Regex::new(r#"id\s+=\s+"(../../../..)""#)?;
  for f in files {
    let content = fs::read_to_string(&f)?;
    if let Some((_, [date])) = date_matcher
      .captures_iter(&content)
      .next()
      .map(|c| c.extract())
    {
      let dt = DateTime::parse_from_rfc3339(date)?;
      let encoded = encode_base32_datetime(&dt);
      let new_id = format!(
        "{}/{}/{}/{}",
        &encoded[0..=1],
        &encoded[2..=3],
        &encoded[4..=5],
        &encoded[6..=7],
      );
      dbg!(&new_id);
      if let Some((_, [old_id])) = id_matcher
        .captures_iter(&content)
        .next()
        .map(|c| c.extract())
      {
        dbg!(&old_id);
        // NOTE: Uncomment these lines to do the replacement.
        // It should be safe to do multiple times, but
        // there's no reason to test that.
        // let new_content = content.replace(old_id, &new_id);
        // fs::write(&f, new_content)?;
      }
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
