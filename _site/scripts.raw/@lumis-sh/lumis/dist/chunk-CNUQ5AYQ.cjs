'use strict';

var chunkEPPEJKAQ_cjs = require('./chunk-EPPEJKAQ.cjs');

// src/types.ts
var PLAINTEXT_LANG_ID = "plaintext";

// src/events.ts
var encoder = new TextEncoder();
var decoder = new TextDecoder();
function utf8ByteLength(codePoint) {
  if (codePoint <= 127) return 1;
  if (codePoint <= 2047) return 2;
  if (codePoint <= 65535) return 3;
  return 4;
}
function buildUtf8OffsetMap(source) {
  const offsets = Array.from({ length: source.length + 1 });
  offsets[0] = 0;
  let codeUnitOffset = 0;
  let byteOffset = 0;
  for (const char of source) {
    offsets[codeUnitOffset] = byteOffset;
    const codePoint = char.codePointAt(0);
    const charCodeUnits = char.length;
    const charBytes = utf8ByteLength(codePoint);
    for (let i = 1; i < charCodeUnits; i += 1) {
      offsets[codeUnitOffset + i] = byteOffset;
    }
    codeUnitOffset += charCodeUnits;
    byteOffset += charBytes;
    offsets[codeUnitOffset] = byteOffset;
  }
  return offsets;
}
function buildLineStartMap(source) {
  const starts = [0];
  for (let i = 0; i < source.length; i += 1) {
    if (source[i] === "\n") {
      starts.push(i + 1);
    }
  }
  return starts;
}
function buildSourceMaps(source) {
  const utf8Offsets = buildUtf8OffsetMap(source);
  return {
    utf8Offsets,
    lineStarts: buildLineStartMap(source),
    sourceBytes: encoder.encode(source),
    sourceUtf8ByteLength: utf8Offsets[source.length] ?? 0
  };
}
function nodeStartByte(node, maps) {
  return maps.utf8Offsets[node.startIndex] ?? 0;
}
function nodeEndByte(node, maps) {
  return maps.utf8Offsets[node.endIndex] ?? 0;
}
function decodeNodeText(node, maps, decoder3) {
  return decoder3.decode(
    maps.sourceBytes.subarray(nodeStartByte(node, maps), nodeEndByte(node, maps))
  );
}
function sameNode(a, b) {
  return a.startIndex === b.startIndex && a.endIndex === b.endIndex && a.type === b.type;
}
function compareCaptures(a, b) {
  const startDiff = a.startByte - b.startByte;
  if (startDiff !== 0) return startDiff;
  const depthDiff = a.depth - b.depth;
  if (depthDiff !== 0) return depthDiff;
  const endDiff = b.endByte - a.endByte;
  if (endDiff !== 0) return endDiff;
  if (a.scope !== b.scope) {
    return a.scope < b.scope ? -1 : 1;
  }
  if (a.language !== b.language) {
    return a.language < b.language ? -1 : 1;
  }
  return 0;
}
function mergeSortedCaptures(left, right) {
  if (left.length === 0) return right;
  if (right.length === 0) return left;
  const merged = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    const leftCapture = left[leftIndex];
    const rightCapture = right[rightIndex];
    if (compareCaptures(leftCapture, rightCapture) <= 0) {
      merged.push(leftCapture);
      leftIndex += 1;
    } else {
      merged.push(rightCapture);
      rightIndex += 1;
    }
  }
  while (leftIndex < left.length) {
    merged.push(left[leftIndex]);
    leftIndex += 1;
  }
  while (rightIndex < right.length) {
    merged.push(right[rightIndex]);
    rightIndex += 1;
  }
  return merged;
}
function filterSpecialPunctuationCaptures(captures, sourceBytes) {
  const activeStrings = [];
  const filtered = [];
  for (const capture of captures) {
    while (activeStrings.length > 0 && activeStrings[activeStrings.length - 1].endByte <= capture.startByte) {
      activeStrings.pop();
    }
    let keepCapture = true;
    if (capture.scope === "punctuation.special" && capture.endByte - capture.startByte === 2 && sourceBytes[capture.startByte] === 36 && sourceBytes[capture.startByte + 1] === 123) {
      let sameLayerString = false;
      let nestedString = false;
      for (let i = activeStrings.length - 1; i >= 0; i -= 1) {
        const active = activeStrings[i];
        if (active.endByte < capture.endByte) {
          continue;
        }
        if (active.depth === capture.depth) {
          sameLayerString = true;
        } else if (active.depth > capture.depth) {
          nestedString = true;
        }
        if (sameLayerString && nestedString) {
          break;
        }
      }
      keepCapture = !sameLayerString || nestedString;
    }
    if (keepCapture) {
      filtered.push(capture);
      if (capture.scope === "string") {
        activeStrings.push(capture);
      }
    }
  }
  return filtered;
}
function dedupeCaptures(captures) {
  const deduped = [];
  let lastCapture;
  for (const capture of captures) {
    if (!lastCapture || capture.startByte !== lastCapture.startByte || capture.endByte !== lastCapture.endByte || capture.depth !== lastCapture.depth) {
      deduped.push(capture);
      lastCapture = capture;
    } else {
      deduped[deduped.length - 1] = capture;
      lastCapture = capture;
    }
  }
  return deduped;
}
function normalizeCaptures(captures, sourceBytes) {
  return dedupeCaptures(filterSpecialPunctuationCaptures(captures, sourceBytes));
}
function resolveLayerCaptures(queryCaptures, maps, language, depth) {
  const captures = [];
  const scopeStack = [
    {
      inherits: false,
      endByte: maps.sourceUtf8ByteLength,
      localDefs: []
    }
  ];
  for (let index = 0; index < queryCaptures.length; ) {
    const first = queryCaptures[index];
    const startByte = nodeStartByte(first.node, maps);
    const endByte = nodeEndByte(first.node, maps);
    while (scopeStack.length > 1 && startByte > scopeStack[scopeStack.length - 1].endByte) {
      scopeStack.pop();
    }
    let selectedScope;
    let referenceHighlight;
    let definitionTarget;
    let definitionName;
    let definitionValueEndByte = 0;
    let nextIndex = index;
    while (nextIndex < queryCaptures.length && sameNode(first.node, queryCaptures[nextIndex].node)) {
      const capture = queryCaptures[nextIndex];
      const config = language.config;
      const metadata = config.captureMetadata[capture.name];
      if (capture.patternIndex < config.injectionPatternEnd) {
        nextIndex += 1;
        continue;
      }
      if (capture.patternIndex < config.localsPatternEnd) {
        if (metadata?.isLocalScope) {
          const inheritsValue = capture.setProperties?.["local.scope-inherits"];
          scopeStack.push({
            inherits: inheritsValue == null || inheritsValue === "true",
            endByte,
            localDefs: []
          });
        } else if (metadata?.isLocalDefinitionValue) {
          definitionValueEndByte = nodeEndByte(capture.node, maps);
        } else if (metadata?.isLocalDefinition) {
          definitionName = decodeNodeText(capture.node, maps, decoder);
        } else if (metadata?.isLocalReference && !definitionTarget) {
          const name = decodeNodeText(capture.node, maps, decoder);
          for (let scopeIndex = scopeStack.length - 1; scopeIndex >= 0; scopeIndex -= 1) {
            const scope = scopeStack[scopeIndex];
            let highlight;
            for (let defIndex = scope.localDefs.length - 1; defIndex >= 0; defIndex -= 1) {
              const def = scope.localDefs[defIndex];
              if (def.name === name && startByte >= def.valueEndByte) {
                highlight = def.highlight;
                break;
              }
            }
            if (highlight) {
              referenceHighlight = highlight;
              break;
            }
            if (!scope.inherits) {
              break;
            }
          }
        }
        nextIndex += 1;
        continue;
      }
      const currentScope = metadata?.highlightScope;
      const isLocalNode = definitionName != null || referenceHighlight != null;
      if (currentScope && !(isLocalNode && language.config.nonLocalVariablePatterns[capture.patternIndex])) {
        selectedScope = currentScope;
      }
      nextIndex += 1;
    }
    if (definitionName != null) {
      const scope = scopeStack[scopeStack.length - 1];
      definitionTarget = {
        name: definitionName,
        valueEndByte: definitionValueEndByte
      };
      scope.localDefs.push(definitionTarget);
    }
    const effectiveScope = referenceHighlight ?? selectedScope;
    if (effectiveScope && startByte < endByte) {
      captures.push({
        startByte,
        endByte,
        scope: effectiveScope,
        language: language.definition.id,
        depth
      });
      if (definitionTarget) {
        definitionTarget.highlight = selectedScope;
      }
    }
    index = nextIndex;
  }
  return captures;
}
function resolveInjection(match, language, lineStarts, parentLanguageName) {
  let languageName;
  const contentCaptures = [];
  for (const capture of match.captures) {
    const metadata = language.config.captureMetadata[capture.name];
    if (metadata?.isInjectionLanguage && !languageName) {
      languageName = capture.node.text;
    } else if (metadata?.isInjectionContent) {
      contentCaptures.push(capture);
    }
  }
  const setProperties = match.setProperties ?? {};
  if (!languageName) {
    languageName = setProperties["injection.language"] ?? void 0;
  }
  if (!languageName && "injection.self" in setProperties) {
    languageName = language.definition.id;
  }
  if (!languageName && "injection.parent" in setProperties) {
    languageName = parentLanguageName;
  }
  const includeChildren = "injection.include-children" in setProperties;
  const ranges = contentCaptures.flatMap(
    (capture) => getCaptureRanges(
      capture,
      language.config.injectionOffsets[match.patternIndex],
      lineStarts,
      includeChildren
    )
  );
  return { languageName, ranges };
}
function collectLayerCaptures(source, maps, runtime, language, depth, includedRanges, parentLanguageName) {
  const tree = language.parser.parse(source, null, includedRanges ? { includedRanges } : void 0);
  if (!tree) return [];
  try {
    const rootNode = tree.rootNode;
    const ownCaptures = resolveLayerCaptures(
      language.config.query.captures(rootNode),
      maps,
      language,
      depth
    );
    if (language.config.injectionPatternEnd === 0) {
      return ownCaptures;
    }
    let injectedCaptures = [];
    for (const match of language.config.query.matches(rootNode)) {
      if (match.patternIndex >= language.config.injectionPatternEnd) {
        continue;
      }
      const resolved = resolveInjection(match, language, maps.lineStarts, parentLanguageName);
      if (!resolved.languageName || resolved.ranges.length === 0) {
        continue;
      }
      const injectedLanguage = runtime.getLoadedLanguage(resolved.languageName);
      if (!injectedLanguage) {
        continue;
      }
      const childCaptures = collectLayerCaptures(
        source,
        maps,
        runtime,
        injectedLanguage,
        depth + 1,
        resolved.ranges,
        language.definition.id
      );
      if (childCaptures.length > 0) {
        injectedCaptures = mergeSortedCaptures(injectedCaptures, childCaptures);
      }
    }
    return mergeSortedCaptures(ownCaptures, injectedCaptures);
  } finally {
    tree.delete();
  }
}
function getCaptureRanges(capture, offsetsByCapture, lineStarts, includeChildren) {
  const offset = offsetsByCapture?.[capture.name];
  const baseRange = nodeToRange(capture.node);
  const adjustedRange = offset ? applyOffset(baseRange, offset, lineStarts) : baseRange;
  if (includeChildren || capture.node.childCount === 0) {
    return [adjustedRange];
  }
  return getInjectionRanges(capture.node).map((nodeRange) => intersectRange(nodeRange, adjustedRange, lineStarts)).filter((range) => range != null);
}
function applyOffset(range, offset, lineStarts) {
  const startPosition = {
    row: range.startPosition.row + offset.startRow,
    column: range.startPosition.column + offset.startColumn
  };
  const endPosition = {
    row: range.endPosition.row + offset.endRow,
    column: range.endPosition.column + offset.endColumn
  };
  return makeRange(
    pointToIndex(startPosition, lineStarts),
    pointToIndex(endPosition, lineStarts),
    startPosition,
    endPosition
  );
}
function pointToIndex(point, lineStarts) {
  const lineStart = lineStarts[point.row];
  if (lineStart == null) {
    throw new Error(`Invalid point row ${point.row}`);
  }
  return lineStart + point.column;
}
function intersectRange(range, bounds, lineStarts) {
  const startIndex = Math.max(range.startIndex, bounds.startIndex);
  const endIndex = Math.min(range.endIndex, bounds.endIndex);
  if (startIndex >= endIndex) {
    return void 0;
  }
  return makeRange(
    startIndex,
    endIndex,
    indexToPoint(startIndex, lineStarts),
    indexToPoint(endIndex, lineStarts)
  );
}
function indexToPoint(index, lineStarts) {
  let low = 0;
  let high = lineStarts.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const lineStart = lineStarts[mid] ?? 0;
    const nextLineStart = lineStarts[mid + 1] ?? Number.POSITIVE_INFINITY;
    if (index < lineStart) {
      high = mid - 1;
    } else if (index >= nextLineStart) {
      low = mid + 1;
    } else {
      return { row: mid, column: index - lineStart };
    }
  }
  throw new Error(`Invalid source index ${index}`);
}
function getInjectionRanges(node, includeChildren) {
  if (node.childCount === 0) {
    return [nodeToRange(node)];
  }
  const ranges = [];
  let startIndex = node.startIndex;
  let startPosition = node.startPosition;
  for (const child of node.children) {
    if (!child) continue;
    if (!child.isNamed) {
      continue;
    }
    if (startIndex < child.startIndex) {
      ranges.push(makeRange(startIndex, child.startIndex, startPosition, child.startPosition));
    }
    startIndex = child.endIndex;
    startPosition = child.endPosition;
  }
  if (startIndex < node.endIndex) {
    ranges.push(makeRange(startIndex, node.endIndex, startPosition, node.endPosition));
  }
  return ranges;
}
function nodeToRange(node) {
  return makeRange(node.startIndex, node.endIndex, node.startPosition, node.endPosition);
}
function makeRange(startIndex, endIndex, startPosition, endPosition) {
  return { startIndex, endIndex, startPosition, endPosition };
}
function buildHighlightEvents(source, language, runtime, options = {}) {
  const maps = buildSourceMaps(source);
  const captures = normalizeCaptures(
    collectLayerCaptures(source, maps, runtime, language, 0),
    maps.sourceBytes
  );
  const events = buildNestedEvents(captures, maps.sourceUtf8ByteLength);
  return options.rainbowBrackets ? applyRainbowBrackets(source, events, language, maps) : events;
}
var RAINBOW_BRACKET_SCOPES = [
  "punctuation.bracket.rainbow.1",
  "punctuation.bracket.rainbow.2",
  "punctuation.bracket.rainbow.3",
  "punctuation.bracket.rainbow.4",
  "punctuation.bracket.rainbow.5",
  "punctuation.bracket.rainbow.6"
];
function queryRainbowBracketRanges(source, language, maps) {
  if (!language.brackets) return [];
  const tree = language.parser.parse(source);
  if (!tree) return [];
  try {
    const pairs = [];
    for (const match of language.brackets.query.matches(tree.rootNode)) {
      if (language.brackets.rainbowExcludePatterns[match.patternIndex]) {
        continue;
      }
      const opens = [];
      const closes = [];
      for (const capture of match.captures) {
        const metadata = language.brackets.captureMetadata[capture.name];
        if (metadata?.isOpen) {
          opens.push({
            startByte: nodeStartByte(capture.node, maps),
            endByte: nodeEndByte(capture.node, maps)
          });
        } else if (metadata?.isClose) {
          closes.push({
            startByte: nodeStartByte(capture.node, maps),
            endByte: nodeEndByte(capture.node, maps)
          });
        }
      }
      for (let index = 0; index < Math.min(opens.length, closes.length); index += 1) {
        const open = opens[index];
        const close = closes[index];
        if (open.startByte < close.endByte && (open.endByte - open.startByte === 1 || close.endByte - close.startByte === 1)) {
          pairs.push({ open, close });
        }
      }
    }
    return colorizeBracketPairs(pairs);
  } finally {
    tree.delete();
  }
}
function colorizeBracketPairs(pairs) {
  const opens = pairs.map((pair) => pair.open).sort((a, b) => a.startByte - b.startByte || a.endByte - b.endByte).filter((range, index, all) => {
    const previous = all[index - 1];
    return !previous || previous.startByte !== range.startByte || previous.endByte !== range.endByte;
  });
  const colorPairs = pairs.slice().sort((a, b) => a.close.endByte - b.close.endByte);
  const openStack = [];
  const ranges = [];
  let openIndex = 0;
  for (const pair of colorPairs) {
    while (openIndex < opens.length && opens[openIndex].startByte < pair.close.startByte) {
      openStack.push(opens[openIndex]);
      openIndex += 1;
    }
    const lastOpen = openStack[openStack.length - 1];
    if (lastOpen && lastOpen.startByte === pair.open.startByte && lastOpen.endByte === pair.open.endByte) {
      const scope = RAINBOW_BRACKET_SCOPES[(openStack.length - 1) % RAINBOW_BRACKET_SCOPES.length];
      ranges.push({ startByte: pair.open.startByte, endByte: pair.open.endByte, scope });
      ranges.push({ startByte: pair.close.startByte, endByte: pair.close.endByte, scope });
      openStack.pop();
    }
  }
  return ranges.sort((a, b) => a.startByte - b.startByte || a.endByte - b.endByte);
}
function applyRainbowBrackets(source, events, language, maps) {
  const ranges = queryRainbowBracketRanges(source, language, maps);
  if (ranges.length === 0) return events;
  const output = [];
  let rangeIndex = 0;
  for (const event of events) {
    if (event.type !== "source") {
      output.push(event);
      continue;
    }
    let cursor = event.startByte;
    while (rangeIndex < ranges.length && ranges[rangeIndex].endByte <= event.startByte) {
      rangeIndex += 1;
    }
    let nextIndex = rangeIndex;
    while (nextIndex < ranges.length) {
      const range = ranges[nextIndex];
      if (range.startByte >= event.endByte) break;
      if (range.startByte < event.startByte || range.endByte > event.endByte) {
        nextIndex += 1;
        continue;
      }
      if (cursor < range.startByte) {
        output.push({ type: "source", startByte: cursor, endByte: range.startByte });
      }
      output.push({ type: "start", scope: range.scope, language: language.definition.id });
      output.push({ type: "source", startByte: range.startByte, endByte: range.endByte });
      output.push({ type: "end" });
      cursor = range.endByte;
      nextIndex += 1;
    }
    if (cursor < event.endByte) {
      output.push({ type: "source", startByte: cursor, endByte: event.endByte });
    }
  }
  return output;
}
function buildNestedEvents(inputCaptures, sourceUtf8ByteLength) {
  const captures = inputCaptures.slice().sort((a, b) => {
    if (a.startByte !== b.startByte) return a.startByte - b.startByte;
    if (a.endByte !== b.endByte) return b.endByte - a.endByte;
    return a.depth - b.depth;
  });
  const events = [];
  const scopeStack = [];
  let cursor = 0;
  let captureIndex = 0;
  function emitSource(endByte) {
    if (endByte > cursor) {
      events.push({ type: "source", startByte: cursor, endByte });
      cursor = endByte;
    }
  }
  function closeScopes(upToPos) {
    while (scopeStack.length > 0 && scopeStack[scopeStack.length - 1].endByte <= upToPos) {
      emitSource(scopeStack[scopeStack.length - 1].endByte);
      scopeStack.pop();
      events.push({ type: "end" });
    }
  }
  while (captureIndex < captures.length) {
    const capture = captures[captureIndex];
    closeScopes(capture.startByte);
    emitSource(capture.startByte);
    events.push({
      type: "start",
      scope: capture.scope,
      language: capture.language
    });
    scopeStack.push({
      endByte: capture.endByte,
      scope: capture.scope,
      language: capture.language
    });
    captureIndex++;
  }
  closeScopes(sourceUtf8ByteLength);
  emitSource(sourceUtf8ByteLength);
  return events;
}

