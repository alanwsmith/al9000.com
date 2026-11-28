#!/usr/bin/env python3

from pprint import pprint
from pathlib import Path

dir_ids = {}
# Reminder: this script runs from inside
# the `source_dir` so the `../../../` in
# the `source_dir` and the `output_dir`
# point to different locations. 
source_dir = Path("../../../source")
output_dir = Path("../../../blog")


def run():
    source_dirs = get_source_dirs(source_dir)
    set_dir_ids(source_dirs)

def copy_dir_contents(source_dir, destination_dir):
    destination_dir.mkdir(parents=True, exist_ok=True)
    for item in source_dir.iterdir():
        target = destination_dir / item.name
        if item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)
        else:
            shutil.copy2(item, target)

def get_source_dirs(root):
    dirs = set()
    for dirpath, dirnames, filenames in Path(root).resolve().walk():
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]
        for name in filenames:
            if name == "index.html":
                dirs.add(dirpath)
    return list(dirs)


def set_dir_ids(source_dirs):
    counter = 4000
    for dir in sorted(source_dirs):
        dir_ids[str(dir)] = counter
        counter += 1
            
    pprint(dir_ids)


if __name__ == "__main__":
    run()
