use crate::config::Config;
use crate::constants::{CONTENT_DIR, OUTPUT_DIR};
use crate::utils::*;
use anyhow::Result;
use minijinja::AutoEscape;
use minijinja::Environment;
use minijinja::Value;
use minijinja::context;
use minijinja::path_loader;
use minijinja::syntax::SyntaxConfig;
// use std::path::Path;
use std::path::PathBuf;
use tokio::task;
use tracing::info;

pub async fn transform_files(config: &Config) -> Result<()> {
  info!("Transforming files");
  let env = get_env(CONTENT_DIR)?;
  let data = load_json_and_metadata(config)?;
  for pb in content_files(config.clone()).iter() {
    let page_data = get_page_data(&pb)?;
    let file_path_data = get_file_path_details(&pb)?;
    let template_name =
      pb.display().to_string().replace(CONTENT_DIR, "");
    let output_path = PathBuf::from(
      pb.display().to_string().replace(CONTENT_DIR, OUTPUT_DIR),
    );
    match env.get_template(&template_name) {
      Ok(template) => match template.render(context!(
        p => page_data,
        d => data,
        f => file_path_data,
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
