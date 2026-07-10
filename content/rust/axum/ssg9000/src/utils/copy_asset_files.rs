use crate::config::Config;
use crate::constants::{CONTENT_DIR, OUTPUT_DIR};
use crate::utils::*;
use anyhow::Result;
use std::path::PathBuf;
use tokio::task;
use tracing::info;

pub async fn copy_asset_files(config: &Config) -> Result<()> {
  info!("Copying assets");
  for asset_path in asset_files(config) {
    task::yield_now().await;
    if let Ok(base_path) = asset_path.strip_prefix(CONTENT_DIR) {
      let output_path = PathBuf::from(OUTPUT_DIR).join(base_path);
      copy_file_with_mkdir(&asset_path, &output_path)?;
    }
  }
  Ok(())
}
