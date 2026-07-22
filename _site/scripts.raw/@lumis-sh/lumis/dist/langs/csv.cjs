'use strict';

// langs/csv.ts
var language = {
  id: "csv",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; inherits: tsv
(text) @string

(number) @number

(float) @number.float

(boolean) @boolean

"," @punctuation.delimiter`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-csv", name: "tree-sitter-csv", version: "0.26" }
};
var csv_default = language;

module.exports = csv_default;
