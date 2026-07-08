use crate::date::date;
use anyhow::Result;
use minijinja::syntax::SyntaxConfig;
use minijinja::{Environment, path_loader};

pub fn get_env() -> Result<Environment<'static>> {
  let mut env = Environment::new();
  env.set_syntax(
    SyntaxConfig::builder()
      .block_delimiters("[!", "!]")
      .variable_delimiters("[@", "@]")
      .comment_delimiters("[#", "#]")
      .build()
      .unwrap(),
  );
  env.set_loader(path_loader("templates"));
  env.add_function("date", date);
  Ok(env)
}
