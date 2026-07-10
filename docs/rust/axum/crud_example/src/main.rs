use anyhow::Result;
use axum::extract::Form;
use axum::extract::Path;
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
  id: Option<String>,
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
    .route("/edit/{id}", get(handle_edit))
    .route("/update", post(handle_update))
    .route("/delete/{id}", get(handle_delete_request))
    .route("/confirm-delete", post(handle_confirm_delete))
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
  Form(mut request): Form<Item>,
) -> impl IntoResponse {
  let id = Uuid::now_v7();
  request.id = Some(id.to_string());
  if let Ok(contents) = serde_json::to_string(&request) {
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

async fn handle_confirm_delete(
  session: Session,
  State(state): State<Arc<AppState>>,
  Form(request): Form<Item>,
) -> impl IntoResponse {
  let path =
    data_dir().join(format!("{}.json", request.id.unwrap()));
  fs::remove_file(path).unwrap();
  Redirect::to("/")
}

async fn handle_delete_request(
  session: Session,
  Path(id): Path<String>,
  State(state): State<Arc<AppState>>,
) -> Result<Html<String>, StatusCode> {
  let path = data_dir().join(format!("{}.json", id));
  let item = serde_json::from_str::<Item>(
    &fs::read_to_string(path).unwrap(),
  )
  .unwrap();
  let context = context!(item => item);
  render("delete_request.html", context, State(state))
}

async fn handle_edit(
  session: Session,
  Path(id): Path<String>,
  State(state): State<Arc<AppState>>,
) -> Result<Html<String>, StatusCode> {
  let path = data_dir().join(format!("{}.json", id));
  let item = serde_json::from_str::<Item>(
    &fs::read_to_string(path).unwrap(),
  )
  .unwrap();
  let context = context!(item => item);
  render("edit.html", context, State(state))
}

async fn handle_index(
  session: Session,
  State(state): State<Arc<AppState>>,
) -> Result<Html<String>, StatusCode> {
  // TODO: Add flash messages.
  match get_files_in_dir(&data_dir()) {
    Ok(paths) => {
      let items: Vec<Item> = paths
        .iter()
        .map(|path| {
          serde_json::from_str::<Item>(
            &fs::read_to_string(path).unwrap(),
          )
          .unwrap()
        })
        .collect();
      let context = context!(items => items);
      render("index.html", context, State(state))
    }
    Err(_) => {
      let context = context!();
      render("index.html", context, State(state))
    }
  }
}

async fn handle_update(
  session: Session,
  State(state): State<Arc<AppState>>,
  Form(request): Form<Item>,
) -> impl IntoResponse {
  let path = data_dir()
    .join(format!("{}.json", &request.id.clone().unwrap()));
  let content = serde_json::to_string(&request).unwrap();
  fs::write(path, content).unwrap();
  Redirect::to("/")
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

pub fn get_files_in_dir(dir: &PathBuf) -> Result<Vec<PathBuf>> {
  let files = fs::read_dir(dir)?
    .filter(|p| p.as_ref().unwrap().path().is_file())
    .map(|p| p.as_ref().unwrap().path())
    .filter(|p| {
      !p.file_name().unwrap().to_str().unwrap().starts_with(".")
    })
    .collect();
  Ok(files)
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
