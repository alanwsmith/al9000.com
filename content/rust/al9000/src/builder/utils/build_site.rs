use anyhow::Result;
use chrono::{DateTime, Local};
use tokio::time::{Duration, sleep};
use tracing::info;

pub async fn build_site() -> Result<()> {
  info!("Building Site");
  sleep(Duration::from_millis(1000)).await;
  // info!("Build Complete:");
  Ok(())
}

// pub async fn build_site(&mut self) -> Result<()> {
//   if !self.signals.is_empty() {
//     self.signals = vec![];
//     info!("Building Site");
//     let env = init_env(&self.content_root);
//     self.transform_files(env);
//     self.copy_files();
//     if self.signals.is_empty() {
//       let _ = &self.reloader.reload();
//     }
//   }
//   Ok(())
// }
