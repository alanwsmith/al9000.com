use crate::app_state::AppState;
use crate::render::render;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::Html;
use minijinja::context;
use std::sync::Arc;

pub async fn handle_home(
  State(state): State<Arc<AppState>>
) -> Result<Html<String>, StatusCode> {
  let context = context!(id => "home page");
  render("index.html", context, State(state))
}
