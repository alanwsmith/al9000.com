// langs/dot.ts
var language = {
  id: "dot",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(identifier) @type

[
  "strict"
  "graph"
  "digraph"
  "subgraph"
  "node"
  "edge"
] @keyword

(string_literal) @string

(number_literal) @number

[
  (edgeop)
  (operator)
] @operator

[
  ","
  ";"
] @punctuation.delimiter

[
  "{"
  "}"
  "["
  "]"
  "<"
  ">"
] @punctuation.bracket

(subgraph
  id: (id
    (identifier) @module))

(attribute
  name: (id
    (identifier) @variable.member))

(attribute
  value: (id
    (identifier) @constant))

(comment) @comment 

(preproc) @keyword.directive`,
  injections: `; This file is auto-generated. Do not edit.
((html_internal) @injection.content
  (#set! injection.language "html"))

((comment) @injection.content
  (#set! injection.language "comment"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-dot", name: "tree-sitter-dot", version: "0.26" }
};
var dot_default = language;

export { dot_default as default };
