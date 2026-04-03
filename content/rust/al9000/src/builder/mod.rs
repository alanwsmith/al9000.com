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

pub struct Builder {
  content_root: PathBuf,
  docs_root: PathBuf,
  reloader: Reloader,
  rx: mpsc::Receiver<DateTime<Local>>,
}

impl Builder {
  pub fn new(
    content_root: PathBuf,
    docs_root: PathBuf,
    reloader: Reloader,
    rx: mpsc::Receiver<DateTime<Local>>,
  ) -> Builder {
    Builder {
      content_root,
      docs_root,
      reloader,
      rx,
    }
  }

  pub async fn init(&mut self) -> Result<()> {
    info!("Initializing Builder");
    let mut build_process_handle: Option<JoinHandle<()>> = None;
    let (build_tx, mut build_rx) = mpsc::channel::<()>(100);

    while let Some(i) = self.rx.recv().await {
      if let Some(ref handle) = build_process_handle
        && handle.is_finished()
      {
        build_process_handle = None;
      }
    }
    Ok(())
  }
}

//    //self.signals.push(chrono::prelude::Local::now());
//    build_site().await.unwrap();
//    // dbg!(self.last_build_complete);
//    while let Some(ts) = self.rx.recv().await {
//      //self.build_requested = true;
//      if !self.build_in_progress {
//        self.build_in_progress = true;
//        tokio::spawn(async { build_site().await });
//        //  build_site().await;
//        self.build_in_progress = false;
//      } else {
//        info!("... already in progress")
//      }
//      //let trigger_time = chrono::prelude::Local::now();
//      // self.signals.push(chrono::prelude::Local::now());
//      //let join_handle = tokio::spawn(async { build_site().await });
//      //dbg!(join_handle.await??);
//    }
