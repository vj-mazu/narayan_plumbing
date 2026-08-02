import os
from PIL import Image

# Coordinates for all 15 circular icons in the grid
# Grid is 3 rows, 5 columns
# Image dimensions are 1500 x 1000
img_path = r"C:\Users\maju\Downloads\ChatGPT Image Aug 2, 2026, 03_03_03 PM.png"
output_dir = r"c:\Users\maju\Downloads\narayan_plumbing-main\narayan_plumbing-main\public\icons"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

img = Image.open(img_path)
width, height = img.size

# Estimated coordinates based on 5x3 grid layout (width=1500, height=1000)
# We crop each circle region accurately
cols = 5
rows = 3

col_width = width / cols
row_height = height / rows

# Service names matching CORE_SERVICES order plus extras
icon_names = [
    "tap.png",           # Row 1, Col 1
    "shower.png",        # Row 1, Col 2
    "toilet.png",        # Row 1, Col 3
    "basin.png",         # Row 1, Col 4
    "sink.png",          # Row 1, Col 5
    "pipe-leak.png",     # Row 2, Col 1
    "pipe-inst.png",     # Row 2, Col 2
    "drain.png",         # Row 2, Col 3
    "tank.png",          # Row 2, Col 4
    "geyser.png",        # Row 2, Col 5
    "bath-plumb.png",    # Row 3, Col 1
    "emergency.png",     # Row 3, Col 2
    "cpvc.png",          # Row 3, Col 3
    "geyser-inst.png",   # Row 3, Col 4
    "drain-clean.png"    # Row 3, Col 5
]

idx = 0
for r in range(rows):
    for c in range(cols):
        # Calculate bounding box for the circular icon area
        left = c * col_width
        top = r * row_height
        right = left + col_width
        bottom = top + row_height
        
        # Center crop a square out of the grid cell to isolate the circle
        box_w = right - left
        box_h = bottom - top
        size = min(box_w, box_h)
        
        cx = left + box_w / 2
        cy = top + box_h / 2
        
        crop_box = (
            int(cx - size / 2),
            int(cy - size / 2),
            int(cx + size / 2),
            int(cy + size / 2)
        )
        
        cropped = img.crop(crop_box)
        # Resize to standard high-res icon size (200x200)
        cropped_resized = cropped.resize((200, 200), Image.Resampling.LANCZOS)
        
        dest_path = os.path.join(output_dir, icon_names[idx])
        cropped_resized.save(dest_path)
        print(f"Saved: {icon_names[idx]}")
        idx += 1

print("All icons cropped successfully!")
