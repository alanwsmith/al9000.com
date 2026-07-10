use anyhow::Result;
use serde::Deserialize;
use serde_json;
use std::fs;

#[derive(Debug, Deserialize, Clone)]
pub struct Config {
  #[serde(rename = "ports")]
  _ports: ConfigPorts,
  #[serde(rename = "contentFileExtensions")]
  _content_file_extensions: Vec<String>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct ConfigPorts {
  site: u16,
  admin: u16,
}

impl Config {
  pub fn new() -> Result<Config> {
    let content = fs::read_to_string("config.json")?;
    let config: Config = serde_json::from_str(&content)?;
    Ok(config)
  }

  pub fn content_file_extensions(&self) -> &Vec<String> {
    &self._content_file_extensions
  }

  pub fn site_port(&self) -> u16 {
    self._ports.site
  }

  pub fn admin_port(&self) -> u16 {
    self._ports.admin
  }
}
