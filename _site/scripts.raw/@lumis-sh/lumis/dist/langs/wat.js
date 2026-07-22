// langs/wat.ts
var language = {
  id: "wat",
  aliases: ["wasm", "webassembly"],
  highlights: `; This file is auto-generated. Do not edit.
[
  "module" "func" "param" "result" "type" "memory" "elem" "data" "table" "global"
  "if" "then" "else" "block" "loop" "end" "mut"
] @keyword

["import" "export"] @keyword.control.import

["local"] @keyword.storage.type

[(name) (string)] @string

(identifier) @function

[(comment_block) (comment_line)] @comment

[(nat) (float) (align_offset_value)] @constant.numeric.integer

(value_type) @type

["(" ")"] @punctuation.bracket`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-wat", name: "tree-sitter-wat", version: "0.26" }
};
var wat_default = language;

export { wat_default as default };
