#![allow(warnings)]
use crate::Config;
use crate::builder::content_files;
use crate::builder::get_env;
use anyhow::Result;
use minijinja::AutoEscape;
use minijinja::Environment;
use minijinja::context;
use minijinja::path_loader;
use minijinja::syntax::SyntaxConfig;
use std::path::Path;
use tracing::info;

pub fn transform_files(config: &Config) -> Result<()> {
  info!("Transforming files");
  let env = get_env(config);
  dbg!(content_files(config));

  // TODO: Don't copy files that have .inc in the name.
  // TODO: Don't transform files that have .off in the name.

  // let extensions = ["html", "js", "txt"];
  // let content_files = get_content_files(config.content_dir());

  //content_files
  //  .iter()
  //  .filter(|pb| {
  //    if let Some(ext) = &pb.extension() {
  //      extensions.contains(&ext.display().to_string().as_str())
  //    } else {
  //      false
  //    }
  //  })
  //  .for_each(|pb| {
  //    let file_name =
  //      pb.display().to_string().replace("../../../content", "");
  //    let output_path = PathBuf::from(format!(
  //      "{}{}",
  //      &self.docs_root.display(),
  //      file_name
  //    ));
  //    match env.get_template(&file_name) {
  //      Ok(template) => match template.render(context!()) {
  //        Ok(content) => {
  //          let _ = write_file_with_mkdir(&output_path, &content);
  //        }
  //        Err(e) => {
  //          let output = format!("{}", e);
  //          let _ = write_file_with_mkdir(&output_path, &output);
  //        }
  //      },
  //      Err(e) => {
  //        let output = format!("{}", e);
  //        let _ = write_file_with_mkdir(&output_path, &output);
  //      }
  //    }
  //    //dbg!(file_name);
  //  });

  //
  Ok(())
}
