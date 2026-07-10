use anyhow::Result;
use chrono::{DateTime, Local};
use static_site_generator::admin::Admin;
use static_site_generator::builder::Builder;
use static_site_generator::config::Config;
use static_site_generator::logger::Logger;
use static_site_generator::server::Server;
use static_site_generator::watcher::Watcher;
use tokio::sync::mpsc;
use tower_livereload::LiveReloadLayer;
use tracing::info;
use tracing::metadata::LevelFilter;

#[tokio::main]
async fn main() -> Result<()> {
  let _log_guards =
    Logger::setup().with_stdout(LevelFilter::INFO).init();
  info!("Initializing Static Site Builder");
  let config = Config::new()?;
  let (tx, rx) = mpsc::channel::<DateTime<Local>>(32);
  let live_reload = LiveReloadLayer::new();
  let reloader = live_reload.reloader();
  let watcher = Watcher::new(tx.clone());
  let mut builder =
    Builder::new(config.clone(), rx, reloader.clone())?;
  let server = Server::new(config.clone(), live_reload);
  let admin = Admin::new(config.clone());
  tokio::spawn(async move {
    let _ = watcher.init().await;
  });
  tokio::spawn(async move {
    let _ = builder.init().await;
  });
  tokio::spawn(async move {
    let _ = admin.init().await;
  });
  let server_handle = tokio::spawn(async move {
    let _ = server.init().await;
  });
  server_handle.await.unwrap();
  Ok(())
}
