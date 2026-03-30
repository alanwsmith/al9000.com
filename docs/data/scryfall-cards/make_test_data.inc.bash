#!/bin/bash

cat 0.json | jq '.cards = .cards[0:200]' > "debug.json"
