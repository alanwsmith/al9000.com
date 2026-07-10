use crate::config::Config;
use crate::constants::{CONTENT_DIR, OUTPUT_DIR};
use crate::utils::*;
use anyhow::Result;
use std::path::PathBuf;
use tokio::task;
use tracing::info;

// These are files with a `.raw` in their filename
// that would otherwise be transformed, but
// aren't since they are turned off.
pub async fn copy_raw_files(config: &Config) -> Result<()> {
  info!("Copying raw files");
  for asset_path in raw_files(config) {
    task::yield_now().await;
    if let Ok(base_path) = asset_path.strip_prefix(CONTENT_DIR) {
      let output_path = PathBuf::from(OUTPUT_DIR).join(base_path);
      copy_file_with_mkdir(&asset_path, &output_path)?;
    }
  }
  Ok(())
}
