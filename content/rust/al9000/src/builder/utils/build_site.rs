#![allow(unused)]
use crate::builder::utils::copy_assets;
use crate::{Config, builder::utils::transform_files};
use anyhow::Result;
use chrono::{DateTime, Local};
use tokio::time::{Duration, sleep};
use tower_livereload::Reloader;
use tracing::info;

pub async fn build_site(
  config: Config,
  reloader: Reloader,
) -> Result<()> {
  info!("Building Site");
  transform_files(&config).await?;
  copy_assets(&config).await?;
  info!("Build complete. Reloading browser.");
  reloader.reload();
  Ok(())
}
