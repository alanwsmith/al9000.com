ffmpeg -i church-3818213.webm \
  -c:v libx264 -profile:v baseline -level:v 3.0 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  church-2.mp4
