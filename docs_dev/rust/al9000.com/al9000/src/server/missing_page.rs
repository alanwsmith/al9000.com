use axum::response::Html;

pub async fn missing_page() -> Html<&'static str> {
  Html(
    r#"<!DOCTYPE html>
<html lang="en">
<head><style>body { background: black; color: white;}</style></head>
<body>Page Not Found</sody>
</html>"#,
  )
}
