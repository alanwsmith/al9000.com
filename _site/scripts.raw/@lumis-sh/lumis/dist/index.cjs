'use strict';

var chunkX3SQJVTN_cjs = require('./chunk-X3SQJVTN.cjs');
var chunkSY5Z6UW7_cjs = require('./chunk-SY5Z6UW7.cjs');
var chunkCNUQ5AYQ_cjs = require('./chunk-CNUQ5AYQ.cjs');
var chunkEPPEJKAQ_cjs = require('./chunk-EPPEJKAQ.cjs');

// src/runtime/node.ts
var nodeFsPromises = "node:fs/promises";
var nodePath = "node:path";
var nodeUrl = "node:url";
var nodeRuntime = {
  async resolveWasm(wasm) {
    if (wasm instanceof URL) {
      if (wasm.protocol === "file:") {
        const { fileURLToPath } = await import(nodeUrl);
        return fileURLToPath(wasm);
      }
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
  async readFsCache(key) {
    try {
      const { readFile } = await import(nodeFsPromises);
      const { join } = await import(nodePath);
      const filePath = join("node_modules", ".cache", "lumis", key + ".wasm");
      return new Uint8Array(await readFile(filePath));
    } catch {
      return void 0;
    }
  },
  async writeFsCache(key, data) {
    try {
      const { writeFile, mkdir } = await import(nodeFsPromises);
      const { join } = await import(nodePath);
      const cacheDir = join("node_modules", ".cache", "lumis");
      await mkdir(cacheDir, { recursive: true });
      await writeFile(join(cacheDir, key + ".wasm"), data);
    } catch {
    }
  },
  async readResolvedWasmFromDisk(source) {
    const { isAbsolute } = await import(nodePath);
    if (source instanceof URL) {
      if (source.protocol !== "file:") {
        return void 0;
      }
      const { fileURLToPath } = await import(nodeUrl);
      return new Uint8Array(await (await import(nodeFsPromises)).readFile(fileURLToPath(source)));
    }
    if (source.startsWith("file://")) {
      const { fileURLToPath } = await import(nodeUrl);
      return new Uint8Array(
        await (await import(nodeFsPromises)).readFile(fileURLToPath(new URL(source)))
      );
    }
    if (URL.canParse(source) || !isAbsolute(source)) {
      return void 0;
    }
    const { readFile } = await import(nodeFsPromises);
    return new Uint8Array(await readFile(source));
  },
  async parserInitOptions() {
    return {
      wasmBinary: chunkX3SQJVTN_cjs.tree_sitter_wasm_default
    };
  }
};
var runtime = chunkX3SQJVTN_cjs.createLanguagesModule(nodeRuntime);
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

// src/index.ts
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
