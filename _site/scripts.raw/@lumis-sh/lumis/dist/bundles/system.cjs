'use strict';

var chunkSY5Z6UW7_cjs = require('../chunk-SY5Z6UW7.cjs');

// bundles/system.ts
var bundledLanguages = {
  "asm": chunkSY5Z6UW7_cjs.lazy("asm", ["assembly"], () => import('../langs/asm.cjs')),
  "bash": chunkSY5Z6UW7_cjs.lazy("bash", ["sh"], () => import('../langs/bash.cjs')),
  "c": chunkSY5Z6UW7_cjs.lazy("c", [], () => import('../langs/c.cjs')),
  "cmake": chunkSY5Z6UW7_cjs.lazy("cmake", [], () => import('../langs/cmake.cjs')),
  "cpp": chunkSY5Z6UW7_cjs.lazy("cpp", ["c++"], () => import('../langs/cpp.cjs')),
  "go": chunkSY5Z6UW7_cjs.lazy("go", [], () => import('../langs/go.cjs')),
  "llvm": chunkSY5Z6UW7_cjs.lazy("llvm", [], () => import('../langs/llvm.cjs')),
  "make": chunkSY5Z6UW7_cjs.lazy("make", [], () => import('../langs/make.cjs')),
  "rust": chunkSY5Z6UW7_cjs.lazy("rust", [], () => import('../langs/rust.cjs')),
  "wat": chunkSY5Z6UW7_cjs.lazy("wat", ["wasm", "webassembly"], () => import('../langs/wat.cjs')),
  "zig": chunkSY5Z6UW7_cjs.lazy("zig", [], () => import('../langs/zig.cjs')),
  "zsh": chunkSY5Z6UW7_cjs.lazy("zsh", [], () => import('../langs/zsh.cjs')),
  "plaintext": chunkSY5Z6UW7_cjs.lazy("plaintext", ["text", "txt", "plain"], () => import('../langs/plaintext.cjs'))
};

exports.bundledLanguages = bundledLanguages;
