mod first_parser;
mod report;
mod second_parser;

use first_parser::first_parser;
use nom::Parser;
use nom_locate::LocatedSpan;
use report::report;
use second_parser::second_parser;

type Content<'a> = LocatedSpan<&'a str, Vec<&'a str>>;

fn main() {
  let input = Content::new_extra(
    "alfa\nbravo charlie delta",
    vec![],
  );
  let result = first_parser.parse(input);
  report(result);
}
