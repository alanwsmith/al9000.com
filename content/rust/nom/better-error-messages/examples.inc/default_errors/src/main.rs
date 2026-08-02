use nom::branch::alt;
use nom::bytes::complete::tag;
use nom::{IResult, Parser};

fn main() {
  let input = "prelude target";
  let result = starter(input);
  std::fs::write(
    "output.txt",
    format!("{:#?}", result),
  )
  .unwrap();
}

fn starter(input: &str) -> IResult<&str, &str> {
  let (input, _) = tag("prelude").parse(input)?;
  let (input, result) =
    alt((alfa, bravo, charlie)).parse(input)?;
  Ok((input, result))
}

fn alfa(input: &str) -> IResult<&str, &str> {
  let (input, result) = tag("xxx").parse(input)?;
  Ok((input, result))
}

fn bravo(input: &str) -> IResult<&str, &str> {
  let (input, result) = tag("yyy").parse(input)?;
  Ok((input, result))
}

fn charlie(input: &str) -> IResult<&str, &str> {
  let (input, result) = tag("zzz").parse(input)?;
  Ok((input, result))
}
