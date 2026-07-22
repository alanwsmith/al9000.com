'use strict';

var chunk6BI6N6WP_cjs = require('../chunk-6BI6N6WP.cjs');

// src/formatter/ansi.ts
async function highlightIterWithAnsi(source, language, theme) {
  const { highlight, highlightIter } = await import('../index.cjs');
  const segments = [];
  await highlight(source, {
    language,
    format(src) {
      highlightIter(src, this.language, theme, (text, _language, range, _scope, style) => {
        segments.push([chunk6BI6N6WP_cjs.paint(text, style), range]);
      });
      return "";
    }
  });
  return segments;
}

Object.defineProperty(exports, "ANSI_RESET", {
  enumerable: true,
  get: function () { return chunk6BI6N6WP_cjs.ANSI_RESET; }
});
Object.defineProperty(exports, "hexToRgb", {
  enumerable: true,
  get: function () { return chunk6BI6N6WP_cjs.hexToRgb; }
});
Object.defineProperty(exports, "paint", {
  enumerable: true,
  get: function () { return chunk6BI6N6WP_cjs.paint; }
});
Object.defineProperty(exports, "rgbToAnsi", {
  enumerable: true,
  get: function () { return chunk6BI6N6WP_cjs.rgbToAnsi; }
});
Object.defineProperty(exports, "styleToAnsi", {
  enumerable: true,
  get: function () { return chunk6BI6N6WP_cjs.styleToAnsi; }
});
Object.defineProperty(exports, "wrapWithAnsi", {
  enumerable: true,
  get: function () { return chunk6BI6N6WP_cjs.wrapWithAnsi; }
});
exports.highlightIterWithAnsi = highlightIterWithAnsi;
