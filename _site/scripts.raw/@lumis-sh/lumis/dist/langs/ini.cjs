'use strict';

// langs/ini.ts
var language = {
  id: "ini",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
(section_name
  (text) @markup.heading)

(comment) @comment 

[
  "["
  "]"
] @punctuation.bracket

"=" @operator

(setting
  (setting_name) @property)

(setting_value) @string`,
  injections: `; This file is auto-generated. Do not edit.
((comment
  (text) @injection.content)
  (#set! injection.language "comment"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-ini", name: "tree-sitter-ini", version: "0.26" }
};
var ini_default = language;

module.exports = ini_default;
