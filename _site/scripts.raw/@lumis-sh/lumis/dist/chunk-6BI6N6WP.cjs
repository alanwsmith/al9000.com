"use strict";

// src/formatter/ansi-core.ts
var ANSI_RESET = "\x1B[0m";
function hexToRgb(hex) {
  const normalized = hex.startsWith("#") ? hex.slice(1) : hex;
  if (normalized.length !== 6) return void 0;
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  if ([r, g, b].some((value) => Number.isNaN(value))) {
    return void 0;
  }
  return [r, g, b];
}
function rgbToAnsi(r, g, b, isBackground) {
  return isBackground
    ? `\x1B[48;2;${r};${g};${b}m`
    : `\x1B[38;2;${r};${g};${b}m`;
}
function styleToAnsi(style) {
  if (!style) return "";
  const codes = [];
  if (style.fg) {
    const rgb = hexToRgb(style.fg);
    if (rgb) codes.push(rgbToAnsi(rgb[0], rgb[1], rgb[2], false));
  }
  if (style.bg) {
    const rgb = hexToRgb(style.bg);
    if (rgb) codes.push(rgbToAnsi(rgb[0], rgb[1], rgb[2], true));
  }
  if (style.bold) codes.push("\x1B[1m");
  if (style.italic) codes.push("\x1B[3m");
  switch (style.underline) {
    case true:
    case "solid":
      codes.push("\x1B[4m");
      break;
    case "wavy":
    case "undercurl":
      codes.push("\x1B[4:3m");
      break;
    case "double":
      codes.push("\x1B[4:2m");
      break;
    case "dotted":
      codes.push("\x1B[4:4m");
      break;
    case "dashed":
      codes.push("\x1B[4:5m");
      break;
  }
  if (style.strikethrough) codes.push("\x1B[9m");
  return codes.join("");
}
function paint(text, style) {
  const open = styleToAnsi(style);
  if (!open) {
    return text;
  }
  if (style?.bg) {
    let result = ANSI_RESET + open;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      if (char === "\n") {
        result += ANSI_RESET;
        result += "\n";
        if (i + 1 < text.length) {
          result += open;
        }
      } else {
        result += char;
      }
    }
    if (!text.endsWith("\n")) {
      result += ANSI_RESET;
    }
    return result;
  }
  return `${ANSI_RESET}${open}${text}${ANSI_RESET}`;
}
function wrapWithAnsi(text, style) {
  return paint(text, style);
}

exports.ANSI_RESET = ANSI_RESET;
exports.hexToRgb = hexToRgb;
exports.paint = paint;
exports.rgbToAnsi = rgbToAnsi;
exports.styleToAnsi = styleToAnsi;
exports.wrapWithAnsi = wrapWithAnsi;
