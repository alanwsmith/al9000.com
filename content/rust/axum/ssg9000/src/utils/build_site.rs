use crate::config::Config;
use crate::utils::*;
use anyhow::Result;
use tower_livereload::Reloader;
use tracing::info;

pub async fn build_site(
  config: Config,
  reloader: Reloader,
) -> Result<()> {
  info!("Building Site");
  match transform_files(&config).await {
    Ok(_) => (),
    Err(e) => {
      dbg!(e);
    }
  }
  copy_asset_files(&config).await?;
  copy_raw_files(&config).await?;
  info!("Build complete. Reloading browser.");
  reloader.reload();
  Ok(())
}
