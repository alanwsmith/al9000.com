use anyhow::Result;
use minijinja::Environment;
use minijinja::Value;
use minijinja::context;
use std::fs;
use toml::Table;

fn main() -> Result<()> {
  let input = fs::read_to_string("data.toml")?;
  let mut env = Environment::new();
  env.add_template_owned("template", "{{ toml.alfa }}")?;
  let template = env.get_template("template")?;
  let data = parse_toml(&input)?;
  let output = template.render(context!(toml => data))?;
  println!("{}", output);
  Ok(())
}

fn parse_toml(input: &str) -> Result<Value> {
  let data = input.parse::<Table>()?;
  Ok(Value::from_serialize(data))
}
