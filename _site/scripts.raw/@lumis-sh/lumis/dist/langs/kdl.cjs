'use strict';

// langs/kdl.ts
var language = {
  id: "kdl",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Types
; Variables
(identifier) @variable

; Nodes
(node
  (identifier) @tag)

; Type annotation
(type
  (identifier) @type)

; Properties
(prop
  (identifier) @property)

; Operators
[
  "="
  "+"
  "-"
] @operator

; Literals
(string) @string

(escape) @string.escape

(number) @number

(number
  (decimal) @number.float)

(number
  (exponent) @number.float)

(boolean) @boolean

"null" @constant.builtin

; Punctuation
[
  "{"
  "}"
] @punctuation.bracket

[
  "("
  ")"
] @punctuation.bracket

";" @punctuation.delimiter

; Comments
[
  (single_line_comment)
  (multi_line_comment)
] @comment 

(node
  (node_comment)
  (#set! priority 105)) @comment

(node
  (node_field
    (node_field_comment)
    (#set! priority 105)) @comment)

(node_children
  (node_children_comment)
  (#set! priority 105)) @comment`,
  injections: `; This file is auto-generated. Do not edit.
([
  (single_line_comment)
  (multi_line_comment)
] @injection.content
  (#set! injection.language "comment"))`,
  locals: `; This file is auto-generated. Do not edit.
(document) @local.scope

(node
  (node_children) @local.scope)

(node_children
  (node) @local.scope)

(identifier) @local.reference

(node_field) @local.definition.field

(node
  (identifier) @local.definition.type)

(type) @local.definition.type`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-kdl", name: "tree-sitter-kdl", version: "0.26" }
};
var kdl_default = language;

module.exports = kdl_default;
