// langs/heex.ts
var language = {
  id: "heex",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; HEEx delimiters
[
  "%>"
  "--%>"
  "-->"
  "/>"
  "<!"
  "<!--"
  "<"
  "<%!--"
  "<%"
  "<%#"
  "<%%="
  "<%="
  "</"
  "</:"
  "<:"
  ">"
  "{"
  "}"
] @tag.delimiter

; HEEx operators are highlighted as such
"=" @operator

; HEEx inherits the DOCTYPE tag from HTML
(doctype) @constant

; HEEx comments are highlighted as such
(comment) @comment 

; HEEx text content is treated as markup
; (text) @none
; HEEx tags and slots are highlighted as HTML
[
  (tag_name)
  (slot_name)
] @tag

; HEEx attributes are highlighted as HTML attributes
(attribute_name) @tag.attribute

[
  (attribute_value)
  (quoted_attribute_value)
] @string

; HEEx components are highlighted as modules and function calls
(component_name
  [
    (module) @type
    (function) @function
    "." @punctuation.delimiter
  ])`,
  injections: `; This file is auto-generated. Do not edit.
; directives are standalone tags like '<%= @x %>'
;
; partial_expression_values are elixir code that is part of an expression that
; spans multiple directive nodes, so they must be combined. For example:
;     <%= if true do %>
;       <p>hello, tree-sitter!</p>
;     <% end %>
(directive
  [
    (partial_expression_value)
    (ending_expression_value)
  ] @injection.content
  (#set! injection.language "elixir")
  (#set! injection.include-children)
  (#set! injection.combined))

; Regular expression_values do not need to be combined
((directive
  (expression_value) @injection.content)
  (#set! injection.language "elixir"))

; expressions live within HTML tags, and do not need to be combined
;     <link href={ Routes.static_path(..) } />
(expression
  (expression_value) @injection.content
  (#set! injection.language "elixir"))

; HEEx comments
((comment) @injection.content
  (#set! injection.language "comment"))`,
  locals: `; This file is auto-generated. Do not edit.
; HEEx tags, components, and slots are references
[
  (component_name)
  (slot_name)
  (tag_name)
] @local.reference

; Create a new scope within each HEEx tag, component, and slot
[
  (component)
  (slot)
  (tag)
] @local.scope`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)

("<" @open
  ">" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-heex", name: "tree-sitter-heex", version: "0.26" }
};
var heex_default = language;

export { heex_default as default };
