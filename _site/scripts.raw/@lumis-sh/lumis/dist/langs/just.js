// langs/just.ts
var language = {
  id: "just",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
[
  "true"
  "false"
] @boolean

[
  "if"
  "else"
] @keyword.conditional

[
  "alias"
  "set"
  "shell"
  "mod"
] @keyword

[
  "import"
  "export"
] @keyword.import

[
  ":="
  "?"
  "=="
  "!="
  "=~"
  "@"
  "="
  "$"
  "*"
  "+"
  "&&"
  "@-"
  "-@"
  "-"
  "/"
  ":"
] @operator

[
  "("
  ")"
  "["
  "]"
  "{{"
  "}}"
  "{"
  "}"
] @punctuation.bracket

[
  "\`"
  "\`\`\`"
] @punctuation.special

"," @punctuation.delimiter

(shebang) @keyword.directive

(comment) @comment 

[
  (string)
  (external_command)
] @string

(escape_sequence) @string.escape

(module
  (identifier) @module)

(assignment
  (identifier) @variable)

(alias
  (identifier) @variable)

(value
  (identifier) @variable)

; Recipe definitions
(recipe_header
  (identifier) @function)

(dependency
  (identifier) @function.call)

(dependency_expression
  (identifier) @function.call)

(parameter
  (identifier) @variable.parameter)

(dependency_expression
  (expression
    (value
      (identifier) @variable.parameter)))

; Fallback highlighting for recipe bodies
(recipe
  (recipe_body) @string
  (#set! priority 90))

; Ref: https://just.systems/man/en/chapter_26.html
;(setting (identifier) @error)
(setting
  (identifier) @constant.builtin
  (#any-of? @constant.builtin
    "allow-duplicate-recipes" "dotenv-filename" "dotenv-load" "dotenv-path" "export" "fallback"
    "ignore-comments" "positional-arguments" "tempdir" "windows-powershell" "windows-shell"))

(recipe
  (attribute
    (identifier) @attribute))

; https://just.systems/man/en/attributes.html
((recipe
  (attribute
    (identifier) @attribute.builtin))
  (#any-of? @attribute.builtin
    "confirm" "doc" "extension" "group" "linux" "macos" "no-cd" "no-exit-message" "no-quiet"
    "openbsd" "positional-arguments" "private" "script" "unix" "windows" "working-directory"))

((recipe
  (attribute
    (identifier) @_doc
    argument: (string) @string.documentation))
  (#eq? @_doc "doc"))

((recipe
  (attribute
    (identifier) @_dir
    argument: (string) @string.special.path))
  (#eq? @_dir "working-directory"))

(function_call
  (identifier) @function.call)`,
  injections: `; This file is auto-generated. Do not edit.
((comment) @injection.content
  (#set! injection.language "comment"))

; The right side of =~ literals
(regex_literal
  (_) @injection.content
  (#set! injection.language "regex"))

; Default to bash highlighting for non-shebang recipes and commands
(recipe
  (recipe_body
    !shebang) @injection.content
  (#set! injection.include-children)
  (#set! injection.language "bash"))

(external_command
  (command_body) @injection.content
  (#set! injection.language "bash"))

; For shebang recipes, use the shebang executable name as the language by default
(recipe
  (recipe_body
    (shebang
      (language) @injection.language)) @injection.content
  (#not-any-of? @injection.language "python3" "nodejs" "node")
  (#set! injection.include-children))

; python3 -> python
(recipe
  (recipe_body
    (shebang
      (language) @_lang)) @injection.content
  (#eq? @_lang "python3")
  (#set! injection.language "python")
  (#set! injection.include-children))

; node/nodejs -> javascript
(recipe
  (recipe_body
    (shebang
      (language) @_lang)) @injection.content
  (#any-of? @_lang "node" "nodejs")
  (#set! injection.language "javascript")
  (#set! injection.include-children))`,
  locals: `; This file is auto-generated. Do not edit.
; Source: https://github.com/IndianBoy42/tree-sitter-just/blob/main/queries/just/locals.scm
; Scope
(recipe) @local.scope

; Definitions
(alias
  left: (identifier) @local.definition.var)

(assignment
  left: (identifier) @local.definition.var)

(module
  name: (identifier) @local.definition.namespace)

(parameter
  name: (identifier) @local.definition.var)

(recipe_header
  name: (identifier) @local.definition.function)

; References
(alias
  right: (identifier) @local.reference)

(function_call
  name: (identifier) @local.reference)

(dependency
  name: (identifier) @local.reference)

(dependency_expression
  name: (identifier) @local.reference)

(value
  (identifier) @local.reference)`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-just", name: "tree-sitter-just", version: "0.26" }
};
var just_default = language;

export { just_default as default };
