'use strict';

// src/highlights.ts
var HIGHLIGHT_NAMES = [
  "attribute",
  "attribute.builtin",
  "attribute.c_sharp",
  "attribute.diff",
  "attribute.typescript",
  "attribute.zig",
  "boolean",
  "boolean.yaml",
  "character",
  "character.special",
  "character.special.html",
  "character.special.vim",
  "charset",
  "clicke",
  "comment",
  "comment.documentation",
  "comment.error",
  "comment.hint",
  "comment.note",
  "comment.todo",
  "comment.warning",
  "comment.warning.gitcommit",
  "constant",
  "constant.builtin",
  "constant.builtin.c",
  "constant.builtin.go",
  "constant.builtin.php",
  "constant.builtin.python",
  "constant.builtin.ruby",
  "constant.builtin.rust",
  "constant.builtin.yaml",
  "constant.c",
  "constant.cpp",
  "constant.go",
  "constant.html",
  "constant.java",
  "constant.macro",
  "constant.macro.cpp",
  "constant.regex",
  "constructor",
  "constructor.lua",
  "constructor.python",
  "constructor.tsx",
  "diff.delta",
  "diff.minus",
  "diff.plus",
  "error",
  "function",
  "function.builtin",
  "function.builtin.bash",
  "function.builtin.c",
  "function.builtin.go",
  "function.builtin.lua",
  "function.builtin.make",
  "function.builtin.php",
  "function.call",
  "function.call.bash",
  "function.call.yaml",
  "function.macro",
  "function.macro.vim",
  "function.method",
  "function.method.call",
  "function.scss",
  "highlighted",
  "import",
  "injection.content",
  "injection.language",
  "keyframes",
  "keyword",
  "keyword.conditional",
  "keyword.conditional.ternary",
  "keyword.coroutine",
  "keyword.cpp",
  "keyword.debug",
  "keyword.directive",
  "keyword.directive.css",
  "keyword.directive.define",
  "keyword.directive.rust",
  "keyword.dockerfile",
  "keyword.exception",
  "keyword.export",
  "keyword.function",
  "keyword.function.go",
  "keyword.function.lua",
  "keyword.function.ruby",
  "keyword.gitcommit",
  "keyword.import",
  "keyword.import.bash",
  "keyword.import.c",
  "keyword.import.cpp",
  "keyword.import.go",
  "keyword.import.javascript",
  "keyword.import.rust",
  "keyword.import.typescript",
  "keyword.modifier",
  "keyword.operator",
  "keyword.operator.lua",
  "keyword.repeat",
  "keyword.return",
  "keyword.scss",
  "keyword.type",
  "label",
  "label.c",
  "label.diff",
  "label.json",
  "label.markdown",
  "label.ruby",
  "label.yaml",
  "markup",
  "markup.environment",
  "markup.environment.name",
  "markup.heading",
  "markup.heading.1",
  "markup.heading.1.html",
  "markup.heading.1.markdown",
  "markup.heading.2",
  "markup.heading.2.html",
  "markup.heading.2.markdown",
  "markup.heading.3",
  "markup.heading.3.html",
  "markup.heading.3.markdown",
  "markup.heading.4",
  "markup.heading.4.html",
  "markup.heading.4.markdown",
  "markup.heading.5",
  "markup.heading.5.html",
  "markup.heading.5.markdown",
  "markup.heading.6",
  "markup.heading.6.html",
  "markup.heading.6.markdown",
  "markup.heading.html",
  "markup.heading.markdown",
  "markup.italic",
  "markup.italic.markdown_inline",
  "markup.link",
  "markup.link.gitcommit",
  "markup.link.label",
  "markup.link.label.html",
  "markup.link.label.markdown_inline",
  "markup.link.markdown_inline",
  "markup.link.url",
  "markup.link.url.astro",
  "markup.link.url.gitcommit",
  "markup.link.url.html",
  "markup.link.url.markdown_inline",
  "markup.link.url.svelte",
  "markup.link.url.vue",
  "markup.list",
  "markup.list.bash",
  "markup.list.checked",
  "markup.list.latex",
  "markup.list.markdown",
  "markup.list.unchecked",
  "markup.math",
  "markup.math.latex",
  "markup.quote",
  "markup.quote.markdown",
  "markup.raw",
  "markup.raw.block",
  "markup.raw.block.markdown",
  "markup.raw.markdown",
  "markup.raw.markdown_inline",
  "markup.strikethrough",
  "markup.strong",
  "markup.strong.markdown_inline",
  "markup.underline",
  "media",
  "module",
  "module.builtin",
  "module.c_sharp",
  "module.elixir",
  "module.go",
  "module.latex",
  "module.php",
  "namespace",
  "namespace.cpp",
  "namespace.go",
  "namespace.latex",
  "namespace.lua",
  "namespace.php",
  "normal",
  "number",
  "number.float",
  "operator",
  "operator.bash",
  "operator.html",
  "operator.lua",
  "operator.rust",
  "operator.toml",
  "operator.vue",
  "property",
  "property.css",
  "property.json",
  "property.lua",
  "property.scss",
  "property.toml",
  "property.yaml",
  "punctuation.bracket",
  "punctuation.bracket.lua",
  "punctuation.bracket.python",
  "punctuation.bracket.rainbow.1",
  "punctuation.bracket.rainbow.2",
  "punctuation.bracket.rainbow.3",
  "punctuation.bracket.rainbow.4",
  "punctuation.bracket.rainbow.5",
  "punctuation.bracket.rainbow.6",
  "punctuation.bracket.regex",
  "punctuation.bracket.ruby",
  "punctuation.bracket.rust",
  "punctuation.bracket.scss",
  "punctuation.bracket.tsx",
  "punctuation.bracket.typescript",
  "punctuation.bracket.yaml",
  "punctuation.delimiter",
  "punctuation.delimiter.astro",
  "punctuation.delimiter.bash",
  "punctuation.delimiter.css",
  "punctuation.delimiter.markdown_inline",
  "punctuation.delimiter.regex",
  "punctuation.delimiter.rust",
  "punctuation.delimiter.scss",
  "punctuation.delimiter.yaml",
  "punctuation.special",
  "punctuation.special.diff",
  "punctuation.special.latex",
  "punctuation.special.markdown",
  "punctuation.special.typescript",
  "punctuation.special.yaml",
  "string",
  "string.documentation",
  "string.escape",
  "string.escape.json",
  "string.escape.yaml",
  "string.json",
  "string.latex",
  "string.regex",
  "string.regexp",
  "string.scss",
  "string.special",
  "string.special.path",
  "string.special.path.diff",
  "string.special.path.gitignore",
  "string.special.path.nix",
  "string.special.symbol",
  "string.special.symbol.make",
  "string.special.uri",
  "string.special.url",
  "string.special.url.html",
  "string.toml",
  "string.yaml",
  "supports",
  "tag",
  "tag.attribute",
  "tag.attribute.html",
  "tag.attribute.tsx",
  "tag.attribute.vue",
  "tag.builtin",
  "tag.delimiter",
  "tag.delimiter.javascript",
  "tag.delimiter.tsx",
  "tag.javascript",
  "tag.jsx",
  "tag.tsx",
  "tag.typescript",
  "type",
  "type.builtin",
  "type.builtin.c",
  "type.builtin.go",
  "type.builtin.java",
  "type.builtin.python",
  "type.builtin.tsx",
  "type.builtin.typescript",
  "type.cpp",
  "type.css",
  "type.definition",
  "type.scss",
  "type.sql",
  "variable",
  "variable.builtin",
  "variable.builtin.javascript",
  "variable.builtin.lua",
  "variable.builtin.python",
  "variable.builtin.vim",
  "variable.member",
  "variable.member.python",
  "variable.member.ruby",
  "variable.member.yaml",
  "variable.parameter",
  "variable.parameter.bash",
  "variable.parameter.builtin",
  "variable.scss",
  "variable.sql",
  "variable.vim"
];

