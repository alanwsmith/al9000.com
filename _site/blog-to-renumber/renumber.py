#!/usr/bin/env python3

from pathlib import Path

dir_ids = {}

def run():
    files = list_files("source")
    for f in files:
        print(f.parent)

def list_files(dir):
    result = []
    for dirpath, dirnames, filenames in Path(dir).walk():
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]
        for name in filenames:
            if not (name.startswith('.') or name.endswith('~')):
                result.append(dirpath / name)
    return sorted(result)



def set_dir_ids(files):
    counter = 1
    for f in files:
        print(f.parent)
        # if str(f.parent) not in dir_ids:
        #     dir_ids[str(f.parent)] = counter
        #     counter += 1
            
        

    print(dir_ids)



    


    

if __name__ == "__main__":
    run()
