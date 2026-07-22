import { lazy } from '../chunk-TW5NVJBN.js';

// bundles/web.ts
var bundledLanguages = {
  "css": lazy("css", [], () => import('../langs/css.js')),
  "html": lazy("html", [], () => import('../langs/html.js')),
  "javascript": lazy("javascript", ["js", "jsx"], () => import('../langs/javascript.js')),
  "json": lazy("json", [], () => import('../langs/json.js')),
  "tsx": lazy("tsx", [], () => import('../langs/tsx.js')),
  "typescript": lazy("typescript", ["ts"], () => import('../langs/typescript.js')),
  "plaintext": lazy("plaintext", ["text", "txt", "plain"], () => import('../langs/plaintext.js'))
};

export { bundledLanguages };
