#!/usr/bin/env python3

import json

preludes = {}

top_keys = ["cmc", "edhrec_rank", "game_changer", "id", "layout", "name", "oracle_id"]

one_face_keys = ["name", "mana_cost", "type_line", "oracle_text", "power", "toughness"]


# TODO: create a faces array. 
# name, 
# mana_cost,
# type_line
# oracle_text, 
# power
# toughness

# image_uris
# colors: [],
# color_identity: []


#arrayKeys = ["colors", "color_identity"]

with open("/Users/alan/workshop/data/scryfall-bulk-data/oracle-cards.json") as _json_in:
    data = json.load(_json_in)

for raw in data:
    prelude = raw["id"][0]
    if prelude not in preludes:
        preludes[prelude] = []
    if raw["legalities"]["commander"] == "not_legal":
        continue
    if raw["lang"] == "en" and raw["legalities"]["commander"] == "legal":
        card = { 
                "faces": [],
                }
        if raw["prices"]["usd"] != None:
            card["price"] = float(raw["prices"]["usd"])
        else:
            card["price"] = 0.0
        for top_key in top_keys:
            if top_key in raw:
                card[top_key] = raw[top_key]
            else:
                card[top_key] = None
    if "card_faces" in raw:
        pass
    else:
        details = {}
        for one_face_key in one_face_keys:
            if one_face_key in raw:
                details[one_face_key] = raw[one_face_key]
        card["faces"].append(details)
        if "colors" in raw:
            details["colors"] = raw["colors"]
        else:
            details["colors"] = []
        if "color_identity" in raw:
            details["color_identity"] = raw["color_identity"]
        else:
            details["color_identity"] = []
        details["image"] = raw["image_uris"]["normal"]

        # details["name"] = raw["name"]
        # details["mana_cost"] = raw["mana_cost"]
        # details["type_line"] = raw["type_line"]
        # details["oracle_text"] = raw["oracle_text"]
        # card["faces"].append(details)
        # if "power" in raw:
        #     details["power"] = raw["power"]


# TODO: create a faces array. 
# name, 
# mana_cost,
# type_line
# oracle_text, 
# colors [],
# color_identity
# power
# toughness
# image_uris



        # for arrayKey in arrayKeys:
        #     if arrayKey in raw:
        #         card[arrayKey] = raw[arrayKey]
        #     else:
        #         card[arrayKey] =[] 

        # if "image_uris" in raw:
        #     card["image_uris"]["png"] = raw["image_uris"]["png"]
        preludes[prelude].append(card)

for p in preludes:
    with open(f"../../content/magic-data/scryfall-cards/{p}.json", "w") as _json_out:
        json.dump({ "cards": preludes[p]}, _json_out, sort_keys=True, indent=2)

