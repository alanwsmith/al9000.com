// langs/ejs.ts
var language = {
  id: "ejs",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(comment_directive) @comment 

[
  "<%#"
  "<%"
  "<%="
  "<%_"
  "<%-"
  "%>"
  "-%>"
  "_%>"
] @keyword`,
  injections: `; This file is auto-generated. Do not edit.
((content) @injection.content
  (#set! injection.language "html")
  (#set! injection.combined))

((code) @injection.content
  (#set! injection.language "ruby")
  (#set! injection.combined))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-embedded-template", name: "tree-sitter-embedded-template", version: "0.26" }
};
var ejs_default = language;

export { ejs_default as default };
