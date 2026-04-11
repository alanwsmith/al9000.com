#!/bin/bash

find ./samples -type f -maxdepth 1 -exec basename {} \; \
  | sort \
  | jq -Rs \
  'split("\n") | map(select(length > 0)) | {files: .}' \
  > output.json


