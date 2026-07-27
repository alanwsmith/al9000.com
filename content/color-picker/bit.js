== set components_dir = template_dir() + "/components.inc"
== for f in files_in_folder(components_dir)
  == if extension(f) == "js"
[@raw_include(components_dir + "/" + f) @]
  == endif
== endfor


let sheet = new CSSStyleSheet();
document.adoptedStyleSheets.push(sheet);
export const b = {
  init: "init",
};

let s = new State(b);
