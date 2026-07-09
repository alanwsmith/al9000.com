#!/usr/bin/env python3

import json
import csv

with open('colors.csv', newline='') as csv_file:
    csv_reader = csv.reader(csv_file)
    for row in csv_reader:
        print(', '.join(row))
