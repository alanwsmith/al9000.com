#!/bin/bash

# ffprobe -v error \
#   -show_entries stream=codec_name,profile,level \
#   -of csv=p=0 samples/sample-video.mp4

#VIDEO_CODEC=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,profile,level -of csv=p=0 samples/sample.mp4)
#AUDIO_CODEC=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate,channels -of csv=p=0 samples/sample.mp4)

#echo "video/mp4; codecs=\"${VIDEO_CODEC}, ${AUDIO_CODEC}\""



INPUT_FILE="samples/sample.mp4"

# Get profile and level
PROFILE=$(ffprobe -v error -select_streams v:0 -show_entries stream=profile -of csv=p=0 "$INPUT_FILE")
LEVEL=$(ffprobe -v error -select_streams v:0 -show_entries stream=level -of csv=p=0 "$INPUT_FILE")

# Convert level to hex
LEVEL_HEX=$(printf '%X' $LEVEL)

# Map profile to hex
case "$PROFILE" in
  baseline) PROFILE_HEX="42" ;;
  main)     PROFILE_HEX="4D" ;;
  high)     PROFILE_HEX="64" ;;
  *)        PROFILE_HEX="64" ;; # Default to high
esac

CONSTRAINT="E0"
VIDEO_CODEC="avc1.${PROFILE_HEX}${CONSTRAINT}${LEVEL_HEX}"

# Get audio codec
AUDIO=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$INPUT_FILE")

if [ "$AUDIO" = "aac" ]; then
  AUDIO_CODEC="mp4a.40.2"
else
  AUDIO_CODEC="mp4a.40.2" # Default AAC
fi

echo "video/mp4; codecs=\"${VIDEO_CODEC}, ${AUDIO_CODEC}\""
