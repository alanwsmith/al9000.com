'use strict';

// langs/llvm.ts
var language = {
  id: "llvm",
  aliases: [],
  highlights: ``,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-llvm", name: "tree-sitter-llvm", version: "0.26" }
};
var llvm_default = language;

module.exports = llvm_default;
