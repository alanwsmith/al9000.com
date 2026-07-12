use markdown::{CompileOptions, Options};
use minijinja::Value;

pub fn md(value: String) -> Value {
  match markdown::to_html_with_options(
    &value,
    &Options {
      compile: CompileOptions {
        allow_dangerous_html: true,
        ..CompileOptions::default()
      },
      ..Options::default()
    },
  ) {
    Ok(parsed) => Value::from_safe_string(parsed.to_string()),
    Err(_e) => Value::from_safe_string(
      "[unable to parse markdown]".to_string(),
    ),
  }
}
