#!/bin/bash

DIR=~/workshop/al9000.com/content/rust/axum/static-site-generator

find "$DIR" \
  -type f \
  \( \
    -iname "*.html" \
    -o -iname "*.js" \
    -o -iname "*.txt" \
    -o -iname "*.json" \
    -o -iname "*.rs" \
  \) \
  -print0 \
| xargs -0 sed -E -i "" \
's!static_site_builder!static_site_generator!g'

# Reminder: -E is for extended RegEx
# Reminder: -i is for editing the file in place
