// langs/plaintext.ts
var language = {
  id: "plaintext",
  aliases: ["text", "txt", "plain"],
  highlights: "",
  wasm: { packageName: "@lumis-sh/wasm-diff", name: "tree-sitter-diff", version: "0.26" }
};
var plaintext_default = language;

export { plaintext_default as default };
