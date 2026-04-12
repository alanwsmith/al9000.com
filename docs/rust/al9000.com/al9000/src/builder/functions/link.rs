use minijinja::Value;

pub fn link(
  id: &str,
  options: Option<Value>,
) -> Option<Value> {
  Some(Value::from_safe_string(id.to_string()))
}
