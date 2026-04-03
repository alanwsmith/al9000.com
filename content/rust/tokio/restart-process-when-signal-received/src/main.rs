use anyhow::Result;
use tokio::sync::mpsc;
use tokio::task::JoinHandle;
use tokio::time::{Duration, sleep};

#[tokio::main]
async fn main() -> Result<()> {
  let (tx, rx) = mpsc::channel::<usize>(100);
  start_sender(tx)?;
  start_listener(rx).await?;
  Ok(())
}

pub async fn secondary_process(count: usize) {
  println!("{}: START", count);
  tokio::time::sleep(tokio::time::Duration::from_millis(540)).await;
  println!("{}: DONE", count);
}

pub async fn start_listener(
  mut rx: mpsc::Receiver<usize>
) -> Result<()> {
  let mut second_process_handle: Option<JoinHandle<()>> = None;
  while let Some(count) = rx.recv().await {
    if let Some(ref handle) = second_process_handle
      && handle.is_finished()
    {
      second_process_handle = None;
    }
    if second_process_handle.is_none() {
      second_process_handle = Some(tokio::spawn(async move {
        secondary_process(count).await;
      }));
    } else {
      second_process_handle.unwrap().abort();
      second_process_handle = Some(tokio::spawn(async move {
        secondary_process(count).await;
      }));
    }
  }
  Ok(())
}

pub fn start_sender(tx: mpsc::Sender<usize>) -> Result<()> {
  tokio::spawn(async move {
    for count in 0..11 {
      if tx.send(count).await.is_err() {
        println!("receiver dropped");
        return;
      }
      if count % 3 == 0 {
        sleep(Duration::from_millis(200)).await;
      } else {
        sleep(Duration::from_millis(700)).await;
      }
    }
  });
  Ok(())
}
