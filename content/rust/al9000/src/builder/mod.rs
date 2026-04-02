#![allow(unused)]
use chrono::{DateTime, Local};
use std::path::PathBuf;
use tokio::sync::mpsc::Receiver;
use tower_livereload::Reloader;
use tracing::info;

pub struct Builder {}

impl Builder {
  pub fn new(
    input_root: PathBuf,
    output_root: PathBuf,
    reloder: Reloader,
    rx: Receiver<DateTime<Local>>,
  ) -> Builder {
    Builder {}
  }

  pub async fn start(self) {
    info!("Staring Builder");
  }
}
