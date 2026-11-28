#!/bin/bash

EXAMPLE_PATH="path/to/example-file.txt"

BASENAME=$(basename "$EXAMPLE_PATH")
STEM="${BASENAME%.*}"

echo $STEM


