'use strict';

// langs/elixir.ts
var language = {
  id: "elixir",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Punctuation
[
  ","
  ";"
] @punctuation.delimiter

[
  "("
  ")"
  "<<"
  ">>"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

"%" @punctuation.special

; Identifiers
(identifier) @variable

; Unused Identifiers
((identifier) @comment
  (#match? @comment "^_"))

; Comments
(comment) @comment 

; Strings
(string) @string

; Modules
(alias) @module

; Atoms & Keywords
[
  (atom)
  (quoted_atom)
  (keyword)
  (quoted_keyword)
] @string.special.symbol

; Interpolation
(interpolation
  [
    "#{"
    "}"
  ] @string.special)

; Escape sequences
(escape_sequence) @string.escape

; Integers
(integer) @number

; Floats
(float) @number.float

; Characters
[
  (char)
  (charlist)
] @character

; Booleans
(boolean) @boolean

; Nil
(nil) @constant.builtin

; Operators
(operator_identifier) @operator

(unary_operator
  operator: _ @operator)

(binary_operator
  operator: _ @operator)

; Pipe Operator
(binary_operator
  operator: "|>"
  right: (identifier) @function)

(dot
  operator: _ @operator)

(stab_clause
  operator: _ @operator)

; Local Function Calls
(call
  target: (identifier) @function.call)

; Remote Function Calls
(call
  target: (dot
    left: [
      (atom) @type
      (_)
    ]
    right: (identifier) @function.call)
  (arguments))

; Definition Function Calls
(call
  target: ((identifier) @keyword.function
    (#any-of? @keyword.function
      "def" "defdelegate" "defexception" "defguard" "defguardp" "defimpl" "defmacro" "defmacrop"
      "defmodule" "defn" "defnp" "defoverridable" "defp" "defprotocol" "defstruct"))
  (arguments
    [
      (call
        (identifier) @function)
      (identifier) @function
      (binary_operator
        left: (call
          target: (identifier) @function)
        operator: "when")
    ])?)

; Kernel Keywords & Special Forms
(call
  target: ((identifier) @keyword
    (#any-of? @keyword
      "alias" "case" "catch" "cond" "else" "for" "if" "import" "quote" "raise" "receive" "require"
      "reraise" "super" "throw" "try" "unless" "unquote" "unquote_splicing" "use" "with")))

; Special Constants
((identifier) @constant.builtin
  (#any-of? @constant.builtin "__CALLER__" "__DIR__" "__ENV__" "__MODULE__" "__STACKTRACE__"))

; Reserved Keywords
[
  "after"
  "catch"
  "do"
  "end"
  "fn"
  "rescue"
  "when"
  "else"
] @keyword

; Operator Keywords
[
  "and"
  "in"
  "not in"
  "not"
  "or"
] @keyword.operator

; Capture Operator
(unary_operator
  operator: "&"
  operand: [
    (integer) @operator
    (binary_operator
      left: [
        (call
          target: (dot
            left: (_)
            right: (identifier) @function))
        (identifier) @function
      ]
      operator: "/"
      right: (integer) @operator)
  ])

; Non-String Sigils
(sigil
  "~" @string.special
  (sigil_name) @string.special @_sigil_name
  quoted_start: _ @string.special
  quoted_end: _ @string.special
  ((sigil_modifiers) @string.special)?
  (#not-any-of? @_sigil_name "s" "S"))

; String Sigils
(sigil
  "~" @string
  (sigil_name) @string @_sigil_name
  quoted_start: _ @string
  (quoted_content) @string
  quoted_end: _ @string
  ((sigil_modifiers) @string)?
  (#any-of? @_sigil_name "s" "S"))

; Module attributes
(unary_operator
  operator: "@"
  operand: [
    (identifier)
    (call
      target: (identifier))
  ] @constant) @constant

; Documentation
(unary_operator
  operator: "@"
  operand: (call
    target: ((identifier) @_identifier
      (#any-of? @_identifier "moduledoc" "typedoc" "shortdoc" "doc")) @comment.documentation
    (arguments
      [
        (string)
        (boolean)
        (charlist)
        (sigil
          "~" @comment.documentation
          (sigil_name) @comment.documentation
          quoted_start: _ @comment.documentation
          (quoted_content) @comment.documentation
          quoted_end: _ @comment.documentation)
      ] @comment.documentation))) @comment.documentation
; * doc string
(unary_operator
  operator: "@" @comment.doc
  operand: (call
    target: (identifier) @comment.doc.__attribute__
    (arguments
      [
        (string) @comment.doc
        (charlist) @comment.doc
        (sigil
          quoted_start: _ @comment.doc
          quoted_end: _ @comment.doc) @comment.doc
        (boolean) @comment.doc
      ]))
  (#any-of? @comment.doc.__attribute__ "moduledoc" "typedoc" "doc"))
`,
  injections: `; This file is auto-generated. Do not edit.
; Comments
((comment) @injection.content
  (#set! injection.language "comment"))

; Documentation
(unary_operator
  operator: "@"
  operand: (call
    target: ((identifier) @_identifier
      (#any-of? @_identifier "moduledoc" "typedoc" "shortdoc" "doc"))
    (arguments
      [
        (string
          (quoted_content) @injection.content)
        (sigil
          (quoted_content) @injection.content)
      ])
    (#set! injection.language "markdown")))

; HEEx
(sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content
  (#any-of? @_sigil_name "H" "LVN")
  (#set! injection.language "heex"))

; Surface
(sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content
  (#eq? @_sigil_name "F")
  (#set! injection.language "surface"))

; Zigler
(sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content
  (#any-of? @_sigil_name "E" "L")
  (#set! injection.language "eex"))

(sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content
  (#any-of? @_sigil_name "z" "Z")
  (#set! injection.language "zig"))

; Regex
(sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content
  (#any-of? @_sigil_name "r" "R")
  (#set! injection.language "regex"))

; Json
(sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content
  (#any-of? @_sigil_name "j" "J")
  (#set! injection.language "json"))
; Phoenix HTML template
((sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content)
 (#eq? @_sigil_name "HOLO")
 (#set! injection.language "heex")
 (#set! injection.combined))

; SQL injection
((sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content)
 (#eq? @_sigil_name "SQL")
 (#set! injection.language "sql")
 (#set! injection.combined))

; Markdown
((sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content)
 (#eq? @_sigil_name "MD")
 (#set! injection.language "markdown")
 (#set! injection.combined))

; Lua
((sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content)
 (#eq? @_sigil_name "LUA")
 (#set! injection.language "lua")
 (#set! injection.combined))

; Python
((sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content)
 (#eq? @_sigil_name "PY")
 (#set! injection.language "python")
 (#set! injection.combined))

; JavaScript
((sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content)
 (#eq? @_sigil_name "JS")
 (#set! injection.language "javascript")
 (#set! injection.combined))

; Svelte
((sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content)
 (#eq? @_sigil_name "V")
 (#set! injection.language "svelte")
 (#set! injection.combined))

; Vue
((sigil
  (sigil_name) @_sigil_name
  (quoted_content) @injection.content)
 (#eq? @_sigil_name "VUE")
 (#set! injection.language "vue")
 (#set! injection.combined))
`,
  locals: `; This file is auto-generated. Do not edit.
; References
(identifier) @local.reference

(alias) @local.reference

; Module Definitions
(call
  target: ((identifier) @_identifier
    (#eq? @_identifier "defmodule"))
  (arguments
    (alias) @local.definition.type))

; Pattern Match Definitions
(binary_operator
  ; format-ignore
  left: 
    [
      (identifier) @local.definition.var
      (_ (identifier) @local.definition.var)
      (_ (_ (identifier) @local.definition.var))
      (_ (_ (_ (identifier) @local.definition.var)))
      (_ (_ (_ (_ (identifier) @local.definition.var))))
      (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))
      (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))
      (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))))))))
      (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))))))))
    ]
  operator: "=")

; Stab Clause Definitions
; format-ignore
(stab_clause
  left:
    [
     (arguments
      [
        (identifier) @local.definition.var
        (_ (identifier) @local.definition.var)
        (_ (_ (identifier) @local.definition.var))
        (_ (_ (_ (identifier) @local.definition.var)))
        (_ (_ (_ (_ (identifier) @local.definition.var))))
        (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))
        (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))
        (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))))))))
        (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))))))))
      ])

    (binary_operator
      left:
        (arguments
          ; format-ignore
          [
            (identifier) @local.definition.var
            (_ (identifier) @local.definition.var)
            (_ (_ (identifier) @local.definition.var))
            (_ (_ (_ (identifier) @local.definition.var)))
            (_ (_ (_ (_ (identifier) @local.definition.var))))
            (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))
            (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))
            (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var)))))))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.var))))))))))))))))))))
          ])
      operator: "when")
    ])

; Aliases
; format-ignore
(call
  target:
    ((identifier) @_identifier
      (#any-of? @_identifier "require" "alias" "use" "import"))
  (arguments
    [
      (alias) @local.definition.import
      (_ (alias) @local.definition.import)
      (_ (_ (alias) @local.definition.import))
      (_ (_ (_ (alias) @local.definition.import)))
      (_ (_ (_ (_ (alias) @local.definition.import))))
    ]))

; Local Function Definitions & Scopes
; format-ignore
(call
  target:
    ((identifier) @_identifier
      (#any-of? @_identifier "def" "defp" "defmacro" "defmacrop" "defguard" "defguardp" "defn" "defnp" "for"))
  (arguments
    [
      (identifier) @local.definition.function
      (binary_operator
        left: (identifier) @local.definition.function
        operator: "when")
      (binary_operator
        (identifier) @local.definition.parameter)
      (call
        target: (identifier) @local.definition.function
        (arguments
          [
            (identifier) @local.definition.parameter
            (_ (identifier) @local.definition.parameter)
            (_ (_ (identifier) @local.definition.parameter))
            (_ (_ (_ (identifier) @local.definition.parameter)))
            (_ (_ (_ (_ (identifier) @local.definition.parameter))))
            (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))
            (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))
            (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))))))))))))
            (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))))))))))))
          ]))
    ]?)
  (#set! definition.function.scope parent)(do_block)?) @local.scope

; ExUnit Test Definitions & Scopes
; format-ignore
(call
  target:
    ((identifier) @_identifier
      (#eq? @_identifier "test"))
  (arguments
    [
      (string)
      ((string)
        .
        ","
        .
        [
          (identifier) @local.definition.parameter
          (_ (identifier) @local.definition.parameter)
          (_ (_ (identifier) @local.definition.parameter))
          (_ (_ (_ (identifier) @local.definition.parameter)))
          (_ (_ (_ (_ (identifier) @local.definition.parameter))))
          (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))
          (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))
          (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter)))))))))))))))))))
          (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (_ (identifier) @local.definition.parameter))))))))))))))))))))
        ])
    ])
  (do_block)?) @local.scope

; Stab Clause Scopes
(stab_clause) @local.scope`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-elixir", name: "tree-sitter-elixir", version: "0.26" }
};
var elixir_default = language;

module.exports = elixir_default;
