#![allow(unused)]
pub mod files;
pub mod utils;

use crate::Config;
use anyhow::Result;
use chrono::{DateTime, Local};
use files::*;
use tokio::sync::mpsc;
use tokio::task::JoinHandle;
use tower_livereload::Reloader;
use tracing::info;
use utils::*;

pub struct Builder {
  config: Config,
  reloader: Reloader,
  rx: mpsc::Receiver<DateTime<Local>>,
}

impl Builder {
  pub fn new(
    config: Config,
    rx: mpsc::Receiver<DateTime<Local>>,
    reloader: Reloader,
  ) -> Builder {
    Builder {
      config,
      reloader,
      rx,
    }
  }

  pub async fn init(&mut self) -> Result<()> {
    info!("Initializing Builder");
    let _ = build_site(self.config.clone(), self.reloader.clone());
    let mut build_process_handle: Option<JoinHandle<()>> = None;
    while let Some(count) = self.rx.recv().await {
      let build_config = self.config.clone();
      let build_reloader = self.reloader.clone();
      if let Some(ref handle) = build_process_handle
        && handle.is_finished()
      {
        build_process_handle = None;
      }
      if build_process_handle.is_none() {
        build_process_handle = Some(tokio::spawn(async move {
          let _ = build_site(build_config, build_reloader);
        }));
      } else {
        // TODO: Figure out why this isn't killing the
        //  build that's in progress (it still completes
        //  and does the reload of the browser)
        build_process_handle.unwrap().abort();
        build_process_handle = Some(tokio::spawn(async move {
          let _ = build_site(build_config, build_reloader);
        }));
      }
    }
    Ok(())
  }
}
