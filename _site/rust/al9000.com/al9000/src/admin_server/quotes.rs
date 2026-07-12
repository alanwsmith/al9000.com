use crate::constants::CONTENT_DIR;
use axum::extract::Form;
use axum::response::Redirect;
use axum::response::{Html, IntoResponse};
use serde::Deserialize;
use serde::Serialize;
use serde_json;
use std::fs;
use std::path::PathBuf;
use tower_sessions::Session;
use uuid::Uuid;

#[derive(Debug, Deserialize, Serialize)]
pub struct Quote {
  author: String,
  author_url: Option<String>,
  title: Option<String>,
  source: Option<String>,
  source_url: Option<String>,
  text: String,
}

pub async fn quotes_page() -> impl IntoResponse {
  Html(
    r#"<!DOCTYPE html>
<html lang="en">
<head><style>body { background: black; color: white;}</style></head>
<body>Quotes</body>
</html>"#,
  )
}

pub async fn add_quote(
  session: Session,
  Form(request): Form<Quote>,
) -> impl IntoResponse {
  if let Ok(contents) = serde_json::to_string(&request) {
    let id = Uuid::new_v4();
    let file_name = format!("{}.json", id);
    let path = quote_dir().join(file_name);
    match fs::write(path, contents) {
      Ok(()) => {
        // TODO: Set flash message that the
        // quote was added.
        dbg!("quote added");
        session
          .insert("flash_message", "quote added".to_string())
          .await
          .unwrap();
        Redirect::to("/admin")
      }
      Err(e) => {
        // TODO: Set flash message with quote
        // error.
        dbg!(e);
        Redirect::to("/admin")
      }
    }
  } else {
    // TODO: Set error flash message.
    dbg!("Could not parse json");
    Redirect::to("/admin")
  }
}

pub fn quote_dir() -> PathBuf {
  PathBuf::from(CONTENT_DIR).join("quotes/data")
}
