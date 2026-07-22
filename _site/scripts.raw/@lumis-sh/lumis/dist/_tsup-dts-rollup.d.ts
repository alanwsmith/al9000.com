import type { Language as Language_2 } from 'web-tree-sitter';
import type { Node as Node_2 } from 'web-tree-sitter';
import type { Parser } from 'web-tree-sitter';
import type { Query } from 'web-tree-sitter';
import type { Range as Range_2 } from 'web-tree-sitter';

/** ANSI reset escape sequence. */
declare const ANSI_RESET = "\u001B[0m";
export { ANSI_RESET }
export { ANSI_RESET as ANSI_RESET_alias_1 }

/** A rendered ANSI segment paired with its byte range. */
export declare type AnsiSegment = [string, HighlightRange];

/**
 * Append a text fragment to the last line, splitting on newlines.
 *
 * ```ts
 * const lines = ['hello']
 * appendFragment(lines, ' world\nnew line')
 * // lines → ['hello world', 'new line']
 * ```
 * @internal
 */
export declare function appendFragment(lines: string[], fragment: string): void;

export declare function appendThemeCssVars(cssVars: string[], prefix: string, themes: Record<string, Theme | undefined>, scope: string, language: LanguageRef, excludeTheme?: string): void;

/**
 * Render an `HtmlAttrs` map to an HTML attribute string.
 *
 * ```ts
 * attrsToString({ class: 'foo', style: 'color: red', hidden: true })
 * // 'class="foo" style="color: red" hidden'
 * ```
 */
export declare function attrsToString(attrs: HtmlAttrs): string;

/** {@inheritDoc node.availableLanguages} */
declare function availableLanguages(...args: Parameters<typeof runtime.availableLanguages>): LanguageInfo[];
export { availableLanguages }
export { availableLanguages as availableLanguages_alias_2 }

/**
 * List all supported languages with their ID, name, aliases, and file extensions.
 *
 * ```ts
 * import { availableLanguages } from '@lumis-sh/lumis'
 * const languages = availableLanguages()
 * // [{ id: 'javascript', name: 'JavaScript', aliases: ['js', 'jsx'], extensions: ['*.js', ...] }, ...]
 * ```
 */
declare function availableLanguages_2(...args: Parameters<typeof runtime_2.availableLanguages>): LanguageInfo[];
export { availableLanguages_2 as availableLanguages_alias_1 }
export { availableLanguages_2 as availableLanguages_alias_3 }

/**
 * List all built-in themes with their name and appearance.
 *
 * ```ts
 * import { availableThemes } from '@lumis-sh/lumis'
 * const themes = availableThemes()
 * // [{ name: 'dracula', appearance: 'dark' }, ...]
 * ```
 */
declare function availableThemes(): ThemeInfo[];
export { availableThemes }
export { availableThemes as availableThemes_alias_1 }
export { availableThemes as availableThemes_alias_2 }

/**
 * Create a BBCode scoped formatter using highlight scope names as nested tags.
 * It does not emit standard forum-style BBCode like `[b]`, `[color]`, or `[code]`.
 *
 * @example
 * ```ts
 * import { bbcodeScoped } from '@lumis-sh/lumis/formatters'
 * import javascript from '@lumis-sh/lumis/langs/javascript'
 *
 * const output = hl.highlight('const x = 1', bbcodeScoped({ language: javascript }))
 * console.log(output)
 * ```
 */
declare function bbcodeScoped(options?: BBCodeScopedOptions): BBCodeScopedFormatter;
export { bbcodeScoped }
export { bbcodeScoped as bbcodeScoped_alias_1 }

declare interface BBCodeScopedFormatter extends Formatter, BBCodeScopedOptions {
}
export { BBCodeScopedFormatter }
export { BBCodeScopedFormatter as BBCodeScopedFormatter_alias_1 }
export { BBCodeScopedFormatter as BBCodeScopedFormatter_alias_2 }

/**
 * Options for {@link bbcodeScoped}.
 *
 * ```ts
 * bbcodeScoped({ language: javascript })
 * ```
 */
declare interface BBCodeScopedOptions {
    language?: LanguageRef;
    rainbowBrackets?: boolean;
}
export { BBCodeScopedOptions }
export { BBCodeScopedOptions as BBCodeScopedOptions_alias_1 }
export { BBCodeScopedOptions as BBCodeScopedOptions_alias_2 }

export declare const browserRuntime: RuntimeEnvironment;

export declare function buildHighlightEvents(source: string, language: LoadedLanguage, runtime: RuntimeLookup, options?: {
    rainbowBrackets?: boolean;
}): HighlightEvent[];

export declare function buildNormalThemeVars(styles: string[], prefix: string, themes: Record<string, Theme>, excludeTheme?: string): void;

export declare function buildPreThemeStyle(options: {
    themes: Record<string, Theme>;
    defaultTheme?: string;
    cssVariablePrefix?: string;
}): string | undefined;

export declare const bundledLanguages: LanguageBundle;

export declare const bundledLanguages_alias_1: LanguageBundle;

export declare const bundledLanguages_alias_2: LanguageBundle;

export declare const bundledLanguages_alias_3: LanguageBundle;

export declare const bundledLanguages_alias_4: LanguageBundle;

export declare interface CaptureMetadata {
    highlightScope?: string;
    isInjectionContent: boolean;
    isInjectionLanguage: boolean;
    isLocalScope: boolean;
    isLocalDefinition: boolean;
    isLocalDefinitionValue: boolean;
    isLocalReference: boolean;
}

/**
 * Close a `<code>` tag.
 *
 * ```ts
 * closeCodeTag()  // "</code>"
 * ```
 */
export declare function closeCodeTag(): string;

/**
 * Close a `<pre>` tag.
 *
 * ```ts
 * closePreTag()  // "</pre>"
 * ```
 */
export declare function closePreTag(): string;

/**
 * Build a closing HTML tag.
 *
 * ```ts
 * closeTag('span')  // "</span>"
 * ```
 */
export declare function closeTag(name: string): string;

/**
 * Close both `</code>` and `</pre>` tags.
 *
 * ```ts
 * closingTags()  // "</code></pre>"
 * ```
 */
export declare function closingTags(): string;

export declare interface CompiledBracketConfig {
    query: Query;
    captureMetadata: Record<string, {
        isOpen: boolean;
        isClose: boolean;
    }>;
    rainbowExcludePatterns: boolean[];
}

export declare interface CompiledHighlightConfig {
    query: Query;
    injectionPatternEnd: number;
    localsPatternEnd: number;
    captureMetadata: Record<string, CaptureMetadata>;
    nonLocalVariablePatterns: boolean[];
    injectionOffsets: Array<Record<string, QueryCaptureOffset> | undefined>;
}

/** {@inheritDoc node.configureWasmResolver} */
declare function configureWasmResolver(...args: Parameters<typeof runtime.configureWasmResolver>): void;
export { configureWasmResolver }
export { configureWasmResolver as configureWasmResolver_alias_2 }

/**
 * Set a custom WASM resolver for parser binaries. Applies globally.
 *
 * ```ts
 * import { configureWasmResolver } from '@lumis-sh/lumis'
 *
 * configureWasmResolver((_language, wasm) =>
 *   `https://unpkg.com/${wasm.packageName}@${wasm.version}/${wasm.name}.wasm`
 * )
 * ```
 */
declare function configureWasmResolver_2(...args: Parameters<typeof runtime_2.configureWasmResolver>): void;
export { configureWasmResolver_2 as configureWasmResolver_alias_1 }
export { configureWasmResolver_2 as configureWasmResolver_alias_3 }

