#!/bin/bash

# NOTES:
# -o in find is for "or"
# -E in sed is for extended (modern regex)
# -i in sed sets up to edit the files in place


find "/Users/alan/workshop/al9000.com/content/" \
  -type f \( -iname "*.html" -o -iname "*.txt" -o -iname "*.md" -o -iname "*.neo" \) -print0 | xargs -0 sed -E -i "" \
  's|== extends "/templates.inc/pages/empty.html"|== if rss\n== extends "/templates.inc/rss/empty.html"\n== else\n== extends "/templates.inc/pages/empty.html"\n== endif|g'


