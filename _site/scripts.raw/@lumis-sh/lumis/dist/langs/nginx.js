// langs/nginx.ts
var language = {
  id: "nginx",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(comment) @comment 

(value) @variable

[
  (location_modifier)
  "="
] @operator

[
  (keyword)
  "location"
] @keyword

[
  "if"
  "map"
] @keyword.conditional

(boolean) @boolean

[
  (auto)
  (constant)
  (level)
  (connection_method)
  (var)
  (condition)
] @variable.builtin

[
  (file)
  (mask)
] @string.special.path

[
  (string_literal)
  (quoted_string_literal)
] @string

(directive
  (variable
    (keyword) @variable.parameter))

(location_route) @string.special

";" @punctuation.delimiter

[
  (numeric_literal)
  (time)
  (size)
  (cpumask)
] @number

[
  "{"
  "}"
] @punctuation.bracket`,
  injections: `; This file is auto-generated. Do not edit.
((comment) @injection.content
  (#set! injection.language "comment"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-nginx", name: "tree-sitter-nginx", version: "0.26" }
};
var nginx_default = language;

export { nginx_default as default };