/** {@inheritDoc index.createHighlighter} */
export declare function createHighlighter(...args: Parameters<typeof highlighter.createHighlighter>): Promise<Highlighter>;

/**
 * Create a reusable highlighter with preloaded languages.
 *
 * `createHighlighter` is async; the returned `hl.highlight()` is synchronous.
 *
 * The `languages` array accepts `Language` objects, `LanguageBundle` collections, and dynamic imports.
 *
 * @example Cherry-pick languages
 * ```ts
 * import { createHighlighter } from '@lumis-sh/lumis'
 * import { htmlInline } from '@lumis-sh/lumis/formatters'
 * import javascript from '@lumis-sh/lumis/langs/javascript'
 * import dracula from '@lumis-sh/themes/dracula'
 *
 * const hl = await createHighlighter({ languages: [javascript] })
 * const html = hl.highlight('const x = 1', htmlInline({ language: javascript, theme: dracula }))
 * ```
 *
 * @example With a bundle
 * ```ts
 * import { createHighlighter } from '@lumis-sh/lumis'
 * import { htmlInline } from '@lumis-sh/lumis/formatters'
 * import { bundledLanguages } from '@lumis-sh/lumis/bundles/web'
 * import dracula from '@lumis-sh/themes/dracula'
 *
 * // Register all web languages. None are loaded yet.
 * const hl = await createHighlighter({ languages: [bundledLanguages] })
 *
 * // Load a language, then highlight synchronously.
 * await hl.loadLanguage(bundledLanguages.javascript)
 * const html = hl.highlight('const x = 1', htmlInline({ language: bundledLanguages.javascript, theme: dracula }))
 * ```
 */
export declare function createHighlighter_alias_1(...args: Parameters<typeof highlighter_2.createHighlighter>): Promise<Highlighter>;

export declare function createHighlighterModule(factory: HighlighterModuleFactory): {
    createHighlighter(init?: CreateHighlighterOptions): Promise<Highlighter>;
    highlight(source: string, fmt: Formatter): Promise<string>;
};

/** Options for {@link createHighlighter}. */
export declare interface CreateHighlighterOptions {
    /** Languages to preload or register lazily. */
    languages?: LanguageInput[];
    /** Optional resolver for external WASM assets. */
    wasmResolver?: WasmResolver;
}

export declare function createLanguagesModule(runtime: RuntimeEnvironment): LanguagesModule;

export declare function createRuntime(...args: Parameters<typeof runtime.createRuntime>): RuntimeLike;

export declare function createRuntime_alias_1(...args: Parameters<typeof runtime_2.createRuntime>): RuntimeLike;

/** @internal */
export declare function decodeSourceSlice(sourceBytes: Uint8Array, startByte: number, endByte: number): string;

export declare const default_alias: ArrayBuffer;

export declare const default_alias_1: Language;

export declare const default_alias_10: Language;

export declare const default_alias_100: Language;

export declare const default_alias_101: Language;

export declare const default_alias_102: Language;

export declare const default_alias_103: Language;

export declare const default_alias_104: Language;

export declare const default_alias_105: Language;

export declare const default_alias_106: Language;

export declare const default_alias_107: Language;

export declare const default_alias_108: Language;

export declare const default_alias_109: Language;

export declare const default_alias_11: Language;

export declare const default_alias_110: Language;

export declare const default_alias_111: Language;

export declare const default_alias_112: Language;

export declare const default_alias_113: Language;

export declare const default_alias_114: Language;

export declare const default_alias_115: Language;

export declare const default_alias_12: Language;

export declare const default_alias_13: Language;

export declare const default_alias_14: Language;

export declare const default_alias_15: Language;

export declare const default_alias_16: Language;

export declare const default_alias_17: Language;

export declare const default_alias_18: Language;

export declare const default_alias_19: Language;

export declare const default_alias_2: Language;

export declare const default_alias_20: Language;

export declare const default_alias_21: Language;

export declare const default_alias_22: Language;

export declare const default_alias_23: Language;

export declare const default_alias_24: Language;

export declare const default_alias_25: Language;

export declare const default_alias_26: Language;

export declare const default_alias_27: Language;

export declare const default_alias_28: Language;

export declare const default_alias_29: Language;

export declare const default_alias_3: Language;

export declare const default_alias_30: Language;

export declare const default_alias_31: Language;

export declare const default_alias_32: Language;

export declare const default_alias_33: Language;

export declare const default_alias_34: Language;

export declare const default_alias_35: Language;

export declare const default_alias_36: Language;

export declare const default_alias_37: Language;

export declare const default_alias_38: Language;

export declare const default_alias_39: Language;

export declare const default_alias_4: Language;

export declare const default_alias_40: Language;

export declare const default_alias_41: Language;

export declare const default_alias_42: Language;

export declare const default_alias_43: Language;

export declare const default_alias_44: Language;

export declare const default_alias_45: Language;

export declare const default_alias_46: Language;

export declare const default_alias_47: Language;

export declare const default_alias_48: Language;

export declare const default_alias_49: Language;

export declare const default_alias_5: Language;

export declare const default_alias_50: Language;

export declare const default_alias_51: Language;

export declare const default_alias_52: Language;

export declare const default_alias_53: Language;

export declare const default_alias_54: Language;

export declare const default_alias_55: Language;

export declare const default_alias_56: Language;

export declare const default_alias_57: Language;

export declare const default_alias_58: Language;

export declare const default_alias_59: Language;

export declare const default_alias_6: Language;

export declare const default_alias_60: Language;

export declare const default_alias_61: Language;

export declare const default_alias_62: Language;

export declare const default_alias_63: Language;

export declare const default_alias_64: Language;

export declare const default_alias_65: Language;

export declare const default_alias_66: Language;

export declare const default_alias_67: Language;

export declare const default_alias_68: Language;

export declare const default_alias_69: Language;

export declare const default_alias_7: Language;

export declare const default_alias_70: Language;

export declare const default_alias_71: Language;

export declare const default_alias_72: Language;

export declare const default_alias_73: Language;

export declare const default_alias_74: Language;

export declare const default_alias_75: Language;

export declare const default_alias_76: Language;

export declare const default_alias_77: Language;

export declare const default_alias_78: Language;

export declare const default_alias_79: Language;

export declare const default_alias_8: Language;

export declare const default_alias_80: Language;

export declare const default_alias_81: Language;

export declare const default_alias_82: Language;

export declare const default_alias_83: Language;

export declare const default_alias_84: Language;

export declare const default_alias_85: Language;

export declare const default_alias_86: Language;

export declare const default_alias_87: Language;

export declare const default_alias_88: Language;

export declare const default_alias_89: Language;

export declare const default_alias_9: Language;

export declare const default_alias_90: Language;

export declare const default_alias_91: Language;

export declare const default_alias_92: Language;

export declare const default_alias_93: Language;

export declare const default_alias_94: Language;

export declare const default_alias_95: Language;

export declare const default_alias_96: Language;

export declare const default_alias_97: Language;

export declare const default_alias_98: Language;

export declare const default_alias_99: Language;

export declare const EMACS_MODE_MAP: Record<string, string>;

/** @internal */
export declare function encodeSource(source: string): Uint8Array;

/**
 * Escape HTML special characters.
 *
 * ```ts
 * escape('<div class="a">')
 * // "&lt;div class=&quot;a&quot;&gt;"
 * ```
 */
declare function escape_2(text: string): string;
export { escape_2 as escape }

/**
 * Escape a string for use inside an HTML attribute value.
 *
 * ```ts
 * escapeAttr('font-size: 14px; color: "red"')
 * // "font-size: 14px; color: &quot;red&quot;"
 * ```
 */
