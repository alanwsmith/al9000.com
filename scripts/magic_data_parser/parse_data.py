#!/usr/bin/env python3

import json

preludes = {}

keys = [
        "card_back_id", "cmc", "edhrec_rank", "game_changer", "id", "layout", "mana_cost", 
        "name", "oracle_id", "oracle_text", "power", "rarity", "toughness", "type_line",
        ]

arrayKeys = ["colors", "color_identity", "keywords"]

with open("/Users/alan/workshop/data/scryfall-bulk-data/oracle-cards.json") as _json_in:
    data = json.load(_json_in)

for raw in data:
    prelude = raw["id"][0]
    if prelude not in preludes:
        preludes[prelude] = []
    if raw["legalities"]["commander"] == "not_legal":
        continue
    if raw["lang"] == "en":
        card = { "image_uris": {}, "legalities": {}, "prices": {}}
        for key in keys:
            if key in raw:
                card[key] = raw[key]
            else:
                card[key] = None
        for arrayKey in arrayKeys:
            if arrayKey in raw:
                card[arrayKey] = raw[arrayKey]
            else:
                card[arrayKey] =[] 
        if "image_uris" in raw:
            card["image_uris"]["png"] = raw["image_uris"]["png"]
        card["legalities"]["commander"] = raw["legalities"]["commander"]
        card["prices"]["usd"] = raw["prices"]["usd"]
        preludes[prelude].append(card)

for p in preludes:
    with open(f"../../content/magic-data/scryfall-cards/{p}.json", "w") as _json_out:
        json.dump({ "cards": preludes[p]}, _json_out, sort_keys=True, indent=2)

