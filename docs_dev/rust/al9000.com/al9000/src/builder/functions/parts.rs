use minijinja::Value;

pub fn parts(path: &str) -> Value {
  Value::from_serialize(
    path.split("/").skip(1).collect::<Vec<&str>>(),
  )
}
