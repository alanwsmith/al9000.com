// langs/d.ts
var language = {
  id: "d",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; Keywords
[
  (directive)
  (shebang)
] @keyword.directive

[
  (import)
  (module)
] @keyword.import

[
  (alias)
  (asm)
  (class)
  (delegate)
  (delete)
  (enum)
  (interface)
  (invariant)
  (mixin)
  (pragma)
  (struct)
  (template)
  (union)
  (unittest)
  (version)
  (with)
  (traits)
  (vector)
  (parameters_)
  (default)
  (goto)
] @keyword

(function) @keyword.function

(synchronized) @keyword.coroutine

[
  (if)
  (else)
  (switch)
  (case)
  (break)
] @keyword.conditional

[
  (do)
  (for)
  (foreach)
  (foreach_reverse)
  (while)
  (continue)
] @keyword.repeat

(return) @keyword.return

[
  (abstract)
  (deprecated)
  (private)
  (protected)
  (public)
  (package)
  (immutable)
  (final)
  (const)
  (override)
  (static)
] @keyword.modifier

[
  (assert)
  (try)
  (catch)
  (finally)
  (throw)
  (nothrow)
] @keyword.exception

[
  (cast)
  (new)
  (in)
  (is)
  (not_in)
  (not_is)
  (typeid)
  (typeof)
] @keyword.operator

[
  (lazy)
  (align)
  (extern)
  (scope)
  (ref)
  (pure)
  (export)
  (shared)
  (gshared)
  (out)
  (inout)
] @keyword.modifier

(parameter_attribute
  (return) @keyword.modifier)

(parameter_attribute
  (in) @keyword.modifier)

(parameter_attribute
  (out) @keyword.modifier)

(debug) @keyword.debug

; Operators
[
  "/="
  "/"
  ".."
  "&"
  "&="
  "&&"
  "|"
  "|="
  "||"
  "-"
  "-="
  "--"
  "+"
  "+="
  "++"
  "<"
  "<="
  "<<"
  "<<="
  ">"
  ">="
  ">>="
  ">>>="
  ">>"
  ">>>"
  "!"
  "!="
  "$"
  "="
  "=="
  "*"
  "*="
  "%"
  "%="
  "^"
  "^="
  "^^"
  "^^="
  "~"
  "~="
  "@"
] @operator

; Variables
(identifier) @variable

[
  "exit"
  "success"
  "failure"
  (this)
  (super)
] @variable.builtin

(linkage_attribute
  "("
  _ @variable.builtin
  ")")

; Modules
(module_fqn
  (identifier) @module)

; Attributes
(at_attribute
  (identifier) @attribute)

; Constants
(enum_member
  (identifier) @constant)

(manifest_declarator
  .
  (identifier) @constant)

; Members
(aggregate_body
  (variable_declaration
    (declarator
      (identifier) @variable.member)))

(property_expression
  "."
  (identifier) @variable.member)

(type
  "."
  (identifier) @variable.member)

; Types
(class_declaration
  (class)
  .
  (identifier) @type)

(struct_declaration
  (struct)
  .
  (identifier) @type)

(union_declaration
  (union)
  .
  (identifier) @type)

(enum_declaration
  (enum)
  .
  (identifier) @type)

(alias_declaration
  (alias)
  .
  (identifier) @type)

((identifier) @type
  (#match? @type "^[A-Z].*"))

(type
  .
  (identifier) @type .)

[
  (auto)
  (void)
  (bool)
  (byte)
  (ubyte)
  (char)
  (short)
  (ushort)
  (wchar)
  (dchar)
  (int)
  (uint)
  (long)
  (ulong)
  (real)
  (double)
  (float)
  (cent)
  (ucent)
  (ireal)
  (idouble)
  (ifloat)
  (creal)
  (cfloat)
  (string)
  (dstring)
  (wstring)
] @type.builtin

; Functions
(function_declaration
  (identifier) @function)

(call_expression
  (identifier) @function)

(call_expression
  (type
    (identifier) @function .))

(call_expression
  (property_expression
    (call_expression)
    (identifier) @function .))

; Parameters
(parameter
  (_)
  (identifier) @variable.parameter)

(function_literal
  "("
  (type
    (identifier) @variable.parameter))

; Constructors
(constructor
  (this) @constructor)

(destructor
  (this) @constructor)

(postblit
  .
  (this) @constructor)

; Punctuation
[
  ";"
  "."
  ":"
  ","
  "=>"
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

"..." @punctuation.special

; Ternaries
(ternary_expression
  [
    "?"
    ":"
  ] @keyword.conditional.ternary)

; Labels
(label
  (identifier) @label)

(goto_statement
  (identifier) @label)

; Literals
(string_literal) @string

[
  (int_literal)
  (float_literal)
] @number

(char_literal) @character

[
  (true)
  (false)
] @boolean

[
  (null)
  (special_keyword)
] @constant.builtin

; Comments
(comment) @comment 

((comment) @comment.documentation
  (#match? @comment.documentation "^///[^/]"))

((comment) @comment.documentation
  (#match? @comment.documentation "^///$"))

((comment) @comment.documentation
  (#match? @comment.documentation "^/[*][*][^*].*[*]/$"))

((comment) @comment.documentation
  (#match? @comment.documentation "^/[+][+][^+].*[+]/$"))`,
  injections: `; This file is auto-generated. Do not edit.
((comment) @injection.content
  (#set! injection.language "comment"))

((call_expression
  (type) @_printf
  (named_arguments
    "("
    .
    (named_argument
      (expression
        (string_literal) @injection.content))))
  (#eq? @_printf "printf")
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.language "printf"))

; TODO: uncomment when asm is added
; ((asm_inline) @injection.content
;   (#set! injection.language "asm")
;   (#set! injection.combined))`,
  locals: `; This file is auto-generated. Do not edit.
; Scopes
[
  (source_file)
  (block_statement)
  (aggregate_body)
] @local.scope

; References
(identifier) @local.reference

; Definitions
(module_def
  (module_declaration
    (module_fqn) @local.definition.namespace)
  (#set! definition.namespace.scope "global"))

(enum_declaration
  (enum_member
    .
    (identifier) @local.definition.enum))

(class_declaration
  (class)
  .
  (identifier) @local.definition.type)

(struct_declaration
  (struct)
  .
  (identifier) @local.definition.type)

(union_declaration
  (union)
  .
  (identifier) @local.definition.type)

(enum_declaration
  (enum)
  .
  (identifier) @local.definition.type)

(alias_declaration
  (alias_initializer
    .
    (identifier) @local.definition.type))

(constructor
  (this) @local.definition.method)

(destructor
  (this) @local.definition.method)

(postblit
  (this) @local.definition.method)

(aggregate_body
  (function_declaration
    (identifier) @local.definition.method))

(manifest_declarator
  .
  (identifier) @local.definition.constant)

(anonymous_enum_declaration
  (enum_member
    .
    (identifier) @local.definition.constant))

(variable_declaration
  (declarator
    (identifier) @local.definition.var))

(aggregate_body
  (variable_declaration
    (declarator
      (identifier) @local.definition.field)))

(function_declaration
  (identifier) @local.definition.function)`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-d", name: "tree-sitter-d", version: "0.26" }
};
var d_default = language;

export { d_default as default };
