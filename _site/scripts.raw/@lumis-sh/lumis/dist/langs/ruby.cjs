'use strict';

// langs/ruby.ts
var language = {
  id: "ruby",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Variables
[
  (identifier)
  (global_variable)
] @variable

; Keywords
[
  "alias"
  "begin"
  "do"
  "end"
  "ensure"
  "module"
  "rescue"
  "then"
] @keyword

"class" @keyword.type

[
  "return"
  "yield"
] @keyword.return

[
  "and"
  "or"
  "in"
  "not"
] @keyword.operator

[
  "def"
  "undef"
] @keyword.function

(method
  "end" @keyword.function)

[
  "case"
  "else"
  "elsif"
  "if"
  "unless"
  "when"
  "then"
] @keyword.conditional

(in_clause
  "in" @keyword.conditional)

(if
  "end" @keyword.conditional)

[
  "for"
  "until"
  "while"
  "break"
  "redo"
  "retry"
  "next"
] @keyword.repeat

(in
  "in" @keyword.repeat)

(constant) @constant

((identifier) @keyword.modifier
  (#any-of? @keyword.modifier "private" "protected" "public"))

[
  "rescue"
  "ensure"
] @keyword.exception

; Function calls
"defined?" @function

(call
  receiver: (constant)? @type
  method: [
    (identifier)
    (constant)
  ] @function.call)

(program
  (call
    (identifier) @keyword.import)
  (#any-of? @keyword.import "require" "require_relative" "load"))

; Function definitions
(alias
  (identifier) @function)

(setter
  (identifier) @function)

(method
  name: [
    (identifier) @function
    (constant) @type
  ])

(singleton_method
  name: [
    (identifier) @function
    (constant) @type
  ])

(class
  name: (constant) @type)

(module
  name: (constant) @type)

(superclass
  (constant) @type)

; Identifiers
[
  (class_variable)
  (instance_variable)
] @variable.member

((identifier) @constant.builtin
  (#any-of? @constant.builtin
    "__callee__" "__dir__" "__id__" "__method__" "__send__" "__ENCODING__" "__FILE__" "__LINE__"))

((identifier) @function.builtin
  (#any-of? @function.builtin "attr_reader" "attr_writer" "attr_accessor" "module_function"))

((call
  !receiver
  method: (identifier) @function.builtin)
  (#any-of? @function.builtin "include" "extend" "prepend" "refine" "using"))

((identifier) @keyword.exception
  (#any-of? @keyword.exception "raise" "fail" "catch" "throw"))

((constant) @type
  (#not-match? @type "^[A-Z0-9_]+$"))

[
  (self)
  (super)
] @variable.builtin

(method_parameters
  (identifier) @variable.parameter)

(lambda_parameters
  (identifier) @variable.parameter)

(block_parameters
  (identifier) @variable.parameter)

(splat_parameter
  (identifier) @variable.parameter)

(hash_splat_parameter
  (identifier) @variable.parameter)

(optional_parameter
  (identifier) @variable.parameter)

(destructured_parameter
  (identifier) @variable.parameter)

(block_parameter
  (identifier) @variable.parameter)

(keyword_parameter
  (identifier) @variable.parameter)

; Literals
[
  (string_content)
  (heredoc_content)
  "\\""
  "\`"
] @string

[
  (heredoc_beginning)
  (heredoc_end)
] @label

[
  (bare_symbol)
  (simple_symbol)
  (hash_key_symbol)
] @string.special.symbol

(delimited_symbol
  ":\\"" @string.special.symbol
  (string_content) @string.special.symbol
  "\\"" @string.special.symbol)

(regex
  (string_content) @string.regexp)

(escape_sequence) @string.escape

(integer) @number

(float) @number.float

[
  (true)
  (false)
] @boolean

(nil) @constant.builtin

(comment) @comment 

((program
  .
  (comment) @keyword.directive )
  (#match? @keyword.directive "^#!/"))

(program
  (comment)+ @comment.documentation
  (class))

(module
  (comment)+ @comment.documentation
  (body_statement
    (class)))

(class
  (comment)+ @comment.documentation
  (body_statement
    (method)))

(body_statement
  (comment)+ @comment.documentation
  (method))

; Operators
[
  "!"
  "="
  "=="
  "==="
  "<=>"
  "=>"
  "->"
  ">>"
  "<<"
  ">"
  "<"
  ">="
  "<="
  "**"
  "*"
  "/"
  "%"
  "+"
  "-"
  "&"
  "|"
  "^"
  "&&"
  "||"
  "||="
  "&&="
  "!="
  "%="
  "+="
  "-="
  "*="
  "/="
  "=~"
  "!~"
  "?"
  ":"
  ".."
  "..."
] @operator

[
  ","
  ";"
  "."
  "&."
  "::"
] @punctuation.delimiter

(regex
  "/" @punctuation.bracket)

(pair
  ":" @punctuation.delimiter)

(keyword_pattern
  ":" @punctuation.delimiter)

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  "%w("
  "%i("
] @punctuation.bracket

(block_parameters
  "|" @punctuation.bracket)

(interpolation
  "#{" @punctuation.special
  "}" @punctuation.special)`,
  injections: `; This file is auto-generated. Do not edit.
((comment) @injection.content
  (#set! injection.language "comment"))

((comment) @injection.content
  (#match? @injection.content "^#:")
  (#set! injection.language "rbs"))

((comment) @injection.content
  (#match? @injection.content "^#\\s+@rbs")
  (#set! injection.language "rbs"))

((comment) @injection.content
  (#match? @injection.content "^#\\s+|")
  (#set! injection.language "rbs"))

(heredoc_body
  (heredoc_content) @injection.content
  (heredoc_end) @injection.language)

(regex
  (string_content) @injection.content
  (#set! injection.language "regex"))

((call
  receiver: (identifier) @_receiver
  method: (identifier) @_method
  arguments: (argument_list
    (pair
      key: (hash_key_symbol)
      value: (string
        (string_content) @injection.content))))
  (#eq? @_receiver "binding")
  (#any-of? @_method "b" "break")
  (#set! injection.self))`,
  locals: `; This file is auto-generated. Do not edit.
; The MIT License (MIT)
;
; Copyright (c) 2016 Rob Rix
;
; Permission is hereby granted, free of charge, to any person obtaining a copy
; of this software and associated documentation files (the "Software"), to deal
; in the Software without restriction, including without limitation the rights
; to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
; copies of the Software, and to permit persons to whom the Software is
; furnished to do so, subject to the following conditions:
; 
; The above copyright notice and this permission notice shall be included in all
; copies or substantial portions of the Software.
; 
; THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
; IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
; FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
; AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
; LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
; OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
; SOFTWARE.
; DECLARATIONS AND SCOPES
(method) @local.scope

(class) @local.scope

[
  (block)
  (do_block)
] @local.scope

(identifier) @local.reference

(constant) @local.reference

(instance_variable) @local.reference

(module
  name: (constant) @local.definition.namespace)

(class
  name: (constant) @local.definition.type)

(method
  name: [
    (identifier)
    (constant)
  ] @local.definition.function)

(singleton_method
  name: [
    (identifier)
    (constant)
  ] @local.definition.function)

(method_parameters
  (identifier) @local.definition.var)

(lambda_parameters
  (identifier) @local.definition.var)

(block_parameters
  (identifier) @local.definition.var)

(splat_parameter
  (identifier) @local.definition.var)

(hash_splat_parameter
  (identifier) @local.definition.var)

(optional_parameter
  name: (identifier) @local.definition.var)

(destructured_parameter
  (identifier) @local.definition.var)

(block_parameter
  name: (identifier) @local.definition.var)

(keyword_parameter
  name: (identifier) @local.definition.var)

(assignment
  left: (_) @local.definition.var)

(left_assignment_list
  (identifier) @local.definition.var)

(rest_assignment
  (identifier) @local.definition.var)

(destructured_left_assignment
  (identifier) @local.definition.var)`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-ruby", name: "tree-sitter-ruby", version: "0.26" }
};
var ruby_default = language;

module.exports = ruby_default;
