use crate::config::Config;
use crate::functions::date;
use anyhow::Result;
use axum::extract::State;
use axum::http::StatusCode;
use axum::{Router, response::Html, routing::get};
use minijinja::syntax::SyntaxConfig;
use minijinja::{Environment, Value, context, path_loader};
use std::path::PathBuf;
use std::sync::Arc;
use tokio::time::{Duration, sleep};
use tower_http::services::ServeDir;
use tower_livereload::LiveReloadLayer;
use tower_sessions::Session;
use tower_sessions::{MemoryStore, SessionManagerLayer};
use tracing::info;

pub struct Admin {
  config: Config,
}

struct AppState {
  env: Environment<'static>,
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
    let env = get_env()?;
    let app_state = Arc::new(AppState { env });
    let app = Router::new()
      .route("/", get(admin_home_page))
      .with_state(app_state)
      .layer(live_reload)
      .layer(session_layer);
    let listener = tokio::net::TcpListener::bind(format!(
      "127.0.0.1:{}",
      self.config.admin_port()
    ))
    .await
    .unwrap();
    tokio::spawn(async move {
      sleep(Duration::from_secs(2)).await;
      reloader.reload();
    });

    axum::serve(listener, app).await.unwrap();
    Ok(())
  }
}

fn get_env() -> Result<Environment<'static>> {
  let mut env = Environment::new();
  env.set_loader(path_loader("admin"));
  env.set_syntax(
    SyntaxConfig::builder()
      .line_statement_prefix("==")
      .block_delimiters("[!", "!]")
      .variable_delimiters("[@", "@]")
      .comment_delimiters("[#", "#]")
      .build()
      .unwrap(),
  );
  env.add_function("date", date);
  Ok(env)
}

async fn admin_home_page(
  session: Session,
  State(state): State<Arc<AppState>>,
) -> Result<Html<String>, StatusCode> {
  let context = context!();
  render("index.html", context, State(state))
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
