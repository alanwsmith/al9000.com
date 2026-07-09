#!/usr/bin/env python3

import json
import csv

data = {}

with open('colors.csv', newline='') as csv_file:
    csv_reader = csv.reader(csv_file)
    for row in csv_reader:
        hex = row[1]
        rgb = row[2].strip().split(" ")
        data[row[0]] = {
                "hex": hex,
                "rbg": {
                    "r": rgb[0],
                    "g": rgb[1],
                    "b": rgb[2],
                    },
                }

with open("colors.json", "w") as _out:
    json.dump(data, _out, 
    sort_keys=True, 
    indent=2, 
    default=str
              )


