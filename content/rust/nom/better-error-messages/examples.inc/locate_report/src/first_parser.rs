use crate::Span;
use crate::second_parser;

use nom::bytes::complete::tag;
use nom::character::complete::line_ending;
use nom::{IResult, Parser};

pub fn first_parser(
  mut span: Span
) -> IResult<Span, Span> {
  span.extra = "prelude_parser";
  let (span, _) = tag("prelude").parse(span)?;
  let (span, _) = line_ending.parse(span)?;
  let (span, _) = tag("spacer").parse(span)?;
  let (span, result) = second_parser.parse(span)?;
  Ok((span, result))
}
