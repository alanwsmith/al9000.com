#![allow(unused)]
use al9000::*;
use anyhow::Result;
use chrono::{DateTime, Local};
use std::path::PathBuf;
use tokio::sync::mpsc;
use tower_livereload::LiveReloadLayer;
use tracing::info;
use tracing::metadata::LevelFilter;

#[tokio::main]
async fn main() -> Result<()> {
  let _log_guards =
    Logger::setup().with_stdout(LevelFilter::INFO).init();
  info!("Initializing al9000");
  let port = find_port()?;
  info!("Found port for web server: {}", port);
  let live_reload = LiveReloadLayer::new();
  let reloader = live_reload.reloader();
  let (tx, rx) = mpsc::channel::<DateTime<Local>>(32);
  let input_root = PathBuf::from("../../content");
  let output_root = PathBuf::from("../../docs");
  let watcher_input_root = input_root.clone();
  tokio::spawn(async move {
    let _ = watch_files(watcher_input_root.clone(), tx).await;
  });

  let builder = Builder::new(
    input_root.clone(),
    output_root.clone(),
    reloader,
    rx,
  );

  Ok(())
}
