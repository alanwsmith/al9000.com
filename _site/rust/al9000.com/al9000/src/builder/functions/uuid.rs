use minijinja::Value;
use uuid::Uuid;
use uuid::uuid;

pub fn uuid(input: Option<Value>) -> Value {
  match input {
    Some(i) => {
      let name_space_uuid =
        uuid!("39128ebc-da76-4085-a176-9e52ca29bddc");
      Value::from_safe_string(
        Uuid::new_v5(&name_space_uuid, i.to_string().as_bytes())
          .to_string(),
      )
    }
    None => {
      Value::from_safe_string(Uuid::new_v4().simple().to_string())
    }
  }
}
