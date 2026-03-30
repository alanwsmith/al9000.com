#!/usr/bin/env python3

import json
import urllib.request

url = "https://edhrec.com/commanders"
output_path = "../../content/data/edhrec/commanders.json"

def get_json():
    response = urllib.request.urlopen(url)
    html = response.read().decode('utf-8')
    parts = html.split('<script id="__NEXT_DATA__" type="application/json">')
    content = parts[1].split('</script>')
    data = json.loads(content[0])
    with open(output_path, "w") as _out:
        _out.write(json.dumps(data, sort_keys=True, indent=2, default=str))

if __name__ == "__main__":
    get_json()

