#!/usr/bin/env python3
import subprocess
import sys


def build_ffmpeg_command(
    output_width: int,
    output_aspect: tuple[int, int],
    overlay_aspect: tuple[int, int],
    crop_aspect: tuple[int, int] | None,
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
    output_height += output_height % 2

    # --- Determine the effective cell aspect ratio ---
    # If a crop is specified, the cell dimensions are based on the crop aspect.
    # Otherwise they're based on the original overlay aspect.
    if crop_aspect is not None:
        cw, ch = crop_aspect
    else:
        cw, ch = overlay_aspect

    # --- Compute grid layout ---
    cols = output_width // max_overlay_width
    if cols < 1:
        cols = 1
    cell_width = output_width // cols
    if cell_width > max_overlay_width:
        cols += 1
        cell_width = output_width // cols
    cell_height = int(cell_width * ch / cw)
    cell_width += cell_width % 2
    cell_height += cell_height % 2

    rows = output_height // cell_height
    if rows < 1:
        rows = 1

    total_cells = rows * cols

    if primary_col < 0 or primary_col >= cols or primary_row < 0 or primary_row >= rows:
        raise ValueError(
            f"Primary cell ({primary_col}, {primary_row}) is out of bounds "
            f"for a {cols}x{rows} grid"
        )

    print(f"Output: {output_width}x{output_height}")
    print(f"Grid: {cols} cols x {rows} rows ({total_cells} cells)")
    print(f"Cell size: {cell_width}x{cell_height}")
    if crop_aspect is not None:
        print(f"Crop: {overlay_aspect[0]}x{overlay_aspect[1]} -> {cw}x{ch}")
    print(f"Primary cell: col={primary_col}, row={primary_row}")

    # --- Build the crop filter string ---
    # Center-crops the source video from its native overlay_aspect to the
    # target crop_aspect.  Uses ffmpeg expressions so it works regardless of
    # the actual input resolution.
    #
    # Given source aspect  S = overlay_aspect w/h
    #       target aspect  T = crop_aspect   w/h
    #
    # If T is wider than S (T > S): height-limited crop
    #   crop_h = in_w * (ch / cw) * (overlay_w / overlay_h)  -- simplifies to
    #   crop_w = in_w,  crop_h = in_w * ch * overlay_w / (cw * overlay_h)
    #
    # If T is narrower or equal: width-limited crop
    #   crop_h = in_h,  crop_w = in_h * cw * overlay_h / (ch * overlay_w)
    #
    # We pre-compute a single rational multiplier so the expression stays simple.
    crop_filter = ""
    if crop_aspect is not None:
        iw, ih = overlay_aspect
        # Compare cross-multiplied to avoid float:  cw/ch vs iw/ih  =>  cw*ih vs iw*ch
        if cw * ih > iw * ch:
            # Target is wider than source -> limited by source width
            # crop_w = in_w
            # crop_h = in_w * (ch * iw) / (cw * ih)
            num = ch * iw
            den = cw * ih
            crop_filter = f"crop=in_w:in_w*{num}/{den}"
        elif cw * ih < iw * ch:
            # Target is narrower than source -> limited by source height
            # crop_h = in_h
            # crop_w = in_h * (cw * ih) / (ch * iw)
            num = cw * ih
            den = ch * iw
            crop_filter = f"crop=in_h*{num}/{den}:in_h"
        # else aspects match, no crop needed

    # --- Build ffmpeg command ---
    cmd = ["ffmpeg", "-y"]

    # Input 0: black background
    cmd += [
        "-f", "lavfi",
        "-i", f"color=c=black:s={output_width}x{output_height}:d={duration}:r=30",
    ]

    # Inputs 1..N: one per grid cell
    for _ in range(total_cells):
        cmd += ["-stream_loop", "-1", "-i", input_video]

    # --- Build filter_complex ---
    filters = []

    for i in range(total_cells):
        col = i % cols
        row = i // cols
        manhattan = abs(col - primary_col) + abs(row - primary_row)
        delay_sec = manhattan * 0.3
        input_idx = i + 1

        # Assemble the per-cell video filter chain
        parts = [f"[{input_idx}:v]trim=0:{duration}"]

        if delay_sec > 0:
            parts.append(f"setpts=PTS+{delay_sec}/TB")
        else:
            parts.append("setpts=PTS-STARTPTS")

        if crop_filter:
            parts.append(crop_filter)

        parts.append(f"scale={cell_width}:{cell_height}")
        parts.append("setsar=1")

        filters.append(",".join(parts) + f"[v{i}]")

    # Chain overlays
    prev = "0:v"
    for i in range(total_cells):
        col = i % cols
        row = i // cols
        x = col * cell_width
        y = row * cell_height
        out_label = "vout" if i == total_cells - 1 else f"bg{i}"
        filters.append(
            f"[{prev}][v{i}]overlay=x={x}:y={y}:eof_action=pass[{out_label}]"
        )
        prev = out_label

    # Audio from primary cell only
    primary_input_idx = primary_row * cols + primary_col + 1
    filters.append(
        f"[{primary_input_idx}:a]atrim=0:{duration},asetpts=PTS-STARTPTS[aout]"
    )

    filter_complex = ";\n".join(filters)

    cmd += ["-filter_complex", filter_complex]
    cmd += ["-map", "[vout]", "-map", "[aout]"]
    cmd += ["-t", str(duration)]
    cmd += ["-c:v", "libvpx-vp9", "-crf", "24", "-c:a", "libopus"]
    cmd += [output_file]

    return cmd


def main():

    files = [
            {
                "id": "0a0554c8-e6ab-40d8-854e-1cc190a00842",
                "time": 100
            },
            {
                "id": "06e880e9-d204-4715-a89d-c5997fe59a84",
                "time": 100
            },
            {
                "id":"45f3228e-af0d-4f7a-919c-07cee4d315f0",
                "time": 211
            },
            {
                "id":"a436f3a0-b408-42e1-9af4-6bfa71d92f59", 
                "time": 70
            },
            {
                "id": "28560a05-6053-4a98-9051-3d0800cf2a51",
                "time": 224
            }
        ]
    file_index = 2
    in_dir = "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player"
    out_dir = "/Users/alan/Desktop"

    # ---- Configuration ----
    output_width = 1920
    output_aspect = (16, 9)
    overlay_aspect = (4, 3)       # Native aspect of the input video
    crop_aspect = (4, 3)           # Desired crop aspect (or None to skip)
    max_overlay_width = 230
    duration = files[file_index]["time"]
    primary_col = 4
    primary_row = 2
    # input_video = "input.mp4"
    # output_file = "output.mp4"
    input_video = f"{in_dir}/{files[file_index]["id"]}.webm"
    output_file = f"{out_dir}/{files[file_index]["id"]}.webm"


    if len(sys.argv) >= 2:
        input_video = sys.argv[1]
    if len(sys.argv) >= 3:
        output_file = sys.argv[2]

    cmd = build_ffmpeg_command(
        output_width=output_width,
        output_aspect=output_aspect,
        overlay_aspect=overlay_aspect,
        crop_aspect=crop_aspect,
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


