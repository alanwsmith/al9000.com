// langs/editorconfig.ts
var language = {
  id: "editorconfig",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(comment) @comment 

(property) @property

(string) @string

(header
  (glob) @string.special.path)

(character) @character

(character_escape) @string.escape

(wildcard) @character.special

(integer) @number

[
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  ","
  ".."
  "/"
  "-"
] @punctuation.delimiter

[
  "="
  "!"
] @operator`,
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
  wasm: { packageName: "@lumis-sh/wasm-editorconfig", name: "tree-sitter-editorconfig", version: "0.26" }
};
var editorconfig_default = language;

export { editorconfig_default as default };
