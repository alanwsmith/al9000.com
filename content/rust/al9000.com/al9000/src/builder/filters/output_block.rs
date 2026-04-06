use crate::builder::trim_empty_leading_lines;
use minijinja::Value;
use syntect::html::ClassStyle;
use syntect::html::ClassedHTMLGenerator;
use syntect::parsing::SyntaxSet;
use syntect::util::LinesWithEndings;

pub fn output_block(
  code: &str,
  title: Option<&str>,
  classes: Option<&str>,
) -> Value {
  let syntax_set = SyntaxSet::load_defaults_newlines();
  let syntax = syntax_set
    .find_syntax_by_token("txt")
    .unwrap_or_else(|| syntax_set.find_syntax_plain_text());
  let mut html_generator =
    ClassedHTMLGenerator::new_with_class_style(
      syntax,
      &syntax_set,
      ClassStyle::Spaced,
    );
  for line in
    LinesWithEndings::from(&trim_empty_leading_lines(code))
  {
    let _ = html_generator
      .parse_html_for_line_which_includes_newline(line);
  }
  let initial_html = html_generator.finalize();
  let extra_classes = match classes {
    Some(c) => format!(" {}", c),
    None => "".to_string(),
  };
  let title = match title {
    Some(t) => t.to_string(),
    None => "".to_string(),
  };
  Value::from_safe_string(format!(
    r#"<div class="output-block{}"><div class="title">{}</div><pre><code>{}</code></pre></div>"#,
    extra_classes, title, initial_html
  ))
}
