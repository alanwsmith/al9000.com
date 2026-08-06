use crate::Content;
use crate::second_parser;

use nom::bytes::complete::tag;
use nom::character::complete::line_ending;
use nom::{IResult, Parser};

pub fn first_parser(
  mut content: Content
) -> IResult<Content, Content> {
  content.extra.push("first_parser");
  let (content, _) = tag("alfa").parse(content)?;
  let (content, _) = line_ending.parse(content)?;
  let (content, _) = tag("bravo").parse(content)?;
  let (content, result) =
    second_parser.parse(content)?;
  Ok((content, result))
}
