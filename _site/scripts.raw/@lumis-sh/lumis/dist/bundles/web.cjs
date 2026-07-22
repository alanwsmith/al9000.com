'use strict';

var chunkSY5Z6UW7_cjs = require('../chunk-SY5Z6UW7.cjs');

// bundles/web.ts
var bundledLanguages = {
  "css": chunkSY5Z6UW7_cjs.lazy("css", [], () => import('../langs/css.cjs')),
  "html": chunkSY5Z6UW7_cjs.lazy("html", [], () => import('../langs/html.cjs')),
  "javascript": chunkSY5Z6UW7_cjs.lazy("javascript", ["js", "jsx"], () => import('../langs/javascript.cjs')),
  "json": chunkSY5Z6UW7_cjs.lazy("json", [], () => import('../langs/json.cjs')),
  "tsx": chunkSY5Z6UW7_cjs.lazy("tsx", [], () => import('../langs/tsx.cjs')),
  "typescript": chunkSY5Z6UW7_cjs.lazy("typescript", ["ts"], () => import('../langs/typescript.cjs')),
  "plaintext": chunkSY5Z6UW7_cjs.lazy("plaintext", ["text", "txt", "plain"], () => import('../langs/plaintext.cjs'))
};

exports.bundledLanguages = bundledLanguages;
