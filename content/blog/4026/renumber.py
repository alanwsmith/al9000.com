#!/usr/bin/env python3

import shutil
from pprint import pprint
from pathlib import Path


input_root = Path("../../../source").resolve()
output_root = Path("../../../../blog").resolve()


def run():
    input_roots = get_input_roots(input_root)
    posts = get_posts(input_roots)
    copy_posts(posts)
    make_redirects(posts)

    
class Post():
    def __init__(self, source_dir, counter):
        self._source_dir = source_dir
        self._counter = counter

    def source_dir(self):
        return self._source_dir

    def destination_dir(self):
        return Path(output_root / str(self._counter)).resolve()

    def original_url(self):
        return f"{Path('/blog' / self.source_dir().relative_to(input_root))}/*"

    def redirect_url(self):
        return f"{Path('/blog' / self.destination_dir().relative_to(output_root))}/:splat"

    
def copy_dir_contents(source, destination):
    destination.mkdir(parents=True, exist_ok=True)
    for item in source.iterdir():
        target = destination / item.name
        if item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)
        else:
            shutil.copy2(item, target)
        print(f"Copied: {item}")
        print(f"    To: {target}")
        

def copy_posts(posts):
    for post in posts:
        copy_dir_contents(post.source_dir(), post.destination_dir())

        
def get_input_roots(dir):
    dirs = set()
    for dirpath, dirnames, filenames in Path(dir).resolve().walk():
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]
        for name in filenames:
            if name == "index.html":
                dirs.add(dirpath)
    return list(dirs)


def get_posts(roots):
    counter = 4000
    posts = []
    for dir in sorted(roots):
        posts.append(Post(dir, counter))
        counter += 1
    return posts 


def make_redirects(posts):
    with open("redirects-output.txt", "w") as _out:
        for post in posts:
            _out.write(f"[[redirects]]\n")
            _out.write(f"  from = \"{post.original_url()}\"\n")
            _out.write(f"  to = \"{post.redirect_url()}\"\n")
            _out.write(f"  status = 301\n")
            _out.write(f"  force = true\n")
            _out.write(f"\n")
        

if __name__ == "__main__":
    run()