// src/generated/language-loaders.ts
var LANGUAGE_LOADERS = {
  "angular": () => import('./langs/angular.cjs'),
  "asm": () => import('./langs/asm.cjs'),
  "astro": () => import('./langs/astro.cjs'),
  "bash": () => import('./langs/bash.cjs'),
  "c": () => import('./langs/c.cjs'),
  "caddy": () => import('./langs/caddy.cjs'),
  "clojure": () => import('./langs/clojure.cjs'),
  "cmake": () => import('./langs/cmake.cjs'),
  "comment": () => import('./langs/comment.cjs'),
  "commonlisp": () => import('./langs/commonlisp.cjs'),
  "cpp": () => import('./langs/cpp.cjs'),
  "csharp": () => import('./langs/csharp.cjs'),
  "css": () => import('./langs/css.cjs'),
  "csv": () => import('./langs/csv.cjs'),
  "dart": () => import('./langs/dart.cjs'),
  "diff": () => import('./langs/diff.cjs'),
  "dockerfile": () => import('./langs/dockerfile.cjs'),
  "eex": () => import('./langs/eex.cjs'),
  "ejs": () => import('./langs/ejs.cjs'),
  "elixir": () => import('./langs/elixir.cjs'),
  "elm": () => import('./langs/elm.cjs'),
  "erb": () => import('./langs/erb.cjs'),
  "erlang": () => import('./langs/erlang.cjs'),
  "fish": () => import('./langs/fish.cjs'),
  "fsharp": () => import('./langs/fsharp.cjs'),
  "gleam": () => import('./langs/gleam.cjs'),
  "glimmer": () => import('./langs/glimmer.cjs'),
  "go": () => import('./langs/go.cjs'),
  "graphql": () => import('./langs/graphql.cjs'),
  "haskell": () => import('./langs/haskell.cjs'),
  "hcl": () => import('./langs/hcl.cjs'),
  "heex": () => import('./langs/heex.cjs'),
  "html": () => import('./langs/html.cjs'),
  "http": () => import('./langs/http.cjs'),
  "iex": () => import('./langs/iex.cjs'),
  "ini": () => import('./langs/ini.cjs'),
  "java": () => import('./langs/java.cjs'),
  "javascript": () => import('./langs/javascript.cjs'),
  "json": () => import('./langs/json.cjs'),
  "julia": () => import('./langs/julia.cjs'),
  "kotlin": () => import('./langs/kotlin.cjs'),
  "latex": () => import('./langs/latex.cjs'),
  "liquid": () => import('./langs/liquid.cjs'),
  "llvm": () => import('./langs/llvm.cjs'),
  "lua": () => import('./langs/lua.cjs'),
  "make": () => import('./langs/make.cjs'),
  "markdown": () => import('./langs/markdown.cjs'),
  "markdown_inline": () => import('./langs/markdown_inline.cjs'),
  "nix": () => import('./langs/nix.cjs'),
  "nushell": () => import('./langs/nushell.cjs'),
  "objc": () => import('./langs/objc.cjs'),
  "ocaml": () => import('./langs/ocaml.cjs'),
  "ocaml_interface": () => import('./langs/ocaml_interface.cjs'),
  "perl": () => import('./langs/perl.cjs'),
  "php": () => import('./langs/php.cjs'),
  "powershell": () => import('./langs/powershell.cjs'),
  "protobuf": () => import('./langs/protobuf.cjs'),
  "python": () => import('./langs/python.cjs'),
  "r": () => import('./langs/r.cjs'),
  "regex": () => import('./langs/regex.cjs'),
  "ruby": () => import('./langs/ruby.cjs'),
  "rust": () => import('./langs/rust.cjs'),
  "scala": () => import('./langs/scala.cjs'),
  "scss": () => import('./langs/scss.cjs'),
  "sql": () => import('./langs/sql.cjs'),
  "surface": () => import('./langs/surface.cjs'),
  "svelte": () => import('./langs/svelte.cjs'),
  "swift": () => import('./langs/swift.cjs'),
  "toml": () => import('./langs/toml.cjs'),
  "tsx": () => import('./langs/tsx.cjs'),
  "typescript": () => import('./langs/typescript.cjs'),
  "typst": () => import('./langs/typst.cjs'),
  "vim": () => import('./langs/vim.cjs'),
  "vue": () => import('./langs/vue.cjs'),
  "wat": () => import('./langs/wat.cjs'),
  "xml": () => import('./langs/xml.cjs'),
  "yaml": () => import('./langs/yaml.cjs'),
  "zig": () => import('./langs/zig.cjs'),
  "arduino": () => import('./langs/arduino.cjs'),
  "bicep": () => import('./langs/bicep.cjs'),
  "dot": () => import('./langs/dot.cjs'),
  "editorconfig": () => import('./langs/editorconfig.cjs'),
  "gitattributes": () => import('./langs/gitattributes.cjs'),
  "javadoc": () => import('./langs/javadoc.cjs'),
  "jq": () => import('./langs/jq.cjs'),
  "kdl": () => import('./langs/kdl.cjs'),
  "luadoc": () => import('./langs/luadoc.cjs'),
  "nim": () => import('./langs/nim.cjs'),
  "pascal": () => import('./langs/pascal.cjs'),
  "puppet": () => import('./langs/puppet.cjs'),
  "terraform": () => import('./langs/terraform.cjs'),
  "toon": () => import('./langs/toon.cjs'),
  "wgsl": () => import('./langs/wgsl.cjs'),
  "zsh": () => import('./langs/zsh.cjs'),
  "d": () => import('./langs/d.cjs'),
  "fortran": () => import('./langs/fortran.cjs'),
  "gitignore": () => import('./langs/gitignore.cjs'),
  "glsl": () => import('./langs/glsl.cjs'),
  "jinja": () => import('./langs/jinja.cjs'),
  "jinja_inline": () => import('./langs/jinja_inline.cjs'),
  "json5": () => import('./langs/json5.cjs'),
  "just": () => import('./langs/just.cjs'),
  "matlab": () => import('./langs/matlab.cjs'),
  "mermaid": () => import('./langs/mermaid.cjs'),
  "nginx": () => import('./langs/nginx.cjs'),
  "prisma": () => import('./langs/prisma.cjs'),
  "qmljs": () => import('./langs/qmljs.cjs'),
  "racket": () => import('./langs/racket.cjs'),
  "rst": () => import('./langs/rst.cjs'),
  "scheme": () => import('./langs/scheme.cjs'),
  "solidity": () => import('./langs/solidity.cjs'),
  "systemverilog": () => import('./langs/systemverilog.cjs'),
  "tcl": () => import('./langs/tcl.cjs'),
  "vhdl": () => import('./langs/vhdl.cjs'),
  "plaintext": () => import('./langs/plaintext.cjs')
};

