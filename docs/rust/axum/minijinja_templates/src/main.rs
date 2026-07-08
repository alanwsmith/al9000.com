use anyhow::Result;
use axum::{Router, routing::get};
use chrono::offset::Utc;
use minijinja::Value;
use minijinja_templates::app_state::AppState;
use minijinja_templates::get_env::get_env;
use minijinja_templates::handle_home::handle_home;
use std::sync::Arc;

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

pub fn date() -> Value {
  let d = Utc::now();
  Value::from_safe_string(format!("{}", d))
}
