from pathlib import Path


def absolute_to_relative(absolute_path, clip_path):
    return absolute_path.relative_to(clip_path)


if __name__ == "__main__":
    absolute_path = Path("/some/absolute/path/to/file.txt")
    clip_path = Path("/some/absolute")
    relative_path = absolute_to_relative(absolute_path, clip_path)
    print(relative_path)
    
