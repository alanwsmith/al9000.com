/**
 * Build a CSS stylesheet for a theme.
 *
 * Most applications can use the bundled CSS files from `@lumis-sh/themes/css/*`,
 * but this is useful when CSS needs to be embedded, scoped, or customized, for
 * example to scope a dark theme under a `data-theme` selector.
 *
 * ```ts
 * import { buildCss } from '@lumis-sh/themes'
 * import githubDark from '@lumis-sh/themes/github_dark'
 *
 * const css = buildCss(githubDark, {
 *   scope: 'html[data-theme="dark"]',
 *   containerSelector: '.lumis',
 *   containerStyle: [
 *     ['background-color', 'var(--code-background)'],
 *     ['border-radius', '0.375rem'],
 *     ['padding', '1rem'],
 *   ],
 * })
 * ```
 */
declare function buildCss(theme: ThemeData, options?: BuildCssOptions): string;
export { buildCss }
export { buildCss as buildCss_alias_1 }

/** Options for {@link buildCss}. */
declare interface BuildCssOptions {
    /** Whether italic theme styles should be emitted. Defaults to `true`. */
    enableItalic?: boolean;
    /** Parent selector prepended to every generated selector. Defaults to `""`. */
    scope?: string;
    /** Selector used for the container code block rule. Defaults to `".lumis"`. */
    containerSelector?: string;
    /**
     * Extra `[property, value]` declarations for the container code block rule. A property that matches
     * one the theme already sets (`color`, `background-color`) replaces that value instead of duplicating it.
     */
    containerStyle?: [string, string][];
}
export { BuildCssOptions }
export { BuildCssOptions as BuildCssOptions_alias_1 }

export declare const default_alias: ThemeData;

export declare const default_alias_1: ThemeData;

export declare const default_alias_10: ThemeData;

export declare const default_alias_100: ThemeData;

export declare const default_alias_101: ThemeData;

export declare const default_alias_102: ThemeData;

export declare const default_alias_103: ThemeData;

export declare const default_alias_104: ThemeData;

export declare const default_alias_105: ThemeData;

export declare const default_alias_106: ThemeData;

export declare const default_alias_107: ThemeData;

export declare const default_alias_108: ThemeData;

export declare const default_alias_109: ThemeData;

export declare const default_alias_11: ThemeData;

export declare const default_alias_110: ThemeData;

export declare const default_alias_111: ThemeData;

export declare const default_alias_112: ThemeData;

export declare const default_alias_113: ThemeData;

export declare const default_alias_114: ThemeData;

export declare const default_alias_115: ThemeData;

export declare const default_alias_116: ThemeData;

export declare const default_alias_117: ThemeData;

export declare const default_alias_118: ThemeData;

export declare const default_alias_119: ThemeData;

export declare const default_alias_12: ThemeData;

export declare const default_alias_120: ThemeData;

export declare const default_alias_121: ThemeData;

export declare const default_alias_122: ThemeData;

export declare const default_alias_123: ThemeData;

export declare const default_alias_124: ThemeData;

export declare const default_alias_125: ThemeData;

export declare const default_alias_126: ThemeData;

export declare const default_alias_127: ThemeData;

export declare const default_alias_128: ThemeData;

export declare const default_alias_129: ThemeData;

export declare const default_alias_13: ThemeData;

export declare const default_alias_130: ThemeData;

export declare const default_alias_131: ThemeData;

export declare const default_alias_132: ThemeData;

export declare const default_alias_133: ThemeData;

export declare const default_alias_134: ThemeData;

export declare const default_alias_135: ThemeData;

export declare const default_alias_136: ThemeData;

export declare const default_alias_137: ThemeData;

export declare const default_alias_138: ThemeData;

export declare const default_alias_139: ThemeData;

export declare const default_alias_14: ThemeData;

export declare const default_alias_140: ThemeData;

export declare const default_alias_141: ThemeData;

export declare const default_alias_142: ThemeData;

export declare const default_alias_143: ThemeData;

export declare const default_alias_144: ThemeData;

export declare const default_alias_145: ThemeData;

export declare const default_alias_146: ThemeData;

export declare const default_alias_147: ThemeData;

export declare const default_alias_148: ThemeData;

export declare const default_alias_149: ThemeData;

export declare const default_alias_15: ThemeData;

export declare const default_alias_150: ThemeData;

export declare const default_alias_151: ThemeData;

export declare const default_alias_152: ThemeData;

export declare const default_alias_153: ThemeData;

