use crate::config::Config;
use crate::constants::OUTPUT_DIR;
use anyhow::Result;
use axum::extract::State;
use axum::http::StatusCode;
use axum::{Router, response::Html, routing::get};
use minijinja::syntax::SyntaxConfig;
use minijinja::{Environment, Value, context, path_loader};
use std::path::PathBuf;
use std::sync::Arc;
use tower_http::services::ServeDir;
use tower_livereload::LiveReloadLayer;
use tower_sessions::Session;
use tower_sessions::{MemoryStore, SessionManagerLayer};
use tracing::info;

pub struct Admin {
  config: Config,
  live_reload: LiveReloadLayer,
}

struct AppState {
  env: Environment<'static>,
}

impl Admin {
  pub fn new(
    config: Config,
    live_reload: LiveReloadLayer,
  ) -> Admin {
    Admin {
      config,
      live_reload,
    }
  }

  pub async fn init(self) -> Result<()> {
    info!(
      "Initializing Admin Server at: 127.0.0.1:{}",
      self.config.admin_port()
    );
    let session_store = MemoryStore::default();
    let session_layer =
      SessionManagerLayer::new(session_store).with_secure(false);
    let env = get_env()?;
    let app_state = Arc::new(AppState { env });
    let app = Router::new()
      .route("/", get(admin_home_page))
      .with_state(app_state)
      .layer(session_layer);
    let listener = tokio::net::TcpListener::bind(format!(
      "127.0.0.1:{}",
      self.config.admin_port()
    ))
    .await
    .unwrap();
    axum::serve(listener, app).await.unwrap();
    Ok(())
  }
}

fn get_env() -> Result<Environment<'static>> {
  let mut env = Environment::new();
  env.set_loader(path_loader("templates"));
  env.set_syntax(
    SyntaxConfig::builder()
      .line_statement_prefix("==")
      .block_delimiters("[!", "!]")
      .variable_delimiters("[@", "@]")
      .comment_delimiters("[#", "#]")
      .build()
      .unwrap(),
  );
  Ok(env)
}

async fn admin_home_page(
  session: Session,
  State(state): State<Arc<AppState>>,
) -> Result<Html<String>, StatusCode> {
  let context = context!();
  render("admin-home-page.html", context, State(state))
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
