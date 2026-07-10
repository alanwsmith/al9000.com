use crate::builder::trim_empty_leading_lines;
use minijinja::Value;
use syntect::html::ClassStyle;
use syntect::html::ClassedHTMLGenerator;
use syntect::parsing::SyntaxSet;
use syntect::util::LinesWithEndings;

pub fn highlight(
  code: &str,
  language: &str,
  options: Option<&Value>,
) -> Value {
  let mut extra_classes = "".to_string();
  let mut title = "".to_string();
  let mut selection: Vec<usize> = vec![];
  if let Some(v) = options {
    if let Ok(classes) = v.get_attr("classes") {
      extra_classes = format!(" {}", classes);
    }
    if let Ok(t) = v.get_attr("title") {
      title = t.to_string();
    }
    if let Ok(selection_string) = v.get_attr("select")
      && selection_string != Value::UNDEFINED
    {
      selection = selection_string
        .to_string()
        .split("-")
        .map(|x| x.parse::<usize>().unwrap())
        .collect();
    }
  }
  let syntax_set = SyntaxSet::load_defaults_newlines();
  let syntax = syntax_set
    .find_syntax_by_token(language)
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
  let mut output_html: Vec<_> = initial_html
    .lines()
    .enumerate()
    .map(|(index, line)| {
      format!(
        r#"<span class="line-marker" data-line="{}"></span>{}"#,
        index + 1,
        line
      )
    })
    .collect();
  if selection.len() == 2 {
    output_html =
      (&output_html[selection[0] - 1..selection[1]]).to_vec();
  }

  Value::from_safe_string(format!(
    r#"<div class="code-block{}">{}<pre><code>{}</code></pre></div>"#,
    extra_classes,
    title,
    output_html.join("\n")
  ))
}
