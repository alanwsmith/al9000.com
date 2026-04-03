#![allow(warnings)]
use anyhow::Result;
use minijinja::Environment;
use minijinja::context;
use std::path::Path;
use tracing::info;

pub fn transform_files(
  content_root: &Path,
  output_root: &Path,
) -> Result<()> {
  // TODO: Don't copy files that have .inc in the name.
  // TODO: Don't transform files that have .off in the name.

  ////
  //let extensions = ["html", "js", "txt"];
  //let content_files = get_content_files(&self.content_root);
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
