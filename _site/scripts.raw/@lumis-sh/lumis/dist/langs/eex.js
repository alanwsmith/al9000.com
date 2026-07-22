// langs/eex.ts
var language = {
  id: "eex",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
[
  "%>"
  "--%>"
  "<%!--"
  "<%"
  "<%#"
  "<%%="
  "<%="
] @tag.delimiter

; EEx comments are highlighted as such
(comment) @comment `,
  injections: `; This file is auto-generated. Do not edit.
; EEx expressions are Elixir
((expression) @injection.content
  (#set! injection.language "elixir"))

; EEx expressions can span multiple interpolated lines
((partial_expression) @injection.content
  (#set! injection.language "elixir")
  (#set! injection.combined))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-eex", name: "tree-sitter-eex", version: "0.26" }
};
var eex_default = language;

export { eex_default as default };
