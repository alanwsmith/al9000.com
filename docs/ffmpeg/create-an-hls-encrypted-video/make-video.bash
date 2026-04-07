#!/bin/bash

INPUT_DIR="input"
KEY_NAME="hls-sample.key"
KEY_PATH="$INPUT_DIR/$KEY_NAME"
KEY_INFO="$INPUT_DIR/hls-sample.txt"
OUTPUT_DIR="output"
VIDEO_NAME="bird.mp4"

[ ! -e "$KEY_PATH" ] && openssl rand -out "$KEY_PATH" 16

echo "https://al9000.com/ffmpeg/create-an-hls-encrypted-video/$KEY_NAME" > "$KEY_INFO"
echo "$KEY_NAME" >> "$KEY_INFO"
openssl rand -hex 16 >> "$KEY_INFO"

ffmpeg -y \
  -i "$INPUT_DIR/$VIDEO_NAME" \
  -c:v libx264 \
  -c:a aac \
  -hls_segment_type mpegts \
  -hls_list_size 0 \
  "$OUTPUT_DIR/bird.m3u8"
