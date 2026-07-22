'use strict';

var chunkSY5Z6UW7_cjs = require('../chunk-SY5Z6UW7.cjs');

// bundles/web-extra.ts
var bundledLanguages = {
  "angular": chunkSY5Z6UW7_cjs.lazy("angular", [], () => import('../langs/angular.cjs')),
  "astro": chunkSY5Z6UW7_cjs.lazy("astro", [], () => import('../langs/astro.cjs')),
  "dart": chunkSY5Z6UW7_cjs.lazy("dart", [], () => import('../langs/dart.cjs')),
  "eex": chunkSY5Z6UW7_cjs.lazy("eex", [], () => import('../langs/eex.cjs')),
  "ejs": chunkSY5Z6UW7_cjs.lazy("ejs", [], () => import('../langs/ejs.cjs')),
  "elm": chunkSY5Z6UW7_cjs.lazy("elm", [], () => import('../langs/elm.cjs')),
  "erb": chunkSY5Z6UW7_cjs.lazy("erb", [], () => import('../langs/erb.cjs')),
  "glimmer": chunkSY5Z6UW7_cjs.lazy("glimmer", ["ember", "handlebars"], () => import('../langs/glimmer.cjs')),
  "graphql": chunkSY5Z6UW7_cjs.lazy("graphql", [], () => import('../langs/graphql.cjs')),
  "heex": chunkSY5Z6UW7_cjs.lazy("heex", [], () => import('../langs/heex.cjs')),
  "markdown": chunkSY5Z6UW7_cjs.lazy("markdown", [], () => import('../langs/markdown.cjs')),
  "markdown_inline": chunkSY5Z6UW7_cjs.lazy("markdown_inline", [], () => import('../langs/markdown_inline.cjs')),
  "php": chunkSY5Z6UW7_cjs.lazy("php", [], () => import('../langs/php.cjs')),
  "prisma": chunkSY5Z6UW7_cjs.lazy("prisma", [], () => import('../langs/prisma.cjs')),
  "scss": chunkSY5Z6UW7_cjs.lazy("scss", [], () => import('../langs/scss.cjs')),
  "surface": chunkSY5Z6UW7_cjs.lazy("surface", [], () => import('../langs/surface.cjs')),
  "svelte": chunkSY5Z6UW7_cjs.lazy("svelte", [], () => import('../langs/svelte.cjs')),
  "vue": chunkSY5Z6UW7_cjs.lazy("vue", [], () => import('../langs/vue.cjs')),
  "xml": chunkSY5Z6UW7_cjs.lazy("xml", [], () => import('../langs/xml.cjs')),
  "plaintext": chunkSY5Z6UW7_cjs.lazy("plaintext", ["text", "txt", "plain"], () => import('../langs/plaintext.cjs'))
};

exports.bundledLanguages = bundledLanguages;
