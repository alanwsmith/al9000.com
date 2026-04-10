#!/bin/bash

INPUT_DIR=samples

for file in $INPUT_DIR/*
do 
  if [ -f "$file" ]
  then 
    echo "$file" 
    BASENAME=$(basename -- "$file")
    STEM="${BASENAME%.*}"
    EXTENSION="${BASENAME##*.}"
    echo $BASENAME
    echo $STEM
    echo $EXTENSION
  fi 
done


