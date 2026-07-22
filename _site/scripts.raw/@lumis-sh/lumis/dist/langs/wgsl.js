// langs/wgsl.ts
var language = {
  id: "wgsl",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(identifier) @variable

(int_literal) @number

(float_literal) @number.float

(bool_literal) @boolean

(type_declaration) @type

(function_declaration
  (identifier) @function)

(parameter
  (variable_identifier_declaration
    (identifier) @variable.parameter))

(struct_declaration
  (identifier) @type)

(struct_declaration
  (struct_member
    (variable_identifier_declaration
      (identifier) @variable.member)))

(type_constructor_or_function_call_expression
  (type_declaration) @function.call)

[
  "bitcast"
  "discard"
  "enable"
  "fallthrough"
  "let"
  "type"
  "var"
  "override"
  (texel_format)
] @keyword

"struct" @keyword.type

[
  "private"
  "storage"
  "uniform"
  "workgroup"
] @keyword.modifier

[
  "read"
  "read_write"
  "write"
] @keyword.modifier

"fn" @keyword.function

"return" @keyword.return

[
  ","
  "."
  ":"
  ";"
  "->"
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  "loop"
  "for"
  "while"
  "break"
  "continue"
  "continuing"
] @keyword.repeat

[
  "if"
  "else"
  "switch"
  "case"
  "default"
] @keyword.conditional

[
  "&"
  "&&"
  "/"
  "!"
  "="
  "=="
  "!="
  ">"
  ">="
  ">>"
  "<"
  "<="
  "<<"
  "%"
  "-"
  "+"
  "|"
  "||"
  "*"
  "~"
  "^"
  "@"
  "++"
  "--"
] @operator

(attribute
  (identifier) @attribute)

[
  (line_comment)
  (block_comment)
] @comment `,
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
  wasm: { packageName: "@lumis-sh/wasm-wgsl", name: "tree-sitter-wgsl", version: "0.26" }
};
var wgsl_default = language;

export { wgsl_default as default };