export declare const default_alias_154: ThemeData;

export declare const default_alias_155: ThemeData;

export declare const default_alias_156: ThemeData;

export declare const default_alias_157: ThemeData;

export declare const default_alias_158: ThemeData;

export declare const default_alias_159: ThemeData;

export declare const default_alias_16: ThemeData;

export declare const default_alias_160: ThemeData;

export declare const default_alias_161: ThemeData;

export declare const default_alias_162: ThemeData;

export declare const default_alias_163: ThemeData;

export declare const default_alias_164: ThemeData;

export declare const default_alias_165: ThemeData;

export declare const default_alias_166: ThemeData;

export declare const default_alias_167: ThemeData;

export declare const default_alias_168: ThemeData;

export declare const default_alias_169: ThemeData;

export declare const default_alias_17: ThemeData;

export declare const default_alias_170: ThemeData;

export declare const default_alias_171: ThemeData;

export declare const default_alias_172: ThemeData;

export declare const default_alias_173: ThemeData;

export declare const default_alias_174: ThemeData;

export declare const default_alias_175: ThemeData;

export declare const default_alias_176: ThemeData;

export declare const default_alias_177: ThemeData;

export declare const default_alias_178: ThemeData;

export declare const default_alias_179: ThemeData;

export declare const default_alias_18: ThemeData;

export declare const default_alias_180: ThemeData;

export declare const default_alias_181: ThemeData;

export declare const default_alias_182: ThemeData;

export declare const default_alias_183: ThemeData;

export declare const default_alias_184: ThemeData;

export declare const default_alias_185: ThemeData;

export declare const default_alias_186: ThemeData;

export declare const default_alias_187: ThemeData;

export declare const default_alias_188: ThemeData;

export declare const default_alias_189: ThemeData;

export declare const default_alias_19: ThemeData;

export declare const default_alias_190: ThemeData;

export declare const default_alias_191: ThemeData;

export declare const default_alias_192: ThemeData;

export declare const default_alias_193: ThemeData;

export declare const default_alias_194: ThemeData;

export declare const default_alias_195: ThemeData;

export declare const default_alias_196: ThemeData;

export declare const default_alias_197: ThemeData;

export declare const default_alias_198: ThemeData;

export declare const default_alias_199: ThemeData;

export declare const default_alias_2: ThemeData;

export declare const default_alias_20: ThemeData;

export declare const default_alias_200: ThemeData;

export declare const default_alias_201: ThemeData;

export declare const default_alias_202: ThemeData;

export declare const default_alias_203: ThemeData;

export declare const default_alias_204: ThemeData;

export declare const default_alias_205: ThemeData;

export declare const default_alias_206: ThemeData;

export declare const default_alias_207: ThemeData;

export declare const default_alias_208: ThemeData;

export declare const default_alias_209: ThemeData;

export declare const default_alias_21: ThemeData;

export declare const default_alias_210: ThemeData;

export declare const default_alias_211: ThemeData;

export declare const default_alias_212: ThemeData;

export declare const default_alias_213: ThemeData;

export declare const default_alias_214: ThemeData;

export declare const default_alias_215: ThemeData;

export declare const default_alias_216: ThemeData;

export declare const default_alias_217: ThemeData;

export declare const default_alias_218: ThemeData;

export declare const default_alias_219: ThemeData;

export declare const default_alias_22: ThemeData;

export declare const default_alias_220: ThemeData;

export declare const default_alias_221: ThemeData;

export declare const default_alias_222: ThemeData;

export declare const default_alias_223: ThemeData;

export declare const default_alias_224: ThemeData;

export declare const default_alias_225: ThemeData;

export declare const default_alias_226: ThemeData;

export declare const default_alias_227: ThemeData;

export declare const default_alias_228: ThemeData;

export declare const default_alias_229: ThemeData;

export declare const default_alias_23: ThemeData;

export declare const default_alias_230: ThemeData;

export declare const default_alias_231: ThemeData;

export declare const default_alias_232: ThemeData;

export declare const default_alias_233: ThemeData;

export declare const default_alias_234: ThemeData;

export declare const default_alias_235: ThemeData;

export declare const default_alias_236: ThemeData;

export declare const default_alias_237: ThemeData;

export declare const default_alias_238: ThemeData;

export declare const default_alias_239: ThemeData;

export declare const default_alias_24: ThemeData;

export declare const default_alias_240: ThemeData;

export declare const default_alias_241: ThemeData;

export declare const default_alias_242: ThemeData;

