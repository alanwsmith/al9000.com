#!/usr/bin/env python3
import subprocess
import sys
import math


def build_ffmpeg_command(
    output_width: int,
    output_aspect: tuple[int, int],
    overlay_aspect: tuple[int, int],
    max_overlay_width: int,
    duration: float,
    primary_col: int,
    primary_row: int,
    input_video: str,
    output_file: str = "output.mp4",
) -> list[str]:
    # --- Compute output dimensions ---
    ow, oh = output_aspect
    output_height = int(output_width * oh / ow)
    # Make height even for codec compatibility
    output_height += output_height % 2

    # --- Compute grid layout ---
    iw, ih = overlay_aspect
    cols = output_width // max_overlay_width
    if cols < 1:
        cols = 1
    cell_width = output_width // cols
    # Ensure cell width doesn't exceed max
    if cell_width > max_overlay_width:
        cols += 1
        cell_width = output_width // cols
    cell_height = int(cell_width * ih / iw)
    # Make dimensions even
    cell_width += cell_width % 2
    cell_height += cell_height % 2

    rows = output_height // cell_height
    if rows < 1:
        rows = 1

    total_cells = rows * cols

    if primary_col < 0 or primary_col >= cols or primary_row < 0 or primary_row >= rows:
        raise ValueError(
            f"Primary cell ({primary_col}, {primary_row}) is out of bounds for a {cols}x{rows} grid"
        )

    print(f"Output: {output_width}x{output_height}")
    print(f"Grid: {cols} cols x {rows} rows ({total_cells} cells)")
    print(f"Cell size: {cell_width}x{cell_height}")
    print(f"Primary cell: col={primary_col}, row={primary_row}")

    # --- Build ffmpeg command ---
    cmd = ["ffmpeg", "-y"]

    # Input 0: black background
    cmd += [
        "-f", "lavfi",
        "-i", f"color=c=black:s={output_width}x{output_height}:d={duration}:r=30",
    ]

    # Inputs 1..N: one per grid cell
    # for i in range(total_cells):
    #     cmd += ["-stream_loop", "-1", "-i", input_video]

    for i in range(total_cells):
        cmd += ["-i", input_video]

    # --- Build filter_complex ---
    filters = []

    # Scale each cell input and apply delay (with trimming to duration)
    for i in range(total_cells):
        col = i % cols
        row = i // cols
        manhattan = abs(col - primary_col) + abs(row - primary_row)
        delay_sec = manhattan * 0.17

        input_idx = i + 1  # 0 is the background

        # Video: trim, set delay via PTS shift, then scale
        if delay_sec > 0:
            filters.append(
                f"[{input_idx}:v]trim=0:{duration},setpts=PTS+{delay_sec}/TB,"
                f"scale={cell_width}:{cell_height},setsar=1[v{i}]"
            )
        else:
            filters.append(
                f"[{input_idx}:v]trim=0:{duration},setpts=PTS-STARTPTS,"
                f"scale={cell_width}:{cell_height},setsar=1[v{i}]"
            )

    # Overlay each cell onto the background one by one
    prev = "0:v"
    for i in range(total_cells):
        col = i % cols
        row = i // cols
        x = col * cell_width
        y = row * cell_height
        out_label = f"bg{i}"
        if i == total_cells - 1:
            out_label = "vout"
        filters.append(
            f"[{prev}][v{i}]overlay=x={x}:y={y}:eof_action=pass[{out_label}]"
        )
        prev = out_label

    # Audio: use only the primary cell's audio, with no delay (it starts at 0)
    primary_index = primary_row * cols + primary_col
    primary_input_idx = primary_index + 1
    filters.append(
        f"[{primary_input_idx}:a]atrim=0:{duration},asetpts=PTS-STARTPTS[aout]"
    )

    filter_complex = ";\n".join(filters)

    cmd += ["-filter_complex", filter_complex]
    cmd += ["-map", "[vout]", "-map", "[aout]"]
    cmd += ["-t", str(duration)]
    cmd += ["-c:v", "libvpx-vp9", "-crf", "28", "-c:a", "libopus"]
    cmd += [output_file]

    return cmd


