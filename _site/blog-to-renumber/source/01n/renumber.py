#!/usr/bin/env python3

from pprint import pprint
from pathlib import Path

dir_ids = {}

def run():
    files = list_files("../")
    set_dir_ids(files)
    

def copy_dir_contents(source_dir, destination_dir):
    destination_dir.mkdir(parents=True, exist_ok=True)
    for item in source_dir.iterdir():
        target = destination_dir / item.name
        if item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)
        else:
            shutil.copy2(item, target)


def list_files(dir):
    result = []
    for dirpath, dirnames, filenames in Path(dir).resolve().walk():
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]
        for name in filenames:
            if name == "index.html":
                result.append(dirpath / name)
    return sorted(result)


def set_dir_ids(files):
    counter = 4000
    for f in files:
        if str(f.parent) not in dir_ids:
            dir_ids[str(f.parent)] = counter
            counter += 1
    pprint(dir_ids)

    

    

if __name__ == "__main__":
    run()
