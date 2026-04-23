#!/bin/bash

for i in {1..9}; do
  rsync -av . \
    --delete \
    --exclude local \
    --exclude "startup.lua" \
    --exclude "start-watcher.inc.bash" \
    --exclude "sync-to-local.inc.bash" \
    --exclude ".settings" \
    --exclude ".DS_Store" \
    "/Users/alan/Library/Application Support/ModrinthApp/profiles/al9000 computercraft testing/saves/Survival Hard/computercraft/computer/$i/"
done
