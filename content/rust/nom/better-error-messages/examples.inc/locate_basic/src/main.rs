use nom::bytes::complete::tag;
use nom::{IResult, Parser};
use nom_locate::LocatedSpan;
use std::fs;

type Content<'a> = LocatedSpan<&'a str, Vec<&'a str>>;

fn main() {
  let input = "alfa not bravo";
  let content = Content::new_extra(input, vec![]);
  let result = alfa_parser(content);
  fs::write("output.txt", format!("{:#?}", result))
    .unwrap();
}

fn alfa_parser(
  mut content: Content
) -> IResult<Content, ()> {
  content.extra.push("alfa_parser");
  let (content, _) = tag("alfa ").parse(content)?;
  let (content, _) = bravo_parser.parse(content)?;
  Ok((content, ()))
}

fn bravo_parser(
  mut content: Content
) -> IResult<Content, ()> {
  content.extra.push("bravo_parser");
  let (content, _) = tag("xxx").parse(content)?;
  Ok((content, ()))
}
