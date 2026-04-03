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
  let content_root = PathBuf::from("../../../content");
  let docs_root = PathBuf::from("../../../docs_dev");

  let watcher = Watcher::new(content_root.clone(), tx.clone());

  let mut builder = Builder::new(
    content_root.clone(),
    docs_root.clone(),
    reloader.clone(),
    rx,
  );

  let server = Server::new(docs_root.clone(), port, live_reload);

  tokio::spawn(async move {
    let _ = watcher.start().await;
  });

  tokio::spawn(async move {
    let _ = builder.start().await;
  });

  let server_handle = tokio::spawn(async move {
    let _ = server.start().await;
  });

  server_handle.await.unwrap();

  Ok(())
}
