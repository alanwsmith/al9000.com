use anyhow::Result;
use axum::extract::Form;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::response::Redirect;
use axum::{Router, response::Html, routing::get, routing::post};
use minijinja::syntax::SyntaxConfig;
use minijinja::{Environment, Value, context, path_loader};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::sync::Arc;
use tower_sessions::Session;
use tower_sessions::{MemoryStore, SessionManagerLayer};
use uuid::Uuid;

struct AppState {
  env: Environment<'static>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Item {
  text: String,
}

#[tokio::main]
async fn main() -> Result<()> {
  let session_store = MemoryStore::default();
  let session_layer =
    SessionManagerLayer::new(session_store).with_secure(false);
  let env = get_env()?;
  let app_state = Arc::new(AppState { env });
  let app = Router::new()
    .route("/", get(handle_index))
    .route("/add", post(handle_add))
    .with_state(app_state)
    .layer(session_layer);
  let listener = tokio::net::TcpListener::bind("127.0.0.1:3939")
    .await
    .unwrap();
  println!("listening on {}", listener.local_addr().unwrap());
  axum::serve(listener, app).await?;
  Ok(())
}

fn data_dir() -> PathBuf {
  PathBuf::from("data-storage")
}

async fn handle_add(
  session: Session,
  State(state): State<Arc<AppState>>,
  Form(request): Form<Item>,
) -> impl IntoResponse {
  if let Ok(contents) = serde_json::to_string(&request) {
    let id = Uuid::now_v7();
    let file_name = format!("{}.json", id);
    let path = data_dir().join(file_name);
    match fs::write(path, contents) {
      Ok(()) => {
        // TODO: Set flash message that the
        // quote was added.
        dbg!("quote added");
        session
          .insert("flash_message", "quote added".to_string())
          .await
          .unwrap();
      }
      Err(e) => {
        // TODO: Set flash message with quote
        // error.
        dbg!(e);
      }
    }
  };
  Redirect::to("/")
}

async fn handle_index(
  session: Session,
  State(state): State<Arc<AppState>>,
) -> Result<Html<String>, StatusCode> {
  let context = context!();
  // TODO: Add flash messages.
  render("index.html", context, State(state))
}

fn get_env() -> Result<Environment<'static>> {
  let mut env = Environment::new();
  env.set_syntax(
    SyntaxConfig::builder()
      .line_statement_prefix("==")
      .block_delimiters("[!", "!]")
      .variable_delimiters("[@", "@]")
      .comment_delimiters("[#", "#]")
      .build()
      .unwrap(),
  );
  env.set_loader(path_loader("templates"));
  Ok(env)
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
