use minijinja::Value;
use serde::Serialize;
use std::collections::HashMap;
use std::path::Path;
use std::path::PathBuf;

#[derive(Clone, Debug, Serialize)]
#[serde(untagged)]
pub enum DataNode {
  Branch(HashMap<String, DataNode>),
  Leaf(Value),
}

impl Default for DataNode {
  fn default() -> Self {
    Self::new()
  }
}

impl DataNode {
  pub fn new() -> Self {
    DataNode::Branch(HashMap::new())
  }

  fn get(
    &self,
    path: &[String],
  ) -> Option<&Value> {
    match self {
      DataNode::Branch(nodes) => {
        if path.is_empty() {
          return None;
        }
        let remainder = &path[1..];
        nodes.get(&path[0]).and_then(|next_node| {
          if remainder.is_empty() {
            match next_node {
              DataNode::Leaf(value) => Some(value),
              _ => None,
            }
          } else {
            next_node.get(remainder)
          }
        })
      }
      _ => None,
    }
  }

  pub fn insert(
    &mut self,
    path: &Path,
    value: Value,
  ) {
    if path.is_empty() {
      return;
    }
    let no_extension_path = &path.with_extension("");
    let skip_count = if no_extension_path.is_absolute() {
      1
    } else {
      0
    };
    if let DataNode::Branch(nodes) = self
      && let Some(component) =
        no_extension_path.components().nth(skip_count)
    {
      let key = component.as_os_str().to_string_lossy().to_string();
      let remainder: &PathBuf = &no_extension_path
        .components()
        .skip(skip_count + 1)
        .collect();
      let next_node =
        nodes.entry(key).or_insert(if remainder.is_empty() {
          DataNode::Leaf(value.clone())
        } else {
          DataNode::Branch(HashMap::new())
        });
      next_node.insert(remainder, value);
    }
  }
}
