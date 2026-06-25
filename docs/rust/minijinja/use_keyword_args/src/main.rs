// [! raw !]
use anyhow::Result;
use minijinja::syntax::SyntaxConfig;
use minijinja::value::Kwargs;
use minijinja::{Environment, Error, Value, context};

fn main() -> Result<()> {
  let mut env = get_env()?;
  let template_string = get_template_string()?;
  env.add_template("template", &template_string)?;
  let template = env.get_template("template")?;
  let output = template.render(context!(title => "Alfa Bravo"))?;
  println!("{}", output);
  Ok(())
}

fn get_env() -> Result<Environment<'static>> {
  let mut env = Environment::new();
  env.set_syntax(
    SyntaxConfig::builder()
      .block_delimiters("[!", "!]")
      .variable_delimiters("[@", "@]")
      .comment_delimiters("[#", "#]")
      .build()
      .unwrap(),
  );
  env.add_function("test_function", test_function);
  Ok(env)
}

fn get_template_string() -> Result<String> {
  let template = r#"
No Extra Args: [@ test_function("alfa", "bravo") @]
With Extra Args: [@ test_function("delta", "echo", extra = "foxtrot") @]
  "#;
  Ok(template.to_string())
}

fn test_function(
  value1: Value,
  value2: Value,
  options: Kwargs,
) -> Result<Value, Error> {
  let mut output = format!("{}-{}", value1, value2);
  if let Some(extra) = options.get("extra")? {
    output.push('-');
    output.push_str(extra);
  }
  // asseert_all_used ensures no unknown
  // arguments (or misspelled arguments)
  // are sent
  options.assert_all_used()?;
  Ok(Value::from_safe_string(output))
}
// [! endraw !]