export declare function escapeAttr(value: string): string;

/**
 * Escape curly braces to HTML entities.
 *
 * ```ts
 * escapeBraces('{foo}')  // "&lbrace;foo&rbrace;"
 * ```
 */
export declare function escapeBraces(text: string): string;

export declare function escapeFragment(text: string): string;

export declare const EXACT_LANGUAGE_MAP: Record<string, string>;

export declare function formatBBCode(source: string, events: HighlightEvent_2[]): string;

/** @internal */
export declare function formatHighlightIterLines(source: string, events: HighlightEvent_2[], languageRef: LanguageRef | undefined, theme: Theme | undefined, options: {
    formatText?: (text: string) => string;
    openSpan: (span: HighlightSpan, style: HighlightStyle | undefined) => string;
    closeSpan?: (span: HighlightSpan, style: HighlightStyle | undefined) => string;
}): {
    lines: string[];
    language: string;
};

export declare function formatHtmlInline(source: string, events: HighlightEvent_2[], formatter: HtmlInlineFormatter): string;

export declare function formatHtmlLinked(source: string, events: HighlightEvent_2[], formatter: HtmlLinkedFormatter): string;

export declare function formatHtmlMultiThemes(source: string, events: HighlightEvent_2[], formatter: HtmlMultiThemesFormatter): string;

/**
 * A formatter renders highlighted source code into an output string.
 *
 * Built-in formatters are created with `htmlInline()`, `htmlLinked()`, etc.
 * Custom formatters implement the same interface. Inside `format()`, call the
 * sync free functions `highlightIter` (for flat token callbacks) or
 * `highlightEvents` (for nested open/close events) imported from
 * `@lumis-sh/lumis`.
 *
 * While `format()` is running, `this.language` is set to the resolved language
 * after detection, so the formatter can render language-dependent output
 * (e.g. `<code class="language-…">`) without re-running detection.
 *
 * ```ts
 * import { highlightIter, type Formatter } from '@lumis-sh/lumis'
 *
 * const formatter: Formatter = {
 *   language: javascript,
 *   format(source) {
 *     const parts: string[] = []
 *     highlightIter(source, this.language, dracula, (text, _lang, _range, scope) => {
 *       parts.push(scope ? `[${scope}] ${text}` : text)
 *     })
 *     return parts.join('\n')
 *   },
 * }
 * ```
 */
declare interface Formatter {
    language?: LanguageRef;
    rainbowBrackets?: boolean;
    format(source: string): string;
}
export { Formatter }
export { Formatter as Formatter_alias_1 }
export { Formatter as Formatter_alias_2 }

export declare function formatTerminal(source: string, events: HighlightEvent_2[], formatter: TerminalFormatter): string;

export declare function getDefaultRuntime(...args: Parameters<typeof runtime.getDefaultRuntime>): RuntimeLike;

export declare function getDefaultRuntime_alias_1(...args: Parameters<typeof runtime_2.getDefaultRuntime>): RuntimeLike;

/**
 * Get the CSS class for a highlighted line, or `undefined` if not highlighted.
 *
 * ```ts
 * getHighlightLineClass([1, [3, 5]], 4, 'active')  // "active"
 * getHighlightLineClass([1, [3, 5]], 2, 'active')  // undefined
 * ```
 */
export declare function getHighlightLineClass(lines: LineSpec[] | undefined, lineNumber: number, className: string | undefined, defaultClass?: string): string | undefined;

export declare function getInjectionRanges(node: Node_2, includeChildren: boolean): Range_2[];

export declare function getLoadedLanguage(...args: Parameters<typeof runtime.getLoadedLanguage>): LoadedLanguage | undefined;

export declare function getLoadedLanguage_alias_1(...args: Parameters<typeof runtime_2.getLoadedLanguage>): LoadedLanguage | undefined;

export declare function getLoadedLanguageIds(...args: Parameters<typeof runtime.getLoadedLanguageIds>): string[];

export declare function getLoadedLanguageIds_alias_1(...args: Parameters<typeof runtime_2.getLoadedLanguageIds>): string[];

/**
 * Look up a scope's style, trying a language-specific scope first.
 *
 * ```ts
 * getScopedThemeStyle(dracula, 'string', 'json')
 * // tries 'string.json' first, then falls back to 'string'
 * ```
 * @internal
 */
export declare function getScopedThemeStyle(theme: Theme | undefined, scope: string, language: LanguageRef): HighlightStyle | undefined;

/**
 * Look up a scope's style in a theme, falling back to parent scopes.
 *
 * ```ts
 * getThemeStyle(dracula, 'string.special.regex')
 * // tries 'string.special.regex', then 'string.special', then 'string'
 * ```
 * @internal
 */
export declare function getThemeStyle(theme: Theme | undefined, scope: string): HighlightStyle | undefined;

export declare const GLOB_MATCHERS: Array<{
    id: string;
    glob: string;
}>;

/**
 * Guess a language ID from a language hint, path, extension, or source content.
 *
 * The `language` argument can be a language ID, alias, file extension, file name,
 * or file path. If it cannot be resolved directly, Lumis falls back to content
 * heuristics such as Emacs mode headers, shebangs, HTML doctype, and XML declarations.
 */
export declare function guessLanguage(language?: string, source?: string): string;

/**
 * Parse a hex color string to RGB components.
 *
 * ```ts
 * hexToRgb('#ff79c6')  // [255, 121, 198]
 * hexToRgb('abc')      // undefined
 * ```
 */
declare function hexToRgb(hex: string): [number, number, number] | undefined;
export { hexToRgb }
export { hexToRgb as hexToRgb_alias_1 }

/** {@inheritDoc index.highlight} */
export declare function highlight(...args: Parameters<typeof highlighter.highlight>): Promise<string>;

/**
 * Highlight code in a single async call.
 *
 * Initializes the parser, loads the language, and returns formatted output.
 * Uses a shared runtime so loaded languages persist across calls.
 *
 * For repeated highlighting, prefer {@link createHighlighter} which separates
 * async setup from synchronous rendering.
 *
 * @example
 * ```ts
 * import { highlight } from '@lumis-sh/lumis'
 * import { htmlInline } from '@lumis-sh/lumis/formatters'
 * import javascript from '@lumis-sh/lumis/langs/javascript'
 * import dracula from '@lumis-sh/themes/dracula'
 *
 * const html = await highlight('const x = 1', htmlInline({ language: javascript, theme: dracula }))
 * ```
 */
export declare function highlight_alias_1(...args: Parameters<typeof highlighter_2.highlight>): Promise<string>;

export declare const HIGHLIGHT_NAMES: string[];

/**
 * Called for each highlighted token in `highlightIter`.
 *
 * ```ts
 * hl.highlightIter(source, javascript, dracula, (text, language, range, scope, style) => {
 *   console.log(`${scope}: ${text}`)
 * })
 * ```
 */
declare type HighlightCallback = (text: string, language: string, range: HighlightRange, scope: string, style: HighlightStyle | undefined) => void;
export { HighlightCallback }
export { HighlightCallback as HighlightCallback_alias_1 }
export { HighlightCallback as HighlightCallback_alias_2 }

export declare interface HighlightEndEvent {
    type: "end";
}

