import { createLanguagesModule, tree_sitter_wasm_default } from './chunk-LHSHP3KA.js';
import { mapBundle } from './chunk-TW5NVJBN.js';
import { createHighlighterModule } from './chunk-ZKSRWTOF.js';
export { highlightEvents, highlightIter } from './chunk-ZKSRWTOF.js';
export { availableThemes, sanitizeThemeName } from './chunk-XN6RKY5Q.js';

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
      wasmBinary: tree_sitter_wasm_default
    };
  }
};
var runtime = createLanguagesModule(browserRuntime);
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
var highlighter = createHighlighterModule({
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
  return mapBundle(bundle, (language) => {
    const wasm = wasms[language.id];
    return wasm ? withWasm(language, wasm) : language;
  });
}

export { availableLanguages, configureWasmResolver, createHighlighter, highlight, withWasm, withWasmBundle };
