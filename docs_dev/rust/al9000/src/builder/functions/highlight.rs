use minijinja::Value;

pub fn highlight(
  code: &str,
  language: &str,
) -> Value {
  Value::from_safe_string(
    "THIS IS THE HIGHLIGHT FIILTER".to_string(),
  )
}
