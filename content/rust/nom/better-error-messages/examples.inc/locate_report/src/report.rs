use crate::Content;

use nom::error::Error;
use nom::{Err, Finish};
use nom_locate::LocatedSpan;
use std::fs;

type ResultHolder<'a> = Result<
  (Content<'a>, Content<'a>),
  Err<Error<LocatedSpan<&'a str, Vec<&'a str>>>>,
>;

pub fn report(result: ResultHolder) {
  match result.finish() {
    Ok(_) => println!("Parsing successful"),
    Err(e) => {
      let error_message = format!(
        "PARSING ERROR:\n-> {}\nfailed at:\n{}\non line {} column {}:",
        e.input.extra.join("\n-> "),
        e.input.fragment(),
        e.input.location_line(),
        e.input.get_utf8_column(),
      );
      let error_line = String::from_utf8(
        e.input.get_line_beginning().to_vec(),
      )
      .unwrap();
      let pointer_line = format!(
        "{}^",
        " ".repeat(e.input.get_utf8_column() - 1),
      );
      let parts = [
        error_message.to_string(),
        error_line.to_string(),
        pointer_line.to_string(),
      ];
      fs::write("output.txt", parts.join("\n"))
        .unwrap();
    }
  }
}
