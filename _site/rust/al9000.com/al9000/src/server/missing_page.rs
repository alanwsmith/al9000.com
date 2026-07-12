use axum::response::{Html, IntoResponse};

pub async fn missing_page() -> impl IntoResponse {
  Html(
    r#"<!DOCTYPE html>
<html lang="en">
<head><style>body { background: black; color: white;}</style></head>
<body>Page Not Found</body>
</html>"#,
  )
}
