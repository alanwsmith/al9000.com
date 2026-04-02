#![allow(unused)]
pub struct Builder {}
use chrono::{DateTime, Local};
use std::path::PathBuf;
use tokio::sync::mpsc::Receiver;
use tower_livereload::Reloader;

impl Builder {
  pub fn new(
    input_root: PathBuf,
    output_root: PathBuf,
    reloder: Reloader,
    rx: Receiver<DateTime<Local>>,
  ) -> Builder {
    Builder {}
  }
}