// src/generated/language-detection.ts
var EXACT_LANGUAGE_MAP = {
  "angular": "angular",
  "asm": "asm",
  "assembly": "asm",
  "astro": "astro",
  "bash": "bash",
  "sh": "bash",
  "c": "c",
  "caddy": "caddy",
  "clojure": "clojure",
  "cmake": "cmake",
  "comment": "comment",
  "commonlisp": "commonlisp",
  "cpp": "cpp",
  "c++": "cpp",
  "csharp": "csharp",
  "c#": "csharp",
  "css": "css",
  "csv": "csv",
  "dart": "dart",
  "diff": "diff",
  "dockerfile": "dockerfile",
  "docker": "dockerfile",
  "eex": "eex",
  "ejs": "ejs",
  "elixir": "elixir",
  "elm": "elm",
  "erb": "erb",
  "erlang": "erlang",
  "fish": "fish",
  "fsharp": "fsharp",
  "f#": "fsharp",
  "gleam": "gleam",
  "glimmer": "glimmer",
  "ember": "glimmer",
  "handlebars": "glimmer",
  "go": "go",
  "graphql": "graphql",
  "haskell": "haskell",
  "hcl": "hcl",
  "heex": "heex",
  "html": "html",
  "http": "http",
  "iex": "iex",
  "ini": "ini",
  "java": "java",
  "javascript": "javascript",
  "js": "javascript",
  "jsx": "javascript",
  "json": "json",
  "julia": "julia",
  "kotlin": "kotlin",
  "latex": "latex",
  "tex": "latex",
  "liquid": "liquid",
  "llvm": "llvm",
  "lua": "lua",
  "make": "make",
  "markdown": "markdown",
  "markdown_inline": "markdown_inline",
  "nix": "nix",
  "nushell": "nushell",
  "nu": "nushell",
  "objc": "objc",
  "objective-c": "objc",
  "ocaml": "ocaml",
  "ocaml_interface": "ocaml_interface",
  "perl": "perl",
  "php": "php",
  "powershell": "powershell",
  "protobuf": "protobuf",
  "python": "python",
  "r": "r",
  "regex": "regex",
  "ruby": "ruby",
  "rust": "rust",
  "scala": "scala",
  "scss": "scss",
  "sql": "sql",
  "surface": "surface",
  "svelte": "svelte",
  "swift": "swift",
  "toml": "toml",
  "tsx": "tsx",
  "typescript": "typescript",
  "ts": "typescript",
  "typst": "typst",
  "vim": "vim",
  "viml": "vim",
  "vimscript": "vim",
  "vue": "vue",
  "wat": "wat",
  "wasm": "wat",
  "webassembly": "wat",
  "xml": "xml",
  "yaml": "yaml",
  "zig": "zig",
  "arduino": "arduino",
  "bicep": "bicep",
  "dot": "dot",
  "editorconfig": "editorconfig",
  "gitattributes": "gitattributes",
  "javadoc": "javadoc",
  "jq": "jq",
  "kdl": "kdl",
  "luadoc": "luadoc",
  "nim": "nim",
  "pascal": "pascal",
  "puppet": "puppet",
  "terraform": "terraform",
  "toon": "toon",
  "wgsl": "wgsl",
  "zsh": "zsh",
  "d": "d",
  "fortran": "fortran",
  "gitignore": "gitignore",
  "glsl": "glsl",
  "jinja": "jinja",
  "jinja2": "jinja",
  "jinja_inline": "jinja_inline",
  "json5": "json5",
  "just": "just",
  "matlab": "matlab",
  "mermaid": "mermaid",
  "nginx": "nginx",
  "prisma": "prisma",
  "qmljs": "qmljs",
  "qml": "qmljs",
  "racket": "racket",
  "rst": "rst",
  "restructuredtext": "rst",
  "scheme": "scheme",
  "solidity": "solidity",
  "systemverilog": "systemverilog",
  "tcl": "tcl",
  "vhdl": "vhdl",
  "plaintext": "plaintext",
  "text": "plaintext",
  "txt": "plaintext",
  "plain": "plaintext"
};
var EMACS_MODE_MAP = {
  "sh": "bash",
  "c": "c",
  "clojure": "clojure",
  "lisp": "commonlisp",
  "c++": "cpp",
  "csharp": "csharp",
  "css": "css",
  "csv": "csv",
  "elixir": "elixir",
  "elm": "elm",
  "fsharp": "fsharp",
  "gleam": "gleam",
  "go": "go",
  "haskell": "haskell",
  "hcl": "hcl",
  "html": "html",
  "java": "java",
  "js": "javascript",
  "js2": "javascript",
  "julia": "julia",
  "nix": "nix",
  "objc": "objc",
  "tuareg": "ocaml",
  "perl": "perl",
  "python": "python",
  "ruby": "ruby",
  "rust": "rust",
  "scala": "scala",
  "scss": "scss",
  "sql": "sql",
  "surface": "surface",
  "swift": "swift",
  "toml": "toml",
  "tsx": "tsx",
  "typescript": "typescript",
  "nxml": "xml",
  "yaml": "yaml",
  "zig": "zig",
  "fundamental": "plaintext",
  "text": "plaintext"
};
var SHEBANG_MAP = {
  "ash": "bash",
  "bash": "bash",
  "dash": "bash",
  "ksh": "bash",
  "mksh": "bash",
  "pdksh": "bash",
  "rc": "bash",
  "sh": "bash",
  "tcc": "c",
  "lisp": "commonlisp",
  "sbc": "commonlisp",
  "ccl": "commonlisp",
  "clisp": "commonlisp",
  "ecl": "commonlisp",
  "elixir": "elixir",
  "runghc": "haskell",
  "runhaskell": "haskell",
  "runhugs": "haskell",
  "nu": "nushell",
  "ocaml": "ocaml",
  "ocamlrun": "ocaml",
  "ocamlscript": "ocaml",
  "perl": "perl",
  "python": "python",
  "python2": "python",
  "python3": "python",
  "rscript": "r",
  "ruby": "ruby",
  "macruby": "ruby",
  "rake": "ruby",
  "jruby": "ruby",
  "rbx": "ruby",
  "swift": "swift",
  "deno": "typescript",
  "ts-node": "typescript",
  "zsh": "zsh",
  "racket": "racket",
  "guile": "scheme",
  "scheme": "scheme",
  "tclsh": "tcl",
  "wish": "tcl"
};
var GLOB_MATCHERS = [
  {
    "id": "angular",
    "glob": "*.angular"
  },
  {
    "id": "angular",
    "glob": "component.html"
  },
  {
    "id": "asm",
    "glob": "*.s"
  },
  {
    "id": "asm",
    "glob": "*.asm"
  },
  {
    "id": "asm",
    "glob": "*.assembly"
  },
  {
    "id": "astro",
    "glob": "*.astro"
  },
  {
    "id": "bash",
    "glob": "*.bash"
  },
  {
    "id": "bash",
    "glob": "*.bats"
  },
  {
    "id": "bash",
    "glob": "*.cgi"
  },
  {
    "id": "bash",
    "glob": "*.command"
  },
  {
    "id": "bash",
    "glob": "*.env"
  },
  {
    "id": "bash",
    "glob": "*.fcgi"
  },
  {
    "id": "bash",
    "glob": "*.ksh"
  },
  {
    "id": "bash",
    "glob": "*.sh"
  },
  {
    "id": "bash",
    "glob": "*.sh.in"
  },
  {
    "id": "bash",
    "glob": "*.tool"
  },
  {
    "id": "bash",
    "glob": ".bash_aliases"
  },
  {
    "id": "bash",
    "glob": ".bash_history"
  },
  {
    "id": "bash",
    "glob": ".bash_logout"
  },
  {
    "id": "bash",
    "glob": ".bash_profile"
  },
  {
    "id": "bash",
    "glob": ".bashrc"
  },
  {
    "id": "bash",
    "glob": ".cshrc"
  },
  {
    "id": "bash",
    "glob": ".env"
  },
  {
    "id": "bash",
    "glob": ".env.example"
  },
  {
    "id": "bash",
    "glob": ".flaskenv"
  },
  {
    "id": "bash",
    "glob": ".kshrc"
  },
  {
    "id": "bash",
    "glob": ".login"
  },
  {
    "id": "bash",
    "glob": ".profile"
  },
  {
    "id": "bash",
    "glob": "9fs"
  },
  {
    "id": "bash",
    "glob": "pkgbuild"
  },
  {
    "id": "bash",
    "glob": "bash_aliases"
  },
  {
    "id": "bash",
    "glob": "bash_logout"
  },
  {
    "id": "bash",
    "glob": "bash_profile"
  },
  {
    "id": "bash",
    "glob": "bashrc"
  },
  {
    "id": "bash",
    "glob": "cshrc"
  },
  {
    "id": "bash",
    "glob": "ebuild"
  },
  {
    "id": "bash",
    "glob": "eclass"
  },
  {
    "id": "bash",
    "glob": "gradlew"
  },
  {
    "id": "bash",
    "glob": "kshrc"
  },
  {
    "id": "bash",
    "glob": "login"
  },
  {
    "id": "bash",
    "glob": "man"
  },
  {
    "id": "bash",
    "glob": "profile"
  },
  {
    "id": "c",
    "glob": "*.c"
  },
  {
    "id": "caddy",
    "glob": "caddyfile"
  },
  {
    "id": "caddy",
    "glob": "caddyfile"
  },
  {
    "id": "clojure",
    "glob": "*.bb"
  },
  {
    "id": "clojure",
    "glob": "*.boot"
  },
  {
    "id": "clojure",
    "glob": "*.clj"
  },
  {
    "id": "clojure",
    "glob": "*.cljc"
  },
  {
    "id": "clojure",
    "glob": "*.clje"
  },
  {
    "id": "clojure",
    "glob": "*.cljs"
  },
  {
    "id": "clojure",
    "glob": "*.cljx"
  },
  {
    "id": "clojure",
    "glob": "*.edn"
  },
  {
    "id": "clojure",
    "glob": "*.joke"
  },
  {
    "id": "clojure",
    "glob": "*.joker"
  },
  {
    "id": "cmake",
    "glob": "*.cmake"
  },
  {
    "id": "cmake",
    "glob": "*.cmake.in"
  },
  {
    "id": "cmake",
    "glob": "cmakelists.txt"
  },
  {
    "id": "commonlisp",
    "glob": "*.lisp"
  },
  {
    "id": "commonlisp",
    "glob": "*.lsp"
  },
  {
    "id": "commonlisp",
    "glob": "*.asd"
  },
  {
    "id": "cpp",
    "glob": "*.cc"
  },
  {
    "id": "cpp",
    "glob": "*.cpp"
  },
  {
    "id": "cpp",
    "glob": "*.h"
  },
  {
    "id": "cpp",
    "glob": "*.hh"
  },
  {
    "id": "cpp",
    "glob": "*.hpp"
  },
  {
    "id": "cpp",
    "glob": "*.cxx"
  },
  {
    "id": "cpp",
    "glob": "*.cu"
  },
  {
    "id": "cpp",
    "glob": "*.hxx"
  },
  {
    "id": "csharp",
    "glob": "*.cs"
  },
  {
    "id": "css",
    "glob": "*.css"
  },
  {
    "id": "csv",
    "glob": "*.csv"
  },
  {
    "id": "dart",
    "glob": "*.dart"
  },
  {
    "id": "diff",
    "glob": "*.diff"
  },
  {
    "id": "dockerfile",
    "glob": "dockerfile"
  },
  {
    "id": "dockerfile",
    "glob": "dockerfile"
  },
  {
    "id": "dockerfile",
    "glob": "docker"
  },
  {
    "id": "dockerfile",
    "glob": "containerfile"
  },
  {
    "id": "dockerfile",
    "glob": "container"
  },
  {
    "id": "dockerfile",
    "glob": "*.dockerfile"
  },
  {
    "id": "dockerfile",
    "glob": "*.docker"
  },
  {
    "id": "dockerfile",
    "glob": "*.container"
  },
  {
    "id": "eex",
    "glob": "*.eex"
  },
  {
    "id": "ejs",
    "glob": "*.ejs"
  },
  {
    "id": "elixir",
    "glob": "*.ex"
  },
  {
    "id": "elixir",
    "glob": "*.exs"
  },
  {
    "id": "elm",
    "glob": "*.elm"
  },
  {
    "id": "erb",
    "glob": "*.erb"
  },
  {
    "id": "erlang",
    "glob": "*.erl"
  },
  {
    "id": "erlang",
    "glob": "*.app"
  },
  {
    "id": "erlang",
    "glob": "*.app.src"
  },
  {
    "id": "erlang",
    "glob": "*.es"
  },
  {
    "id": "erlang",
    "glob": "*.escript"
  },
  {
    "id": "erlang",
    "glob": "*.hrl"
  },
  {
    "id": "erlang",
    "glob": "*.xrl"
  },
  {
    "id": "erlang",
    "glob": "*.yrl"
  },
  {
    "id": "erlang",
    "glob": "emakefile"
  },
  {
    "id": "erlang",
    "glob": "rebar.config"
  },
  {
    "id": "fish",
    "glob": "*.fish"
  },
  {
    "id": "fsharp",
    "glob": "*.fs"
  },
  {
    "id": "fsharp",
    "glob": "*.fsx"
  },
  {
    "id": "fsharp",
    "glob": "*.fsi"
  },
  {
    "id": "gleam",
    "glob": "*.gleam"
  },
  {
    "id": "glimmer",
    "glob": "*.hbs"
  },
  {
    "id": "glimmer",
    "glob": "*.handlebars"
  },
  {
    "id": "glimmer",
    "glob": "*.html.handlebars"
  },
  {
    "id": "glimmer",
    "glob": "*.glimmer"
  },
  {
    "id": "go",
    "glob": "*.go"
  },
  {
    "id": "haskell",
    "glob": "*.hs"
  },
  {
    "id": "haskell",
    "glob": "*.hs-boot"
  },
  {
    "id": "hcl",
    "glob": "*.hcl"
  },
  {
    "id": "hcl",
    "glob": "*.nomad"
  },
  {
    "id": "hcl",
    "glob": "*.workflow"
  },
  {
    "id": "heex",
    "glob": "*.heex"
  },
  {
    "id": "heex",
    "glob": "*.neex"
  },
  {
    "id": "html",
    "glob": "*.html"
  },
  {
    "id": "html",
    "glob": "*.htm"
  },
  {
    "id": "html",
    "glob": "*.xhtml"
  },
  {
    "id": "http",
    "glob": "*.http"
  },
  {
    "id": "http",
    "glob": "*.rest"
  },
  {
    "id": "iex",
    "glob": "*.iex"
  },
  {
    "id": "ini",
    "glob": "*.ini"
  },
  {
    "id": "ini",
    "glob": "*.cfg"
  },
  {
    "id": "ini",
    "glob": "*.cnf"
  },
  {
    "id": "ini",
    "glob": ".gitmodules"
  },
  {
    "id": "ini",
    "glob": ".npmrc"
  },
  {
    "id": "java",
    "glob": "*.java"
  },
  {
    "id": "javascript",
    "glob": "*.cjs"
  },
  {
    "id": "javascript",
    "glob": "*.js"
  },
  {
    "id": "javascript",
    "glob": "*.mjs"
  },
  {
    "id": "javascript",
    "glob": "*.snap"
  },
  {
    "id": "javascript",
    "glob": "*.jsx"
  },
  {
    "id": "json",
    "glob": "*.json"
  },
  {
    "id": "json",
    "glob": "*.avsc"
  },
  {
    "id": "json",
    "glob": "*.geojson"
  },
  {
    "id": "json",
    "glob": "*.gltf"
  },
  {
    "id": "json",
    "glob": "*.har"
  },
  {
    "id": "json",
    "glob": "*.ice"
  },
  {
    "id": "json",
    "glob": "*.json-tmlanguage"
  },
  {
    "id": "json",
    "glob": "*.jsonl"
  },
  {
    "id": "json",
    "glob": "*.mcmeta"
  },
  {
    "id": "json",
    "glob": "*.tfstate"
  },
  {
    "id": "json",
    "glob": "*.tfstate.backup"
  },
  {
    "id": "json",
    "glob": "*.topojson"
  },
  {
    "id": "json",
    "glob": "*.webapp"
  },
  {
    "id": "json",
    "glob": "*.webmanifest"
  },
  {
    "id": "json",
    "glob": ".arcconfig"
  },
  {
    "id": "json",
    "glob": ".auto-changelog"
  },
  {
    "id": "json",
    "glob": ".c8rc"
  },
  {
    "id": "json",
    "glob": ".htmlhintrc"
  },
  {
    "id": "json",
    "glob": ".imgbotconfig"
  },
  {
    "id": "json",
    "glob": ".nycrc"
  },
  {
    "id": "json",
    "glob": ".tern-config"
  },
  {
    "id": "json",
    "glob": ".tern-project"
  },
  {
    "id": "json",
    "glob": ".watchmanconfig"
  },
  {
    "id": "json",
    "glob": "pipfile.lock"
  },
  {
    "id": "json",
    "glob": "composer.lock"
  },
  {
    "id": "json",
    "glob": "mcmod.info"
  },
  {
    "id": "json",
    "glob": "flake.lock"
  },
  {
    "id": "julia",
    "glob": "*.jl"
  },
  {
    "id": "kotlin",
    "glob": "*.kt"
  },
  {
    "id": "kotlin",
    "glob": "*.ktm"
  },
  {
    "id": "kotlin",
    "glob": "*.kts"
  },
  {
    "id": "latex",
    "glob": "*.aux"
  },
  {
    "id": "latex",
    "glob": "*.cls"
  },
  {
    "id": "latex",
    "glob": "*.sty"
  },
  {
    "id": "latex",
    "glob": "*.tex"
  },
  {
    "id": "liquid",
    "glob": "*liquid"
  },
  {
    "id": "llvm",
    "glob": "*.llvm"
  },
  {
    "id": "llvm",
    "glob": "*.ll"
  },
  {
    "id": "lua",
    "glob": "*.lua"
  },
  {
    "id": "make",
    "glob": "*.mak"
  },
  {
    "id": "make",
    "glob": "*.d"
  },
  {
    "id": "make",
    "glob": "*.make"
  },
  {
    "id": "make",
    "glob": "*.makefile"
  },
  {
    "id": "make",
    "glob": "*.mk"
  },
  {
    "id": "make",
    "glob": "*.mkfile"
  },
  {
    "id": "make",
    "glob": "*.dsp"
  },
  {
    "id": "make",
    "glob": "bsdmakefile"
  },
  {
    "id": "make",
    "glob": "gnumakefile"
  },
  {
    "id": "make",
    "glob": "kbuild"
  },
  {
    "id": "make",
    "glob": "makefile"
  },
  {
    "id": "make",
    "glob": "makefile"
  },
  {
    "id": "make",
    "glob": "makefile.am"
  },
  {
    "id": "make",
    "glob": "makefile.boot"
  },
  {
    "id": "make",
    "glob": "makefile.frag"
  },
  {
    "id": "make",
    "glob": "makefile*.in"
  },
  {
    "id": "make",
    "glob": "makefile.inc"
  },
  {
    "id": "make",
    "glob": "makefile.wat"
  },
  {
    "id": "make",
    "glob": "makefile"
  },
  {
    "id": "make",
    "glob": "makefile.sco"
  },
  {
    "id": "make",
    "glob": "mkfile"
  },
  {
    "id": "markdown",
    "glob": "*.md"
  },
  {
    "id": "markdown",
    "glob": ".md"
  },
  {
    "id": "markdown",
    "glob": "readme"
  },
  {
    "id": "markdown",
    "glob": "license"
  },
  {
    "id": "nix",
    "glob": "*.nix"
  },
  {
    "id": "nushell",
    "glob": "*.nu"
  },
  {
    "id": "objc",
    "glob": "*.m"
  },
  {
    "id": "objc",
    "glob": "*.objc"
  },
  {
    "id": "ocaml",
    "glob": "*.ml"
  },
  {
    "id": "ocaml_interface",
    "glob": "*.mli"
  },
  {
    "id": "perl",
    "glob": "*.pm"
  },
  {
    "id": "perl",
    "glob": "*.pl"
  },
  {
    "id": "perl",
    "glob": "*.t"
  },
  {
    "id": "php",
    "glob": "*.php"
  },
  {
    "id": "php",
    "glob": "*.phtml"
  },
  {
    "id": "php",
    "glob": "*.php3"
  },
  {
    "id": "php",
    "glob": "*.php4"
  },
  {
    "id": "php",
    "glob": "*.php5"
  },
  {
    "id": "php",
    "glob": "*.php7"
  },
  {
    "id": "php",
    "glob": "*.phps"
  },
  {
    "id": "powershell",
    "glob": "*.ps1"
  },
  {
    "id": "powershell",
    "glob": "*.psm1"
  },
  {
    "id": "protobuf",
    "glob": "*.proto"
  },
  {
    "id": "protobuf",
    "glob": "*.protobuf"
  },
  {
    "id": "protobuf",
    "glob": "*.proto2"
  },
  {
    "id": "protobuf",
    "glob": "*.proto3"
  },
  {
    "id": "python",
    "glob": "*.py"
  },
  {
    "id": "python",
    "glob": "*.py3"
  },
  {
    "id": "python",
    "glob": "*.pyi"
  },
  {
    "id": "python",
    "glob": "*.bzl"
  },
  {
    "id": "python",
    "glob": "targets"
  },
  {
    "id": "python",
    "glob": "buck"
  },
  {
    "id": "python",
    "glob": "deps"
  },
  {
    "id": "r",
    "glob": "*.r"
  },
  {
    "id": "r",
    "glob": "*.r"
  },
  {
    "id": "r",
    "glob": "*.rd"
  },
  {
    "id": "r",
    "glob": "*.rsx"
  },
  {
    "id": "r",
    "glob": ".rprofile"
  },
  {
    "id": "r",
    "glob": "expr-dist"
  },
  {
    "id": "regex",
    "glob": "*.regex"
  },
  {
    "id": "ruby",
    "glob": "*.rb"
  },
  {
    "id": "ruby",
    "glob": "*.builder"
  },
  {
    "id": "ruby",
    "glob": "*.spec"
  },
  {
    "id": "ruby",
    "glob": "*.rake"
  },
  {
    "id": "ruby",
    "glob": "gemfile"
  },
  {
    "id": "ruby",
    "glob": "rakefile"
  },
  {
    "id": "rust",
    "glob": "*.rs"
  },
  {
    "id": "scala",
    "glob": "*.scala"
  },
  {
    "id": "scala",
    "glob": "*.sbt"
  },
  {
    "id": "scala",
    "glob": "*.sc"
  },
  {
    "id": "scss",
    "glob": "*.scss"
  },
  {
    "id": "sql",
    "glob": "*.sql"
  },
  {
    "id": "sql",
    "glob": "*.pgsql"
  },
  {
    "id": "surface",
    "glob": "*.surface"
  },
  {
    "id": "surface",
    "glob": "*.sface"
  },
  {
    "id": "svelte",
    "glob": "*.svelte"
  },
  {
    "id": "swift",
    "glob": "*.swift"
  },
  {
    "id": "toml",
    "glob": "*.toml"
  },
  {
    "id": "toml",
    "glob": "cargo.lock"
  },
  {
    "id": "toml",
    "glob": "gopkg.lock"
  },
  {
    "id": "toml",
    "glob": "pipfile"
  },
  {
    "id": "toml",
    "glob": "pdm.lock"
  },
  {
    "id": "toml",
    "glob": "poetry.lock"
  },
  {
    "id": "toml",
    "glob": "uv.lock"
  },
  {
    "id": "tsx",
    "glob": "*.tsx"
  },
  {
    "id": "typescript",
    "glob": "*.ts"
  },
  {
    "id": "typst",
    "glob": "*.typ"
  },
  {
    "id": "typst",
    "glob": "*.typst"
  },
  {
    "id": "vim",
    "glob": "*.vim"
  },
  {
    "id": "vim",
    "glob": "*.viml"
  },
  {
    "id": "vue",
    "glob": "*.vue"
  },
  {
    "id": "wat",
    "glob": "*.wat"
  },
  {
    "id": "xml",
    "glob": "*.ant"
  },
  {
    "id": "xml",
    "glob": "*.csproj"
  },
  {
    "id": "xml",
    "glob": "*.mjml"
  },
  {
    "id": "xml",
    "glob": "*.plist"
  },
  {
    "id": "xml",
    "glob": "*.resx"
  },
  {
    "id": "xml",
    "glob": "*.svg"
  },
  {
    "id": "xml",
    "glob": "*.ui"
  },
  {
    "id": "xml",
    "glob": "*.vbproj"
  },
  {
    "id": "xml",
    "glob": "*.xaml"
  },
  {
    "id": "xml",
    "glob": "*.xml"
  },
  {
    "id": "xml",
    "glob": "*.xsd"
  },
  {
    "id": "xml",
    "glob": "*.xsl"
  },
  {
    "id": "xml",
    "glob": "*.xslt"
  },
  {
    "id": "xml",
    "glob": "*.zcml"
  },
  {
    "id": "xml",
    "glob": "*.rng"
  },
  {
    "id": "xml",
    "glob": "app.config"
  },
  {
    "id": "xml",
    "glob": "nuget.config"
  },
  {
    "id": "xml",
    "glob": "packages.config"
  },
  {
    "id": "xml",
    "glob": ".classpath"
  },
  {
    "id": "xml",
    "glob": ".cproject"
  },
  {
    "id": "xml",
    "glob": ".project"
  },
  {
    "id": "yaml",
    "glob": "*.yaml"
  },
  {
    "id": "yaml",
    "glob": "*.yml"
  },
  {
    "id": "zig",
    "glob": "*.zig"
  },
  {
    "id": "arduino",
    "glob": "*.ino"
  },
  {
    "id": "arduino",
    "glob": "*.pde"
  },
  {
    "id": "bicep",
    "glob": "*.bicep"
  },
  {
    "id": "bicep",
    "glob": "*.bicepparam"
  },
  {
    "id": "dot",
    "glob": "*.dot"
  },
  {
    "id": "dot",
    "glob": "*.gv"
  },
  {
    "id": "editorconfig",
    "glob": ".editorconfig"
  },
  {
    "id": "gitattributes",
    "glob": ".gitattributes"
  },
  {
    "id": "gitattributes",
    "glob": "gitattributes"
  },
  {
    "id": "jq",
    "glob": "*.jq"
  },
  {
    "id": "kdl",
    "glob": "*.kdl"
  },
  {
    "id": "nim",
    "glob": "*.nim"
  },
  {
    "id": "nim",
    "glob": "*.nims"
  },
  {
    "id": "nim",
    "glob": "*.nimble"
  },
  {
    "id": "pascal",
    "glob": "*.pas"
  },
  {
    "id": "pascal",
    "glob": "*.pp"
  },
  {
    "id": "pascal",
    "glob": "*.lpr"
  },
  {
    "id": "pascal",
    "glob": "*.dpr"
  },
  {
    "id": "puppet",
    "glob": "*.pp"
  },
  {
    "id": "puppet",
    "glob": "puppetfile"
  },
  {
    "id": "terraform",
    "glob": "*.tf"
  },
  {
    "id": "terraform",
    "glob": "*.tfvars"
  },
  {
    "id": "terraform",
    "glob": "*.tfvars.json"
  },
  {
    "id": "toon",
    "glob": "*.toon"
  },
  {
    "id": "wgsl",
    "glob": "*.wgsl"
  },
  {
    "id": "zsh",
    "glob": "*.zsh"
  },
  {
    "id": "zsh",
    "glob": ".zshrc"
  },
  {
    "id": "zsh",
    "glob": ".zshenv"
  },
  {
    "id": "zsh",
    "glob": ".zprofile"
  },
  {
    "id": "zsh",
    "glob": ".zlogin"
  },
  {
    "id": "zsh",
    "glob": ".zlogout"
  },
  {
    "id": "zsh",
    "glob": "zshrc"
  },
  {
    "id": "zsh",
    "glob": "zshenv"
  },
  {
    "id": "zsh",
    "glob": "zprofile"
  },
  {
    "id": "zsh",
    "glob": "zlogin"
  },
  {
    "id": "zsh",
    "glob": "zlogout"
  },
  {
    "id": "d",
    "glob": "*.d"
  },
  {
    "id": "fortran",
    "glob": "*.f"
  },
  {
    "id": "fortran",
    "glob": "*.f03"
  },
  {
    "id": "fortran",
    "glob": "*.f08"
  },
  {
    "id": "fortran",
    "glob": "*.f90"
  },
  {
    "id": "fortran",
    "glob": "*.f95"
  },
  {
    "id": "fortran",
    "glob": "*.for"
  },
  {
    "id": "fortran",
    "glob": "*.ftn"
  },
  {
    "id": "gitignore",
    "glob": ".gitignore"
  },
  {
    "id": "gitignore",
    "glob": ".ignore"
  },
  {
    "id": "gitignore",
    "glob": ".fdignore"
  },
  {
    "id": "gitignore",
    "glob": ".rgignore"
  },
  {
    "id": "glsl",
    "glob": "*.comp"
  },
  {
    "id": "glsl",
    "glob": "*.frag"
  },
  {
    "id": "glsl",
    "glob": "*.geom"
  },
  {
    "id": "glsl",
    "glob": "*.glsl"
  },
  {
    "id": "glsl",
    "glob": "*.tesc"
  },
  {
    "id": "glsl",
    "glob": "*.tese"
  },
  {
    "id": "glsl",
    "glob": "*.vert"
  },
  {
    "id": "jinja",
    "glob": "*.j2"
  },
  {
    "id": "jinja",
    "glob": "*.jinja"
  },
  {
    "id": "jinja",
    "glob": "*.jinja2"
  },
  {
    "id": "json5",
    "glob": "*.json5"
  },
  {
    "id": "just",
    "glob": "*.just"
  },
  {
    "id": "just",
    "glob": ".just"
  },
  {
    "id": "just",
    "glob": ".justfile"
  },
  {
    "id": "just",
    "glob": ".justfile"
  },
  {
    "id": "just",
    "glob": ".justfile"
  },
  {
    "id": "just",
    "glob": "justfile"
  },
  {
    "id": "just",
    "glob": "justfile"
  },
  {
    "id": "just",
    "glob": "justfile"
  },
  {
    "id": "matlab",
    "glob": "*.m"
  },
  {
    "id": "mermaid",
    "glob": "*.mmd"
  },
  {
    "id": "mermaid",
    "glob": "*.mermaid"
  },
  {
    "id": "nginx",
    "glob": "*.nginx"
  },
  {
    "id": "nginx",
    "glob": "nginx.conf"
  },
  {
    "id": "prisma",
    "glob": "*.prisma"
  },
  {
    "id": "qmljs",
    "glob": "*.qml"
  },
  {
    "id": "qmljs",
    "glob": "*.qmljs"
  },
  {
    "id": "qmljs",
    "glob": "*.qmltypes"
  },
  {
    "id": "racket",
    "glob": "*.rkt"
  },
  {
    "id": "racket",
    "glob": "*.rktd"
  },
  {
    "id": "racket",
    "glob": "*.rktl"
  },
  {
    "id": "rst",
    "glob": "*.rst"
  },
  {
    "id": "scheme",
    "glob": "*.scm"
  },
  {
    "id": "scheme",
    "glob": "*.sld"
  },
  {
    "id": "scheme",
    "glob": "*.ss"
  },
  {
    "id": "solidity",
    "glob": "*.sol"
  },
  {
    "id": "systemverilog",
    "glob": "*.sv"
  },
  {
    "id": "systemverilog",
    "glob": "*.svh"
  },
  {
    "id": "tcl",
    "glob": "*.itcl"
  },
  {
    "id": "tcl",
    "glob": "*.tcl"
  },
  {
    "id": "tcl",
    "glob": "*.tk"
  },
  {
    "id": "vhdl",
    "glob": "*.vhd"
  },
  {
    "id": "vhdl",
    "glob": "*.vhdl"
  }
];

