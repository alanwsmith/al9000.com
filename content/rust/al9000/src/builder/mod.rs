#![allow(unused)]
use anyhow::Result;
use chrono::{DateTime, Local};
use std::path::PathBuf;
use tokio::sync::mpsc::Receiver;
use tower_livereload::Reloader;
use tracing::info;

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
