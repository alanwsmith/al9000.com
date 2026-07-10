use crate::filters::*;
use crate::functions::*;
use anyhow::Result;
use minijinja::syntax::SyntaxConfig;
use minijinja::{Environment, path_loader};

pub fn get_env() -> Result<Environment<'static>> {
  let mut env = Environment::new();
  env.set_loader(path_loader("admin-templates"));
  env.set_syntax(
    SyntaxConfig::builder()
      .line_statement_prefix("==")
      .block_delimiters("[!", "!]")
      .variable_delimiters("[@", "@]")
      .comment_delimiters("[#", "#]")
      .build()
      .unwrap(),
  );
  env.add_function("date", date);
  env.add_filter("md", md);
  Ok(env)
}
