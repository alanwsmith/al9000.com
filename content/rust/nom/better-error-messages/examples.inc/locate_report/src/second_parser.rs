use crate::Content;

use nom::bytes::complete::tag;
use nom::{IResult, Parser};

pub fn second_parser(
  mut content: Content
) -> IResult<Content, Content> {
  content.extra.push("second_parser");
  let (content, result) =
    tag("fail here").parse(content)?;
  Ok((content, result))
}
