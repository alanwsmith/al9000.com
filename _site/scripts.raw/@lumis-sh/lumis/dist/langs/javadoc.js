// langs/javadoc.ts
var language = {
  id: "javadoc",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
[
  (tag_name)
  "include"
  "exclude"
]  @keyword

(identifier)  @variable

(fragment)  @variable.member

(parameter
  name: (identifier) @variable.parameter)

(param_tag
  parameter_name: (identifier) @variable.parameter)

[
  (boolean_type)
  (integral_type)
  (floating_point_type)
]  @type.builtin

(module
  (identifier) @module)

(type
  (identifier) @type)

(type_parameter
  (identifier) @type)

(method
  (identifier) @function)

(member
  (identifier) @variable.member)

[
  (string_literal)
  (indexword)
]  @string

[
  (bare_format_string)
  (literal_format_string)
]  @string.special

(url)  @markup.link.url

(attribute
  name: (identifier)  @property)

(system_property)  @property

(unsigned_integer) @number

(code)  @markup.raw

[
  "="
  ":"
] @operator

[
  "/"
  "."
  ","
  "..."
  "#"
  "##"
] @punctuation.delimiter

[
  "{"
  "}"
  "("
  ")"
  "["
  "]"
] @punctuation.bracket

(param_tag
  [
    "<"
    ">"
  ] @punctuation.bracket)`,
  injections: `; This file is auto-generated. Do not edit.
; @value tags without double-quotes
((bare_format_string) @injection.content
  (#set! injection.language "printf"))

; @value tags with double quotes
((literal_format_string) @injection.content
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.language "printf"))

; injected code snippets
((snippet_tag
  (attributes
    (attribute
      name: (identifier) @_attribute_key
      value: (attribute_value
        [
          (identifier) @injection.language
          (string_literal
            (quoted_value) @injection.language)
        ])))
  body: (description) @injection.content)
  (#eq? @_attribute_key "lang"))

; html content
((description) @injection.content
  (#set! injection.language "html"))

; markdown content
((markdown_description) @injection.content
  (#set! injection.language "markdown_inline"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-javadoc", name: "tree-sitter-javadoc", version: "0.26" }
};
var javadoc_default = language;

export { javadoc_default as default };
