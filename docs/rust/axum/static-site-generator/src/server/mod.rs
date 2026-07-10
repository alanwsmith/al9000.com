use crate::config::Config;
use crate::constants::OUTPUT_DIR;
use anyhow::Result;
use axum::Router;
use std::path::PathBuf;
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

  pub async fn init(self) -> Result<()> {
    info!(
      "Initializing Site Server at: 127.0.0.1:{}",
      self.config.site_port()
    );
    let service = ServeDir::new(PathBuf::from(OUTPUT_DIR))
      .append_index_html_on_directories(true);
    let app = Router::new()
      .fallback_service(service)
      .layer(self.live_reload);
    let listener = tokio::net::TcpListener::bind(format!(
      "127.0.0.1:{}",
      self.config.site_port()
    ))
    .await
    .unwrap();
    axum::serve(listener, app).await.unwrap();
    Ok(())
  }
}
