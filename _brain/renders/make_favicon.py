#!/usr/bin/env python3
"""Build favicons from the transparent lamp logo, cropped to just the lamp
(the SHABBOS VILLAGE wordmark is illegible at favicon sizes). Auto-detects the
lamp by finding the first contiguous vertical block of content above the
transparent gap that separates the lamp from the text."""
import numpy as np
from PIL import Image

SRC = "_brain/renders/logo-new-transparent.png"
img = Image.open(SRC).convert("RGBA")
a = np.array(img)[:, :, 3]
H, W = a.shape

# Rows that contain real content (more than a few opaque-ish pixels).
row_has = (a > 40).sum(axis=1) > 3
rows = np.where(row_has)[0]
top = int(rows[0])

# Walk down from the first content row. Stop at the first sizable transparent gap
# OR where the content width suddenly explodes — in this logo the SHABBOS VILLAGE
# wordmark sits BESIDE the lamp's lower bracket (no clean gap), so it shows up as a
# row far wider than the lamp itself. Cut before that so the crop is lamp-only.
GAP = max(8, H // 80)

def row_width(y):
    cols = np.where(a[y] > 40)[0]
    return 0 if len(cols) == 0 else int(cols[-1] - cols[0])

end = top
run_gap = 0
max_w = 1
for y in range(top, H):
    if row_has[y]:
        w = row_width(y)
        if w > 2.0 * max_w and max_w > 20:  # text band — much wider than the lamp
            break
        max_w = max(max_w, w)
        end = y
        run_gap = 0
    else:
        run_gap += 1
        if run_gap >= GAP:
            break

# Crop to the lamp band, then trim horizontally to its tight bbox.
lamp = img.crop((0, top, W, end + 1))
bbox = lamp.getbbox()
lamp = lamp.crop(bbox)
lw, lh = lamp.size

# Square canvas with ~12% padding, lamp centered.
side = int(max(lw, lh) * 1.12)
def squared(bg):
    canvas = Image.new("RGBA", (side, side), bg)
    canvas.alpha_composite(lamp, ((side - lw) // 2, (side - lh) // 2))
    return canvas

transparent = squared((0, 0, 0, 0))

# app/icon.png — transparent, for browser tabs
transparent.resize((512, 512), Image.LANCZOS).save("app/icon.png")

# app/apple-icon.png — gold lamp on brand dark-green, looks good on iOS home screen
green = squared((26, 42, 15, 255))
green.resize((180, 180), Image.LANCZOS).save("app/apple-icon.png")

# app/favicon.ico — multi-size
transparent.save("app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

print(f"lamp crop: {lw}x{lh} (from rows {top}-{end}); wrote app/icon.png, app/apple-icon.png, app/favicon.ico")
