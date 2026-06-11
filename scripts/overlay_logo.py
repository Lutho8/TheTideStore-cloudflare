#!/usr/bin/env python3
"""
Ride The Tide — Logo Overlay Script for Vial Images
Overlays the RTT wave logo onto all crushresearch product images.

Usage:
  python scripts/overlay_logo.py

Requirements:
  pip install Pillow

Output:
  Branded images saved to product-images/branded/
"""

import os
import sys
from pathlib import Path
from PIL import Image

# Paths
WORKSPACE = Path("C:/Users/LuthoKote/Documents/kimi/workspace/thetide-cloudflare")
LOGO_PATH = WORKSPACE / "../peptide-mastery-app/public/logo-animated.png"
SOURCE_DIR = WORKSPACE / "product-images"
OUTPUT_DIR = WORKSPACE / "product-images" / "branded"

# Logo overlay settings
LOGO_SIZE_RATIO = 0.18  # Logo width as ratio of image width
LOGO_OPACITY = 0.92     # Slight transparency for blend
POSITION = "center-right"  # Where to place on vial label


def load_logo(target_width: int) -> Image.Image:
    """Load and resize logo, preserving transparency."""
    logo = Image.open(LOGO_PATH).convert("RGBA")
    
    # Calculate new size maintaining aspect ratio
    ratio = target_width / logo.width
    new_size = (target_width, int(logo.height * ratio))
    logo = logo.resize(new_size, Image.LANCZOS)
    
    return logo


def overlay_logo(base_img: Image.Image, logo: Image.Image, position: str) -> Image.Image:
    """Overlay logo onto base image at specified position."""
    base = base_img.convert("RGBA")
    
    # Calculate position based on image dimensions
    bx, by = base.size
    lx, ly = logo.size
    
    if position == "center-right":
        # Place on right vial label area (upper-middle right)
        x = int(bx * 0.58)
        y = int(by * 0.32)
    elif position == "center-left":
        # Place on left vial label area
        x = int(bx * 0.12)
        y = int(by * 0.25)
    elif position == "top-right":
        x = bx - lx - 20
        y = 20
    elif position == "bottom-right":
        x = bx - lx - 20
        y = by - ly - 20
    else:
        x = (bx - lx) // 2
        y = (by - ly) // 2
    
    # Ensure logo fits within image bounds
    x = max(0, min(x, bx - lx))
    y = max(0, min(y, by - ly))
    
    # Apply opacity to logo
    logo_data = logo.getdata()
    new_data = []
    for item in logo_data:
        r, g, b, a = item
        new_a = int(a * LOGO_OPACITY)
        new_data.append((r, g, b, new_a))
    logo.putdata(new_data)
    
    # Paste logo using alpha channel
    base.paste(logo, (x, y), logo)
    
    return base


def process_image(src_path: Path, logo: Image.Image, position: str) -> Image.Image:
    """Process a single product image."""
    img = Image.open(src_path)
    branded = overlay_logo(img, logo, position)
    return branded


def main():
    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Check logo exists
    if not LOGO_PATH.exists():
        print(f"ERROR: Logo not found at {LOGO_PATH}")
        print("Please ensure the logo file exists.")
        sys.exit(1)
    
    # Get all product images
    images = sorted([f for f in SOURCE_DIR.iterdir() if f.suffix.lower() == '.png'])
    
    if not images:
        print(f"ERROR: No PNG images found in {SOURCE_DIR}")
        sys.exit(1)
    
    print(f"Found {len(images)} product images")
    print(f"Logo: {LOGO_PATH}")
    print(f"Output: {OUTPUT_DIR}")
    print("-" * 50)
    
    # Load logo once (sized to first image for reference)
    first_img = Image.open(images[0])
    logo_width = int(first_img.width * LOGO_SIZE_RATIO)
    logo = load_logo(logo_width)
    print(f"Logo resized to: {logo.size}")
    print("-" * 50)
    
    processed = 0
    for img_path in images:
        try:
            # Determine position based on filename patterns
            # Most images have vials on right side with label
            pos = "center-right"
            
            # Process image
            branded = process_image(img_path, logo, pos)
            
            # Save as PNG (preserve quality)
            out_path = OUTPUT_DIR / img_path.name
            branded.save(out_path, "PNG")
            
            print(f"  ✓ {img_path.name} → branded/{img_path.name}")
            processed += 1
            
        except Exception as e:
            print(f"  ✗ {img_path.name}: {e}")
    
    print("-" * 50)
    print(f"Done! {processed}/{len(images)} images branded.")
    print(f"Output directory: {OUTPUT_DIR}")
    
    # Print next steps
    print("\nNext steps:")
    print("  1. Review branded images in product-images/branded/")
    print("  2. Upload to Cloudflare R2: r2.ridethetide.site/products/")
    print("  3. Update seed.sql image URLs if filenames change")


if __name__ == "__main__":
    main()
