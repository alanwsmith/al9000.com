use nom::branch::alt;
use nom::bytes::complete::tag;
use nom::{IResult, Parser};
use std::fs;

fn main() {
  let input = "target";
  let result = alt((alfa, bravo)).parse(input);
  fs::write("output.txt", format!("{:#?}", result))
    .unwrap();
}

fn alfa(input: &str) -> IResult<&str, &str> {
  let (input, result) = tag("xxx").parse(input)?;
  Ok((input, result))
}

fn bravo(input: &str) -> IResult<&str, &str> {
  let (input, result) = tag("yyy").parse(input)?;
  Ok((input, result))
}
