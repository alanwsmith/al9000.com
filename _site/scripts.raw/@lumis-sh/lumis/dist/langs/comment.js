// langs/comment.ts
var language = {
  id: "comment",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
((tag
  (name) @comment.todo 
  ("(" @punctuation.bracket
    (user) @constant
    ")" @punctuation.bracket)?
  ":" @punctuation.delimiter)
  (#any-of? @comment.todo "TODO" "WIP"))

("text" @comment.todo 
  (#any-of? @comment.todo "TODO" "WIP"))

((tag
  (name) @comment.note 
  ("(" @punctuation.bracket
    (user) @constant
    ")" @punctuation.bracket)?
  ":" @punctuation.delimiter)
  (#any-of? @comment.note "NOTE" "XXX" "INFO" "DOCS" "PERF" "TEST"))

("text" @comment.note 
  (#any-of? @comment.note "NOTE" "XXX" "INFO" "DOCS" "PERF" "TEST"))

((tag
  (name) @comment.warning 
  ("(" @punctuation.bracket
    (user) @constant
    ")" @punctuation.bracket)?
  ":" @punctuation.delimiter)
  (#any-of? @comment.warning "HACK" "WARNING" "WARN" "FIX"))

("text" @comment.warning 
  (#any-of? @comment.warning "HACK" "WARNING" "WARN" "FIX"))

((tag
  (name) @comment.error 
  ("(" @punctuation.bracket
    (user) @constant
    ")" @punctuation.bracket)?
  ":" @punctuation.delimiter)
  (#any-of? @comment.error "FIXME" "BUG" "ERROR"))

("text" @comment.error 
  (#any-of? @comment.error "FIXME" "BUG" "ERROR"))

; Issue number (#123)
("text" @number
  (#match? @number "^#[0-9]+$"))

(uri) @string.special.url `,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-comment", name: "tree-sitter-comment", version: "0.26" }
};
var comment_default = language;

export { comment_default as default };