def main():

    # # ---- Configuration ----
    # output_width = 1920
    # output_aspect = (16, 9)
    # overlay_aspect = (16, 9)
    # max_overlay_width = 230
    # duration = 220
    # # duration = 10
    # primary_col = 4
    # primary_row = 2
    # input_video = "input.mp4"
    # output_file = "output.webm"

    files = [
            {
                "id": "0a0554c8-e6ab-40d8-854e-1cc190a00842",
                "time": 10,
                "dimensions": [16, 9]
            },
            {
                "id": "06e880e9-d204-4715-a89d-c5997fe59a84",
                "time": 10,
                "dimensions": [16, 9]
            },
            {
                "id": "28560a05-6053-4a98-9051-3d0800cf2a51",
                "time": 224,
                "dimensions": [16, 9]
            },
            {
                "id": "4126931d-d2f1-469e-a90a-a45ecaf48cbb",
                "time": 251,
                "dimensions": [16, 9],
                "input_path": "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/cropped-and-resized/16x9/4126931d-d2f1-469e-a90a-a45ecaf48cbb.webm",
            },
            {
                "id": "45f3228e-af0d-4f7a-919c-07cee4d315f0",
                "time": 215,
                "dimensions": [16, 9],
                "input_path": "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/cropped-and-resized/16x9/45f3228e-af0d-4f7a-919c-07cee4d315f0.webm",
            },
            {
                "id": "a436f3a0-b408-42e1-9af4-6bfa71d92f59",
                "time": 64,
                "dimensions": [2.3564, 1],
                "input_path": "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/cropped-and-resized/2-3564x1/a436f3a0-b408-42e1-9af4-6bfa71d92f59.webm" ,
            },
            {
                "id": "b3e46f26-7c36-4ba9-ab0d-320bf0210b2d",
                "time": 10,
                "dimensions": [16, 9]
            },
            {
                "id": "bcf6fbe2-4852-4510-9cac-4a2c75c7bf1e",
                "time": 10,
                "dimensions": [16, 9]
            },
            {
                "id": "d9118939-807a-46c8-904c-39658cab52b5",
                "time": 211,
                "dimensions": [16, 9],
                "input_path": "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/cropped-and-resized/16x9/d9118939-807a-46c8-904c-39658cab52b5.webm",
            },
            {
                "id": "db23297f-d8db-4616-a150-169839a7a3ba",
                "time": 231,
                "dimensions": [16, 9],
                "input_path": "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/cropped-and-resized/16x9/db23297f-d8db-4616-a150-169839a7a3ba.webm",
            },
            {
                "id":"fc81dcf3-f2fa-4f7c-ac2d-8c9ef9ddae0f", 
                "time": 10,
                "dimensions": [16, 9]
            },
    ]

    in_dir = "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/full-size/16x9"
    out_dir = "/Users/alan/Desktop"

    file_index = 8
    primary_col = 4
    primary_row = 2

    vid = files[file_index]

    # ---- Configuration ----
    output_width = 3840
    output_aspect = (16, 9)
    overlay_aspect = (vid["dimensions"][0], vid["dimensions"][1])
    max_overlay_width = 460
    # duration = 220
    duration = vid['time']
    # input_video = f"{in_dir}/{vid['id']}.webm"
    input_video = vid['input_path']
    output_file = f"{out_dir}/{vid['id']}.webm"


    # Override from CLI args if provided
    if len(sys.argv) >= 2:
        input_video = sys.argv[1]
    if len(sys.argv) >= 3:
        output_file = sys.argv[2]

    cmd = build_ffmpeg_command(
        output_width=output_width,
        output_aspect=output_aspect,
        overlay_aspect=overlay_aspect,
        max_overlay_width=max_overlay_width,
        duration=duration,
        primary_col=primary_col,
        primary_row=primary_row,
        input_video=input_video,
        output_file=output_file,
    )

    print("\n--- ffmpeg command ---")
    print(" ".join(cmd))
    print()

    subprocess.run(cmd, check=True)

if __name__ == "__main__":
    main()



