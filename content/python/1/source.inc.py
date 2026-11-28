from pathlib import Path

def list_files(dir):
    result = []
    for dirpath, dirnames, filenames in Path(dir).walk():
        dirnames[:] = [d for d in dirnames if not d.startswith('.')]
        for name in filenames:
            if not (name.startswith('.') or name.endswith('~')):
                result.append(dirpath / name)
    return sorted(result)

if __name__ == "__main__":
    with open("output.inc.txt", "w") as _out:
        for f in list_files("examples.inc"):
            _out.write(f"{str(f)}\n")
