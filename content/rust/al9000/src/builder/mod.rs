#![allow(unused)]
pub mod utils;

use anyhow::Result;
use chrono::{DateTime, Local};
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

  pub async fn build_site(&mut self) -> Result<()> {
    info!("Building Site");
    let content_files = get_content_files(&self.content_root);
    dbg!(content_files);
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
}
