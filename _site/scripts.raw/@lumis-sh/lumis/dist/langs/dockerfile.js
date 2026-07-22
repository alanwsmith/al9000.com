// langs/dockerfile.ts
var language = {
  id: "dockerfile",
  aliases: ["docker"],
  highlights: `; This file is auto-generated. Do not edit.
[
  "FROM"
  "AS"
  "RUN"
  "CMD"
  "LABEL"
  "EXPOSE"
  "ENV"
  "ADD"
  "COPY"
  "ENTRYPOINT"
  "VOLUME"
  "USER"
  "WORKDIR"
  "ARG"
  "ONBUILD"
  "STOPSIGNAL"
  "HEALTHCHECK"
  "SHELL"
  "MAINTAINER"
  "CROSS_BUILD"
] @keyword

[
  ":"
  "@"
] @operator

(comment) @comment 

(image_spec
  (image_tag
    ":" @punctuation.special)
  (image_digest
    "@" @punctuation.special))

(double_quoted_string) @string

[
  (heredoc_marker)
  (heredoc_end)
] @label

((heredoc_block
  (heredoc_line) @string)
  (#set! priority 90))

(expansion
  [
    "$"
    "{"
    "}"
  ] @punctuation.special)

((variable) @constant
  (#match? @constant "^[A-Z][A-Z_0-9]*$"))

(arg_instruction
  .
  (unquoted_string) @property)

(env_instruction
  (env_pair
    .
    (unquoted_string) @property))

(expose_instruction
  (expose_port) @number)`,
  injections: `; This file is auto-generated. Do not edit.
((comment) @injection.content
  (#set! injection.language "comment"))

((shell_command
  (shell_fragment) @injection.content)
  (#set! injection.language "bash")
  (#set! injection.combined))

((run_instruction
  (heredoc_block) @injection.content)
  (#set! injection.language "bash")
  (#set! injection.include-children))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-dockerfile", name: "tree-sitter-dockerfile", version: "0.26" }
};
var dockerfile_default = language;

export { dockerfile_default as default };
