use minijinja::syntax::SyntaxConfig;

fn get_env() -> Result<Environment<'static>> {
  let mut env = Environment::new();
  env.set_loader(path_loader("templates"));
  env.set_syntax(
    SyntaxConfig::builder()
      .line_statement_prefix("==")
      .block_delimiters("[!", "!]")
      .variable_delimiters("[@", "@]")
      .comment_delimiters("[#", "#]")
      .build()
      .unwrap(),
  );
  env.set_lstrip_blocks(true);
  env.set_trim_blocks(true);
  Ok(env)
}
