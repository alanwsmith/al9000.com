'use strict';

var chunkCNUQ5AYQ_cjs = require('./chunk-CNUQ5AYQ.cjs');
var chunkEPPEJKAQ_cjs = require('./chunk-EPPEJKAQ.cjs');
var chunk6BI6N6WP_cjs = require('./chunk-6BI6N6WP.cjs');

// src/formatter/bbcode.ts
function escapeBbcodeText(text) {
  return text.replaceAll("[", "&#91;").replaceAll("]", "&#93;");
}
function scopeToTagName(scope, language) {
  return `${scope}.${language}`.replaceAll(".", "-");
}
function formatBBCode(source, events) {
  const sourceBytes = chunkEPPEJKAQ_cjs.encodeSource(source);
  const parts = [];
  const scopeStack = [];
  for (const event of events) {
    if (event.type === "start") {
      const tagName = scopeToTagName(event.scope, event.language);
      parts.push(`[${tagName}]`);
      scopeStack.push(tagName);
      continue;
    }
    if (event.type === "end") {
      const tagName = scopeStack.pop();
      if (tagName) {
        parts.push(`[/${tagName}]`);
      }
      continue;
    }
    const text = chunkEPPEJKAQ_cjs.decodeSourceSlice(sourceBytes, event.startByte, event.endByte);
    parts.push(escapeBbcodeText(text));
  }
  return parts.join("");
}

// src/formatter/html-inline.ts
function spanAttrs(span, formatter) {
  const attrs = {};
  if (formatter.includeHighlights) {
    attrs["data-highlight"] = span.scope;
  }
  const css = chunkEPPEJKAQ_cjs.styleToCss(chunkEPPEJKAQ_cjs.getScopedThemeStyle(formatter.theme, span.scope, span.language), {
    italic: formatter.italic
  });
  if (css) {
    attrs.style = css;
  }
  return attrs;
}
function highlightLineStyle(formatter, lineNumber) {
  const highlightLines = formatter.highlightLines;
  if (!chunkEPPEJKAQ_cjs.lineIsHighlighted(highlightLines?.lines, lineNumber)) {
    return void 0;
  }
  if (highlightLines?.style && highlightLines.style !== "theme") {
    return highlightLines.style;
  }
  const style = chunkEPPEJKAQ_cjs.getThemeStyle(formatter.theme, "highlighted");
  return chunkEPPEJKAQ_cjs.styleToCss(style, { italic: formatter.italic }) || void 0;
}
function highlightLineClass(formatter, lineNumber) {
  return chunkEPPEJKAQ_cjs.getHighlightLineClass(
    formatter.highlightLines?.lines,
    lineNumber,
    formatter.highlightLines?.class
  );
}
function getLineAttrs(formatter, lineNumber) {
  return {
    className: highlightLineClass(formatter, lineNumber),
    style: highlightLineStyle(formatter, lineNumber)
  };
}
function formatHtmlInline(source, events, formatter) {
  const { lines } = chunkEPPEJKAQ_cjs.formatHighlightIterLines(source, events, formatter.language, formatter.theme, {
    openSpan: (span) => chunkEPPEJKAQ_cjs.openSpanTag(spanAttrs(span, formatter))
  });
  const pre = chunkEPPEJKAQ_cjs.openPreTag({ preClass: formatter.preClass, theme: formatter.theme });
  const code = chunkEPPEJKAQ_cjs.openCodeTag(formatter.language);
  const body = lines.map((line, idx) => chunkEPPEJKAQ_cjs.wrapLine(idx + 1, line, getLineAttrs(formatter, idx + 1))).join("");
  return chunkEPPEJKAQ_cjs.wrapWithHeader(`${pre}${code}${body}${chunkEPPEJKAQ_cjs.closingTags()}`, formatter.header);
}

