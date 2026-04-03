use anyhow::Result;
use std::fs;
use std::path::PathBuf;

fn main() -> Result<()> {
  println!("Unzipping file bytes");
  let input_file = PathBuf::from("examples/input.jpg");
  let output_dir = PathBuf::from("examples/output");
  unzip_file_bytes(&input_file, &output_dir)?;
  Ok(())
}

fn unzip_file_bytes(
  input_file: &PathBuf,
  output_dir: &PathBuf,
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
  let bravo_out = output_dir.join("alfa");
  fs::write(alfa_out, alfa)?;
  // fs::write(bravo_out, bravo)?;

  println!("asdf");
  Ok(())
}
