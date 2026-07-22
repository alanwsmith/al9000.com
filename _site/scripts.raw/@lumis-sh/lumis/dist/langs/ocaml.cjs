'use strict';

// langs/ocaml.ts
var language = {
  id: "ocaml",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Modules
;--------
[
  (module_name)
  (module_type_name)
] @module

; Types
;------
((type_constructor) @type.builtin
  (#any-of? @type.builtin
    "int" "char" "bytes" "string" "float" "bool" "unit" "exn" "array" "list" "option" "int32"
    "int64" "nativeint" "format6" "lazy_t"))

[
  (class_name)
  (class_type_name)
  (type_constructor)
] @type

[
  (constructor_name)
  (tag)
] @constructor

; Variables
;----------
[
  (value_name)
  (type_variable)
] @variable

(value_pattern) @variable.parameter

((value_pattern) @character.special
  (#eq? @character.special "_"))

; Functions
;----------
(let_binding
  pattern: (value_name) @function
  (parameter))

(let_binding
  pattern: (value_name) @function
  body: [
    (fun_expression)
    (function_expression)
  ])

(value_specification
  (value_name) @function)

(external
  (value_name) @function)

(method_name) @function.method

; Application
;------------
(infix_expression
  left: (value_path
    (value_name) @function.call)
  operator: (concat_operator) @_operator
  (#eq? @_operator "@@"))

(infix_expression
  operator: (rel_operator) @_operator
  right: (value_path
    (value_name) @function.call)
  (#eq? @_operator "|>"))

(application_expression
  function: (value_path
    (value_name) @function.call))

((value_name) @function.builtin
  (#any-of? @function.builtin "raise" "raise_notrace" "failwith" "invalid_arg"))

; Fields
;-------
[
  (field_name)
  (instance_variable_name)
] @variable.member

; Labels
; ------
(label_name) @label

; Constants
;----------
; Don't let normal parens take priority over this
((unit) @constant.builtin
  (#set! priority 105))

(boolean) @boolean

[
  (number)
  (signed_number)
] @number

(character) @character

(string) @string

(quoted_string
  "{" @string
  "}" @string) @string

(escape_sequence) @string.escape

[
  (conversion_specification)
  (pretty_printing_indication)
] @string.special

; Keywords
;---------
[
  "and"
  "as"
  "assert"
  "begin"
  "constraint"
  "end"
  "external"
  "in"
  "inherit"
  "initializer"
  "let"
  "match"
  "method"
  "module"
  "new"
  "of"
  "sig"
  "val"
  "when"
  "with"
] @keyword

[
  "object"
  "class"
  "struct"
  "type"
] @keyword.type

[
  "lazy"
  "mutable"
  "nonrec"
  "rec"
  "private"
  "virtual"
] @keyword.modifier

[
  "fun"
  "function"
  "functor"
] @keyword.function

[
  "if"
  "then"
  "else"
] @keyword.conditional

[
  "exception"
  "try"
] @keyword.exception

[
  "include"
  "open"
] @keyword.import

[
  "for"
  "to"
  "downto"
  "while"
  "do"
  "done"
] @keyword.repeat

; Punctuation
;------------
(attribute
  [
    "[@"
    "]"
  ] @punctuation.special)

(item_attribute
  [
    "[@@"
    "]"
  ] @punctuation.special)

(floating_attribute
  [
    "[@@@"
    "]"
  ] @punctuation.special)

(extension
  [
    "[%"
    "]"
  ] @punctuation.special)

(item_extension
  [
    "[%%"
    "]"
  ] @punctuation.special)

(quoted_extension
  [
    "{%"
    "}"
  ] @punctuation.special)

(quoted_item_extension
  [
    "{%%"
    "}"
  ] @punctuation.special)

"%" @punctuation.special

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  "[|"
  "|]"
  "[<"
  "[>"
] @punctuation.bracket

(object_type
  [
    "<"
    ">"
  ] @punctuation.bracket)

[
  ","
  "."
  ";"
  ":"
  "="
  "|"
  "~"
  "?"
  "+"
  "-"
  "!"
  ">"
  "&"
  "->"
  ";;"
  ":>"
  "+="
  ":="
  ".."
] @punctuation.delimiter

(range_pattern
  ".." @character.special)

; Operators
;----------
[
  (prefix_operator)
  (sign_operator)
  (pow_operator)
  (mult_operator)
  (add_operator)
  (concat_operator)
  (rel_operator)
  (and_operator)
  (or_operator)
  (assign_operator)
  (hash_operator)
  (indexing_operator)
  (let_operator)
  (match_operator)
] @operator

(match_expression
  (match_operator) @keyword)

(value_definition
  [
    (let_operator)
    (let_and_operator)
  ] @keyword)

[
  "*"
  "#"
  "::"
  "<-"
] @operator

; Attributes
;-----------
(attribute_id) @attribute

; Comments
;---------
[
  (comment)
  (line_number_directive)
  (directive)
] @comment 

(shebang) @keyword.directive`,
  injections: `; This file is auto-generated. Do not edit.
((comment) @injection.content
  (#set! injection.language "comment"))`,
  locals: `; This file is auto-generated. Do not edit.
; Scopes
;-------
[
  (compilation_unit)
  (structure)
  (signature)
  (module_binding)
  (functor)
  (let_binding)
  (match_case)
  (class_binding)
  (class_function)
  (method_definition)
  (let_expression)
  (fun_expression)
  (for_expression)
  (let_class_expression)
  (object_expression)
  (attribute_payload)
] @local.scope

; Definitions
;------------
(value_pattern) @local.definition.var

(let_binding
  pattern: (value_name) @local.definition.var
  (#set! definition.var.scope "parent"))

(let_binding
  pattern: (tuple_pattern
    (value_name) @local.definition.var)
  (#set! definition.var.scope "parent"))

(let_binding
  pattern: (record_pattern
    (field_pattern
      (value_name) @local.definition.var))
  (#set! definition.var.scope "parent"))

(external
  (value_name) @local.definition.var)

(type_binding
  (type_constructor) @local.definition.type)

(abstract_type
  (type_constructor) @local.definition.type)

(method_definition
  (method_name) @local.definition.method)

(module_binding
  (module_name) @local.definition.namespace
  (#set! definition.namespace.scope "parent"))

(module_parameter
  (module_name) @local.definition.namespace)

(module_type_definition
  (module_type_name) @local.definition.type)

; References
;------------
(value_path
  .
  (value_name) @local.reference
  (#set! reference.kind "var"))

(type_constructor_path
  .
  (type_constructor) @local.reference
  (#set! reference.kind "type"))

(method_invocation
  (method_name) @local.reference
  (#set! reference.kind "method"))

(module_path
  .
  (module_name) @local.reference
  (#set! reference.kind "type"))

(module_type_path
  .
  (module_type_name) @local.reference
  (#set! reference.kind "type"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-ocaml", name: "tree-sitter-ocaml", version: "0.26" }
};
var ocaml_default = language;

module.exports = ocaml_default;
