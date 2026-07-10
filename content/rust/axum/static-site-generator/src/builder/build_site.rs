use crate::builder::copy_assets::copy_assets;
use crate::builder::copy_raw_files::copy_raw_files;
use crate::builder::transform_files::transform_files;
use crate::config::Config;
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
  copy_assets(&config).await?;
  copy_raw_files(&config).await?;
  info!("Build complete. Reloading browser.");
  reloader.reload();
  Ok(())
}
