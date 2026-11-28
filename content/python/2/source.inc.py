from pathlib import Path
import shutil

def copy_dir_contents(source_dir, destination_dir):
    destination_dir.mkdir(parents=True, exist_ok=True)
    for item in source_dir.iterdir():
        target = destination_dir / item.name
        if item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)
        else:
            shutil.copy2(item, target)

if __name__ == "__main__":
    copy_dir_contents(Path("input_dir"), Path("output_dir"))
    
