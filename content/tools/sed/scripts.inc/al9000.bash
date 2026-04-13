#!/bin/bash

DIR=~/workshop/al9000.com/content/tools

find "$DIR" \
  -type f \
  \( \
    -iname "*.html" \
    -o -iname "*.js" \
    -o -iname "*.txt" \
    -o -iname "*.json" \
  \) \
  -print0 \
| xargs -0 sed -E -i "" \
's!tools/tools!tools!g'

# Reminder: -E is for extended RegEx
# Reminder: -i is for editing the file in place
