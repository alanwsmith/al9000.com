use minijinja::Value;

pub fn footref(id: &str) -> Value {
  Value::from_safe_string(format!(
    r#"<span class="footnote-ref"><a id="fn-{}" href="{}fn-{}-body">{}</a></span>"#,
    id, "#", id, id
  ))
}
