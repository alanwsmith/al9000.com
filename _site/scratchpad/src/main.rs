use nom::branch::alt;
use nom::bytes::complete::tag;
use nom::character::complete::{
  line_ending, space1, usize,
};
use nom::error::Error;
use nom::{Err, Finish};
use nom::{IResult, Parser};
use nom_locate::LocatedSpan;
use std::cmp::max;

type Span<'a> = LocatedSpan<&'a str, &'a str>;

type Report<'a> = Result<
  (LocatedSpan<&'a str, &'a str>, Payload<'a>),
  Err<Error<LocatedSpan<&'a str, &'a str>>>,
>;

#[derive(Debug)]
struct Payload<'a> {
  pub content: Content<'a>,
}

#[derive(Debug)]
enum Content<'a> {
  Text(&'a str),
  Number(usize),
}

fn parser(mut s: Span) -> IResult<Span, Payload> {
  s.extra = "parser";
  let (s, _) =
    (tag("alfa"), line_ending, tag("bravo"), space1)
      .parse(s)?;
  let (s, result) = alt((charlie, number)).parse(s)?;
  Ok((s, result))
}

fn charlie(mut s: Span) -> IResult<Span, Payload> {
  s.extra = "charlie";
  let (s, content) = tag("charlie").parse(s)?;
  Ok((
    s,
    Payload {
      content: Content::Text(&content),
    },
  ))
}

fn number(mut s: Span) -> IResult<Span, Payload> {
  s.extra = "number";
  let (s, found) = usize.parse(s)?;
  Ok((
    s,
    Payload {
      content: Content::Number(found),
    },
  ))
}

fn report(result: Report) {
  match result.finish() {
    Ok(details) => match details.1.content {
      Content::Number(number) => {
        println!("Found: {}", number)
      }
      Content::Text(text) => {
        println!("Found: {}", text)
      }
    },
    Err(e) => {
      let error_message = format!(
        "ERROR: parser: {} - line: {} column: {}",
        e.input.extra,
        e.input.location_line(),
        e.input.get_utf8_column(),
      );
      let error_line = String::from_utf8(
        e.input.get_line_beginning().to_vec(),
      )
      .unwrap();

      let divider_spaces = max(
        error_message.chars().collect::<Vec<_>>().len(),
        error_line.chars().collect::<Vec<_>>().len(),
      );

      let pointer_line = format!(
        "{}^",
        " ".repeat(e.input.get_utf8_column() - 1),
      );

      println!("{}", error_message);
      println!("{}", "-".repeat(divider_spaces));
      println!("{}", error_line);
      println!("{}", pointer_line);
    }
  }
}

fn main() {
  let input1 = Span::new_extra(
    "alfa\nbravo charlie remainder after text",
    "",
  );
  let result1 = parser.parse(input1);
  report(result1);

  let input2 = Span::new_extra(
    "alfa\nbravo 100 remainder after number",
    "",
  );
  let result2 = parser.parse(input2);
  report(result2);

  let input3 = Span::new_extra(
    "alfa\nbravo xxx remainder after error",
    "",
  );
  let result3 = parser.parse(input3);
  report(result3);
}
