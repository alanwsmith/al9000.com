use anyhow::Result;
use axum::extract::State;
use axum::http::StatusCode;
use axum::{Router, response::Html, routing::get};
use chrono::offset::Utc;
use minijinja::syntax::SyntaxConfig;
use minijinja::{Environment, Value, context, path_loader};
use std::sync::Arc;

struct AppState {
  env: Environment<'static>,
}

#[tokio::main]
async fn main() -> Result<()> {
  let env = get_env()?;
  let app_state = Arc::new(AppState { env });
  let app = Router::new()
    .route("/", get(handle_home))
    .with_state(app_state);
  let listener = tokio::net::TcpListener::bind("127.0.0.1:3737")
    .await
    .unwrap();
  println!("listening on {}", listener.local_addr().unwrap());
  axum::serve(listener, app).await?;
  Ok(())
}

fn date() -> Value {
  let d = Utc::now();
  Value::from_safe_string(format!("{}", d))
}

fn get_env() -> Result<Environment<'static>> {
  let mut env = Environment::new();
  env.set_syntax(
    SyntaxConfig::builder()
      .block_delimiters("[!", "!]")
      .variable_delimiters("[@", "@]")
      .comment_delimiters("[#", "#]")
      .build()
      .unwrap(),
  );
  env.set_loader(path_loader("templates"));
  env.add_function("date", date);
  Ok(env)
}

async fn handle_home(
  State(state): State<Arc<AppState>>
) -> Result<Html<String>, StatusCode> {
  let context = context!(id => "home page");
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
