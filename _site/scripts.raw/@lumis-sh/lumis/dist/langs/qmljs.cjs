'use strict';

// langs/qmljs.ts
var language = {
  id: "qmljs",
  aliases: ["qml"],
  highlights: `; This file is auto-generated. Do not edit.
; inherits: ecma
; Types
; Javascript
; Variables
;-----------
(identifier) @variable

; Properties
;-----------
(property_identifier) @variable.member

(shorthand_property_identifier) @variable.member

(private_property_identifier) @variable.member

(object_pattern
  (shorthand_property_identifier_pattern) @variable)

(object_pattern
  (object_assignment_pattern
    (shorthand_property_identifier_pattern) @variable))

; Special identifiers
;--------------------
((identifier) @type
  (#match? @type "^[A-Z]"))

((identifier) @constant
  (#match? @constant "^_*[A-Z][A-Z\\d_]*$"))

((shorthand_property_identifier) @constant
  (#match? @constant "^_*[A-Z][A-Z\\d_]*$"))

((identifier) @variable.builtin
  (#any-of? @variable.builtin "arguments" "module" "console" "window" "document"))

((identifier) @type.builtin
  (#any-of? @type.builtin
    "Object" "Function" "Boolean" "Symbol" "Number" "Math" "Date" "String" "RegExp" "Map" "Set"
    "WeakMap" "WeakSet" "Promise" "Array" "Int8Array" "Uint8Array" "Uint8ClampedArray" "Int16Array"
    "Uint16Array" "Int32Array" "Uint32Array" "Float32Array" "Float64Array" "ArrayBuffer" "DataView"
    "Error" "EvalError" "InternalError" "RangeError" "ReferenceError" "SyntaxError" "TypeError"
    "URIError"))

(statement_identifier) @label

; Function and method definitions
;--------------------------------
(function_expression
  name: (identifier) @function)

(function_declaration
  name: (identifier) @function)

(generator_function
  name: (identifier) @function)

(generator_function_declaration
  name: (identifier) @function)

(method_definition
  name: [
    (property_identifier)
    (private_property_identifier)
  ] @function.method)

(method_definition
  name: (property_identifier) @constructor
  (#eq? @constructor "constructor"))

(pair
  key: (property_identifier) @function.method
  value: (function_expression))

(pair
  key: (property_identifier) @function.method
  value: (arrow_function))

(assignment_expression
  left: (member_expression
    property: (property_identifier) @function.method)
  right: (arrow_function))

(assignment_expression
  left: (member_expression
    property: (property_identifier) @function.method)
  right: (function_expression))

(variable_declarator
  name: (identifier) @function
  value: (arrow_function))

(variable_declarator
  name: (identifier) @function
  value: (function_expression))

(assignment_expression
  left: (identifier) @function
  right: (arrow_function))

(assignment_expression
  left: (identifier) @function
  right: (function_expression))

; Function and method calls
;--------------------------
(call_expression
  function: (identifier) @function.call)

(call_expression
  function: (member_expression
    property: [
      (property_identifier)
      (private_property_identifier)
    ] @function.method.call))

(call_expression
  function: (await_expression
    (identifier) @function.call))

(call_expression
  function: (await_expression
    (member_expression
      property: [
        (property_identifier)
        (private_property_identifier)
      ] @function.method.call)))

; Builtins
;---------
((identifier) @module.builtin
  (#eq? @module.builtin "Intl"))

((identifier) @function.builtin
  (#any-of? @function.builtin
    "eval" "isFinite" "isNaN" "parseFloat" "parseInt" "decodeURI" "decodeURIComponent" "encodeURI"
    "encodeURIComponent" "require"))

; Constructor
;------------
(new_expression
  constructor: (identifier) @constructor)

; Decorators
;----------
(decorator
  "@" @attribute
  (identifier) @attribute)

(decorator
  "@" @attribute
  (call_expression
    (identifier) @attribute))

(decorator
  "@" @attribute
  (member_expression
    (property_identifier) @attribute))

(decorator
  "@" @attribute
  (call_expression
    (member_expression
      (property_identifier) @attribute)))

; Literals
;---------
[
  (this)
  (super)
] @variable.builtin

((identifier) @variable.builtin
  (#eq? @variable.builtin "self"))

[
  (true)
  (false)
] @boolean

[
  (null)
  (undefined)
] @constant.builtin

[
  (comment)
  (html_comment)
] @comment 

((comment) @comment.documentation
  (#match? @comment.documentation "^/[*][*][^*].*[*]/$"))

(hash_bang_line) @keyword.directive

((string_fragment) @keyword.directive
  (#eq? @keyword.directive "use strict"))

(string) @string

(template_string) @string

(escape_sequence) @string.escape

(regex_pattern) @string.regexp

(regex_flags) @character.special

(regex
  "/" @punctuation.bracket) ; Regex delimiters

(number) @number

((identifier) @number
  (#any-of? @number "NaN" "Infinity"))

; Punctuation
;------------
[
  ";"
  "."
  ","
  ":"
] @punctuation.delimiter

[
  "--"
  "-"
  "-="
  "&&"
  "+"
  "++"
  "+="
  "&="
  "/="
  "**="
  "<<="
  "<"
  "<="
  "<<"
  "="
  "=="
  "==="
  "!="
  "!=="
  "=>"
  ">"
  ">="
  ">>"
  "||"
  "%"
  "%="
  "*"
  "**"
  ">>>"
  "&"
  "|"
  "^"
  "??"
  "*="
  ">>="
  ">>>="
  "^="
  "|="
  "&&="
  "||="
  "??="
  "..."
] @operator

(binary_expression
  "/" @operator)

(ternary_expression
  [
    "?"
    ":"
  ] @keyword.conditional.ternary)

(unary_expression
  [
    "!"
    "~"
    "-"
    "+"
  ] @operator)

(unary_expression
  [
    "delete"
    "void"
  ] @keyword.operator)

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

(template_substitution
  [
    "\${"
    "}"
  ] @punctuation.special) @none

; Imports
;----------
(namespace_import
  "*" @character.special
  (identifier) @module)

(namespace_export
  "*" @character.special
  (identifier) @module)

(export_statement
  "*" @character.special)

; Keywords
;----------
[
  "if"
  "else"
  "switch"
  "case"
] @keyword.conditional

[
  "import"
  "from"
  "as"
  "export"
] @keyword.import

[
  "for"
  "of"
  "do"
  "while"
  "continue"
] @keyword.repeat

[
  "break"
  "const"
  "debugger"
  "extends"
  "get"
  "let"
  "set"
  "static"
  "target"
  "var"
  "with"
] @keyword

"class" @keyword.type

[
  "async"
  "await"
] @keyword.coroutine

[
  "return"
  "yield"
] @keyword.return

"function" @keyword.function

[
  "new"
  "delete"
  "in"
  "instanceof"
  "typeof"
] @keyword.operator

[
  "throw"
  "try"
  "catch"
  "finally"
] @keyword.exception

(export_statement
  "default" @keyword)

(switch_default
  "default" @keyword.conditional)

"pragma" @keyword.import

; Annotations
(ui_annotation
  "@" @operator
  type_name: [
    (identifier) @attribute
    (nested_identifier
      (identifier) @attribute)
  ])

; type
(ui_property
  type: (type_identifier) @type)

; Properties
(ui_object_definition_binding
  name: [
    (identifier) @property
    (nested_identifier
      (identifier) @property)
  ])

(ui_binding
  name: [
    (identifier) @property
    (nested_identifier
      (identifier) @property)
  ])

; locals query appears not working unless id: <ref> isn't a parameter.
(ui_binding
  name: (identifier) @property
  (#eq? @property "id")
  value: (expression_statement
    (identifier) @variable))

(ui_property
  name: (identifier) @property)

(ui_required
  name: (identifier) @property)

(ui_list_property_type
  [
    "<"
    ">"
  ] @punctuation.bracket)

; Signals
(ui_signal
  name: (identifier) @function)

(ui_signal_parameter
  (identifier) @variable)

; ui_object_definition
(ui_object_definition
  type_name: (identifier) @type)

(ui_object_definition
  type_name: (nested_identifier) @type)

; namespace
(nested_identifier
  (nested_identifier
    (identifier) @module))

; Tokens
;-------
[
  "abstract"
  "private"
  "protected"
  "public"
  "default"
  "readonly"
  "required"
] @keyword.modifier

; from typescript
(type_identifier) @type

(predefined_type) @type.builtin

(type_arguments
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

; Variables
(required_parameter
  (identifier) @variable)

(optional_parameter
  (identifier) @variable)

; Keywords
[
  "on"
  "property"
  "signal"
  "declare"
  "implements"
  "override"
] @keyword

[
  "interface"
  "type"
  "enum"
  "namespace"
] @keyword.type

"keyof" @keyword.operator`,
  injections: `; This file is auto-generated. Do not edit.
; inherits: ecma
(((comment) @_jsdoc_comment
  (#match? @_jsdoc_comment "^/[*][*][^*].*[*]/$")) @injection.content
  (#set! injection.language "jsdoc"))

((comment) @injection.content
  (#set! injection.language "comment"))

; html(\`...\`), html\`...\`, sql(\`...\`), etc.
(call_expression
  function: (identifier) @injection.language
  arguments: [
    (arguments
      (template_string) @injection.content)
    (template_string) @injection.content
  ]
  (#match? @injection.language "^[a-zA-Z][a-zA-Z0-9]*$")
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.include-children)
  ; Languages excluded from auto-injection due to special rules
  ; - svg uses the html parser
  ; - css uses the styled parser
  (#not-any-of? @injection.language "svg" "css"))

; svg\`...\` or svg(\`...\`)
(call_expression
  function: (identifier) @_name
  (#eq? @_name "svg")
  arguments: [
    (arguments
      (template_string) @injection.content)
    (template_string) @injection.content
  ]
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.include-children)
  (#set! injection.language "html"))

; Vercel PostgreSQL
; foo.sql\`...\` or foo.sql(\`...\`)
(call_expression
  function: (member_expression
    property: (property_identifier) @injection.language)
  arguments: [
    (arguments
      (template_string) @injection.content)
    (template_string) @injection.content
  ]
  (#eq? @injection.language "sql")
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.include-children))

; Sanity CMS GROQ query
; defineQuery(\`...\`)
(call_expression
  function: (identifier) @_name
  (#eq? @_name "defineQuery")
  arguments: (arguments
    (template_string) @injection.content)
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.include-children)
  (#set! injection.language "groq"))

; gql\`...\` or gql(\`...\`)
(call_expression
  function: (identifier) @_name
  (#eq? @_name "gql")
  arguments: [
    (arguments
      (template_string) @injection.content)
    (template_string) @injection.content
  ]
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.include-children)
  (#set! injection.language "graphql"))

(call_expression
  function: (identifier) @_name
  (#eq? @_name "hbs")
  arguments: (template_string) @injection.content
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.include-children)
  (#set! injection.language "glimmer"))

; css\`<css>\`, keyframes\`<css>\`
(call_expression
  function: (identifier) @_name
  (#any-of? @_name "css" "keyframes")
  arguments: (template_string) @injection.content
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.include-children)
  (#set! injection.language "styled"))

; styled.div\`<css>\`
(call_expression
  function: (member_expression
    object: (identifier) @_name
    (#eq? @_name "styled"))
  arguments: ((template_string) @injection.content
    (#offset! @injection.content 0 1 0 -1)
    (#set! injection.include-children)
    (#set! injection.language "styled")))

; styled(Component)\`<css>\`
(call_expression
  function: (call_expression
    function: (identifier) @_name
    (#eq? @_name "styled"))
  arguments: ((template_string) @injection.content
    (#offset! @injection.content 0 1 0 -1)
    (#set! injection.include-children)
    (#set! injection.language "styled")))

; styled.div.attrs({ prop: "foo" })\`<css>\`
(call_expression
  function: (call_expression
    function: (member_expression
      object: (member_expression
        object: (identifier) @_name
        (#eq? @_name "styled"))))
  arguments: ((template_string) @injection.content
    (#offset! @injection.content 0 1 0 -1)
    (#set! injection.include-children)
    (#set! injection.language "styled")))

; styled(Component).attrs({ prop: "foo" })\`<css>\`
(call_expression
  function: (call_expression
    function: (member_expression
      object: (call_expression
        function: (identifier) @_name
        (#eq? @_name "styled"))))
  arguments: ((template_string) @injection.content
    (#offset! @injection.content 0 1 0 -1)
    (#set! injection.include-children)
    (#set! injection.language "styled")))

((regex_pattern) @injection.content
  (#set! injection.language "regex"))

; ((comment) @_gql_comment
;   (#eq? @_gql_comment "/* GraphQL */")
;   (template_string) @injection.content
;   (#set! injection.language "graphql"))
((template_string) @injection.content
  (#match? @injection.content "^\`#graphql")
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.include-children)
  (#set! injection.language "graphql"))

; el.innerHTML = \`<html>\`
(assignment_expression
  left: (member_expression
    property: (property_identifier) @_prop
    (#any-of? @_prop "outerHTML" "innerHTML"))
  right: (template_string) @injection.content
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.include-children)
  (#set! injection.language "html"))

; el.innerHTML = '<html>'
(assignment_expression
  left: (member_expression
    property: (property_identifier) @_prop
    (#any-of? @_prop "outerHTML" "innerHTML"))
  right: (string
    (string_fragment) @injection.content)
  (#set! injection.language "html"))

;---- Angular injections -----
; @Component({
;   template: \`<html>\`
; })
(decorator
  (call_expression
    function: ((identifier) @_name
      (#eq? @_name "Component"))
    arguments: (arguments
      (object
        (pair
          key: ((property_identifier) @_prop
            (#eq? @_prop "template"))
          value: ((template_string) @injection.content
            (#offset! @injection.content 0 1 0 -1)
            (#set! injection.include-children)
            (#set! injection.language "angular")))))))

; @Component({
;   styles: [\`<css>\`]
; })
(decorator
  (call_expression
    function: ((identifier) @_name
      (#eq? @_name "Component"))
    arguments: (arguments
      (object
        (pair
          key: ((property_identifier) @_prop
            (#eq? @_prop "styles"))
          value: (array
            ((template_string) @injection.content
              (#offset! @injection.content 0 1 0 -1)
              (#set! injection.include-children)
              (#set! injection.language "css"))))))))

; @Component({
;   styles: \`<css>\`
; })
(decorator
  (call_expression
    function: ((identifier) @_name
      (#eq? @_name "Component"))
    arguments: (arguments
      (object
        (pair
          key: ((property_identifier) @_prop
            (#eq? @_prop "styles"))
          value: ((template_string) @injection.content
            (#set! injection.include-children)
            (#offset! @injection.content 0 1 0 -1)
            (#set! injection.language "css")))))))
`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-qmljs", name: "tree-sitter-qmljs", version: "0.26" }
};
var qmljs_default = language;

module.exports = qmljs_default;