/** A reusable highlighter with preloaded or lazily registered languages. */
declare interface Highlighter {
    /** Highlight source code synchronously. The language must already be loaded. */
    highlight(source: string, formatter: Formatter): string;
    /** Low-level token iterator. Calls `onToken` for each highlighted span. Languages must already be loaded. */
    highlightIter(source: string, language: LanguageRef | undefined, theme: Theme | undefined, onToken: HighlightCallback): void;
    /** Load a language by object, lazy handle, or string ID from a registered bundle. No-op if already loaded. */
    loadLanguage(language: Language | LazyLanguage | string): Promise<void>;
    /** IDs of languages that have been loaded and are ready to highlight. */
    readonly languages: string[];
    /** IDs of all languages, including those registered lazily from bundles. */
    readonly registeredLanguages: string[];
}
export { Highlighter }
export { Highlighter as Highlighter_alias_1 }
export { Highlighter as Highlighter_alias_2 }

declare const highlighter: {
    createHighlighter(init?: CreateHighlighterOptions): Promise<Highlighter>;
    highlight(source: string, fmt: Formatter): Promise<string>;
};

declare const highlighter_2: {
    createHighlighter(init?: CreateHighlighterOptions): Promise<Highlighter>;
    highlight(source: string, fmt: Formatter): Promise<string>;
};

export declare interface HighlighterModuleFactory {
    createRuntime(options?: {
        wasmResolver?: WasmResolver;
    }): RuntimeLike;
    getDefaultRuntime(): RuntimeLike;
}

declare interface HighlighterRuntimeOptions {
    wasmResolver?: WasmResolver;
    sharedCache?: SharedRuntimeCache;
}
export { HighlighterRuntimeOptions }
export { HighlighterRuntimeOptions as HighlighterRuntimeOptions_alias_1 }
export { HighlighterRuntimeOptions as HighlighterRuntimeOptions_alias_2 }

export declare type HighlightEvent = HighlightStartEvent | HighlightSourceEvent | HighlightEndEvent;

/**
 * A nested highlight event from tree-sitter.
 *
 * Events form a nested structure: a `start` event opens a scope,
 * `source` events provide text ranges, and `end` closes the scope.
 * Parent scopes stay open across child scopes (e.g. a `string` scope
 * wraps injected `tag` scopes inside template literals).
 */
declare type HighlightEvent_2 = {
    type: "start";
    scope: string;
    language: string;
} | {
    type: "source";
    startByte: number;
    endByte: number;
} | {
    type: "end";
};
export { HighlightEvent_2 as HighlightEvent_alias_1 }
export { HighlightEvent_2 as HighlightEvent_alias_2 }
export { HighlightEvent_2 as HighlightEvent_alias_3 }
export { HighlightEvent_2 as HighlightEvent_alias_4 }
export { HighlightEvent_2 as HighlightEvent_alias_5 }

/**
 * Return the nested highlight event stream for `source`.
 *
 * Sync free function usable inside {@link Formatter.format}. Use this when your
 * formatter needs paired open/close markers around nested scopes (e.g. BBCode
 * tags) that the flat {@link highlightIter} callback API would lose.
 */
declare function highlightEvents(source: string, language: LanguageRef | undefined, options?: {
    rainbowBrackets?: boolean;
}): HighlightEvent_2[];
export { highlightEvents }
export { highlightEvents as highlightEvents_alias_1 }
export { highlightEvents as highlightEvents_alias_2 }

/**
 * Iterate over highlighted tokens for `source`, calling `onToken` for each flat span.
 *
 * Sync free function usable inside {@link Formatter.format}. For top-level
 * (non-formatter) iteration, use `hl.highlightIter` on a {@link Highlighter}
 * instance instead.
 */
declare function highlightIter(source: string, language: LanguageRef | undefined, theme: Theme | undefined, onToken: HighlightCallback): void;
export { highlightIter }
export { highlightIter as highlightIter_alias_1 }
export { highlightIter as highlightIter_alias_2 }

/**
 * Signature of the `highlightIter` free function and the `hl.highlightIter`
 * method on a {@link Highlighter} instance.
 *
 * ```ts
 * highlightIter(source, javascript, dracula, (text, language, range, scope, style) => {
 *   console.log(`${scope}: ${text}`)
 * })
 * ```
 */
declare type HighlightIterFn = (source: string, language: LanguageRef | undefined, theme: Theme | undefined, onToken: HighlightCallback) => void;
export { HighlightIterFn }
export { HighlightIterFn as HighlightIterFn_alias_1 }
export { HighlightIterFn as HighlightIterFn_alias_2 }
export { HighlightIterFn as HighlightIterFn_alias_3 }
export { HighlightIterFn as HighlightIterFn_alias_4 }

/**
 * Highlight source and collect ANSI-wrapped segments.
 *
 * ```ts
 * const segments = []
 * highlightIter(source, language, theme, (text, _language, range, _scope, style) => {
 *   segments.push([paint(text, style), range])
 * })
 * // [["\x1b[0m...const\x1b[0m", { start: 0, end: 5 }], ...]
 * ```
 *
 * @deprecated Use `highlightIter()` with `paint()` instead.
 */
export declare function highlightIterWithAnsi(source: string, language: LanguageRef | undefined, theme: Theme | undefined): Promise<AnsiSegment[]>;

/**
 * Line highlighting for inline and multi-themes formatters.
 *
 * ```ts
 * htmlInline({ highlightLines: { lines: [1, [3, 5]], style: 'theme' } })
 * ```
 */
declare interface HighlightLinesInline {
    lines: LineSpec[];
    /** `"theme"` uses the theme's highlight background. Any other string is raw CSS. */
    style?: string;
    class?: string;
}
export { HighlightLinesInline }
export { HighlightLinesInline as HighlightLinesInline_alias_1 }
export { HighlightLinesInline as HighlightLinesInline_alias_2 }

/**
 * Line highlighting for the linked formatter.
 *
 * ```ts
 * htmlLinked({ highlightLines: { lines: [1, [3, 5]], class: 'active' } })
 * ```
 */
declare interface HighlightLinesLinked {
    lines: LineSpec[];
    /** Defaults to `"l-highlighted"`. */
    class?: string;
}
export { HighlightLinesLinked }
export { HighlightLinesLinked as HighlightLinesLinked_alias_1 }
export { HighlightLinesLinked as HighlightLinesLinked_alias_2 }

/**
 * Byte offset range of a highlighted token.
 *
 * ```ts
 * const range: HighlightRange = { start: 0, end: 5 }
 * ```
 */
declare interface HighlightRange {
    start: number;
    end: number;
}
export { HighlightRange }
export { HighlightRange as HighlightRange_alias_1 }
export { HighlightRange as HighlightRange_alias_2 }
export { HighlightRange as HighlightRange_alias_3 }
export { HighlightRange as HighlightRange_alias_4 }

export declare interface HighlightSourceEvent {
    type: "source";
    startByte: number;
    endByte: number;
}

/**
 * A highlighted token's byte range and scope.
 *
 * ```ts
 * // { startByte: 0, endByte: 5, scope: "keyword", language: "javascript" }
 * ```
 */
declare interface HighlightSpan {
    startByte: number;
    endByte: number;
    scope: string;
    language: string;
}
export { HighlightSpan }
export { HighlightSpan as HighlightSpan_alias_1 }
export { HighlightSpan as HighlightSpan_alias_2 }

export declare interface HighlightStartEvent {
    type: "start";
    scope: string;
    language: string;
}

/**
 * Visual style for a scope from a theme.
 *
 * ```ts
 * const style: HighlightStyle = { fg: '#ff79c6', italic: true }
 * ```
 */
declare interface HighlightStyle {
    fg?: string;
    bg?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean | "solid" | "wavy" | "double" | "dotted" | "dashed" | "undercurl";
    strikethrough?: boolean;
}
export { HighlightStyle }
export { HighlightStyle as HighlightStyle_alias_1 }
export { HighlightStyle as HighlightStyle_alias_2 }
export { HighlightStyle as HighlightStyle_alias_3 }
export { HighlightStyle as HighlightStyle_alias_4 }

