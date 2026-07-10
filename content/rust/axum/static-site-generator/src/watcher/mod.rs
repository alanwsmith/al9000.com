use crate::constants::CONTENT_DIR;
use anyhow::Result;
use chrono::{DateTime, Local};
use itertools::Itertools;
use notify::EventKind;
use notify::RecursiveMode;
use notify_debouncer_full::DebounceEventResult;
use notify_debouncer_full::new_debouncer;
use std::path::PathBuf;
use tokio::sync::mpsc::Sender;
use tokio::sync::mpsc::channel;
use tokio::time::Duration;
use tracing::info;

pub struct Watcher {
  builder_tx: Sender<DateTime<Local>>,
}

impl Watcher {
  pub fn new(builder_tx: Sender<DateTime<Local>>) -> Watcher {
    Watcher { builder_tx }
  }

  pub async fn init(self) -> Result<()> {
    info!("Initializing Watcher:");
    let (watcher_tx, mut watcher_rx) =
      channel::<chrono::DateTime<chrono::Local>>(1);
    let mut debouncer = new_debouncer(
      Duration::from_millis(250),
      None,
      move |result: DebounceEventResult| match result {
        Ok(events) => {
          let paths: Vec<_> = events
            .iter()
            .filter_map(|e| match e.event.kind {
              EventKind::Create(..) => Some(e.paths.clone()),
              EventKind::Modify(..) => Some(e.paths.clone()),
              EventKind::Remove(..) => Some(e.paths.clone()),
              _ => None,
            })
            .flatten()
            .unique()
            .collect();
          if !paths.is_empty() {
            let local_tx = watcher_tx.clone();
            tokio::spawn(async move {
              let _ =
                local_tx.send(chrono::prelude::Local::now()).await;
            });
          }
        }
        Err(e) => println!("{:?}", e),
      },
    )
    .unwrap();
    debouncer
      .watch(PathBuf::from(CONTENT_DIR), RecursiveMode::Recursive)
      .unwrap();
    while watcher_rx.recv().await.is_some() {
      let tx = self.builder_tx.clone();
      let _ = tx.send(chrono::prelude::Local::now()).await;
    }
    Ok(())
  }
}
