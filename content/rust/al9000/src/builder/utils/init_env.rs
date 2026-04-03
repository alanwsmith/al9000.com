use minijinja::AutoEscape;
use minijinja::Environment;
use minijinja::path_loader;
use minijinja::syntax::SyntaxConfig;
use std::path::Path;

pub fn init_env(content_root: &Path) -> Environment<'static> {
  let mut env = Environment::new();
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
  env.set_auto_escape_callback(|name| {
    if matches!(
      name.rsplit('.').next().unwrap_or(""),
      "html" | "htm"
    ) {
      AutoEscape::Html
    } else {
      AutoEscape::None
    }
  });
  env.set_loader(path_loader(content_root.display().to_string()));
  env
}
