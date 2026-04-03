#![allow(unused)]
use crate::Config;
use anyhow::Result;
use chrono::{DateTime, Local};
use tokio::time::{Duration, sleep};
use tracing::info;

pub async fn build_site(config: Config) -> Result<()> {
  info!("Building Site");
  sleep(Duration::from_millis(1000)).await;
  info!("Build Complete:");
  Ok(())
}
