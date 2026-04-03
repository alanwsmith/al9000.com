use anyhow::anyhow;
use port_check::free_local_port_in_range;
use std::path::PathBuf;

#[derive(Clone)]
pub struct Config {
  _content_dir: PathBuf,
  _output_dir: PathBuf,
  _port: u16,
  _content_file_extensions: Vec<String>,
}

impl Config {
  pub fn new(
    _content_dir: PathBuf,
    _output_dir: PathBuf,
  ) -> Config {
    let _content_file_extensions =
      vec!["html".to_string(), "js".to_string(), "txt".to_string()];

    let port = free_local_port_in_range(9000..=9000)
      .ok_or(anyhow!("Could not find port"));
    Config {
      _content_dir,
      _content_file_extensions,
      _output_dir,
      _port: port.unwrap(),
    }
  }

  pub fn content_file_extensions(&self) -> &Vec<String> {
    &self._content_file_extensions
  }

  pub fn content_dir(&self) -> &PathBuf {
    &self._content_dir
  }

  pub fn output_dir(&self) -> &PathBuf {
    &self._output_dir
  }

  pub fn port(&self) -> u16 {
    self._port
  }
}
