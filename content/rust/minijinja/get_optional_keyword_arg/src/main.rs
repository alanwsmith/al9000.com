use anyhow::Error as AnyError;
use minijinja::syntax::SyntaxConfig;
use minijinja::{Environment, Error, Value, context};

fn main() -> Result<(), AnyError> {
  let env = get_env()?;
  let template = env.get_template("example.txt")?;
  let context = context!();
  let output = template.render(context)?;
  println!("{}", output);
  Ok(())
}

pub fn get_env() -> Result<Environment<'static>, Error> {
  let mut env = Environment::new();
  env.set_syntax(
    SyntaxConfig::builder()
      .block_delimiters("[!", "!]")
      .variable_delimiters("[@", "@]")
      .comment_delimiters("[#", "#]")
      .build()
      .unwrap(),
  );
  env.add_template_owned(
    "example.txt",
    r#"
[@ arg_test() @]
[@ arg_test(example_arg = "This is example") @]
  "#
    .to_string(),
  )?;
  env.add_function("arg_test", arg_test);
  Ok(env)
}

pub fn arg_test(options: Option<Value>) -> Result<Value, Error> {
  let default_value =
    Value::from_safe_string("THIS IS DEFAULT".to_string());

  options.clone().map_or(
    Ok::<Value, Error>(default_value.clone()),
    |opts| {
      opts.get_attr("example_arg").map_or(
        Ok(default_value.clone()),
        |v| {
          if v == Value::UNDEFINED {
            Ok(default_value.clone())
          } else {
            // TODO: Figure out if there's a good
            // way to throw an error here.
            Ok(v)
          }
        },
      )
    },
  )
}
