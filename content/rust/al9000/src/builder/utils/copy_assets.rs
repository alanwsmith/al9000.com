use crate::Config;
use crate::builder::utils::copy_file_with_mkdir;
use crate::files::asset_files;
use anyhow::Result;
use tokio::task;

pub async fn copy_assets(config: &Config) -> Result<()> {
  for asset_path in asset_files(config) {
    task::yield_now().await;
    if let Ok(base_path) =
      asset_path.strip_prefix(config.content_dir())
    {
      let output_path = config.output_dir().join(base_path);
      copy_file_with_mkdir(&asset_path, &output_path);
    }
  }
  Ok(())
}
