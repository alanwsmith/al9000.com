'use strict';

// src/css.ts
function buildCss(theme, options = {}) {
  const enableItalic = options.enableItalic ?? true;
  const scope = options.scope ?? "";
  const containerSelector = options.containerSelector ?? ".lumis";
  const containerStyle = options.containerStyle ?? [];
  const rules = [];
  rules.push(
    `/* ${theme.name}
 * revision: ${theme.revision ?? ""}
 */
${scopedSelector(scope, containerSelector)}`
  );
  const normal = theme.highlights["normal"];
  const scopeStyle = renderContainerStyle(normal, containerStyle, "\n  ");
  if (scopeStyle === "") {
    rules.push(" {}\n");
  } else {
    rules.push(` {
  ${scopeStyle}
}
`);
  }
  const entries = Object.entries(theme.highlights).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
  for (const [scopeName, style] of entries) {
    if (scopeName === "normal") {
      continue;
    }
    const styleCss = renderStyle(style, enableItalic, "\n  ");
    if (styleCss !== "") {
      rules.push(`${scopePrefix(scope)}.l-${scopeName.replaceAll(".", "-")} {
  ${styleCss}
}
`);
    }
  }
  return rules.join("");
}
function scopePrefix(scope) {
  return scope === "" ? "" : `${scope} `;
}
function scopedSelector(scope, selector) {
  return scope === "" ? selector : `${scope} ${selector}`;
}
function renderContainerStyle(normal, containerStyle, separator) {
  const decls = [];
  if (normal?.fg) {
    decls.push(["color", normal.fg]);
  }
  if (normal?.bg) {
    decls.push(["background-color", normal.bg]);
  }
  for (const [property, value] of containerStyle) {
    const existing = decls.find(([p]) => p === property);
    if (existing) {
      existing[1] = value;
    } else {
      decls.push([property, value]);
    }
  }
  return decls.map(([property, value]) => `${property}: ${value};`).join(separator);
}
function renderStyle(style, enableItalic, separator) {
  const rules = [];
  if (style.fg) {
    rules.push(`color: ${style.fg};`);
  }
  if (style.bg) {
    rules.push(`background-color: ${style.bg};`);
  }
  if (style.bold) {
    rules.push("font-weight: bold;");
  }
  if (enableItalic && style.italic) {
    rules.push("font-style: italic;");
  }
  const underline = underlineDecoration(style.underline);
  if (underline && style.strikethrough) {
    rules.push(`text-decoration: ${underline} line-through;`);
  } else if (underline) {
    rules.push(`text-decoration: ${underline};`);
  } else if (style.strikethrough) {
    rules.push("text-decoration: line-through;");
  }
  return rules.join(separator);
}
function underlineDecoration(underline) {
  switch (underline) {
    case "solid":
      return "underline";
    case "wavy":
    case "undercurl":
      return "underline wavy";
    case "double":
      return "underline double";
    case "dotted":
      return "underline dotted";
    case "dashed":
      return "underline dashed";
    default:
      return void 0;
  }
}

exports.buildCss = buildCss;
