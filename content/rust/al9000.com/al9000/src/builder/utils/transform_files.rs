#![allow(warnings)]
use crate::Config;
use crate::builder::content_files;
use crate::builder::get_env;
use crate::builder::utils::write_file_with_mkdir;
use crate::builder::*;
use anyhow::Result;
use minijinja::AutoEscape;
use minijinja::Environment;
use minijinja::Value;
use minijinja::context;
use minijinja::path_loader;
use minijinja::syntax::SyntaxConfig;
use std::path::Path;
use std::path::PathBuf;
use tokio::task;
use tracing::info;

pub async fn transform_files(config: &Config) -> Result<()> {
  // info!("Transforming files");
  let env = get_env(config);
  let json = load_json(config)?;

  for pb in content_files(config).iter() {
    let page_data = get_page_data(&pb)?;
    let template_name = pb
      .display()
      .to_string()
      .replace(&config.content_dir().display().to_string(), "");
    let output_path =
      PathBuf::from(pb.display().to_string().replace(
        config.content_dir().display().to_string().as_str(),
        config.output_dir().display().to_string().as_str(),
      ));
    match env.get_template(&template_name) {
      Ok(template) => match template.render(context!(
        p => page_data,
        j => json,
        file_path => Value::from_safe_string(template_name)
      )) {
        Ok(content) => {
          let _ = write_file_with_mkdir(&output_path, &content);
        }
        Err(e) => {
          let output = error_page(&e.to_string());
          let _ = write_file_with_mkdir(&output_path, &output);
        }
      },
      Err(e) => {
        let output = error_page(&e.to_string());
        let _ = write_file_with_mkdir(&output_path, &output);
      }
    }
    task::yield_now().await;
  }

  Ok(())
}
