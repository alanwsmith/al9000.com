#![allow(unused)]
use crate::builder::utils::{copy_assets, copy_off_files};
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
  match transform_files(&config).await {
    Ok(_) => (),
    Err(e) => {
      dbg!(e);
    }
  }
  copy_assets(&config).await?;
  copy_off_files(&config).await?;
  info!("Build complete. Reloading browser.");
  reloader.reload();
  Ok(())
}
