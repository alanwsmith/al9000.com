use scraper::{Html, Selector};

fn main() {
  let left = r#"
<h1 class="red" id="ping">Hello World</h1>
"#;

  let right = r#"
<h1 id="ping" 
    class="red">Hello World</h1>
"#;

  println!(
    "Is Same HTML: {}",
    is_same_html(left, right),
  );
}

pub fn is_same_html(
  left_input: &str,
  right_input: &str,
) -> bool {
  let selector = Selector::parse("*").unwrap();
  let left_frag = Html::parse_fragment(left_input);
  let right_frag = Html::parse_fragment(right_input);
  let left =
    left_frag.select(&selector).next().unwrap();
  let right =
    right_frag.select(&selector).next().unwrap();
  left.html() == right.html()
}