// src/formatter/html-linked.ts
function highlightLineClass2(formatter, lineNumber) {
  return chunkEPPEJKAQ_cjs.getHighlightLineClass(
    formatter.highlightLines?.lines,
    lineNumber,
    formatter.highlightLines?.class,
    "l-highlighted"
  );
}
function getLineAttrs2(formatter, lineNumber) {
  return {
    className: highlightLineClass2(formatter, lineNumber)
  };
}
function formatHtmlLinked(source, events, formatter) {
  const { lines } = chunkEPPEJKAQ_cjs.formatHighlightIterLines(source, events, formatter.language, void 0, {
    openSpan: (span) => chunkEPPEJKAQ_cjs.openSpanTag({ class: chunkEPPEJKAQ_cjs.scopeToClass(span.scope) })
  });
  const pre = chunkEPPEJKAQ_cjs.openPreTag({ preClass: formatter.preClass });
  const code = chunkEPPEJKAQ_cjs.openCodeTag(formatter.language);
  const body = lines.map((line, idx) => chunkEPPEJKAQ_cjs.wrapLine(idx + 1, line, getLineAttrs2(formatter, idx + 1))).join("");
  return chunkEPPEJKAQ_cjs.wrapWithHeader(`${pre}${code}${body}${chunkEPPEJKAQ_cjs.closingTags()}`, formatter.header);
}

// src/formatter/html-multi-themes.ts
function buildNormalThemeVars(styles, prefix, themes, excludeTheme) {
  for (const [themeName, theme] of Object.entries(themes)) {
    if (themeName === excludeTheme) {
      continue;
    }
    const sanitized = chunkEPPEJKAQ_cjs.sanitizeThemeName(themeName);
    const style = chunkEPPEJKAQ_cjs.getThemeStyle(theme, "normal");
    if (style?.fg) styles.push(`${prefix}-${sanitized}:${style.fg};`);
    if (style?.bg) styles.push(`${prefix}-${sanitized}-bg:${style.bg};`);
  }
}
function buildPreThemeStyle(options) {
  const prefix = options.cssVariablePrefix ?? "--lumis";
  const styles = [];
  if (options.defaultTheme === "light-dark()") {
    const lightNormal = chunkEPPEJKAQ_cjs.getThemeStyle(options.themes.light, "normal");
    const darkNormal = chunkEPPEJKAQ_cjs.getThemeStyle(options.themes.dark, "normal");
    const lightFg = lightNormal?.fg ?? "#000000";
    const lightBg = lightNormal?.bg ?? "#ffffff";
    const darkFg = darkNormal?.fg ?? "#ffffff";
    const darkBg = darkNormal?.bg ?? "#000000";
    styles.push(`color: light-dark(${lightFg}, ${darkFg});`);
    styles.push(`background-color: light-dark(${lightBg}, ${darkBg});`);
  } else if (options.defaultTheme) {
    const defaultStyle = chunkEPPEJKAQ_cjs.getThemeStyle(options.themes[options.defaultTheme], "normal");
    if (defaultStyle?.fg) styles.push(`color:${defaultStyle.fg};`);
    if (defaultStyle?.bg) styles.push(`background-color:${defaultStyle.bg};`);
    buildNormalThemeVars(styles, prefix, options.themes, options.defaultTheme);
  } else {
    buildNormalThemeVars(styles, prefix, options.themes);
  }
  return styles.length > 0 ? styles.join(" ") : void 0;
}
function spanAttrs2(span, formatter) {
  return chunkEPPEJKAQ_cjs.spanMultiThemesAttrs({
    language: span.language,
    scope: span.scope,
    themes: formatter.themes,
    defaultTheme: formatter.defaultTheme,
    cssVariablePrefix: formatter.cssVariablePrefix,
    italic: formatter.italic,
    includeHighlights: formatter.includeHighlights
  });
}
function generatePreClasses(formatter) {
  return chunkEPPEJKAQ_cjs.joinClasses("lumis", "lumis-themes", formatter.preClass, ...Object.keys(formatter.themes)) ?? "lumis lumis-themes";
}
function generatePreStyle(formatter) {
  return buildPreThemeStyle({
    themes: formatter.themes,
    defaultTheme: formatter.defaultTheme,
    cssVariablePrefix: formatter.cssVariablePrefix
  });
}
function highlightLineStyle2(formatter, lineNumber) {
  const highlightLines = formatter.highlightLines;
  if (!chunkEPPEJKAQ_cjs.lineIsHighlighted(highlightLines?.lines, lineNumber)) {
    return void 0;
  }
  if (highlightLines?.style && highlightLines.style !== "theme") {
    return highlightLines.style;
  }
  if (!formatter.defaultTheme || formatter.defaultTheme === "light-dark()") {
    return void 0;
  }
  const style = chunkEPPEJKAQ_cjs.getThemeStyle(formatter.themes[formatter.defaultTheme], "highlighted");
  return chunkEPPEJKAQ_cjs.styleToCss(style, { italic: formatter.italic }) || void 0;
}
function highlightLineClass3(formatter, lineNumber) {
  return chunkEPPEJKAQ_cjs.getHighlightLineClass(
    formatter.highlightLines?.lines,
    lineNumber,
    formatter.highlightLines?.class
  );
}
function getLineAttrs3(formatter, lineNumber) {
  return {
    className: highlightLineClass3(formatter, lineNumber),
    style: highlightLineStyle2(formatter, lineNumber)
  };
}
function formatHtmlMultiThemes(source, events, formatter) {
  const theme = formatter.defaultTheme ? formatter.themes[formatter.defaultTheme] : void 0;
  const { lines } = chunkEPPEJKAQ_cjs.formatHighlightIterLines(source, events, formatter.language, theme, {
    openSpan: (span, _style) => chunkEPPEJKAQ_cjs.openTag("span", spanAttrs2(span, formatter))
  });
  const pre = chunkEPPEJKAQ_cjs.openTag("pre", {
    class: generatePreClasses(formatter),
    style: generatePreStyle(formatter)
  });
  const code = chunkEPPEJKAQ_cjs.openCodeTag(formatter.language);
  const body = lines.map((line, idx) => chunkEPPEJKAQ_cjs.wrapLine(idx + 1, line, getLineAttrs3(formatter, idx + 1))).join("");
  return chunkEPPEJKAQ_cjs.wrapWithHeader(`${pre}${code}${body}${chunkEPPEJKAQ_cjs.closingTags()}`, formatter.header);
}

