mod first_parser;
mod report;
mod second_parser;

use first_parser::first_parser;
use nom::Parser;
use nom_locate::LocatedSpan;
use report::report;
use second_parser::second_parser;

type Span<'a> = LocatedSpan<&'a str, &'a str>;

fn main() {
  let input =
    Span::new_extra("prelude\nspacer target", "");
  let result = first_parser.parse(input);
  report(result);
}
