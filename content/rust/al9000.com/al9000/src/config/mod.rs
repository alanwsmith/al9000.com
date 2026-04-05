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
  pub fn new() -> Config {
    let _content_file_extensions =
      vec!["html".to_string(), "js".to_string(), "txt".to_string()];

    let port = free_local_port_in_range(9000..=9000)
      .ok_or(anyhow!("Could not find port"));
    Config {
      _content_dir: PathBuf::from("../../../../content"),
      _content_file_extensions,
      _output_dir: PathBuf::from("../../../../docs_dev"),
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

  // this is the number of sub directories to move
  // down to get to the content itself. Given
  // `../../../../content` the value is 5.
  pub fn sub_dir_skip(&self) -> usize {
    5
  }
}

impl Default for Config {
  fn default() -> Self {
    Self::new()
  }
}
