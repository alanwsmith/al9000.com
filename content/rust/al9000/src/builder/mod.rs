#![allow(unused)]
pub mod utils;

use anyhow::Result;
use chrono::{DateTime, Local};
use minijinja::Environment;
use minijinja::context;
use std::path::PathBuf;
use tokio::sync::mpsc::Receiver;
use tower_livereload::Reloader;
use tracing::info;
use utils::*;

pub struct Builder {
  content_root: PathBuf,
  docs_root: PathBuf,
  reloader: Reloader,
  rx: Receiver<DateTime<Local>>,
}

impl Builder {
  pub fn new(
    content_root: PathBuf,
    docs_root: PathBuf,
    reloader: Reloader,
    rx: Receiver<DateTime<Local>>,
  ) -> Builder {
    Builder {
      content_root,
      docs_root,
      reloader,
      rx,
    }
  }

  pub async fn build_site(&self) -> Result<()> {
    info!("Building Site");
    let env = init_env(&self.content_root);
    self.transform_files(env);
    // let _ = &self.reloader.reload();
    Ok(())
  }

  pub async fn start(&mut self) -> Result<()> {
    info!("Staring Builder");
    self.build_site().await;
    while let Some(ts) = self.rx.recv().await {
      self.build_site().await;
    }
    Ok(())
  }

  pub fn transform_files(
    &self,
    env: Environment,
  ) -> Result<()> {
    // TODO: Don't copy files that have .inc in the name.
    // TODO: Don't transform files that have .off in the name.
    let extensions = ["html", "js", "txt"];
    let content_files = get_content_files(&self.content_root);
    content_files
      .iter()
      .filter(|pb| {
        if let Some(ext) = &pb.extension() {
          extensions.contains(&ext.display().to_string().as_str())
        } else {
          false
        }
      })
      .for_each(|pb| {
        let file_name =
          pb.display().to_string().replace("../../../content", "");
        let output_path = PathBuf::from(format!(
          "{}{}",
          &self.docs_root.display(),
          file_name
        ));
        match env.get_template(&file_name) {
          Ok(template) => match template.render(context!()) {
            Ok(content) => {
              let _ = write_file_with_mkdir(&output_path, &content);
              //dbg!(content);
            }
            Err(_) => (),
          },
          Err(_) => (),
        }
        dbg!(file_name);
      });
    Ok(())
  }
}
