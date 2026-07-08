use anyhow::Result;
use axum::extract::State;
use axum::http::StatusCode;
use axum::{Router, response::Html, routing::get};
use minijinja::syntax::SyntaxConfig;
use minijinja::{Environment, context, path_loader};
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
  env.set_lstrip_blocks(true);
  env.set_trim_blocks(true);
  Ok(env)
}

async fn handle_home(
  State(state): State<Arc<AppState>>
) -> Result<Html<String>, StatusCode> {
  let template = match state.env.get_template("index.html") {
    Ok(t) => t,
    Err(e) => {
      println!("ERROR: {}", e);
      return Err(StatusCode::INTERNAL_SERVER_ERROR);
    }
  };
  let rendered = match template.render(context!()) {
    Ok(r) => r,
    Err(e) => {
      println!("ERROR: {}", e);
      return Err(StatusCode::INTERNAL_SERVER_ERROR);
    }
  };
  Ok(Html(rendered))
}