/** HTML attribute map. Values of `undefined`, `null`, or `false` are omitted. */
export declare type HtmlAttrs = Record<string, string | number | boolean | undefined | null>;

/**
 * Wraps the `<pre>` block with custom HTML.
 *
 * ```ts
 * htmlInline({ header: { openTag: '<div class="code">', closeTag: '</div>' } })
 * ```
 */
declare interface HtmlElement {
    openTag: string;
    closeTag: string;
}
export { HtmlElement }
export { HtmlElement as HtmlElement_alias_1 }
export { HtmlElement as HtmlElement_alias_2 }

/**
 * Create an inline-styles HTML formatter. Each token gets a `<span>` with
 * `style="color: ..."` pulled from the theme.
 *
 * @example
 * ```ts
 * import { htmlInline } from '@lumis-sh/lumis/formatters'
 * import javascript from '@lumis-sh/lumis/langs/javascript'
 * import dracula from '@lumis-sh/themes/dracula'
 *
 * hl.highlight('const x = 1', htmlInline({ language: javascript, theme: dracula }))
 * ```
 */
declare function htmlInline(options?: HtmlInlineOptions): HtmlInlineFormatter;
export { htmlInline }
export { htmlInline as htmlInline_alias_1 }

declare interface HtmlInlineFormatter extends Formatter, HtmlInlineOptions {
}
export { HtmlInlineFormatter }
export { HtmlInlineFormatter as HtmlInlineFormatter_alias_1 }
export { HtmlInlineFormatter as HtmlInlineFormatter_alias_2 }

/**
 * Options for {@link htmlInline}.
 *
 * ```ts
 * htmlInline({ language: javascript, theme: dracula, preClass: 'my-code', italic: true })
 * ```
 */
declare interface HtmlInlineOptions {
    language?: LanguageRef;
    theme?: Theme;
    preClass?: string;
    /** Use italic styles from the theme. */
    italic?: boolean;
    /** Add `data-highlight` attributes with scope names. */
    includeHighlights?: boolean;
    /** Render nested brackets with rainbow bracket scopes. */
    rainbowBrackets?: boolean;
    highlightLines?: HighlightLinesInline;
    header?: HtmlElement;
}
export { HtmlInlineOptions }
export { HtmlInlineOptions as HtmlInlineOptions_alias_1 }
export { HtmlInlineOptions as HtmlInlineOptions_alias_2 }

/**
 * Create a class-based HTML formatter. Each token gets a `<span class="...">` with
 * semantic scope names. Requires a theme CSS file on the page.
 *
 * @example
 * ```ts
 * import { htmlLinked } from '@lumis-sh/lumis/formatters'
 * import javascript from '@lumis-sh/lumis/langs/javascript'
 * import '@lumis-sh/themes/css/dracula.css'
 *
 * hl.highlight('const x = 1', htmlLinked({ language: javascript }))
 * ```
 */
declare function htmlLinked(options?: HtmlLinkedOptions): HtmlLinkedFormatter;
export { htmlLinked }
export { htmlLinked as htmlLinked_alias_1 }

declare interface HtmlLinkedFormatter extends Formatter, HtmlLinkedOptions {
}
export { HtmlLinkedFormatter }
export { HtmlLinkedFormatter as HtmlLinkedFormatter_alias_1 }
export { HtmlLinkedFormatter as HtmlLinkedFormatter_alias_2 }

/**
 * Options for {@link htmlLinked}.
 *
 * ```ts
 * htmlLinked({ language: javascript, preClass: 'my-code' })
 * ```
 */
declare interface HtmlLinkedOptions {
    language?: LanguageRef;
    preClass?: string;
    rainbowBrackets?: boolean;
    highlightLines?: HighlightLinesLinked;
    header?: HtmlElement;
}
export { HtmlLinkedOptions }
export { HtmlLinkedOptions as HtmlLinkedOptions_alias_1 }
export { HtmlLinkedOptions as HtmlLinkedOptions_alias_2 }

/**
 * Create a multi-theme HTML formatter using CSS custom properties.
 * Light/dark switching works via `prefers-color-scheme`.
 *
 * @example
 * ```ts
 * import { htmlMultiThemes } from '@lumis-sh/lumis/formatters'
 * import javascript from '@lumis-sh/lumis/langs/javascript'
 * import githubLight from '@lumis-sh/themes/github_light'
 * import githubDark from '@lumis-sh/themes/github_dark'
 *
 * hl.highlight('const x = 1', htmlMultiThemes({
 *   language: javascript,
 *   themes: { light: githubLight, dark: githubDark },
 *   defaultTheme: 'light-dark()',
 * }))
 * ```
 */
declare function htmlMultiThemes(options: HtmlMultiThemesOptions): HtmlMultiThemesFormatter;
export { htmlMultiThemes }
export { htmlMultiThemes as htmlMultiThemes_alias_1 }

declare interface HtmlMultiThemesFormatter extends Formatter, HtmlMultiThemesOptions {
}
export { HtmlMultiThemesFormatter }
export { HtmlMultiThemesFormatter as HtmlMultiThemesFormatter_alias_1 }
export { HtmlMultiThemesFormatter as HtmlMultiThemesFormatter_alias_2 }

/**
 * Options for {@link htmlMultiThemes}.
 *
 * ```ts
 * htmlMultiThemes({
 *   language: javascript,
 *   themes: { light: githubLight, dark: githubDark },
 *   defaultTheme: 'light-dark()',
 * })
 * ```
 */
declare interface HtmlMultiThemesOptions {
    language?: LanguageRef;
    themes: Record<string, Theme>;
    /**
     * Theme whose colors are inlined as defaults.
     * Pass `"light-dark()"` to use the CSS `light-dark()` function instead.
     */
    defaultTheme?: string;
    /** Prefix for CSS custom properties. Defaults to `"--lumis"`. */
    cssVariablePrefix?: string;
    preClass?: string;
    italic?: boolean;
    includeHighlights?: boolean;
    rainbowBrackets?: boolean;
    highlightLines?: HighlightLinesInline;
    header?: HtmlElement;
}
export { HtmlMultiThemesOptions }
export { HtmlMultiThemesOptions as HtmlMultiThemesOptions_alias_1 }
export { HtmlMultiThemesOptions as HtmlMultiThemesOptions_alias_2 }

export declare function initParser(...args: Parameters<typeof runtime.initParser>): Promise<void>;

export declare function initParser_alias_1(...args: Parameters<typeof runtime_2.initParser>): Promise<void>;

/**
 * Join CSS class names, filtering out falsy values.
 *
 * ```ts
 * joinClasses('l-line', undefined, 'l-highlighted')  // "l-line l-highlighted"
 * joinClasses(undefined, false)                   // undefined
 * ```
 */
export declare function joinClasses(...classes: Array<string | undefined | false | null>): string | undefined;

/**
 * A language definition with Tree-sitter queries and a WASM parser reference.
 *
 * ```ts
 * import javascript from '@lumis-sh/lumis/langs/javascript'
 * // javascript.id         → "javascript"
 * // javascript.aliases    → ["js", "jsx"]
 * // javascript.highlights → "(identifier) @variable ..."
 * ```
 */
declare interface Language {
    id: string;
    aliases: string[];
    /** Tree-sitter highlight query (S-expression). */
    highlights: string;
    injections?: string;
    locals?: string;
    brackets?: string;
    /**
     * WASM parser source:
     * - `WasmRef` fetched from CDN (default for pre-built bundles)
     * - `Uint8Array` or `ArrayBuffer` passed directly (useful with browser bundlers)
     * - `URL` fetched directly (`file://` works in Node.js)
     * - `string` treated as file path (Node.js) or URL (browser)
     */
    wasm: WasmRef | RuntimeWasmInput;
}
export { Language }
export { Language as Language_alias_1 }
export { Language as Language_alias_2 }

