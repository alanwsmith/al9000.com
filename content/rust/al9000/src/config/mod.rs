#![allow(warnings)]
use anyhow::{Result, anyhow};
use port_check::free_local_port_in_range;
use std::path::PathBuf;

#[derive(Clone)]
pub struct Config {
  _content_dir: PathBuf,
  _output_dir: PathBuf,
  _port: u16,
}

impl Config {
  pub fn new(
    _content_dir: PathBuf,
    _output_dir: PathBuf,
  ) -> Config {
    // Reminder: This used to have a range. Leaving
    // here for now since this works.
    let port = free_local_port_in_range(9000..=9000)
      .ok_or(anyhow!("Could not find port"));
    Config {
      _content_dir,
      _output_dir,
      _port: port.unwrap(),
    }
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