// src/guess-language.ts
var GLOB_REGEXES = GLOB_MATCHERS.map(({ id, glob }) => ({ id, regex: globToRegExp(glob) }));
function normalize(value) {
  return value.trim().toLowerCase();
}
function basename(value) {
  const normalized = value.replaceAll("\\", "/");
  const parts = normalized.split("/");
  return parts[parts.length - 1] ?? normalized;
}
function escapeRegex(value) {
  return value.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
}
function globToRegExp(glob) {
  return new RegExp(`^${escapeRegex(glob).replaceAll("*", ".*")}$`);
}
function parseLanguageHint(language) {
  if (language == null) return void 0;
  const normalized = normalize(language);
  if (normalized.length === 0) return PLAINTEXT_LANG_ID;
  const direct = EXACT_LANGUAGE_MAP[normalized];
  if (direct) return direct;
  const fileName = basename(normalized);
  for (const matcher of GLOB_REGEXES) {
    if (matcher.regex.test(fileName)) {
      return matcher.id;
    }
  }
  const extension = fileName.startsWith(".") ? fileName.slice(1) : fileName;
  if (extension.length > 0) {
    const extensionPattern = `*.${extension}`;
    for (const matcher of GLOB_REGEXES) {
      if (matcher.regex.test(extensionPattern)) {
        return matcher.id;
      }
    }
  }
  return void 0;
}
function fromEmacsModeHeader(source) {
  const lines = source.split(/\r?\n/).slice(0, 2);
  for (const line of lines) {
    const modeMatch = line.match(/-\*-.*mode:([^;]+?);.*-\*-/);
    const shorthandMatch = line.match(/-\*-(.+)-\*-/);
    const rawMode = modeMatch?.[1] ?? shorthandMatch?.[1];
    if (rawMode == null) {
      continue;
    }
    const mode = normalize(rawMode);
    const language = EMACS_MODE_MAP[mode];
    if (language) {
      return language;
    }
  }
  return void 0;
}
function normalizeShebangCommand(command) {
  const normalized = basename(normalize(command));
  return normalized.replace(/\d+(?:\.\d+)*$/, "");
}
function fromShebang(source) {
  const firstLine = source.split(/\r?\n/, 1)[0]?.trim();
  if (!firstLine?.startsWith("#!")) return void 0;
  const match = firstLine.match(/^#!\s*(?:\/usr\/bin\/env\s+)?([^ ]+)/);
  const command = match?.[1];
  if (!command) return void 0;
  return SHEBANG_MAP[normalizeShebangCommand(command)];
}
function looksLikeHtml(source) {
  return source.trimStart().toLowerCase().startsWith("<!doctype html");
}
function looksLikeXml(source) {
  return source.trimStart().toLowerCase().startsWith("<?xml");
}
function looksLikeObjc(language, source) {
  if (language == null || !basename(language).toLowerCase().endsWith(".h")) {
    return false;
  }
  return source.split(/\r?\n/).slice(0, 100).some(
    (line) => ["#import", "@interface", "@protocol"].some((keyword) => line.startsWith(keyword))
  );
}
function guessLanguage(language, source = "") {
  const explicit = parseLanguageHint(language);
  if (explicit) return explicit;
  const emacsMode = fromEmacsModeHeader(source);
  if (emacsMode) return emacsMode;
  const shebang = fromShebang(source);
  if (shebang) return shebang;
  if (looksLikeHtml(source)) return "html";
  if (looksLikeXml(source)) return "xml";
  if (looksLikeObjc(language, source)) return "objc";
  return PLAINTEXT_LANG_ID;
}

// src/core/highlighter.ts
var encoder2 = new TextEncoder();
var decoder2 = new TextDecoder();
function decodeSlice(sourceBytes, startByte, endByte) {
  return decoder2.decode(sourceBytes.subarray(startByte, endByte));
}
async function loadLanguageDefinition(runtime, language) {
  await runtime.loadLanguage({
    definition: { id: language.id, aliases: language.aliases },
    wasm: language.wasm,
    highlights: language.highlights,
    injections: language.injections,
    locals: language.locals,
    brackets: language.brackets
  });
}
function resolveRefId(ref) {
  if (!ref) return PLAINTEXT_LANG_ID;
  if (typeof ref === "string") return ref;
  return ref.id;
}
function isPlaintextRef(ref) {
  return resolveRefId(ref) === PLAINTEXT_LANG_ID;
}
function detectLanguageRef(source, ref) {
  if (ref && typeof ref !== "string") {
    return ref;
  }
  return guessLanguage(ref, source);
}
async function loadBuiltinLanguageById(id) {
  const loader = LANGUAGE_LOADERS[id];
  if (!loader) {
    return void 0;
  }
  const mod = await loader();
  return mod.default;
}
async function ensureLanguageLoaded(runtime, ref, lazyRegistry) {
  if (isPlaintextRef(ref)) {
    await runtime.loadPlaintext();
    return;
  }
  if (typeof ref !== "string") {
    if (!runtime.getLoadedLanguage(ref.id)) {
      if (isLanguage(ref)) {
        await loadLanguageDefinition(runtime, ref);
      } else {
        const language = await ref();
        await loadLanguageDefinition(runtime, language);
      }
    }
    return;
  }
  const languageId = ref;
  if (runtime.getLoadedLanguage(languageId)) {
    return;
  }
  const builtin = await loadBuiltinLanguageById(languageId);
  if (builtin) {
    await loadLanguageDefinition(runtime, builtin);
  }
}
function resolveLoadedLanguage(runtime, ref) {
  const languageId = resolveRefId(ref);
  const loaded = runtime.getLoadedLanguage(languageId);
  if (!loaded) {
    if (languageId === PLAINTEXT_LANG_ID) {
      throw new Error(
        `Language "${languageId}" is not loaded. Load the plaintext bundle before using omitted/plaintext sync highlighting.`
      );
    }
    throw new Error(
      `Language "${languageId}" is not loaded. Pass it to createHighlighter({ languages: [...] }) or call hl.loadLanguage(bundle).`
    );
  }
  return loaded;
}
function runHighlightIter(runtime, source, language, theme, onToken) {
  const loaded = resolveLoadedLanguage(runtime, language);
  const events = buildHighlightEvents(source, loaded, runtime);
  const bytes = encoder2.encode(source);
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
    const active = scopeStack[scopeStack.length - 1];
    const scope = active?.scope ?? "";
    const tokenLanguage = active?.language ?? loaded.definition.id;
    onToken(
      decodeSlice(bytes, event.startByte, event.endByte),
      tokenLanguage,
      { start: event.startByte, end: event.endByte },
      scope,
      scope.length > 0 ? chunkEPPEJKAQ_cjs.getScopedThemeStyle(theme, scope, tokenLanguage) : void 0
    );
  }
}
function runHighlightEvents(runtime, source, language, options = {}) {
  const loaded = resolveLoadedLanguage(runtime, language);
  return buildHighlightEvents(source, loaded, runtime, options);
}
var currentRuntime;
function requireCurrentRuntime(fnName) {
  if (!currentRuntime) {
    throw new Error(
      `${fnName}() must be called inside Formatter.format(). For top-level token iteration, create a highlighter with createHighlighter({ languages: [...] }) and call hl.highlightIter().`
    );
  }
  return currentRuntime;
}
function highlightIter(source, language, theme, onToken) {
  const runtime = requireCurrentRuntime("highlightIter");
  runHighlightIter(runtime, source, detectLanguageRef(source, language), theme, onToken);
}
function highlightEvents(source, language, options = {}) {
  const runtime = requireCurrentRuntime("highlightEvents");
  return runHighlightEvents(runtime, source, detectLanguageRef(source, language), options);
}
function runFormatter(runtime, source, fmt, detectedRef) {
  const prevRuntime = currentRuntime;
  const prevLanguage = fmt.language;
  currentRuntime = runtime;
  fmt.language = detectedRef;
  try {
    return fmt.format(source);
  } finally {
    fmt.language = prevLanguage;
    currentRuntime = prevRuntime;
  }
}
function isLanguage(value) {
  return typeof value === "object" && value !== null && "id" in value && "highlights" in value && "wasm" in value;
}
function isLanguageBundle(value) {
  if (typeof value !== "object" || value === null) return false;
  if ("id" in value || "highlights" in value || "default" in value) return false;
  const keys = Object.keys(value);
  const firstKey = keys[0];
  return firstKey !== void 0 && typeof value[firstKey] === "function";
}
async function resolveLanguageInput(input, runtime, lazyRegistry) {
  if (isLanguage(input)) {
    await loadLanguageDefinition(runtime, input);
    return;
  }
  if (isLanguageBundle(input)) {
    for (const [id, lazy] of Object.entries(input)) {
      if (!lazyRegistry.has(id)) {
        lazyRegistry.set(id, lazy);
        for (const alias of lazy.aliases) {
          lazyRegistry.set(alias, lazy);
        }
      }
    }
    return;
  }
  if (typeof input === "function") {
    const mod2 = await input();
    await loadLanguageDefinition(runtime, mod2.default);
    return;
  }
  const mod = await input;
  await loadLanguageDefinition(runtime, mod.default);
}
function registerLazyBundle(bundle, lazyRegistry) {
  for (const [id, lazy] of Object.entries(bundle)) {
    if (lazyRegistry.has(id)) {
      continue;
    }
    lazyRegistry.set(id, lazy);
    for (const alias of lazy.aliases) {
      lazyRegistry.set(alias, lazy);
    }
  }
}
async function loadHighlighterLanguage(input, runtime, lazyRegistry) {
  const id = typeof input === "string" ? input : input.id;
  if (runtime.getLoadedLanguage(id)) {
    return;
  }
  if (isLanguage(input)) {
    await loadLanguageDefinition(runtime, input);
    return;
  }
  if (typeof input === "string") {
    const lazy = lazyRegistry.get(input);
    if (lazy) {
      const language2 = await lazy();
      await loadLanguageDefinition(runtime, language2);
      return;
    }
    const builtin = await loadBuiltinLanguageById(input);
    if (!builtin) {
      throw new Error(`Language "${input}" is not registered in any bundle.`);
    }
    await loadLanguageDefinition(runtime, builtin);
    return;
  }
  const language = await input();
  await loadLanguageDefinition(runtime, language);
}
function getRegisteredLanguageIds(runtime, lazyRegistry) {
  return [.../* @__PURE__ */ new Set([...runtime.getLoadedLanguageIds(), ...lazyRegistry.keys()])];
}
async function loadInitialLanguages(inputs, runtime, lazyRegistry) {
  const eagerLoads = [];
  for (const input of inputs) {
    if (isLanguageBundle(input)) {
      registerLazyBundle(input, lazyRegistry);
      continue;
    }
    eagerLoads.push(resolveLanguageInput(input, runtime, lazyRegistry));
  }
  await Promise.all([runtime.loadPlaintext(), ...eagerLoads]);
}
async function prepareRuntimeHighlight(runtime, source, language) {
  await runtime.initParser();
  const detectedRef = detectLanguageRef(source, language);
  await ensureLanguageLoaded(runtime, detectedRef);
  return detectedRef;
}
function createHighlighterModule(factory) {
  return {
    async createHighlighter(init = {}) {
      const runtime = factory.createRuntime({ wasmResolver: init.wasmResolver });
      await runtime.initParser();
      const lazyRegistry = /* @__PURE__ */ new Map();
      await loadInitialLanguages(init.languages ?? [], runtime, lazyRegistry);
      return {
        highlight: (source, fmt) => {
          const detectedRef = detectLanguageRef(source, fmt.language);
          return runFormatter(runtime, source, fmt, detectedRef);
        },
        highlightIter: (source, language, theme, onToken) => runHighlightIter(runtime, source, detectLanguageRef(source, language), theme, onToken),
        async loadLanguage(input) {
          await loadHighlighterLanguage(input, runtime, lazyRegistry);
        },
        get languages() {
          return runtime.getLoadedLanguageIds();
        },
        get registeredLanguages() {
          return getRegisteredLanguageIds(runtime, lazyRegistry);
        }
      };
    },
    async highlight(source, fmt) {
      const runtime = factory.getDefaultRuntime();
      const detectedRef = await prepareRuntimeHighlight(runtime, source, fmt.language);
      return runFormatter(runtime, source, fmt, detectedRef);
    }
  };
}

exports.PLAINTEXT_LANG_ID = PLAINTEXT_LANG_ID;
exports.createHighlighterModule = createHighlighterModule;
exports.highlightEvents = highlightEvents;
exports.highlightIter = highlightIter;
