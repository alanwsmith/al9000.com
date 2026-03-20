#!/bin/bash

cat 0.json | jq '.cards = .cards[0:99]' > "debug.json"