export declare const LANGUAGE_LOADERS: Record<string, () => Promise<{
    default: Language;
}>>;

/**
 * A collection of lazy language handles. Import a preset bundle:
 *
 * ```ts
 * import { bundledLanguages } from '@lumis-sh/lumis/bundles/web'
 * import { bundledLanguages } from '@lumis-sh/lumis/bundles/web-extra'
 * import { bundledLanguages } from '@lumis-sh/lumis/bundles/system'
 * import { bundledLanguages } from '@lumis-sh/lumis/bundles/backend'
 * import { bundledLanguages } from '@lumis-sh/lumis/bundles/full'
 * ```
 */
declare type LanguageBundle = Record<string, LazyLanguage>;
export { LanguageBundle }
export { LanguageBundle as LanguageBundle_alias_1 }
export { LanguageBundle as LanguageBundle_alias_2 }

export declare interface LanguageDefinition {
    id: string;
    aliases: string[];
}

/**
 * Metadata about a supported language. Returned by {@link availableLanguages}.
 *
 * ```ts
 * import { availableLanguages } from '@lumis-sh/lumis'
 * const languages = availableLanguages()
 * // [{ id: 'javascript', name: 'JavaScript', aliases: ['js', 'jsx'], extensions: ['*.js', ...] }, ...]
 * ```
 */
declare interface LanguageInfo {
    id: string;
    name: string;
    aliases: string[];
    extensions: string[];
    globs: string[];
    emacsModes: string[];
    shebangs: string[];
}
export { LanguageInfo }
export { LanguageInfo as LanguageInfo_alias_1 }
export { LanguageInfo as LanguageInfo_alias_2 }

/**
 * What `createHighlighter({ languages })` accepts.
 *
 * - `Language` — loaded immediately
 * - `Promise<{ default: Language }>` — e.g. `import('@lumis-sh/lumis/langs/css')`
 * - `() => Promise<{ default: Language }>` — lazy, loaded when called
 * - `LanguageBundle` — registered lazily, loaded on first use
 */
declare type LanguageInput = Language | Promise<{
    default: Language;
}> | (() => Promise<{
    default: Language;
}>) | LanguageBundle;
export { LanguageInput }
export { LanguageInput as LanguageInput_alias_1 }
export { LanguageInput as LanguageInput_alias_2 }

/**
 * How formatters and `hl.highlight()` identify a language.
 *
 * - `Language` — the full language object
 * - `LazyLanguage` — a handle from a bundle
 * - `string` — a language ID like `"javascript"`
 */
declare type LanguageRef = Language | LazyLanguage | string;
export { LanguageRef }
export { LanguageRef as LanguageRef_alias_1 }
export { LanguageRef as LanguageRef_alias_2 }

export declare const LANGUAGES: LanguageInfo[];

export declare interface LanguagesModule {
    createRuntime(options?: HighlighterRuntimeOptions): RuntimeLike;
    configureWasmResolver(fn: WasmResolver): void;
    initParser(): Promise<void>;
    registerLanguage(def: LanguageDefinition): void;
    resolveLanguageId(nameOrAlias: string): string;
    loadLanguage(opts: LoadLanguageOptions): Promise<LoadedLanguage>;
    loadPlaintext(): Promise<LoadedLanguage>;
    getLoadedLanguage(nameOrAlias: string): LoadedLanguage | undefined;
    getLoadedLanguageIds(): string[];
    availableLanguages(): LanguageInfo[];
    getDefaultRuntime(): RuntimeLike;
}

export declare function lazy(id: string, aliases: string[], load: () => Promise<{
    default: Language;
}>): LazyLanguage;

/**
 * A lazy language handle from a bundle. Callable to load the full {@link Language}.
 *
 * ```ts
 * import { bundledLanguages } from '@lumis-sh/lumis/bundles/web'
 *
 * bundledLanguages.javascript.id  // "javascript"
 * const language = await bundledLanguages.javascript()  // loads the full Language
 * ```
 */
declare interface LazyLanguage {
    (): Promise<Language>;
    id: string;
    aliases: string[];
}
export { LazyLanguage }
export { LazyLanguage as LazyLanguage_alias_1 }
export { LazyLanguage as LazyLanguage_alias_2 }

/**
 * Check if a line number is in a list of highlighted lines.
 *
 * ```ts
 * lineIsHighlighted([1, [3, 5]], 4)  // true
 * lineIsHighlighted([1, [3, 5]], 2)  // false
 * ```
 */
export declare function lineIsHighlighted(lines: LineSpec[] | undefined, lineNumber: number): boolean;

/**
 * Slice rendered HTML back into lines using offsets from {@link renderEvents}.
 */
export declare function linesFromOffsets(html: Uint8Array, lineOffsets: number[]): string[];

/**
 * A single line number (1-based) or `[start, end]` inclusive range.
 *
 * ```ts
 * const lines: LineSpec[] = [1, [3, 5], 8]  // lines 1, 3-5, and 8
 * ```
 */
declare type LineSpec = number | [number, number];
export { LineSpec }
export { LineSpec as LineSpec_alias_1 }
export { LineSpec as LineSpec_alias_2 }

export declare interface LoadedLanguage {
    definition: LanguageDefinition;
    parser: Parser;
    language: Language_2;
    config: CompiledHighlightConfig;
    brackets?: CompiledBracketConfig;
}

export declare function loadLanguage(...args: Parameters<typeof runtime.loadLanguage>): Promise<LoadedLanguage>;

export declare function loadLanguage_alias_1(...args: Parameters<typeof runtime_2.loadLanguage>): Promise<LoadedLanguage>;

declare interface LoadLanguageOptions {
    definition: LanguageDefinition;
    wasm: WasmRef | Uint8Array | ArrayBuffer | string | URL | Response;
    highlights: string;
    injections?: string;
    locals?: string;
    brackets?: string;
}
export { LoadLanguageOptions }
export { LoadLanguageOptions as LoadLanguageOptions_alias_1 }
export { LoadLanguageOptions as LoadLanguageOptions_alias_2 }

export declare function loadPlaintext(...args: Parameters<typeof runtime.loadPlaintext>): Promise<LoadedLanguage>;

export declare function loadPlaintext_alias_1(...args: Parameters<typeof runtime_2.loadPlaintext>): Promise<LoadedLanguage>;

export declare function mapBundle(bundle: LanguageBundle, map: (language: Language) => Language): LanguageBundle;

export declare const nodeRuntime: RuntimeEnvironment;

/**
 * Open a `<code>` tag with the language class.
 *
 * ```ts
 * openCodeTag(javascript)  // '<code class="language-javascript" translate="no" tabindex="0">'
 * ```
 */
export declare function openCodeTag(language: LanguageRef | undefined): string;

/**
 * Open a `<pre>` tag with the `lumis` class and optional theme background.
 *
 * ```ts
 * openPreTag({ theme: dracula })
 * // '<pre class="lumis" style="color: #f8f8f2; background-color: #282a36;">'
 * ```
 */
export declare function openPreTag(options?: OpenPreTagOptions): string;

/**
 * Options for {@link openPreTag}.
 *
 * ```ts
 * openPreTag({ preClass: 'my-code', theme: dracula })
 * ```
 */
export declare interface OpenPreTagOptions {
    preClass?: string;
    theme?: Theme;
}

