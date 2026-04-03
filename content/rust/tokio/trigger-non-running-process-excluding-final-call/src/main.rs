use anyhow::Result;
use tokio::sync::mpsc;
use tokio::task::JoinHandle;
use tokio::time::{Duration, sleep};

#[tokio::main]
async fn main() -> Result<()> {
  let mut second_process_handle: Option<JoinHandle<()>> = None;

  let (tx, mut rx) = mpsc::channel(100);

  tokio::spawn(async move {
    for i in 0..11 {
      if tx.send(i).await.is_err() {
        println!("receiver dropped");
        return;
      }
      sleep(Duration::from_millis(200)).await;
    }
  });

  while let Some(i) = rx.recv().await {
    if let Some(ref handle) = second_process_handle
      && handle.is_finished()
    {
      second_process_handle = None;
    }

    if second_process_handle.is_none() {
      second_process_handle = Some(tokio::spawn(async move {
        println!("Second process started: {}", i);
        tokio::time::sleep(tokio::time::Duration::from_millis(540))
          .await;
      }));
    } else {
      println!("... already running: {}", i);
    }
  }

  //
  Ok(())
}
