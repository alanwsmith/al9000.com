use al9000::*;
use anyhow::Result;
use tracing::info;
use tracing::metadata::LevelFilter;

#[tokio::main]
async fn main() -> Result<()> {
  let _log_guards =
    Logger::setup().with_stdout(LevelFilter::INFO).init();
  info!("Initializing al9000");
  let port = find_port::find_port()?;
  info!("Found port for web server: {}", port);
  Ok(())
}
