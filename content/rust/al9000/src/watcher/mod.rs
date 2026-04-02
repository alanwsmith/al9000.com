#![allow(unused)]
use chrono::{DateTime, Local};
use notify_debouncer_full::DebounceEventResult;
use notify_debouncer_full::new_debouncer;
use std::path::PathBuf;
use tokio::sync::mpsc::Sender;
use tokio::sync::mpsc::channel;
use tokio::time::Duration;
use tracing::info;

pub struct Watcher {}

impl Watcher {
  pub fn new(
    input_root: PathBuf,
    tx: Sender<DateTime<Local>>,
  ) -> Watcher {
    Watcher {}
  }

  pub async fn start(self) {
    info!("Starting Watcher");
    let (watcher_internal_tx, mut watcher_internal_rx) =
      channel::<chrono::DateTime<chrono::Local>>(1);
    let mut debouncer = new_debouncer(
      Duration::from_millis(200),
      None,
      move |result: DebounceEventResult| match result {
        Ok(events) => {}
        Err(e) => println!("{:?}", e),
      },
    );
  }
}
