'use strict';

// langs/caddy.ts
var language = {
  id: "caddy",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(comment) @comment 

[
  (env)
  (argv)
  (block_variable)
  (placeholder)
] @constant

(value) @variable

(directive
  (keyword) @attribute)

(global_options
  (option
    (keyword) @attribute))

(keyword) @keyword

(boolean) @boolean

(placeholder
  [
    "{"
    "}"
  ] @punctuation.special)

(auto) @variable.builtin

[
  (string_literal)
  (quoted_string_literal)
  (address)
] @string

[
  (matcher)
  (route)
  (snippet_name)
] @string.special

[
  (numeric_literal)
  (time)
  (size)
  (ip_literal)
] @number

[
  "{"
  "}"
] @punctuation.bracket

"," @punctuation.delimiter`,
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
  wasm: { packageName: "@lumis-sh/wasm-caddy", name: "tree-sitter-caddy", version: "0.26" }
};
var caddy_default = language;

module.exports = caddy_default;
