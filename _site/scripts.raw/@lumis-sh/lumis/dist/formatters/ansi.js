import { paint } from '../chunk-BPQDB427.js';
export { ANSI_RESET, hexToRgb, paint, rgbToAnsi, styleToAnsi, wrapWithAnsi } from '../chunk-BPQDB427.js';

// src/formatter/ansi.ts
async function highlightIterWithAnsi(source, language, theme) {
  const { highlight, highlightIter } = await import('../index.js');
  const segments = [];
  await highlight(source, {
    language,
    format(src) {
      highlightIter(src, this.language, theme, (text, _language, range, _scope, style) => {
        segments.push([paint(text, style), range]);
      });
      return "";
    }
  });
  return segments;
}

export { highlightIterWithAnsi };
