pub mod missing_page;

use anyhow::Result;
use axum::Router;
use axum::routing::get;
use missing_page::*;
use std::path::PathBuf;
use tower_http::services::ServeDir;
use tower_livereload::LiveReloadLayer;
use tracing::info;

pub struct Server {
  docs_root: PathBuf,
  port: u16,
  live_reload: LiveReloadLayer,
}

impl Server {
  pub fn new(
    docs_root: PathBuf,
    port: u16,
    live_reload: LiveReloadLayer,
  ) -> Server {
    Server {
      docs_root,
      port,
      live_reload,
    }
  }

  pub async fn start(self) -> Result<()> {
    info!("Initializing Server:");
    let service = ServeDir::new(&self.docs_root)
      .append_index_html_on_directories(true)
      .not_found_service(get(missing_page));
    let app = Router::new()
      .fallback_service(service)
      .layer(self.live_reload);
    let listener = tokio::net::TcpListener::bind(format!(
      "127.0.0.1:{}",
      self.port
    ))
    .await
    .unwrap();
    axum::serve(listener, app).await.unwrap();
    Ok(())
  }
}
