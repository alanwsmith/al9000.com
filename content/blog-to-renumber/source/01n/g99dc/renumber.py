#!/usr/bin/env python3

import shutil
from pprint import pprint
from pathlib import Path

input_root = Path("../../../source")
output_root = Path("../../../../blog")

def run():
    input_roots = get_input_roots(input_root)
    posts = get_posts(input_roots)
    copy_posts(posts)
    
class Post():
    def __init__(self, source_dir, counter):
        self._source_dir = source_dir
        self._counter = counter

    def source_dir(self):
        return self._source_dir

    def destination_dir(self):
        return Path(output_root / str(self._counter)).resolve()



def copy_dir_contents(input_root, destination_dir):
    destination_dir.mkdir(parents=True, exist_ok=True)
    for item in input_root.iterdir():
        target = destination_dir / item.name
        if item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)
        else:
            shutil.copy2(item, target)
        print(f"Copied: {item}")
        print(f"    To: {target}")
        

def copy_posts(posts):
    for post in posts:
        copy_dir_contents(post.source_dir(), post.destination_dir())

        
def get_input_roots(root):
    dirs = set()
    for dirpath, dirnames, filenames in Path(root).resolve().walk():
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]
        for name in filenames:
            if name == "index.html":
                dirs.add(dirpath)
    return list(dirs)


def get_posts(input_roots):
    counter = 4000
    posts = []
    for dir in sorted(input_roots):
        posts.append(Post(dir, counter))
        counter += 1
    return posts 


if __name__ == "__main__":
    run()
