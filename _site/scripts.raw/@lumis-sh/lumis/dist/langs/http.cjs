'use strict';

// langs/http.ts
var language = {
  id: "http",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Methods
(method) @function.method

; Headers
(header
  name: (_) @constant)

(header
  value: (_) @string)

; Variables
(identifier) @variable

(variable_declaration
  "@" @character.special)

(variable_declaration
  (value) @string)

; Operators
(comment
  "=" @operator)

(variable_declaration
  "=" @operator)

; keywords
(comment
  "@" @keyword
  name: (_) @keyword)

; Literals
(request
  url: (_) @string.special.url)

(http_version) @string.special

; Response
(status_code) @number

(status_text) @string

; Punctuation
[
  "{{"
  "}}"
  "{%"
  "%}"
] @punctuation.bracket

">" @punctuation.special

(header
  ":" @punctuation.delimiter)

; external JSON body
(external_body
  path: (_) @string.special.path)

; Comments
[
  (comment)
  (request_separator)
] @comment `,
  injections: `; This file is auto-generated. Do not edit.
; Comments
((comment) @injection.content
  (#set! injection.language "comment"))

; Body
((json_body) @injection.content
  (#set! injection.language "json"))

((xml_body) @injection.content
  (#set! injection.language "xml"))

((graphql_data) @injection.content
  (#set! injection.language "graphql"))

; Script (default to javascript)
((comment
  name: (_) @_name
  (#eq? @_name "lang")
  value: (_) @injection.language)?
  .
  (_
    (script) @injection.content
    (#offset! @injection.content 0 2 0 -2))
  (#set! injection.language "javascript"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-http", name: "tree-sitter-http", version: "0.26" }
};
var http_default = language;

module.exports = http_default;
