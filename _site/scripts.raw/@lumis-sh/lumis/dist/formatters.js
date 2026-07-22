import { highlightEvents } from './chunk-ZKSRWTOF.js';
import { encodeSource, decodeSourceSlice, formatHighlightIterLines, openSpanTag, openPreTag, openCodeTag, wrapLine, wrapWithHeader, closingTags, scopeToClass, openTag, getScopedThemeStyle, styleToCss, spanMultiThemesAttrs, joinClasses, lineIsHighlighted, getThemeStyle, getHighlightLineClass, sanitizeThemeName } from './chunk-XN6RKY5Q.js';
import { paint } from './chunk-BPQDB427.js';

// src/formatter/bbcode.ts
function escapeBbcodeText(text) {
  return text.replaceAll("[", "&#91;").replaceAll("]", "&#93;");
}
function scopeToTagName(scope, language) {
  return `${scope}.${language}`.replaceAll(".", "-");
}
function formatBBCode(source, events) {
  const sourceBytes = encodeSource(source);
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
    const text = decodeSourceSlice(sourceBytes, event.startByte, event.endByte);
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
  const css = styleToCss(getScopedThemeStyle(formatter.theme, span.scope, span.language), {
    italic: formatter.italic
  });
  if (css) {
    attrs.style = css;
  }
  return attrs;
}
function highlightLineStyle(formatter, lineNumber) {
  const highlightLines = formatter.highlightLines;
  if (!lineIsHighlighted(highlightLines?.lines, lineNumber)) {
    return void 0;
  }
  if (highlightLines?.style && highlightLines.style !== "theme") {
    return highlightLines.style;
  }
  const style = getThemeStyle(formatter.theme, "highlighted");
  return styleToCss(style, { italic: formatter.italic }) || void 0;
}
function highlightLineClass(formatter, lineNumber) {
  return getHighlightLineClass(
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
  const { lines } = formatHighlightIterLines(source, events, formatter.language, formatter.theme, {
    openSpan: (span) => openSpanTag(spanAttrs(span, formatter))
  });
  const pre = openPreTag({ preClass: formatter.preClass, theme: formatter.theme });
  const code = openCodeTag(formatter.language);
  const body = lines.map((line, idx) => wrapLine(idx + 1, line, getLineAttrs(formatter, idx + 1))).join("");
  return wrapWithHeader(`${pre}${code}${body}${closingTags()}`, formatter.header);
}

// src/formatter/html-linked.ts
function highlightLineClass2(formatter, lineNumber) {
  return getHighlightLineClass(
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
  const { lines } = formatHighlightIterLines(source, events, formatter.language, void 0, {
    openSpan: (span) => openSpanTag({ class: scopeToClass(span.scope) })
  });
  const pre = openPreTag({ preClass: formatter.preClass });
  const code = openCodeTag(formatter.language);
  const body = lines.map((line, idx) => wrapLine(idx + 1, line, getLineAttrs2(formatter, idx + 1))).join("");
  return wrapWithHeader(`${pre}${code}${body}${closingTags()}`, formatter.header);
}

// src/formatter/html-multi-themes.ts
function buildNormalThemeVars(styles, prefix, themes, excludeTheme) {
  for (const [themeName, theme] of Object.entries(themes)) {
    if (themeName === excludeTheme) {
      continue;
    }
    const sanitized = sanitizeThemeName(themeName);
    const style = getThemeStyle(theme, "normal");
    if (style?.fg) styles.push(`${prefix}-${sanitized}:${style.fg};`);
    if (style?.bg) styles.push(`${prefix}-${sanitized}-bg:${style.bg};`);
  }
}
function buildPreThemeStyle(options) {
  const prefix = options.cssVariablePrefix ?? "--lumis";
  const styles = [];
  if (options.defaultTheme === "light-dark()") {
    const lightNormal = getThemeStyle(options.themes.light, "normal");
    const darkNormal = getThemeStyle(options.themes.dark, "normal");
    const lightFg = lightNormal?.fg ?? "#000000";
    const lightBg = lightNormal?.bg ?? "#ffffff";
    const darkFg = darkNormal?.fg ?? "#ffffff";
    const darkBg = darkNormal?.bg ?? "#000000";
    styles.push(`color: light-dark(${lightFg}, ${darkFg});`);
    styles.push(`background-color: light-dark(${lightBg}, ${darkBg});`);
  } else if (options.defaultTheme) {
    const defaultStyle = getThemeStyle(options.themes[options.defaultTheme], "normal");
    if (defaultStyle?.fg) styles.push(`color:${defaultStyle.fg};`);
    if (defaultStyle?.bg) styles.push(`background-color:${defaultStyle.bg};`);
    buildNormalThemeVars(styles, prefix, options.themes, options.defaultTheme);
  } else {
    buildNormalThemeVars(styles, prefix, options.themes);
  }
  return styles.length > 0 ? styles.join(" ") : void 0;
}
function spanAttrs2(span, formatter) {
  return spanMultiThemesAttrs({
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
  return joinClasses("lumis", "lumis-themes", formatter.preClass, ...Object.keys(formatter.themes)) ?? "lumis lumis-themes";
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
  if (!lineIsHighlighted(highlightLines?.lines, lineNumber)) {
    return void 0;
  }
  if (highlightLines?.style && highlightLines.style !== "theme") {
    return highlightLines.style;
  }
  if (!formatter.defaultTheme || formatter.defaultTheme === "light-dark()") {
    return void 0;
  }
  const style = getThemeStyle(formatter.themes[formatter.defaultTheme], "highlighted");
  return styleToCss(style, { italic: formatter.italic }) || void 0;
}
function highlightLineClass3(formatter, lineNumber) {
  return getHighlightLineClass(
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
  const { lines } = formatHighlightIterLines(source, events, formatter.language, theme, {
    openSpan: (span, _style) => openTag("span", spanAttrs2(span, formatter))
  });
  const pre = openTag("pre", {
    class: generatePreClasses(formatter),
    style: generatePreStyle(formatter)
  });
  const code = openCodeTag(formatter.language);
  const body = lines.map((line, idx) => wrapLine(idx + 1, line, getLineAttrs3(formatter, idx + 1))).join("");
  return wrapWithHeader(`${pre}${code}${body}${closingTags()}`, formatter.header);
}

// src/formatter.ts
function htmlInline(options = {}) {
  const formatter = {
    ...options,
    format(source) {
      return formatHtmlInline(
        source,
        highlightEvents(source, formatter.language, { rainbowBrackets: formatter.rainbowBrackets }),
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
        highlightEvents(source, formatter.language, { rainbowBrackets: formatter.rainbowBrackets }),
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
        highlightEvents(source, formatter.language, { rainbowBrackets: formatter.rainbowBrackets }),
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
        highlightEvents(source, formatter.language, { rainbowBrackets: formatter.rainbowBrackets })
      );
    }
  };
  return formatter;
}

// src/formatter/terminal.ts
function formatTerminal(source, events, formatter) {
  let output = "";
  const sourceBytes = encodeSource(source);
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
    const text = decodeSourceSlice(sourceBytes, event.startByte, event.endByte);
    const active = scopeStack[scopeStack.length - 1];
    if (active && active.scope.length > 0) {
      const style = getScopedThemeStyle(formatter.theme, active.scope, active.language);
      output += paint(text, style);
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
        highlightEvents(source, formatter.language, { rainbowBrackets: formatter.rainbowBrackets }),
        formatter
      );
    }
  };
  return formatter;
}

export { bbcodeScoped, htmlInline, htmlLinked, htmlMultiThemes, terminal };
