use anyhow::Result;
use std::fs;
use std::path::Path;
use std::path::PathBuf;

fn main() -> Result<()> {
  println!("Unzipping file bytes");
  let input_file = PathBuf::from("samples/church-3818213.webm");
  let output_dir = PathBuf::from("samples/output");
  unzip_file_bytes(&input_file, &output_dir)?;
  Ok(())
}

fn unzip_file_bytes(
  input_file: &PathBuf,
  output_dir: &Path,
) -> Result<()> {
  let bytes = fs::read(input_file)?;

  let mut alfa = vec![];
  let mut bravo = vec![];
  bytes.iter().enumerate().for_each(|(index, value)| {
    if index % 2 == 0 {
      alfa.push(*value);
    } else {
      bravo.push(*value);
    }
  });

  let alfa_out = output_dir.join("alfa");
  let bravo_out = output_dir.join("bravo");
  fs::write(alfa_out, alfa)?;
  fs::write(bravo_out, bravo)?;
  println!("Done");
  Ok(())
}
