use minijinja::Value;

pub fn footnote(id: &str) -> Value {
  Value::from_safe_string(format!(
    r#"<sup class="footnote-link"><a id="fn-{}-body" href="{}fn-{}">{}</a></sup>"#,
    id, "#", id, id
  ))
}
