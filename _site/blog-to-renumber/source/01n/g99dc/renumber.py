#!/usr/bin/env python3

# Reminder: this script runs from inside
# the `input_dir` so the `../../../` in
# the `input_dir` and the `output_dir`
# point to different locations. 

from pprint import pprint
from pathlib import Path

input_dir = Path("../../../source")
output_dir = Path("../../../blog")

def run():
    input_dirs = get_input_dirs(input_dir)
    dir_ids = set_dir_ids(input_dirs)
    copy_dirs(dir_ids)

    
def copy_dir_contents(input_dir, destination_dir):
    destination_dir.mkdir(parents=True, exist_ok=True)
    for item in input_dir.iterdir():
        target = destination_dir / item.name
        if item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)
        else:
            shutil.copy2(item, target)

def copy_dirs(dir_ids):
    for dir_string, id in dir_ids.items():
        source_dir = Path(dir_string)
        destination_dir = output_dir / str(id)
        print(source_dir)
        print(destination_dir)


def get_input_dirs(root):
    dirs = set()
    for dirpath, dirnames, filenames in Path(root).resolve().walk():
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]
        for name in filenames:
            if name == "index.html":
                dirs.add(dirpath)
    return list(dirs)


def set_dir_ids(input_dirs):
    dirs = {}
    counter = 4000
    for dir in sorted(input_dirs):
        dirs[str(dir)] = counter
        counter += 1
    return dirs


if __name__ == "__main__":
    run()
