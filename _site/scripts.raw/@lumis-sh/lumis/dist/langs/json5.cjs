'use strict';

// langs/json5.ts
var language = {
  id: "json5",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
[
  (true)
  (false)
] @boolean

(null) @constant

(string) @string

(number) @number

(comment) @comment 

(member
  name: (_) @keyword)`,
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
  wasm: { packageName: "@lumis-sh/wasm-json5", name: "tree-sitter-json5", version: "0.26" }
};
var json5_default = language;

module.exports = json5_default;
