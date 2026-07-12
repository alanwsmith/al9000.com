#!/bin/bash

ffmpeg -y -f lavfi -i anullsrc -i INPUT.webm -c:v copy -c:a libvorbis -shortest OUTPUT.webm



