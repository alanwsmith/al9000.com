use anyhow::{Result, anyhow};
use base32::Alphabet;
use chrono::{DateTime, FixedOffset, Utc};

fn main() -> Result<()> {
  let dt1 =
    DateTime::parse_from_rfc3339("2026-07-17T10:30:00-04:00")?;

  let encoded1 = encode_base32_datetime(&dt1);
  let decoded1 = decode_base32_datetime(&encoded1);

  let dt2 =
    DateTime::parse_from_rfc3339("2026-07-17T10:36:00-04:00")?;

  let encoded2 = encode_base32_datetime(&dt2);
  let decoded2 = decode_base32_datetime(&encoded2);

  println!("{}", encoded1);
  println!("{}", encoded2);
  println!("{}", decoded1?.to_rfc3339());
  println!("{}", decoded2?.to_rfc3339());

  Ok(())
}

fn encode_base32_datetime(
  datetime: &DateTime<FixedOffset>
) -> String {
  let bytes = &datetime.timestamp().to_be_bytes()[3..8];
  base32::encode(Alphabet::Crockford, bytes).to_lowercase()
}

fn decode_base32_datetime(dt: &str) -> Result<DateTime<Utc>> {
  let five_bytes = base32::decode(Alphabet::Crockford, dt)
    .ok_or(anyhow!("Could not decode datetime"))?;
  let mut buf = [0u8; 8];
  buf[3..8].copy_from_slice(&five_bytes);
  let ts = i64::from_be_bytes(buf);
  DateTime::from_timestamp(ts, 0)
    .ok_or(anyhow!("Could not decode timestamp"))
}
