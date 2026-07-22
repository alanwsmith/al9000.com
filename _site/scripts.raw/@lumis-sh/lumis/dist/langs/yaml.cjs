'use strict';

// langs/yaml.ts
var language = {
  id: "yaml",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(boolean_scalar) @boolean

(null_scalar) @constant.builtin

(double_quote_scalar) @string

(single_quote_scalar) @string

((block_scalar) @string
  (#set! priority 99))

(string_scalar) @string

(escape_sequence) @string.escape

(integer_scalar) @number

(float_scalar) @number

(comment) @comment 

[
  (anchor_name)
  (alias_name)
] @label

(tag) @type

[
  (yaml_directive)
  (tag_directive)
  (reserved_directive)
] @keyword.directive

(block_mapping_pair
  key: (flow_node
    [
      (double_quote_scalar)
      (single_quote_scalar)
    ] @property))

(block_mapping_pair
  key: (flow_node
    (plain_scalar
      (string_scalar) @property)))

(flow_mapping
  (_
    key: (flow_node
      [
        (double_quote_scalar)
        (single_quote_scalar)
      ] @property)))

(flow_mapping
  (_
    key: (flow_node
      (plain_scalar
        (string_scalar) @property))))

[
  ","
  "-"
  ":"
  ">"
  "?"
  "|"
] @punctuation.delimiter

[
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  "*"
  "&"
  "---"
  "..."
] @punctuation.special

; help deal with for yaml's norway problem https://www.bram.us/2022/01/11/yaml-the-norway-problem/
; only using \`true\` and \`false\`, since Treesitter parser targets YAML spec 1.2 https://github.com/nvim-treesitter/nvim-treesitter/pull/7512#issuecomment-2565397302
(block_mapping_pair
  value: (block_node
    (block_sequence
      (block_sequence_item
        (flow_node
          (plain_scalar
            (string_scalar) @boolean
            (#any-of? @boolean "TRUE" "FALSE" "True" "False")))))))

(block_mapping_pair
  value: (flow_node
    (plain_scalar
      (string_scalar) @boolean
      (#any-of? @boolean "TRUE" "FALSE" "True" "False"))))`,
  injections: `; This file is auto-generated. Do not edit.
((comment) @injection.content
  (#set! injection.language "comment"))

; Github actions ("run") / Gitlab CI ("scripts")
; Taskfile scripts ("cmds", "cmd", "sh")
(block_mapping_pair
  key: (flow_node) @_run
  (#any-of? @_run "run" "script" "before_script" "after_script" "cmds" "cmd" "sh")
  value: (flow_node
    (plain_scalar
      (string_scalar) @injection.content)
    (#set! injection.language "bash")))

(block_mapping_pair
  key: (flow_node) @_run
  (#any-of? @_run "run" "script" "before_script" "after_script" "cmds" "cmd" "sh")
  value: (block_node
    (block_scalar) @injection.content
    (#set! injection.language "bash")
    (#offset! @injection.content 0 1 0 0)))

(block_mapping_pair
  key: (flow_node) @_run
  (#any-of? @_run "run" "script" "before_script" "after_script" "cmds" "sh")
  value: (block_node
    (block_sequence
      (block_sequence_item
        (flow_node
          (plain_scalar
            (string_scalar) @injection.content))
        (#set! injection.language "bash")))))

(block_mapping_pair
  key: (flow_node) @_run
  (#any-of? @_run "script" "before_script" "after_script" "cmds" "sh")
  value: (block_node
    (block_sequence
      (block_sequence_item
        (block_node
          (block_scalar) @injection.content
          (#set! injection.language "bash")
          (#offset! @injection.content 0 1 0 0))))))

; Prometheus Alertmanager ("expr")
(block_mapping_pair
  key: (flow_node) @_expr
  (#eq? @_expr "expr")
  value: (flow_node
    (plain_scalar
      (string_scalar) @injection.content)
    (#set! injection.language "promql")))

(block_mapping_pair
  key: (flow_node) @_expr
  (#eq? @_expr "expr")
  value: (block_node
    (block_scalar) @injection.content
    (#set! injection.language "promql")
    (#offset! @injection.content 0 1 0 0)))

(block_mapping_pair
  key: (flow_node) @_expr
  (#eq? @_expr "expr")
  value: (block_node
    (block_sequence
      (block_sequence_item
        (flow_node
          (plain_scalar
            (string_scalar) @injection.content))
        (#set! injection.language "promql")))))

(block_mapping_pair
  key: (flow_node) @_expr
  (#eq? @_expr "expr")
  value: (block_node
    (block_sequence
      (block_sequence_item
        (block_node
          (block_scalar) @injection.content
          (#set! injection.language "promql")
          (#offset! @injection.content 0 1 0 0))))))`,
  locals: `; This file is auto-generated. Do not edit.
[
  (stream)
  (document)
  (block_node)
] @local.scope

(anchor_name) @local.definition

(alias_name) @local.reference`,
  brackets: `; This file is auto-generated. Do not edit.
("[" @open
  "]" @close)

("{" @open
  "}" @close)

(("\\"" @open
  "\\"" @close)
  (#set! rainbow.exclude))

(("'" @open
  "'" @close)
  (#set! rainbow.exclude))`,
  wasm: { packageName: "@lumis-sh/wasm-yaml", name: "tree-sitter-yaml", version: "0.26" }
};
var yaml_default = language;

module.exports = yaml_default;
