'use strict';

// langs/iex.ts
var language = {
  id: "iex",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(prompt) @comment`,
  injections: `; This file is auto-generated. Do not edit.
((evaluation_block (prompt_line (expression) @injection.content))
 (#set! injection.language "elixir")
 (#set! injection.combined))

((result) @injection.content
 (#set! injection.language "elixir"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-iex", name: "tree-sitter-iex", version: "0.26" }
};
var iex_default = language;

module.exports = iex_default;
