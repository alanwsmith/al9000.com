use nom::bytes::complete::tag;
use nom::{IResult, Parser};
use nom_locate::LocatedSpan;

type Span<'a> = LocatedSpan<&'a str, &'a str>;

fn main() {
  let input = "target";
  let span = Span::new_extra(input, "");
  let result = parser(span);
  std::fs::write(
    "output.txt",
    format!("{:#?}", result),
  )
  .unwrap();
}

fn parser(mut span: Span) -> IResult<Span, Span> {
  span.extra = "parser";
  let (span, result) =
    tag("prelude").parse(span)?;
  Ok((span, result))
}