export declare const default_alias_243: ThemeData;

export declare const default_alias_244: ThemeData;

export declare const default_alias_245: ThemeData;

export declare const default_alias_25: ThemeData;

export declare const default_alias_26: ThemeData;

export declare const default_alias_27: ThemeData;

export declare const default_alias_28: ThemeData;

export declare const default_alias_29: ThemeData;

export declare const default_alias_3: ThemeData;

export declare const default_alias_30: ThemeData;

export declare const default_alias_31: ThemeData;

export declare const default_alias_32: ThemeData;

export declare const default_alias_33: ThemeData;

export declare const default_alias_34: ThemeData;

export declare const default_alias_35: ThemeData;

export declare const default_alias_36: ThemeData;

export declare const default_alias_37: ThemeData;

export declare const default_alias_38: ThemeData;

export declare const default_alias_39: ThemeData;

export declare const default_alias_4: ThemeData;

export declare const default_alias_40: ThemeData;

export declare const default_alias_41: ThemeData;

export declare const default_alias_42: ThemeData;

export declare const default_alias_43: ThemeData;

export declare const default_alias_44: ThemeData;

export declare const default_alias_45: ThemeData;

export declare const default_alias_46: ThemeData;

export declare const default_alias_47: ThemeData;

export declare const default_alias_48: ThemeData;

export declare const default_alias_49: ThemeData;

export declare const default_alias_5: ThemeData;

export declare const default_alias_50: ThemeData;

export declare const default_alias_51: ThemeData;

export declare const default_alias_52: ThemeData;

export declare const default_alias_53: ThemeData;

export declare const default_alias_54: ThemeData;

export declare const default_alias_55: ThemeData;

export declare const default_alias_56: ThemeData;

export declare const default_alias_57: ThemeData;

export declare const default_alias_58: ThemeData;

export declare const default_alias_59: ThemeData;

export declare const default_alias_6: ThemeData;

export declare const default_alias_60: ThemeData;

export declare const default_alias_61: ThemeData;

export declare const default_alias_62: ThemeData;

export declare const default_alias_63: ThemeData;

export declare const default_alias_64: ThemeData;

export declare const default_alias_65: ThemeData;

export declare const default_alias_66: ThemeData;

export declare const default_alias_67: ThemeData;

export declare const default_alias_68: ThemeData;

export declare const default_alias_69: ThemeData;

export declare const default_alias_7: ThemeData;

export declare const default_alias_70: ThemeData;

export declare const default_alias_71: ThemeData;

export declare const default_alias_72: ThemeData;

export declare const default_alias_73: ThemeData;

export declare const default_alias_74: ThemeData;

export declare const default_alias_75: ThemeData;

export declare const default_alias_76: ThemeData;

export declare const default_alias_77: ThemeData;

export declare const default_alias_78: ThemeData;

export declare const default_alias_79: ThemeData;

export declare const default_alias_8: ThemeData;

export declare const default_alias_80: ThemeData;

export declare const default_alias_81: ThemeData;

export declare const default_alias_82: ThemeData;

export declare const default_alias_83: ThemeData;

export declare const default_alias_84: ThemeData;

export declare const default_alias_85: ThemeData;

export declare const default_alias_86: ThemeData;

export declare const default_alias_87: ThemeData;

export declare const default_alias_88: ThemeData;

export declare const default_alias_89: ThemeData;

export declare const default_alias_9: ThemeData;

export declare const default_alias_90: ThemeData;

export declare const default_alias_91: ThemeData;

export declare const default_alias_92: ThemeData;

export declare const default_alias_93: ThemeData;

export declare const default_alias_94: ThemeData;

export declare const default_alias_95: ThemeData;

export declare const default_alias_96: ThemeData;

export declare const default_alias_97: ThemeData;

export declare const default_alias_98: ThemeData;

export declare const default_alias_99: ThemeData;

/** A style entry in a theme JSON file. */
declare interface StyleEntry {
    fg?: string;
    bg?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: "solid" | "wavy" | "double" | "dotted" | "dashed" | "undercurl";
    strikethrough?: boolean;
}
export { StyleEntry }
export { StyleEntry as StyleEntry_alias_1 }

/** Theme JSON shape matching themes/*.json */
declare interface ThemeData {
    name: string;
    appearance: "light" | "dark";
    revision?: string;
    highlights: Record<string, StyleEntry>;
}
export { ThemeData }
export { ThemeData as ThemeData_alias_1 }

export { }
