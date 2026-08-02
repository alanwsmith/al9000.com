== set components_dir = dir() + "/components.inc"
== for f in filesInFolder(components_dir)
  == if extension(f) == "js"
[@rawFile(components_dir + "/" + f) @]
  == endif
== endfor


let sheet = new CSSStyleSheet();
document.adoptedStyleSheets.push(sheet);
export const b = {
  init: "init",
};

let s = new State(b);
