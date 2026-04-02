pub mod utils;
pub use utils::*;

use std::path::PathBuf;
use tower_livereload::Reloader;
use tracing::info;

pub struct Server {}

impl Server {
  pub fn new(
    docs_root: PathBuf,
    port: u16,
    reloader: Reloader,
  ) -> Server {
    Server {}
  }

  pub async fn start(self) {
    info!("Starting Server");
  }
}
