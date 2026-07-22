'use strict';

// langs/surface.ts
var language = {
  id: "surface",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Surface text is not highlighted
(text) @none

; Surface has two types of comments, both are highlighted as such
(comment) @comment 

; Surface attributes are highlighted as HTML attributes
(attribute_name) @tag.attribute

; Attributes are highlighted as strings
(quoted_attribute_value) @string

; Surface blocks are highlighted as keywords
[
  (start_block)
  (end_block)
  (subblock)
] @keyword

; Surface supports HTML tags and are highlighted as such
[
  "<"
  ">"
  "</"
  "/>"
  "{"
  "}"
  "<!--"
  "-->"
  "{!--"
  "--}"
] @tag.delimiter

; Surface tags are highlighted as HTML
(tag_name) @tag

; Surface components are highlighted as types (Elixir modules)
(component_name) @type

; Surface directives are highlighted as keywords
(directive_name) @keyword

; Surface operators
"=" @operator`,
  injections: `; This file is auto-generated. Do not edit.
; Surface expressions and components are Elixir code
([
  (expression_value)
  (component_name)
] @injection.content
  (#set! injection.language "elixir"))

; Surface comments are nvim-treesitter comments
((comment) @injection.content
  (#set! injection.language "comment"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-surface", name: "tree-sitter-surface", version: "0.26" }
};
var surface_default = language;

module.exports = surface_default;
