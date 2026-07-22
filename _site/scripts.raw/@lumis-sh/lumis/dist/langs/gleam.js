// langs/gleam.ts
var language = {
  id: "gleam",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Punctuation
[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  "<<"
  ">>"
] @punctuation.bracket
[
  "."
  ","
  ;; Controversial -- maybe some are operators?
  ":"
  "#"
  "="
  "->"
  ".."
  "-"
  "<-"
] @punctuation.delimiter

; Variables
(identifier) @variable
(discard) @comment.unused

; Comments
(module_comment) @comment
(statement_comment) @comment
(comment) @comment

; Constants
(constant
  name: (identifier) @constant)

; "Properties"
; Assumed to be intended to refer to a name for a field; something that comes
; before ":" or after "."
; e.g. record field names, tuple indices, names for named arguments, etc
(label) @property
(tuple_access
  index: (integer) @property)

; Modules
(module) @module
(import alias: (identifier) @module)
(remote_type_identifier
  module: (identifier) @module)
(remote_constructor_name
  module: (identifier) @module)

; Functions
(unqualified_import (identifier) @function)
(unqualified_import "type" (type_identifier) @type)
(unqualified_import (type_identifier) @constructor)
(function
  name: (identifier) @function)
(external_function
  name: (identifier) @function)
(function_parameter
  name: (identifier) @variable.parameter)
((function_call
   function: (identifier) @function)
 (#is-not? local))
((binary_expression
   operator: "|>"
   right: (identifier) @function)
 (#is-not? local))

; TODO: \`#is-not? local\` applies to entire patterns but ideally it would accept
; a capture to check as a local. This needs to be suggested upstream. Until this
; is a part of the CLI's highlighter we can't distinguish between function calls
; on modules and accesses of record fields.
(function_call function: (field_access field: (label) @function))
((field_access
  record: (identifier) @module)
 (#is-not? local))

; Attributes
(attribute
  "@" @attribute
  name: (identifier) @attribute)

(attribute_value (identifier) @constant)

; Type names
(remote_type_identifier) @type
(type_identifier) @type

; Data constructors
(constructor_name) @constructor

; Literals
(string) @string
(escape_sequence) @string.escape
((escape_sequence) @warning
 ; Deprecated in v0.33.0-rc2:
 (#eq? @warning "\\\\e"))
(integer) @number
(float) @number

; Reserved identifiers
; TODO: when tree-sitter supports \`#any-of?\` in the Rust bindings,
; refactor this to use \`#any-of?\` rather than \`#match?\`
((identifier) @error
 (#any-of? @error "auto" "delegate" "derive" "else" "implement" "macro" "test"))

; Keywords
[
  (visibility_modifier) ; "pub"
  (opacity_modifier) ; "opaque"
  "as"
  "assert"
  "case"
  "const"
  "echo"
  "fn"
  "if"
  "import"
  "let"
  "panic"
  "todo"
  "type"
  "use"
] @keyword

; Operators
(binary_expression
  operator: _ @operator)
(boolean_negation "!" @operator)
(integer_negation "-" @operator)
`,
  injections: `; This file is auto-generated. Do not edit.
([
  (module_comment)
  (statement_comment)
] @injection.content
  (#set! injection.language "markdown")
  (#set! injection.combined))
`,
  locals: `; This file is auto-generated. Do not edit.
; Scopes
(block) @local.scope

(function) @local.scope

(case_clause) @local.scope

; Definitions
(let pattern: (identifier) @local.definition)
(function_parameter name: (identifier) @local.definition)
(list_pattern (identifier) @local.definition)
(list_pattern assign: (identifier) @local.definition)
(tuple_pattern (identifier) @local.definition)
(record_pattern_argument pattern: (identifier) @local.definition)

; References
(identifier) @local.reference`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-gleam", name: "tree-sitter-gleam", version: "0.26" }
};
var gleam_default = language;

export { gleam_default as default };
