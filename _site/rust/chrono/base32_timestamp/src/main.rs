use chrono::{DateTime, Utc};
use data_encoding::BASE32_NOPAD;

fn main() {
  let dt = encode_datetime();
  let seconds_from_epoch = decode_datetime(&dt);
  println!("{}", dt);
  println!("{}", seconds_from_epoch);
}

fn encode_datetime() -> String {
  let dt: i64 = Utc::now().timestamp();
  let bytes = &dt.to_be_bytes()[3..8];
  BASE32_NOPAD.encode(bytes).to_lowercase().to_string()
}

fn decode_datetime(dt: &str) -> DateTime<Utc> {
  let five_bytes =
    BASE32_NOPAD.decode(dt.to_uppercase().as_bytes()).unwrap();
  let mut buf = [0u8; 8];
  buf[3..8].copy_from_slice(&five_bytes);
  let ts = i64::from_be_bytes(buf);
  DateTime::from_timestamp(ts, 0).unwrap()
}
