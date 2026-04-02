#![allow(unused)]
pub mod watch_files;
pub use watch_files::*;

use chrono::{DateTime, Local};
use std::path::PathBuf;
use tokio::sync::mpsc::Sender;
use tracing::info;

pub struct Watcher {}

impl Watcher {
  pub fn new(
    input_root: PathBuf,
    output_root: PathBuf,
    tx: Sender<DateTime<Local>>,
  ) -> Watcher {
    Watcher {}
  }

  pub async fn start(self) {
    info!("Starting Watcher");
  }
}
