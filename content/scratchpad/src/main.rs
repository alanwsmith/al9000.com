use nom::branch::alt;
use nom::bytes::complete::tag;
use nom::character::complete::usize;
use nom::{IResult, Parser};
use nom_locate::LocatedSpan;

type Span<'a> = LocatedSpan<&'a str, &'a str>;

#[derive(Debug)]
struct Payload<'a> {
  pub content: Content<'a>,
}

#[derive(Debug)]
enum Content<'a> {
  Text(&'a str),
  Number(usize),
}

fn parse1(mut s: Span) -> IResult<Span, Payload> {
  s.extra = "parse1";
  // let (s, position) = position.parse(s)?;
  let (s, _) = tag("alfa ").parse(s)?;
  let (s, result) = parse2.parse(s)?;
  //  result.position = position;
  Ok((s, result))
}

fn parse2(mut s: Span) -> IResult<Span, Payload> {
  s.extra = "parse2";
  //  let (s, position) = position.parse(s)?;
  let (s, _) = tag("bravo ").parse(s)?;
  let (s, result) = alt((attempt1, attempt2)).parse(s)?;
  //  result.position = position;
  Ok((s, result))
}

fn attempt1(mut s: Span) -> IResult<Span, Payload> {
  s.extra = "attempt1";
  //  let (s, position) = position.parse(s)?;
  let (s, content) = tag("charlie").parse(s)?;
  let payload = Payload {
    //   position,
    content: Content::Text(&content),
  };
  Ok((s, payload))
}

fn attempt2(mut s: Span) -> IResult<Span, Payload> {
  s.extra = "attempt2";
  ////////////////  let (s, position) = position.parse(s)?;
  let (s, found) = usize.parse(s)?;
  //let number = u8(found.1).parse()?;
  let payload = Payload {
    //     position,
    content: Content::Number(found),
  };
  Ok((s, payload))
}

fn main() {
  let success_example1 =
    Span::new_extra("alfa bravo charlie remainder1", "");
  let success_output1 = parse1.parse(success_example1);

  let _ = dbg!(success_output1);

  let success_example2 =
    Span::new_extra("alfa bravo 100 remainder2", "");
  let success_output2 = parse1.parse(success_example2);

  let _ = dbg!(success_output2);

  let error_example =
    Span::new_extra("alfa bravo xxx remainder3", "");
  let error_output = parse1.parse(error_example);
  let _ = dbg!(error_output);

  // let position = output.unwrap().1.position;
  // dbg!(position);
  // assert_eq!(position, unsafe {
  //   Span::new_from_raw_offset(
  //     14, // offset
  //     2,  // line
  //     "", // fragment
  //     (), // extra
  //   )
  // });
  // assert_eq!(position.get_column(), 2);
}
