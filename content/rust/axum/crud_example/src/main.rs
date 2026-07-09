use anyhow::Result;
use minijinja::Environment;

struct AppState {
  env: Environment<'static>,
}

#[tokio::main]
async fn main() -> Result<()> {
  Ok(())
}

fn get_env() -> Result<Environment<'static>> {
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
