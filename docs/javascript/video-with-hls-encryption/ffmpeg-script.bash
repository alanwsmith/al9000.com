#!/bin/bash

KEY_NAME="sample-key.key"

if [ ! -e  "$KEY_NAME" ]
  openssl rand -out "$KEY_NAME" 16
fi


ffmpeg -i "samples/source.mp4" \
  -hls_key_info_file keyinfo.txt \
  -hls_time 10 \
  -hls_list_size 0 \
  output.m3u8
