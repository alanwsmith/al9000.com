== set parts_dir = template_dir() + "/parts.inc"
== for f in files_in_folder(parts_dir)
[@raw_include(parts_dir + "/" + f) @]
== endfor


let sheet = new CSSStyleSheet();
let s = new State();
export const b = {
  init: "init",
};
