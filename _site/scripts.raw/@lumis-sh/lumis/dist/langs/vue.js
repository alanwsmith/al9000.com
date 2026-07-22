// langs/vue.ts
var language = {
  id: "vue",
  aliases: [],
  highlights: `; This file is auto-generated. Do not edit.
; inherits: html_tags
(tag_name) @tag 

; (erroneous_end_tag_name) @error ; we do not lint syntax errors
(comment) @comment 

(attribute_name) @tag.attribute 

(attribute_value) 

((attribute
  (quoted_attribute_value) @string)
  (#set! priority 99))

(text) @none 

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.heading)
  (#eq? @_tag "title"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.heading.1)
  (#eq? @_tag "h1"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.heading.2)
  (#eq? @_tag "h2"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.heading.3)
  (#eq? @_tag "h3"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.heading.4)
  (#eq? @_tag "h4"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.heading.5)
  (#eq? @_tag "h5"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.heading.6)
  (#eq? @_tag "h6"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.strong)
  (#any-of? @_tag "strong" "b"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.italic)
  (#any-of? @_tag "em" "i"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.strikethrough)
  (#any-of? @_tag "s" "del"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.underline)
  (#eq? @_tag "u"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.raw)
  (#any-of? @_tag "code" "kbd"))

((element
  (start_tag
    (tag_name) @_tag)
  (text) @markup.link.label)
  (#eq? @_tag "a"))



[
  "<"
  ">"
  "</"
  "/>"
] @tag.delimiter

"=" @operator

[
  "["
  "]"
] @punctuation.bracket

[
  ":"
  "."
] @character.special

[
  (interpolation)
  "@"
] @punctuation.special

(interpolation
  (raw_text) @none)

(dynamic_directive_inner_value) @variable

(directive_name) @tag.attribute

; Accessing a component object's field
(":"
  .
  (directive_value) @variable.member)

("."
  .
  (directive_value) @property)

; @click is like onclick for HTML
("@"
  .
  (directive_value) @function.method)

; Used in v-slot, declaring position the element should be put in
("#"
  .
  (directive_value) @variable)

(directive_attribute
  (quoted_attribute_value) @punctuation.special)

(directive_attribute
  (quoted_attribute_value
    (attribute_value) @none))

(directive_modifier) @function.method

`,
  injections: `; This file is auto-generated. Do not edit.
; inherits: html_tags
((comment) @injection.content
  (#set! injection.language "comment"))

; <style>...</style>
; <style blocking> ...</style>
; Add "lang" to predicate check so that vue/svelte can inherit this
; without having this element being captured twice
((style_element
  (start_tag) @_no_type_lang
  (raw_text) @injection.content)
  (#not-match? @_no_type_lang "\\slang\\s*=")
  (#not-match? @_no_type_lang "\\stype\\s*=")
  (#set! injection.language "css"))

((style_element
  (start_tag
    (attribute
      (attribute_name) @_type
      (quoted_attribute_value
        (attribute_value) @_css)))
  (raw_text) @injection.content)
  (#eq? @_type "type")
  (#eq? @_css "text/css")
  (#set! injection.language "css"))

; <script>...</script>
; <script defer>...</script>
((script_element
  (start_tag) @_no_type_lang
  (raw_text) @injection.content)
  (#not-match? @_no_type_lang "\\slang\\s*=")
  (#not-match? @_no_type_lang "\\stype\\s*=")
  (#set! injection.language "javascript"))

; <script type="foo/bar">
(script_element
  (start_tag
    (attribute
      (attribute_name) @_attr
      (#eq? @_attr "type")
      (quoted_attribute_value
        (attribute_value) @injection.language)))
  (raw_text) @injection.content
  (#gsub! @injection.language "(.+)/(.+)" "%2"))

; <script type="importmap">
((script_element
  (start_tag
    (attribute
      (attribute_name) @_attr
      (#eq? @_attr "type")
      (quoted_attribute_value
        (attribute_value) @_type)))
  (raw_text) @injection.content)
  (#eq? @_type "importmap")
  (#set! injection.language "json"))

; <script type="module">
((script_element
  (start_tag
    (attribute
      (attribute_name) @_attr
      (#eq? @_attr "type")
      (quoted_attribute_value
        (attribute_value) @_type)))
  (raw_text) @injection.content)
  (#eq? @_type "module")
  (#set! injection.language "javascript"))

; <a style="/* css */">
((attribute
  (attribute_name) @_attr
  (quoted_attribute_value
    (attribute_value) @injection.content))
  (#eq? @_attr "style")
  (#set! injection.language "css"))

; lit-html style template interpolation
; <a @click=\${e => console.log(e)}>
; <a @click="\${e => console.log(e)}">
((attribute
  (quoted_attribute_value
    (attribute_value) @injection.content))
  (#match? @injection.content "\\\${")
  (#offset! @injection.content 0 2 0 -1)
  (#set! injection.language "javascript"))

((attribute
  (attribute_value) @injection.content)
  (#match? @injection.content "\\\${")
  (#offset! @injection.content 0 2 0 -2)
  (#set! injection.language "javascript"))

; <input pattern="[0-9]"> or <input pattern=[0-9]>
(element
  (_
    (tag_name) @_tagname
    (#eq? @_tagname "input")
    (attribute
      (attribute_name) @_attr
      [
        (quoted_attribute_value
          (attribute_value) @injection.content)
        (attribute_value) @injection.content
      ]
      (#eq? @_attr "pattern"))
    (#set! injection.language "regex")))

; <input type="checkbox" onchange="this.closest('form').elements.output.value = this.checked">
(attribute
  (attribute_name) @_name
  (#match? @_name "^on[a-z]+$")
  (quoted_attribute_value
    (attribute_value) @injection.content)
  (#set! injection.language "javascript"))

; <script lang="css">
((style_element
  (start_tag
    (attribute
      (attribute_name) @_lang
      (quoted_attribute_value
        (attribute_value) @injection.language)))
  (raw_text) @injection.content)
  (#eq? @_lang "lang")
  (#any-of? @injection.language "css" "scss"))

; TODO: When nvim-treesitter has postcss and less parsers, use @injection.language and @injection.content instead
; <script lang="scss">
(style_element
  (start_tag
    (attribute
      (attribute_name) @_lang
      (quoted_attribute_value
        (attribute_value) @_scss)))
  (raw_text) @injection.content
  (#eq? @_lang "lang")
  (#any-of? @_scss "less" "postcss" "sass")
  (#set! injection.language "scss"))

; <script lang="js">
((script_element
  (start_tag
    (attribute
      (attribute_name) @_lang
      (quoted_attribute_value
        (attribute_value) @_js)))
  (raw_text) @injection.content)
  (#eq? @_lang "lang")
  (#eq? @_js "js")
  (#set! injection.language "javascript"))

; <script lang="ts">
((script_element
  (start_tag
    (attribute
      (attribute_name) @_lang
      (quoted_attribute_value
        (attribute_value) @_ts)))
  (raw_text) @injection.content)
  (#eq? @_lang "lang")
  (#eq? @_ts "ts")
  (#set! injection.language "typescript"))

; <script lang="tsx">
; <script lang="jsx">
(script_element
  (start_tag
    (attribute
      (attribute_name) @_attr
      (quoted_attribute_value
        (attribute_value) @injection.language)))
  (#eq? @_attr "lang")
  (#any-of? @injection.language "tsx" "jsx")
  (raw_text) @injection.content)

((interpolation
  (raw_text) @injection.content)
  (#set! injection.language "typescript"))

(directive_attribute
  (quoted_attribute_value
    (attribute_value) @injection.content
    (#set! injection.language "typescript")))

(template_element
  (start_tag
    (attribute
      (quoted_attribute_value
        (attribute_value) @injection.language)))
  (text) @injection.content
  (#eq? @injection.language "pug"))`,
  brackets: `; This file is auto-generated. Do not edit.
("(" @open
  ")" @close)

("[" @open
  "]" @close)

("{" @open
  "}" @close)`,
  wasm: { packageName: "@lumis-sh/wasm-vue", name: "tree-sitter-vue", version: "0.26" }
};
var vue_default = language;

export { vue_default as default };
