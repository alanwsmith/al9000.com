#!/bin/bash

split -b 1M "church-3818213.webm" part_

# ffmpeg -i "church-3818213.webm" \
#   -c copy \
#   -f segment \
#   -segment_time 2 \
#   church-3818213-part-%d.webm
  
