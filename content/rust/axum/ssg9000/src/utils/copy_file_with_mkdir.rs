use anyhow::Result;
use std::path::PathBuf;

// REMINDER: Copying is done this way to prevent
// the notify watching from triggering
// when files are read for copying (i.e.
// they don't change but still cause a trigger)
pub fn copy_file_with_mkdir(
  input_path: &PathBuf,
  output_path: &PathBuf,
) -> Result<()> {
  if let Some(parent_dir) = output_path.parent() {
    std::fs::create_dir_all(parent_dir)?;
  }
  let data = std::fs::read(input_path)?;
  std::fs::write(output_path, &data)?;
  Ok(())
}
