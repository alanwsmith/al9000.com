use anyhow::{Result, anyhow};
use port_check::free_local_port_in_range;

pub fn find_port() -> Result<u16> {
  free_local_port_in_range(1990..=1990)
    .ok_or(anyhow!("Could not find port"))
}
