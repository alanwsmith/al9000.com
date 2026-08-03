use nom::bytes::complete::tag;
use nom::{IResult, Parser};
use nom_locate::LocatedSpan;
use std::fs;

type Span<'a> = LocatedSpan<&'a str, &'a str>;

fn main() {
  let input = "target";
  let span = Span::new_extra(input, "");
  let result = some_parser(span);
  fs::write("output.txt", format!("{:#?}", result))
    .unwrap();
}

fn some_parser(mut span: Span) -> IResult<Span, Span> {
  span.extra = "some_parser";
  let (span, result) = tag("xxx").parse(span)?;
  Ok((span, result))
}
