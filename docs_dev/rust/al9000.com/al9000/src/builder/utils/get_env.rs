#![allow(warnings)]
use crate::Config;
use crate::builder::content_files;
use crate::filters::*;
use crate::functions::*;
use anyhow::Result;
use minijinja::AutoEscape;
use minijinja::Environment;
use minijinja::context;
use minijinja::path_loader;
use minijinja::syntax::SyntaxConfig;
use std::path::Path;
use tracing::info;

pub fn get_env(config: &Config) -> Environment {
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
  env.set_loader(path_loader(config.content_dir()));
  env.add_function("parent", parent);
  env.add_function("folders_in_folder", folders_in_folder);
  env.add_filter("highlight", highlight);
  env.add_filter("highlight_block", highlight_block);
  env.add_filter("code", code);
  env.add_filter("md", md);
  env
}
