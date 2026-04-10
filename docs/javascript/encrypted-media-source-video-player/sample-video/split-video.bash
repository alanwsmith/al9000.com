#!/bin/bash

split -b 1M -d "church-3818213.webm" part-
for f in part-*; do mv "$f" "$f.part"; done

