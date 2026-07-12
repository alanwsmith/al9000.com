#!/bin/bash

# ffmpeg -i 
# ffmpeg -f lavfi -i anullsrc -i video.mov -c:v copy -c:a aac -map 0:a -map 1:v -shortest output.mp4

# ffmpeg -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -i video.mov -c:v copy -c:a aac -shortest output.mov


# ffmpeg -y -f lavfi -i anullsrc -i input.webm -c:v copy -c:a libvorbis -shortest output.webm

ffmpeg -y -i output.webm output2.mp4


