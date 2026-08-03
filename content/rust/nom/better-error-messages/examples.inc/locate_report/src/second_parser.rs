use crate::Span;

use nom::bytes::complete::tag;
use nom::{IResult, Parser};

pub fn second_parser(
  mut span: Span
) -> IResult<Span, Span> {
  span.extra = "second_parser";
  let (span, result) = tag("xxx").parse(span)?;
  Ok((span, result))
}
