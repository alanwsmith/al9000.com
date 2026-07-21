#!/bin/bash

magick "og-example-background.jpg" \
    \( \
      -font Arial-Bold \
      -background none \
      -fill white \
      -pointsize 98 \
      -size 820x \
      caption:"This is just a test of the title content" \
    \) \
    -gravity NorthWest \
    -geometry +60+50 \
    -composite \
    "og-example-output.jpg"

