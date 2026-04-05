use al9000::*;
use anyhow::Result;
use chrono::{DateTime, Local};
use tokio::sync::mpsc;
use tower_livereload::LiveReloadLayer;
use tracing::info;
use tracing::metadata::LevelFilter;

#[tokio::main]
async fn main() -> Result<()> {
  let _log_guards =
    Logger::setup().with_stdout(LevelFilter::INFO).init();
  info!("Initializing al9000");

  let config = Config::new();

  let (tx, rx) = mpsc::channel::<DateTime<Local>>(32);
  let live_reload = LiveReloadLayer::new();
  let reloader = live_reload.reloader();

  let watcher = Watcher::new(config.clone(), tx.clone());
  let mut builder =
    Builder::new(config.clone(), rx, reloader.clone());
  let server = Server::new(config.clone(), live_reload);

  tokio::spawn(async move {
    let _ = watcher.init().await;
  });
  tokio::spawn(async move {
    let _ = builder.init().await;
  });
  let server_handle = tokio::spawn(async move {
    let _ = server.start().await;
  });
  server_handle.await.unwrap();

  Ok(())
}
