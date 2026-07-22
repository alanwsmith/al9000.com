// langs/json.ts
var language = {
  id: "json",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
[
  (true)
  (false)
] @boolean

(null) @constant.builtin

(number) @number

(pair
  key: (string) @property)

(pair
  value: (string) @string)

(array
  (string) @string)

[
  ","
  ":"
] @punctuation.delimiter

[
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

("\\"" @conceal
  (#set! conceal ""))

(escape_sequence) @string.escape

((escape_sequence) @conceal
  (#eq? @conceal "\\\\\\"")
  (#set! conceal "\\""))

(comment) @comment `,
  injections: `; This file is auto-generated. Do not edit.
((comment) @injection.content
  (#set! injection.language "comment"))`,
  locals: `; This file is auto-generated. Do not edit.
[
  (object)
  (array)
] @local.scope`,
  brackets: `; This file is auto-generated. Do not edit.
("[" @open
  "]" @close)

("{" @open
  "}" @close)

(("\\"" @open
  "\\"" @close)
  (#set! rainbow.exclude))`,
  wasm: { packageName: "@lumis-sh/wasm-json", name: "tree-sitter-json", version: "0.26" }
};
var json_default = language;

export { json_default as default };