// src/generated/themes-meta.ts
var THEMES = [
  {
    "name": "adwaita_dark",
    "appearance": "dark"
  },
  {
    "name": "adwaita_light",
    "appearance": "light"
  },
  {
    "name": "arctic",
    "appearance": "dark"
  },
  {
    "name": "astrodark",
    "appearance": "dark"
  },
  {
    "name": "astrojupiter",
    "appearance": "light"
  },
  {
    "name": "astrolight",
    "appearance": "light"
  },
  {
    "name": "astromars",
    "appearance": "dark"
  },
  {
    "name": "aura_dark",
    "appearance": "dark"
  },
  {
    "name": "aura_dark_soft_text",
    "appearance": "dark"
  },
  {
    "name": "aura_soft_dark",
    "appearance": "dark"
  },
  {
    "name": "aura_soft_dark_soft_text",
    "appearance": "dark"
  },
  {
    "name": "aurora",
    "appearance": "dark"
  },
  {
    "name": "ayu_dark",
    "appearance": "dark"
  },
  {
    "name": "ayu_light",
    "appearance": "light"
  },
  {
    "name": "ayu_mirage",
    "appearance": "dark"
  },
  {
    "name": "bamboo_light",
    "appearance": "light"
  },
  {
    "name": "bamboo_multiplex",
    "appearance": "dark"
  },
  {
    "name": "bamboo_vulgaris",
    "appearance": "dark"
  },
  {
    "name": "bluloco_dark",
    "appearance": "dark"
  },
  {
    "name": "bluloco_light",
    "appearance": "light"
  },
  {
    "name": "carbonfox",
    "appearance": "dark"
  },
  {
    "name": "catppuccin_frappe",
    "appearance": "dark"
  },
  {
    "name": "catppuccin_latte",
    "appearance": "light"
  },
  {
    "name": "catppuccin_macchiato",
    "appearance": "dark"
  },
  {
    "name": "catppuccin_mocha",
    "appearance": "dark"
  },
  {
    "name": "citruszest",
    "appearance": "dark"
  },
  {
    "name": "cobalt2",
    "appearance": "dark"
  },
  {
    "name": "cyberdream_dark",
    "appearance": "dark"
  },
  {
    "name": "cyberdream_light",
    "appearance": "light"
  },
  {
    "name": "darkplus",
    "appearance": "dark"
  },
  {
    "name": "darkvoid",
    "appearance": "dark"
  },
  {
    "name": "dawnfox",
    "appearance": "light"
  },
  {
    "name": "dayfox",
    "appearance": "light"
  },
  {
    "name": "deepwhite",
    "appearance": "light"
  },
  {
    "name": "doom_one_dark",
    "appearance": "dark"
  },
  {
    "name": "doom_one_light",
    "appearance": "light"
  },
  {
    "name": "dracula",
    "appearance": "dark"
  },
  {
    "name": "dracula_soft",
    "appearance": "dark"
  },
  {
    "name": "duckbones",
    "appearance": "dark"
  },
  {
    "name": "duskfox",
    "appearance": "dark"
  },
  {
    "name": "edge_aura",
    "appearance": "dark"
  },
  {
    "name": "edge_dark",
    "appearance": "dark"
  },
  {
    "name": "edge_light",
    "appearance": "light"
  },
  {
    "name": "edge_neon",
    "appearance": "dark"
  },
  {
    "name": "eldritch",
    "appearance": "dark"
  },
  {
    "name": "embark",
    "appearance": "dark"
  },
  {
    "name": "everblush",
    "appearance": "dark"
  },
  {
    "name": "everforest_dark",
    "appearance": "dark"
  },
  {
    "name": "everforest_light",
    "appearance": "light"
  },
  {
    "name": "flexoki_dark",
    "appearance": "dark"
  },
  {
    "name": "flexoki_light",
    "appearance": "light"
  },
  {
    "name": "flow_dark",
    "appearance": "dark"
  },
  {
    "name": "flow_light",
    "appearance": "light"
  },
  {
    "name": "fluoromachine_delta",
    "appearance": "dark"
  },
  {
    "name": "fluoromachine_fluoromachine",
    "appearance": "dark"
  },
  {
    "name": "fluoromachine_retrowave",
    "appearance": "dark"
  },
  {
    "name": "forestbones_dark",
    "appearance": "dark"
  },
  {
    "name": "forestbones_light",
    "appearance": "light"
  },
  {
    "name": "github_dark",
    "appearance": "dark"
  },
  {
    "name": "github_dark_colorblind",
    "appearance": "dark"
  },
  {
    "name": "github_dark_dimmed",
    "appearance": "dark"
  },
  {
    "name": "github_dark_high_contrast",
    "appearance": "dark"
  },
  {
    "name": "github_dark_tritanopia",
    "appearance": "dark"
  },
  {
    "name": "github_light",
    "appearance": "light"
  },
  {
    "name": "github_light_colorblind",
    "appearance": "light"
  },
  {
    "name": "github_light_high_contrast",
    "appearance": "light"
  },
  {
    "name": "github_light_tritanopia",
    "appearance": "light"
  },
  {
    "name": "gruber_darker",
    "appearance": "dark"
  },
  {
    "name": "gruvbox_baby",
    "appearance": "dark"
  },
  {
    "name": "gruvbox_dark",
    "appearance": "dark"
  },
  {
    "name": "gruvbox_dark_hard",
    "appearance": "dark"
  },
  {
    "name": "gruvbox_dark_soft",
    "appearance": "dark"
  },
  {
    "name": "gruvbox_light",
    "appearance": "light"
  },
  {
    "name": "gruvbox_light_hard",
    "appearance": "light"
  },
  {
    "name": "gruvbox_light_soft",
    "appearance": "light"
  },
  {
    "name": "gruvbox_material_dark",
    "appearance": "dark"
  },
  {
    "name": "gruvbox_material_light",
    "appearance": "light"
  },
  {
    "name": "horizon_dark",
    "appearance": "dark"
  },
  {
    "name": "horizon_light",
    "appearance": "light"
  },
  {
    "name": "hybrid",
    "appearance": "dark"
  },
  {
    "name": "iceberg",
    "appearance": "dark"
  },
  {
    "name": "jellybeans",
    "appearance": "dark"
  },
  {
    "name": "kanagawa_dragon",
    "appearance": "dark"
  },
  {
    "name": "kanagawa_lotus",
    "appearance": "light"
  },
  {
    "name": "kanagawa_paper_dark",
    "appearance": "dark"
  },
  {
    "name": "kanagawa_paper_light",
    "appearance": "light"
  },
  {
    "name": "kanagawa_wave",
    "appearance": "dark"
  },
  {
    "name": "kanagawabones",
    "appearance": "dark"
  },
  {
    "name": "lackluster",
    "appearance": "dark"
  },
  {
    "name": "lackluster_hack",
    "appearance": "dark"
  },
  {
    "name": "lackluster_mint",
    "appearance": "dark"
  },
  {
    "name": "material_darker",
    "appearance": "dark"
  },
  {
    "name": "material_deep_ocean",
    "appearance": "dark"
  },
  {
    "name": "material_lighter",
    "appearance": "light"
  },
  {
    "name": "material_oceanic",
    "appearance": "dark"
  },
  {
    "name": "material_palenight",
    "appearance": "dark"
  },
  {
    "name": "matte_black",
    "appearance": "dark"
  },
  {
    "name": "melange_dark",
    "appearance": "dark"
  },
  {
    "name": "melange_light",
    "appearance": "light"
  },
  {
    "name": "mellifluous_alduin",
    "appearance": "dark"
  },
  {
    "name": "mellifluous_dark",
    "appearance": "dark"
  },
  {
    "name": "mellifluous_kanagawa_dragon",
    "appearance": "dark"
  },
  {
    "name": "mellifluous_light",
    "appearance": "light"
  },
  {
    "name": "mellifluous_mountain",
    "appearance": "dark"
  },
  {
    "name": "mellifluous_tender",
    "appearance": "dark"
  },
  {
    "name": "mellow",
    "appearance": "dark"
  },
  {
    "name": "mfd_amber",
    "appearance": "dark"
  },
  {
    "name": "mfd_blackout",
    "appearance": "dark"
  },
  {
    "name": "mfd_dark",
    "appearance": "dark"
  },
  {
    "name": "mfd_default",
    "appearance": "light"
  },
  {
    "name": "mfd_flir",
    "appearance": "dark"
  },
  {
    "name": "mfd_flir_bh",
    "appearance": "light"
  },
  {
    "name": "mfd_flir_fusion",
    "appearance": "dark"
  },
  {
    "name": "mfd_flir_rh",
    "appearance": "dark"
  },
  {
    "name": "mfd_gbl_dark",
    "appearance": "dark"
  },
  {
    "name": "mfd_gbl_light",
    "appearance": "light"
  },
  {
    "name": "mfd_hud",
    "appearance": "dark"
  },
  {
    "name": "mfd_lumon",
    "appearance": "dark"
  },
  {
    "name": "mfd_mono",
    "appearance": "dark"
  },
  {
    "name": "mfd_nvg",
    "appearance": "dark"
  },
  {
    "name": "mfd_paper",
    "appearance": "light"
  },
  {
    "name": "mfd_scarlet",
    "appearance": "dark"
  },
  {
    "name": "mfd_stealth",
    "appearance": "dark"
  },
  {
    "name": "miasma",
    "appearance": "dark"
  },
  {
    "name": "midnight",
    "appearance": "dark"
  },
  {
    "name": "modus_operandi",
    "appearance": "light"
  },
  {
    "name": "modus_vivendi",
    "appearance": "dark"
  },
  {
    "name": "molokai",
    "appearance": "dark"
  },
  {
    "name": "monokai",
    "appearance": "dark"
  },
  {
    "name": "monokai_nightasty_dark",
    "appearance": "dark"
  },
  {
    "name": "monokai_nightasty_light",
    "appearance": "light"
  },
  {
    "name": "monokai_pro",
    "appearance": "dark"
  },
  {
    "name": "monokai_pro_dark",
    "appearance": "dark"
  },
  {
    "name": "monokai_pro_machine",
    "appearance": "dark"
  },
  {
    "name": "monokai_pro_ristretto",
    "appearance": "dark"
  },
  {
    "name": "monokai_pro_spectrum",
    "appearance": "dark"
  },
  {
    "name": "monokai_soda",
    "appearance": "dark"
  },
  {
    "name": "moonfly",
    "appearance": "dark"
  },
  {
    "name": "moonlight",
    "appearance": "dark"
  },
  {
    "name": "neobones_dark",
    "appearance": "dark"
  },
  {
    "name": "neobones_light",
    "appearance": "light"
  },
  {
    "name": "neofusion",
    "appearance": "dark"
  },
  {
    "name": "neomodern_gyokuro_dark",
    "appearance": "dark"
  },
  {
    "name": "neomodern_gyokuro_light",
    "appearance": "light"
  },
  {
    "name": "neomodern_hojicha_dark",
    "appearance": "dark"
  },
  {
    "name": "neomodern_hojicha_light",
    "appearance": "light"
  },
  {
    "name": "neomodern_iceclimber_dark",
    "appearance": "dark"
  },
  {
    "name": "neomodern_iceclimber_light",
    "appearance": "light"
  },
  {
    "name": "neomodern_moon_dark",
    "appearance": "dark"
  },
  {
    "name": "neomodern_moon_light",
    "appearance": "light"
  },
  {
    "name": "neomodern_roseprime_dark",
    "appearance": "dark"
  },
  {
    "name": "neomodern_roseprime_light",
    "appearance": "light"
  },
  {
    "name": "neon_dark",
    "appearance": "dark"
  },
  {
    "name": "neon_default",
    "appearance": "dark"
  },
  {
    "name": "neon_doom",
    "appearance": "dark"
  },
  {
    "name": "neon_light",
    "appearance": "light"
  },
  {
    "name": "neosolarized",
    "appearance": "dark"
  },
  {
    "name": "neosolarized2_dark",
    "appearance": "dark"
  },
  {
    "name": "neosolarized2_light",
    "appearance": "light"
  },
  {
    "name": "neovim_dark",
    "appearance": "dark"
  },
  {
    "name": "neovim_light",
    "appearance": "light"
  },
  {
    "name": "night_owl",
    "appearance": "dark"
  },
  {
    "name": "nightfly",
    "appearance": "dark"
  },
  {
    "name": "nightfox",
    "appearance": "dark"
  },
  {
    "name": "no_clown_fiesta",
    "appearance": "dark"
  },
  {
    "name": "nord",
    "appearance": "dark"
  },
  {
    "name": "nordbones",
    "appearance": "dark"
  },
  {
    "name": "nordfox",
    "appearance": "dark"
  },
  {
    "name": "nordic",
    "appearance": "dark"
  },
  {
    "name": "obscure",
    "appearance": "dark"
  },
  {
    "name": "oceanic_next",
    "appearance": "dark"
  },
  {
    "name": "ofirkai",
    "appearance": "dark"
  },
  {
    "name": "oldworld",
    "appearance": "dark"
  },
  {
    "name": "oldworld_cooler",
    "appearance": "dark"
  },
  {
    "name": "oldworld_oled",
    "appearance": "dark"
  },
  {
    "name": "one_monokai",
    "appearance": "dark"
  },
  {
    "name": "onedark",
    "appearance": "dark"
  },
  {
    "name": "onedark_cool",
    "appearance": "dark"
  },
  {
    "name": "onedark_darker",
    "appearance": "dark"
  },
  {
    "name": "onedark_deep",
    "appearance": "dark"
  },
  {
    "name": "onedark_light",
    "appearance": "light"
  },
  {
    "name": "onedark_warm",
    "appearance": "dark"
  },
  {
    "name": "onedark_warmer",
    "appearance": "dark"
  },
  {
    "name": "onedarkpro_dark",
    "appearance": "dark"
  },
  {
    "name": "onedarkpro_vivid",
    "appearance": "dark"
  },
  {
    "name": "onelight",
    "appearance": "light"
  },
  {
    "name": "onenord_dark",
    "appearance": "dark"
  },
  {
    "name": "onenord_light",
    "appearance": "light"
  },
  {
    "name": "oxocarbon_dark",
    "appearance": "dark"
  },
  {
    "name": "oxocarbon_light",
    "appearance": "light"
  },
  {
    "name": "palenightfall",
    "appearance": "dark"
  },
  {
    "name": "papercolor_dark",
    "appearance": "dark"
  },
  {
    "name": "papercolor_light",
    "appearance": "light"
  },
  {
    "name": "poimandres",
    "appearance": "dark"
  },
  {
    "name": "rosebones_dark",
    "appearance": "dark"
  },
  {
    "name": "rosebones_light",
    "appearance": "light"
  },
  {
    "name": "rosepine_dark",
    "appearance": "dark"
  },
  {
    "name": "rosepine_dawn",
    "appearance": "light"
  },
  {
    "name": "rosepine_moon",
    "appearance": "dark"
  },
  {
    "name": "seoulbones_dark",
    "appearance": "dark"
  },
  {
    "name": "seoulbones_light",
    "appearance": "light"
  },
  {
    "name": "solarized_autumn_dark",
    "appearance": "dark"
  },
  {
    "name": "solarized_autumn_light",
    "appearance": "light"
  },
  {
    "name": "solarized_osaka_dark",
    "appearance": "dark"
  },
  {
    "name": "solarized_osaka_light",
    "appearance": "light"
  },
  {
    "name": "solarized_spring_dark",
    "appearance": "dark"
  },
  {
    "name": "solarized_spring_light",
    "appearance": "light"
  },
  {
    "name": "solarized_summer_dark",
    "appearance": "dark"
  },
  {
    "name": "solarized_summer_light",
    "appearance": "light"
  },
  {
    "name": "solarized_winter_dark",
    "appearance": "dark"
  },
  {
    "name": "solarized_winter_light",
    "appearance": "light"
  },
  {
    "name": "sonokai_andromeda",
    "appearance": "dark"
  },
  {
    "name": "sonokai_atlantis",
    "appearance": "dark"
  },
  {
    "name": "sonokai_default",
    "appearance": "dark"
  },
  {
    "name": "sonokai_espresso",
    "appearance": "dark"
  },
  {
    "name": "sonokai_maia",
    "appearance": "dark"
  },
  {
    "name": "sonokai_shusia",
    "appearance": "dark"
  },
  {
    "name": "srcery",
    "appearance": "dark"
  },
  {
    "name": "synthweave",
    "appearance": "dark"
  },
  {
    "name": "synthweave_aqua",
    "appearance": "dark"
  },
  {
    "name": "terafox",
    "appearance": "dark"
  },
  {
    "name": "tokyobones_dark",
    "appearance": "dark"
  },
  {
    "name": "tokyobones_light",
    "appearance": "light"
  },
  {
    "name": "tokyodark",
    "appearance": "dark"
  },
  {
    "name": "tokyonight_day",
    "appearance": "light"
  },
  {
    "name": "tokyonight_moon",
    "appearance": "dark"
  },
  {
    "name": "tokyonight_night",
    "appearance": "dark"
  },
  {
    "name": "tokyonight_storm",
    "appearance": "dark"
  },
  {
    "name": "vague",
    "appearance": "dark"
  },
  {
    "name": "vesper",
    "appearance": "dark"
  },
  {
    "name": "vimbones",
    "appearance": "light"
  },
  {
    "name": "vscode_dark",
    "appearance": "dark"
  },
  {
    "name": "vscode_light",
    "appearance": "light"
  },
  {
    "name": "xcode_dark",
    "appearance": "dark"
  },
  {
    "name": "xcode_dark_hc",
    "appearance": "dark"
  },
  {
    "name": "xcode_light",
    "appearance": "light"
  },
  {
    "name": "xcode_light_hc",
    "appearance": "light"
  },
  {
    "name": "xcode_wwdc",
    "appearance": "dark"
  },
  {
    "name": "yorumi",
    "appearance": "dark"
  },
  {
    "name": "zenbones_dark",
    "appearance": "dark"
  },
  {
    "name": "zenbones_light",
    "appearance": "light"
  },
  {
    "name": "zenburn",
    "appearance": "dark"
  },
  {
    "name": "zenburned",
    "appearance": "dark"
  },
  {
    "name": "zenwritten_dark",
    "appearance": "dark"
  },
  {
    "name": "zenwritten_light",
    "appearance": "light"
  },
  {
    "name": "zephyr_dark",
    "appearance": "dark"
  }
];

