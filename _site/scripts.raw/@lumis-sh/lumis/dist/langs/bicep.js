// langs/bicep.ts
var language = {
  id: "bicep",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Includes
[
  "import"
  "provider"
  "with"
  "as"
  "from"
] @keyword.import

; Namespaces
(module_declaration
  (identifier) @module)

; Builtins
(primitive_type) @type.builtin

((member_expression
  object: (identifier) @type.builtin)
  (#eq? @type.builtin "sys"))

; Functions
(call_expression
  function: (identifier) @function.call)

(user_defined_function
  name: (identifier) @function)

; Properties
(object_property
  (identifier) @property
  ":" @punctuation.delimiter
  (_))

(object_property
  (compatible_identifier) @property
  ":" @punctuation.delimiter
  (_))

(property_identifier) @property

; Attributes
(decorator
  "@" @attribute)

(decorator
  (call_expression
    (identifier) @attribute))

(decorator
  (call_expression
    (member_expression
      object: (identifier) @attribute
      property: (property_identifier) @attribute)))

; Types
(type_declaration
  (identifier) @type)

(type_declaration
  (identifier)
  "="
  (identifier) @type)

(type
  (identifier) @type)

(resource_declaration
  (identifier) @type)

(resource_expression
  (identifier) @type)

; Parameters
(parameter_declaration
  (identifier) @variable.parameter
  (_))

(call_expression
  function: (_)
  (arguments
    (identifier) @variable.parameter))

(call_expression
  function: (_)
  (arguments
    (member_expression
      object: (identifier) @variable.parameter)))

(parameter
  .
  (identifier) @variable.parameter)

; Variables
(variable_declaration
  (identifier) @variable
  (_))

(metadata_declaration
  (identifier) @variable
  (_))

(output_declaration
  (identifier) @variable
  (_))

(object_property
  (_)
  ":"
  (identifier) @variable)

(for_statement
  "for"
  (for_loop_parameters
    (loop_variable) @variable
    (loop_enumerator) @variable))

; Conditionals
"if" @keyword.conditional

(ternary_expression
  "?" @keyword.conditional.ternary
  ":" @keyword.conditional.ternary)

; Loops
(for_statement
  "for" @keyword.repeat
  "in"
  ":" @punctuation.delimiter)

; Keywords
[
  "module"
  "metadata"
  "output"
  "param"
  "resource"
  "existing"
  "targetScope"
  "type"
  "var"
  "using"
  "test"
] @keyword

"func" @keyword.function

"assert" @keyword.exception

; Operators
[
  "+"
  "-"
  "*"
  "/"
  "%"
  "||"
  "&&"
  "|"
  "=="
  "!="
  "=~"
  "!~"
  ">"
  ">="
  "<="
  "<"
  "??"
  "="
  "!"
  ".?"
] @operator

(subscript_expression
  "?" @operator)

(nullable_type
  "?" @operator)

"in" @keyword.operator

; Literals
(string) @string

(escape_sequence) @string.escape

(number) @number

(boolean) @boolean

(null) @constant.builtin

; Misc
(compatible_identifier
  "?" @punctuation.special)

(nullable_return_type) @punctuation.special

[
  "{"
  "}"
] @punctuation.bracket

[
  "["
  "]"
] @punctuation.bracket

[
  "("
  ")"
] @punctuation.bracket

[
  "."
  ":"
  "::"
  "=>"
] @punctuation.delimiter

; Interpolation
(interpolation) @none

(interpolation
  "\${" @punctuation.special
  "}" @punctuation.special)

(interpolation
  (identifier) @variable)

; Comments
[
  (comment)
  (diagnostic_comment)
] @comment `,
  injections: `; This file is auto-generated. Do not edit.
([
  (comment)
  (diagnostic_comment)
] @injection.content
  (#set! injection.language "comment"))`,
  locals: `; This file is auto-generated. Do not edit.
; Scopes
[
  (infrastructure)
  (call_expression)
  (lambda_expression)
  (subscript_expression)
  (if_statement)
  (for_statement)
  (array)
  (object)
  (interpolation)
] @local.scope

; References
(property_identifier) @local.reference

(call_expression
  (identifier) @local.reference)

(object_property
  (_)
  ":"
  (identifier) @local.reference)

(resource_expression
  (identifier) @local.reference)

; Definitions
(type) @local.definition.associated

(object_property
  (identifier) @local.definition.field
  (_))

(object_property
  (compatible_identifier) @local.definition.field
  (_))

(user_defined_function
  name: (identifier) @local.definition.function)

(module_declaration
  (identifier) @local.definition.namespace)

(parameter_declaration
  (identifier) @local.definition.parameter
  (_))

(parameter
  .
  (identifier) @local.definition.parameter)

(type_declaration
  (identifier) @local.definition.type
  (_))

(variable_declaration
  (identifier) @local.definition.var
  (_))

(metadata_declaration
  (identifier) @local.definition.var
  (_))

(output_declaration
  (identifier) @local.definition.var
  (_))

(for_statement
  "for"
  (for_loop_parameters
    (loop_variable) @local.definition.var
    (loop_enumerator) @local.definition.var))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-bicep", name: "tree-sitter-bicep", version: "0.26" }
};
var bicep_default = language;

export { bicep_default as default };
