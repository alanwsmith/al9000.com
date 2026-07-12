#!/bin/bash

INPUT_DIR=/Users/alan/Videos/assembly/davinci-outputs
OUTPUT_DIR=/Users/alan/Videos/assembly/resized-smaller
WIDTH=300

for f in "$INPUT_DIR"/*.mp4; do
  echo "$f"
  OUTPUT_FILE=$OUTPUT_DIR/`basename $f`
  echo $OUTPUT_FILE
  ffmpeg -y -i "$f" -vf "scale=$WIDTH:-2" "$OUTPUT_FILE"
done

