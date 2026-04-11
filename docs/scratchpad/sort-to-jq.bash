#!/bin/bash

#find . -type f -print0 | sort -z | xargs -r0 basename | cat

find . -type f -exec basename {} \; \
  | sort \
  | jq -Rs \
  'split("\n") | map(select(length > 0)) | {files: .}'

# -print0 |  jq -Rs 'split("\u0000")'

