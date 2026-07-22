'use strict';

// langs/rst.ts
var language = {
  id: "rst",
  aliases: ["restructuredtext"],
  highlights: `; This file is auto-generated. Do not edit.
; Marks
[
  ".."
  "|"
  "--"
  "__"
  ":"
  "::"
  (transition)
] @punctuation.special

"bullet" @markup.list

; Resets for injection
(doctest_block) @none

; Directives
(directive
  name: (type) @function)

(directive
  body: (body
    (arguments) @variable.parameter))

((directive
  name: (type) @keyword.import)
  (#eq? @keyword.import "include"))

(directive
  name: (type) @function.builtin
  (#any-of? @function.builtin
    ; https://docutils.sourceforge.io/docs/ref/rst/directives.html
    "attention" "caution" "danger" "error" "hint" "important" "note" "tip" "warning" "admonition"
    "image" "figure" "topic" "sidebar" "line-block" "parsed-literal" "code" "math" "rubric"
    "epigraph" "highlights" "pull-quote" "compound" "container" "table" "csv-table" "list-table"
    "contents" "sectnum" "section-numbering" "header" "footer" "target-notes" "meta" "replace"
    "unicode" "date" "raw" "class" "role" "default-role" "title" "restructuredtext-test-directive"))

; Blocks
[
  (literal_block)
  (line_block)
] @markup.raw.block

(block_quote
  (attribution)? @markup.italic) @markup.quote

(substitution_definition
  name: (substitution) @constant)

(footnote
  name: (label) @constant)

(citation
  name: (label) @constant)

(target
  name: (name)? @markup.link.label
  link: (_)? @markup.link)

; Lists
; Definition lists
(list_item
  (term) @markup.strong
  (classifier)? @markup.italic)

; Field lists
(field
  (field_name) @constant)

; Inline markup
(emphasis) @markup.italic

(strong) @markup.strong

(standalone_hyperlink) @string.special.url 

(role) @function

((role) @function.builtin
  (#any-of? @function.builtin
    ; https://docutils.sourceforge.io/docs/ref/rst/roles.html
    ":emphasis:" ":literal:" ":code:" ":math:" ":pep-reference:" ":PEP:" ":rfc-reference:" ":RFC:"
    ":strong:" ":subscript:" ":sub:" ":superscript:" ":sup:" ":title-reference:" ":title:" ":t:"
    ":raw:"))

[
  "interpreted_text"
  (literal)
] @markup.raw

; Prefix role
((interpreted_text
  (role) @_role
  "interpreted_text" @markup.italic)
  (#eq? @_role ":emphasis:"))

((interpreted_text
  (role) @_role
  "interpreted_text" @markup.strong)
  (#eq? @_role ":strong:"))

((interpreted_text
  (role) @_role
  "interpreted_text" @none)
  (#eq? @_role ":math:"))

; Suffix role
((interpreted_text
  "interpreted_text" @markup.italic
  (role) @_role)
  (#eq? @_role ":emphasis:"))

((interpreted_text
  "interpreted_text" @markup.strong
  (role) @_role)
  (#eq? @_role ":strong:"))

((interpreted_text
  "interpreted_text" @none
  (role) @_role)
  (#eq? @_role ":math:"))

[
  (inline_target)
  (substitution_reference)
  (footnote_reference)
  (citation_reference)
  (reference)
] @markup.link 

; Others
[
  (title)
  "adornment"
] @markup.heading

(comment) @comment 

(comment
  "..") @comment

(directive
  name: (type) @_directive
  body: (body
    (content) 
    (#not-any-of? @_directive "code" "code-block" "sourcecode")))

(paragraph) `,
  injections: `; This file is auto-generated. Do not edit.
((doctest_block) @injection.content
  (#set! injection.language "python"))

; Directives with nested content without arguments nor options
((directive
  name: (type) @_type
  body: (body) @injection.content)
  (#set! injection.language "rst")
  (#any-of? @_type
    "attention" "caution" "danger" "error" "hint" "important" "note" "tip" "warning" "admonition"
    "line-block" "parsed-literal" "epigraph" "highlights" "pull-quote" "compound" "header" "footer"
    "meta" "replace"))

; Directives with nested content without arguments, but with options
((directive
  name: (type) @_type
  body: (body
    (options)
    (content) @injection.content))
  (#set! injection.language "rst")
  (#any-of? @_type
    "attention" "caution" "danger" "error" "hint" "important" "note" "tip" "warning" "admonition"
    "line-block" "parsed-literal" "compound"))

; Directives with nested content with arguments and options
((directive
  name: (type) @_type
  body: (body
    (content) @injection.content))
  (#set! injection.language "rst")
  (#any-of? @_type
    "figure" "topic" "sidebar" "container" "table" "list-table" "class" "role"
    "restructuredtext-test-directive"))

; Special directives
((directive
  name: (type) @_type
  body: (body
    (arguments) @injection.language
    (content) @injection.content))
  (#any-of? @_type "raw" "code" "code-block" "sourcecode"))

((directive
  name: (type) @_type
  body: (body
    (content) @injection.content))
  (#set! injection.language "latex")
  (#eq? @_type "math"))

((directive
  name: (type) @_type
  body: (body
    (content) @injection.content))
  (#set! injection.language "csv")
  (#eq? @_type "csv-table"))

; Special roles - prefix
((interpreted_text
  (role) @_role
  "interpreted_text" @injection.content)
  (#eq? @_role ":math:")
  (#set! injection.language "latex"))

; Special roles - suffix
((interpreted_text
  "interpreted_text" @injection.content
  (role) @_role)
  (#eq? @_role ":math:")
  (#set! injection.language "latex"))

((comment) @injection.content
  (#set! injection.language "comment"))`,
  locals: `; This file is auto-generated. Do not edit.
; Scopes
(document) @local.scope

(directive) @local.scope

; Definitions
(title) @local.definition

(substitution_definition
  name: (substitution) @local.definition)

(footnote
  name: (label) @local.definition)

(citation
  name: (label) @local.definition)

(target
  name: (name) @local.definition)

; Inline targets
(inline_target) @local.definition

; The role directive can define a new role
((directive
  name: (type) @_type
  body: (body
    (arguments) @local.definition))
  (#eq? @_type "role"))

; References
[
  (substitution_reference)
  (footnote_reference)
  (citation_reference)
  (reference)
  (role)
] @local.reference`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-rst", name: "tree-sitter-rst", version: "0.26" }
};
var rst_default = language;

module.exports = rst_default;
