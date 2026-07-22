import { createLanguagesModule, tree_sitter_wasm_default } from './chunk-LHSHP3KA.js';
import { mapBundle } from './chunk-TW5NVJBN.js';
import { createHighlighterModule } from './chunk-ZKSRWTOF.js';
export { highlightEvents, highlightIter } from './chunk-ZKSRWTOF.js';
export { availableThemes, sanitizeThemeName } from './chunk-XN6RKY5Q.js';

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
      wasmBinary: tree_sitter_wasm_default
    };
  }
};
var runtime = createLanguagesModule(nodeRuntime);
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
