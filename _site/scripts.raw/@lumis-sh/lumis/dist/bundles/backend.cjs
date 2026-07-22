'use strict';

var chunkSY5Z6UW7_cjs = require('../chunk-SY5Z6UW7.cjs');

// bundles/backend.ts
var bundledLanguages = {
  "csharp": chunkSY5Z6UW7_cjs.lazy("csharp", ["c#"], () => import('../langs/csharp.cjs')),
  "elixir": chunkSY5Z6UW7_cjs.lazy("elixir", [], () => import('../langs/elixir.cjs')),
  "erlang": chunkSY5Z6UW7_cjs.lazy("erlang", [], () => import('../langs/erlang.cjs')),
  "go": chunkSY5Z6UW7_cjs.lazy("go", [], () => import('../langs/go.cjs')),
  "java": chunkSY5Z6UW7_cjs.lazy("java", [], () => import('../langs/java.cjs')),
  "javadoc": chunkSY5Z6UW7_cjs.lazy("javadoc", [], () => import('../langs/javadoc.cjs')),
  "javascript": chunkSY5Z6UW7_cjs.lazy("javascript", ["js", "jsx"], () => import('../langs/javascript.cjs')),
  "kotlin": chunkSY5Z6UW7_cjs.lazy("kotlin", [], () => import('../langs/kotlin.cjs')),
  "php": chunkSY5Z6UW7_cjs.lazy("php", [], () => import('../langs/php.cjs')),
  "protobuf": chunkSY5Z6UW7_cjs.lazy("protobuf", [], () => import('../langs/protobuf.cjs')),
  "python": chunkSY5Z6UW7_cjs.lazy("python", [], () => import('../langs/python.cjs')),
  "ruby": chunkSY5Z6UW7_cjs.lazy("ruby", [], () => import('../langs/ruby.cjs')),
  "rust": chunkSY5Z6UW7_cjs.lazy("rust", [], () => import('../langs/rust.cjs')),
  "scala": chunkSY5Z6UW7_cjs.lazy("scala", [], () => import('../langs/scala.cjs')),
  "sql": chunkSY5Z6UW7_cjs.lazy("sql", [], () => import('../langs/sql.cjs')),
  "typescript": chunkSY5Z6UW7_cjs.lazy("typescript", ["ts"], () => import('../langs/typescript.cjs')),
  "plaintext": chunkSY5Z6UW7_cjs.lazy("plaintext", ["text", "txt", "plain"], () => import('../langs/plaintext.cjs'))
};

exports.bundledLanguages = bundledLanguages;
