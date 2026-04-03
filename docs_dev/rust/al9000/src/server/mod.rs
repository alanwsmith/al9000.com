pub mod missing_page;

use crate::Config;
use anyhow::Result;
use axum::Router;
use axum::routing::get;
use missing_page::*;
use tower_http::services::ServeDir;
use tower_livereload::LiveReloadLayer;
use tracing::info;

pub struct Server {
  config: Config,
  live_reload: LiveReloadLayer,
}

impl Server {
  pub fn new(
    config: Config,
    live_reload: LiveReloadLayer,
  ) -> Server {
    Server {
      config,
      live_reload,
    }
  }

  pub async fn start(self) -> Result<()> {
    info!("Initializing Server:");
    let service = ServeDir::new(self.config.output_dir())
      .append_index_html_on_directories(true)
      .not_found_service(get(missing_page));
    let app = Router::new()
      .fallback_service(service)
      .layer(self.live_reload);
    let listener = tokio::net::TcpListener::bind(format!(
      "127.0.0.1:{}",
      self.config.port()
    ))
    .await
    .unwrap();
    axum::serve(listener, app).await.unwrap();
    Ok(())
  }
}
