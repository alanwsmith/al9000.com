pub fn error_page(error: &String) -> String {
  format!(
    r#"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {{
      background-color: black;
      color: goldenrod;
    }} 
  </style>
</head>
<body>
{}
</body>
</html>
  "#,
    error
  )
}
