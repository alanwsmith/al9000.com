#![allow(unused)]
pub mod utils;

use anyhow::Result;
use chrono::{DateTime, Local};
use minijinja::Environment;
use minijinja::context;
use std::path::PathBuf;
use tokio::sync::mpsc;
use tokio::task::JoinHandle;
use tower_livereload::Reloader;
use tracing::info;
use utils::*;

use crate::Config;

pub struct Builder {
  config: Config,
  reloader: Reloader,
  rx: mpsc::Receiver<DateTime<Local>>,
}

impl Builder {
  pub fn new(
    config: Config,
    reloader: Reloader,
    rx: mpsc::Receiver<DateTime<Local>>,
  ) -> Builder {
    Builder {
      config,
      reloader,
      rx,
    }
  }

  pub async fn init(&mut self) -> Result<()> {
    info!("Initializing Builder");
    build_site().await;
    let mut build_process_handle: Option<JoinHandle<()>> = None;
    while let Some(count) = self.rx.recv().await {
      if let Some(ref handle) = build_process_handle
        && handle.is_finished()
      {
        build_process_handle = None;
      }
      if build_process_handle.is_none() {
        build_process_handle = Some(tokio::spawn(async move {
          build_site().await;
        }));
      } else {
        build_process_handle.unwrap().abort();
        build_process_handle = Some(tokio::spawn(async move {
          build_site().await;
        }));
      }
    }
    Ok(())
  }
}
