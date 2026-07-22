// langs/python.ts
var language = {
  id: "python",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Identifier naming conventions

(identifier) @variable

((identifier) @constructor
 (#match? @constructor "^[A-Z]"))

((identifier) @constant
 (#match? @constant "^[A-Z][A-Z_]*$"))

; Function calls

(decorator) @function
(decorator
  (identifier) @function)

(call
  function: (attribute attribute: (identifier) @function.method))
(call
  function: (identifier) @function)

; Builtin functions

((call
  function: (identifier) @function.builtin)
 (#match?
   @function.builtin
   "^(abs|all|any|ascii|bin|bool|breakpoint|bytearray|bytes|callable|chr|classmethod|compile|complex|delattr|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip|__import__)$"))

; Function definitions

(function_definition
  name: (identifier) @function)

(attribute attribute: (identifier) @property)
(type (identifier) @type)

; Literals

[
  (none)
  (true)
  (false)
] @constant.builtin

[
  (integer)
  (float)
] @number

(comment) @comment
(string) @string
(escape_sequence) @escape

(interpolation
  "{" @punctuation.special
  "}" @punctuation.special) @embedded

[
  "-"
  "-="
  "!="
  "*"
  "**"
  "**="
  "*="
  "/"
  "//"
  "//="
  "/="
  "&"
  "&="
  "%"
  "%="
  "^"
  "^="
  "+"
  "->"
  "+="
  "<"
  "<<"
  "<<="
  "<="
  "<>"
  "="
  ":="
  "=="
  ">"
  ">="
  ">>"
  ">>="
  "|"
  "|="
  "~"
  "@="
  "and"
  "in"
  "is"
  "not"
  "or"
  "is not"
  "not in"
] @operator

[
  "as"
  "assert"
  "async"
  "await"
  "break"
  "class"
  "continue"
  "def"
  "del"
  "elif"
  "else"
  "except"
  "exec"
  "finally"
  "for"
  "from"
  "global"
  "if"
  "import"
  "lambda"
  "nonlocal"
  "pass"
  "print"
  "raise"
  "return"
  "try"
  "while"
  "with"
  "yield"
  "match"
  "case"
] @keyword`,
  injections: `; This file is auto-generated. Do not edit.
(call
  function: (attribute
    object: (identifier) @_re)
  arguments: (argument_list
    .
    (string
      (string_content) @injection.content))
  (#eq? @_re "re")
  (#set! injection.language "regex"))

((binary_operator
  left: (string
    (string_content) @injection.content)
  operator: "%")
  (#set! injection.language "printf"))

((comment) @injection.content
  (#set! injection.language "comment"))`,
  locals: `; This file is auto-generated. Do not edit.
; Program structure
(module) @local.scope

(class_definition
  body: (block
    (expression_statement
      (assignment
        left: (identifier) @local.definition.field)))) @local.scope

(class_definition
  body: (block
    (expression_statement
      (assignment
        left: (_
          (identifier) @local.definition.field))))) @local.scope

; Imports
(aliased_import
  alias: (identifier) @local.definition.import) @local.scope

(import_statement
  name: (dotted_name
    (identifier) @local.definition.import)) @local.scope

(import_from_statement
  name: (dotted_name
    (identifier) @local.definition.import)) @local.scope

; Function with parameters, defines parameters
(parameters
  (identifier) @local.definition.parameter)

(default_parameter
  (identifier) @local.definition.parameter)

(typed_parameter
  (identifier) @local.definition.parameter)

(typed_default_parameter
  (identifier) @local.definition.parameter)

; *args parameter
(parameters
  (list_splat_pattern
    (identifier) @local.definition.parameter))

; **kwargs parameter
(parameters
  (dictionary_splat_pattern
    (identifier) @local.definition.parameter))

; Function defines function and scope
((function_definition
  name: (identifier) @local.definition.function) @local.scope
  (#set! definition.function.scope "parent"))

((class_definition
  name: (identifier) @local.definition.type) @local.scope
  (#set! definition.type.scope "parent"))

(class_definition
  body: (block
    (function_definition
      name: (identifier) @local.definition.method)))

; Loops
; not a scope!
(for_statement
  left: (pattern_list
    (identifier) @local.definition.var))

(for_statement
  left: (tuple_pattern
    (identifier) @local.definition.var))

(for_statement
  left: (identifier) @local.definition.var)

; not a scope!
;(while_statement) @local.scope
; for in list comprehension
(for_in_clause
  left: (identifier) @local.definition.var)

(for_in_clause
  left: (tuple_pattern
    (identifier) @local.definition.var))

(for_in_clause
  left: (pattern_list
    (identifier) @local.definition.var))

(dictionary_comprehension) @local.scope

(list_comprehension) @local.scope

(set_comprehension) @local.scope

; Assignments
(assignment
  left: (identifier) @local.definition.var)

(assignment
  left: (pattern_list
    (identifier) @local.definition.var))

(assignment
  left: (tuple_pattern
    (identifier) @local.definition.var))

(assignment
  left: (attribute
    (identifier)
    (identifier) @local.definition.field))

; Walrus operator  x := 1
(named_expression
  (identifier) @local.definition.var)

(as_pattern
  alias: (as_pattern_target) @local.definition.var)

; REFERENCES
(identifier) @local.reference`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)

(((string_start) @open
  (string_end) @close)
  (#set! rainbow.exclude))`,
  wasm: { packageName: "@lumis-sh/wasm-python", name: "tree-sitter-python", version: "0.26" }
};
var python_default = language;

export { python_default as default };
