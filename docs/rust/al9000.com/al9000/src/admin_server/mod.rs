#![allow(warnings)]
pub mod home_page;
pub mod quotes;

use crate::Config;
use crate::home_page::home_page;
use crate::quotes::*;
use anyhow::Result;
use axum::Router;
use axum::routing::get;
use axum::routing::post;
use tower_livereload::LiveReloadLayer;
use tower_sessions::{MemoryStore, SessionManagerLayer};
use tracing::info;

pub struct AdminServer {
  config: Config,
  live_reload: LiveReloadLayer,
}

impl AdminServer {
  pub fn new(
    config: Config,
    live_reload: LiveReloadLayer,
  ) -> AdminServer {
    AdminServer {
      config,
      live_reload,
    }
  }

  pub async fn start(self) -> Result<()> {
    info!("Initializing Admin:");
    let session_store = MemoryStore::default();
    let session_layer =
      SessionManagerLayer::new(session_store).with_secure(false);
    let app = Router::new()
      .route("/", get(home_page))
      .route("/quotes/", get(quotes_page))
      .route("/quotes/add", post(add_quote))
      .layer(session_layer);
    let listener =
      tokio::net::TcpListener::bind(format!("127.0.0.1:{}", 9001))
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
    Ok(())
  }
}
