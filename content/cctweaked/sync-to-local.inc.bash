#!/bin/bash

for i in {1..9}; do
  rsync -av --delete . --exclude local --exclude "startup.lua" "/Users/alan/Library/Application Support/ModrinthApp/profiles/al9000 computercraft testing/saves/Survival Hard/computercraft/computer/$i/"
done

