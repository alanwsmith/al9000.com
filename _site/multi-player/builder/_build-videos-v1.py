#!/usr/bin/env python3
"""
FFmpeg Grid Video Overlay Generator

Generates a video with a grid of overlaid videos where:
- Each overlay has a calculated delay based on manhattan distance from primary
- Audio is taken only from the primary video
- All videos are positioned in a grid layout on a black background
"""

import subprocess
import math
from dataclasses import dataclass
from typing import Tuple


@dataclass
class VideoConfig:
    """Configuration for the output video"""
    output_width: int  # Output video width in pixels
    output_aspect_ratio: Tuple[int, int]  # (width, height) aspect ratio
    input_aspect_ratio: Tuple[int, int]  # (width, height) aspect ratio of overlay videos
    max_overlay_width: int  # Maximum width for each overlay cell in pixels
    duration: float  # Duration in seconds
    primary_row: int  # Row index of primary video (0-indexed)
    primary_col: int  # Column index of primary video (0-indexed)
    input_file: str  # Path to input video file
    output_file: str  # Path to output video file
    grid_rows: int  # Number of rows in grid
    grid_cols: int  # Number of columns in grid
    distance_delay_multiplier: float = 0.17  # Multiplier for manhattan distance delay


class GridVideoGenerator:
    """Generates ffmpeg command for grid video overlay"""
    
    def __init__(self, config: VideoConfig):
        self.config = config
        self.validate_config()
        self.calculate_dimensions()
        
    def validate_config(self) -> None:
        """Validate input configuration"""
        if self.config.primary_row >= self.config.grid_rows or self.config.primary_row < 0:
            raise ValueError(f"Primary row {self.config.primary_row} out of bounds for {self.config.grid_rows} rows")
        if self.config.primary_col >= self.config.grid_cols or self.config.primary_col < 0:
            raise ValueError(f"Primary col {self.config.primary_col} out of bounds for {self.config.grid_cols} cols")
        if self.config.max_overlay_width <= 0 or self.config.output_width <= 0:
            raise ValueError("Dimensions must be positive")
        if self.config.duration <= 0:
            raise ValueError("Duration must be positive")
    
    def calculate_dimensions(self) -> None:
        """Calculate output and overlay dimensions"""
        # Calculate output height from aspect ratio
        aspect_width, aspect_height = self.config.output_aspect_ratio
        self.output_height = int(
            self.config.output_width * aspect_height / aspect_width
        )
        
        # Calculate overlay cell dimensions
        # Each cell width should be as close as possible to max without exceeding
        self.overlay_width = min(
            self.config.max_overlay_width,
            self.config.output_width // self.config.grid_cols
        )
        
        # Calculate overlay height based on input aspect ratio
        overlay_aspect_width, overlay_aspect_height = self.config.input_aspect_ratio
        self.overlay_height = int(
            self.overlay_width * overlay_aspect_height / overlay_aspect_width
        )
    
    def manhattan_distance(self, row: int, col: int) -> int:
        """Calculate manhattan distance from primary video position"""
        return abs(row - self.config.primary_row) + abs(col - self.config.primary_col)
    
    def get_delay_for_position(self, row: int, col: int) -> float:
        """Get delay in seconds for a grid position"""
        distance = self.manhattan_distance(row, col)
        return distance * self.config.distance_delay_multiplier
    
    def get_overlay_position(self, row: int, col: int) -> Tuple[int, int]:
        """Calculate x, y coordinates for overlay at grid position"""
        x = col * self.overlay_width
        y = row * self.overlay_height
        return x, y
    
    def build_filter_complex(self) -> Tuple[str, str]:
        """Build the ffmpeg filtergraph. Returns (filter_complex, final_label)"""
        filters = []
        
        # Start with black background
        filters.append(
            f"color=c=black:s={self.config.output_width}x{self.output_height}:d={self.config.duration}[base]"
        )
        
        # Add scaled and positioned videos
        overlay_idx = 0
        prev_label = "base"
        
        for row in range(self.config.grid_rows):
            for col in range(self.config.grid_cols):
                delay = self.get_delay_for_position(row, col)
                x, y = self.get_overlay_position(row, col)
                
                # Use the correct input index for this overlay
                # Each input file gets an index: 0, 1, 2, etc.
                input_index = overlay_idx
                
                # Create labels
                scaled_label = f"scaled{overlay_idx}"
                next_label = f"tmp{overlay_idx}"
                
                # Build filter for scaling and applying delay
                if delay > 0:
                    # Non-primary video: apply delay via setpts
                    scale_filter = (
                        f"[{input_index}:v]setpts=PTS-STARTPTS+{delay}/TB,"
                        f"scale={self.overlay_width}:{self.overlay_height}[{scaled_label}]"
                    )
                else:
                    # Primary video: no delay
                    scale_filter = (
                        f"[{input_index}:v]setpts=PTS-STARTPTS,"
                        f"scale={self.overlay_width}:{self.overlay_height}[{scaled_label}]"
                    )
                
                filters.append(scale_filter)
                
                # Overlay the scaled video on the previous result
                overlay_filter = (
                    f"[{prev_label}][{scaled_label}]overlay=x={x}:y={y}[{next_label}]"
                )
                filters.append(overlay_filter)
                
                prev_label = next_label
                overlay_idx += 1
        
        # Join filters with semicolons to create the complete filtergraph
        filter_complex = ";".join(filters)
        
        return filter_complex, prev_label
    
    def build_command(self) -> list:
        """Build the complete ffmpeg command"""
        filter_complex, final_label = self.build_filter_complex()
        
        # Build the ffmpeg command
        cmd = [
            "ffmpeg",
            "-y",  # Overwrite output file
        ]
        
        # Add input files (one for each grid position)
        num_videos = self.config.grid_rows * self.config.grid_cols
        for _ in range(num_videos):
            cmd.extend(["-i", self.config.input_file])
        
        # Add filter complex
        cmd.extend([
            "-filter_complex", filter_complex,
            "-map", f"[{final_label}]",  # Map the final video output
            "-map", "0:a?",              # Map audio from first input (primary video)
            "-c:v", "libx264",
            "-preset", "medium",
            "-c:a", "aac",
            "-b:a", "128k",
            self.config.output_file
        ])
        
        return cmd
    
    def run(self, verbose: bool = True) -> int:
        """Execute the ffmpeg command"""
        cmd = self.build_command()
        
        if verbose:
            print("Running command:")
            print(" ".join(cmd))
            print()
        
        try:
            result = subprocess.run(cmd, check=True)
            print(f"\n✓ Successfully created {self.config.output_file}")
            return result.returncode
        except subprocess.CalledProcessError as e:
            print(f"\n✗ FFmpeg command failed with return code {e.returncode}")
            raise
        except FileNotFoundError:
            print("\n✗ FFmpeg not found. Please install FFmpeg and ensure it's in your PATH")
            raise


def main():
    """Example usage of GridVideoGenerator"""
    
    # Example configuration
    config = VideoConfig(
        output_width=1920,                # 1920px width
        output_aspect_ratio=(16, 9),      # 16:9 aspect ratio
        input_aspect_ratio=(16, 9),       # 16:9 for overlay videos
        max_overlay_width=180,            # Max 600px per overlay
        duration=20.0,                    # 10 second video
        primary_row=2,                    # Primary video at row 1
        primary_col=3,                    # Primary video at col 1
        grid_rows=7,                      # 3x3 grid
        grid_cols=7,
        # input_file="v1.webm",
        input_file="/Users/alan/Desktop/input.webm",
        #output_file="output.mp4"
        output_file="/Users/alan/Desktop/output.mp4",
    )

    
    # Create generator and run
    generator = GridVideoGenerator(config)
    
    # Print dimensions for reference
    print(f"Output dimensions: {config.output_width}x{generator.output_height}")
    print(f"Overlay cell size: {generator.overlay_width}x{generator.overlay_height}")
    print(f"Grid: {config.grid_rows}x{config.grid_cols}")
    print()
    
    # Run the generator
    generator.run(verbose=True)


if __name__ == "__main__":
    main()

