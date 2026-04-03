#![allow(warnings)]
use crate::Config;
use crate::builder::content_files;
use crate::builder::get_env;
use crate::builder::utils::write_file_with_mkdir;
use crate::builder::*;
use anyhow::Result;
use minijinja::AutoEscape;
use minijinja::Environment;
use minijinja::context;
use minijinja::path_loader;
use minijinja::syntax::SyntaxConfig;
use std::path::Path;
use std::path::PathBuf;
use tracing::info;

pub fn transform_files(config: &Config) -> Result<()> {
  info!("Transforming files");

  let env = get_env(config);
  let json = load_json(config);

  content_files(config).iter().for_each(|pb| {
    let template_name =
      pb.display().to_string().replace("../../../content", "");
    let output_path =
      PathBuf::from(pb.display().to_string().replace(
        config.content_dir().display().to_string().as_str(),
        config.output_dir().display().to_string().as_str(),
      ));
    match env.get_template(&template_name) {
      Ok(template) => match template.render(context!(
        j => json
      )) {
        Ok(content) => {
          let _ = write_file_with_mkdir(&output_path, &content);
        }
        Err(e) => {
          let output = format!("{}", e);
          let _ = write_file_with_mkdir(&output_path, &output);
        }
      },
      Err(e) => {
        let output = format!("{}", e);
        let _ = write_file_with_mkdir(&output_path, &output);
      }
    }
  });

  Ok(())
}
