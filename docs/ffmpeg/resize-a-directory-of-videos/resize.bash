#!/bin/bash

echo "HERE"

for f in ~/Desktop/ffmpeg-test/input/*.mp4; do
  [ -f "$f" ] || continue
  echo "$f"
done

