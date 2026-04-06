use clap::Parser;

#[derive(Parser)]
struct Input {
  arg1: String,
  arg2: String,
  arg3: String,
}

fn main() {
  let input = Input::parse();
  println!("Arg 1: {}", input.arg1);
  println!("Arg 2: {}", input.arg2);
  println!("Arg 3: {}", input.arg3);
}
