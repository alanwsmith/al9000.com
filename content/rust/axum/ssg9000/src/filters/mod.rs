use markdown::{CompileOptions, Options};
use minijinja::ErrorKind;
use minijinja::{Error, Value};

pub fn md(value: String) -> Result<Value, Error> {
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
    Ok(parsed) => Ok(Value::from_safe_string(parsed.to_string())),
    Err(e) => Err(Error::new(
      ErrorKind::UndefinedError,
      format!("could not get url_path: {}", e),
    )),
  }
}
