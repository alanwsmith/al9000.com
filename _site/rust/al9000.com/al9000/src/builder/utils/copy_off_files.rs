use crate::Config;
use crate::builder::utils::copy_file_with_mkdir;
use crate::files::off_files;
use anyhow::Result;
use tokio::task;
use tracing::info;

// These are files with a `.off` in their filename
// that would otherwise be transformed, but
// aren't since they are turned off.
pub async fn copy_off_files(config: &Config) -> Result<()> {
  //   info!("Copying assets");
  for asset_path in off_files(config) {
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
