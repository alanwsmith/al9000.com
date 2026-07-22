'use strict';

// langs/liquid.ts
var language = {
  id: "liquid",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
((comment) @comment 
  (#set! priority 110))

(raw_statement
  (raw_content) 
  (#set! priority 110))

((identifier) @variable
  (#set! priority 110))

((string) @string
  (#set! priority 110))

((boolean) @boolean
  (#set! priority 110))

((number) @number
  (#set! priority 110))

(filter
  name: (identifier) @function.call
  (#set! priority 110))

([
  "as"
  "assign"
  "capture"
  (custom_unpaired_statement)
  "decrement"
  "echo"
  "endcapture"
  "endform"
  "endjavascript"
  "endraw"
  "endschema"
  "endstyle"
  "form"
  "increment"
  "javascript"
  "layout"
  "liquid"
  "raw"
  "schema"
  "style"
  "with"
] @keyword
  (#set! priority 110))

([
  "case"
  "else"
  "elsif"
  "endcase"
  "endif"
  "endunless"
  "if"
  "unless"
  "when"
] @keyword.conditional
  (#set! priority 110))

([
  (break_statement)
  (continue_statement)
  "by"
  "cycle"
  "endfor"
  "endpaginate"
  "endtablerow"
  "for"
  "paginate"
  "tablerow"
] @keyword.repeat
  (#set! priority 110))

([
  "and"
  "contains"
  "in"
  "or"
] @keyword.operator
  (#set! priority 110))

([
  "{{"
  "}}"
  "{{-"
  "-}}"
  "{%"
  "%}"
  "{%-"
  "-%}"
] @tag.delimiter
  (#set! priority 110))

[
  "include"
  "include_relative"
  "render"
  "section"
  "sections"
] @keyword.import

[
  "|"
  ":"
  "="
  "+"
  "-"
  "*"
  "/"
  "%"
  "^"
  "=="
  "<"
  "<="
  "!="
  ">="
  ">"
] @operator

[
  "]"
  "["
  ")"
  "("
] @punctuation.bracket

[
  ","
  "."
] @punctuation.delimiter

(front_matter) @keyword.directive`,
  injections: `; This file is auto-generated. Do not edit.
((template_content) @injection.content
  (#set! injection.language "html")
  (#set! injection.combined))

; TODO we can switch to quantifiers once neovim 0.10 becomes stable
(javascript_statement
  (js_content) @injection.content
  (#set! injection.language "javascript")
  (#set! injection.combined))

(schema_statement
  (json_content) @injection.content
  (#set! injection.language "json")
  (#set! injection.combined))

(style_statement
  (style_content) @injection.content
  (#set! injection.language "css")
  (#set! injection.combined))

((front_matter) @injection.content
  (#set! injection.language "yaml")
  (#offset! @injection.content 1 0 -1 0)
  (#set! injection.include-children))

((comment) @injection.content
  (#set! injection.language "comment"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-liquid", name: "tree-sitter-liquid", version: "0.26" }
};
var liquid_default = language;

module.exports = liquid_default;