// src/formatter.ts
function htmlInline(options = {}) {
  const formatter = {
    ...options,
    format(source) {
      return formatHtmlInline(
        source,
        chunkCNUQ5AYQ_cjs.highlightEvents(source, formatter.language, { rainbowBrackets: formatter.rainbowBrackets }),
        formatter
      );
    }
  };
  return formatter;
}
function htmlLinked(options = {}) {
  const formatter = {
    ...options,
    format(source) {
      return formatHtmlLinked(
        source,
        chunkCNUQ5AYQ_cjs.highlightEvents(source, formatter.language, { rainbowBrackets: formatter.rainbowBrackets }),
        formatter
      );
    }
  };
  return formatter;
}
function htmlMultiThemes(options) {
  const formatter = {
    ...options,
    format(source) {
      return formatHtmlMultiThemes(
        source,
        chunkCNUQ5AYQ_cjs.highlightEvents(source, formatter.language, { rainbowBrackets: formatter.rainbowBrackets }),
        formatter
      );
    }
  };
  return formatter;
}
function bbcodeScoped(options = {}) {
  const formatter = {
    ...options,
    format(source) {
      return formatBBCode(
        source,
        chunkCNUQ5AYQ_cjs.highlightEvents(source, formatter.language, { rainbowBrackets: formatter.rainbowBrackets })
      );
    }
  };
  return formatter;
}

// src/formatter/terminal.ts
function formatTerminal(source, events, formatter) {
  let output = "";
  const sourceBytes = chunkEPPEJKAQ_cjs.encodeSource(source);
  const scopeStack = [];
  for (const event of events) {
    if (event.type === "start") {
      scopeStack.push({ scope: event.scope, language: event.language });
      continue;
    }
    if (event.type === "end") {
      scopeStack.pop();
      continue;
    }
    const text = chunkEPPEJKAQ_cjs.decodeSourceSlice(sourceBytes, event.startByte, event.endByte);
    const active = scopeStack[scopeStack.length - 1];
    if (active && active.scope.length > 0) {
      const style = chunkEPPEJKAQ_cjs.getScopedThemeStyle(formatter.theme, active.scope, active.language);
      output += chunk6BI6N6WP_cjs.paint(text, style);
    } else {
      output += text;
    }
  }
  return output;
}

// src/terminal.ts
function terminal(options = {}) {
  const formatter = {
    ...options,
    format(source) {
      return formatTerminal(
        source,
        chunkCNUQ5AYQ_cjs.highlightEvents(source, formatter.language, { rainbowBrackets: formatter.rainbowBrackets }),
        formatter
      );
    }
  };
  return formatter;
}

exports.bbcodeScoped = bbcodeScoped;
exports.htmlInline = htmlInline;
exports.htmlLinked = htmlLinked;
exports.htmlMultiThemes = htmlMultiThemes;
exports.terminal = terminal;