// src/themes.ts
function availableThemes() {
  return THEMES;
}
function sanitizeThemeName(name) {
  return name.replace(/[^0-9A-Za-z_-]/g, "-");
}

// src/formatter/html.ts
var _encoder = new TextEncoder();
var _decoder = new TextDecoder();
function encodeSource(source) {
  return _encoder.encode(source);
}
function decodeSourceSlice(sourceBytes, startByte, endByte) {
  return _decoder.decode(sourceBytes.subarray(startByte, endByte));
}
function languageId(language) {
  return typeof language === "string" ? language : language.id;
}
function emptySpan(scope, language) {
  return {
    startByte: 0,
    endByte: 0,
    scope,
    language
  };
}
function getSpanStyle(theme, scope, language) {
  if (scope.length === 0) {
    return void 0;
  }
  return getScopedThemeStyle(theme, scope, language);
}
function getUnderlineDecoration(style) {
  if (style.underline == null || style.underline === false) {
    return void 0;
  }
  if (style.underline === true || style.underline === "solid") {
    return "underline";
  }
  if (style.underline === "undercurl") {
    return "underline wavy";
  }
  return `underline ${style.underline}`;
}
function getThemeStyle(theme, scope) {
  if (!theme) return RAINBOW_BRACKET_FALLBACKS[scope];
  let current = scope;
  while (current.length > 0) {
    const style = theme.highlights[current];
    if (style) return style;
    const fallback = RAINBOW_BRACKET_FALLBACKS[current];
    if (fallback) return fallback;
    const idx = current.lastIndexOf(".");
    if (idx === -1) {
      break;
    }
    current = current.slice(0, idx);
  }
  return void 0;
}
var RAINBOW_BRACKET_FALLBACKS = {
  "punctuation.bracket.rainbow.1": { fg: "#e06c75" },
  "punctuation.bracket.rainbow.2": { fg: "#e5c07b" },
  "punctuation.bracket.rainbow.3": { fg: "#61afef" },
  "punctuation.bracket.rainbow.4": { fg: "#d19a66" },
  "punctuation.bracket.rainbow.5": { fg: "#98c379" },
  "punctuation.bracket.rainbow.6": { fg: "#c678dd" }
};
function getScopedThemeStyle(theme, scope, language) {
  return getThemeStyle(theme, `${scope}.${languageId(language)}`) ?? getThemeStyle(theme, scope);
}
function textDecoration(style) {
  const underline = getUnderlineDecoration(style);
  if (underline && style.strikethrough) {
    return `${underline} line-through`;
  }
  if (underline) return underline;
  if (style.strikethrough) return "line-through";
  return "none";
}
function styleToCss(style, options = {}) {
  if (!style) return "";
  const separator = options.separator ?? " ";
  const compact = options.compact ?? false;
  const declaration = (property, value) => compact ? `${property}:${value};` : `${property}: ${value};`;
  const rules = [];
  if (style.fg) rules.push(declaration("color", style.fg));
  if (style.bg) rules.push(declaration("background-color", style.bg));
  if (style.bold) rules.push(declaration("font-weight", "bold"));
  if (options.italic && style.italic) rules.push(declaration("font-style", "italic"));
  const decoration = textDecoration(style);
  if (decoration !== "none") {
    rules.push(declaration("text-decoration", decoration));
  }
  return rules.join(separator);
}
function escape(text) {
  let result = "";
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    switch (ch) {
      case "&":
        result += "&amp;";
        break;
      case "<":
        result += "&lt;";
        break;
      case ">":
        result += "&gt;";
        break;
      case '"':
        result += "&quot;";
        break;
      case "'":
        result += "&#39;";
        break;
      default:
        result += ch;
    }
  }
  return result;
}
function escapeAttr(value) {
  let result = "";
  for (let i = 0; i < value.length; i += 1) {
    const ch = value[i];
    switch (ch) {
      case "&":
        result += "&amp;";
        break;
      case "<":
        result += "&lt;";
        break;
      case ">":
        result += "&gt;";
        break;
      case '"':
        result += "&quot;";
        break;
      case "'":
        result += "&#39;";
        break;
      default:
        result += ch;
    }
  }
  return result;
}
function joinClasses(...classes) {
  const value = classes.filter(
    (className) => !!className && className.length > 0
  );
  return value.length > 0 ? value.join(" ") : void 0;
}
function attrsToString(attrs) {
  const parts = [];
  for (const [name, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (value === true) {
      parts.push(name);
      continue;
    }
    parts.push(`${name}="${escapeAttr(String(value))}"`);
  }
  return parts.join(" ");
}
function openTag(name, attrs = {}) {
  const renderedAttrs = attrsToString(attrs);
  return renderedAttrs.length > 0 ? `<${name} ${renderedAttrs}>` : `<${name}>`;
}
function closeTag(name) {
  return `</${name}>`;
}
function openSpanTag(attrs = {}) {
  const renderedAttrs = attrsToString(attrs);
  return renderedAttrs.length > 0 ? `<span ${renderedAttrs}>` : `<span >`;
}
function openPreTag(options = {}) {
  const className = options.preClass ? `lumis ${options.preClass}` : "lumis";
  const style = styleToCss(getThemeStyle(options.theme, "normal"));
  return openTag("pre", {
    class: className,
    style: style.length > 0 ? style : void 0
  });
}
function openCodeTag(language) {
  const id = language ? languageId(language) : "plaintext";
  return openTag("code", {
    class: `language-${id}`,
    translate: "no",
    tabindex: 0
  });
}
function closePreTag() {
  return closeTag("pre");
}
function closeCodeTag() {
  return closeTag("code");
}
function closingTags() {
  return `${closeCodeTag()}${closePreTag()}`;
}
function wrapWithHeader(content, header) {
  if (!header) return content;
  return `${header.openTag}${content}${header.closeTag}`;
}
function escapeBraces(text) {
  return text.replaceAll("{", "&lbrace;").replaceAll("}", "&rbrace;");
}
function escapeFragment(text) {
  return escape(text);
}
function scopeToClass(scope) {
  return HIGHLIGHT_NAMES.includes(scope) ? `l-${scope.replaceAll(".", "-")}` : "l-text";
}
function spanInlineAttrs(options) {
  const attrs = {};
  if (options.includeHighlights) {
    attrs["data-highlight"] = options.scope;
  }
  const css = styleToCss(getScopedThemeStyle(options.theme, options.scope, options.language), {
    italic: options.italic
  });
  if (css) {
    attrs.style = css;
  }
  return attrs;
}
function spanInline(text, options) {
  const escaped = escape(text);
  const attrs = spanInlineAttrs(options);
  const rendered = attrsToString(attrs);
  return rendered.length > 0 ? `<span ${rendered}>${escaped}</span>` : escaped;
}
function spanLinkedAttrs(scope) {
  return `class="${scopeToClass(scope)}"`;
}
function spanLinked(text, scope) {
  const escaped = escape(text);
  const cls = scopeToClass(scope);
  return `<span class="${cls}">${escaped}</span>`;
}
function spanMultiThemesAttrs(options) {
  const { scope, language, themes, italic, includeHighlights } = options;
  const defaultTheme = options.defaultTheme;
  const cssVariablePrefix = options.cssVariablePrefix ?? "--lumis";
  if (Object.keys(themes).length === 0) {
    return {};
  }
  const attrs = {};
  if (includeHighlights) {
    attrs["data-highlight"] = scope;
  }
  const inlineStyles = [];
  const cssVars = [];
  if (defaultTheme === "light-dark()") {
    const lightStyle = getScopedThemeStyle(themes.light, scope, language);
    const darkStyle = getScopedThemeStyle(themes.dark, scope, language);
    if (lightStyle && darkStyle) {
      appendLightDarkStyles(inlineStyles, lightStyle, darkStyle, italic);
    }
  } else if (defaultTheme) {
    applyDefaultMultiTheme(inlineStyles, cssVars, options);
    appendThemeCssVars(cssVars, cssVariablePrefix, themes, scope, language, defaultTheme);
  } else {
    appendThemeCssVars(cssVars, cssVariablePrefix, themes, scope, language);
  }
  const styleParts = [...inlineStyles, ...cssVars].filter(Boolean);
  if (styleParts.length > 0) {
    attrs.style = styleParts.join(" ");
  }
  return attrs;
}
function appendDefaultThemeCssVars(cssVars, prefix, themeName, style) {
  const sanitized = sanitizeThemeName(themeName);
  cssVars.push(`${prefix}-${sanitized}-font-style:${style.italic ? "italic" : "normal"};`);
  cssVars.push(`${prefix}-${sanitized}-font-weight:${style.bold ? "bold" : "normal"};`);
  cssVars.push(`${prefix}-${sanitized}-text-decoration:${textDecoration(style)};`);
}
function appendLightDarkStyles(inlineStyles, lightStyle, darkStyle, italic) {
  if (lightStyle.fg && darkStyle.fg) {
    inlineStyles.push(`color: light-dark(${lightStyle.fg}, ${darkStyle.fg});`);
  }
  if (lightStyle.bg && darkStyle.bg) {
    inlineStyles.push(`background-color: light-dark(${lightStyle.bg}, ${darkStyle.bg});`);
  }
  inlineStyles.push(
    `font-weight: light-dark(${lightStyle.bold ? "bold" : "normal"}, ${darkStyle.bold ? "bold" : "normal"});`
  );
  if (italic) {
    inlineStyles.push(
      `font-style: light-dark(${lightStyle.italic ? "italic" : "normal"}, ${darkStyle.italic ? "italic" : "normal"});`
    );
  }
  const lightDecoration = textDecoration(lightStyle) ?? "none";
  const darkDecoration = textDecoration(darkStyle);
  inlineStyles.push(`text-decoration: light-dark(${lightDecoration}, ${darkDecoration});`);
}
function applyDefaultMultiTheme(inlineStyles, cssVars, options) {
  const { defaultTheme, themes, scope, language, italic, cssVariablePrefix = "--lumis" } = options;
  if (!defaultTheme || defaultTheme === "light-dark()") {
    return;
  }
  const defaultStyle = getScopedThemeStyle(themes[defaultTheme], scope, language);
  if (!defaultStyle) {
    return;
  }
  const css = styleToCss(defaultStyle, { italic, compact: true });
  if (css) {
    inlineStyles.push(css);
  }
  appendDefaultThemeCssVars(cssVars, cssVariablePrefix, defaultTheme, defaultStyle);
}
function spanMultiThemes(text, options) {
  const escaped = escape(text);
  if (Object.keys(options.themes).length === 0) {
    return escaped;
  }
  const attrs = spanMultiThemesAttrs(options);
  const rendered = attrsToString(attrs);
  return rendered.length > 0 ? `<span ${rendered}>${escaped}</span>` : escaped;
}
function pushThemeCssVars(cssVars, prefix, themeName, scope, language, theme) {
  const style = getScopedThemeStyle(theme, scope, language);
  if (!style) return;
  const sanitized = sanitizeThemeName(themeName);
  if (style.fg) cssVars.push(`${prefix}-${sanitized}:${style.fg};`);
  if (style.bg) cssVars.push(`${prefix}-${sanitized}-bg:${style.bg};`);
  cssVars.push(`${prefix}-${sanitized}-font-style:${style.italic ? "italic" : "normal"};`);
  cssVars.push(`${prefix}-${sanitized}-font-weight:${style.bold ? "bold" : "normal"};`);
  cssVars.push(`${prefix}-${sanitized}-text-decoration:${textDecoration(style)};`);
}
function appendThemeCssVars(cssVars, prefix, themes, scope, language, excludeTheme) {
  for (const [themeName, theme] of Object.entries(themes)) {
    if (themeName === excludeTheme) {
      continue;
    }
    pushThemeCssVars(cssVars, prefix, themeName, scope, language, theme);
  }
}
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
function renderHtmlBlock(options) {
  const code = openCodeTag(options.language);
  const body = options.lines.map((line, idx) => wrapLine(idx + 1, line, options.lineOptions(idx + 1))).join("");
  return wrapWithHeader(`${options.pre}${code}${body}${closingTags()}`, options.header);
}
function wrapLine(lineNumber, content, options = {}) {
  return `${openTag("div", {
    class: joinClasses("l-line", options.className),
    style: options.style,
    "data-line": lineNumber
  })}${content}
${closeTag("div")}`;
}
function lineIsHighlighted(lines, lineNumber) {
  if (!lines) return false;
  return lines.some(
    (line) => typeof line === "number" ? line === lineNumber : lineNumber >= line[0] && lineNumber <= line[1]
  );
}
function getHighlightLineClass(lines, lineNumber, className, defaultClass) {
  if (!lineIsHighlighted(lines, lineNumber)) {
    return void 0;
  }
  return className ?? defaultClass;
}
function appendFragment(lines, fragment) {
  if (!fragment.includes("\n")) {
    lines[lines.length - 1] += fragment;
    return;
  }
  const parts = fragment.split("\n");
  for (let i = 0; i < parts.length; i += 1) {
    lines[lines.length - 1] += parts[i] ?? "";
    if (i < parts.length - 1) {
      lines.push("");
    }
  }
}
function closeOpenSpans(lines, stack, closeSpan, theme) {
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    const entry = stack[i];
    const style = getSpanStyle(theme, entry.scope, entry.language);
    appendFragment(lines, closeSpan(emptySpan(entry.scope, entry.language), style));
  }
}
function reopenSpans(lines, stack, openSpan, theme) {
  for (const entry of stack) {
    const style = getSpanStyle(theme, entry.scope, entry.language);
    appendFragment(lines, openSpan(emptySpan(entry.scope, entry.language), style));
  }
}
function renderSourceEvent(lines, text, stack, formatText, openSpan, closeSpan, theme) {
  let remaining = text;
  while (true) {
    const newlineIndex = remaining.indexOf("\n");
    if (newlineIndex === -1) {
      appendFragment(lines, formatText(remaining));
      return;
    }
    appendFragment(lines, formatText(remaining.slice(0, newlineIndex)));
    closeOpenSpans(lines, stack, closeSpan, theme);
    lines.push("");
    reopenSpans(lines, stack, openSpan, theme);
    remaining = remaining.slice(newlineIndex + 1);
  }
}
function formatHighlightIterLines(source, events, languageRef, theme, options) {
  const formatText = options.formatText ?? escape;
  const closeSpan = options.closeSpan ?? (() => closeTag("span"));
  const sourceBytes = encodeSource(source);
  const lines = [""];
  let language = languageRef ? languageId(languageRef) : "plaintext";
  const stack = [];
  for (const event of events) {
    if (event.type === "start") {
      const style = getSpanStyle(theme, event.scope, event.language);
      const span = emptySpan(event.scope, event.language);
      appendFragment(lines, options.openSpan(span, style));
      stack.push({ scope: event.scope, language: event.language });
      continue;
    }
    if (event.type === "end") {
      const top = stack.pop();
      if (top) {
        const style = getSpanStyle(theme, top.scope, top.language);
        const span = emptySpan(top.scope, top.language);
        appendFragment(lines, closeSpan(span, style));
      }
      continue;
    }
    if (!language || language === "plaintext") {
      const top = stack[stack.length - 1];
      if (top) language = top.language;
    }
    const text = decodeSourceSlice(sourceBytes, event.startByte, event.endByte);
    renderSourceEvent(lines, text, stack, formatText, options.openSpan, closeSpan, theme);
  }
  while (stack.pop()) {
    appendFragment(lines, closeSpan(emptySpan("", ""), void 0));
  }
  return { lines, language };
}
function renderLinesFromEvents(source, events, spanAttrs) {
  return formatHighlightIterLines(source, events, void 0, void 0, {
    openSpan: (span) => {
      const attrs = spanAttrs(span.scope, span.language);
      return attrs.length > 0 ? `<span ${attrs}>` : "<span >";
    }
  }).lines;
}
function renderEvents(source, events, attributeCallback) {
  const sourceBytes = encodeSource(source);
  const html = [];
  const lineOffsets = [0];
  let renderedLength = 0;
  const push = (fragment) => {
    html.push(fragment);
    renderedLength += fragment.length;
  };
  for (const event of events) {
    if (event.type === "start") {
      push("<span ");
      attributeCallback(event.scope, event.language, html);
      renderedLength = html.join("").length;
      push(">");
      continue;
    }
    if (event.type === "end") {
      push("</span>");
      continue;
    }
    const text = decodeSourceSlice(sourceBytes, event.startByte, event.endByte);
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      if (char === "\n") {
        push("\n");
        lineOffsets.push(renderedLength);
        continue;
      }
      switch (char) {
        case "&":
          push("&amp;");
          break;
        case "<":
          push("&lt;");
          break;
        case ">":
          push("&gt;");
          break;
        case '"':
          push("&quot;");
          break;
        case "'":
          push("&#39;");
          break;
        default:
          push(char);
      }
    }
  }
  return [encodeSource(html.join("")), lineOffsets];
}
function linesFromOffsets(html, lineOffsets) {
  const rendered = _decoder.decode(html);
  const lines = [];
  for (let i = 0; i < lineOffsets.length; i += 1) {
    const start = lineOffsets[i] ?? 0;
    const end = lineOffsets[i + 1] ?? rendered.length;
    lines.push(rendered.slice(start, end));
  }
  return lines;
}

