'use strict';

// langs/gitattributes.ts
var language = {
  id: "gitattributes",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(dir_sep) @punctuation.delimiter

(quoted_pattern
  "\\"" @punctuation.special)

(range_notation) @string.special

(range_notation
  [
    "["
    "]"
  ] @punctuation.bracket)

(wildcard) @character.special

(range_negation) @operator

(character_class) @constant

(class_range
  "-" @operator)

[
  (ansi_c_escape)
  (escaped_char)
] @string.escape

(attribute
  (attr_name) @variable.parameter)

(attribute
  (builtin_attr) @variable.builtin)

[
  (attr_reset)
  (attr_unset)
  (attr_set)
] @operator

(boolean_value) @boolean

(string_value) @string

(macro_tag) @keyword.directive

(macro_def
  macro_name: (_) @property)

; we do not lint syntax errors
; [
;   (pattern_negation)
;   (redundant_escape)
;   (trailing_slash)
; ] @error
(comment) @comment `,
  injections: `; This file is auto-generated. Do not edit.
((comment) @injection.content
  (#set! injection.language "comment"))`,
  locals: `; This file is auto-generated. Do not edit.
(macro_def
  (attr_name) @local.definition.macro)

(attribute
  (attr_name) @local.reference)

(attribute
  (builtin_attr) @local.reference)`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-gitattributes", name: "tree-sitter-gitattributes", version: "0.26" }
};
var gitattributes_default = language;

module.exports = gitattributes_default;
