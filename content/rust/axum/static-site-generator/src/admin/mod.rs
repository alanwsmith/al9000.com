use crate::config::Config;
use crate::constants::FLASH_MESSAGE_KEY;
use crate::filters::*;
use crate::functions::*;
use crate::utils::*;
use anyhow::Result;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::response::Redirect;
use axum::{Router, response::Html, routing::get};
use chrono::DateTime;
use chrono::Utc;
use minijinja::syntax::SyntaxConfig;
use minijinja::{Environment, Value, context, path_loader};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::Arc;
use tokio::time::{Duration, sleep};
use tower_http::services::ServeDir;
use tower_livereload::LiveReloadLayer;
use tower_sessions::{MemoryStore, Session, SessionManagerLayer};
use tracing::info;

pub struct Admin {
  config: Config,
}

struct AppState {
  env: Environment<'static>,
}

#[derive(Debug, Deserialize, Serialize)]
struct FlashMessage {
  text: String,
  kind: FlashMessageKind,
  datetime: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Serialize)]
enum FlashMessageKind {
  WARN,
  ERROR,
  INFO,
}

impl Admin {
  pub fn new(config: Config) -> Admin {
    Admin { config }
  }

  pub async fn init(self) -> Result<()> {
    let live_reload = LiveReloadLayer::new();
    let reloader = live_reload.reloader();
    info!(
      "Initializing Admin Server at: 127.0.0.1:{}",
      self.config.admin_port()
    );
    let session_store = MemoryStore::default();
    let session_layer =
      SessionManagerLayer::new(session_store).with_secure(false);
    let service = ServeDir::new(PathBuf::from("admin-docroot"))
      .append_index_html_on_directories(true);
    let env = get_env::get_env("admin-templates")?;
    let app_state = Arc::new(AppState { env });
    let app = Router::new()
      .route("/", get(admin_home_page))
      .route("/add-test-flash-message", get(add_test_flash_message))
      .with_state(app_state)
      .fallback_service(service)
      .layer(live_reload)
      .layer(session_layer);
    let listener = tokio::net::TcpListener::bind(format!(
      "127.0.0.1:{}",
      self.config.admin_port()
    ))
    .await
    .unwrap();
    tokio::spawn(async move {
      sleep(Duration::from_secs(1)).await;
      reloader.reload();
    });
    axum::serve(listener, app).await.unwrap();
    Ok(())
  }
}

async fn add_test_flash_message(
  session: Session
) -> impl IntoResponse {
  session
    .insert(
      FLASH_MESSAGE_KEY,
      FlashMessage {
        text: "This is an info flash message".to_string(),
        kind: FlashMessageKind::INFO,
        datetime: Utc::now(),
      },
    )
    .await
    .unwrap();
  Redirect::to("/")
}

async fn admin_home_page(
  session: Session,
  State(state): State<Arc<AppState>>,
) -> Result<Html<String>, StatusCode> {
  let context = context!( flash => get_flash(session).await);
  render("index.html", context, State(state))
}

async fn get_flash(session: Session) -> Option<FlashMessage> {
  let message = session
    .get::<FlashMessage>(FLASH_MESSAGE_KEY)
    .await
    .ok()
    .unwrap();
  if message.is_some() {
    session
      .remove::<FlashMessage>(FLASH_MESSAGE_KEY)
      .await
      .unwrap();
  }
  message
}

fn render(
  template: &str,
  context: Value,
  State(state): State<Arc<AppState>>,
) -> Result<Html<String>, StatusCode> {
  let template = match state.env.get_template(template) {
    Ok(t) => t,
    Err(e) => {
      println!("ERROR: {}", e);
      return Err(StatusCode::INTERNAL_SERVER_ERROR);
    }
  };
  match template.render(context) {
    Ok(r) => Ok(Html(r)),
    Err(e) => {
      println!("ERROR: {}", e);
      Err(StatusCode::INTERNAL_SERVER_ERROR)
    }
  }
}
