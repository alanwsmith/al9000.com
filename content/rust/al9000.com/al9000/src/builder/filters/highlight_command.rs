use crate::builder::trim_empty_leading_lines;
use minijinja::Value;
use syntect::html::ClassStyle;
use syntect::html::ClassedHTMLGenerator;
use syntect::parsing::SyntaxSet;
use syntect::util::LinesWithEndings;

pub fn highlight_command(
  code: &str,
  options: Option<&Value>,
) -> Value {
  let syntax_set = SyntaxSet::load_defaults_newlines();
  let syntax = syntax_set
    .find_syntax_by_token("bash")
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
  let html = html_generator.finalize();

  let mut extra_classes = "".to_string();
  let mut title = "".to_string();

  if let Some(v) = options {
    if let Ok(classes) = v.get_attr("classes") {
      extra_classes = format!(" {}", classes);
    }
    if let Ok(t) = v.get_attr("title") {
      title = t.to_string();
    }
  }

  // let extra_classes = match classes {
  //   Some(c) => format!(" {}", c),
  //   None => "".to_string(),
  // };
  // let title_string = match title {
  //   Some(t) => format!(r#"<div class="title">{}</div>"#, t),
  //   None => "".to_string(),
  // };
  Value::from_safe_string(format!(
    r#"<div class="command-block{}">{}<pre><code>{}</code></pre></div>"#,
    extra_classes, title, html
  ))
}
