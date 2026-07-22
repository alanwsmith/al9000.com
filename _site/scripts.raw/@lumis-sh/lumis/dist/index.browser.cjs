'use strict';

var chunkX3SQJVTN_cjs = require('./chunk-X3SQJVTN.cjs');
var chunkSY5Z6UW7_cjs = require('./chunk-SY5Z6UW7.cjs');
var chunkCNUQ5AYQ_cjs = require('./chunk-CNUQ5AYQ.cjs');
var chunkEPPEJKAQ_cjs = require('./chunk-EPPEJKAQ.cjs');

// src/runtime/browser.ts
var browserRuntime = {
  async resolveWasm(wasm) {
    if (wasm instanceof URL) {
      return wasm.href;
    }
    if (wasm instanceof Response) {
      return new Uint8Array(await wasm.arrayBuffer());
    }
    if (wasm instanceof ArrayBuffer) {
      return new Uint8Array(wasm);
    }
    return wasm;
  },
  async readFsCache() {
    return void 0;
  },
  async writeFsCache() {
  },
  async readResolvedWasmFromDisk() {
    return void 0;
  },
  async parserInitOptions() {
    return {
      wasmBinary: chunkX3SQJVTN_cjs.tree_sitter_wasm_default
    };
  }
};
var runtime = chunkX3SQJVTN_cjs.createLanguagesModule(browserRuntime);
function createRuntime(...args) {
  return runtime.createRuntime(...args);
}
function configureWasmResolver(...args) {
  return runtime.configureWasmResolver(...args);
}
function availableLanguages(...args) {
  return runtime.availableLanguages(...args);
}
function getDefaultRuntime(...args) {
  return runtime.getDefaultRuntime(...args);
}

// src/index.browser.ts
var highlighter = chunkCNUQ5AYQ_cjs.createHighlighterModule({
  createRuntime,
  getDefaultRuntime
});
function createHighlighter(...args) {
  return highlighter.createHighlighter(...args);
}
function highlight(...args) {
  return highlighter.highlight(...args);
}
function withWasm(language, wasm) {
  return {
    ...language,
    wasm
  };
}
function withWasmBundle(bundle, wasms) {
  return chunkSY5Z6UW7_cjs.mapBundle(bundle, (language) => {
    const wasm = wasms[language.id];
    return wasm ? withWasm(language, wasm) : language;
  });
}

Object.defineProperty(exports, "highlightEvents", {
  enumerable: true,
  get: function () { return chunkCNUQ5AYQ_cjs.highlightEvents; }
});
Object.defineProperty(exports, "highlightIter", {
  enumerable: true,
  get: function () { return chunkCNUQ5AYQ_cjs.highlightIter; }
});
Object.defineProperty(exports, "availableThemes", {
  enumerable: true,
  get: function () { return chunkEPPEJKAQ_cjs.availableThemes; }
});
Object.defineProperty(exports, "sanitizeThemeName", {
  enumerable: true,
  get: function () { return chunkEPPEJKAQ_cjs.sanitizeThemeName; }
});
exports.availableLanguages = availableLanguages;
exports.configureWasmResolver = configureWasmResolver;
exports.createHighlighter = createHighlighter;
exports.highlight = highlight;
exports.withWasm = withWasm;
exports.withWasmBundle = withWasmBundle;