exports.HIGHLIGHT_NAMES = HIGHLIGHT_NAMES;
exports.appendFragment = appendFragment;
exports.appendThemeCssVars = appendThemeCssVars;
exports.attrsToString = attrsToString;
exports.availableThemes = availableThemes;
exports.buildNormalThemeVars = buildNormalThemeVars;
exports.buildPreThemeStyle = buildPreThemeStyle;
exports.closeCodeTag = closeCodeTag;
exports.closePreTag = closePreTag;
exports.closeTag = closeTag;
exports.closingTags = closingTags;
exports.decodeSourceSlice = decodeSourceSlice;
exports.encodeSource = encodeSource;
exports.escape = escape;
exports.escapeAttr = escapeAttr;
exports.escapeBraces = escapeBraces;
exports.escapeFragment = escapeFragment;
exports.formatHighlightIterLines = formatHighlightIterLines;
exports.getHighlightLineClass = getHighlightLineClass;
exports.getScopedThemeStyle = getScopedThemeStyle;
exports.getThemeStyle = getThemeStyle;
exports.joinClasses = joinClasses;
exports.lineIsHighlighted = lineIsHighlighted;
exports.linesFromOffsets = linesFromOffsets;
exports.openCodeTag = openCodeTag;
exports.openPreTag = openPreTag;
exports.openSpanTag = openSpanTag;
exports.openTag = openTag;
exports.renderEvents = renderEvents;
exports.renderHtmlBlock = renderHtmlBlock;
exports.renderLinesFromEvents = renderLinesFromEvents;
exports.sanitizeThemeName = sanitizeThemeName;
exports.scopeToClass = scopeToClass;
exports.spanInline = spanInline;
exports.spanInlineAttrs = spanInlineAttrs;
exports.spanLinked = spanLinked;
exports.spanLinkedAttrs = spanLinkedAttrs;
exports.spanMultiThemes = spanMultiThemes;
exports.spanMultiThemesAttrs = spanMultiThemesAttrs;
exports.styleToCss = styleToCss;
exports.textDecoration = textDecoration;
exports.wrapLine = wrapLine;
exports.wrapWithHeader = wrapWithHeader;