/**
 * Open a `<span>` tag with the given attributes.
 *
 * ```ts
 * openSpanTag({ class: 'l-keyword' })  // '<span class="l-keyword">'
 * ```
 */
export declare function openSpanTag(attrs?: HtmlAttrs): string;

/**
 * Build an opening HTML tag with attributes.
 *
 * ```ts
 * openTag('span', { class: 'keyword', style: 'color: red' })
 * // '<span class="keyword" style="color: red">'
 * ```
 */
export declare function openTag(name: string, attrs?: HtmlAttrs): string;

/**
 * Render text with ANSI escape codes from a style, with reset on each newline.
 */
declare function paint(text: string, style: HighlightStyle | undefined): string;
export { paint }
export { paint as paint_alias_1 }

export declare const PLAINTEXT_LANG_ID = "plaintext";

export declare interface QueryCaptureOffset {
    startRow: number;
    startColumn: number;
    endRow: number;
    endColumn: number;
}

export declare function registerLanguage(...args: Parameters<typeof runtime.registerLanguage>): void;

export declare function registerLanguage_alias_1(...args: Parameters<typeof runtime_2.registerLanguage>): void;

/**
 * Render highlight events into a single HTML buffer plus line offsets.
 *
 * The returned offsets can be passed to {@link linesFromOffsets}.
 */
export declare function renderEvents(source: string, events: HighlightEvent_2[], attributeCallback: (scope: string, language: string, html: string[]) => void): [Uint8Array, number[]];

export declare function renderHtmlBlock(options: {
    lines: string[];
    language: LanguageRef | undefined;
    pre: string;
    lineOptions: (lineNumber: number) => {
        className?: string;
        style?: string;
    };
    header?: HtmlElement;
}): string;

/**
 * Render highlight events into escaped HTML lines, reopening active spans across newlines.
 *
 * ```ts
 * renderLinesFromEvents('a\nb', events, (scope) => `class="${scope}"`)
 * // ['<span class="...">a</span>', '<span class="...">b</span>']
 * ```
 */
export declare function renderLinesFromEvents(source: string, events: HighlightEvent_2[], spanAttrs: (scope: string, language: string) => string): string[];

export declare function resolveLanguageId(...args: Parameters<typeof runtime.resolveLanguageId>): string;

export declare function resolveLanguageId_alias_1(...args: Parameters<typeof runtime_2.resolveLanguageId>): string;

/**
 * Build an ANSI 24-bit color escape sequence.
 *
 * ```ts
 * rgbToAnsi(255, 121, 198, false)  // "\x1b[38;2;255;121;198m" (foreground)
 * rgbToAnsi(40, 42, 54, true)      // "\x1b[48;2;40;42;54m" (background)
 * ```
 */
declare function rgbToAnsi(r: number, g: number, b: number, isBackground: boolean): string;
export { rgbToAnsi }
export { rgbToAnsi as rgbToAnsi_alias_1 }

declare const runtime: LanguagesModule;

declare const runtime_2: LanguagesModule;

export declare interface RuntimeEnvironment {
    resolveWasm(wasm: Uint8Array | ArrayBuffer | string | URL | Response): Promise<Uint8Array | string>;
    readFsCache(key: string): Promise<Uint8Array | undefined>;
    writeFsCache(key: string, data: Uint8Array): Promise<void>;
    readResolvedWasmFromDisk(source: string | URL): Promise<Uint8Array | undefined>;
    parserInitOptions?(): Promise<Record<string, unknown> | undefined>;
}

export declare interface RuntimeEnvironmentResolver {
    language: string;
    ref: WasmRef;
}

declare interface RuntimeLike {
    configureWasmResolver(fn: WasmResolver): void;
    initParser(): Promise<void>;
    registerLanguage(def: LanguageDefinition): void;
    resolveLanguageId(nameOrAlias: string): string;
    getLoadedLanguage(nameOrAlias: string): LoadedLanguage | undefined;
    getLoadedLanguageIds(): string[];
    loadLanguage(opts: LoadLanguageOptions): Promise<LoadedLanguage>;
    loadPlaintext(): Promise<LoadedLanguage>;
}
export { RuntimeLike }
export { RuntimeLike as RuntimeLike_alias_1 }
export { RuntimeLike as RuntimeLike_alias_2 }

declare interface RuntimeLookup {
    getLoadedLanguage(nameOrAlias: string): LoadedLanguage | undefined;
}

declare type RuntimeWasmBundle = Partial<Record<string, RuntimeWasmInput>>;
export { RuntimeWasmBundle }
export { RuntimeWasmBundle as RuntimeWasmBundle_alias_1 }
export { RuntimeWasmBundle as RuntimeWasmBundle_alias_2 }

declare type RuntimeWasmInput = Uint8Array | ArrayBuffer | string | URL | Response;
export { RuntimeWasmInput }
export { RuntimeWasmInput as RuntimeWasmInput_alias_1 }
export { RuntimeWasmInput as RuntimeWasmInput_alias_2 }

/**
 * Replace non-alphanumeric characters in a theme name with hyphens.
 *
 * ```ts
 * sanitizeThemeName('github light')  // "github-light"
 * ```
 */
declare function sanitizeThemeName(name: string): string;
export { sanitizeThemeName }
export { sanitizeThemeName as sanitizeThemeName_alias_1 }
export { sanitizeThemeName as sanitizeThemeName_alias_2 }

/**
 * Convert a dot-separated scope to a CSS class name.
 *
 * ```ts
 * scopeToClass('string.special.regex')  // "l-string-special-regex"
 * ```
 */
export declare function scopeToClass(scope: string): string;

declare interface SharedRuntimeCache {
    parserInit?: Promise<void>;
    wasmBytes: Map<string, Uint8Array>;
    wasmLoads: Map<string, Promise<Uint8Array>>;
}
export { SharedRuntimeCache }
export { SharedRuntimeCache as SharedRuntimeCache_alias_1 }
export { SharedRuntimeCache as SharedRuntimeCache_alias_2 }

export declare const SHEBANG_MAP: Record<string, string>;

/**
 * Render an inline-styled `<span>` for a token.
 *
 * ```ts
 * spanInline('const', { language: 'javascript', scope: 'keyword', theme: dracula })
 * // '<span style="color: #ff79c6;">const</span>'
 * ```
 */
export declare function spanInline(text: string, options: SpanInlineOptions): string;

/**
 * Build HTML attributes for an inline-styled `<span>`.
 *
 * ```ts
 * spanInlineAttrs({ language: 'javascript', scope: 'keyword', theme: dracula })
 * // { style: "color: #ff79c6;" }
 * ```
 */
export declare function spanInlineAttrs(options: SpanInlineOptions): HtmlAttrs;

/**
 * Options for {@link spanInline} and {@link spanInlineAttrs}.
 *
 * ```ts
 * spanInline('const', { language: 'javascript', scope: 'keyword', theme: dracula })
 * ```
 */
export declare interface SpanInlineOptions {
    language: LanguageRef;
    scope: string;
    theme?: Theme;
    italic?: boolean;
    includeHighlights?: boolean;
}

/**
 * Render a class-based `<span>` for a token.
 *
 * ```ts
 * spanLinked('const', 'keyword')  // '<span class="l-keyword">const</span>'
 * ```
 */
export declare function spanLinked(text: string, scope: string): string;

/**
 * Build HTML attributes for a class-based `<span>`.
 *
 * ```ts
 * spanLinkedAttrs('keyword')  // 'class="l-keyword"'
 * ```
 */
export declare function spanLinkedAttrs(scope: string): string;

