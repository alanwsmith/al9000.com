use axum::response::{Html, IntoResponse};
use tower_sessions::Session;

pub async fn home_page(session: Session) -> impl IntoResponse {
  let flash_message: String = session
    .get("flash_message")
    .await
    .unwrap()
    .unwrap_or("".to_string());
  session.remove::<String>("flash_message").await.unwrap();
  Html(format!(
    r#"<!DOCTYPE html>
<html lang="en">
<head><style>body {{ background: black; color: white; }}</style></head>
<body>
<h2>Add Quote</h2>
<div>{}</div>
<form action="/admin/quotes/add" method="post">
  <div>
    <label for="quote_text">Quote:</label>
    <input type="text" id="quote_text" name="text" autocomplete="off" />
  </div>
  <div>
    <label for="quote_author">Author</label>
    <input type="text" id="quote_author" name="author" autocomplete="off" />
  </div>
  <div>
    <label for="quote_title">Title</label>
    <input type="text" id="quote_title" name="title" autocomplete="off" />
  </div>
  <div>
    <label for="quote_author_url">Author URL</label>
    <input type="text" id="quote_author_url" name="author_url" autocomplete="off" />
  </div>
  <div>
    <label for="quote_source">Source</label>
    <input type="text" id="quote_source" name="source" autocomplete="off" />
  </div>
  <div>
    <label for="quote_source_url">Source URL</label>
    <input type="text" id="quote_source_url" name="source_url" autocomplete="off" />
  </div>
  <div>
    <input type="submit" value="Add Quote" />
  </div>
</form>
</body>
</html>"#,
    flash_message
  ))
}
