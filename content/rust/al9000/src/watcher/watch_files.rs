#![allow(unused)]
use anyhow::Result;
use std::path::PathBuf;
use tokio::sync::mpsc;
use tracing::info;

pub async fn watch_files(
  source_docroot: PathBuf,
  tx_file_change: mpsc::Sender<chrono::DateTime<chrono::Local>>,
) -> Result<()> {
  info!("Starting file watcher");
  Ok(())
}