/**
 * Render a multi-theme `<span>` with CSS custom properties.
 *
 * ```ts
 * spanMultiThemes('const', {
 *   language: 'javascript',
 *   scope: 'keyword',
 *   themes: { light: githubLight, dark: githubDark },
 *   defaultTheme: 'light-dark()',
 * })
 * ```
 */
export declare function spanMultiThemes(text: string, options: SpanMultiThemesOptions): string;

/**
 * Build HTML attributes for a multi-theme `<span>` with CSS custom properties.
 *
 * ```ts
 * spanMultiThemesAttrs({ language: 'js', scope: 'keyword', themes: { light: l, dark: d } })
 * // { style: "--lumis-light:#000; --lumis-dark:#fff; ..." }
 * ```
 */
export declare function spanMultiThemesAttrs(options: SpanMultiThemesOptions): HtmlAttrs;

/**
 * Options for {@link spanMultiThemes} and {@link spanMultiThemesAttrs}.
 *
 * ```ts
 * spanMultiThemes('const', {
 *   language: 'javascript',
 *   scope: 'keyword',
 *   themes: { light: githubLight, dark: githubDark },
 *   defaultTheme: 'light-dark()',
 * })
 * ```
 */
export declare interface SpanMultiThemesOptions {
    language: LanguageRef;
    scope: string;
    themes: Record<string, Theme | undefined>;
    defaultTheme?: string;
    /** Defaults to `"--lumis"`. */
    cssVariablePrefix?: string;
    italic?: boolean;
    includeHighlights?: boolean;
}

/**
 * Convert a `HighlightStyle` to ANSI escape codes.
 *
 * ```ts
 * styleToAnsi({ fg: '#ff79c6', bold: true })
 * // "\x1b[38;2;255;121;198m\x1b[1m"
 * ```
 */
declare function styleToAnsi(style: HighlightStyle | undefined): string;
export { styleToAnsi }
export { styleToAnsi as styleToAnsi_alias_1 }

/**
 * Convert a `HighlightStyle` to inline CSS declarations.
 *
 * ```ts
 * styleToCss({ fg: '#ff79c6', bold: true })
 * // "color: #ff79c6; font-weight: bold;"
 * ```
 */
export declare function styleToCss(style: HighlightStyle | undefined, options?: {
    italic?: boolean;
    separator?: string;
    compact?: boolean;
}): string;

declare function terminal(options?: TerminalOptions): TerminalFormatter;
export { terminal }
export { terminal as terminal_alias_1 }

declare interface TerminalFormatter extends Formatter, TerminalOptions {
}
export { TerminalFormatter }
export { TerminalFormatter as TerminalFormatter_alias_1 }
export { TerminalFormatter as TerminalFormatter_alias_2 }
export { TerminalFormatter as TerminalFormatter_alias_3 }

/**
 * Options for {@link terminal}.
 *
 * ```ts
 * terminal({ language: javascript, theme: dracula })
 * ```
 */
declare interface TerminalOptions {
    language?: LanguageRef;
    theme?: Theme;
    rainbowBrackets?: boolean;
}
export { TerminalOptions }
export { TerminalOptions as TerminalOptions_alias_1 }
export { TerminalOptions as TerminalOptions_alias_2 }
export { TerminalOptions as TerminalOptions_alias_3 }

/**
 * Build a CSS `text-decoration` value from a style.
 *
 * ```ts
 * textDecoration({ underline: 'wavy', strikethrough: true })
 * // "underline wavy line-through"
 * ```
 */
export declare function textDecoration(style: HighlightStyle): string;

/**
 * Theme with color and style mappings for syntax scopes.
 *
 * ```ts
 * import dracula from '@lumis-sh/themes/dracula'
 * // dracula.name        → "dracula"
 * // dracula.appearance  → "dark"
 * // dracula.highlights  → { "keyword": { fg: "#ff79c6" }, ... }
 * ```
 */
declare interface Theme {
    name: string;
    appearance: "light" | "dark";
    revision?: string;
    highlights: Record<string, HighlightStyle>;
}
export { Theme }
export { Theme as Theme_alias_1 }
export { Theme as Theme_alias_2 }

/**
 * Metadata about a built-in theme. Returned by {@link availableThemes}.
 *
 * ```ts
 * import { availableThemes } from '@lumis-sh/lumis'
 * const themes = availableThemes()
 * // [{ name: 'dracula', appearance: 'dark' }, { name: 'github_light', appearance: 'light' }, ...]
 * ```
 */
declare interface ThemeInfo {
    name: string;
    appearance: "light" | "dark";
}
export { ThemeInfo }
export { ThemeInfo as ThemeInfo_alias_1 }
export { ThemeInfo as ThemeInfo_alias_2 }

export declare const THEMES: ThemeInfo[];

/**
 * Pointer to a WASM parser binary on a CDN.
 *
 * ```ts
 * const ref: WasmRef = { packageName: '@lumis-sh/wasm-javascript', name: 'tree-sitter-javascript', version: '0.26' }
 * ```
 */
declare interface WasmRef {
    packageName: string;
    name: string;
    version: string;
}
export { WasmRef }
export { WasmRef as WasmRef_alias_1 }
export { WasmRef as WasmRef_alias_2 }

declare type WasmResolver = (language: string, wasm: WasmRef) => string | URL;
export { WasmResolver }
export { WasmResolver as WasmResolver_alias_1 }
export { WasmResolver as WasmResolver_alias_2 }
export { WasmResolver as WasmResolver_alias_3 }
export { WasmResolver as WasmResolver_alias_4 }

/** {@inheritDoc index.withWasm} */
export declare function withWasm<T extends Language>(language: T, wasm: RuntimeWasmInput): Omit<T, "wasm"> & {
    wasm: RuntimeWasmInput;
};

/**
 * Return a copy of a language with a custom WASM source.
 *
 * Useful in browser bundlers when you want to import a parser package directly,
 * for example `import elixirWasm from '@lumis-sh/wasm-elixir'`.
 */
export declare function withWasm_alias_1<T extends Language>(language: T, wasm: RuntimeWasmInput): Omit<T, "wasm"> & {
    wasm: RuntimeWasmInput;
};

/** {@inheritDoc index.withWasmBundle} */
export declare function withWasmBundle(bundle: LanguageBundle, wasms: RuntimeWasmBundle): LanguageBundle;

/**
 * Apply a map of statically imported WASM assets to every matching language in a bundle.
 *
 * Useful with packages like `@lumis-sh/wasm-bundle-web` in browser bundlers.
 */
export declare function withWasmBundle_alias_1(bundle: LanguageBundle, wasms: RuntimeWasmBundle): LanguageBundle;

/**
 * Wrap a line of highlighted HTML in a `<div>` with line metadata.
 *
 * ```ts
 * wrapLine(1, '<span>const</span>', { className: 'l-highlighted' })
 * // '<div class="l-line l-highlighted" data-line="1"><span>const</span>\n</div>'
 * ```
 */
export declare function wrapLine(lineNumber: number, content: string, options?: {
    className?: string;
    style?: string;
}): string;

/**
 * Wrap text with ANSI escape codes from a style.
 *
 * @deprecated Use `paint()` instead.
 */
declare function wrapWithAnsi(text: string, style: HighlightStyle | undefined): string;
export { wrapWithAnsi }
export { wrapWithAnsi as wrapWithAnsi_alias_1 }

/**
 * Wrap content with an optional header element.
 *
 * ```ts
 * wrapWithHeader('<pre>...</pre>', { openTag: '<div>', closeTag: '</div>' })
 * // "<div><pre>...</pre></div>"
 * ```
 * @internal
 */
export declare function wrapWithHeader(content: string, header?: HtmlElement): string;

export { }
