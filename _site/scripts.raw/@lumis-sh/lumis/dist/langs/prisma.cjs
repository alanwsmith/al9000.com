'use strict';

// langs/prisma.ts
var language = {
  id: "prisma",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(identifier) @variable

[
  "datasource"
  "generator"
  "model"
] @keyword

"enum" @keyword.type

(comment) @comment @spell

(document_comment) @comment.documentation @spell

(field_type) @type

(attribute_specifier) @attribute

(apply_function) @function

(string) @string
(string_char_escape) @string.escape
(integer) @number
(boolean) @boolean
(special_constant) @constant.builtin

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  "="
  "@"
  ":"
  "?"
] @operator
`,
  injections: `; This file is auto-generated. Do not edit.
([
  (comment)
  (document_comment)
] @injection.content
  (#set! injection.language "comment"))
`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-prisma", name: "tree-sitter-prisma", version: "0.26" }
};
var prisma_default = language;

module.exports = prisma_default;
