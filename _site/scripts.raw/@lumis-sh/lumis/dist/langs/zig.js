// langs/zig.ts
var language = {
  id: "zig",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Variables
(identifier) @variable

; Parameters
(parameter
  name: (identifier) @variable.parameter)

(payload
  (identifier) @variable.parameter)

; Types
(parameter
  type: (identifier) @type)

((identifier) @type
  (#match? @type "^[A-Z_][a-zA-Z0-9_]*"))

(variable_declaration
  (identifier) @type
  "="
  [
    (struct_declaration)
    (enum_declaration)
    (union_declaration)
    (opaque_declaration)
  ])

[
  (builtin_type)
  "anyframe"
] @type.builtin

; Constants
((identifier) @constant
  (#match? @constant "^[A-Z][A-Z_0-9]+$"))

[
  "null"
  "unreachable"
  "undefined"
] @constant.builtin

(field_expression
  .
  member: (identifier) @constant)

(enum_declaration
  (container_field
    type: (identifier) @constant))

; Labels
(block_label
  (identifier) @label)

(break_label
  (identifier) @label)

; Fields
(field_initializer
  .
  (identifier) @variable.member)

(field_expression
  (_)
  member: (identifier) @variable.member)

(container_field
  name: (identifier) @variable.member)

(initializer_list
  (assignment_expression
    left: (field_expression
      .
      member: (identifier) @variable.member)))

; Functions
(builtin_identifier) @function.builtin

(call_expression
  function: (identifier) @function.call)

(call_expression
  function: (field_expression
    member: (identifier) @function.call))

(function_declaration
  name: (identifier) @function)

; Modules
(variable_declaration
  (identifier) @module
  (builtin_function
    (builtin_identifier) @keyword.import
    (#any-of? @keyword.import "@import" "@cImport")))

; Builtins
[
  "c"
  "..."
] @variable.builtin

((identifier) @variable.builtin
  (#eq? @variable.builtin "_"))

(calling_convention
  (identifier) @variable.builtin)

; Keywords
[
  "asm"
  "defer"
  "errdefer"
  "test"
  "error"
  "const"
  "var"
] @keyword

[
  "struct"
  "union"
  "enum"
  "opaque"
] @keyword.type

[
  "async"
  "await"
  "suspend"
  "nosuspend"
  "resume"
] @keyword.coroutine

"fn" @keyword.function

[
  "and"
  "or"
  "orelse"
] @keyword.operator

"return" @keyword.return

[
  "if"
  "else"
  "switch"
] @keyword.conditional

[
  "for"
  "while"
  "break"
  "continue"
] @keyword.repeat

[
  "usingnamespace"
  "export"
] @keyword.import

[
  "try"
  "catch"
] @keyword.exception

[
  "volatile"
  "allowzero"
  "noalias"
  "addrspace"
  "align"
  "callconv"
  "linksection"
  "pub"
  "inline"
  "noinline"
  "extern"
  "comptime"
  "packed"
  "threadlocal"
] @keyword.modifier

; Operator
[
  "="
  "*="
  "*%="
  "*|="
  "/="
  "%="
  "+="
  "+%="
  "+|="
  "-="
  "-%="
  "-|="
  "<<="
  "<<|="
  ">>="
  "&="
  "^="
  "|="
  "!"
  "~"
  "-"
  "-%"
  "&"
  "=="
  "!="
  ">"
  ">="
  "<="
  "<"
  "^"
  "|"
  "<<"
  ">>"
  "<<|"
  "+"
  "++"
  "+%"
  "+|"
  "-|"
  "*"
  "/"
  "%"
  "**"
  "*%"
  "*|"
  "||"
  ".*"
  ".?"
  "?"
  ".."
] @operator

; Literals
(character) @character

([
  (string)
  (multiline_string)
] @string
  (#set! "priority" 95))

(integer) @number

(float) @number.float

(boolean) @boolean

(escape_sequence) @string.escape

; Punctuation
[
  "["
  "]"
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket

[
  ";"
  "."
  ","
  ":"
  "=>"
  "->"
] @punctuation.delimiter

(payload
  "|" @punctuation.bracket)

; Comments
(comment) @comment 

((comment) @comment.documentation
  (#match? @comment.documentation "^//!"))`,
  injections: `; This file is auto-generated. Do not edit.
((comment) @injection.content
  (#set! injection.language "comment"))

; TODO: add when asm is added
; (asm_output_item (string) @injection.content
;   (#set! injection.language "asm"))
; (asm_input_item (string) @injection.content
;   (#set! injection.language "asm"))
; (asm_clobbers (string) @injection.content
;   (#set! injection.language "asm"))`,
  locals: `; This file is auto-generated. Do not edit.
; Definitions
(function_declaration
  name: (identifier) @local.definition.function)

(parameter
  name: (identifier) @local.definition.parameter)

(variable_declaration
  (identifier) @local.definition.var)

(variable_declaration
  (identifier) @local.definition.type
  (enum_declaration))

(container_field
  type: (identifier) @local.definition.field)

(enum_declaration
  (function_declaration
    name: (identifier) @local.definition.method))

(variable_declaration
  (identifier) @local.definition.type
  (struct_declaration))

(struct_declaration
  (function_declaration
    name: (identifier) @local.definition.method))

(container_field
  name: (identifier) @local.definition.field)

(variable_declaration
  (identifier) @local.definition.type
  (union_declaration))

(union_declaration
  (function_declaration
    name: (identifier) @local.definition.method))

(payload
  (identifier) @local.definition.var)

(block_label
  (identifier) @local.definition)

; References
(identifier) @local.reference

(parameter
  type: (identifier) @local.reference
  (#set! reference.kind "type"))

(pointer_type
  (identifier) @local.reference
  (#set! reference.kind "type"))

(nullable_type
  (identifier) @local.reference
  (#set! reference.kind "type"))

(struct_initializer
  (identifier) @local.reference
  (#set! reference.kind "type"))

(array_type
  (_)
  (identifier) @local.reference
  (#set! reference.kind "type"))

(slice_type
  (identifier) @local.reference
  (#set! reference.kind "type"))

(field_expression
  member: (identifier) @local.reference
  (#set! reference.kind "field"))

(call_expression
  function: (field_expression
    member: (identifier) @local.reference
    (#set! reference.kind "function")))

(break_label
  (identifier) @local.reference)

[
  (for_statement)
  (if_statement)
  (while_statement)
  (function_declaration)
  (block)
  (source_file)
  (enum_declaration)
  (struct_declaration)
] @local.scope`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-zig", name: "tree-sitter-zig", version: "0.26" }
};
var zig_default = language;

export { zig_default as default };
