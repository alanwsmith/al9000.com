use crate::builder::trim_empty_leading_lines;
use minijinja::Value;
use syntect::html::ClassStyle;
use syntect::html::ClassedHTMLGenerator;
use syntect::parsing::SyntaxSet;
use syntect::util::LinesWithEndings;

pub fn highlight_text(
  code: &str,
  options: Option<&Value>,
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
  let output_html: Vec<_> = initial_html
    .lines()
    .map(|line| {
      format!(r#"<span class="line-marker"></span>{}"#, line)
    })
    .collect();
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
  Value::from_safe_string(format!(
    r#"<div class="text-block{}">{}<pre><code>{}</code></pre></div>"#,
    extra_classes,
    title,
    output_html.join("\n")
  ))
}
