// langs/asm.ts
var language = {
  id: "asm",
  aliases: ["assembly"],
  highlights: `; This file is auto-generated. Do not edit.
; General
(label
  [
    (ident)
    (word)
  ] @label)

(reg) @variable.builtin

(meta
  kind: (_) @function.builtin)

(instruction
  kind: (_) @function.builtin)

(const
  name: (word) @constant)

; Comments
[
  (line_comment)
  (block_comment)
] @comment 

; Literals
(int) @number

(float) @number.float

(string) @string

; Keywords
[
  "byte"
  "word"
  "dword"
  "qword"
  "ptr"
  "rel"
  "label"
  "const"
] @keyword

; Operators & Punctuation
[
  "+"
  "-"
  "*"
  "/"
  "%"
  "|"
  "^"
  "&"
] @operator

[
  "("
  ")"
  "["
  "]"
] @punctuation.bracket

[
  ","
  ":"
] @punctuation.delimiter`,
  injections: `; This file is auto-generated. Do not edit.
([
  (line_comment)
  (block_comment)
] @injection.content
  (#set! injection.language "comment"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-asm", name: "tree-sitter-asm", version: "0.26" }
};
var asm_default = language;

export { asm_default as default };
